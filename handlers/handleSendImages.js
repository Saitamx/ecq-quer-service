const { openAi } = require("../utils/instances");

const handleSendImages = async (images) => {
  const { base64 } = images;

  let imagesContent = [];
  base64.map(({ image }) => {
    imagesContent.push({
      type: "image_url",
      image_url: { url: `data:image/jpeg;base64,${image}`, detail: "low" },
    });
  });

  try {
    const response = await openAi.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: `Se te han proporcionado ${base64.length} imágenes de elementos de calistenia.

            Eres un asistente experto en clasificar los siguientes elementos de calistenia:
            - Barras paralelas: 
            Estructura: Las barras paralelas caseras suelen ser más compactas y ligeras que las de los parques de calistenia. Generalmente consisten en dos barras paralelas unidas por una serie de soportes transversales para estabilidad.
            Material: A menudo hechas de acero o aleaciones ligeras, con la opción de materiales como aluminio para facilitar el movimiento y almacenamiento.

            Dimensiones:
            Altura: Ajustable en muchos modelos, generalmente entre 70 cm y 1.2 metros.
            Longitud de las barras: Alrededor de 1 a 1.5 metros, optimizadas para el espacio doméstico.
            Diámetro de las barras: Entre 3 a 4 cm, manteniendo un agarre cómodo.
            Separación entre barras: Ajustable en algunos modelos, típicamente entre 40 y 60 cm.
            Portabilidad y Almacenamiento: Diseñadas para ser desmontables o plegables, facilitando el almacenamiento y el traslado.
            Estabilidad: Bases con gomas o material antideslizante para asegurar estabilidad y proteger el suelo.
            - Barras de fondos: categoryCode 2, category barras dominadas
            
            Descripción de cada elemento:
            - Barras dominadas: 
            Estructura: Generalmente son barras horizontales que se pueden fijar en un marco de puerta o montar en una pared o techo.

            Material: Mayormente de acero o una aleación metálica para asegurar resistencia y durabilidad.

            Dimensiones:

            Tipo de Montaje: Para marcos de puerta, suelen tener una longitud ajustable entre 70 cm y 90 cm. Las montadas en pared o techo son fijas y pueden variar en longitud.
            Diámetro de la barra: Aproximadamente 3 a 4 cm para un agarre seguro.
            Tipo de Instalación:

            Montaje en Marco de Puerta: Extensibles y con almohadillas en los extremos para evitar daños al marco.
            Montaje en Pared o Techo: Requieren instalación fija, con tornillos y soportes seguros.
            Capacidad de Carga: Diseñadas para soportar diferentes pesos, generalmente hasta 100-150 kg, dependiendo del modelo.

            Extras: Algunos modelos incluyen múltiples agarres o accesorios adicionales para variar los ejercicios.
                
            Importante:
            Ignora las imágenes que no sean de elementos de calistenia.`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "que elelementos de calistenia ves en las imagenes?",
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
