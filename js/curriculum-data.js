// ----------------------------------------------------
// CURRICULUM DATA: Summer bridge from 2nd to 3rd grade
// ----------------------------------------------------

const CURRICULUM_VERSION = 1;

const SUBJECTS = {
  math: {
    id: 'math',
    name: 'Matematicas',
    shortName: 'Mates',
    worldName: 'Arena de Numeros',
    icon: 'M',
    color: '#00f0ff',
    weeklyWeight: 3,
    goal: 'Consolidar numeracion, calculo, problemas y entrada al pensamiento multiplicativo.'
  },
  language: {
    id: 'language',
    name: 'Lengua Castellana',
    shortName: 'Lengua',
    worldName: 'Biblioteca de Historias',
    icon: 'L',
    color: '#ffea00',
    weeklyWeight: 3,
    goal: 'Mejorar lectura, comprension, escritura breve y ortografia funcional.'
  },
  english: {
    id: 'english',
    name: 'Ingles',
    shortName: 'Ingles',
    worldName: 'Puerto de Frases',
    icon: 'EN',
    color: '#8b5cf6',
    weeklyWeight: 1,
    goal: 'Practicar vocabulario, frases modelo y comprension global de mensajes breves.'
  },
  science: {
    id: 'science',
    name: 'Conocimiento del Medio',
    shortName: 'Medio',
    worldName: 'Isla Exploradora',
    icon: 'C',
    color: '#00ff66',
    weeklyWeight: 1,
    goal: 'Observar el entorno, salud, seres vivos, materiales, tiempo e historia inicial.'
  },
  arts: {
    id: 'arts',
    name: 'Educacion Artistica',
    shortName: 'Arte',
    worldName: 'Taller Creativo',
    icon: 'A',
    color: '#ff0055',
    weeklyWeight: 1,
    goal: 'Crear, observar, escuchar y expresar ideas con recursos visuales y sonoros.'
  },
  movement: {
    id: 'movement',
    name: 'Educacion Fisica y Habitos',
    shortName: 'Movimiento',
    worldName: 'Pista Activa',
    icon: 'EF',
    color: '#f97316',
    weeklyWeight: 1,
    goal: 'Mantener actividad, coordinacion, reglas, descanso y habitos saludables.'
  }
};

