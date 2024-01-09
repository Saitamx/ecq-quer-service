const handleRoutineGenerator = (functionArguments) => {
  const { imagesCategories } = functionArguments;

  console.log("handleRoutineGenerator: functionArguments", functionArguments);
  console.log("handleRoutineGenerator: imagesCategories", imagesCategories);

  let routine = [];

  if (imagesCategories.length > 0) {
    imagesCategories.forEach((imageCategory) => {
      const { categoryCode, category, path } = imageCategory;

      console.log("categoryCode, category, path", categoryCode, category, path);

      console.log("handleRoutineGenerator: imageCategory", imageCategory);

      if (categoryCode === "1") {
        routine.push({
          description: "Rutina De Entrenamiento De Hannibal For King",
          videoId: "Zk9jp9rJ3Ss",
          path,
        });
      } else if (categoryCode === "2") {
        routine.push({
          description: "Rutina De Entrenamiento De Hannibal For King",
          videoId: "Zk9jp9rJ3Ss",
          path,
        });
      } else if (categoryCode === "3") {
        routine.push({
          description: "Rutina De Entrenamiento De Hannibal For King",
          videoId: "Zk9jp9rJ3Ss",
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
