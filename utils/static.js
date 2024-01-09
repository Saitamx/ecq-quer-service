const createAssistantInstructions = `
Eres QUER, una inteligencia artificial de EcoquerAI. 
Nuestro objetivo es combatir la inactividad física que afecta a una gran parte de la población mundial. 
Para lograr esto, proporcionamos una plataforma digital que facilita el descubrimiento de instalaciones deportivas, proporciona entrenamientos personalizados y fomenta la interacción comunitaria a través de eventos y desafíos. 
Además, EcoquerAI incluye una tienda en línea para accesorios, ropa y suplementos deportivos. 
Aspiramos a convertirnos en la red social líder para deportistas y entusiastas del fitness, expandiendo nuestras funcionalidades a otros espacios deportivos.
La innovación de EcoquerAI radica en la integración de la inteligencia artificial para personalizar las rutinas de entrenamiento según las metas y las instalaciones disponibles, algo que otras plataformas no ofrecen. 
También proporcionamos una base de datos de parques de calistenia y otros espacios deportivos, permitiendo a los usuarios descubrir nuevos lugares para entrenar.
Estoy aquí para ayudar a los usuarios de EcoquerAI y contribuir a su experiencia enriquecedora mientras protejo la información sensible. 
Actualmente, estoy programado para proporcionar información específica sobre parques de calistenia, pero pronto podré responder a preguntas sobre otros espacios deportivos.
Puedo ayudarte a encontrar parques de calistenia en tu área, tendrás una vista panorámica de los parques e interactuar con la inteligencia artificial para obtener recomendaciones personalizadas de entrenamiento en base a los elementos disponibles en el parque.
`;

const classifyQuestionInstructions = `
Eres un asistente experto en clasificar los siguientes elementos de calistenia:
- Barras paralelas: categoryCode 1, category barrasParalelas
- Barras de fondos: categoryCode 2, category barrasFondos
- Barras de dominadas: categoryCode 3, category barrasDominadas

Descripción de cada elemento:
- Barras de dominadas: Son barras que están a la altura de la cabeza, son altas y son para hacer dominadas.
- Barras de fondos: Son barras que están a la altura de la cadera. sirven para hacer frontlever y fondos.
- Barras paralelas: Son barras que están a la altura de la cintura, son paralelas y sirven para hacer dips y L-sit.

Se te dará una descripción de las imagenes que se le enviaron al asistente y debes clasificarlas en una de las categorias anteriores.

IMPORTANTE: 
Retornar SOLO RESPUESTAS EN FORMATO JSON. NUNCA RETORNAR MAS TEXTO PLANO, SOLO FORMATO JSON. El formato de la respuesta se deja acontinuación:

interface Response {
    response: [
        {
            categoryCode: number, // codigo de categoria puede ser 1, 2 o 3
            category: string, // nombre de la categoria
            path: string // path de la imagen
        },
        ...
    ],
}
`;

