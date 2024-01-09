const routineGeneratorSchema = {
  type: "function",
  function: {
    name: "handleRoutineGenerator",
    description:
      "Genera una rutina de entrenamiento para el cliente basada en las categorías de imágenes proporcionadas.",
    parameters: {
      type: "object",
      properties: {
        imagesCategories: {
          type: "array",
          items: {
            type: "object",
            properties: {
              categoryCode: {
                type: "number",
                description: "Código de la categoría de la imagen.",
              },
              category: {
                type: "string",
                description: "Nombre de la categoría de la imagen.",
              },
              path: {
                type: "string",
                description: "Ruta de la imagen.",
              },
            },
            required: ["categoryCode", "category", "path"],
          },
        },
      },
      required: ["imagesCategories"],
    },
  },
};

module.exports = { routineGeneratorSchema };