const SKILLS = {
  math: [
    { id: 'math_number_999', name: 'Numeracion hasta 999', gradeBand: '2-refuerzo', masteryTarget: 80 },
    { id: 'math_number_9999', name: 'Numeracion hasta 9999', gradeBand: '3-inicio', masteryTarget: 75 },
    { id: 'math_add_sub', name: 'Suma y resta con sentido', gradeBand: '2-refuerzo', masteryTarget: 80 },
    { id: 'math_word_problems', name: 'Problemas de una operacion', gradeBand: 'puente', masteryTarget: 75 },
    { id: 'math_tables_groups', name: 'Tablas desde grupos y cuadriculas', gradeBand: '3-inicio', masteryTarget: 80 },
    { id: 'math_multiply_fast', name: 'Automatizacion de tablas', gradeBand: '3-inicio', masteryTarget: 85 },
    { id: 'math_division_intro', name: 'Reparto y division inicial', gradeBand: '3-inicio', masteryTarget: 70 },
    { id: 'math_measure_time_money', name: 'Medidas, tiempo y dinero', gradeBand: 'puente', masteryTarget: 75 },
    { id: 'math_geometry_data', name: 'Geometria, perimetro y datos', gradeBand: '3-inicio', masteryTarget: 70 }
  ],
  language: [
    { id: 'lang_read_fluency', name: 'Fluidez lectora diaria', gradeBand: '2-refuerzo', masteryTarget: 80 },
    { id: 'lang_literal', name: 'Comprension literal', gradeBand: '2-refuerzo', masteryTarget: 80 },
    { id: 'lang_inference', name: 'Inferencias sencillas', gradeBand: '3-inicio', masteryTarget: 75 },
    { id: 'lang_main_idea', name: 'Idea principal', gradeBand: '3-inicio', masteryTarget: 75 },
    { id: 'lang_order_text', name: 'Ordenar frases y secuencias', gradeBand: 'puente', masteryTarget: 75 },
    { id: 'lang_writing_story', name: 'Escritura inicio-nudo-final', gradeBand: 'puente', masteryTarget: 75 },
    { id: 'lang_spelling', name: 'Ortografia basica', gradeBand: 'puente', masteryTarget: 75 },
    { id: 'lang_oral', name: 'Expresion oral breve', gradeBand: 'puente', masteryTarget: 70 }
  ],
  english: [
    { id: 'eng_greetings', name: 'Saludos y presentacion', gradeBand: '2-refuerzo', masteryTarget: 75 },
    { id: 'eng_vocabulary', name: 'Vocabulario con imagen', gradeBand: '2-refuerzo', masteryTarget: 75 },
    { id: 'eng_like_routines', name: 'I like / routines', gradeBand: '3-inicio', masteryTarget: 70 },
    { id: 'eng_short_dialogue', name: 'Mini dialogo guiado', gradeBand: '3-inicio', masteryTarget: 70 }
  ],
  science: [
    { id: 'sci_living_things', name: 'Seres vivos y clasificacion', gradeBand: '2-refuerzo', masteryTarget: 75 },
    { id: 'sci_health', name: 'Habitos saludables', gradeBand: '2-refuerzo', masteryTarget: 75 },
    { id: 'sci_materials', name: 'Materiales y cambios simples', gradeBand: 'puente', masteryTarget: 70 },
    { id: 'sci_time_history', name: 'Tiempo, Prehistoria y Antiguedad', gradeBand: '3-inicio', masteryTarget: 70 },
    { id: 'sci_environment', name: 'Cuidado del entorno', gradeBand: 'puente', masteryTarget: 75 }
  ],
  arts: [
    { id: 'art_color_line_texture', name: 'Color, linea y textura', gradeBand: '2-refuerzo', masteryTarget: 70 },
    { id: 'art_storyboard', name: 'Storyboard y narracion visual', gradeBand: '3-inicio', masteryTarget: 70 },
    { id: 'art_music_rhythm', name: 'Ritmo, sonido y expresion', gradeBand: 'puente', masteryTarget: 70 }
  ],
  movement: [
    { id: 'move_warmup', name: 'Calentamiento y vuelta a la calma', gradeBand: '2-refuerzo', masteryTarget: 70 },
    { id: 'move_coordination', name: 'Coordinacion y circuito motor', gradeBand: 'puente', masteryTarget: 70 },
    { id: 'move_rules_teamwork', name: 'Reglas, cooperacion y seguridad', gradeBand: '3-inicio', masteryTarget: 70 }
  ]
};

const MISSION_TYPES = {
  quiz: { id: 'quiz', name: 'Duelo de preguntas', evidence: 'aciertos' },
  reading: { id: 'reading', name: 'Lectura diaria', evidence: 'comprension' },
  writing: { id: 'writing', name: 'Escritura guiada', evidence: 'texto breve' },
  practice: { id: 'practice', name: 'Practica guiada', evidence: 'procedimiento' },
  project: { id: 'project', name: 'Mision familiar', evidence: 'validacion parental' },
  offline: { id: 'offline', name: 'Reto fuera de pantalla', evidence: 'habito' }
};

