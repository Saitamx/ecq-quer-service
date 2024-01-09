const { handleSendImages } = require("./handlers/handleSendImages");
const { openAi } = require("./utils/instances");
const bodyParser = require("body-parser");
const {
  handleCreateAssistant,
  handleResponseInBackground,
  handleClassifyQuestion,
} = require("./handlers");
const socketIo = require("socket.io");
const express = require("express");
const http = require("http");
require("dotenv").config();

// Creación del servidor Express y configuración de Socket.io
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
console.log("Express y Socket.io configurados");

// Variables de entorno
let threadId = process.env.THREAD_ID;
let assistantId = process.env.ASSISTANT_ID;
console.log("Variables de entorno cargadas");
console.log("OPENAI_API_KEY", process.env.OPENAI_API_KEY);

// Configuración de middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.static("public"));
console.log("Middlewares configurados");

// Gestión de conexiones Socket.io
io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado a Socket.io");

  socket.on("message", async ({ message, images }) => {
    console.log("Mensaje recibido del cliente:", message);
    console.log("images,:", images);
    try {
      // Enviar mensaje al LLM y obtener respuesta
      const response = await openAi.post("http://localhost:3000/newMessage", {
        thread_id: threadId,
        message,
        images,
      });
      console.log("Respuesta recibida del LLM");

      // Emitir la respuesta del LLM al cliente
      const llmResponse = response.data.messages.data[0].content[0].text.value;

      io.emit("message", {
        user: "Quer Assistant",
        message: llmResponse,
      });

      console.log("Respuesta del LLM enviada al cliente");
    } catch (error) {
      console.error("Error comunicándose con LLM:", error?.response?.data);
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado de Socket.io");
  });
});

// Endpoint para crear un nuevo asistente
app.post("/newAssistant", async (req, res) => {
  console.log("Solicitud recibida para crear un nuevo asistente e hilo");
  const { user, password } = req.body;

  console.log(user, password);
  console.log(process.env.USER, process.env.PASSWORD);
  let threadId;
  let assistantId;

  if (!user || !password) {
    console.log("/newAssistant Error: Faltan campos requeridos");
    return res.status(400).json({ error: "Faltan campos requeridos." });
  }

  if (user !== process.env.USER || password !== process.env.PASSWORD) {
    console.log("/newAssistant Error: Autenticación fallida");
    return res.status(403).json({ error: "Autenticación fallida." });
  }

  try {
    const resThreads = await openAi.post("https://api.openai.com/v1/threads", {
      messages: [],
    });

    threadId = resThreads.data.id;
    console.log(
      `/newAssistant: New thread created with ID: ${resThreads.data.id}`
    );

    assistantId = await handleCreateAssistant(threadId);
    console.log(`/newAssistant: Nuevo asistente creado`, {
      assistantId,
      threadId,
    });

    res.json({ assistantId, threadId });
  } catch (error) {
    console.error("/newAssistant: Error creando asistente:", error.response);
    res
      .status(500)
      .send("/newAssistant: Error creando asistente", error.response);
  }
});

// Endpoint para enviar un nuevo mensaje
app.post("/newMessage", async (req, res) => {
  console.log("/newMessage: Solicitud recibida para enviar un nuevo mensaje");
  console.time("/newMessage");
  const { message, images, thread_id } = req.body;

  try {
    let visionRes;
    let imagesCategories = [];
    let content = "";
    if (images.base64.length > 0) {
      // modo asistente experto en clasificar imagenes de elementos de calistenia y recomendar rutinas
      visionRes = await handleSendImages(images);
      imagesCategories = await handleClassifyQuestion(visionRes, images);

      content = `Hola, el usuario a enviado imagenes, la intención es detectar elementos de calistenia y recomendar una rutina,
                este fue el mensaje que envio el usuario: ${message}. Un modelo de clasificación de imagenes de elementos de calistenia ha
                 respondio lo siguiente: ${JSON.stringify(
                   visionRes
                 )} y asi fueron clasificadas las imagenes: imagesCategories: ${JSON.stringify(
        imagesCategories
      )}
      Dame posibles rutinas de calistenia para hacer en base a los elementos descubiertos en las imagenes.
      recuerda que debes no debes hacer suposiciones sobre los valores que deben enviarse a las funciones,
      solo debes enviar los valores que se te piden, en este caso, las categorias de las imagenes.
      handleRoutineGenerator es una función que recibe un array de objetos con las categorias de las imagenes y retorna un array de objetos con las rutinas de calistenia.
      `;
    } else {
      // modo asistente
      content = message;
    }

    console.log("imagesCategories", imagesCategories);

    await openAi.post(
      `https://api.openai.com/v1/threads/${thread_id}/messages`,
      {
        role: "user",
        content,
      }
    );

    const response = await openAi.post(
      `https://api.openai.com/v1/threads/${thread_id}/runs`,
      { assistant_id: assistantId }
    );
    console.log(`/newMessage: Ejecución iniciada con ID: ${response.data.id}`);

    const messages = await handleResponseInBackground(
      thread_id,
      response.data.id
    );

    console.log("/newMessage: messages", messages);

    console.log("/newMessage: Respuesta procesada en segundo plano");
    res
      .status(200)
      .json({ messages: messages.response, routine: messages.routine });
  } catch (error) {
    console.error(
      "/newMessage: Error en el chat:",
      error?.response?.data || error?.response || error
    );
    res.status(500).send({
      message: "/newMessage: Error en el chat",
      error,
    });
  }
  console.timeEnd("/newMessage");
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
);
