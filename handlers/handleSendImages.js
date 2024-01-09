const { openAi } = require("../utils/instances");

const handleSendImages = async (images) => {
  const { base64 } = images;

  let imagesContent = base64.map(({ image }) => ({
    type: "image_url",
    image_url: { url: `data:image/jpeg;base64,${image}` },
  }));

  try {
    const response = await openAi.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: `Tienes la tarea de clasificar ${base64.length} imágenes de elementos de calistenia. 
                      Utiliza tus capacidades de CNN para identificar y categorizar cada imagen de acuerdo con las características específicas de
                      Barras Paralelas, Barras de Fondos y Barras de Dominadas.`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analiza y clasifica los elementos de calistenia en estas imágenes:",
              },
              ...imagesContent,
            ],
          },
        ],
        max_tokens: 1000,
      }
    );

    console.log("handleSendImages response.data", response.data);

    let data = {
      message: response.data?.choices[0]?.message?.content,
      from: "openai vision",
    };

    return data;
  } catch (error) {
    console.error("Error al enviar imagen a OpenAI:", error);
  }
};

module.exports = { handleSendImages };