const SUMMER_WEEKS = [
  {
    week: 1,
    title: 'Diagnostico y bases',
    focus: 'Detectar punto de partida y reforzar lectura, numeracion, suma y resta.',
    boss: 'Guardian del Punto de Partida',
    subjects: ['math', 'language'],
    skills: ['math_number_999', 'math_add_sub', 'lang_read_fluency', 'lang_literal'],
    dailyPlan: [
      ['language', 'reading', 'lang_read_fluency'],
      ['math', 'quiz', 'math_number_999'],
      ['language', 'quiz', 'lang_literal'],
      ['math', 'practice', 'math_add_sub'],
      ['math', 'quiz', 'math_word_problems']
    ]
  },
  {
    week: 2,
    title: 'Problemas y frases',
    focus: 'Entender enunciados, ordenar informacion y escribir respuestas completas.',
    boss: 'Rival de los Enunciados',
    subjects: ['math', 'language'],
    skills: ['math_word_problems', 'lang_order_text', 'lang_writing_story'],
    dailyPlan: [
      ['language', 'reading', 'lang_literal'],
      ['math', 'practice', 'math_word_problems'],
      ['language', 'writing', 'lang_order_text'],
      ['math', 'quiz', 'math_measure_time_money'],
      ['language', 'writing', 'lang_writing_story']
    ]
  },
  {
    week: 3,
    title: 'Grupos iguales',
    focus: 'Construir multiplicacion desde sumas repetidas, grupos y cuadriculas.',
    boss: 'Maestro de los Grupos',
    subjects: ['math', 'science'],
    skills: ['math_tables_groups', 'math_multiply_fast', 'sci_living_things'],
    dailyPlan: [
      ['math', 'practice', 'math_tables_groups'],
      ['science', 'quiz', 'sci_living_things'],
      ['math', 'quiz', 'math_tables_groups'],
      ['language', 'reading', 'lang_main_idea'],
      ['math', 'quiz', 'math_multiply_fast']
    ]
  },
  {
    week: 4,
    title: 'Tablas con sentido',
    focus: 'Automatizar tablas 2-5-10 y empezar 3-4 con problemas cotidianos.',
    boss: 'Campeon del Combo',
    subjects: ['math', 'language'],
    skills: ['math_multiply_fast', 'math_word_problems', 'lang_inference'],
    dailyPlan: [
      ['math', 'quiz', 'math_multiply_fast'],
      ['language', 'reading', 'lang_inference'],
      ['math', 'practice', 'math_tables_groups'],
      ['math', 'quiz', 'math_word_problems'],
      ['language', 'writing', 'lang_writing_story']
    ]
  },
  {
    week: 5,
    title: 'Exploradores del entorno',
    focus: 'Ciencias cercanas, salud, materiales y vocabulario ingles basico.',
    boss: 'Exploradora Verde',
    subjects: ['science', 'english', 'movement'],
    skills: ['sci_health', 'sci_materials', 'eng_vocabulary', 'move_warmup'],
    dailyPlan: [
      ['science', 'quiz', 'sci_health'],
      ['english', 'quiz', 'eng_vocabulary'],
      ['science', 'project', 'sci_materials'],
      ['movement', 'offline', 'move_warmup'],
      ['math', 'quiz', 'math_multiply_fast']
    ]
  },
  {
    week: 6,
    title: 'Numeros grandes y reparto',
    focus: 'Numeracion hasta 9999, reparto, division inicial y medidas.',
    boss: 'Capitan del Reparto',
    subjects: ['math', 'english'],
    skills: ['math_number_9999', 'math_division_intro', 'math_measure_time_money', 'eng_short_dialogue'],
    dailyPlan: [
      ['math', 'quiz', 'math_number_9999'],
      ['math', 'practice', 'math_division_intro'],
      ['english', 'quiz', 'eng_greetings'],
      ['math', 'quiz', 'math_measure_time_money'],
      ['math', 'practice', 'math_division_intro']
    ]
  },
  {
    week: 7,
    title: 'Historia, mapas y creatividad',
    focus: 'Tiempo historico inicial, perimetros, datos y produccion creativa.',
    boss: 'Cronista Antiguo',
    subjects: ['science', 'math', 'arts'],
    skills: ['sci_time_history', 'math_geometry_data', 'art_storyboard', 'art_music_rhythm'],
    dailyPlan: [
      ['science', 'quiz', 'sci_time_history'],
      ['math', 'practice', 'math_geometry_data'],
      ['arts', 'project', 'art_storyboard'],
      ['language', 'reading', 'lang_inference'],
      ['movement', 'offline', 'move_coordination']
    ]
  },
  {
    week: 8,
    title: 'Torneo final mixto',
    focus: 'Repaso acumulativo con lectura, problemas, tablas, ingles y proyecto familiar.',
    boss: 'Helios de Verano',
    subjects: ['math', 'language', 'english', 'science', 'arts', 'movement'],
    skills: ['math_multiply_fast', 'math_word_problems', 'lang_main_idea', 'eng_like_routines', 'sci_environment', 'move_rules_teamwork'],
    dailyPlan: [
      ['language', 'reading', 'lang_main_idea'],
      ['math', 'quiz', 'math_multiply_fast'],
      ['english', 'quiz', 'eng_like_routines'],
      ['science', 'project', 'sci_environment'],
      ['math', 'quiz', 'math_word_problems']
    ]
  }
];

const DIAGNOSTIC_BLUEPRINT = [
  { subject: 'math', skill: 'math_number_999', count: 3 },
  { subject: 'math', skill: 'math_add_sub', count: 3 },
  { subject: 'math', skill: 'math_word_problems', count: 2 },
  { subject: 'language', skill: 'lang_literal', count: 3 },
  { subject: 'language', skill: 'lang_inference', count: 2 },
  { subject: 'english', skill: 'eng_greetings', count: 2 },
  { subject: 'science', skill: 'sci_living_things', count: 2 }
];