const user = {
  usuario: {
    id: "123456",
    nivelExperiencia: "intermedio",
    objetivos: ["ganarFuerza", "mejorarFlexibilidad"],
    restricciones: ["evitarImpactoAlto"],
    equipamientoDisponible: [
      "barraDominadas",
      "barrasParalelas",
      "espacioParaSquats",
    ],
    duracionPreferida: 30,
    diasEntrenamiento: 3,
  },
  historialEntrenamiento: [
    {
      fecha: "2024-02-10",
      tipoEntrenamiento: "calistenia",
      ejercicios: [
        { nombre: "Dominadas", repeticiones: 8, series: 3 },
        { nombre: "Flexiones", repeticiones: 10, series: 3 },
      ],
    },
  ],
  preferenciasUsuario: {
    preferenciaCalentamiento: true,
    preferenciaEnfriamiento: true,
    tiempoDisponible: 45,
  },
  detallesRutina: {
    ejercicios: [
      { nombre: "Push-ups", tipo: "Horizontal Push" },
      { nombre: "Pull-ups/Chin-Ups", tipo: "Vertical Pull" },
      { nombre: "Squats", tipo: "Squat" },
      { nombre: "Dips", tipo: "Vertical Push" },
      { nombre: "Crunches", tipo: "Core" },
      { nombre: "Plank", tipo: "Isometric Hold" },
    ],
    progresiones: {
      "Push-ups": ["Standard", "Incline", "Decline"],
      "Pull-ups": ["Assisted", "Standard", "Weighted"],
      Squats: ["Air Squat", "Goblet Squat", "Pistol Squat"],
    },
    volumen: {
      objetivo: "ganarFuerza",
      repeticiones: [1, 6],
      series: 3,
    },
    descanso: {
      objetivo: "ganarFuerza",
      tiempo: "3-5 minutos",
    },
    duracionSesion: {
      minimo: 30,
      maximo: 90,
    },
  },
  comunidad: {
    eventosProximos: [
      {
        nombre: "Reto de Flexiones",
        fecha: "2024-03-15",
        descripcion: "Reto comunitario de flexiones con premios.",
      },
      {
        nombre: "Clase Grupal en Parque Local",
        fecha: "2024-03-20",
        descripcion: "Clase grupal de calistenia para todos los niveles.",
      },
    ],
    tableroLideres: [
      { usuario: "usuario123", puntuacion: 300 },
      { usuario: "usuario456", puntuacion: 280 },
    ],
    retosActivos: [
      {
        nombre: "30 Días de Calistenia",
        participantes: ["usuario123", "usuario789"],
      },
    ],
    foroDiscusion: {
      temasPopulares: [
        { titulo: "Mejores Ejercicios para Principiantes", respuestas: 15 },
        { titulo: "Reto de Flexiones - Semana 2", respuestas: 30 },
      ],
      preguntasRecientes: [
        { pregunta: "¿Cómo mejorar en las dominadas?", respuestas: 5 },
      ],
    },
  },
  retroalimentacionSocial: {
    comentarios: [
      {
        deUsuario: "usuario789",
        paraRutina: "Rutina2024-02-10",
        comentario:
          "¡Gran entrenamiento! ¿Intentamos aumentar las repeticiones la próxima vez?",
      },
    ],
    reacciones: [
      {
        rutina: "Rutina2024-02-10",
        reacciones: { likes: 10, aplausos: 5 },
      },
    ],
    encuestas: [
      {
        titulo: "¿Qué tipo de ejercicio prefieres?",
        opciones: ["Flexiones", "Dominadas", "Sentadillas"],
        votos: { Flexiones: 27, Dominadas: 40, Sentadillas: 15 },
      },
    ],
  },
  actividadesGrupales: {
    proximasSesiones: [
      {
        titulo: "Entrenamiento en Grupo Parque Central",
        fecha: "2024-03-22",
        hora: "10:00 AM",
        participantesConfirmados: 12,
      },
    ],
    retosGrupales: [
      {
        nombre: "30 Días de Calistenia",
        inicio: "2024-04-01",
        participantes: 20,
      },
    ],
  },
  gamificacion: {
    logros: [
      { nombre: "Primeras 100 Flexiones", obtenido: true },
      { nombre: "5 Dominadas Seguidas", obtenido: false },
    ],
    puntuacion: 450,
    nivel: 3,
    retosSuperados: 2,
    desafiosDiarios: [
      { nombre: "50 Burpees", completado: false },
      { nombre: "5 Minutos de Plank", completado: true },
    ],
  },
  recomendacionesPersonalizadas: {
    basadoEnActividad: [
      { ejercicio: "Dominadas", nuevasVariantes: ["Dominadas con Peso"] },
    ],
    basadoEnInteracciones: [
      { evento: "Clase Grupal", recomendadoPor: ["usuario456", "usuario789"] },
    ],
  },
};

module.exports = {
  createAssistantInstructions,
  classifyQuestionInstructions,
};
