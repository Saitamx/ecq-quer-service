const routineGeneratorSchema = {
  type: "function",
  function: {
    name: "handleRoutineGenerator",
    description: `Se encarga de generar la rutina de entrenamiento del cliente.
    Recibe como parámetro un arreglo de objetos con la siguiente estructura:
      interface Response {
        response: [
            {
                categoryCode: number, // codigo de categoria puede ser 1, 2
                category: string, // nombre de la categoria
                path: string // path de la imagen
            },
            ...
        ],
    }
      `,
    parameters: {
      type: "object",
      properties: {
        imagesCategories: {
          type: "array",
          items: {
            type: "object",
            properties: {
              categoryCode: {
                type: "string",
                description:
                  "Corresponde al código de la categoría de la imagen.",
              },
              category: {
                type: "string",
                description:
                  "Corresponde al nombre de la categoría de la imagen.",
              },
              path: {
                type: "string",
                description: "Corresponde a la ruta de la imagen.",
              },
            },
          },
        },
      },
      required: ["imagesCategories"],
    },
  },
};

module.exports = { routineGeneratorSchema };