const QUESTION_BANK = [
  {
    id: 'math-number-001',
    subject: 'math',
    skill: 'math_number_999',
    type: 'choice',
    difficulty: 1,
    prompt: 'Que numero tiene 4 centenas, 2 decenas y 7 unidades?',
    answer: '427',
    options: ['247', '427', '472'],
    explanation: '4 centenas son 400, 2 decenas son 20 y 7 unidades son 7. En total 427.'
  },
  {
    id: 'math-number-002',
    subject: 'math',
    skill: 'math_number_9999',
    type: 'choice',
    difficulty: 2,
    prompt: 'Cual es el numero mayor?',
    answer: '5080',
    options: ['580', '5080', '5008'],
    explanation: '5080 tiene 5 millares. Los otros tienen menos o cambian decenas y unidades.'
  },
  {
    id: 'math-add-001',
    subject: 'math',
    skill: 'math_add_sub',
    type: 'choice',
    difficulty: 1,
    prompt: '68 + 27 = ?',
    answer: '95',
    options: ['85', '95', '105'],
    explanation: '68 + 20 = 88 y 88 + 7 = 95.'
  },
  {
    id: 'math-problem-001',
    subject: 'math',
    skill: 'math_word_problems',
    type: 'choice',
    difficulty: 2,
    prompt: 'Carlitos tiene 24 monedas y gana 18. Cuantas tiene ahora?',
    answer: '42',
    options: ['32', '42', '44'],
    explanation: 'Es una suma porque gana monedas: 24 + 18 = 42.'
  },
  {
    id: 'math-groups-001',
    subject: 'math',
    skill: 'math_tables_groups',
    type: 'choice',
    difficulty: 2,
    prompt: 'Hay 4 grupos con 3 peonzas en cada grupo. Cuantas peonzas hay?',
    answer: '12',
    options: ['7', '12', '16'],
    explanation: '4 grupos de 3 es 3 + 3 + 3 + 3, que tambien es 4 x 3 = 12.'
  },
  {
    id: 'math-mult-001',
    subject: 'math',
    skill: 'math_multiply_fast',
    type: 'choice',
    difficulty: 2,
    prompt: '6 x 4 = ?',
    answer: '24',
    options: ['20', '24', '28'],
    explanation: '6 x 4 son 4 grupos de 6 o 6 grupos de 4. El resultado es 24.'
  },
  {
    id: 'math-div-001',
    subject: 'math',
    skill: 'math_division_intro',
    type: 'choice',
    difficulty: 3,
    prompt: 'Repartes 18 cartas entre 3 amigos por igual. Cuantas recibe cada uno?',
    answer: '6',
    options: ['5', '6', '9'],
    explanation: '18 repartido en 3 partes iguales da 6 para cada amigo.'
  },
  {
    id: 'math-measure-001',
    subject: 'math',
    skill: 'math_measure_time_money',
    type: 'choice',
    difficulty: 2,
    prompt: 'Si una peonza cuesta 3 euros y compras 2, cuanto pagas?',
    answer: '6 euros',
    options: ['5 euros', '6 euros', '9 euros'],
    explanation: 'Son 2 grupos de 3 euros: 3 + 3 = 6.'
  },
  {
    id: 'lang-literal-001',
    subject: 'language',
    skill: 'lang_literal',
    type: 'choice',
    difficulty: 1,
    prompt: 'Texto: Leo guarda su peonza roja en la mochila. Que guarda Leo?',
    answer: 'Una peonza roja',
    options: ['Una peonza roja', 'Un libro azul', 'Una pelota'],
    explanation: 'La respuesta aparece directamente en el texto.'
  },
  {
    id: 'lang-inference-001',
    subject: 'language',
    skill: 'lang_inference',
    type: 'choice',
    difficulty: 2,
    prompt: 'Texto: Ana llevo paraguas porque el cielo estaba muy oscuro. Que puede pasar?',
    answer: 'Puede llover',
    options: ['Puede nevar dentro de casa', 'Puede llover', 'Puede salir un barco'],
    explanation: 'El paraguas y el cielo oscuro son pistas de lluvia.'
  },
  {
    id: 'lang-main-001',
    subject: 'language',
    skill: 'lang_main_idea',
    type: 'choice',
    difficulty: 2,
    prompt: 'Un texto explica como cuidar una planta: regarla, darle luz y quitar hojas secas. Cual es la idea principal?',
    answer: 'Como cuidar una planta',
    options: ['Como cuidar una planta', 'Como comprar zapatos', 'Como hacer una peonza'],
    explanation: 'Todas las frases hablan del cuidado de la planta.'
  },
  {
    id: 'eng-greet-001',
    subject: 'english',
    skill: 'eng_greetings',
    type: 'choice',
    difficulty: 1,
    prompt: 'Que significa "Hello"?',
    answer: 'Hola',
    options: ['Adios', 'Hola', 'Gracias'],
    explanation: 'Hello se usa para saludar.'
  },
  {
    id: 'eng-vocab-001',
    subject: 'english',
    skill: 'eng_vocabulary',
    type: 'choice',
    difficulty: 1,
    prompt: 'Which word means "mochila"?',
    answer: 'backpack',
    options: ['backpack', 'window', 'pencil?'],
    explanation: 'Backpack significa mochila.'
  },
  {
    id: 'eng-dialogue-001',
    subject: 'english',
    skill: 'eng_short_dialogue',
    type: 'choice',
    difficulty: 2,
    prompt: 'Choose the best answer: "What is your name?"',
    answer: 'My name is Carlos.',
    options: ['My name is Carlos.', 'I like blue.', 'Goodbye!'],
    explanation: 'La pregunta pide el nombre.'
  },
  {
    id: 'eng-like-001',
    subject: 'english',
    skill: 'eng_like_routines',
    type: 'choice',
    difficulty: 2,
    prompt: 'Completa: I like ___ .',
    answer: 'apples',
    options: ['apples', 'is', 'blue?'],
    explanation: 'Despues de I like puedes decir una cosa que te gusta: apples.'
  },
  {
    id: 'sci-living-001',
    subject: 'science',
    skill: 'sci_living_things',
    type: 'choice',
    difficulty: 1,
    prompt: 'Cual de estos es un ser vivo?',
    answer: 'Un arbol',
    options: ['Una piedra', 'Un arbol', 'Una silla'],
    explanation: 'Un arbol nace, crece y necesita agua y luz.'
  },
  {
    id: 'sci-materials-001',
    subject: 'science',
    skill: 'sci_materials',
    type: 'choice',
    difficulty: 2,
    prompt: 'Un vaso de cristal esta hecho principalmente de...',
    answer: 'vidrio',
    options: ['vidrio', 'tela', 'papel'],
    explanation: 'El cristal es un material parecido al vidrio.'
  },
  {
    id: 'sci-health-001',
    subject: 'science',
    skill: 'sci_health',
    type: 'choice',
    difficulty: 1,
    prompt: 'Que habito ayuda a estar sano?',
    answer: 'Dormir lo suficiente',
    options: ['Dormir lo suficiente', 'No beber agua', 'No moverse nunca'],
    explanation: 'Descansar, beber agua y moverse ayudan a la salud.'
  },
  {
    id: 'sci-history-001',
    subject: 'science',
    skill: 'sci_time_history',
    type: 'choice',
    difficulty: 2,
    prompt: 'Que etapa va antes: Prehistoria o Edad Antigua?',
    answer: 'Prehistoria',
    options: ['Edad Antigua', 'Prehistoria', 'Edad Media'],
    explanation: 'La Prehistoria sucede antes de la Edad Antigua.'
  },
  {
    id: 'sci-environment-001',
    subject: 'science',
    skill: 'sci_environment',
    type: 'choice',
    difficulty: 2,
    prompt: 'Que accion cuida mejor el entorno?',
    answer: 'Separar residuos para reciclar',
    options: ['Tirar papeles al suelo', 'Separar residuos para reciclar', 'Dejar luces encendidas siempre'],
    explanation: 'Separar residuos ayuda a reutilizar materiales y cuidar el entorno.'
  }
];

