const { classifyQuestionInstructions } = require("../utils/static");
const axios = require("axios");
const openAi = axios.create();

const handleClassifyQuestion = async (visionRes, images) => {
  console.time("handleClassifyQuestion");

  let imagesPaths = [];
  images.base64.map(({ path }, index) => {
    imagesPaths.push(`Path de la imagen ${index + 1}: ${path}`);
  });

  const response = await openAi.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: classifyQuestionInstructions,
        },
        {
          role: "user",
          content: `
            Se han adjuntado ${
              images.base64.length
            } imagenes y un modelo de vision ha clasificado las imagenes así: ${visionRes}.
            Necesito que respondas en formato json a que elemento de calistenia corresponde cada imagen.
            Estos son los paths de las imagenes:
            ${imagesPaths.join("\n")}
          `,
        },
      ],
      temperature: 0.0,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const predictedCategory = response.data.choices[0].message.content;

  console.log("predictedCategory", predictedCategory);
  console.log("predictedCategory content", response.data.choices[0].message);
  console.timeEnd("handleClassifyQuestion");
  return predictedCategory;
};

module.exports = { handleClassifyQuestion };
