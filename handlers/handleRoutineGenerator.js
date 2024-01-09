const handleRoutineGenerator = (functionArguments) => {
  const { imagesCategories } = functionArguments;

  console.log("handleRoutineGenerator: functionArguments", functionArguments);
  console.log("handleRoutineGenerator: imagesCategories", imagesCategories);

  let routine = [];

  let videoCategories = {
    calistenia: {
      barrasParalelas: {
        nivel1: ["nHRrW_JSru8"],
        nivel2: ["nHRrW_JSru8"],
        nivel3: ["nHRrW_JSru8"],
      },
      barrasFondos: {
        nivel1: ["KTypY__TdSI"],
        nivel2: ["KTypY__TdSI"],
        nivel3: ["KTypY__TdSI"],
      },
      barrasDominadas: {
        nivel1: ["m_A5NAMuctI"],
        nivel2: ["m_A5NAMuctI"],
        nivel3: ["m_A5NAMuctI"],
      },
    },
  };

  let { barrasParalelas, barrasFondos, barrasDominadas } = videoCategories;

  if (imagesCategories.length > 0) {
    imagesCategories.forEach((imageCategory) => {
      const { categoryCode, category, path } = imageCategory;

      console.log("categoryCode, category, path", categoryCode, category, path);

      console.log("handleRoutineGenerator: imageCategory", imageCategory);

      if (categoryCode === 1) {
        // Barras Paralelas
        routine.push({
          ...imageCategory,
          description: "Rutina De Entrenamiento De Hannibal For King",
          videoId:
            barrasParalelas.nivel1[
              Math.floor(Math.random() * barrasParalelas.nivel1.length)
            ],
          path,
        });
      } else if (categoryCode === 2) {
        // Barras de Fondos
        routine.push({
          ...imageCategory,
          description: "Rutina De Entrenamiento De Hannibal For King",
          videoId:
            barrasFondos.nivel1[
              Math.floor(Math.random() * barrasFondos.nivel1.length)
            ],
          path,
        });
      } else if (categoryCode === 3) {
        // Barras de Dominadas
        routine.push({
          ...imageCategory,
          description: "Rutina De Entrenamiento De Hannibal For King",
          videoId:
            barrasDominadas.nivel1[
              Math.floor(Math.random() * barrasDominadas.nivel1.length)
            ],
          path,
        });
      }
    });
  }

  return {
    routine,
    assistantInstructions: `Se ha generado la rutina exitosamente`,
  };
};

module.exports = { handleRoutineGenerator };