const READING_BANK = [
  {
    id: 'read-001',
    subject: 'language',
    skill: 'lang_literal',
    difficulty: 1,
    title: 'La peonza de Leo',
    text: 'Leo encontro una peonza roja en el taller. La limpio con cuidado y la guardo para el torneo del viernes.',
    questions: [
      {
        prompt: 'De que color era la peonza?',
        answer: 'Roja',
        options: ['Roja', 'Verde', 'Azul']
      },
      {
        prompt: 'Cuando sera el torneo?',
        answer: 'El viernes',
        options: ['El lunes', 'El viernes', 'El domingo']
      }
    ]
  },
  {
    id: 'read-002',
    subject: 'language',
    skill: 'lang_inference',
    difficulty: 2,
    title: 'Nubes en la arena',
    text: 'Antes de salir, Carlitos miro por la ventana. El cielo estaba gris y su madre le dio un impermeable.',
    questions: [
      {
        prompt: 'Que tiempo parece que hara?',
        answer: 'Puede llover',
        options: ['Puede llover', 'Hara mucho sol', 'Habra nieve en la playa']
      }
    ]
  }
];

const OFFLINE_MISSIONS = [
  {
    id: 'offline-move-001',
    subject: 'movement',
    skill: 'move_warmup',
    type: 'offline',
    title: 'Lanzador preparado',
    instructions: 'Haz 3 minutos de calentamiento: cuello suave, brazos, rodillas y 10 saltos tranquilos.',
    parentPrompt: 'Confirma que lo ha hecho con calma y sin dolor.'
  },
  {
    id: 'offline-art-001',
    subject: 'arts',
    skill: 'art_color_line_texture',
    type: 'project',
    title: 'Disena una peonza',
    instructions: 'Dibuja una peonza con 3 colores, 2 lineas distintas y una textura inventada.',
    parentPrompt: 'Pide que explique por que ha elegido esos colores.'
  },
  {
    id: 'offline-sci-001',
    subject: 'science',
    skill: 'sci_materials',
    type: 'project',
    title: 'Clasificador de materiales',
    instructions: 'Busca 5 objetos de casa y clasificalos en madera, metal, plastico, tela o papel.',
    parentPrompt: 'Comprueba que puede explicar al menos dos clasificaciones.'
  }
];

function getAllSkills() {
  return Object.values(SKILLS).flat();
}

function getSkill(skillId) {
  return getAllSkills().find(skill => skill.id === skillId) || null;
}

function getQuestionsBySkill(skillId) {
  return QUESTION_BANK.filter(question => question.skill === skillId);
}

function validateCurriculumData() {
  const subjectIds = new Set(Object.keys(SUBJECTS));
  const skillIds = new Set(getAllSkills().map(skill => skill.id));
  const errors = [];

  Object.values(SUBJECTS).forEach(subject => {
    if (!subject.id || !subject.name || !subject.worldName) errors.push(`Materia incompleta: ${subject.id}`);
  });

  Object.entries(SKILLS).forEach(([subjectId, skills]) => {
    if (!subjectIds.has(subjectId)) errors.push(`Habilidades con materia inexistente: ${subjectId}`);
    skills.forEach(skill => {
      if (!skill.id || !skill.name) errors.push(`Habilidad incompleta en ${subjectId}`);
    });
  });

  SUMMER_WEEKS.forEach(week => {
    if (!week.week || !week.title || !Array.isArray(week.dailyPlan) || week.dailyPlan.length !== 5) {
      errors.push(`Semana incompleta: ${week.week}`);
    }
    week.subjects.forEach(subjectId => {
      if (!subjectIds.has(subjectId)) errors.push(`Semana ${week.week} usa materia inexistente: ${subjectId}`);
    });
    week.skills.forEach(skillId => {
      if (!skillIds.has(skillId)) errors.push(`Semana ${week.week} usa habilidad inexistente: ${skillId}`);
    });
    week.dailyPlan.forEach(([subjectId, missionType, skillId]) => {
      if (!subjectIds.has(subjectId)) errors.push(`Plan semana ${week.week} usa materia inexistente: ${subjectId}`);
      if (!MISSION_TYPES[missionType]) errors.push(`Plan semana ${week.week} usa tipo inexistente: ${missionType}`);
      if (!skillIds.has(skillId)) errors.push(`Plan semana ${week.week} usa habilidad inexistente: ${skillId}`);
    });
  });

  QUESTION_BANK.forEach(question => {
    if (!subjectIds.has(question.subject)) errors.push(`Pregunta ${question.id} usa materia inexistente`);
    if (!skillIds.has(question.skill)) errors.push(`Pregunta ${question.id} usa habilidad inexistente`);
    if (!question.prompt || !question.answer || !Array.isArray(question.options) || question.options.length < 3) {
      errors.push(`Pregunta incompleta: ${question.id}`);
    }
  });

  return {
    ok: errors.length === 0,
    errors
  };
}

const CurriculumData = {
  version: CURRICULUM_VERSION,
  subjects: SUBJECTS,
  skills: SKILLS,
  missionTypes: MISSION_TYPES,
  summerWeeks: SUMMER_WEEKS,
  diagnosticBlueprint: DIAGNOSTIC_BLUEPRINT,
  questionBank: QUESTION_BANK,
  readingBank: READING_BANK,
  offlineMissions: OFFLINE_MISSIONS,
  getAllSkills,
  getSkill,
  getQuestionsBySkill,
  validate: validateCurriculumData
};

window.CurriculumData = CurriculumData;
