// ----------------------------------------------------
// CURRICULUM DATA: Summer bridge from 2nd to 3rd grade
// ----------------------------------------------------

const CURRICULUM_VERSION = 1;

const DYNAMIC_WORDS = {
  names: ['Leo', 'Marta', 'Carlitos', 'Sara', 'Nico', 'Luna', 'Pablo', 'Iris', 'Carla', 'Dani', 'Ana', 'Ekusu', 'Bird', 'Multi', 'Valt', 'Aiger', 'Dante', 'Bell', 'Pri'],
  beys: ['Dran Sword', 'Hell Scythe', 'Wizard Arrow', 'Knight Shield', 'Cobalt Drake', 'Viper Tail', 'Leon Claw', 'Rhino Horn', 'Shark Edge', 'Dran Dagger', 'Hells Chain', 'Phoenix Wing'],
  stadiums: ['Estadio X-Line', 'Arena Extrema', 'Coliseo de Combate', 'Tornado Stadium', 'Ruinas del Duelo'],
  objects: ['peonzas', 'cartas', 'canicas', 'pegatinas', 'piezas de repuesto', 'lanzadores'],
  locations: ['el taller de peonzas', 'la Arena X', 'el patio del colegio', 'el club de entrenamiento', 'la torre del conocimiento']
};


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
    { id: 'lang_vocabulary', name: 'Vocabulario en contexto', gradeBand: '3-inicio', masteryTarget: 75 },
    { id: 'lang_text_structure', name: 'Tipos y estructura de texto', gradeBand: 'puente', masteryTarget: 70 },
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
    options: ['backpack', 'lunchbox', 'notebook'],
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
    options: ['apples', 'swimming', 'reading'],
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

function buildChoiceQuestion(id, subject, skill, difficulty, prompt, answer, options, explanation) {
  const cleanOptions = [...new Set([answer, ...options].map(option => String(option)))].slice(0, 4);
  while (cleanOptions.length < 3) cleanOptions.push(`Opcion ${cleanOptions.length + 1}`);
  return {
    id,
    subject,
    skill,
    type: 'choice',
    difficulty,
    prompt,
    answer: String(answer),
    options: cleanOptions,
    explanation
  };
}

function numberOptions(answer, offsets = [-10, -1, 1, 10]) {
  const value = Number(answer);
  return [value, ...offsets.map(offset => value + offset)]
    .filter(option => Number.isFinite(option) && option >= 0)
    .map(option => String(option));
}

function buildGeneratedMathQuestions() {
  const questions = [];
  [134, 287, 506, 719, 840, 999].forEach((number, index) => {
    const hundreds = Math.floor(number / 100);
    const tens = Math.floor((number % 100) / 10);
    const units = number % 10;
    questions.push(buildChoiceQuestion(
      `gen-math-999-place-${index + 1}`,
      'math',
      'math_number_999',
      1,
      `En el numero ${number}, que cifra esta en las decenas?`,
      tens,
      [hundreds, units, tens + 1, Math.max(0, tens - 1)],
      'La cifra de las decenas es la segunda empezando por la derecha.'
    ));
    questions.push(buildChoiceQuestion(
      `gen-math-999-prev-${index + 1}`,
      'math',
      'math_number_999',
      1,
      `Que numero va justo antes de ${number}?`,
      number - 1,
      numberOptions(number - 1, [-2, 1, 2]),
      'El numero anterior es uno menos.'
    ));
  });

  [1204, 2309, 3450, 4081, 6725, 9999].forEach((number, index) => {
    const thousands = Math.floor(number / 1000);
    const hundreds = Math.floor((number % 1000) / 100);
    questions.push(buildChoiceQuestion(
      `gen-math-9999-thousands-${index + 1}`,
      'math',
      'math_number_9999',
      2,
      `En ${number}, cuantas unidades de millar hay?`,
      thousands,
      [hundreds, thousands + 1, Math.max(0, thousands - 1)],
      'La unidad de millar es la primera cifra en numeros de cuatro cifras.'
    ));
    questions.push(buildChoiceQuestion(
      `gen-math-9999-next-${index + 1}`,
      'math',
      'math_number_9999',
      2,
      `Que numero va justo despues de ${number}?`,
      number + 1,
      numberOptions(number + 1, [-10, -1, 10]),
      'El numero siguiente es uno mas.'
    ));
  });

  [
    [37, 25], [48, 16], [125, 34], [236, 52], [408, 191], [720, 83]
  ].forEach(([a, b], index) => {
    questions.push(buildChoiceQuestion(
      `gen-math-add-${index + 1}`,
      'math',
      'math_add_sub',
      index < 2 ? 1 : 2,
      `Calcula ${a} + ${b}.`,
      a + b,
      numberOptions(a + b, [-10, -1, 1, 10]),
      'Suma unidades, decenas y centenas con orden.'
    ));
    questions.push(buildChoiceQuestion(
      `gen-math-sub-${index + 1}`,
      'math',
      'math_add_sub',
      index < 2 ? 1 : 2,
      `Calcula ${a + b} - ${b}.`,
      a,
      numberOptions(a, [-10, -1, 1, 10]),
      'La resta deshace la suma.'
    ));
  });

  [
    ['Lia tiene 24 cromos y gana 13 mas. Cuantos tiene ahora?', 37, 'sumar'],
    ['En una caja habia 58 peonzas y se vendieron 19. Cuantas quedan?', 39, 'restar'],
    ['Carlos lee 18 paginas por la manana y 21 por la tarde. Cuantas lee en total?', 39, 'sumar'],
    ['Hay 36 ninos en dos equipos iguales. Cuantos ninos hay por equipo?', 18, 'repartir'],
    ['Cada rival tiene 4 piezas y hay 6 rivales. Cuantas piezas hay?', 24, 'multiplicar'],
    ['Una entrada cuesta 7 monedas. Cuanto cuestan 3 entradas?', 21, 'multiplicar']
  ].forEach(([prompt, answer, clue], index) => {
    questions.push(buildChoiceQuestion(
      `gen-math-problem-${index + 1}`,
      'math',
      'math_word_problems',
      index < 3 ? 1 : 2,
      prompt,
      answer,
      numberOptions(answer, [-6, -1, 1, 6]),
      `Busca los datos y decide si toca ${clue}.`
    ));
  });

  [2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((table) => {
    [2, 3, 4, 5].forEach((groups) => {
      const answer = table * groups;
      questions.push(buildChoiceQuestion(
        `gen-math-groups-${table}-${groups}`,
        'math',
        'math_tables_groups',
        2,
        `${groups} grupos de ${table} son...`,
        answer,
        numberOptions(answer, [-table, -1, table]),
        'Multiplicar es juntar grupos iguales.'
      ));
    });
    [6, 7, 8, 9].forEach((factor) => {
      const answer = table * factor;
      questions.push(buildChoiceQuestion(
        `gen-math-fast-${table}-${factor}`,
        'math',
        'math_multiply_fast',
        table <= 5 ? 2 : 3,
        `${table} x ${factor} = ?`,
        answer,
        numberOptions(answer, [-table, -factor, factor]),
        'Recuerda la tabla y comprueba con suma repetida si dudas.'
      ));
    });
  });

  [
    [12, 3], [15, 5], [18, 3], [20, 4], [24, 6], [32, 8], [36, 9], [42, 7]
  ].forEach(([total, groups], index) => {
    const answer = total / groups;
    questions.push(buildChoiceQuestion(
      `gen-math-division-${index + 1}`,
      'math',
      'math_division_intro',
      2,
      `Reparte ${total} piezas en ${groups} grupos iguales. Cuantas van en cada grupo?`,
      answer,
      numberOptions(answer, [-2, -1, 1, 2]),
      'Dividir es repartir en partes iguales.'
    ));
  });

  [
    ['Que hora marca el reloj si son las 3 y media?', '3:30', ['3:00', '4:30', '2:30']],
    ['Cuantos centimos hay en 1 euro?', '100', ['10', '50', '1000']],
    ['Un lapiz mide mejor en...', 'centimetros', ['litros', 'kilos', 'euros']],
    ['Una botella de agua se mide mejor en...', 'litros', ['centimetros', 'metros', 'dias']],
    ['Si pagas 2 euros y algo cuesta 1 euro, te devuelven...', '1 euro', ['10 euros', '0 euros', '5 euros']]
  ].forEach(([prompt, answer, options], index) => {
    questions.push(buildChoiceQuestion(
      `gen-math-measure-${index + 1}`,
      'math',
      'math_measure_time_money',
      2,
      prompt,
      answer,
      options,
      'Elige la unidad o calculo que encaja con la situacion.'
    ));
  });

  [
    ['Un cuadrado tiene 4 lados de 3 cm. Cual es su perimetro?', 12],
    ['Un triangulo tiene cuantos lados?', 3],
    ['Un rectangulo tiene lados 5, 5, 2 y 2. Cual es su perimetro?', 14],
    ['En una tabla hay 6 votos azules y 4 rojos. Cuantos votos hay en total?', 10],
    ['Que figura tiene todos sus lados iguales y 4 esquinas?', 'cuadrado']
  ].forEach(([prompt, answer], index) => {
    questions.push(buildChoiceQuestion(
      `gen-math-geometry-${index + 1}`,
      'math',
      'math_geometry_data',
      2,
      prompt,
      answer,
      typeof answer === 'number' ? numberOptions(answer, [-2, -1, 1, 2]) : ['rectangulo', 'triangulo', 'circulo'],
      'Observa lados, datos y suma cuando piden total o perimetro.'
    ));
  });

  return questions;
}

function buildGeneratedLanguageQuestions() {
  const items = [
    ['lang_read_fluency', 'Que ayuda a leer mejor en voz alta?', 'hacer pausas en puntos y comas', ['leer sin respirar', 'saltar palabras', 'cerrar el libro'], 'Leer con ritmo ayuda a comprender.'],
    ['lang_literal', 'Marta guardo la peonza azul en la mochila. Donde la guardo?', 'en la mochila', ['en el cajon', 'en el parque', 'en la mesa'], 'La respuesta esta escrita en el texto.'],
    ['lang_inference', 'Pablo cogio el paraguas porque el cielo estaba oscuro. Que puede pasar?', 'puede llover', ['hara mucho calor', 'nevara seguro', 'sera de noche'], 'Inferir es deducir una idea con pistas.'],
    ['lang_main_idea', 'Un texto cuenta como cuidar una mascota: darle comida, agua y carino. Cual es la idea principal?', 'cuidar una mascota', ['comprar juguetes', 'hacer una carrera', 'pintar una casa'], 'La idea principal resume todo el texto.'],
    ['lang_order_text', 'Que va primero en una historia sencilla?', 'inicio', ['final', 'titulo de creditos', 'despedida'], 'Una historia suele tener inicio, nudo y final.'],
    ['lang_writing_story', 'Para escribir un cuento claro necesito...', 'inicio, nudo y final', ['solo una palabra', 'numeros sin frase', 'no revisar'], 'Esa estructura ayuda a ordenar la historia.'],
    ['lang_spelling', 'Elige la palabra bien escrita.', 'jirafa', ['girrafa', 'jirrafa', 'girafa'], 'Jirafa se escribe con j y una sola r.'],
    ['lang_oral', 'Para explicar una idea en voz alta conviene...', 'hablar claro y ordenar las ideas', ['gritar siempre', 'mirar al suelo todo el rato', 'decir palabras sueltas'], 'La expresion oral necesita claridad y orden.']
  ];
  const extras = [
    ['lang_spelling', 'Elige la palabra bien escrita.', 'guitarra', ['gitarra', 'guitara', 'juitarra'], 'Guitarra lleva gu y rr.'],
    ['lang_spelling', 'Completa: La ___ vuela en primavera.', 'golondrina', ['jolondrina', 'golonrina', 'golondina'], 'Golondrina se escribe con g.'],
    ['lang_literal', 'El gato duerme sobre la alfombra roja. De que color es la alfombra?', 'roja', ['azul', 'verde', 'blanca'], 'La informacion aparece directamente.'],
    ['lang_inference', 'Ana bosteza y se frota los ojos. Como esta Ana?', 'cansada', ['enfadada', 'mojada', 'perdida'], 'Las pistas indican cansancio.'],
    ['lang_main_idea', 'Un parrafo habla de reciclar papel, vidrio y plastico. Cual es el tema?', 'reciclaje', ['deportes', 'musica', 'comida'], 'Todas las ideas tratan del reciclaje.'],
    ['lang_order_text', 'Orden correcto para una receta.', 'preparar, cocinar y servir', ['servir, cocinar y preparar', 'cocinar, servir y preparar', 'servir, preparar y cocinar'], 'Primero se prepara, despues se cocina y al final se sirve.']
  ];
  return [...items, ...extras].flatMap((item, index) => {
    const [skill, prompt, answer, options, explanation] = item;
    return [
      buildChoiceQuestion(`gen-lang-${index + 1}`, 'language', skill, index < items.length ? 1 : 2, prompt, answer, options, explanation),
      buildChoiceQuestion(`gen-lang-var-${index + 1}`, 'language', skill, index < items.length ? 1 : 2, `${prompt} Elige la mejor opcion.`, answer, options.slice().reverse(), explanation)
    ];
  });
}

function buildGeneratedEnglishQuestions() {
  const rows = [
    ['eng_greetings', 'Choose a greeting.', 'Hello!', ['Goodbye!', 'See you later!', 'Good night!'], 'Hello es un saludo.'],
    ['eng_greetings', 'How do you say "buenos dias"?', 'Good morning', ['Good afternoon', 'Good night', 'Good evening'], 'Good morning se usa por la manana.'],
    ['eng_vocabulary', 'What color is "blue"?', 'azul', ['verde', 'rojo', 'amarillo'], 'Blue significa azul.'],
    ['eng_vocabulary', 'Choose the animal.', 'cat', ['table', 'chair', 'pencil'], 'Cat es un animal.'],
    ['eng_like_routines', 'Complete: I like ___ football.', 'playing', ['watching', 'to go', 'the'], 'I like playing expresa una actividad que gusta.'],
    ['eng_like_routines', 'Choose the routine.', 'I brush my teeth.', ['I am very tall.', 'This is red.', 'She has a dog.'], 'Brush my teeth es una rutina.'],
    ['eng_short_dialogue', 'Best answer: How are you?', 'I am fine, thank you.', ['I am eight years old.', 'My name is Ana.', 'I like apples.'], 'La pregunta pide como estas.'],
    ['eng_short_dialogue', 'Best answer: What do you like?', 'I like apples.', ['My name is Ana.', 'I am fine.', 'It is Monday.'], 'What do you like pregunta por gustos.']
  ];
  return rows.map((row, index) => buildChoiceQuestion(`gen-eng-${index + 1}`, 'english', row[0], index < 4 ? 1 : 2, row[1], row[2], row[3], row[4]));
}

function buildGeneratedScienceArtMovementQuestions() {
  const rows = [
    ['science', 'sci_living_things', 'Que necesitan normalmente las plantas para vivir?', 'agua, luz y aire', ['solo agua, sin luz', 'solo tierra, sin agua', 'solo luz, sin tierra'], 'Las plantas son seres vivos y tienen necesidades.'],
    ['science', 'sci_living_things', 'Cual es un animal vertebrado?', 'perro', ['caracol', 'lombriz', 'medusa'], 'Los vertebrados tienen columna vertebral.'],
    ['science', 'sci_health', 'Que desayuno ayuda mas a empezar el dia?', 'fruta, leche o pan y agua', ['solo zumo azucarado', 'galletas de chocolate solamente', 'patatas fritas con refresco'], 'Un desayuno equilibrado da energia.'],
    ['science', 'sci_health', 'Antes de comer conviene...', 'lavarse las manos', ['limpiar la mesa solamente', 'ponerse el abrigo', 'abrir la ventana'], 'Lavarse las manos reduce microbios.'],
    ['science', 'sci_materials', 'Que material suele ser flexible?', 'tela', ['piedra', 'cristal', 'ladrillo'], 'La tela se dobla con facilidad.'],
    ['science', 'sci_materials', 'Si el hielo se calienta, se convierte en...', 'agua', ['arena', 'papel', 'metal'], 'El hielo es agua solida.'],
    ['science', 'sci_time_history', 'Que estudian los historiadores?', 'el pasado', ['el futuro lejano', 'el clima del espacio', 'solo matematicas'], 'La historia estudia hechos del pasado.'],
    ['science', 'sci_time_history', 'Los romanos pertenecen a...', 'Edad Antigua', ['Prehistoria', 'Edad Contemporanea', 'futuro'], 'Roma es una civilizacion de la Edad Antigua.'],
    ['science', 'sci_environment', 'Para ahorrar energia debo...', 'apagar luces que no uso', ['dejar las luces encendidas al salir', 'poner mas lamparas de las necesarias', 'cargar dispositivos aunque esten llenos'], 'Ahorrar energia cuida el entorno.'],
    ['science', 'sci_environment', 'Que contenedor suele usar el papel?', 'azul', ['verde', 'amarillo', 'marron'], 'El contenedor azul se usa para papel y carton.'],
    ['arts', 'art_color_line_texture', 'Un color primario es...', 'rojo', ['naranja', 'marron', 'gris'], 'Rojo, azul y amarillo son colores primarios.'],
    ['arts', 'art_color_line_texture', 'Una textura puede ser...', 'rugosa', ['brillante', 'oscura'], 'La textura describe como parece o se siente una superficie.'],
    ['arts', 'art_storyboard', 'Un storyboard sirve para...', 'ordenar una historia en dibujos', ['decorar un cuaderno', 'colorear un mapa', 'escribir un poema'], 'Ayuda a planificar escenas.'],
    ['arts', 'art_music_rhythm', 'El ritmo en musica es...', 'una repeticion ordenada de sonidos', ['la velocidad de una cancion', 'el volumen de los instrumentos'], 'El ritmo organiza sonidos en el tiempo.'],
    ['movement', 'move_warmup', 'Antes de hacer ejercicio conviene...', 'calentar suave', ['empezar corriendo al maximo', 'hacer ejercicios muy bruscos', 'saltar sin preparacion'], 'El calentamiento prepara el cuerpo.'],
    ['movement', 'move_coordination', 'Botar una pelota mientras caminas trabaja...', 'coordinacion', ['fuerza de brazos', 'velocidad de carrera'], 'Coordinar es usar movimientos juntos con control.'],
    ['movement', 'move_rules_teamwork', 'En un juego de equipo es importante...', 'respetar reglas y companeros', ['hacer trampas', 'empujar siempre', 'no escuchar'], 'Las reglas hacen el juego seguro y justo.']
  ];
  return rows.flatMap((row, index) => {
    const [subject, skill, prompt, answer, options, explanation] = row;
    return [
      buildChoiceQuestion(`gen-${subject}-${index + 1}`, subject, skill, index < 10 ? 2 : 1, prompt, answer, options, explanation),
      buildChoiceQuestion(`gen-${subject}-review-${index + 1}`, subject, skill, index < 10 ? 2 : 1, `${prompt} Marca la respuesta correcta.`, answer, options.slice().reverse(), explanation)
    ];
  });
}

QUESTION_BANK.push(
  ...buildGeneratedMathQuestions(),
  ...buildGeneratedLanguageQuestions(),
  ...buildGeneratedEnglishQuestions(),
  ...buildGeneratedScienceArtMovementQuestions()
);

// Preguntas paramétricas y con tokens dinámicos
QUESTION_BANK.push(
  {
    id: 'parametric-math-add-1',
    subject: 'math',
    skill: 'math_add_sub',
    type: 'choice',
    difficulty: 1,
    isParametric: true,
    mathType: 'add',
    prompt: 'Calcula {numA} + {numB}.',
    answer: '{result}',
    options: ['{result}', '0', '0'],
    explanation: 'Sumando con cuidado: {numA} + {numB} = {result}.'
  },
  {
    id: 'parametric-math-sub-1',
    subject: 'math',
    skill: 'math_add_sub',
    type: 'choice',
    difficulty: 2,
    isParametric: true,
    mathType: 'sub',
    prompt: 'Calcula {numA} - {numB}.',
    answer: '{result}',
    options: ['{result}', '0', '0'],
    explanation: 'Restando con cuidado: {numA} - {numB} = {result}.'
  },
  {
    id: 'parametric-math-mult-1',
    subject: 'math',
    skill: 'math_multiply_fast',
    type: 'choice',
    difficulty: 2,
    isParametric: true,
    mathType: 'mult',
    prompt: '¿Cuánto es {numA} x {numB}?',
    answer: '{result}',
    options: ['{result}', '0', '0'],
    explanation: 'Multiplicar es sumar repetidamente: {numA} veces {numB} es {result}.'
  },
  {
    id: 'parametric-math-div-1',
    subject: 'math',
    skill: 'math_division_intro',
    type: 'choice',
    difficulty: 3,
    isParametric: true,
    mathType: 'div',
    prompt: 'Repartimos {numA} peonzas entre {numB} amigos. ¿Cuántas recibe cada uno?',
    answer: '{result}',
    options: ['{result}', '0', '0'],
    explanation: 'Dividir es hacer partes iguales: {numA} entre {numB} da {result}.'
  },
  {
    id: 'dynamic-lang-literal-1',
    subject: 'language',
    skill: 'lang_literal',
    type: 'choice',
    difficulty: 1,
    prompt: 'Texto: {name} guarda su peonza {beyblade} en {location}. ¿Dónde la guarda?',
    answer: 'en {location}',
    options: ['en {location}', 'en el bolsillo', 'debajo de la cama'],
    explanation: 'La respuesta correcta está explícita en el texto.'
  },
  {
    id: 'dynamic-lang-inference-1',
    subject: 'language',
    skill: 'lang_inference',
    type: 'choice',
    difficulty: 2,
    prompt: 'Texto: {name} bosteza y guarda su {beyblade} en el club. ¿Cómo se siente?',
    answer: 'Tiene sueño o cansancio',
    options: ['Tiene sueño o cansancio', 'Tiene mucha energía', 'Tiene hambre'],
    explanation: 'Bostezar es una pista clara de cansancio o sueño.'
  },
  {
    id: 'dynamic-eng-vocab-1',
    subject: 'english',
    skill: 'eng_vocabulary',
    type: 'choice',
    difficulty: 1,
    prompt: 'En {location}, {name} dice "I need my launch tool". ¿Qué necesita?',
    answer: 'un lanzador',
    options: ['un lanzador', 'una peonza', 'un libro'],
    explanation: '"Launch tool" hace referencia al lanzador de peonzas.'
  },
  {
    id: 'dynamic-sci-living-1',
    subject: 'science',
    skill: 'sci_living_things',
    type: 'choice',
    difficulty: 1,
    prompt: 'Si {name} lleva a su perro a pasear por {location}, ¿cuál de ellos es un ser vivo?',
    answer: 'Ambos, {name} y su perro',
    options: ['Ambos, {name} y su perro', 'Solo el perro', 'Ninguno'],
    explanation: 'Las personas y los animales son seres vivos porque nacen, crecen y respiran.'
  }
);

const READING_BANK = [];

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

function makeChoiceQuestion(id, subject, skill, difficulty, prompt, answer, wrongOptions, explanation) {
  return {
    id,
    subject,
    skill,
    type: 'choice',
    difficulty,
    prompt,
    answer: String(answer),
    options: [String(answer), ...wrongOptions.map(option => String(option))].slice(0, 3),
    explanation
  };
}

function appendMathExpansion() {
  const number999 = [
    [3, 5, 8], [6, 0, 4], [7, 9, 1], [2, 8, 6], [5, 4, 0], [8, 1, 9], [1, 7, 5], [9, 2, 3]
  ];
  number999.forEach(([hundreds, tens, units], index) => {
    const answer = hundreds * 100 + tens * 10 + units;
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-number-999-exp-${String(index + 1).padStart(2, '0')}`,
      'math',
      'math_number_999',
      index < 4 ? 1 : 2,
      `Que numero tiene ${hundreds} centenas, ${tens} decenas y ${units} unidades?`,
      answer,
      [hundreds * 100 + units * 10 + tens, hundreds * 100 + tens],
      `${hundreds} centenas son ${hundreds * 100}, ${tens} decenas son ${tens * 10} y ${units} unidades son ${units}.`
    ));
  });

  const number9999 = [
    [2, 4, 6, 8], [5, 0, 7, 3], [3, 9, 1, 0], [8, 2, 5, 6], [1, 6, 0, 9], [7, 3, 4, 1], [4, 8, 2, 5], [9, 1, 6, 2]
  ];
  number9999.forEach(([thousands, hundreds, tens, units], index) => {
    const answer = thousands * 1000 + hundreds * 100 + tens * 10 + units;
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-number-9999-exp-${String(index + 1).padStart(2, '0')}`,
      'math',
      'math_number_9999',
      index < 3 ? 2 : 3,
      `Escribe el numero: ${thousands} millares, ${hundreds} centenas, ${tens} decenas y ${units} unidades.`,
      answer,
      [thousands * 1000 + tens * 100 + hundreds * 10 + units, thousands * 1000 + hundreds * 100 + units * 10 + tens],
      `Se colocan millares, centenas, decenas y unidades en ese orden: ${answer}.`
    ));
  });

  [
    [47, 36, '+'], [58, 27, '+'], [124, 39, '+'], [236, 148, '+'], [92, 37, '-'], [140, 65, '-'],
    [305, 128, '-'], [486, 209, '-'], [199, 87, '+'], [720, 145, '-'], [368, 256, '+'], [900, 375, '-']
  ].forEach(([a, b, op], index) => {
    const answer = op === '+' ? a + b : a - b;
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-add-sub-exp-${String(index + 1).padStart(2, '0')}`,
      'math',
      'math_add_sub',
      index < 6 ? 2 : 3,
      `${a} ${op} ${b} = ?`,
      answer,
      [answer + 10, Math.max(0, answer - 10)],
      op === '+' ? `Suma por partes: primero decenas y centenas, despues unidades.` : `Resta con cuidado, reagrupando si hace falta.`
    ));
  });

  [
    ['Marta tenia 18 cromos y compro 7 mas. Cuantos tiene ahora?', 25, [11, 24], 'Gana cromos, asi que se suma.'],
    ['En una caja habia 42 canicas y se perdieron 16. Cuantas quedan?', 26, [58, 36], 'Se quitan canicas, asi que se resta.'],
    ['Hay 5 bolsas con 4 pegatinas cada una. Cuantas pegatinas hay?', 20, [9, 25], 'Son grupos iguales: 5 x 4.'],
    ['Carlitos lee 9 paginas cada dia durante 3 dias. Cuantas paginas lee?', 27, [12, 21], 'Tres grupos de 9 son 27.'],
    ['Reparten 24 cartas entre 4 jugadores. Cuantas recibe cada uno?', 6, [8, 20], '24 dividido entre 4 da 6.'],
    ['Una entrada cuesta 6 euros. Cuanto cuestan 4 entradas?', 24, [10, 30], 'Cuatro grupos de 6 euros son 24.'],
    ['En el parque hay 37 ninos y llegan 18 mas. Cuantos hay en total?', 55, [45, 65], 'Llegan mas ninos: 37 + 18.'],
    ['Tenia 80 puntos y gaste 35. Cuantos puntos quedan?', 45, [55, 115], 'Gastar puntos significa restar.'],
    ['Hay 3 filas con 8 sillas en cada fila. Cuantas sillas hay?', 24, [11, 32], '3 x 8 = 24.'],
    ['Se preparan 36 bocadillos para 6 mesas iguales. Cuantos van en cada mesa?', 6, [5, 30], '36 repartido en 6 grupos iguales es 6.'],
    ['Un album tiene 64 huecos y ya hay 29 pegatinas. Cuantos huecos faltan?', 35, [93, 45], 'Para saber lo que falta se resta 64 - 29.'],
    ['Cada equipo tiene 7 jugadores. Cuantos jugadores hay en 4 equipos?', 28, [11, 24], '4 equipos de 7 son 28 jugadores.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-problem-exp-${String(index + 1).padStart(2, '0')}`,
      'math',
      'math_word_problems',
      index < 4 ? 2 : 3,
      prompt,
      answer,
      wrong,
      explanation
    ));
  });

  [
    [2, 6], [3, 5], [4, 7], [5, 8], [6, 6], [7, 3], [8, 4], [9, 2], [10, 5], [3, 9]
  ].forEach(([groups, size], index) => {
    const answer = groups * size;
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-groups-exp-${String(index + 1).padStart(2, '0')}`,
      'math',
      'math_tables_groups',
      index < 5 ? 2 : 3,
      `Hay ${groups} grupos con ${size} objetos en cada grupo. Cuantos objetos hay?`,
      answer,
      [groups + size, answer + groups],
      `${groups} grupos de ${size} se puede pensar como ${groups} x ${size}.`
    ));
  });

  [
    [2, 7], [2, 9], [3, 4], [3, 8], [4, 4], [4, 9], [5, 6], [5, 8], [6, 7], [6, 9],
    [7, 7], [7, 8], [8, 8], [8, 9], [9, 9], [10, 6], [10, 10], [3, 7], [4, 6], [5, 9]
  ].forEach(([a, b], index) => {
    const answer = a * b;
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-mult-exp-${String(index + 1).padStart(2, '0')}`,
      'math',
      'math_multiply_fast',
      index < 8 ? 2 : 3,
      `${a} x ${b} = ?`,
      answer,
      [answer + a, Math.max(0, answer - b)],
      `Puedes contar ${a} grupos de ${b} o usar la tabla: ${a} x ${b} = ${answer}.`
    ));
  });

  [
    [12, 3], [15, 5], [20, 4], [21, 3], [24, 6], [28, 7], [30, 5], [32, 8], [36, 6], [40, 10]
  ].forEach(([total, groups], index) => {
    const answer = total / groups;
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-div-exp-${String(index + 1).padStart(2, '0')}`,
      'math',
      'math_division_intro',
      index < 5 ? 2 : 3,
      `Reparte ${total} objetos en ${groups} grupos iguales. Cuantos van en cada grupo?`,
      answer,
      [answer + 1, Math.max(1, answer - 1)],
      `Busca un numero que multiplicado por ${groups} de ${total}. Ese numero es ${answer}.`
    ));
  });

  [
    ['Son las 3:00. Que hora sera dentro de 2 horas?', '5:00', ['4:00', '6:00'], 'Avanzar 2 horas desde las 3:00 llega a las 5:00.'],
    ['Un lapiz cuesta 50 centimos. Compras 2. Cuanto pagas?', '1 euro', ['50 centimos', '2 euros'], '50 + 50 centimos hacen 100 centimos, que es 1 euro.'],
    ['Que instrumento mide la longitud de una mesa?', 'regla o metro', ['termometro', 'reloj'], 'La longitud se mide con regla o metro.'],
    ['Un tetrabrik tiene 1 litro. Cuantos litros hay en 3 tetrabriks?', '3 litros', ['1 litro', '4 litros'], 'Son 3 grupos de 1 litro.'],
    ['Si sales a las 10:30 y vuelves a las 11:30, cuanto tiempo pasa?', '1 hora', ['30 minutos', '2 horas'], 'De 10:30 a 11:30 pasa una hora.'],
    ['Tienes 5 euros y gastas 2 euros. Cuanto queda?', '3 euros', ['7 euros', '2 euros'], 'Hay que restar 5 - 2.'],
    ['Que pesa mas normalmente?', 'una mochila llena', ['un folio', 'una goma pequena'], 'Una mochila llena suele tener mas masa.'],
    ['Medio metro son...', '50 centimetros', ['5 centimetros', '500 centimetros'], 'Un metro tiene 100 centimetros; la mitad son 50.'],
    ['Si una clase empieza a las 9:00 y dura 45 minutos, termina a las...', '9:45', ['9:30', '10:45'], 'Sumamos 45 minutos a las 9:00.'],
    ['Compras algo de 4 euros y pagas con 10 euros. Cuanto te devuelven?', '6 euros', ['4 euros', '14 euros'], 'El cambio es 10 - 4.'],
    ['Para medir agua de una botella usamos...', 'litros', ['kilometros', 'gramos'], 'La capacidad de liquidos se mide en litros.'],
    ['Un cuaderno mide unos 30...', 'centimetros', ['kilometros', 'litros'], 'Para objetos pequenos usamos centimetros.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-measure-exp-${String(index + 1).padStart(2, '0')}`,
      'math',
      'math_measure_time_money',
      index < 6 ? 2 : 3,
      prompt,
      answer,
      wrong,
      explanation
    ));
  });

  [
    ['Cuantos lados tiene un triangulo?', '3', ['4', '5'], 'Un triangulo siempre tiene 3 lados.'],
    ['Cuantos vertices tiene un cuadrado?', '4', ['3', '5'], 'El cuadrado tiene 4 esquinas o vertices.'],
    ['El perimetro de un cuadrado de lado 3 cm es...', '12 cm', ['6 cm', '9 cm'], 'Se suman sus cuatro lados: 3 + 3 + 3 + 3.'],
    ['Que figura tiene todos sus puntos a la misma distancia del centro?', 'circulo', ['rectangulo', 'triangulo'], 'El circulo rodea el centro a distancia constante.'],
    ['Si un rectangulo mide 5 cm y 2 cm, su perimetro es...', '14 cm', ['7 cm', '10 cm'], '5 + 2 + 5 + 2 = 14.'],
    ['En una tabla hay 6 votos para rojo, 3 para azul y 2 para verde. Que color gano?', 'rojo', ['azul', 'verde'], 'Rojo tiene el numero mayor de votos.'],
    ['Una grafica muestra lunes 4 libros y martes 7 libros. Que dia hubo mas libros?', 'martes', ['lunes', 'igual'], '7 es mayor que 4.'],
    ['Un angulo recto parece una esquina de...', 'cuaderno', ['rueda', 'cuerda'], 'Las esquinas de un cuaderno suelen formar angulos rectos.'],
    ['Que cuerpo geometrico se parece a una pelota?', 'esfera', ['cubo', 'cono'], 'Una pelota tiene forma de esfera.'],
    ['Que cuerpo geometrico se parece a una caja de zapatos?', 'prisma rectangular', ['esfera', 'cilindro'], 'Una caja de zapatos tiene caras rectangulares.'],
    ['Si ordenas datos de menor a mayor: 8, 3, 5. Cual va primero?', '3', ['5', '8'], 'El menor de los tres numeros es 3.'],
    ['Un plano sencillo sirve para...', 'orientarse', ['beber agua', 'medir fiebre'], 'Los planos ayudan a encontrar lugares y caminos.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-geo-data-exp-${String(index + 1).padStart(2, '0')}`,
      'math',
      'math_geometry_data',
      index < 6 ? 2 : 3,
      prompt,
      answer,
      wrong,
      explanation
    ));
  });
}

function appendLanguageExpansion() {
  [
    ['Lee en voz alta: "La nave gira rapido". Que signo aparece al final?', 'punto', ['coma', 'interrogacion'], 'La frase termina con un punto.'],
    ['En "El sol sale temprano", cual es la primera palabra?', 'El', ['sol', 'temprano'], 'La lectura empieza por la palabra El.'],
    ['Que frase esta mejor separada en palabras?', 'Mi amigo juega.', ['Miamigo juega.', 'Mi amigojuega.'], 'Cada palabra debe ir separada.'],
    ['Que palabra ayuda a leer con pausa?', 'coma', ['numero', 'dibujo'], 'La coma marca una pausa corta.'],
    ['Cual se lee como una pregunta?', 'Donde esta?', ['Donde esta.', 'Donde esta!'], 'Los signos de interrogacion indican pregunta.'],
    ['Para leer mejor conviene...', 'respetar los puntos', ['saltar palabras', 'leer sin mirar'], 'Los signos ayudan a entender el texto.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`lang-fluency-exp-${String(index + 1).padStart(2, '0')}`, 'language', 'lang_read_fluency', 1, prompt, answer, wrong, explanation));
  });

  [
    ['Texto: Luis puso tres libros en la mesa azul. Donde puso los libros?', 'en la mesa azul', ['en la mochila', 'en el parque'], 'La respuesta esta escrita en el texto.'],
    ['Texto: Sara preparo una merienda con pan y queso. Que preparo Sara?', 'una merienda', ['una carta', 'un dibujo'], 'El texto dice que preparo una merienda.'],
    ['Texto: El tren llego a las cinco. A que hora llego?', 'a las cinco', ['a las tres', 'por la manana'], 'El dato aparece de forma literal.'],
    ['Texto: Nora riega la planta cada martes. Que riega Nora?', 'la planta', ['el coche', 'la mesa'], 'La planta es lo que riega.'],
    ['Texto: En la bolsa habia dos manzanas y un platano. Cuantas manzanas habia?', 'dos', ['una', 'tres'], 'El texto dice dos manzanas.'],
    ['Texto: Mateo llevo botas porque iba al monte. Que llevo Mateo?', 'botas', ['sandalias', 'guantes'], 'La palabra botas aparece en el texto.'],
    ['Texto: La clase visito el museo de ciencias. Que lugar visito?', 'el museo de ciencias', ['el cine', 'la piscina'], 'El lugar se nombra directamente.'],
    ['Texto: El perro de Ana se llama Coco. Como se llama el perro?', 'Coco', ['Ana', 'Luna'], 'El nombre del perro es Coco.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`lang-literal-exp-${String(index + 1).padStart(2, '0')}`, 'language', 'lang_literal', index < 5 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Texto: Pablo bostezo y apago la luz. Como se siente probablemente?', 'cansado', ['hambriento', 'enfadado'], 'Bostezar y apagar la luz son pistas de cansancio.'],
    ['Texto: La calle estaba mojada y todos llevaban paraguas. Que paso seguramente?', 'llovio', ['hizo mucho calor', 'hubo un concierto'], 'La calle mojada y los paraguas apuntan a lluvia.'],
    ['Texto: Clara sonrio al ver su regalo. Como se sintio?', 'contenta', ['asustada', 'aburrida'], 'Sonreir al recibir un regalo indica alegria.'],
    ['Texto: El vaso cayo al suelo y sono crash. Que ocurrio?', 'se rompio', ['se lleno', 'se escondio'], 'El sonido crash es una pista de rotura.'],
    ['Texto: Ivan estudio mucho y saco un diez. Por que saco buena nota?', 'porque estudio', ['porque durmio poco', 'porque perdio el libro'], 'La causa probable es estudiar.'],
    ['Texto: La nina se puso abrigo, bufanda y guantes. Que tiempo hacia?', 'frio', ['calor', 'viento de playa'], 'Esa ropa se usa cuando hace frio.'],
    ['Texto: Todos aplaudieron al final de la obra. Que les parecio?', 'les gusto', ['no la vieron', 'se fueron antes'], 'Aplaudir suele mostrar que gusto.'],
    ['Texto: El jardin estaba seco y las hojas caidas. Que necesitaba?', 'agua', ['pintura', 'musica'], 'Un jardin seco necesita agua.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`lang-inference-exp-${String(index + 1).padStart(2, '0')}`, 'language', 'lang_inference', 2, prompt, answer, wrong, explanation));
  });

  [
    ['Un texto habla de cepillarse los dientes despues de comer y antes de dormir. Cual es la idea principal?', 'cuidar los dientes', ['hacer deporte', 'ordenar juguetes'], 'Todas las frases tratan del cuidado dental.'],
    ['Un texto explica que los arboles dan sombra, frutos y oxigeno. Cual es la idea principal?', 'beneficios de los arboles', ['partes de una bicicleta', 'recetas de cocina'], 'Todo gira alrededor de los arboles.'],
    ['Un texto cuenta como preparar la mochila: libros, estuche y agenda. Cual es la idea principal?', 'preparar la mochila', ['jugar al futbol', 'visitar un museo'], 'Los detalles explican la preparacion de la mochila.'],
    ['Un texto describe normas de biblioteca: silencio, cuidar libros y devolverlos. Cual es la idea principal?', 'normas de biblioteca', ['normas de piscina', 'animales marinos'], 'Todos los detalles son normas de biblioteca.'],
    ['Un texto habla de tres amigos que entrenan para un torneo. Cual es la idea principal?', 'entrenamiento para un torneo', ['un viaje en tren', 'comprar fruta'], 'Los amigos entrenan para competir.'],
    ['Un texto explica por que hay que reciclar papel, vidrio y plastico. Cual es la idea principal?', 'reciclaje', ['musica', 'deportes de invierno'], 'Los ejemplos son materiales que se reciclan.'],
    ['Un texto describe como plantar una semilla y regarla. Cual es la idea principal?', 'plantar una semilla', ['limpiar una ventana', 'hacer una suma'], 'Las acciones forman el proceso de plantar.'],
    ['Un texto cuenta recuerdos del parque, amigos y juegos de infancia. Cual es la idea principal?', 'recuerdos de amistad', ['viajes espaciales', 'instrucciones de cocina'], 'El tema central son recuerdos con amigos.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`lang-main-exp-${String(index + 1).padStart(2, '0')}`, 'language', 'lang_main_idea', 2, prompt, answer, wrong, explanation));
  });

  [
    ['Orden correcto: 1 Me lavo las manos. 2 Como. 3 Recojo la mesa. Que va primero?', 'Me lavo las manos', ['Como', 'Recojo la mesa'], 'Antes de comer hay que lavarse las manos.'],
    ['Ordena una historia: salir de casa, llegar al cole, entrar en clase. Que va al final?', 'entrar en clase', ['salir de casa', 'llegar al cole'], 'Entrar en clase ocurre despues de llegar.'],
    ['Que conector sirve para continuar una secuencia?', 'despues', ['azul', 'mesa'], 'Despues indica orden temporal.'],
    ['En una receta, que suele ir antes?', 'preparar ingredientes', ['servir el plato', 'fregar al final'], 'Primero se preparan los ingredientes.'],
    ['Ordena: nudo, final, inicio. Que parte va primero?', 'inicio', ['nudo', 'final'], 'Una narracion empieza por el inicio.'],
    ['Que palabra indica causa?', 'porque', ['aunque', 'lapiz'], 'Porque explica la razon de algo.'],
    ['Si una frase empieza con "Por ultimo", esta en...', 'el final', ['el inicio', 'el titulo'], 'Por ultimo anuncia el cierre.'],
    ['Que frase esta completa?', 'El nino corre por el patio.', ['El nino corre por.', 'Corre patio el nino.'], 'Tiene sentido y orden correcto.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`lang-order-exp-${String(index + 1).padStart(2, '0')}`, 'language', 'lang_order_text', index < 4 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Para una historia con inicio, nudo y final, el inicio debe presentar...', 'personajes y lugar', ['solo la despedida', 'la solucion antes del problema'], 'El inicio situa quien aparece y donde ocurre.'],
    ['Que frase crea un problema para una historia?', 'De pronto se perdio la llave.', ['Todo estaba resuelto.', 'Fin.'], 'Un nudo presenta una dificultad.'],
    ['Que cierre es mejor?', 'Al final aprendieron a cooperar.', ['Habia una vez...', 'Entonces aparecio el problema.'], 'El cierre muestra como termina.'],
    ['Para describir a un personaje puedes decir...', 'como es y que le gusta', ['solo la pagina', 'el precio del lapiz'], 'La descripcion da rasgos del personaje.'],
    ['Que palabra mejora una narracion temporal?', 'mientras', ['triangulo', 'verde'], 'Mientras ayuda a unir acciones.'],
    ['Antes de entregar un texto conviene...', 'revisar mayusculas y puntos', ['romperlo', 'borrar el titulo siempre'], 'Revisar mejora la escritura.'],
    ['Una buena respuesta escrita debe...', 'contestar a la pregunta', ['cambiar de tema', 'ser ilegible'], 'La respuesta debe responder lo que se pide.'],
    ['Que titulo encaja con una aventura en el parque?', 'El misterio del parque', ['Tabla del 6', 'Manual de lavadora'], 'El titulo anticipa la aventura.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`lang-writing-exp-${String(index + 1).padStart(2, '0')}`, 'language', 'lang_writing_story', 2, prompt, answer, wrong, explanation));
  });

  [
    ['Elige la palabra correcta.', 'guitarra', ['jitarra', 'gitarra'], 'Guitarra se escribe con gu.'],
    ['Elige la palabra correcta.', 'queso', ['ceso', 'keso'], 'Queso se escribe con qu.'],
    ['Elige la palabra correcta.', 'jirafa', ['girafa', 'jirrafa'], 'Jirafa se escribe con j.'],
    ['Elige la palabra correcta.', 'zapato', ['sapato', 'capato'], 'Zapato se escribe con z.'],
    ['Elige la frase correcta.', 'Mi amigo vive aqui.', ['mi amigo vive aqui.', 'Mi amigo vive aqui'], 'Empieza con mayuscula y termina con punto.'],
    ['Que palabra lleva m antes de p?', 'campo', ['canpo', 'camvo'], 'Antes de p se escribe m.'],
    ['Elige la palabra correcta.', 'barco', ['varco', 'barqo'], 'Barco se escribe con b y c.'],
    ['Elige la palabra correcta.', 'llave', ['yave', 'llabe'], 'Llave se escribe con ll y v.'],
    ['Que signo falta en una pregunta?', 'interrogacion', ['coma', 'punto y coma'], 'Las preguntas llevan signos de interrogacion.'],
    ['Elige la palabra correcta.', 'huevo', ['uevo', 'guevo'], 'Huevo empieza por h.'],
    ['Elige la palabra correcta.', 'cigarra', ['zigarra', 'cigar'], 'Cigarra se escribe con c y rr.'],
    ['Que palabra esta bien escrita?', 'familia', ['famillia', 'famylya'], 'Familia se escribe con una l.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`lang-spelling-exp-${String(index + 1).padStart(2, '0')}`, 'language', 'lang_spelling', index < 6 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Para contar algo oralmente conviene...', 'hablar claro y ordenado', ['gritar sin parar', 'mirar al suelo siempre'], 'La claridad y el orden ayudan a que te entiendan.'],
    ['Si no entiendes una pregunta, puedes...', 'pedir que la repitan', ['inventar siempre', 'no escuchar'], 'Pedir repeticion es una estrategia correcta.'],
    ['Al explicar una opinion es bueno decir...', 'porque pienso eso', ['solo una palabra', 'nada mas'], 'Dar razones mejora la expresion oral.'],
    ['En una conversacion se debe...', 'respetar turnos', ['interrumpir siempre', 'taparse los oidos'], 'Escuchar y esperar turno permite conversar.'],
    ['Para describir un dibujo puedes empezar por...', 'lo que se ve primero', ['una cuenta al azar', 'el precio de una pelota'], 'Primero se nombran los elementos principales.'],
    ['Si cuentas una experiencia, ayuda usar...', 'primero, despues y al final', ['solo colores', 'numeros sin sentido'], 'Esos conectores ordenan el relato.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`lang-oral-exp-${String(index + 1).padStart(2, '0')}`, 'language', 'lang_oral', 2, prompt, answer, wrong, explanation));
  });
}

function appendEnglishExpansion() {
  [
    ['Choose the greeting.', 'Good morning', ['Good night', 'Goodbye'], 'Good morning is a greeting.'],
    ['How do you say "adios"?', 'Goodbye', ['Hello', 'See you tomorrow'], 'Goodbye means adios.'],
    ['Complete: My name ___ Leo.', 'is', ['are', 'am'], 'My name is Leo.'],
    ['Answer: How are you?', 'I am fine.', ['I am eight.', 'It is sunny.'], 'I am fine answers how you are.'],
    ['Choose the polite word.', 'please', ['sorry', 'excuse me'], 'Please is used to ask politely.'],
    ['How do you say "gracias"?', 'thank you', ['sorry', 'please'], 'Thank you means gracias.'],
    ['Complete: Nice to ___ you.', 'meet', ['see', 'know'], 'Nice to meet you is a greeting phrase.'],
    ['Choose the question for a name.', 'What is your name?', ['How old are you?', 'Where are you from?'], 'This question asks for a name.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`eng-greetings-exp-${String(index + 1).padStart(2, '0')}`, 'english', 'eng_greetings', index < 4 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Which word means "lapiz"?', 'pencil', ['pen', 'ruler'], 'Pencil means lapiz.'],
    ['Which word means "mesa"?', 'table', ['chair', 'desk'], 'Table means mesa.'],
    ['Which word means "rojo"?', 'red', ['blue', 'green'], 'Red means rojo.'],
    ['Which word means "perro"?', 'dog', ['cat', 'rabbit'], 'Dog means perro.'],
    ['Which word means "libro"?', 'book', ['notebook', 'folder'], 'Book means libro.'],
    ['Which word means "ventana"?', 'window', ['door', 'wall'], 'Window means ventana.'],
    ['Which word means "manzana"?', 'apple', ['orange', 'banana'], 'Apple means manzana.'],
    ['Which word means "escuela"?', 'school', ['library', 'park'], 'School means escuela.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`eng-vocab-exp-${String(index + 1).padStart(2, '0')}`, 'english', 'eng_vocabulary', index < 5 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Complete: I like ___ football.', 'playing', ['to play', 'play'], 'I like playing football is a correct pattern.'],
    ['Choose the correct sentence.', 'I like apples.', ['I likes apples.', 'I am liking apples.'], 'After I we use like.'],
    ['Complete: I get up ___ seven.', 'at', ['in', 'on'], 'We use at with clock times.'],
    ['Choose a daily routine.', 'I brush my teeth.', ['I am a student.', 'She brushes her teeth.'], 'Brushing teeth is a routine.'],
    ['Complete: I have breakfast in the ___.', 'morning', ['afternoon', 'evening'], 'Breakfast is usually in the morning.'],
    ['Choose the negative.', 'I do not like broccoli.', ['I like broccoli.', 'I not like broccoli.'], 'Do not makes the sentence negative.'],
    ['Answer: Do you like music?', 'Yes, I do.', ['Yes, I am.', 'Yes, I like.'], 'Yes, I do answers a do you like question.'],
    ['Complete: I go to school by ___.', 'bus', ['foot', 'car'], 'Bus is a transport word.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`eng-routines-exp-${String(index + 1).padStart(2, '0')}`, 'english', 'eng_like_routines', 2, prompt, answer, wrong, explanation));
  });

  [
    ['A: What color is it? B: ___', 'It is blue.', ['It is big.', 'It is nice.'], 'The question asks for color.'],
    ['A: How old are you? B: ___', 'I am eight.', ['I am fine.', 'I am happy.'], 'How old asks for age.'],
    ['A: Where is the book? B: ___', 'It is on the table.', ['It is red.', 'It is big.'], 'Where asks for place.'],
    ['A: Can I have a pencil? B: ___', 'Yes, here you are.', ['Yes, I do.', 'Yes, I am eight.'], 'This is a polite classroom answer.'],
    ['A: What is your favourite sport? B: ___', 'I like football.', ['I like Mondays.', 'I like mornings.'], 'The answer names a sport.'],
    ['A: Is it a cat? B: ___', 'No, it is a dog.', ['No, it is small.', 'No, it is mine.'], 'The answer compares animals.'],
    ['A: What day is it? B: ___', 'It is Monday.', ['It is morning.', 'It is sunny.'], 'Monday is a day.'],
    ['A: Thank you. B: ___', 'You are welcome.', ['No problem.', 'Of course.'], 'You are welcome replies to thank you.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`eng-dialogue-exp-${String(index + 1).padStart(2, '0')}`, 'english', 'eng_short_dialogue', index < 4 ? 2 : 3, prompt, answer, wrong, explanation));
  });
}

function appendMeasureTimeMoneyFractionsExpansion() {
  let counter = 0;
  const nextId = () => `math-mtmf-curated-${String(++counter).padStart(2, '0')}`;

  // ===== TIEMPO (12 preguntas) - skill: math_measure_time_money, dif 1-2 =====

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Un reloj tiene la aguja larga en el 12 y la aguja corta en el 4. Que hora marca?',
    'Las 4 en punto',
    ['Las 12 en punto', 'Las 4 y media'],
    'Cuando la aguja larga esta en el 12, es una hora en punto. La aguja corta marca el 4.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Un reloj tiene la aguja corta entre el 7 y el 8, y la aguja larga en el 6. Que hora es?',
    'Las 7 y media',
    ['Las 7 en punto', 'Las 8 en punto'],
    'La aguja larga en el 6 indica media hora, y la corta esta avanzando del 7 hacia el 8.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'La aguja larga de un reloj esta en el 3 y la corta esta entre el 9 y el 10. Que hora marca?',
    'Las 9 y cuarto',
    ['Las 9 en punto', 'Las 10 y cuarto'],
    'La aguja larga en el 3 marca el primer cuarto de hora, despues de las 9.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'La aguja larga de un reloj esta en el 9 y la corta esta casi llegando al 5. Que hora es?',
    'Las 4 y 45 (las 5 menos cuarto)',
    ['Las 5 y cuarto', 'Las 4 y media'],
    'Cuando la aguja larga esta en el 9, faltan 15 minutos para la siguiente hora en punto.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Beyblade Carlos empieza un combate a las 5 en punto y termina a las 7 en punto. Cuanto duro el combate?',
    '2 horas',
    ['1 hora', '3 horas'],
    'De las 5 a las 7 pasan 2 horas completas.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Un torneo de Beyblade empieza a las 3 en punto y termina a las 6 en punto. Cuantas horas dura el torneo?',
    '3 horas',
    ['2 horas', '4 horas'],
    'Contando de 3 a 6 hay 3 horas de diferencia.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Carlos empieza a entrenar a las 4 en punto y entrena durante 2 horas. A que hora termina?',
    'A las 6 en punto',
    ['A las 5 en punto', 'A las 8 en punto'],
    'Si suma 2 horas a las 4, el resultado es las 6.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Cuantos dias tiene una semana?',
    '7',
    ['5', '10'],
    'La semana tiene 7 dias: lunes, martes, miercoles, jueves, viernes, sabado y domingo.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Cuantos meses tiene un ano?',
    '12',
    ['10', '7'],
    'El ano tiene 12 meses, desde enero hasta diciembre.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Cuantas estaciones del ano hay?',
    '4',
    ['3', '5'],
    'Las estaciones son primavera, verano, otono e invierno.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Cuantas semanas tiene aproximadamente un mes?',
    '4',
    ['2', '7'],
    'La mayoria de los meses tienen unas 4 semanas, ya que cada semana son 7 dias.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Si hoy es miercoles, que dia sera mañana?',
    'Jueves',
    ['Martes', 'Viernes'],
    'Despues del miercoles viene el jueves en el orden de los dias de la semana.'
  ));

  // ===== DINERO (12 preguntas) - skill: math_measure_time_money, dif 1-3 =====

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Pagas con una moneda de 5 euros una peonza que cuesta 3 euros. Cuanto te devuelven de cambio?',
    '2 euros',
    ['1 euro', '3 euros'],
    'El cambio se calcula restando: 5 - 3 = 2 euros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Pagas con un billete de 10 euros un lanzador de Beyblade que cuesta 7 euros. Cuanto cambio recibes?',
    '3 euros',
    ['2 euros', '4 euros'],
    'La diferencia entre 10 y 7 es 3 euros de cambio.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Pagas con un billete de 20 euros una arena de combate que cuesta 14 euros. Cuanto te devuelven?',
    '6 euros',
    ['5 euros', '8 euros'],
    '20 menos 14 son 6 euros de cambio.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 3,
    'Compras una peonza de 9 euros y pagas con dos monedas de 5 euros. Cuanto cambio te dan?',
    '1 euro',
    ['2 euros', '0 euros'],
    'Dos monedas de 5 euros son 10 euros. 10 - 9 = 1 euro de cambio.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'En el taller de Beyblade, un disco de ataque cuesta 4 euros y un anillo cuesta 3 euros. Cuanto pagas por los dos juntos?',
    '7 euros',
    ['6 euros', '8 euros'],
    'Se suman los dos precios: 4 + 3 = 7 euros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Carlos compra una punta por 2 euros, un eje por 3 euros y una capa por 5 euros. Cuanto gasta en total?',
    '10 euros',
    ['9 euros', '11 euros'],
    'Sumando los tres precios: 2 + 3 + 5 = 10 euros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Una camiseta del torneo cuesta 8 euros y una gorra cuesta 6 euros. Cuanto cuestan las dos juntas?',
    '14 euros',
    ['12 euros', '15 euros'],
    'La suma de 8 y 6 es 14 euros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 3,
    'En el taller, una peonza cuesta 12 euros, un lanzador cuesta 6 euros y una guia cuesta 2 euros. Cuanto cuesta todo junto?',
    '20 euros',
    ['18 euros', '22 euros'],
    'Sumando los tres precios: 12 + 6 + 2 = 20 euros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Una peonza cuesta 9 euros y otra cuesta 5 euros. Cuanto mas cara es la primera que la segunda?',
    '4 euros',
    ['3 euros', '14 euros'],
    'Para saber cuanto mas cuesta, se resta: 9 - 5 = 4 euros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Un lanzador cuesta 11 euros y un eje cuesta 4 euros. Cuanto mas caro es el lanzador?',
    '7 euros',
    ['6 euros', '15 euros'],
    'La diferencia entre 11 y 4 es 7 euros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 3,
    'Carlos tiene 15 euros y quiere comprar una arena que cuesta 18 euros. Le alcanza el dinero?',
    'No, le faltan 3 euros',
    ['Si, le sobran 3 euros', 'Si, le alcanza justo'],
    '18 - 15 = 3, asi que le faltan 3 euros para poder comprarla.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 3,
    'Carlos tiene 20 euros y quiere comprar dos peonzas de 8 euros cada una. Le sobra dinero?',
    'Si, le sobran 4 euros',
    ['No, le faltan 4 euros', 'Si, le sobran 12 euros'],
    'Dos peonzas cuestan 8 + 8 = 16 euros. 20 - 16 = 4 euros le sobran.'
  ));

  // ===== LONGITUD Y MASA (10 preguntas) - skill: math_measure_time_money, dif 1-2 =====

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Que unidad usarias para medir la longitud de un lapiz?',
    'Centimetros',
    ['Kilometros', 'Kilogramos'],
    'Los objetos pequenos como un lapiz se miden en centimetros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Que unidad usarias para medir la distancia entre dos ciudades?',
    'Kilometros',
    ['Centimetros', 'Gramos'],
    'Las distancias largas, como entre ciudades, se miden en kilometros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Que unidad usarias para medir el grosor de una moneda?',
    'Milimetros',
    ['Metros', 'Kilometros'],
    'Para medidas muy pequenas, como el grosor de una moneda, se usan los milimetros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Que unidad usarias para medir el largo de un pasillo de casa?',
    'Metros',
    ['Milimetros', 'Kilogramos'],
    'El largo de un pasillo se mide bien en metros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Que unidad usarias para pesar una peonza de Beyblade?',
    'Gramos',
    ['Kilometros', 'Litros'],
    'Los objetos ligeros, como una peonza, se pesan en gramos.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 1,
    'Que unidad usarias para pesar a una persona?',
    'Kilogramos',
    ['Gramos', 'Metros'],
    'El peso de una persona se mide en kilogramos.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Cuantos centimetros hay en 1 metro?',
    '100',
    ['10', '1000'],
    '1 metro equivale exactamente a 100 centimetros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Cuantos gramos hay en 1 kilogramo?',
    '1000',
    ['100', '10'],
    '1 kilogramo equivale exactamente a 1000 gramos.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Si una mesa mide 2 metros de largo, cuantos centimetros son?',
    '200 centimetros',
    ['20 centimetros', '2000 centimetros'],
    'Como 1 metro son 100 centimetros, 2 metros son 2 x 100 = 200 centimetros.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_measure_time_money', 2,
    'Una peonza pesa 80 gramos y su caja pesa 20 gramos. Cuanto pesan juntas?',
    '100 gramos',
    ['60 gramos', '160 gramos'],
    'Se suman los dos pesos: 80 + 20 = 100 gramos.'
  ));

  // ===== FRACCIONES (16 preguntas) - skill: math_division_intro, dif 2-3 =====

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'Una pizza se corta en 2 partes iguales. Que fraccion representa una de esas partes?',
    '1/2',
    ['1/3', '2/2'],
    'Si la pizza tiene 2 partes iguales, cada parte es un medio, es decir 1/2.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'Una tableta de chocolate se divide en 3 partes iguales. Que fraccion es cada parte?',
    '1/3',
    ['1/2', '3/3'],
    'Si hay 3 partes iguales, cada una representa un tercio, es decir 1/3.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'Una pizza se corta en 4 partes iguales. Que fraccion es una sola parte?',
    '1/4',
    ['1/2', '4/4'],
    'Con 4 partes iguales, cada parte es un cuarto, es decir 1/4.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'Una pizza cortada en 4 partes iguales se reparte y alguien se come 2 partes. Que fraccion de la pizza comio?',
    '2/4',
    ['1/4', '3/4'],
    'Si come 2 de las 4 partes iguales, la fraccion es 2/4.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'Una barra de pan se corta en 3 partes iguales y te comes 2. Que fraccion de la barra te has comido?',
    '2/3',
    ['1/3', '3/3'],
    'Comiste 2 de las 3 partes iguales, asi que la fraccion es 2/3.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'En la fraccion 3/4, cual es el numerador?',
    '3',
    ['4', '7'],
    'El numerador es el numero de arriba en una fraccion. En 3/4, el numerador es 3.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'En la fraccion 5/8, cual es el denominador?',
    '8',
    ['5', '13'],
    'El denominador es el numero de abajo en una fraccion. En 5/8, el denominador es 8.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'Como se escribe en numeros la fraccion siete doceavos?',
    '7/12',
    ['12/7', '7/7'],
    'Siete doceavos significa numerador 7 y denominador 12, es decir 7/12.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'Como se lee la fraccion 5/6?',
    'Cinco sextos',
    ['Seis quintos', 'Cinco sestos'],
    'El numerador 5 se lee cinco y el denominador 6 indica sextos, asi que se lee cinco sextos.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'Como se lee la fraccion 9/10?',
    'Nueve decimos',
    ['Diez novenos', 'Nueve dieces'],
    'El numerador 9 se lee nueve y el denominador 10 indica decimos.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'La fraccion 3/5, es mayor o menor que la unidad completa (1)?',
    'Menor que 1',
    ['Mayor que 1', 'Igual a 1'],
    'Cuando el numerador es menor que el denominador, la fraccion representa menos de la unidad completa.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 3,
    'La fraccion 7/4, es mayor o menor que la unidad completa (1)?',
    'Mayor que 1',
    ['Menor que 1', 'Igual a 1'],
    'Cuando el numerador es mayor que el denominador, la fraccion representa mas que la unidad completa.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'La fraccion 6/6, es mayor, menor o igual que la unidad completa (1)?',
    'Igual a 1',
    ['Mayor que 1', 'Menor que 1'],
    'Cuando el numerador y el denominador son iguales, la fraccion representa exactamente la unidad completa.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 2,
    'Cuanto es la mitad de 20 peonzas?',
    '10',
    ['5', '15'],
    'La mitad de 20 es 20 dividido entre 2, que es igual a 10.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 3,
    'Cuanto es un tercio de 12 cartas?',
    '4',
    ['3', '6'],
    'Un tercio de 12 es 12 dividido entre 3, que es igual a 4.'
  ));

  QUESTION_BANK.push(makeChoiceQuestion(
    nextId(), 'math', 'math_division_intro', 3,
    'Cuanto es un cuarto de 16 lanzadores?',
    '4',
    ['2', '8'],
    'Un cuarto de 16 es 16 dividido entre 4, que es igual a 4.'
  ));
}

function appendTablesGeometryExpansion() {
  let counter = 0;
  const nextId = () => `math-tg-curated-${String(++counter).padStart(2, '0')}`;

  // ===== TABLAS Y PROPIEDADES (28 preguntas) - skill: math_multiply_fast, dif 1-3 =====

  // 8 preguntas de automatizacion pura: tabla x tabla, distractores = tablas adyacentes (parte 1)
  [
    [6, 7], [7, 8], [8, 9], [9, 6], [7, 6], [8, 7], [9, 8], [6, 9]
  ].forEach(([a, b], index) => {
    const answer = a * b;
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_multiply_fast', index < 4 ? 2 : 3,
      `${a} x ${b} = ?`,
      answer,
      [a * (b - 1), a * (b + 1)],
      `${a} x ${b} se puede pensar como ${b} grupos de ${a}, y el resultado es ${answer}.`
    ));
  });

  // 6 preguntas de propiedad conmutativa
  [
    [4, 9, 36], [3, 8, 24], [5, 7, 35], [6, 9, 54], [7, 4, 28], [8, 5, 40]
  ].forEach(([a, b, product], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_multiply_fast', index < 3 ? 2 : 3,
      `Si ${a} x ${b} = ${product}, cuanto es ${b} x ${a}?`,
      product,
      [product + a, product - b],
      `Multiplicar en cualquier orden da el mismo resultado: ${a} x ${b} es igual que ${b} x ${a} = ${product}.`
    ));
  });

  // 3 preguntas mas de automatizacion pura (parte 2): tabla x tabla, distractores adyacentes
  [
    [5, 8], [6, 7], [9, 4]
  ].forEach(([a, b], index) => {
    const answer = a * b;
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_multiply_fast', index < 1 ? 2 : 3,
      `${a} x ${b} = ?`,
      answer,
      [a * (b - 1), a * (b + 1)],
      `${a} x ${b} se puede pensar como ${b} grupos de ${a}, y el resultado es ${answer}.`
    ));
  });

  // 3 preguntas mas de factor desconocido (parte 2): pensamiento algebraico basico
  [
    [7, 56, 8], [6, 48, 8], [9, 63, 7]
  ].forEach(([a, product, missing], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_multiply_fast', index < 1 ? 2 : 3,
      `${a} x ? = ${product}. Que numero falta?`,
      missing,
      [missing + 1, missing - 1],
      `Hay que buscar el numero que multiplicado por ${a} da ${product}. Ese numero es ${missing}, porque ${a} x ${missing} = ${product}.`
    ));
  });

  // 4 preguntas de multiplicacion por 10 y 100: patron de ceros
  [
    [7, 10, 70], [9, 10, 90], [5, 100, 500], [8, 100, 800]
  ].forEach(([a, b, product], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_multiply_fast', index < 2 ? 1 : 2,
      `${a} x ${b} = ?`,
      product,
      [a * (b === 10 ? 1 : 10), product / 10],
      b === 10
        ? `Multiplicar por 10 anade un cero al numero: ${a} x 10 = ${product}.`
        : `Multiplicar por 100 anade dos ceros al numero: ${a} x 100 = ${product}.`
    ));
  });

  // 4 preguntas de factor desconocido (parte 1): pensamiento algebraico basico
  [
    [3, 24, 8], [4, 28, 7], [5, 45, 9], [6, 42, 7]
  ].forEach(([a, product, missing], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_multiply_fast', index < 2 ? 2 : 3,
      `${a} x ? = ${product}. Que numero falta?`,
      missing,
      [missing + 1, missing - 1],
      `Hay que buscar el numero que multiplicado por ${a} da ${product}. Ese numero es ${missing}, porque ${a} x ${missing} = ${product}.`
    ));
  });

  // ===== GEOMETRIA (22 preguntas) - skill: math_geometry_data, dif 1-3 =====

  // 4 preguntas de tipos de lineas
  [
    ['Una linea que no tiene curvas y sigue siempre la misma direccion, como se llama?', 'Linea recta', ['Linea curva', 'Linea quebrada'], 'Una linea recta no cambia de direccion en ningun punto.', 1],
    ['Una linea que cambia de direccion suavemente, sin esquinas, como se llama?', 'Linea curva', ['Linea recta', 'Linea paralela'], 'Una linea curva cambia de direccion de forma continua, sin angulos.', 1],
    ['Dos lineas rectas que nunca se cruzan y mantienen siempre la misma distancia, como se llaman?', 'Lineas paralelas', ['Lineas secantes', 'Lineas curvas'], 'Las lineas paralelas nunca se tocan ni se cruzan, van siempre separadas igual.', 2],
    ['Dos lineas rectas que se cruzan en un punto, como se llaman?', 'Lineas secantes', ['Lineas paralelas', 'Lineas curvas'], 'Las lineas secantes se cortan en un unico punto de cruce.', 2]
  ].forEach(([prompt, answer, wrong, explanation, difficulty]) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_geometry_data', difficulty,
      prompt, answer, wrong, explanation
    ));
  });

  // 4 preguntas de angulos
  [
    ['Un angulo mide exactamente 90 grados. Que tipo de angulo es?', 'Angulo recto', ['Angulo agudo', 'Angulo obtuso'], 'Un angulo de exactamente 90 grados se llama angulo recto.', 2],
    ['Un angulo mide menos de 90 grados. Que tipo de angulo es?', 'Angulo agudo', ['Angulo recto', 'Angulo obtuso'], 'Un angulo menor que 90 grados se llama angulo agudo.', 2],
    ['Un angulo mide mas de 90 grados. Que tipo de angulo es?', 'Angulo obtuso', ['Angulo recto', 'Angulo agudo'], 'Un angulo mayor que 90 grados se llama angulo obtuso.', 2],
    ['La esquina de una hoja de papel forma un angulo de 90 grados. Que tipo de angulo es?', 'Angulo recto', ['Angulo agudo', 'Angulo obtuso'], 'Las esquinas de una hoja forman angulos rectos, de 90 grados exactos.', 1]
  ].forEach(([prompt, answer, wrong, explanation, difficulty]) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_geometry_data', difficulty,
      prompt, answer, wrong, explanation
    ));
  });

  // 4 preguntas de poligonos: numero de lados
  [
    ['Cuantos lados tiene un triangulo?', '3', ['4', '5'], 'El triangulo es el poligono con menos lados posibles: 3.', 1],
    ['Cuantos lados tiene un cuadrilatero?', '4', ['3', '5'], 'Un cuadrilatero, como el cuadrado o el rectangulo, tiene 4 lados.', 1],
    ['Cuantos lados tiene un pentagono?', '5', ['4', '6'], 'El pentagono tiene 5 lados, como indica el prefijo "penta".', 2],
    ['Cuantos lados tiene un hexagono?', '6', ['5', '7'], 'El hexagono tiene 6 lados, como indica el prefijo "hexa".', 2]
  ].forEach(([prompt, answer, wrong, explanation, difficulty]) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_geometry_data', difficulty,
      prompt, answer, wrong, explanation
    ));
  });

  // 4 preguntas de cuerpos geometricos: caras, vertices, aristas
  [
    ['Un cubo tiene 6 caras iguales en forma de cuadrado. Que cuerpo geometrico es?', 'Cubo', ['Esfera', 'Cilindro'], 'El cubo tiene 6 caras cuadradas iguales, como un dado.', 2],
    ['Un cuerpo geometrico es completamente redondo y no tiene caras planas ni vertices. Cual es?', 'Esfera', ['Cubo', 'Piramide'], 'La esfera, como una pelota, no tiene caras planas ni esquinas.', 2],
    ['Un cuerpo geometrico tiene dos caras circulares iguales y una superficie curva entre ellas. Cual es?', 'Cilindro', ['Cubo', 'Esfera'], 'El cilindro tiene dos circulos iguales en sus extremos, como un bote de refresco.', 2],
    ['Un cuerpo geometrico tiene una base y caras triangulares que se juntan en un punto llamado vertice. Cual es?', 'Piramide', ['Cubo', 'Cilindro'], 'La piramide tiene una base y caras triangulares que terminan en un vertice superior.', 3]
  ].forEach(([prompt, answer, wrong, explanation, difficulty]) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_geometry_data', difficulty,
      prompt, answer, wrong, explanation
    ));
  });

  // 6 preguntas de perimetro y area basica: cuadrado y rectangulo
  [
    ['Un cuadrado tiene cada lado de 5 cm. Cual es su perimetro?', '20 cm', ['25 cm', '15 cm'], 'El perimetro del cuadrado es la suma de sus 4 lados: 5 + 5 + 5 + 5 = 20 cm.', 2],
    ['Un rectangulo mide 6 cm de largo y 3 cm de ancho. Cual es su perimetro?', '18 cm', ['9 cm', '24 cm'], 'El perimetro suma los 4 lados: 6 + 3 + 6 + 3 = 18 cm.', 2],
    ['Un cuadrado tiene cada lado de 4 cm. Cual es su area?', '16 cm cuadrados', ['8 cm cuadrados', '20 cm cuadrados'], 'El area del cuadrado es lado x lado: 4 x 4 = 16 cm cuadrados.', 3],
    ['Un rectangulo mide 5 cm de largo y 2 cm de ancho. Cual es su area?', '10 cm cuadrados', ['7 cm cuadrados', '14 cm cuadrados'], 'El area del rectangulo es largo x ancho: 5 x 2 = 10 cm cuadrados.', 3],
    ['Un cuadrado tiene cada lado de 7 cm. Cual es su perimetro?', '28 cm', ['21 cm', '14 cm'], 'El perimetro del cuadrado es la suma de sus 4 lados: 7 + 7 + 7 + 7 = 28 cm.', 2],
    ['Un rectangulo mide 8 cm de largo y 3 cm de ancho. Cual es su area?', '24 cm cuadrados', ['11 cm cuadrados', '22 cm cuadrados'], 'El area del rectangulo es largo x ancho: 8 x 3 = 24 cm cuadrados.', 3]
  ].forEach(([prompt, answer, wrong, explanation, difficulty]) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      nextId(), 'math', 'math_geometry_data', difficulty,
      prompt, answer, wrong, explanation
    ));
  });
}

function appendScienceArtsMovementExpansion() {
  [
    ['Que necesitan las plantas para vivir?', 'agua, luz y aire', ['solo agua, sin luz', 'solo tierra, sin riego'], 'Las plantas necesitan agua, luz y aire.'],
    ['Un mamifero normalmente...', 'nace de su madre y mama', ['nace de un huevo siempre', 'tiene escamas como los peces'], 'Los mamiferos maman cuando son crias.'],
    ['Cual es un animal vertebrado?', 'pez', ['lombriz', 'caracol'], 'Los peces tienen columna vertebral.'],
    ['Las raices de una planta sirven para...', 'tomar agua y sujetarse', ['fabricar alimento con luz', 'producir flores'], 'Las raices absorben agua y fijan la planta.'],
    ['Un ser vivo...', 'nace, crece y se reproduce', ['no necesita agua ni alimento', 'no cambia a lo largo del tiempo'], 'Esas son funciones vitales.'],
    ['Cual es una parte de una flor?', 'petalo', ['rama', 'raiz'], 'Los petalos forman parte de muchas flores.'],
    ['Los animales carnivoros comen principalmente...', 'otros animales', ['plantas como la hierba', 'frutas y semillas'], 'Carnivoro significa que come carne.'],
    ['Un habitat es...', 'el lugar donde vive un ser vivo', ['el nombre cientifico de un animal', 'el alimento principal de una planta'], 'El habitat es su entorno de vida.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-living-exp-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_living_things', index < 5 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Que ayuda a prevenir enfermedades?', 'lavarse las manos', ['lavarse solo cuando se ven sucias', 'lavarse solo despues de comer'], 'La higiene de manos reduce microbios.'],
    ['Para crecer sano conviene...', 'comer variado', ['comer siempre lo mismo', 'saltarse comidas a menudo'], 'Una dieta variada aporta nutrientes.'],
    ['Despues de hacer ejercicio es importante...', 'beber agua', ['esperar mucho antes de beber', 'no beber hasta cenar'], 'El cuerpo necesita hidratarse.'],
    ['Los dientes se cuidan...', 'cepillandolos', ['aclarandolos solo con agua', 'usando solo hilo dental'], 'Cepillarse limpia restos de comida.'],
    ['Dormir ayuda a...', 'descansar y aprender mejor', ['cansarse mas durante el dia', 'olvidar lo aprendido en clase'], 'El descanso ayuda al cuerpo y al cerebro.'],
    ['Antes de cruzar una calle hay que...', 'mirar y usar paso de peatones', ['cruzar en cualquier punto', 'cruzar corriendo sin mirar'], 'Es una norma basica de seguridad.'],
    ['Una postura saludable al escribir es...', 'espalda recta y mesa adecuada', ['inclinarse mucho hacia delante', 'apoyar la cabeza en la mesa'], 'La postura evita molestias.'],
    ['Que grupo debe tomarse a menudo?', 'frutas y verduras', ['dulces y refrescos', 'bolleria y fritos'], 'Frutas y verduras aportan vitaminas y fibra.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-health-exp-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_health', index < 5 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Que material es transparente normalmente?', 'vidrio', ['madera', 'carton'], 'El vidrio deja pasar la luz.'],
    ['Una cuchara suele estar hecha de...', 'metal', ['madera o plastico', 'papel prensado'], 'Muchas cucharas son de metal.'],
    ['El papel se obtiene de...', 'madera de arboles', ['arena y sal', 'petroleo refinado'], 'El papel procede de fibras vegetales.'],
    ['Si congelas agua, se convierte en...', 'hielo', ['vapor de agua', 'agua salada'], 'El agua solida es hielo.'],
    ['Un cambio reversible es...', 'derretir hielo', ['quemar papel', 'cocer un huevo'], 'El hielo puede volver a ser agua.'],
    ['Que material es flexible?', 'goma', ['vidrio', 'madera rigida'], 'La goma se puede doblar con facilidad.'],
    ['Un objeto impermeable...', 'no deja pasar agua facilmente', ['absorbe el agua como una esponja', 'se disuelve en agua'], 'Impermeable significa que resiste el paso del agua.'],
    ['Para reciclar una botella de plastico se usa el contenedor...', 'amarillo', ['azul', 'verde'], 'El amarillo recoge envases de plastico, latas y briks.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-materials-exp-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_materials', index < 5 ? 2 : 3, prompt, answer, wrong, explanation));
  });

  [
    ['Que usamos para ordenar hechos de antes a despues?', 'linea del tiempo', ['mapa de un pais', 'tabla de multiplicar'], 'Una linea del tiempo ordena sucesos.'],
    ['La Prehistoria termina con la aparicion de...', 'la escritura', ['las escuelas modernas', 'la imprenta'], 'La escritura marca el paso a la Historia.'],
    ['Una fuente historica puede ser...', 'una moneda antigua', ['una suma inventada', 'una prediccion del tiempo'], 'Los objetos antiguos dan informacion del pasado.'],
    ['Los romanos pertenecen a...', 'Edad Antigua', ['Prehistoria', 'Edad Media'], 'Roma es una civilizacion antigua.'],
    ['Un siglo tiene...', '100 anos', ['10 anos', '1000 anos'], 'Un siglo son cien anos.'],
    ['El pasado familiar se puede conocer con...', 'fotos y relatos', ['solo matematicas', 'libros de texto nuevos'], 'Fotos y relatos conservan memoria.'],
    ['Los primeros humanos vivian principalmente de...', 'cazar y recolectar', ['comprar en mercados', 'cultivar grandes campos'], 'En la Prehistoria cazaban y recolectaban.'],
    ['Un mapa ayuda a conocer...', 'lugares y rutas', ['el peso de los objetos', 'las normas ortograficas'], 'Los mapas representan espacios.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-history-exp-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_time_history', index < 4 ? 2 : 3, prompt, answer, wrong, explanation));
  });

  [
    ['Que accion ahorra energia?', 'apagar luces que no usamos', ['dejar las luces encendidas al salir', 'poner mas lamparas de las necesarias'], 'Apagar luces reduce consumo.'],
    ['Para cuidar un parque debemos...', 'tirar residuos a la papelera', ['dejar los envases en el suelo', 'arrancar plantas para llevarlas a casa'], 'La basura debe ir a papeleras o contenedores.'],
    ['Que transporte contamina menos?', 'bicicleta', ['coche de gasolina', 'moto de combustion'], 'La bicicleta no emite humo.'],
    ['El agua se cuida si...', 'cerramos el grifo al enjabonarnos', ['dejamos correr el agua al lavarnos', 'llenamos la banera a tope cada dia'], 'Cerrar el grifo evita malgastar agua.'],
    ['Reducir significa...', 'usar menos recursos', ['comprar mas de lo necesario', 'tirar cosas que aun funcionan'], 'Reducir es consumir menos.'],
    ['Una especie protegida necesita...', 'respeto y cuidado de su habitat', ['que la gente pueda cazarla', 'reducir su espacio natural'], 'Proteger habitat ayuda a los seres vivos.'],
    ['El contenedor azul es para...', 'papel y carton', ['vidrio', 'envases de plastico'], 'El azul recoge papel y carton.'],
    ['Un huerto escolar ayuda a aprender sobre...', 'plantas y alimentos', ['geometria de figuras', 'historia antigua'], 'Un huerto muestra ciclos de plantas y alimentos.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-env-exp-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_environment', index < 5 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Mezclar rojo y amarillo produce...', 'naranja', ['verde', 'morado'], 'Rojo y amarillo forman naranja.'],
    ['Una linea curva...', 'no es recta', ['siempre es mas corta', 'siempre forma un circulo'], 'La linea curva cambia de direccion.'],
    ['La textura de una lija es...', 'aspera', ['suave como algodon', 'lisa como el vidrio'], 'La lija tiene textura rugosa.'],
    ['Los colores frios incluyen...', 'azul y verde', ['rojo y naranja', 'amarillo y naranja'], 'Azul y verde suelen considerarse frios.'],
    ['Para dar sensacion de cerca puedes dibujar...', 'mas grande', ['igual que lo lejano', 'con colores mas oscuros siempre'], 'Los objetos cercanos se representan mas grandes.'],
    ['Un collage se hace con...', 'recortes pegados', ['trazos de lapiz', 'pintura aplicada con pincel'], 'El collage combina materiales pegados.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`art-color-exp-${String(index + 1).padStart(2, '0')}`, 'arts', 'art_color_line_texture', 1, prompt, answer, wrong, explanation));
  });

  [
    ['Un storyboard sirve para...', 'ordenar escenas', ['resumir un texto en un parrafo', 'decorar los bordes de un dibujo'], 'El storyboard planifica una narracion visual.'],
    ['En una viñeta se puede mostrar...', 'una accion de la historia', ['el titulo completo del album', 'la conclusion final siempre'], 'Cada viñeta cuenta una parte.'],
    ['Para que se entienda una historia visual conviene...', 'mantener orden claro', ['cambiar el estilo en cada viñeta', 'quitar los personajes principales'], 'El orden ayuda a leer imagenes.'],
    ['Un bocadillo de comic muestra...', 'lo que dice un personaje', ['lo que piensa el dibujante', 'el resumen de la historia'], 'El bocadillo contiene dialogo.'],
    ['El plano general muestra...', 'el lugar y los personajes', ['solo el rostro del protagonista', 'solo las manos del personaje'], 'Sirve para situar la escena.'],
    ['Una flecha de movimiento indica...', 'direccion', ['el tiempo que dura la accion', 'el nombre del personaje'], 'Las flechas muestran hacia donde se mueve algo.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`art-story-exp-${String(index + 1).padStart(2, '0')}`, 'arts', 'art_storyboard', 2, prompt, answer, wrong, explanation));
  });

  [
    ['El ritmo es...', 'una repeticion de sonidos o movimientos', ['la velocidad de la melodia', 'el volumen de la musica'], 'El ritmo organiza sonidos o gestos.'],
    ['Un sonido fuerte tiene...', 'mayor intensidad', ['mayor velocidad', 'mayor duracion siempre'], 'La intensidad diferencia fuerte y suave.'],
    ['Las palmas pueden marcar...', 'pulso', ['melodia', 'armonia'], 'Las palmas ayudan a seguir el pulso.'],
    ['Un instrumento de percusion se toca normalmente...', 'golpeando o sacudiendo', ['soplando', 'frotando cuerdas'], 'La percusion produce sonido con golpes o sacudidas.'],
    ['Una cancion puede expresar...', 'emociones', ['solo datos numericos', 'instrucciones de cocina'], 'La musica comunica emociones.'],
    ['Silencio en musica significa...', 'pausa sin sonido', ['nota muy suave', 'nota muy alta'], 'El silencio tambien forma parte del ritmo.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`art-music-exp-${String(index + 1).padStart(2, '0')}`, 'arts', 'art_music_rhythm', 1, prompt, answer, wrong, explanation));
  });

  [
    ['Antes de correr conviene...', 'calentar', ['estirarse intensamente en frio', 'hacer abdominales directamente'], 'El calentamiento prepara el cuerpo.'],
    ['Al terminar ejercicio conviene...', 'volver a la calma', ['parar en seco sin descansar', 'empezar otra actividad muy intensa'], 'La vuelta a la calma baja pulsaciones poco a poco.'],
    ['Un calentamiento puede incluir...', 'movilidad suave', ['saltos muy altos sin calentar', 'carreras a maxima velocidad'], 'La movilidad suave prepara articulaciones.'],
    ['Si algo duele durante el ejercicio debes...', 'parar y avisar', ['continuar ignorando el dolor', 'acelerar para que pase antes'], 'El dolor es una senal para parar.'],
    ['Beber agua tras moverse ayuda a...', 'hidratarse', ['aumentar el cansancio', 'reducir la energia'], 'El cuerpo pierde agua al moverse.'],
    ['La ropa deportiva debe permitir...', 'moverse con comodidad', ['ajustar mucho los movimientos', 'mantener calor excesivo'], 'La comodidad mejora seguridad.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`move-warmup-exp-${String(index + 1).padStart(2, '0')}`, 'movement', 'move_warmup', 1, prompt, answer, wrong, explanation));
  });

  [
    ['Saltar a la pata coja trabaja...', 'equilibrio', ['fuerza de brazos', 'velocidad de carrera'], 'Mantenerse sobre una pierna entrena equilibrio.'],
    ['Botar una pelota con una mano trabaja...', 'coordinacion', ['flexibilidad', 'resistencia'], 'Coordinar mano y vista ayuda a botar.'],
    ['En un circuito motor debes...', 'seguir el orden y cuidar seguridad', ['ir lo mas rapido posible en todas las estaciones', 'saltarte estaciones si son dificiles'], 'El circuito se completa con orden.'],
    ['Lanzar a una diana mejora...', 'punteria', ['velocidad de carrera', 'resistencia fisica'], 'Apuntar y lanzar trabajan precision.'],
    ['Para girar sin caerte necesitas...', 'control corporal', ['girar siempre con ojos cerrados', 'apoyarse en otro siempre'], 'El control corporal ayuda al equilibrio.'],
    ['Un relevo se practica pasando...', 'un testigo u objeto', ['una vuelta de carrera sin parar', 'un salto de obstaculos'], 'El relevo incluye entregar un objeto.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`move-coord-exp-${String(index + 1).padStart(2, '0')}`, 'movement', 'move_coordination', 2, prompt, answer, wrong, explanation));
  });

  [
    ['En un juego de equipo es importante...', 'respetar reglas', ['ignorar las normas si no te convienen', 'cambiar las reglas cuando vas perdiendo'], 'Las reglas hacen el juego justo.'],
    ['Si un companero se cae, debes...', 'ayudar y avisar', ['seguir jugando sin mirar', 'esperar que se levante solo siempre'], 'La seguridad esta por encima del resultado.'],
    ['Cooperar significa...', 'trabajar juntos', ['competir contra tus propios companeros', 'decidir todo sin consultar al equipo'], 'Cooperar es colaborar.'],
    ['Aceptar perder ayuda a...', 'aprender y seguir jugando', ['culpar al arbitro o al equipo', 'no querer jugar mas'], 'Perder tambien ensena.'],
    ['Una norma de seguridad es...', 'mirar antes de lanzar', ['lanzar sin avisar al grupo', 'lanzar lo mas fuerte posible siempre'], 'Mirar evita golpes.'],
    ['El juego limpio incluye...', 'felicitar al rival', ['protestar todas las decisiones', 'ignorar al equipo ganador'], 'El respeto forma parte del deporte.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`move-rules-exp-${String(index + 1).padStart(2, '0')}`, 'movement', 'move_rules_teamwork', 2, prompt, answer, wrong, explanation));
  });
}

function appendLivingThingsDepthExpansion() {
  [
    ['Un ave suele tener...', 'plumas', ['escamas como los reptiles', 'pelo como los mamiferos'], 'Las aves se reconocen por sus plumas.'],
    ['Un pez respira en el agua con...', 'branquias', ['pulmones como los mamiferos', 'traquea como los insectos'], 'Las branquias ayudan a respirar bajo el agua.'],
    ['Los anfibios pueden vivir...', 'en agua y tierra', ['solo en el mar profundo', 'solo en zonas muy secas'], 'Muchos anfibios pasan parte de su vida en agua y tierra.'],
    ['Un insecto tiene normalmente...', 'seis patas', ['cuatro patas como los gatos', 'ocho patas como las aranas'], 'Los insectos tienen seis patas.'],
    ['Una seta pertenece al grupo de...', 'hongos', ['plantas con flores', 'animales invertebrados'], 'Las setas son hongos.'],
    ['Las plantas fabrican su alimento con ayuda de...', 'la luz del sol', ['el calor del suelo solo', 'los animales que las rodean'], 'La fotosintesis necesita luz.'],
    ['Un animal herbivoro come principalmente...', 'plantas', ['carne de otros animales', 'insectos y gusanos'], 'Herbivoro significa que se alimenta de plantas.'],
    ['Un animal omnivoro puede comer...', 'plantas y animales', ['solo carne como los leones', 'solo hierba como las vacas'], 'Omnivoro combina alimentos de origen vegetal y animal.'],
    ['La cadena alimentaria empieza muchas veces con...', 'plantas', ['animales carnivoros', 'hongos descomponedores'], 'Las plantas producen alimento para otros seres vivos.'],
    ['Un ecosistema incluye...', 'seres vivos y lugar donde viven', ['solo los animales del lugar', 'solo las plantas del lugar'], 'El ecosistema une organismos y entorno.'],
    ['Las hojas ayudan a la planta a...', 'fabricar alimento', ['absorber agua del suelo', 'sujetar la planta a la tierra'], 'En las hojas ocurre gran parte de la fotosintesis.'],
    ['El tallo de una planta sirve para...', 'sostener y transportar sustancias', ['fabricar alimento con la luz', 'absorber agua del suelo'], 'El tallo sostiene y comunica partes de la planta.'],
    ['Las semillas sirven para...', 'formar nuevas plantas', ['alimentar solo a los pajaros', 'proteger el tronco del arbol'], 'De muchas semillas nacen nuevas plantas.'],
    ['Un cachorro es...', 'una cria de animal', ['un animal muy pequeno siempre', 'un tipo de reptil joven'], 'Cachorro nombra a una cria.'],
    ['Migrar significa...', 'desplazarse a otro lugar', ['hibernar durante el invierno', 'cambiar de aspecto segun la estacion'], 'Algunos animales migran buscando alimento o clima.'],
    ['Hibernar es...', 'pasar una etapa de reposo', ['migrar a climas mas calidos', 'cambiar de color en invierno'], 'Algunos animales reducen actividad en invierno.'],
    ['Un reptil suele tener...', 'escamas', ['plumas como las aves', 'pelo como los mamiferos'], 'Muchos reptiles tienen piel con escamas.'],
    ['Una rana adulta se clasifica como...', 'anfibio', ['reptil por sus escamas', 'pez por vivir en el agua'], 'La rana es un anfibio.'],
    ['Una ballena es...', 'mamifero', ['pez porque vive en el agua', 'reptil por su tamano'], 'Aunque vive en el agua, la ballena es mamifero.'],
    ['Una mariposa es...', 'insecto', ['anfibio porque tiene metamorfosis', 'ave porque tiene alas'], 'La mariposa tiene caracteristicas de insecto.'],
    ['El camuflaje ayuda a algunos animales a...', 'protegerse o cazar', ['volar mas alto', 'respirar bajo el agua'], 'Camuflarse permite pasar desapercibido.'],
    ['Los animales nocturnos estan mas activos...', 'de noche', ['al amanecer principalmente', 'solo al mediodia'], 'Nocturno significa activo durante la noche.'],
    ['Cuidar un nido es una conducta relacionada con...', 'reproduccion y cuidado de crias', ['busqueda de alimento', 'migracion estacional'], 'Los nidos protegen huevos o crias.'],
    ['Un bosque ofrece a los seres vivos...', 'refugio y alimento', ['solo luz y calor directo', 'solo agua de lluvia'], 'El bosque es habitat de muchos seres vivos.'],
    ['Una planta aromatica puede reconocerse por...', 'su olor', ['su color siempre verde intenso', 'sus hojas grandes y anchas'], 'Aromaticas como romero o menta desprenden olor.'],
    ['Los seres vivos necesitan energia para...', 'realizar funciones vitales', ['solo para reproducirse', 'solo para crecer'], 'La energia permite vivir, crecer y moverse.'],
    ['La clasificacion ayuda a...', 'ordenar seres vivos por caracteristicas', ['dar nombre solo a los animales', 'separar plantas de hongos unicamente'], 'Clasificar usa rasgos comunes.'],
    ['Un animal domestico vive normalmente...', 'con personas', ['en libertad lejos de humanos', 'solo en zonas protegidas'], 'Domestico significa adaptado a convivir con personas.'],
    ['Un animal salvaje vive normalmente...', 'en la naturaleza', ['en casas o granjas siempre', 'en zoologicos toda su vida'], 'Salvaje no depende directamente de personas.'],
    ['Las bacterias son seres vivos...', 'microscopicos', ['mas grandes que los insectos', 'visibles a simple vista siempre'], 'Muchas bacterias solo se ven con microscopio.'],
    ['La lupa sirve para observar...', 'detalles pequenos', ['objetos lejanos como estrellas', 'el interior de rocas duras'], 'La lupa aumenta la imagen.'],
    ['Una norma al observar animales es...', 'no molestarlos', ['acercarse rapidamente para verlos mejor', 'tocarlos para comprobar su textura'], 'Observar con respeto protege a los seres vivos.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-living-depth-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_living_things', index < 16 ? 2 : 3, prompt, answer, wrong, explanation));
  });
}

function appendLivingThingsClassificationPool() {
  const animals = [
    ['aguila', 'ave', 'plumas y pico'],
    ['sardina', 'pez', 'branquias y aletas'],
    ['rana', 'anfibio', 'vida entre agua y tierra'],
    ['lagarto', 'reptil', 'escamas'],
    ['perro', 'mamifero', 'crias que maman'],
    ['mariposa', 'insecto', 'seis patas'],
    ['tiburon', 'pez', 'branquias'],
    ['tortuga', 'reptil', 'escamas y caparazon'],
    ['gorrion', 'ave', 'plumas'],
    ['gato', 'mamifero', 'pelo y crias que maman'],
    ['abeja', 'insecto', 'seis patas'],
    ['salamandra', 'anfibio', 'piel humeda'],
    ['delfin', 'mamifero', 'respira aire y mama'],
    ['pinguino', 'ave', 'plumas aunque nade'],
    ['hormiga', 'insecto', 'seis patas'],
    ['serpiente', 'reptil', 'escamas']
  ];
  const plantParts = [
    ['raiz', 'absorber agua y sujetar la planta'],
    ['tallo', 'sostener la planta y transportar sustancias'],
    ['hoja', 'fabricar alimento con la luz'],
    ['flor', 'participar en la reproduccion'],
    ['fruto', 'proteger semillas'],
    ['semilla', 'originar una nueva planta'],
    ['corteza', 'proteger el tronco'],
    ['rama', 'sostener hojas, flores o frutos']
  ];
  const habitats = [
    ['desierto', 'cactus', 'resiste con poca agua'],
    ['bosque', 'ardilla', 'encuentra refugio y alimento'],
    ['rio', 'trucha', 'vive en agua dulce'],
    ['mar', 'pulpo', 'vive en agua salada'],
    ['charca', 'rana', 'necesita zonas humedas'],
    ['pradera', 'conejo', 'encuentra hierba y madrigueras'],
    ['montana', 'cabra montesa', 'se mueve por rocas'],
    ['huerto', 'tomatera', 'crece con cuidados y luz']
  ];

  animals.forEach(([animal, group, clue], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `aaa-sci-living-class-animal-${String(index + 1).padStart(2, '0')}`,
      'science',
      'sci_living_things',
      index < 8 ? 2 : 3,
      `Clasifica este ser vivo: ${animal}.`,
      group,
      ['planta', 'hongo'].filter(option => option !== group).concat(['mineral']).slice(0, 2),
      `${animal} se clasifica como ${group} porque tiene ${clue}.`
    ));
  });

  plantParts.forEach(([part, functionText], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `aaa-sci-living-plant-part-${String(index + 1).padStart(2, '0')}`,
      'science',
      'sci_living_things',
      2,
      `Para que sirve principalmente la ${part} de una planta?`,
      functionText,
      ['hacer que la planta crezca mas rapido', 'dar color a las flores'],
      `La ${part} ayuda a ${functionText}.`
    ));
  });

  habitats.forEach(([habitat, livingThing, reason], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `aaa-sci-living-habitat-${String(index + 1).padStart(2, '0')}`,
      'science',
      'sci_living_things',
      2,
      `Que ser vivo encaja mejor en el habitat ${habitat}?`,
      livingThing,
      ['salmón (vive en el mar)', 'camello (vive en el desierto)'],
      `${livingThing} encaja en ${habitat} porque ${reason}.`
    ));
  });

  Array.from({ length: 48 }).forEach((_, index) => {
    const animal = animals[index % animals.length];
    const plantPart = plantParts[index % plantParts.length];
    const habitat = habitats[index % habitats.length];
    const mode = index % 3;
    if (mode === 0) {
      QUESTION_BANK.push(makeChoiceQuestion(
        `aaa-sci-living-review-${String(index + 1).padStart(2, '0')}`,
        'science',
        'sci_living_things',
        2 + (index % 2),
        `Que pista ayuda a reconocer a ${animal[0]} como ${animal[1]}?`,
        animal[2],
        ['tiene ocho patas como las aranas', 'nace de huevo como las aves'],
        `La pista correcta es ${animal[2]}.`
      ));
    } else if (mode === 1) {
      QUESTION_BANK.push(makeChoiceQuestion(
        `aaa-sci-living-review-${String(index + 1).padStart(2, '0')}`,
        'science',
        'sci_living_things',
        2 + (index % 2),
        `Que parte de la planta se relaciona con esta funcion: ${plantPart[1]}?`,
        plantPart[0],
        ['la parte que la confunden con frecuencia', 'otra parte de funcion similar'],
        `La parte relacionada es ${plantPart[0]}.`
      ));
    } else {
      QUESTION_BANK.push(makeChoiceQuestion(
        `aaa-sci-living-review-${String(index + 1).padStart(2, '0')}`,
        'science',
        'sci_living_things',
        2 + (index % 2),
        `Por que ${habitat[1]} puede vivir en ${habitat[0]}?`,
        habitat[2],
        ['porque se alimenta de otros animales del mismo habitat', 'porque puede vivir en cualquier clima'],
        `La razon es que ${habitat[2]}.`
      ));
    }
  });
}

function appendBalancedWeakSkillExpansion() {
  const rows = [
    ['language', 'lang_read_fluency', 'Lee esta frase: "La peonza gira rapida y luego se queda quieta". Donde conviene hacer una pausa?', 'despues de rapida', ['despues de La', 'en medio de peonza', 'sin hacer pausas'], 'Las pausas ayudan a entender frases largas.'],
    ['language', 'lang_read_fluency', 'Que senal indica una pausa larga al leer?', 'el punto', ['la letra m', 'un numero', 'una tilde siempre'], 'El punto marca una pausa clara.'],
    ['language', 'lang_read_fluency', 'Para leer mejor una pregunta debo...', 'leer hasta el final antes de contestar', ['mirar solo la primera palabra', 'contestar sin leer', 'saltar las comas'], 'Leer completa la pregunta evita errores.'],
    ['language', 'lang_read_fluency', 'Si una frase tiene coma, al leer conviene...', 'hacer una pausa corta', ['gritar', 'parar para siempre', 'cambiar de idioma'], 'La coma marca una pausa breve.'],
    ['language', 'lang_read_fluency', 'Que ayuda a leer con expresion?', 'respetar puntos, comas y signos', ['leer todo igual', 'tapar la linea', 'cambiar palabras'], 'Los signos guian la voz.'],
    ['language', 'lang_read_fluency', 'En voz alta, una pregunta suele terminar con...', 'entonacion de pregunta', ['voz dormida', 'silencio al principio', 'golpe en la mesa'], 'Los signos de interrogacion avisan de pregunta.'],
    ['language', 'lang_oral', 'Para contar lo que has aprendido conviene empezar por...', 'una idea principal', ['un ruido', 'una palabra suelta', 'el final sin explicar'], 'La idea principal orienta al oyente.'],
    ['language', 'lang_oral', 'Cuando alguien habla, escuchar significa...', 'mirar y esperar turno', ['interrumpir siempre', 'irse corriendo', 'cantar encima'], 'Respetar turnos mejora la conversacion.'],
    ['language', 'lang_oral', 'Si no entiendo una pregunta puedo...', 'pedir que la repitan', ['inventar sin pensar', 'enfadarme', 'no decir nada nunca'], 'Pedir aclaracion ayuda a responder mejor.'],
    ['language', 'lang_oral', 'Una explicacion clara suele tener...', 'orden y ejemplos', ['solo gritos', 'palabras mezcladas', 'silencio'], 'Ordenar ideas hace que se entiendan.'],
    ['language', 'lang_oral', 'Para presentar un dibujo puedo decir...', 'que hice y por que', ['solo mi nombre', 'nada', 'una tabla de multiplicar'], 'Explicar decisiones mejora la expresion oral.'],
    ['language', 'lang_oral', 'En un debate pequeno debo...', 'respetar opiniones y dar razones', ['ganar gritando', 'copiar siempre', 'no escuchar'], 'Dar razones ayuda a conversar.'],
    ['english', 'eng_greetings', 'Best answer: Good afternoon!', 'Good afternoon!', ['I am seven.', 'It is blue.', 'Open the book.'], 'Se responde a un saludo con otro saludo.'],
    ['english', 'eng_greetings', 'How do you say "buenas noches"?', 'Good night', ['Good morning', 'Thank you', 'I like rice'], 'Good night se usa por la noche o al despedirse.'],
    ['english', 'eng_greetings', 'Choose the polite word.', 'Please', ['Window', 'Tiger', 'Seven'], 'Please significa por favor.'],
    ['english', 'eng_greetings', 'Best answer: Thank you!', 'You are welcome.', ['I am a pencil.', 'It is Monday.', 'Red dog.'], 'You are welcome responde a thank you.'],
    ['english', 'eng_vocabulary', 'What is "yellow"?', 'amarillo', ['naranja', 'verde', 'azul'], 'Yellow significa amarillo.'],
    ['english', 'eng_vocabulary', 'Choose the school object.', 'book', ['notebook', 'folder', 'bag'], 'Book es un objeto escolar.'],
    ['english', 'eng_vocabulary', 'What animal says meow?', 'cat', ['dog', 'rabbit', 'bird'], 'Cat significa gato.'],
    ['english', 'eng_vocabulary', 'Choose the food.', 'apple', ['orange', 'banana', 'strawberry'], 'Apple es una comida/fruta.'],
    ['english', 'eng_like_routines', 'Complete: I ___ breakfast.', 'eat', ['have', 'drink', 'take'], 'Eat breakfast significa desayunar.'],
    ['english', 'eng_like_routines', 'Choose a routine.', 'I go to school.', ['I am a student.', 'She goes to school.', 'We go home.'], 'Ir al colegio es una rutina.'],
    ['english', 'eng_like_routines', 'Complete: I like ___ books.', 'reading', ['to read', 'read', 'reads'], 'Despues de like puede ir reading.'],
    ['english', 'eng_like_routines', 'Best sentence for a hobby.', 'I like drawing.', ['I like to draws.', 'I likes drawing.', 'I drawing like.'], 'Drawing puede ser una aficion.'],
    ['english', 'eng_short_dialogue', 'Best answer: What is your name?', 'My name is Carlos.', ['My name is a book.', 'I like apples.', 'I am fine.'], 'La pregunta pide el nombre.'],
    ['english', 'eng_short_dialogue', 'Best answer: How old are you?', 'I am eight.', ['I am fine.', 'I like eight.', 'I am tall.'], 'How old pregunta la edad.'],
    ['english', 'eng_short_dialogue', 'Best answer: What color is it?', 'It is red.', ['It is big.', 'It is mine.', 'It is nice.'], 'Pregunta por color.'],
    ['english', 'eng_short_dialogue', 'Best answer: Do you like music?', 'Yes, I do.', ['Yes, I am.', 'Yes, I like.', 'Yes, I have.'], 'Do you like se responde con yes/no.'],
    ['arts', 'art_storyboard', 'En un storyboard, cada cuadro representa...', 'una escena', ['una estrofa de una cancion', 'un parrafo del texto', 'el titulo de la historia'], 'Cada cuadro ayuda a ordenar escenas.'],
    ['arts', 'art_storyboard', 'Para contar una historia en dibujos necesito...', 'orden de escenas', ['solo el final en grande', 'solo un personaje sin accion', 'solo colores sin dibujos'], 'El orden ayuda a entender la historia.'],
    ['arts', 'art_storyboard', 'Si una historia empieza con un problema, despues suele venir...', 'lo que hacen los personajes', ['el titulo del comic', 'la presentacion del lugar', 'el nombre del autor'], 'El nudo muestra acciones y decisiones.'],
    ['arts', 'art_storyboard', 'Un final claro muestra...', 'como termina la historia', ['como empieza el problema', 'quienes son los personajes', 'donde ocurre la historia'], 'El final cierra la historia.'],
    ['arts', 'art_music_rhythm', 'Si palmeo lento, lento, rapido, estoy creando...', 'ritmo', ['una melodia con notas', 'una armonia de voces', 'un patron de color'], 'El ritmo organiza sonidos o golpes.'],
    ['arts', 'art_music_rhythm', 'Un sonido fuerte y uno suave cambian...', 'la intensidad', ['la velocidad del pulso', 'la altura de la nota', 'la duracion del sonido'], 'La intensidad puede ser fuerte o suave.'],
    ['arts', 'art_music_rhythm', 'Una cancion puede tener...', 'pulso', ['rima obligatoria siempre', 'dos melodias iguales', 'cuatro partes exactas'], 'El pulso ayuda a seguir el ritmo.'],
    ['arts', 'art_music_rhythm', 'Repetir palmadas en orden crea...', 'un patron ritmico', ['una nota musical larga', 'una cancion con letra', 'una melodia nueva'], 'Un patron es una repeticion organizada.'],
    ['movement', 'move_warmup', 'Despues de correr mucho conviene...', 'volver a la calma', ['parar en seco sin descansar', 'empezar otra carrera intensa', 'sentarse sin moverse nada'], 'La vuelta a la calma ayuda al cuerpo.'],
    ['movement', 'move_warmup', 'Un calentamiento seguro empieza...', 'suave y progresivo', ['con el ejercicio mas intenso', 'con estiramientos muy forzados', 'con carreras a maxima velocidad'], 'El cuerpo necesita prepararse poco a poco.'],
    ['movement', 'move_warmup', 'Si algo duele al moverte debes...', 'parar y avisar', ['continuar hasta que pase', 'ignorar el dolor y acelerar', 'hacer mas repeticiones del mismo ejercicio'], 'La seguridad es lo primero.'],
    ['movement', 'move_coordination', 'Lanzar y atrapar una pelota trabaja...', 'coordinacion ojo-mano', ['fuerza de piernas', 'resistencia cardiovascular', 'flexibilidad de espalda'], 'Usas vista y manos juntas.'],
    ['movement', 'move_coordination', 'Saltar dentro y fuera de un aro mejora...', 'coordinacion y equilibrio', ['resistencia de larga duracion', 'fuerza de brazos', 'velocidad de reaccion'], 'Controlas cuerpo y espacio.'],
    ['movement', 'move_coordination', 'Caminar siguiendo una linea trabaja...', 'equilibrio', ['velocidad de carrera', 'fuerza muscular', 'resistencia aerobica'], 'El equilibrio mantiene el cuerpo estable.'],
    ['movement', 'move_rules_teamwork', 'Si un companero se equivoca, lo mejor es...', 'animarle y seguir jugando', ['criticarle delante de todos', 'pedir que le cambien del equipo', 'ignorarle para que mejore solo'], 'El equipo mejora con respeto.'],
    ['movement', 'move_rules_teamwork', 'Una regla de seguridad sirve para...', 'evitar danos', ['dar ventaja al equipo que la propone', 'hacer el juego mas complicado', 'decidir quien gana siempre'], 'Las reglas cuidan a todos.'],
    ['movement', 'move_rules_teamwork', 'En un relevo hay que...', 'esperar turno', ['salir cuando ves que puedes ganar', 'adelantar al companero en la carrera', 'pasar el testigo antes de llegar'], 'Esperar turno hace el juego justo.']
  ];
  rows.forEach((row, index) => {
    const [subject, skill, prompt, answer, wrong, explanation] = row;
    QUESTION_BANK.push(makeChoiceQuestion(
      `balanced-${skill}-${String(index + 1).padStart(2, '0')}`,
      subject,
      skill,
      index % 3 === 0 ? 1 : 2,
      prompt,
      answer,
      wrong,
      explanation
    ));
  });
}

function appendMinimumSkillVolume(minimumPerSkill = 24) {
  const counts = QUESTION_BANK.reduce((acc, question) => {
    acc[question.skill] = (acc[question.skill] || 0) + 1;
    return acc;
  }, {});
  const prompts = [
    prompt => `Reto de entrenamiento: ${prompt}`,
    prompt => `Modo Torre X: ${prompt}`,
    prompt => `Repaso rapido: ${prompt}`,
    prompt => `Para ganar energia, responde: ${prompt}`,
    prompt => `Nueva variante: ${prompt}`,
    prompt => `Duelo de precision: ${prompt}`
  ];
  Object.values(SKILLS).flat().forEach(skill => {
    const skillQuestions = QUESTION_BANK.filter(question => question.skill === skill.id);
    if (skillQuestions.length === 0) return;
    while ((counts[skill.id] || 0) < minimumPerSkill) {
      const currentCount = counts[skill.id] || 0;
      const source = skillQuestions[currentCount % skillQuestions.length];
      const promptBuilder = prompts[currentCount % prompts.length];
      const rotatedOptions = source.options
        ? [source.answer, ...source.options.filter(option => String(option) !== String(source.answer)).reverse()]
        : [source.answer, 'Opcion A', 'Opcion B'];
      QUESTION_BANK.push(makeChoiceQuestion(
        `topup-${skill.id}-${String(currentCount + 1).padStart(2, '0')}`,
        source.subject,
        source.skill,
        source.difficulty || 2,
        promptBuilder(source.prompt),
        source.answer,
        rotatedOptions.filter(option => String(option) !== String(source.answer)),
        source.explanation || `Practica extra de ${skill.name}.`
      ));
      counts[skill.id] = currentCount + 1;
    }
  });
}

function seededValue(input) {
  let hash = 2166136261;
  String(input).split('').forEach(char => {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return hash >>> 0;
}

function pickFrom(list, seed, offset = 0) {
  return list[(seededValue(`${seed}:${offset}`) % list.length + list.length) % list.length];
}

function questionThemeSignature(question) {
  return `${question.skill}:${String(question.prompt || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\d+/g, '#')
    .replace(/"[^"]+"/g, '"..."')
    .replace(/\b(leo|marta|carlitos|sara|nico|luna|pablo|iris|carla|dani|ana)\b/g, 'nombre')
    .replace(/\b(peonzas|cartas|piezas|pegatinas|canicas|monedas|libros|lapices|cromos|puntos|objetos)\b/g, 'objeto')
    .replace(/\b(taller|parque|clase|biblioteca|arena|casa|patio|museo|rio)\b/g, 'lugar')
    .replace(/\s+/g, ' ')
    .trim()}`;
}

function dedupeQuestionBankByTheme() {
  const seen = new Set();
  const deduped = [];
  QUESTION_BANK.forEach(question => {
    const key = questionThemeSignature(question);
    if (seen.has(key)) return;
    seen.add(key);
    deduped.push(question);
  });
  QUESTION_BANK.splice(0, QUESTION_BANK.length, ...deduped);
}

function diversifyRepeatedPromptText() {
  const themes = [
    'torneo Beyblade X',
    'biblioteca de verano',
    'excursion al parque',
    'taller de inventos',
    'mercado del barrio',
    'museo de ciencias',
    'equipo de clase',
    'entrenamiento en casa',
    'reto de reciclaje',
    'club de lectura',
    'campamento urbano',
    'diario de vacaciones'
  ];
  const seen = new Map();
  QUESTION_BANK.forEach(question => {
    const basePrompt = String(question.prompt || '');
    const count = seen.get(basePrompt) || 0;
    seen.set(basePrompt, count + 1);
    if (count === 0) return;
    const theme = themes[(seededValue(`${question.id}:${count}`) % themes.length + themes.length) % themes.length];
    question.prompt = `Situacion ${theme} ${count + 1}: ${basePrompt}`;
    question.explanation = `${question.explanation || 'Piensa la respuesta con calma.'} La situacion cambia, pero la habilidad practicada es ${question.skill}.`;
  });
}

function buildFromTemplate(id, subject, skillId, difficulty, templates, seed, context) {
  const template = pickFrom(templates, seed, 11);
  return makeChoiceQuestion(
    id,
    subject,
    skillId,
    difficulty,
    template.prompt(context),
    template.answer(context),
    template.wrong(context),
    template.explanation(context)
  );
}

function buildAutoQuestionForSkill(skill, index) {
  const seed = `${skill.id}:${index}`;
  const difficulty = Math.max(1, Math.min(5, 1 + Math.floor(index / 42)));
  const subject = Object.entries(SKILLS).find(([, skills]) => skills.some(item => item.id === skill.id))?.[0] || 'math';
  const names = ['Leo', 'Marta', 'Carlitos', 'Sara', 'Nico', 'Luna', 'Pablo', 'Iris'];
  const objects = ['peonzas', 'cartas', 'piezas', 'pegatinas', 'canicas', 'monedas', 'libros', 'lapices'];
  const places = ['taller', 'parque', 'clase', 'biblioteca', 'arena', 'casa', 'patio', 'museo'];
  const colors = [['red', 'rojo'], ['blue', 'azul'], ['green', 'verde'], ['yellow', 'amarillo'], ['black', 'negro'], ['white', 'blanco']];
  const animals = [['cat', 'gato'], ['dog', 'perro'], ['bird', 'pajaro'], ['fish', 'pez'], ['horse', 'caballo']];
  const a = 8 + (seededValue(seed) % 72) + difficulty * 3;
  const b = 2 + (seededValue(`${seed}:b`) % 18) + difficulty;
  const name = pickFrom(names, seed, 1);
  const object = pickFrom(objects, seed, 2);
  const place = pickFrom(places, seed, 3);
  const color = pickFrom(colors, seed, 4);
  const animal = pickFrom(animals, seed, 5);
  const c = 3 + (seededValue(`${seed}:c`) % 12);
  const context = { a, b, c, name, object, place, color, animal, index, difficulty };

  if (skill.id === 'math_number_999') {
    const number = 100 + (seededValue(seed) % 899);
    const hundreds = Math.floor(number / 100);
    const tens = Math.floor((number % 100) / 10);
    const units = number % 10;
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'math', skill.id, difficulty, [
      { prompt: () => `En ${number}, que cifra esta en las decenas?`, answer: () => tens, wrong: () => [hundreds, units], explanation: () => 'Mira la segunda cifra empezando por la derecha.' },
      { prompt: () => `Que numero tiene ${hundreds} centenas, ${tens} decenas y ${units} unidades?`, answer: () => number, wrong: () => [hundreds * 100 + units * 10 + tens, hundreds * 100 + tens], explanation: () => 'Centenas, decenas y unidades se colocan en orden.' },
      { prompt: () => `Redondea ${number} a la decena mas cercana.`, answer: () => Math.round(number / 10) * 10, wrong: () => [Math.floor(number / 10) * 10, Math.ceil(number / 100) * 100], explanation: () => 'Para redondear a decenas mira las unidades.' },
      { prompt: () => `Que numero es 10 mas que ${number}?`, answer: () => number + 10, wrong: () => [number + 1, Math.max(0, number - 10)], explanation: () => 'Sumar 10 cambia la cifra de las decenas.' }
    ], seed, context);
  }
  if (skill.id === 'math_number_9999') {
    const number = 1000 + (seededValue(seed) % 8999);
    const thousands = Math.floor(number / 1000);
    const hundreds = Math.floor((number % 1000) / 100);
    const tens = Math.floor((number % 100) / 10);
    const units = number % 10;
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'math', skill.id, difficulty, [
      { prompt: () => `En ${number}, que cifra esta en las centenas?`, answer: () => hundreds, wrong: () => [thousands, tens], explanation: () => 'La centena es la tercera cifra empezando por la derecha.' },
      { prompt: () => `Que numero tiene ${thousands} millares, ${hundreds} centenas, ${tens} decenas y ${units} unidades?`, answer: () => number, wrong: () => [thousands * 1000 + tens * 100 + hundreds * 10 + units, thousands * 1000 + hundreds * 100 + units], explanation: () => 'Se leen las posiciones de izquierda a derecha.' },
      { prompt: () => `Que numero es 100 menos que ${number}?`, answer: () => number - 100, wrong: () => [number - 10, number + 100], explanation: () => 'Restar 100 cambia la cifra de centenas.' },
      { prompt: () => `Redondea ${number} a la centena mas cercana.`, answer: () => Math.round(number / 100) * 100, wrong: () => [Math.floor(number / 100) * 100, number + 100], explanation: () => 'Para centenas mira decenas y unidades.' }
    ], seed, context);
  }
  if (skill.id === 'math_add_sub') {
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'math', skill.id, difficulty, [
      { prompt: () => `${a} + ${b} = ?`, answer: () => a + b, wrong: () => [a + b + 9, Math.max(0, a + b - 7)], explanation: () => 'Suma por partes.' },
      { prompt: () => `${a + b} - ${b} = ?`, answer: () => a, wrong: () => [a + b, Math.max(0, a - 5)], explanation: () => 'La resta deshace la suma.' },
      { prompt: () => `${name} tenia ${a} puntos y gana ${b}. Cuantos puntos tiene?`, answer: () => a + b, wrong: () => [a, b, a + b + 4], explanation: () => 'Ganar puntos significa sumar.' },
      { prompt: () => `Faltan ${b} piezas para llegar a ${a + b}. Cuantas piezas hay ahora?`, answer: () => a, wrong: () => [b, a + b, Math.max(0, a - b)], explanation: () => 'Si faltan piezas, restas al total.' }
    ], seed, context);
  }
  if (skill.id === 'math_word_problems') {
    const used = Math.min(a - 1, b);
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'math', skill.id, difficulty, [
      { prompt: () => `${name} tiene ${a} ${object} y consigue ${b} mas. Cuantos tiene ahora?`, answer: () => a + b, wrong: () => [a, b, a + b + 5], explanation: () => 'La historia aumenta, se suma.' },
      { prompt: () => `${name} tenia ${a} ${object} y usa ${used}. Cuantos le quedan?`, answer: () => a - used, wrong: () => [a + used, used, Math.max(0, a - used - 3)], explanation: () => 'La historia quita, se resta.' },
      { prompt: () => `En ${place} hay ${c} cajas con ${b} ${object} cada una. Cuantos hay?`, answer: () => c * b, wrong: () => [c + b, c * b + c], explanation: () => 'Son grupos iguales, se multiplica.' },
      { prompt: () => `Reparten ${c * b} ${object} entre ${c} equipos. Cuantos recibe cada equipo?`, answer: () => b, wrong: () => [c, c + b, c * b], explanation: () => 'Repartir en partes iguales es dividir.' }
    ], seed, context);
  }
  if (skill.id === 'math_tables_groups' || skill.id === 'math_multiply_fast') {
    const x = 2 + (index % 9);
    const y = 2 + (Math.floor(index / 3) % 9);
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'math', skill.id, difficulty, [
      { prompt: () => `${x} grupos de ${y} son...`, answer: () => x * y, wrong: () => [x + y, x * y + x], explanation: () => 'Multiplicar junta grupos iguales.' },
      { prompt: () => `En una cuadricula hay ${x} filas y ${y} columnas. Cuantos huecos hay?`, answer: () => x * y, wrong: () => [x + y, x * y - x], explanation: () => 'Filas por columnas.' },
      { prompt: () => `${name} practica ${x} rondas con ${y} lanzamientos. Cuantos lanzamientos hace?`, answer: () => x * y, wrong: () => [x + y, x * y + y], explanation: () => 'Rondas iguales se multiplican.' },
      { prompt: () => `Completa la tabla: ${x} x ${y} = ?`, answer: () => x * y, wrong: () => [x * (y - 1), x * y + 1], explanation: () => 'Usa la tabla o suma repetida.' }
    ], seed, context);
  }
  if (skill.id === 'math_division_intro') {
    const group = 2 + (index % 8);
    const each = 2 + (Math.floor(index / 4) % 8);
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'math', skill.id, difficulty, [
      { prompt: () => `Reparte ${group * each} ${object} en ${group} grupos iguales. Cuantos van en cada grupo?`, answer: () => each, wrong: () => [group, each + 2], explanation: () => 'Dividir es repartir.' },
      { prompt: () => `Hay ${group * each} cromos y cada album lleva ${each}. Cuantos albumes se completan?`, answer: () => group, wrong: () => [each, group + each], explanation: () => 'Busca cuantos grupos salen.' },
      { prompt: () => `${name} hizo ${group * each} puntos en ${group} partidas iguales. Cuantos puntos por partida?`, answer: () => each, wrong: () => [group, each + 1], explanation: () => 'Total dividido entre partidas.' }
    ], seed, context);
  }
  if (skill.id === 'math_measure_time_money') {
    const euros = 2 + (index % 8);
    const price = 1 + (Math.floor(index / 2) % euros);
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'math', skill.id, difficulty, [
      { prompt: () => `Pagas ${euros} euros y algo cuesta ${price}. Cuantos euros sobran?`, answer: () => euros - price, wrong: () => [euros + price, Math.max(0, euros - price + 1)], explanation: () => 'Con dinero que sobra se resta.' },
      { prompt: () => `Si son las ${price}:30, que significa media hora?`, answer: () => '30 minutos', wrong: () => ['3 minutos', '100 minutos'], explanation: () => 'Media hora son 30 minutos.' },
      { prompt: () => `Para medir una mesa pequena uso mejor...`, answer: () => 'centimetros', wrong: () => ['litros', 'kilos'], explanation: () => 'Las longitudes pequenas se miden en centimetros.' },
      { prompt: () => `Una botella se mide mejor en...`, answer: () => 'litros', wrong: () => ['euros', 'centimetros'], explanation: () => 'La capacidad se mide en litros.' }
    ], seed, context);
  }
  if (skill.id === 'math_geometry_data') {
    const side = 2 + (index % 9);
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'math', skill.id, difficulty, [
      { prompt: () => `Un cuadrado tiene lados de ${side} cm. Cual es su perimetro?`, answer: () => side * 4, wrong: () => [side + 4, side * 2], explanation: () => 'El perimetro suma los lados.' },
      { prompt: () => `Que figura tiene 3 lados?`, answer: () => 'triangulo', wrong: () => ['cuadrado', 'circulo'], explanation: () => 'Un triangulo tiene tres lados.' },
      { prompt: () => `En una grafica hay ${a} votos azules y ${b} rojos. Cuantos votos hay?`, answer: () => a + b, wrong: () => [a, b, a + b + 3], explanation: () => 'Para el total se suma.' },
      { prompt: () => `Un rectangulo tiene lados ${side}, ${side}, ${c} y ${c}. Cual es su perimetro?`, answer: () => side * 2 + c * 2, wrong: () => [side + c, side * c], explanation: () => 'Suma todos los lados.' }
    ], seed, context);
  }

  if (skill.id.startsWith('lang_')) {
    const text = `${name} encontro ${b} ${object} en el ${place}. Despues guardo la ${object.slice(0, -1)} ${color[1]} para ensenar su trabajo.`;
    const secondText = `Por la tarde, ${name} preparo una mochila, reviso una lista y salio hacia el ${place} con calma.`;
    const languageTemplates = {
      lang_read_fluency: [
        { prompt: () => `Al leer: "${text}" conviene hacer pausas en...`, answer: () => 'puntos y comas', wrong: () => ['cada letra', 'ninguna palabra'], explanation: () => 'Los signos ayudan a leer con ritmo.' },
        { prompt: () => `Que signo marca una pregunta al leer en voz alta?`, answer: () => 'interrogacion', wrong: () => ['punto final solo', 'coma siempre'], explanation: () => 'La interrogacion cambia la entonacion.' },
        { prompt: () => `En la frase "${secondText}" que ayuda a no perderse?`, answer: () => 'leer por grupos de palabras', wrong: () => ['leer letras sueltas', 'saltar palabras'], explanation: () => 'Agrupar palabras mejora la fluidez.' }
      ],
      lang_literal: [
        { prompt: () => `${text} Donde encontro ${name} los ${object}?`, answer: () => `en el ${place}`, wrong: () => ['en la piscina', 'en el cine'], explanation: () => 'La respuesta esta escrita en el texto.' },
        { prompt: () => `${text} De que color era lo que guardo?`, answer: () => color[1], wrong: () => ['morado', 'gris'], explanation: () => 'Busca el dato exacto.' },
        { prompt: () => `${secondText} Que preparo ${name}?`, answer: () => 'una mochila', wrong: () => ['una tarta', 'un mapa antiguo'], explanation: () => 'La respuesta aparece literalmente.' }
      ],
      lang_inference: [
        { prompt: () => `${name} llevo paraguas porque vio nubes oscuras. Que puede pasar?`, answer: () => 'puede llover', wrong: () => ['hara calor seguro', 'ira a dormir'], explanation: () => 'Inferir es usar pistas.' },
        { prompt: () => `${name} sonrie al ver su nota y salta de alegria. Como se siente?`, answer: () => 'contento', wrong: () => ['aburrido', 'hambriento'], explanation: () => 'Las acciones dan pistas de emocion.' },
        { prompt: () => `El suelo esta mojado y hay charcos. Que ha pasado probablemente?`, answer: () => 'ha llovido', wrong: () => ['ha nevado arena', 'hace mucho fuego'], explanation: () => 'Los charcos son una pista.' }
      ],
      lang_main_idea: [
        { prompt: () => `Un texto habla de cuidar ${object}, ordenarlos y revisarlos. Cual es el tema?`, answer: () => `cuidar ${object}`, wrong: () => ['preparar comida', 'viajar lejos'], explanation: () => 'La idea principal resume el texto.' },
        { prompt: () => `Un parrafo explica como ahorrar agua al lavarse y cerrar grifos. Tema principal:`, answer: () => 'ahorrar agua', wrong: () => ['comprar juguetes', 'hacer deporte'], explanation: () => 'Todas las frases apuntan al ahorro de agua.' },
        { prompt: () => `Un texto cuenta pasos para plantar una semilla. Cual es la idea principal?`, answer: () => 'como plantar una semilla', wrong: () => ['como pintar una pared', 'como sumar rapido'], explanation: () => 'Resume todos los pasos.' }
      ],
      lang_order_text: [
        { prompt: () => 'Que orden tiene una historia clara?', answer: () => 'inicio, nudo y final', wrong: () => ['nudo, inicio y final', 'final, nudo e inicio'], explanation: () => 'Las historias necesitan orden.' },
        { prompt: () => 'Ordena una receta sencilla.', answer: () => 'preparar, cocinar y servir', wrong: () => ['servir, preparar y cocinar', 'cocinar, servir y preparar'], explanation: () => 'Primero se prepara, luego se cocina.' },
        { prompt: () => 'Que palabra suele indicar que algo pasa despues?', answer: () => 'luego', wrong: () => ['antes', 'primero'], explanation: () => 'Luego marca secuencia.' }
      ],
      lang_writing_story: [
        { prompt: () => 'Para mejorar un cuento debo revisar...', answer: () => 'mayusculas, puntos e ideas', wrong: () => ['solo el titulo y ya', 'el numero de paginas'], explanation: () => 'Revisar mejora la escritura.' },
        { prompt: () => 'Una descripcion buena usa...', answer: () => 'detalles de como es algo', wrong: () => ['solo el nombre del objeto', 'solo la cantidad'], explanation: () => 'Describir es dar detalles.' },
        { prompt: () => 'Para escribir una carta necesito...', answer: () => 'saludo, mensaje y despedida', wrong: () => ['solo el saludo', 'solo la firma al final'], explanation: () => 'La carta tiene partes.' }
      ],
      lang_spelling: [
        { prompt: () => 'Elige la palabra bien escrita.', answer: () => index % 2 === 0 ? 'guitarra' : 'jirafa', wrong: () => index % 2 === 0 ? ['gitarra', 'guitara'] : ['girrafa', 'jirrafa'], explanation: () => 'Observa letras dificiles.' },
        { prompt: () => 'Completa: El ___ canta por la manana.', answer: () => 'gallo', wrong: () => ['jallo', 'gayo'], explanation: () => 'Gallo se escribe con g y ll.' },
        { prompt: () => 'Que palabra lleva mayuscula inicial?', answer: () => 'Marta', wrong: () => ['mesa', 'lapiz'], explanation: () => 'Los nombres propios van con mayuscula.' }
      ],
      lang_oral: [
        { prompt: () => 'Para explicar mi respuesta conviene...', answer: () => 'hablar claro y dar una razon', wrong: () => ['hablar muy rapido sin parar', 'dar solo la respuesta sin explicar'], explanation: () => 'La expresion oral necesita orden.' },
        { prompt: () => 'Si no entiendo una pregunta puedo...', answer: () => 'pedir que la repitan', wrong: () => ['inventar la respuesta sin pensar', 'responder otra cosa diferente'], explanation: () => 'Pedir aclaracion ayuda.' },
        { prompt: () => 'En una conversacion debo...', answer: () => 'escuchar y respetar turnos', wrong: () => ['interrumpir cuando quiero hablar', 'hablar solo yo sin escuchar'], explanation: () => 'Conversar exige respeto.' }
      ]
    };
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'language', skill.id, difficulty, languageTemplates[skill.id] || languageTemplates.lang_literal, seed, context);
  }

  if (skill.id.startsWith('eng_')) {
    const colorWrongOptions = ['rojo', 'azul', 'verde', 'amarillo', 'negro', 'blanco']
      .filter(item => item !== color[1])
      .slice(0, 3);
    const englishTemplates = {
      eng_greetings: [
        { prompt: () => 'Choose the greeting.', answer: () => index % 2 === 0 ? 'Hello!' : 'Good morning', wrong: () => ['Goodbye!', 'Good night!'], explanation: () => 'Es un saludo.' },
        { prompt: () => 'How do you say "gracias"?', answer: () => 'Thank you', wrong: () => ['Sorry', 'Please'], explanation: () => 'Thank you significa gracias.' },
        { prompt: () => 'Best answer: Good night!', answer: () => 'Good night!', wrong: () => ['Good morning!', 'Good afternoon!'], explanation: () => 'Se responde al saludo.' }
      ],
      eng_vocabulary: [
        { prompt: () => `What color is "${color[0]}"?`, answer: () => color[1], wrong: () => colorWrongOptions, explanation: () => 'Relaciona palabra inglesa y significado.' },
        { prompt: () => `Choose the animal: ${animal[0]}`, answer: () => animal[1], wrong: () => ['flower', 'chair', 'pencil'], explanation: () => 'Traduce el animal.' },
        { prompt: () => 'Choose the school object.', answer: () => 'book', wrong: () => ['notebook', 'folder'], explanation: () => 'Book es libro.' }
      ],
      eng_like_routines: [
        { prompt: () => 'Complete: I like ___ games.', answer: () => 'playing', wrong: () => ['to plays', 'plays'], explanation: () => 'Despues de like puede ir playing.' },
        { prompt: () => 'Choose a daily routine.', answer: () => 'I brush my teeth.', wrong: () => ['I am tall.', 'I am happy.'], explanation: () => 'Es una rutina diaria.' },
        { prompt: () => 'Complete: I ___ breakfast.', answer: () => 'eat', wrong: () => ['have', 'drink'], explanation: () => 'Eat breakfast significa desayunar.' }
      ],
      eng_short_dialogue: [
        { prompt: () => 'Best answer: How old are you?', answer: () => 'I am eight.', wrong: () => ['I am fine.', 'I am happy.'], explanation: () => 'How old pregunta edad.' },
        { prompt: () => 'Best answer: What is your name?', answer: () => 'My name is Leo.', wrong: () => ['I am fine.', 'I like apples.'], explanation: () => 'Pregunta el nombre.' },
        { prompt: () => 'Best answer: Do you like music?', answer: () => 'Yes, I do.', wrong: () => ['Yes, I am.', 'Yes, I have.'], explanation: () => 'Do you like se responde con yes/no.' }
      ]
    };
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'english', skill.id, difficulty, englishTemplates[skill.id] || englishTemplates.eng_vocabulary, seed, context);
  }

  if (skill.id.startsWith('sci_')) {
    const scienceTemplates = {
      sci_living_things: [
        { prompt: () => `Cual de estos es un ser vivo?`, answer: () => animal[1], wrong: () => ['piedra', 'metal'], explanation: () => 'Los seres vivos nacen y crecen.' },
        { prompt: () => 'Que necesita normalmente una planta?', answer: () => 'agua, luz y aire', wrong: () => ['solo tierra, sin agua', 'solo agua, sin luz'], explanation: () => 'Las plantas necesitan condiciones para vivir.' },
        { prompt: () => 'Los animales vertebrados tienen...', answer: () => 'columna vertebral', wrong: () => ['caparazon como las tortugas', 'exoesqueleto como los insectos'], explanation: () => 'Los vertebrados tienen esqueleto interno.' }
      ],
      sci_health: [
        { prompt: () => 'Para cuidar la salud conviene...', answer: () => 'dormir, moverse y comer variado', wrong: () => ['comer siempre lo mismo', 'saltarse comidas frecuentemente'], explanation: () => 'Los habitos saludables cuidan el cuerpo.' },
        { prompt: () => 'Antes de comer debo...', answer: () => 'lavarme las manos', wrong: () => ['lavarme solo si se ven sucias', 'aclarar solo con agua fria'], explanation: () => 'Lavarse manos reduce microbios.' },
        { prompt: () => 'Si estoy cansado, mi cuerpo necesita...', answer: () => 'descanso', wrong: () => ['hacer ejercicio intenso', 'tomar mucho azucar'], explanation: () => 'Dormir ayuda a recuperarse.' }
      ],
      sci_materials: [
        { prompt: () => `Que material puede ser flexible?`, answer: () => 'tela', wrong: () => ['cristal', 'ceramica'], explanation: () => 'Flexible significa que se dobla.' },
        { prompt: () => 'Si el hielo se calienta, pasa a ser...', answer: () => 'agua liquida', wrong: () => ['vapor de agua', 'agua salada'], explanation: () => 'El hielo es agua solida.' },
        { prompt: () => 'Un material transparente deja pasar...', answer: () => 'la luz', wrong: () => ['solo el calor', 'el agua siempre'], explanation: () => 'Transparente permite ver o pasar luz.' }
      ],
      sci_time_history: [
        { prompt: () => 'Que orden temporal es correcto?', answer: () => 'antes, ahora, despues', wrong: () => ['despues, antes, ahora', 'ahora, antes, despues'], explanation: () => 'El tiempo se ordena.' },
        { prompt: () => 'La historia estudia...', answer: () => 'el pasado', wrong: () => ['solo el futuro', 'solo el presente'], explanation: () => 'Historia mira hechos del pasado.' },
        { prompt: () => 'Un calendario sirve para...', answer: () => 'organizar dias y meses', wrong: () => ['medir distancias', 'calcular pesos'], explanation: () => 'El calendario organiza el tiempo.' }
      ],
      sci_environment: [
        { prompt: () => 'Para cuidar el entorno debo...', answer: () => 'reducir, reutilizar y reciclar', wrong: () => ['usar mas recursos de los necesarios', 'dejar residuos en la naturaleza'], explanation: () => 'Cuidar recursos protege el entorno.' },
        { prompt: () => 'El papel suele ir al contenedor...', answer: () => 'azul', wrong: () => ['verde', 'amarillo'], explanation: () => 'El azul se usa para papel y carton.' },
        { prompt: () => 'Para ahorrar agua puedo...', answer: () => 'cerrar el grifo al enjabonarme', wrong: () => ['dejar el grifo abierto mientras me jabono', 'llenar la banera hasta el borde siempre'], explanation: () => 'Cerrar el grifo evita gasto.' }
      ]
    };
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'science', skill.id, difficulty, scienceTemplates[skill.id] || scienceTemplates.sci_environment, seed, context);
  }

  if (skill.id.startsWith('art_')) {
    const artTemplates = {
      art_color_line_texture: [
        { prompt: () => 'Una textura rugosa se nota...', answer: () => 'aspera o con relieve', wrong: () => ['lisa como el vidrio', 'suave como el algodon'], explanation: () => 'La textura describe superficie.' },
        { prompt: () => 'Un color primario es...', answer: () => 'rojo', wrong: () => ['naranja', 'morado'], explanation: () => 'Rojo, azul y amarillo son primarios.' },
        { prompt: () => 'Una linea curva sirve para dibujar...', answer: () => 'formas redondeadas', wrong: () => ['angulos rectos perfectos', 'figuras con solo esquinas'], explanation: () => 'Las lineas pueden expresar forma.' }
      ],
      art_storyboard: [
        { prompt: () => 'Un storyboard sirve para...', answer: () => 'ordenar escenas en dibujos', wrong: () => ['resumir un texto escrito', 'decorar la portada de un cuaderno'], explanation: () => 'Planifica una historia visual.' },
        { prompt: () => 'En una escena dibujo...', answer: () => 'una parte de la accion', wrong: () => ['todo lo que ocurre en la historia', 'solo los fondos sin personajes'], explanation: () => 'Cada escena cuenta un momento.' },
        { prompt: () => 'Para que se entienda una historia visual necesito...', answer: () => 'principio, desarrollo y final', wrong: () => ['solo dibujos sin orden', 'solo colores sin personajes'], explanation: () => 'El orden visual ayuda a comprender.' }
      ],
      art_music_rhythm: [
        { prompt: () => 'Repetir palmadas en orden crea...', answer: () => 'ritmo', wrong: () => ['una melodia', 'una armonia'], explanation: () => 'El ritmo organiza sonidos.' },
        { prompt: () => 'Un sonido fuerte o suave cambia...', answer: () => 'la intensidad', wrong: () => ['la velocidad del pulso', 'la duracion de la nota'], explanation: () => 'La intensidad puede variar.' },
        { prompt: () => 'El pulso en musica ayuda a...', answer: () => 'seguir el tiempo', wrong: () => ['marcar la melodia', 'cambiar de instrumento'], explanation: () => 'El pulso mantiene regularidad.' }
      ]
    };
    return buildFromTemplate(`auto-${skill.id}-${index}`, 'arts', skill.id, difficulty, artTemplates[skill.id] || artTemplates.art_color_line_texture, seed, context);
  }

  const movementTemplates = {
    move_warmup: [
      { prompt: () => 'Antes de ejercicio conviene...', answer: () => 'calentar suave', wrong: () => ['empezar con el ejercicio mas intenso', 'hacer estiramientos forzados en frio'], explanation: () => 'El calentamiento prepara el cuerpo.' },
      { prompt: () => 'Al terminar una carrera conviene...', answer: () => 'volver a la calma', wrong: () => ['parar en seco sin descansar', 'empezar otra actividad muy intensa'], explanation: () => 'La vuelta a la calma recupera el cuerpo.' },
      { prompt: () => 'Si algo duele al moverte debes...', answer: () => 'parar y avisar', wrong: () => ['continuar ignorando el dolor', 'acelerar para que pase pronto'], explanation: () => 'La seguridad es primero.' }
    ],
    move_coordination: [
      { prompt: () => 'Botar y atrapar una pelota trabaja...', answer: () => 'coordinacion', wrong: () => ['fuerza de piernas', 'resistencia aerobica'], explanation: () => 'Coordinar combina movimientos.' },
      { prompt: () => 'Caminar por una linea trabaja...', answer: () => 'equilibrio', wrong: () => ['velocidad de reaccion', 'fuerza muscular'], explanation: () => 'El equilibrio controla el cuerpo.' },
      { prompt: () => 'Saltar dentro y fuera de un aro mejora...', answer: () => 'control del espacio', wrong: () => ['fuerza de brazos', 'resistencia de larga duracion'], explanation: () => 'Usas cuerpo y espacio.' }
    ],
    move_rules_teamwork: [
      { prompt: () => 'En equipo es importante...', answer: () => 'respetar reglas y turnos', wrong: () => ['cambiar las reglas cuando vas perdiendo', 'decidir todo sin consultar al equipo'], explanation: () => 'Las reglas hacen el juego justo.' },
      { prompt: () => 'Si un companero falla, lo mejor es...', answer: () => 'animarle', wrong: () => ['criticarle delante de todos', 'pedir que le cambien del equipo'], explanation: () => 'El equipo mejora con apoyo.' },
      { prompt: () => 'Una regla de seguridad sirve para...', answer: () => 'evitar accidentes', wrong: () => ['dar ventaja al equipo que la propone', 'hacer el juego mas lento'], explanation: () => 'Las reglas cuidan a todos.' }
    ]
  };
  return buildFromTemplate(`auto-${skill.id}-${index}`, 'movement', skill.id, difficulty, movementTemplates[skill.id] || movementTemplates.move_rules_teamwork, seed, context);
}

function appendLargeLocalQuestionBank(targetTotal = 5000, seedOffset = 0) {
  const allSkills = Object.values(SKILLS).flat();
  let index = 1;
  while (QUESTION_BANK.length < targetTotal) {
    const generatedIndex = index + seedOffset;
    const skill = allSkills[(generatedIndex - 1) % allSkills.length];
    QUESTION_BANK.push(buildAutoQuestionForSkill(skill, generatedIndex));
    index += 1;
  }
}

appendMathExpansion();

// ─────────────────────────────────────────────────────────────────────────────
// EXPANSION: math_word_problems  –  48 problemas curados  (IDs wp-01 a wp-48)
// Curriculo LOMLOE 3 Primaria · universo Beyblade · sin tildes en strings
// ─────────────────────────────────────────────────────────────────────────────

function appendWordProblemsExpansion() {

  // ── BLOQUE 1: Suma/resta con llevadas en contexto (dif 1-2) ── 10 preguntas
  [
    [
      'En el Estadio X habia 347 espectadores. Llegaron 256 mas. Cuantos espectadores hay ahora?',
      603,
      [593, 503],
      'Se suman los espectadores: 347 + 256 = 603. La llevada en las decenas da 10 decenas = 1 centena extra.'
    ],
    [
      'Carlos tiene 428 cromos de Beys. Regala 165 a Nico. Cuantos cromos le quedan?',
      263,
      [273, 363],
      'Se restan los cromos regalados: 428 - 165 = 263. Al restar las decenas hay que pedir prestado a las centenas.'
    ],
    [
      'En el taller de piezas habia 512 tornillos. Se usaron 274 para reparar Beys. Cuantos quedan?',
      238,
      [348, 228],
      '512 - 274 = 238. Hay que reagrupar dos veces para completar la resta.'
    ],
    [
      'Valt colecciono 185 piezas en enero y 349 en febrero. Cuantas piezas tiene en total?',
      534,
      [524, 434],
      '185 + 349 = 534. En las unidades 5+9=14, escribimos 4 y llevamos 1 a las decenas.'
    ],
    [
      'En la Arena Extrema hubo 621 batallas este mes y 198 el mes pasado. Cuantas batallas mas hubo este mes?',
      423,
      [413, 523],
      '621 - 198 = 423. Hay que reagrupar en decenas y en centenas.'
    ],
    [
      'Aiger guarda 376 lanzadores en su mochila y encuentra 248 mas en el taller. Cuantos tiene en total?',
      624,
      [614, 714],
      '376 + 248 = 624. Las unidades dan 14: se escribe 4 y se lleva 1 decena.'
    ],
    [
      'En el torneo habia 800 pegatinas de Beys para repartir. Se repartieron 537. Cuantas pegatinas quedan?',
      263,
      [273, 363],
      '800 - 537 = 263. Al restar de una centena exacta hay que reagrupar varias veces.'
    ],
    [
      'Dante colecciona cartas de Beys. Tenia 453 y gano 289 en el torneo. Cuantas tiene ahora?',
      742,
      [732, 642],
      '453 + 289 = 742. En unidades: 3+9=12, se escribe 2 y se lleva 1 decena.'
    ],
    [
      'En el Coliseo de Combate hay 920 asientos. 386 estan ocupados. Cuantos asientos estan vacios?',
      534,
      [544, 434],
      '920 - 386 = 534. Hay que pedir prestado a las centenas porque 0 no puede restar 6.'
    ],
    [
      'Luna tiene 267 piezas de repuesto y Bird tiene 358. Cuantas piezas tienen entre los dos?',
      625,
      [615, 525],
      '267 + 358 = 625. Unidades: 7+8=15, se escribe 5 y se lleva 1. Decenas: 1+6+5=12, se lleva 1 mas.'
    ]
  ].forEach(([prompt, answer, wrongs, explanation], i) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-wp-curated-${String(i + 1).padStart(2, '0')}`,
      'math', 'math_word_problems',
      i < 5 ? 1 : 2,
      prompt, answer, wrongs, explanation
    ));
  });

  // ── BLOQUE 2: Problemas de 2 pasos (dif 2-3) ── 8 preguntas
  [
    [
      'En el taller habia 48 piezas. Llego un cargamento de 36 piezas mas. Despues se usaron 25 para reparar Beys. Cuantas piezas quedan?',
      59,
      [84, 11],
      'Paso 1: 48 + 36 = 84 piezas. Paso 2: 84 - 25 = 59 piezas. Son dos pasos: primero se suma el cargamento y despues se restan las usadas.'
    ],
    [
      'Valt tenia 57 cromos. Compro 28 en la tienda del Estadio X. Luego regalo 19 a Aiger. Cuantos cromos tiene Valt?',
      66,
      [85, 10],
      'Paso 1: 57 + 28 = 85. Paso 2: 85 - 19 = 66 cromos.'
    ],
    [
      'En el Tornado Stadium habian 145 espectadores por la manana y llegaron 87 mas al mediodia. Por la tarde se fueron 96. Cuantos habia al final de la tarde?',
      136,
      [232, 58],
      'Paso 1: 145 + 87 = 232. Paso 2: 232 - 96 = 136. Primero el total y luego se restan los que se fueron.'
    ],
    [
      'Carlos guardo 6 cajas con 7 lanzadores cada una. Despues perdio 13 lanzadores en el torneo. Cuantos lanzadores le quedan?',
      29,
      [42, 55],
      'Paso 1: 6 x 7 = 42 lanzadores. Paso 2: 42 - 13 = 29. Primero se calcula el total multiplicando, luego se resta.'
    ],
    [
      'En la Arena X habia 4 grupos de 9 Bladers cada uno. Despues se apuntaron 8 Bladers mas. Cuantos Bladers hay en total?',
      44,
      [36, 53],
      'Paso 1: 4 x 9 = 36 Bladers. Paso 2: 36 + 8 = 44. Primero se calculan los grupos y luego se suman los nuevos.'
    ],
    [
      'Bell gano 56 monedas en el primer torneo y 78 en el segundo. Despues gasto 95 en piezas nuevas para su Bey. Cuantas monedas le quedan?',
      39,
      [134, 17],
      'Paso 1: 56 + 78 = 134 monedas. Paso 2: 134 - 95 = 39. Se suman primero las dos ganancias y luego se resta el gasto.'
    ],
    [
      'En el taller habia 120 tornillos. Se usaron 45 por la manana y 38 por la tarde. Cuantos tornillos quedan?',
      37,
      [75, 83],
      'Paso 1: 45 + 38 = 83 tornillos usados. Paso 2: 120 - 83 = 37. Puedes sumar los usados primero y luego restar del total.'
    ],
    [
      'Nico compro 5 paquetes de 8 cromos cada uno. Luego intercambio 12 cromos con Sara. Cuantos cromos tiene Nico ahora?',
      28,
      [40, 60],
      'Paso 1: 5 x 8 = 40 cromos. Paso 2: 40 - 12 = 28. Primero se calcula el total con la multiplicacion y luego se restan los intercambiados.'
    ]
  ].forEach(([prompt, answer, wrongs, explanation], i) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-wp-curated-${String(i + 11).padStart(2, '0')}`,
      'math', 'math_word_problems',
      i < 4 ? 2 : 3,
      prompt, answer, wrongs, explanation
    ));
  });

  // ── BLOQUE 3: Dato irrelevante (dif 3) ── 6 preguntas
  [
    [
      'En el Estadio X hay 8 pistas, 45 sillas rojas y 63 sillas azules. Cuantas sillas hay en total?',
      108,
      [71, 116],
      'Las 8 pistas son un dato que no se necesita. Solo hay que sumar las sillas: 45 + 63 = 108.'
    ],
    [
      'Carlos tiene 3 Beys favoritos. Hoy gano 27 cromos y ayer habia ganado 34. Cuantos cromos gano en total?',
      61,
      [30, 64],
      'El numero de Beys favoritos no se usa. Solo se suman los cromos: 27 + 34 = 61.'
    ],
    [
      'En el taller hay 15 tornillos de repuesto, 48 piezas grandes y 36 piezas pequenas. Cuantas piezas hay en total?',
      84,
      [99, 48],
      'Los tornillos son un dato irrelevante. Solo se suman las piezas: 48 + 36 = 84.'
    ],
    [
      'Aiger entrena 6 dias a la semana. El lunes lanzo su Bey 52 veces y el martes 39 veces. Cuantos lanzamientos hizo en esos dos dias?',
      91,
      [97, 85],
      'Los 6 dias de entrenamiento no hacen falta. Solo se suman los lanzamientos: 52 + 39 = 91.'
    ],
    [
      'En la Arena Extrema hay 12 jueces, 94 Bladers apuntados y se han jugado 7 partidas hoy. Cuantos Bladers hay apuntados?',
      94,
      [101, 113],
      'Los jueces y las partidas de hoy no son necesarios. La pregunta pide los Bladers apuntados, que son 94.'
    ],
    [
      'Dante tiene 9 medallas, 64 puntos en la clasificacion y gano 18 puntos hoy. Cuantos puntos tiene ahora en la clasificacion?',
      82,
      [91, 73],
      'Las 9 medallas no se usan. Solo se suman los puntos de clasificacion: 64 + 18 = 82.'
    ]
  ].forEach(([prompt, answer, wrongs, explanation], i) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-wp-curated-${String(i + 19).padStart(2, '0')}`,
      'math', 'math_word_problems',
      3,
      prompt, answer, wrongs, explanation
    ));
  });

  // ── BLOQUE 4: Multiplicacion en contexto, grupos iguales (dif 2) ── 8 preguntas
  [
    [
      'En el torneo hay 6 equipos de Bladers. Cada equipo tiene 7 miembros. Cuantos Bladers participan en total?',
      42,
      [13, 36],
      '6 equipos x 7 miembros = 42 Bladers. Multiplicar es juntar grupos iguales.'
    ],
    [
      'Carlos guarda sus Beys en cajas. Tiene 4 cajas y en cada caja caben 9 Beys. Cuantos Beys caben en total?',
      36,
      [13, 45],
      '4 cajas x 9 Beys = 36 Beys. Son 4 grupos de 9.'
    ],
    [
      'Cada Blader del club lleva 5 lanzadores al torneo. Si hay 8 Bladers en el club, cuantos lanzadores llevan entre todos?',
      40,
      [13, 35],
      '8 Bladers x 5 lanzadores = 40 lanzadores. Son 8 grupos de 5.'
    ],
    [
      'En la tienda del Estadio X, cada paquete de cromos cuesta 3 monedas. Si Valt compra 9 paquetes, cuanto paga?',
      27,
      [12, 18],
      '9 paquetes x 3 monedas = 27 monedas. Son 9 grupos de 3.'
    ],
    [
      'Hay 7 mesas en el taller de Beys. En cada mesa trabajan 6 mecanicos. Cuantos mecanicos hay en el taller?',
      42,
      [13, 48],
      '7 mesas x 6 mecanicos = 42. Son 7 grupos de 6.'
    ],
    [
      'En cada ronda del Tornado Stadium se celebran 8 batallas. Si hay 5 rondas, cuantas batallas hay en total?',
      40,
      [13, 35],
      '5 rondas x 8 batallas = 40 batallas en total.'
    ],
    [
      'Bird reparte cromos entre sus amigos: da 10 cromos a cada uno y tiene 4 amigos. Cuantos cromos reparte?',
      40,
      [14, 30],
      '4 amigos x 10 cromos = 40 cromos. Son 4 grupos de 10.'
    ],
    [
      'En el campeonato, cada participante paga 2 monedas de inscripcion. Si se inscriben 9 participantes, cuanto se recauda?',
      18,
      [11, 16],
      '9 participantes x 2 monedas = 18 monedas. Son 9 grupos de 2.'
    ]
  ].forEach(([prompt, answer, wrongs, explanation], i) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-wp-curated-${String(i + 25).padStart(2, '0')}`,
      'math', 'math_word_problems',
      2,
      prompt, answer, wrongs, explanation
    ));
  });

  // ── BLOQUE 5: Division como reparto exacto (dif 2) ── 8 preguntas
  [
    [
      'Hay 35 cromos de Beys para repartir entre 5 amigos. Cuantos cromos le tocan a cada uno?',
      7,
      [6, 8],
      '35 : 5 = 7. Al repartir 35 en 5 grupos iguales salen 7 por grupo.'
    ],
    [
      'Carlos tiene 24 piezas de repuesto y las guarda en 4 cajitas iguales. Cuantas piezas hay en cada cajita?',
      6,
      [5, 7],
      '24 : 4 = 6. Se dividen 24 piezas en 4 grupos iguales de 6 cada uno.'
    ],
    [
      'En el taller hay 48 tornillos para repartir entre 6 mecanicos. Cuantos tornillos le tocan a cada mecanico?',
      8,
      [7, 9],
      '48 : 6 = 8. Cada mecanico recibe 8 tornillos.'
    ],
    [
      'Valt tiene 30 lanzadores y los coloca en grupos de 3. Cuantos grupos puede hacer?',
      10,
      [9, 13],
      '30 : 3 = 10. Se pueden formar 10 grupos de 3 lanzadores.'
    ],
    [
      'Hay 56 pegatinas de Beys para 8 participantes del torneo. Cuantas pegatinas recibe cada participante?',
      7,
      [6, 9],
      '56 : 8 = 7. Al repartir 56 en 8 partes iguales tocan 7 a cada uno.'
    ],
    [
      'Aiger quiere colocar 63 cartas en sobres de 7 cartas cada uno. Cuantos sobres necesita?',
      9,
      [8, 7],
      '63 : 7 = 9. Se necesitan 9 sobres para meter 63 cartas de 7 en 7.'
    ],
    [
      'En el campeonato hay 40 Bladers y se forman equipos de 5. Cuantos equipos se pueden hacer?',
      8,
      [7, 9],
      '40 : 5 = 8. Con 40 Bladers y 5 por equipo salen 8 equipos.'
    ],
    [
      'Bell reparte 18 medallas entre 9 ganadores del torneo. Cuantas medallas recibe cada ganador?',
      2,
      [3, 1],
      '18 : 9 = 2. Cada ganador recibe 2 medallas.'
    ]
  ].forEach(([prompt, answer, wrongs, explanation], i) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-wp-curated-${String(i + 33).padStart(2, '0')}`,
      'math', 'math_word_problems',
      2,
      prompt, answer, wrongs, explanation
    ));
  });

  // ── BLOQUE 6: Comparacion cuantos mas/menos y cuantas veces mas (dif 2-3) ── 8 preguntas
  [
    [
      'Carlos tiene 48 cromos y Nico tiene 31. Cuantos cromos mas tiene Carlos que Nico?',
      17,
      [79, 14],
      '48 - 31 = 17. Cuantos mas siempre es una resta entre los dos numeros.'
    ],
    [
      'En el Estadio X hay 65 sillas azules y 39 sillas rojas. Cuantas sillas azules mas hay que rojas?',
      26,
      [104, 29],
      '65 - 39 = 26. La diferencia entre los dos tipos de sillas es 26.'
    ],
    [
      'Valt gano 72 puntos y Aiger gano 58 puntos. Cuantos puntos menos gano Aiger?',
      14,
      [130, 16],
      '72 - 58 = 14. Cuantos menos siempre es una resta.'
    ],
    [
      'Dante tiene 4 Beys y Carlos tiene 28 cromos. Carlos tiene cuantas veces mas cromos que Beys tiene Dante?',
      7,
      [24, 32],
      '28 : 4 = 7. Cuantas veces mas es una division: cuantos grupos del numero pequeno caben en el grande.'
    ],
    [
      'En el taller hay 36 piezas grandes y 9 piezas pequenas. Las piezas grandes son cuantas veces mas que las pequenas?',
      4,
      [27, 45],
      '36 : 9 = 4. Las piezas grandes son 4 veces mas que las pequenas.'
    ],
    [
      'Bell tiene 56 pegatinas y Sara tiene 7. Cuantas veces mas pegatinas tiene Bell?',
      8,
      [49, 63],
      '56 : 7 = 8. Bell tiene 8 veces mas pegatinas que Sara.'
    ],
    [
      'En la clasificacion, Luna tiene 83 puntos y Iris tiene 67 puntos. Cuantos puntos le falta a Iris para llegar a Luna?',
      16,
      [150, 14],
      '83 - 67 = 16. Cuantos le faltan es una resta entre el numero mas grande y el mas pequeno.'
    ],
    [
      'En el torneo hay 5 veces mas Beys metalicos que Beys de plastico. Si hay 6 Beys de plastico, cuantos Beys metalicos hay?',
      30,
      [11, 25],
      '6 x 5 = 30. Si algo es 5 veces mas, se multiplica la cantidad base por 5.'
    ]
  ].forEach(([prompt, answer, wrongs, explanation], i) => {
    QUESTION_BANK.push(makeChoiceQuestion(
      `math-wp-curated-${String(i + 41).padStart(2, '0')}`,
      'math', 'math_word_problems',
      i < 3 ? 2 : 3,
      prompt, answer, wrongs, explanation
    ));
  });
}

appendWordProblemsExpansion();
appendLanguageExpansion();
appendEnglishExpansion();
appendMeasureTimeMoneyFractionsExpansion();
appendTablesGeometryExpansion();
appendScienceArtsMovementExpansion();
appendLivingThingsDepthExpansion();
appendBalancedWeakSkillExpansion();
appendMinimumSkillVolume(24);
appendLargeLocalQuestionBank(5000);
diversifyRepeatedPromptText();
appendLivingThingsClassificationPool();
diversifyRepeatedPromptText();

READING_BANK.push(
  {
    id: "read-n01",
    subject: "language",
    skill: "lang_literal",
    textType: "narrative",
    difficulty: 1,
    wordCount: 57,
    title: "La peonza perdida",
    text: "Leo busco su peonza roja por toda la habitacion. Miro debajo de la cama, dentro del armario y encima de la estanteria. Por fin la encontro en el bolsillo de su chaqueta, donde la habia guardado el dia anterior.\n\nSe rio de su propio despiste y la guardo en la mochila para el entrenamiento de la tarde.",
    questions: [
      { type: "choice", prompt: "De que color era la peonza de Leo?", answer: "Roja", options: ["Roja", "Azul", "Verde"] },
      { type: "choice", prompt: "Donde encontro finalmente la peonza?", answer: "En el bolsillo de su chaqueta", options: ["En el bolsillo de su chaqueta", "Debajo de la cama", "Dentro del armario"] },
      { type: "truefalse", prompt: "Leo no encontro nunca su peonza.", answer: false }
    ],
    writingPrompt: "Cuenta una vez que perdiste algo y donde lo encontraste al final.",
    writingKeywords: ["perdi", "encontre", "donde"]
  },
  {
    id: "read-n02",
    subject: "language",
    skill: "lang_literal",
    textType: "narrative",
    difficulty: 1,
    wordCount: 56,
    title: "El primer dia de piscina",
    text: "Sara estaba nerviosa porque era su primer dia en la piscina municipal. Se puso el bañador verde, agarro su flotador y camino despacio hasta el borde del agua.\n\nAl principio tenia miedo, pero su monitora le dio la mano y juntas entraron poco a poco. Al final del dia, Sara ya no queria salir del agua.",
    questions: [
      { type: "choice", prompt: "De que color era el bañador de Sara?", answer: "Verde", options: ["Verde", "Rojo", "Azul"] },
      { type: "choice", prompt: "Quien ayudo a Sara a entrar en el agua?", answer: "Su monitora", options: ["Su monitora", "Su madre", "Su hermana"] },
      { type: "truefalse", prompt: "Sara queria salir del agua enseguida.", answer: false }
    ],
    writingPrompt: "Que harias tu para ayudar a un amigo que tiene miedo de algo nuevo?",
    writingKeywords: ["ayudaria", "amigo", "miedo"]
  },
  {
    id: "read-n03",
    subject: "language",
    skill: "lang_order_text",
    textType: "narrative",
    difficulty: 1,
    wordCount: 54,
    title: "La receta de Nico",
    text: "Nico queria sorprender a su familia con un postre. Primero, lavo bien las fresas y las corto en trozos pequeños. Despues, las mezclo con yogur y un poco de miel en un cuenco grande.\n\nPor ultimo, lo metio todo en la nevera durante una hora. Cuando lo sirvio en la mesa, todos repitieron racion.",
    questions: [
      { type: "choice", prompt: "Que hizo Nico primero?", answer: "Lavar y cortar las fresas", options: ["Lavar y cortar las fresas", "Meterlo en la nevera", "Servirlo en la mesa"] },
      { type: "choice", prompt: "Con que mezclo las fresas?", answer: "Yogur y miel", options: ["Yogur y miel", "Leche y azucar", "Chocolate y nata"] },
      { type: "choice", prompt: "Que palabra indica el ultimo paso?", answer: "Por ultimo", options: ["Por ultimo", "Primero", "Despues"] }
    ],
    writingPrompt: "Explica los pasos para preparar tu merienda favorita, en orden.",
    writingKeywords: ["primero", "despues", "ultimo"]
  },
  {
    id: "read-n04",
    subject: "language",
    skill: "lang_inference",
    textType: "narrative",
    difficulty: 2,
    wordCount: 53,
    title: "La mochila mojada",
    text: "Cuando Pablo llego a casa, su mochila goteaba agua por todas partes y sus libros estaban empapados. Su madre lo miro y, sin decir nada, le señalo el cielo nublado por la ventana.\n\nPablo bajo la cabeza. Sabia que deberia haber cogido el paraguas esa mañana, como le habian dicho antes de salir.",
    questions: [
      { type: "choice", prompt: "Por que esta mojada la mochila de Pablo?", answer: "Porque llovio y no llevaba paraguas", options: ["Porque llovio y no llevaba paraguas", "Porque se cayo a una piscina", "Porque alguien le tiro agua"] },
      { type: "truefalse", prompt: "Pablo cogio el paraguas antes de salir.", answer: false },
      { type: "choice", prompt: "Como se siente Pablo al final?", answer: "Arrepentido", options: ["Arrepentido", "Muy alegre", "Sorprendido"] }
    ],
    writingPrompt: "Que consejo le darias a Pablo para que no le vuelva a pasar?",
    writingKeywords: ["consejo", "paraguas", "tiempo"]
  },
  {
    id: "read-n05",
    subject: "language",
    skill: "lang_inference",
    textType: "narrative",
    difficulty: 2,
    wordCount: 55,
    title: "El equipo incompleto",
    text: "El equipo de Iris se quedo sin portero justo antes del partido. Nadie queria ponerse los guantes porque tenian miedo de fallar delante de todos.\n\nIris, que normalmente jugaba de delantera, dio un paso adelante y se ofrecio voluntaria. Aunque encajo un gol, tambien hizo dos paradas increibles que el equipo recordaria todo el verano.",
    questions: [
      { type: "choice", prompt: "Que problema tenia el equipo de Iris?", answer: "No tenian portero", options: ["No tenian portero", "Habian perdido el balon", "Llegaban tarde"] },
      { type: "choice", prompt: "Que hizo Iris?", answer: "Se ofrecio de portera voluntaria", options: ["Se ofrecio de portera voluntaria", "Se fue a casa", "Se enfado con sus compañeros"] },
      { type: "truefalse", prompt: "Iris paro todos los goles del partido.", answer: false }
    ],
    writingPrompt: "Cuenta una vez que te ofreciste voluntario para algo que daba un poco de miedo.",
    writingKeywords: ["voluntario", "miedo", "porque"]
  },
  {
    id: "read-n06",
    subject: "language",
    skill: "lang_main_idea",
    textType: "narrative",
    difficulty: 2,
    wordCount: 59,
    title: "El torneo de los principiantes",
    text: "En el torneo de peonzas de este año, los organizadores crearon una categoria especial solo para principiantes. Asi, los niños que nunca habian competido podian aprender sin miedo a perder contra los mas experimentados.\n\nCarlitos, que solo llevaba un mes practicando, gano su primera ronda y, aunque perdio la segunda, dijo que se lo habia pasado mejor que nunca.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "Una categoria nueva ayudo a los principiantes a disfrutar del torneo", options: ["Una categoria nueva ayudo a los principiantes a disfrutar del torneo", "Carlitos gano el torneo completo", "El torneo se cancelo por lluvia"] },
      { type: "choice", prompt: "Cuanto tiempo llevaba practicando Carlitos?", answer: "Un mes", options: ["Un mes", "Un año", "Una semana"] },
      { type: "truefalse", prompt: "Carlitos gano las dos rondas que jugo.", answer: false }
    ],
    writingPrompt: "Por que crees que es buena idea crear categorias para principiantes en los torneos?",
    writingKeywords: ["principiantes", "porque", "aprender"]
  },
  {
    id: "read-n07",
    subject: "language",
    skill: "lang_literal",
    textType: "narrative",
    difficulty: 1,
    wordCount: 51,
    title: "El dibujo del concurso",
    text: "Luna paso toda la tarde dibujando un dragon azul para el concurso de arte del campamento. Uso lapices de colores, un poco de purpurina y mucha paciencia con los detalles de las escamas.\n\nCuando termino, lo colgo en la pared de su habitacion para verlo antes de entregarlo al dia siguiente.",
    questions: [
      { type: "choice", prompt: "Que animal dibujo Luna?", answer: "Un dragon", options: ["Un dragon", "Un caballo", "Un delfin"] },
      { type: "choice", prompt: "De que color era el dragon?", answer: "Azul", options: ["Azul", "Rojo", "Verde"] },
      { type: "truefalse", prompt: "Luna entrego el dibujo el mismo dia que lo termino.", answer: false }
    ],
    writingPrompt: "Describe que dibujarias tu si participaras en ese concurso.",
    writingKeywords: ["dibujaria", "colores"]
  },
  {
    id: "read-n08",
    subject: "language",
    skill: "lang_inference",
    textType: "narrative",
    difficulty: 2,
    wordCount: 54,
    title: "La bicicleta nueva",
    text: "Ana llevaba meses ahorrando las propinas de ayudar en casa para comprarse una bicicleta nueva. Cuando por fin junto el dinero suficiente, fue con su padre a la tienda y eligio una de color naranja con cesta delantera.\n\nEsa misma tarde, dio tantas vueltas por el parque que llego a casa agotada, pero feliz.",
    questions: [
      { type: "choice", prompt: "Como consiguio Ana el dinero?", answer: "Ahorrando propinas de ayudar en casa", options: ["Ahorrando propinas de ayudar en casa", "Se la regalaron sus abuelos", "La encontro en la calle"] },
      { type: "choice", prompt: "De que color era la bicicleta?", answer: "Naranja", options: ["Naranja", "Rosa", "Negra"] },
      { type: "truefalse", prompt: "Ana se sintio triste despues de montar en bicicleta.", answer: false }
    ],
    writingPrompt: "Que cosa te gustaria ahorrar para comprar? Explica como lo harias.",
    writingKeywords: ["ahorrar", "comprar", "dinero"]
  },
  {
    id: "read-n09",
    subject: "language",
    skill: "lang_order_text",
    textType: "narrative",
    difficulty: 1,
    wordCount: 52,
    title: "Preparando la acampada",
    text: "Antes de ir de acampada, Carla y su hermano hicieron una lista de cosas necesarias. Primero comprobaron que tenian la tienda de campaña y los sacos de dormir. Despues prepararon comida y agua para dos dias.\n\nPor ultimo, revisaron que las linternas tuvieran pilas nuevas antes de meterlo todo en el coche.",
    questions: [
      { type: "choice", prompt: "Que comprobaron primero?", answer: "La tienda de campaña y los sacos de dormir", options: ["La tienda de campaña y los sacos de dormir", "Las linternas", "La comida"] },
      { type: "choice", prompt: "Que revisaron por ultimo?", answer: "Que las linternas tuvieran pilas", options: ["Que las linternas tuvieran pilas", "La tienda de campaña", "El mapa"] },
      { type: "truefalse", prompt: "Llevaban comida para una semana entera.", answer: false }
    ],
    writingPrompt: "Haz tu propia lista de 3 cosas imprescindibles para ir de acampada.",
    writingKeywords: ["lista", "necesario", "llevar"]
  },
  {
    id: "read-n10",
    subject: "language",
    skill: "lang_main_idea",
    textType: "narrative",
    difficulty: 2,
    wordCount: 58,
    title: "El equipo que no se rindio",
    text: "Cuando empezo a llover en mitad del partido, muchos pensaron que lo cancelarian. Sin embargo, el equipo de Dani decidio seguir jugando bajo la lluvia, resbalando y riendo cada vez que alguien se caia al cesped mojado.\n\nAl final perdieron el partido por un gol, pero todos coincidieron en que habia sido el dia mas divertido del verano.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "El equipo se lo paso muy bien aunque perdio bajo la lluvia", options: ["El equipo se lo paso muy bien aunque perdio bajo la lluvia", "El partido se cancelo por la lluvia", "El equipo de Dani gano el partido"] },
      { type: "truefalse", prompt: "El equipo de Dani gano el partido.", answer: false },
      { type: "choice", prompt: "Por que se reian los jugadores?", answer: "Porque resbalaban en el cesped mojado", options: ["Porque resbalaban en el cesped mojado", "Porque el arbitro hacia bromas", "Porque ganaban por mucha diferencia"] }
    ],
    writingPrompt: "Cuenta un dia en el que algo salio mal pero te divertiste igualmente.",
    writingKeywords: ["mal", "divertido", "aunque"]
  },
  {
    id: "read-n11",
    subject: "language",
    skill: "lang_inference",
    textType: "narrative",
    difficulty: 3,
    wordCount: 82,
    title: "El cuaderno olvidado",
    text: "Marta llevaba toda la semana preparando su presentacion sobre el sistema solar, pero la mañana del concurso descubrio que se habia dejado el cuaderno con los apuntes en casa de su abuela.\n\nEn vez de entrar en panico, cerro los ojos un momento y recordo todo lo que habia practicado tantas veces frente al espejo. Subio al escenario sin papeles y, para su sorpresa, hablo con mas naturalidad que nunca, porque ya no estaba leyendo, sino contando lo que de verdad sabia.",
    questions: [
      { type: "choice", prompt: "Que problema tuvo Marta antes del concurso?", answer: "Se dejo el cuaderno de apuntes en casa de su abuela", options: ["Se dejo el cuaderno de apuntes en casa de su abuela", "Se quedo dormida y llego tarde", "Perdio su disfraz del sistema solar"] },
      { type: "choice", prompt: "Por que hablo Marta con mas naturalidad?", answer: "Porque conto lo que sabia en vez de leerlo", options: ["Porque conto lo que sabia en vez de leerlo", "Porque alguien le dio otro cuaderno", "Porque el publico era pequeño"] },
      { type: "truefalse", prompt: "Marta entro en panico y no pudo hablar.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"naturalidad\" significa hablar...", answer: "de forma sencilla y sin forzar nada", options: ["de forma sencilla y sin forzar nada", "gritando muy fuerte", "leyendo cada palabra del papel"] }
    ],
    writingPrompt: "Cuenta una situacion en la que te olvidaste algo importante y como lo solucionaste.",
    writingKeywords: ["olvide", "solucione", "porque"]
  },
  {
    id: "read-n12",
    subject: "language",
    skill: "lang_main_idea",
    textType: "narrative",
    difficulty: 3,
    wordCount: 80,
    title: "El campeonato compartido",
    text: "Hugo y su mejor amigo, Nico, llegaron juntos a la final del campeonato de peonzas. Durante todo el verano se habian entrenado el uno al otro, compartiendo trucos y corrigiendo errores sin ningun tipo de envidia.\n\nCuando Nico gano por muy poco, Hugo fue el primero en felicitarlo con un abrazo. Mas tarde, explico a sus padres que para el la verdadera victoria habia sido mejorar tanto gracias a entrenar juntos, sin importar quien se llevara la copa al final.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "La amistad y el entrenamiento conjunto importaron mas que ganar", options: ["La amistad y el entrenamiento conjunto importaron mas que ganar", "Hugo se enfado porque perdio la final", "Nico entreno solo todo el verano"] },
      { type: "choice", prompt: "Que hizo Hugo cuando Nico gano?", answer: "Lo felicito con un abrazo", options: ["Lo felicito con un abrazo", "Se fue enfadado a casa", "Pidio la revancha inmediatamente"] },
      { type: "truefalse", prompt: "Hugo y Nico se entrenaron por separado, cada uno solo.", answer: false }
    ],
    writingPrompt: "Que opinas de la actitud de Hugo al perder la final? Explica por que.",
    writingKeywords: ["opino", "actitud", "porque"]
  },
  {
    id: "read-n13",
    subject: "language",
    skill: "lang_inference",
    textType: "narrative",
    difficulty: 4,
    wordCount: 98,
    title: "La carrera contra el reloj",
    text: "Quedaban solo diez minutos para que cerraran las inscripciones del torneo de verano cuando Pablo se dio cuenta de que habia olvidado el justificante medico en su otra mochila, la que se habia quedado en el coche de su tio.\n\nSin perder un segundo, cogio su bicicleta y pedaleo mas rapido de lo que lo habia hecho jamas, esquivando charcos y saludando apenas a los vecinos que lo veian pasar a toda velocidad. Llego empapado de sudor justo cuando la organizadora estaba guardando la lista, pero consiguio entregar el papel a tiempo, con una sonrisa de alivio enorme.",
    questions: [
      { type: "choice", prompt: "Que habia olvidado Pablo?", answer: "El justificante medico", options: ["El justificante medico", "Su peonza", "El dinero de la inscripcion"] },
      { type: "choice", prompt: "Como resolvio Pablo el problema?", answer: "Pedaleando muy rapido para llegar a tiempo", options: ["Pedaleando muy rapido para llegar a tiempo", "Pidiendo a su tio que lo llevara en coche", "Llamando por telefono a la organizadora"] },
      { type: "truefalse", prompt: "Pablo llego tarde y no pudo inscribirse.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"alivio\" describe un sentimiento de...", answer: "tranquilidad despues de un momento de tension", options: ["tranquilidad despues de un momento de tension", "tristeza profunda", "aburrimiento total"] }
    ],
    writingPrompt: "Describe una vez que tuviste que darte mucha prisa para llegar a tiempo a algo.",
    writingKeywords: ["prisa", "tiempo", "llegue"]
  },
  {
    id: "read-n14",
    subject: "language",
    skill: "lang_main_idea",
    textType: "narrative",
    difficulty: 4,
    wordCount: 91,
    title: "El consejo de la entrenadora",
    text: "Despues de perder tres partidos seguidos, Iris estaba convencida de que ya no merecia la pena seguir entrenando con tanto esfuerzo. Se lo conto a su entrenadora, esperando que le dijera que tenia razon en sentirse asi.\n\nEn cambio, la entrenadora le enseño una foto antigua de ella misma, mucho mas joven, perdiendo un campeonato entero. Le explico que aquella derrota la habia ayudado a entender exactamente que debia mejorar para el año siguiente. Iris entendio entonces que perder no significaba haber fracasado, sino simplemente no haber terminado todavia de aprender.",
    questions: [
      { type: "choice", prompt: "Por que se sentia desanimada Iris?", answer: "Porque habia perdido tres partidos seguidos", options: ["Porque habia perdido tres partidos seguidos", "Porque se habia lesionado", "Porque su equipo se disolvio"] },
      { type: "choice", prompt: "Que le ensenio la entrenadora?", answer: "Una foto suya perdiendo un campeonato", options: ["Una foto suya perdiendo un campeonato", "Un trofeo que habia ganado", "Un video de otro equipo"] },
      { type: "truefalse", prompt: "La entrenadora le dijo a Iris que dejara de entrenar.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"fracasado\" se refiere a alguien que...", answer: "no logro lo que intentaba", options: ["no logro lo que intentaba", "gano todos los premios", "nunca lo intento"] }
    ],
    writingPrompt: "Que le dirias tu a alguien que quiere rendirse despues de varios fracasos?",
    writingKeywords: ["diria", "rendirse", "intentar"]
  },
  {
    id: "read-n15",
    subject: "language",
    skill: "lang_inference",
    textType: "narrative",
    difficulty: 5,
    wordCount: 126,
    title: "El verano que cambio de opinion",
    text: "Desde pequeña, Luna habia repetido siempre que odiaba madrugar y que jamas se apuntaria a un campamento de verano como hacian sus primos. Sin embargo, aquel año sus padres tenian que trabajar y no le quedo otra opcion que apuntarse, malhumorada y convencida de que serian las peores semanas de su vida.\n\nLas dos primeras mañanas se levanto de mal humor, pero poco a poco empezo a esperar con ganas las actividades de la tarde, sobre todo las carreras de orientacion por el bosque. Para finales de julio, era ella quien despertaba a su madre los sabados, pidiendole llegar antes al autobus para no perderse ni un minuto. Sus primos, al verla tan entusiasmada, no dejaban de tomarle el pelo recordandole sus propias palabras de junio.",
    questions: [
      { type: "choice", prompt: "Por que se apunto Luna al campamento al final?", answer: "Porque sus padres tenian que trabajar y no tenia otra opcion", options: ["Porque sus padres tenian que trabajar y no tenia otra opcion", "Porque sus primos la convencieron con regalos", "Porque ganaba dinero por ir"] },
      { type: "choice", prompt: "Que actividad le empezo a gustar especialmente?", answer: "Las carreras de orientacion por el bosque", options: ["Las carreras de orientacion por el bosque", "Nadar en la piscina", "Pintar murales"] },
      { type: "truefalse", prompt: "Luna sigue odiando madrugar tanto como al principio del verano.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"entusiasmada\" significa que Luna estaba...", answer: "muy ilusionada y con muchas ganas", options: ["muy ilusionada y con muchas ganas", "enfadada y de mal humor", "cansada y sin energia"] }
    ],
    writingPrompt: "Cuenta algo que al principio no te gustaba nada pero que despues acabo encantandote.",
    writingKeywords: ["principio", "despues", "cambio"]
  },
  {
    id: "read-n16",
    subject: "language",
    skill: "lang_main_idea",
    textType: "narrative",
    difficulty: 5,
    wordCount: 119,
    title: "El proyecto de los tres",
    text: "Cuando la profesora de verano anuncio que el proyecto final debia hacerse en grupos de tres, Dani, Ana y Carlitos se miraron preocupados: nunca habian trabajado juntos y cada uno tenia una idea completamente distinta sobre que construir para la feria de ciencias.\n\nDurante la primera reunion discutieron tanto que casi decidieron pedir cambiar de grupo. Sin embargo, alguien propuso escribir las tres ideas en papeles separados y buscar, entre las tres, algo en comun. Asi descubrieron que todas tenian relacion con el agua: el volcan de Dani, el barco de Ana y el reciclaje de Carlitos. Combinaron las tres ideas en una sola maqueta sobre el ciclo del agua que termino ganando el primer premio de su categoria.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "Combinar ideas distintas les ayudo a crear un proyecto ganador", options: ["Combinar ideas distintas les ayudo a crear un proyecto ganador", "Los tres niños se pelearon y no entregaron el proyecto", "La profesora elegio el tema por ellos"] },
      { type: "choice", prompt: "Que tenian en comun las tres ideas iniciales?", answer: "Estaban relacionadas con el agua", options: ["Estaban relacionadas con el agua", "Eran sobre animales", "Trataban del espacio"] },
      { type: "truefalse", prompt: "El grupo cambio de integrantes a mitad del proyecto.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"maqueta\" se refiere a...", answer: "una reproduccion pequeña hecha a mano", options: ["una reproduccion pequeña hecha a mano", "un dibujo digital", "un texto escrito largo"] }
    ],
    writingPrompt: "Si tuvieras que hacer un proyecto en grupo, que tema elegirias y por que?",
    writingKeywords: ["proyecto", "tema", "porque"]
  },
  {
    id: "read-i01",
    subject: "language",
    skill: "lang_literal",
    textType: "informative",
    difficulty: 1,
    wordCount: 56,
    title: "Las hormigas y su fuerza",
    text: "Las hormigas son insectos muy pequeños, pero increiblemente fuertes. Algunas pueden cargar objetos que pesan hasta cincuenta veces mas que su propio cuerpo.\n\nTrabajan siempre en equipo, siguiendo un rastro de olor que dejan otras hormigas para guiar al resto hacia la comida. Por eso, cuando ves una fila de hormigas, en realidad estan trabajando juntas.",
    questions: [
      { type: "choice", prompt: "Cuanto pueden cargar algunas hormigas?", answer: "Hasta cincuenta veces su propio peso", options: ["Hasta cincuenta veces su propio peso", "El doble de su peso", "Nada mas que su propio peso"] },
      { type: "choice", prompt: "Como se guian las hormigas hacia la comida?", answer: "Con un rastro de olor", options: ["Con un rastro de olor", "Mirando el sol", "Escuchando sonidos"] },
      { type: "truefalse", prompt: "Las hormigas trabajan siempre solas.", answer: false }
    ],
    writingPrompt: "Que otro animal pequeño conoces que sea sorprendentemente fuerte o rapido?",
    writingKeywords: ["animal", "fuerte", "porque"]
  },
  {
    id: "read-i02",
    subject: "language",
    skill: "lang_main_idea",
    textType: "informative",
    difficulty: 2,
    wordCount: 69,
    title: "Por que el cielo es azul",
    text: "La luz del sol parece blanca, pero en realidad esta formada por muchos colores mezclados. Cuando esa luz entra en la atmosfera de la Tierra, choca con particulas muy pequeñas de aire.\n\nEl color azul es el que mas se dispersa en todas direcciones, por eso lo vemos por todo el cielo. Al atardecer, la luz atraviesa mas atmosfera y por eso el cielo se ve naranja o rojo.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "El color azul del cielo se debe a como se dispersa la luz", options: ["El color azul del cielo se debe a como se dispersa la luz", "El cielo siempre es del mismo color", "El sol cambia de color cada dia"] },
      { type: "choice", prompt: "Por que el cielo se ve naranja al atardecer?", answer: "Porque la luz atraviesa mas atmosfera", options: ["Porque la luz atraviesa mas atmosfera", "Porque el sol se apaga un poco", "Porque hay menos nubes"] },
      { type: "truefalse", prompt: "La luz del sol esta formada por un solo color.", answer: false }
    ],
    writingPrompt: "Que otra pregunta sobre el cielo o el espacio te gustaria investigar?",
    writingKeywords: ["pregunta", "investigar", "cielo"]
  },
  {
    id: "read-i03",
    subject: "language",
    skill: "lang_literal",
    textType: "informative",
    difficulty: 2,
    wordCount: 76,
    title: "Como se forma un arcoiris",
    text: "Un arcoiris aparece cuando la luz del sol atraviesa gotas de agua que quedan en el aire despues de la lluvia. Al entrar en cada gota, la luz se separa en los colores que la forman: rojo, naranja, amarillo, verde, azul y violeta.\n\nPara verlo, el sol debe estar detras de la persona que mira, y la lluvia, delante. Por eso los arcoiris suelen aparecer justo cuando deja de llover y el sol vuelve a salir.",
    questions: [
      { type: "choice", prompt: "Que necesita la luz del sol para formar un arcoiris?", answer: "Atravesar gotas de agua en el aire", options: ["Atravesar gotas de agua en el aire", "Pasar por una ventana", "Reflejarse en la nieve"] },
      { type: "choice", prompt: "Donde debe estar el sol para ver el arcoiris?", answer: "Detras de la persona que mira", options: ["Detras de la persona que mira", "Justo encima de la cabeza", "Escondido entre nubes"] },
      { type: "truefalse", prompt: "Los arcoiris solo se pueden ver de noche.", answer: false }
    ],
    writingPrompt: "Describe el ultimo arcoiris que recuerdes haber visto, o como te lo imaginas.",
    writingKeywords: ["arcoiris", "colores", "vi"]
  },
  {
    id: "read-i04",
    subject: "language",
    skill: "lang_vocabulary",
    textType: "informative",
    difficulty: 3,
    wordCount: 78,
    title: "Los camaleones y su camuflaje",
    text: "Los camaleones son famosos por su capacidad para cambiar de color, aunque mucha gente cree que lo hacen solo para esconderse. En realidad, esta habilidad les sirve principalmente para comunicarse con otros camaleones y para regular su temperatura corporal.\n\nCuando un camaleon se enfada o quiere atraer pareja, sus colores se vuelven mas intensos y llamativos. El camuflaje, en cambio, suele depender mas de su forma alargada y de su capacidad de quedarse completamente inmovil entre las ramas.",
    questions: [
      { type: "choice", prompt: "Para que sirve principalmente el cambio de color del camaleon?", answer: "Para comunicarse y regular su temperatura", options: ["Para comunicarse y regular su temperatura", "Solo para esconderse de otros animales", "Para nadar mejor"] },
      { type: "truefalse", prompt: "El camuflaje del camaleon depende solo de su color cambiante.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"inmovil\" significa que el camaleon...", answer: "no se mueve nada", options: ["no se mueve nada", "se mueve muy rapido", "cambia de color cada segundo"] },
      { type: "choice", prompt: "Cuando se vuelven mas intensos los colores del camaleon?", answer: "Cuando se enfada o quiere atraer pareja", options: ["Cuando se enfada o quiere atraer pareja", "Solo cuando duerme", "Cuando hace mucho frio"] }
    ],
    writingPrompt: "Que otro animal usa el camuflaje para protegerse? Explica como lo hace.",
    writingKeywords: ["camuflaje", "animal", "protegerse"]
  },
  {
    id: "read-i05",
    subject: "language",
    skill: "lang_main_idea",
    textType: "informative",
    difficulty: 3,
    wordCount: 85,
    title: "De donde viene el chocolate",
    text: "El chocolate que comemos empieza siendo una semilla amarga dentro de una fruta llamada mazorca de cacao, que crece en arboles de zonas tropicales como America Central y Africa Occidental.\n\nPara convertir esas semillas en chocolate, primero se dejan fermentar varios dias, despues se secan al sol y finalmente se tuestan, igual que se hace con el cafe. Solo despues de todo ese proceso, las semillas se muelen hasta formar una pasta que, mezclada con azucar y leche, se transforma en el chocolate que conocemos.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "El chocolate pasa por un largo proceso desde la semilla de cacao", options: ["El chocolate pasa por un largo proceso desde la semilla de cacao", "El chocolate crece directamente en los arboles", "El chocolate se fabrica solo en Europa"] },
      { type: "choice", prompt: "Donde crecen los arboles de cacao?", answer: "En zonas tropicales como America Central y Africa", options: ["En zonas tropicales como America Central y Africa", "Solo en Europa", "En zonas con mucha nieve"] },
      { type: "truefalse", prompt: "Las semillas de cacao se comen dulces directamente del arbol.", answer: false }
    ],
    writingPrompt: "Que otro alimento te gustaria investigar para saber de donde viene?",
    writingKeywords: ["alimento", "investigar", "viene"]
  },
  {
    id: "read-i06",
    subject: "language",
    skill: "lang_vocabulary",
    textType: "informative",
    difficulty: 4,
    wordCount: 91,
    title: "Las abejas y la polinizacion",
    text: "Cuando una abeja visita una flor para recolectar nectar, su cuerpo peludo se cubre de granos de polen sin que ella se de cuenta. Al volar hasta la siguiente flor, parte de ese polen se desprende y fecunda la nueva planta, permitiendo que produzca frutos y semillas.\n\nEste proceso, llamado polinizacion, es esencial para la mayoria de los cultivos que comemos los humanos, desde manzanas hasta almendras. Por eso, cuando las poblaciones de abejas disminuyen, los cientificos se preocupan: sin estos pequeños insectos, muchos alimentos serian mucho mas dificiles de producir.",
    questions: [
      { type: "choice", prompt: "Que es la polinizacion?", answer: "El proceso por el que el polen fecunda nuevas plantas", options: ["El proceso por el que el polen fecunda nuevas plantas", "La forma en que las abejas construyen sus colmenas", "El modo en que las flores cambian de color"] },
      { type: "vocabulary", prompt: "En el texto, \"esencial\" significa algo...", answer: "muy necesario, casi imprescindible", options: ["muy necesario, casi imprescindible", "poco importante", "opcional y facil de sustituir"] },
      { type: "truefalse", prompt: "Las abejas recogen polen a proposito para fecundar flores.", answer: false },
      { type: "choice", prompt: "Por que se preocupan los cientificos si bajan las abejas?", answer: "Porque muchos alimentos serian mas dificiles de producir", options: ["Porque muchos alimentos serian mas dificiles de producir", "Porque las abejas dan miel para todos los postres", "Porque las flores se quedarian sin color"] }
    ],
    writingPrompt: "Que podriamos hacer las personas para ayudar a proteger a las abejas?",
    writingKeywords: ["proteger", "abejas", "podriamos"]
  },
  {
    id: "read-i07",
    subject: "language",
    skill: "lang_main_idea",
    textType: "informative",
    difficulty: 4,
    wordCount: 99,
    title: "El ciclo del agua",
    text: "El agua de nuestro planeta nunca desaparece, simplemente cambia de forma y de lugar en un proceso que se repite sin descanso. El calor del sol hace que el agua de mares y rios se evapore, convirtiendose en vapor que sube hacia el cielo.\n\nAl enfriarse en las alturas, ese vapor se condensa formando nubes. Cuando las gotas dentro de las nubes se vuelven demasiado pesadas, caen como lluvia, nieve o granizo. Parte de esa agua se filtra bajo la tierra, otra parte llega a los rios y, finalmente, todo vuelve al mar, donde el ciclo comienza de nuevo.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "El agua cambia de forma y lugar en un ciclo continuo", options: ["El agua cambia de forma y lugar en un ciclo continuo", "El agua del mar se acaba poco a poco", "Solo llueve cuando el mar se calienta demasiado"] },
      { type: "choice", prompt: "Que pasa cuando el vapor de agua se enfria en las alturas?", answer: "Se condensa y forma nubes", options: ["Se condensa y forma nubes", "Se convierte en hielo para siempre", "Desaparece del todo"] },
      { type: "truefalse", prompt: "El agua del planeta desaparece poco a poco cada año.", answer: false }
    ],
    writingPrompt: "Explica con tus propias palabras que parte del ciclo del agua te parece mas interesante.",
    writingKeywords: ["ciclo", "agua", "interesante"]
  },
  {
    id: "read-i08",
    subject: "language",
    skill: "lang_vocabulary",
    textType: "informative",
    difficulty: 5,
    wordCount: 112,
    title: "Los volcanes y su erupcion",
    text: "Bajo la superficie de la Tierra existe una capa de roca tan caliente que se mantiene en estado liquido, conocida como magma. Cuando la presion en el interior del planeta aumenta lo suficiente, ese magma busca una salida hacia el exterior a traves de grietas, dando lugar a lo que conocemos como erupcion volcanica.\n\nNo todas las erupciones son iguales: algunas son lentas y expulsan lava de forma tranquila, mientras que otras son explosivas y lanzan ceniza, gases y fragmentos de roca a gran velocidad. Los cientificos que estudian los volcanes, llamados vulcanologos, observan pequeños cambios en el terreno y los gases liberados para intentar predecir cuando podria producirse la siguiente erupcion.",
    questions: [
      { type: "choice", prompt: "Que es el magma?", answer: "Roca tan caliente que se mantiene liquida bajo la superficie", options: ["Roca tan caliente que se mantiene liquida bajo la superficie", "Un tipo de ceniza volcanica", "El nombre del crater del volcan"] },
      { type: "vocabulary", prompt: "En el texto, \"vulcanologos\" son personas que...", answer: "estudian los volcanes", options: ["estudian los volcanes", "viven cerca de los volcanes", "construyen volcanes artificiales"] },
      { type: "truefalse", prompt: "Todas las erupciones volcanicas son igual de explosivas.", answer: false },
      { type: "choice", prompt: "Para que observan los vulcanologos los cambios en el terreno?", answer: "Para intentar predecir la siguiente erupcion", options: ["Para intentar predecir la siguiente erupcion", "Para construir nuevas ciudades", "Para medir la temperatura del mar"] }
    ],
    writingPrompt: "Que te gustaria preguntarle a un vulcanologo si pudieras entrevistarlo?",
    writingKeywords: ["preguntaria", "volcan", "cientifico"]
  },
  {
    id: "read-l01",
    subject: "language",
    skill: "lang_text_structure",
    textType: "letter",
    difficulty: 2,
    wordCount: 65,
    title: "Carta desde el campamento",
    text: "Querida mama:\n\nTe escribo desde el campamento de verano. Hace dos dias que llegue y ya he hecho dos amigos nuevos, Pau y Nico. Ayer aprendimos a montar una tienda de campaña y por la noche vimos un cielo lleno de estrellas.\n\nSe me olvido traer la linterna, asi que si puedes enviarmela con la siguiente carta, te lo agradeceria.\n\nUn abrazo muy fuerte,\nDaniela",
    questions: [
      { type: "choice", prompt: "Quien escribe la carta?", answer: "Daniela", options: ["Daniela", "Pau", "Nico"] },
      { type: "choice", prompt: "Que le pide Daniela a su madre?", answer: "Que le envie una linterna", options: ["Que le envie una linterna", "Que la vaya a buscar", "Que le mande mas ropa"] },
      { type: "choice", prompt: "Que parte de la carta indica quien la escribe?", answer: "La despedida con la firma al final", options: ["La despedida con la firma al final", "El saludo inicial", "El primer parrafo"] }
    ],
    writingPrompt: "Escribe el inicio de una carta a un amigo contandole algo divertido de esta semana.",
    writingKeywords: ["querido", "hola", "semana"]
  },
  {
    id: "read-l02",
    subject: "language",
    skill: "lang_text_structure",
    textType: "letter",
    difficulty: 3,
    wordCount: 84,
    title: "Carta a la abuela",
    text: "Querida abuela:\n\nEspero que estes bien. Quiero contarte que por fin gane mi primer torneo de natacion. Estaba muy nerviosa antes de la salida, pero en cuanto sono el silbato me olvide de todo y solo pense en nadar lo mejor posible.\n\nMis padres dicen que vendran a visitarte el mes que viene y que yo podre ir con ellos. Tengo muchas ganas de contarte la carrera con todos los detalles y de comer tu tarta de manzana otra vez.\n\nUn besazo grande,\nClara",
    questions: [
      { type: "choice", prompt: "Que logro consiguio Clara?", answer: "Gano su primer torneo de natacion", options: ["Gano su primer torneo de natacion", "Aprendio a montar en bicicleta", "Termino un libro muy largo"] },
      { type: "choice", prompt: "Que tiene ganas de comer Clara cuando visite a su abuela?", answer: "Tarta de manzana", options: ["Tarta de manzana", "Galletas de chocolate", "Helado de fresa"] },
      { type: "truefalse", prompt: "Clara estaba completamente tranquila antes de la carrera.", answer: false }
    ],
    writingPrompt: "Cuentale a un familiar, en una carta breve, un logro reciente del que estes orgulloso.",
    writingKeywords: ["querido", "logro", "orgulloso"]
  },
  {
    id: "read-l03",
    subject: "language",
    skill: "lang_text_structure",
    textType: "letter",
    difficulty: 4,
    wordCount: 102,
    title: "Carta al club deportivo",
    text: "Estimado señor director del club:\n\nMe dirijo a usted para proponer una idea que creo que podria gustar a muchos socios. Durante el verano, varios niños del equipo hemos notado que no existe ningun torneo pensado especialmente para principiantes, y eso hace que algunos compañeros se sientan inseguros para participar.\n\nPor eso, le propongo crear una categoria nueva, solo para quienes lleven menos de un año practicando. Estoy seguro de que esto animaria a mas niños a apuntarse sin miedo a perder siempre contra los mas experimentados.\n\nQuedo a su disposicion para hablar con mas detalle sobre esta propuesta.\n\nAtentamente,\nMarcos Lopez",
    questions: [
      { type: "choice", prompt: "Que propone Marcos en su carta?", answer: "Crear una categoria nueva para principiantes", options: ["Crear una categoria nueva para principiantes", "Cerrar el club durante el verano", "Subir el precio de las inscripciones"] },
      { type: "choice", prompt: "A quien va dirigida la carta?", answer: "Al director del club", options: ["Al director del club", "A su entrenador personal", "A sus compañeros de equipo"] },
      { type: "truefalse", prompt: "Marcos escribe la carta de forma muy informal, como a un amigo.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"atentamente\" es una formula que se usa para...", answer: "despedirse de forma educada y formal", options: ["despedirse de forma educada y formal", "pedir disculpas", "empezar una carta"] }
    ],
    writingPrompt: "Escribe una propuesta breve que harias tu a un club o colegio para mejorar algo.",
    writingKeywords: ["propongo", "mejorar", "porque"]
  },
  {
    id: "read-l04",
    subject: "language",
    skill: "lang_text_structure",
    textType: "letter",
    difficulty: 3,
    wordCount: 68,
    title: "Carta de disculpa",
    text: "Querido Hugo:\n\nTe escribo esta carta porque queria disculparme por lo que paso el otro dia en el entrenamiento. No deberia haberme enfadado contigo solo porque ganaste la ronda, fue una reaccion injusta de mi parte.\n\nMe di cuenta de que estaba mas preocupado por perder que por disfrutar del juego, y eso no esta bien. Espero que podamos seguir entrenando juntos como hasta ahora.\n\nTu amigo,\nDiego",
    questions: [
      { type: "choice", prompt: "Por que se disculpa Diego?", answer: "Por enfadarse injustamente cuando Hugo gano", options: ["Por enfadarse injustamente cuando Hugo gano", "Por llegar tarde al entrenamiento", "Por romper la peonza de Hugo"] },
      { type: "choice", prompt: "Que se dio cuenta Diego sobre si mismo?", answer: "Que le preocupaba mas perder que disfrutar", options: ["Que le preocupaba mas perder que disfrutar", "Que ya no queria entrenar mas", "Que Hugo no era un buen amigo"] },
      { type: "truefalse", prompt: "Diego no quiere volver a entrenar con Hugo.", answer: false }
    ],
    writingPrompt: "Escribe una breve carta de disculpa a alguien por algo que podria haber pasado.",
    writingKeywords: ["disculpa", "siento", "porque"]
  },
  {
    id: "read-no01",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 1,
    wordCount: 43,
    title: "Normas de la piscina municipal",
    text: "NORMAS DE LA PISCINA\n\n1. Es obligatorio ducharse antes de entrar al agua.\n2. No se permite correr alrededor de la piscina.\n3. Los menores de 8 años deben ir acompañados de un adulto.\n4. Esta prohibido comer dentro del recinto de baño.",
    questions: [
      { type: "choice", prompt: "Que se debe hacer antes de entrar al agua?", answer: "Ducharse", options: ["Ducharse", "Comer algo", "Correr una vuelta"] },
      { type: "truefalse", prompt: "Un niño de 6 años puede entrar solo, sin un adulto.", answer: false },
      { type: "choice", prompt: "Que esta prohibido segun el cartel?", answer: "Comer en el recinto de baño", options: ["Comer en el recinto de baño", "Llevar gafas de bucear", "Hablar con otros niños"] }
    ]
  },
  {
    id: "read-no02",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 2,
    wordCount: 49,
    title: "Normas de la biblioteca infantil",
    text: "BIBLIOTECA INFANTIL - NORMAS DE USO\n\n1. Habla en voz baja para no molestar a otros lectores.\n2. Puedes llevarte hasta 3 libros a casa durante 15 dias.\n3. Si manchas o rompes un libro, debes avisar al bibliotecario.\n4. Esta prohibido comer o beber dentro de la sala.",
    questions: [
      { type: "choice", prompt: "Cuantos libros se pueden llevar a casa como maximo?", answer: "3", options: ["3", "5", "10"] },
      { type: "choice", prompt: "Durante cuanto tiempo se pueden tener los libros prestados?", answer: "15 dias", options: ["15 dias", "Una semana", "Un mes"] },
      { type: "truefalse", prompt: "Si rompes un libro, no hace falta avisar a nadie.", answer: false }
    ],
    writingPrompt: "Inventa una norma nueva para la biblioteca y explica para que serviria.",
    writingKeywords: ["norma", "biblioteca", "porque"]
  },
  {
    id: "read-no03",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 2,
    wordCount: 42,
    title: "Anuncio: clases de natacion",
    text: "CLASES DE NATACION - VERANO\n\nApúntate a nuestras clases para niños de 6 a 10 años.\nHorario: martes y jueves, de 17:00 a 18:00.\nLugar: piscina municipal, pista 2.\nMaterial necesario: bañador, gorro y toalla.\nPlazas limitadas a 12 niños por grupo.",
    questions: [
      { type: "choice", prompt: "Que dias son las clases de natacion?", answer: "Martes y jueves", options: ["Martes y jueves", "Lunes y miercoles", "Sabado y domingo"] },
      { type: "choice", prompt: "Cuantos niños como maximo hay por grupo?", answer: "12", options: ["12", "20", "6"] },
      { type: "truefalse", prompt: "Las clases son para niños de cualquier edad.", answer: false }
    ],
    writingPrompt: "Escribe un anuncio breve para una actividad que te gustaria ofrecer este verano.",
    writingKeywords: ["horario", "lugar", "apuntate"]
  },
  {
    id: "read-no04",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 3,
    wordCount: 55,
    title: "Normas del torneo de peonzas",
    text: "REGLAMENTO DEL TORNEO DE VERANO\n\n1. Cada participante puede usar solo una peonza por ronda.\n2. Esta prohibido modificar la peonza durante la competicion.\n3. Si la peonza sale del circulo, el lanzamiento se considera nulo.\n4. En caso de empate, se repite el lanzamiento una sola vez.\n5. Las decisiones del arbitro son definitivas.",
    questions: [
      { type: "choice", prompt: "Que pasa si la peonza sale del circulo?", answer: "El lanzamiento se considera nulo", options: ["El lanzamiento se considera nulo", "Se suma un punto extra", "Se repite el torneo entero"] },
      { type: "choice", prompt: "Que ocurre en caso de empate?", answer: "Se repite el lanzamiento una vez", options: ["Se repite el lanzamiento una vez", "Ganan los dos participantes", "Se elimina a ambos"] },
      { type: "truefalse", prompt: "Se puede modificar la peonza durante la competicion.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"definitivas\" significa que las decisiones del arbitro...", answer: "no se pueden cambiar despues", options: ["no se pueden cambiar despues", "se pueden discutir libremente", "las decide el publico"] }
    ],
    writingPrompt: "Si pudieras añadir una norma al reglamento del torneo, cual seria y por que?",
    writingKeywords: ["norma", "reglamento", "porque"]
  },
  {
    id: "read-no05",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 4,
    wordCount: 76,
    title: "Aviso del campamento: cambio de horario",
    text: "AVISO IMPORTANTE PARA LAS FAMILIAS\n\nDebido a la previsión de tormentas para esta tarde, las actividades al aire libre programadas entre las 16:00 y las 18:00 quedan canceladas. En su lugar, se realizaran talleres de manualidades dentro del pabellon principal.\n\nLa recogida de los niños se mantiene a la hora habitual, las 18:30, pero se ruega a las familias entrar por la puerta lateral debido a las obras en la entrada principal.\n\nGracias por su comprension.",
    questions: [
      { type: "choice", prompt: "Por que se cancelan las actividades al aire libre?", answer: "Por la previsión de tormentas", options: ["Por la previsión de tormentas", "Porque el pabellon esta cerrado", "Porque no hay suficientes monitores"] },
      { type: "choice", prompt: "Que se hara en su lugar?", answer: "Talleres de manualidades", options: ["Talleres de manualidades", "Una pelicula en el salon", "Un partido de futbol"] },
      { type: "truefalse", prompt: "La hora de recogida de los niños tambien cambia.", answer: false },
      { type: "choice", prompt: "Por que puerta deben entrar las familias?", answer: "Por la puerta lateral", options: ["Por la puerta lateral", "Por la puerta principal", "Por el aparcamiento"] }
    ],
    writingPrompt: "Explica con tus palabras que cambios anuncia este aviso y por que ocurren.",
    writingKeywords: ["cambio", "porque", "aviso"]
  },
  {
    id: "read-d01",
    subject: "language",
    skill: "lang_literal",
    textType: "dialogue",
    difficulty: 2,
    wordCount: 58,
    title: "En la tienda de peonzas",
    text: "-Buenos dias -dijo Hugo-. Busco una peonza para el torneo del sabado.\n\n-Tenemos varios modelos -respondio la vendedora-. Esta roja gira mas tiempo, pero esta azul pesa menos y es mas facil de lanzar.\n\n-Soy nuevo en esto -admitio Hugo-. Cual recomienda para empezar?\n\n-Para empezar, mejor la azul -dijo ella-. Cuando tengas mas practica, prueba la roja.",
    questions: [
      { type: "choice", prompt: "Que busca Hugo en la tienda?", answer: "Una peonza para el torneo", options: ["Una peonza para el torneo", "Un regalo para su madre", "Una bicicleta nueva"] },
      { type: "choice", prompt: "Que peonza recomienda la vendedora para empezar?", answer: "La azul", options: ["La azul", "La roja", "Ninguna de las dos"] },
      { type: "truefalse", prompt: "Hugo ya tiene mucha experiencia con las peonzas.", answer: false }
    ],
    writingPrompt: "Escribe dos frases mas de dialogo entre Hugo y la vendedora, continuando la conversacion.",
    writingKeywords: ["dijo", "respondio", "Hugo"]
  },
  {
    id: "read-d02",
    subject: "language",
    skill: "lang_inference",
    textType: "dialogue",
    difficulty: 3,
    wordCount: 66,
    title: "Una discusion en el recreo",
    text: "-No es justo -protesto Maria-. Siempre eliges tu los equipos y siempre te tocan los mismos amigos.\n\n-Es que asi jugamos mejor -se defendio Carlos-. Llevamos meses entrenando juntos.\n\n-Pero asi nunca aprendemos a jugar con gente nueva -insistio Maria-. Que te parece si esta vez sacamos los nombres de una bolsa?\n\nCarlos se quedo callado un momento.\n\n-Vale -dijo finalmente-. Probemos tu idea esta vez.",
    questions: [
      { type: "choice", prompt: "De que se queja Maria?", answer: "De que siempre se eligen los mismos equipos", options: ["De que siempre se eligen los mismos equipos", "De que el partido dura poco", "De que no hay suficiente balones"] },
      { type: "choice", prompt: "Que propone Maria como solucion?", answer: "Sacar los nombres de una bolsa", options: ["Sacar los nombres de una bolsa", "Jugar sin equipos", "Cancelar el partido"] },
      { type: "truefalse", prompt: "Carlos rechaza la idea de Maria sin pensarlo.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"insistio\" significa que Maria...", answer: "repitio su idea con firmeza", options: ["repitio su idea con firmeza", "se rindio enseguida", "se rio de la situacion"] }
    ],
    writingPrompt: "Que opinas de la solucion que propuso Maria? Te parece justa?",
    writingKeywords: ["opino", "justa", "porque"]
  },
  {
    id: "read-d03",
    subject: "language",
    skill: "lang_main_idea",
    textType: "dialogue",
    difficulty: 4,
    wordCount: 112,
    title: "La entrevista del periodico escolar",
    text: "-Gracias por aceptar esta entrevista -empezo Lucia, libreta en mano-. Mi primera pregunta es: que se siente al ganar tres torneos seguidos?\n\n-La verdad -respondio el campeon, sonriendo- es que cada torneo se siente distinto. El primero fue puro nerviosismo, el segundo ya disfrute mas y en el tercero solo pensaba en divertirme.\n\n-Y que consejo le darias a alguien que esta empezando? -continuo Lucia.\n\n-Que no se compare con los demas -dijo el sin dudarlo-. Cada uno avanza a su ritmo, y lo importante es disfrutar del proceso, no solo del resultado final.\n\n-Una ultima pregunta: seguiras compitiendo el año que viene?\n\n-Sin ninguna duda -afirmo, mirando su peonza con cariño.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal de la entrevista?", answer: "El campeon valora mas disfrutar del proceso que ganar", options: ["El campeon valora mas disfrutar del proceso que ganar", "El campeon quiere dejar de competir", "Lucia esta entrenando para el proximo torneo"] },
      { type: "choice", prompt: "Que consejo da el campeon a los principiantes?", answer: "Que no se comparen con los demas", options: ["Que no se comparen con los demas", "Que entrenen ocho horas al dia", "Que compren la peonza mas cara"] },
      { type: "truefalse", prompt: "El campeon dice que dejara de competir el año que viene.", answer: false }
    ],
    writingPrompt: "Si pudieras entrevistar a alguien que admiras, que tres preguntas le harias?",
    writingKeywords: ["preguntaria", "entrevista", "admiro"]
  },
  {
    id: "read-c01",
    subject: "language",
    skill: "lang_order_text",
    textType: "comic",
    difficulty: 2,
    wordCount: 63,
    title: "Comic: El despertador rebelde",
    text: "VIÑETA 1: Leo duerme profundamente. El despertador suena: \"RIIIIIN!\". Leo murmura: \"Cinco minutos mas...\".\n\nVIÑETA 2: El despertador suena otra vez, mas fuerte. Leo dice: \"Vale, vale, ya me levanto!\".\n\nVIÑETA 3: Leo mira el reloj con los ojos como platos y grita: \"Llego tarde al entrenamiento!\".\n\nVIÑETA 4: Leo sale corriendo de casa con un zapato puesto y otro en la mano.",
    questions: [
      { type: "choice", prompt: "Que hace Leo en la primera viñeta?", answer: "Sigue durmiendo y pide cinco minutos mas", options: ["Sigue durmiendo y pide cinco minutos mas", "Se levanta de un salto", "Llama a un amigo"] },
      { type: "choice", prompt: "Por que grita Leo en la viñeta 3?", answer: "Porque se da cuenta de que llega tarde", options: ["Porque se da cuenta de que llega tarde", "Porque ve una araña", "Porque ha perdido su peonza"] },
      { type: "truefalse", prompt: "Leo sale de casa completamente vestido y preparado.", answer: false }
    ],
    writingPrompt: "Inventa una viñeta 5 que continue la historia de Leo corriendo hacia el entrenamiento.",
    writingKeywords: ["viñeta", "Leo", "corriendo"]
  },
  {
    id: "read-c02",
    subject: "language",
    skill: "lang_inference",
    textType: "comic",
    difficulty: 3,
    wordCount: 82,
    title: "Comic: El plan secreto",
    text: "VIÑETA 1: Ana y Carla cuchichean detras de un arbol. Ana susurra: \"Tenemos que preparar la sorpresa antes de que llegue\".\n\nVIÑETA 2: Las dos amigas corren cargando globos y una caja con un lazo enorme.\n\nVIÑETA 3: Esconden la caja detras del sofa justo cuando se oye la puerta abrirse.\n\nVIÑETA 4: Dani entra y ve un cartel que dice \"FELIZ CUMPLEAÑOS\". Su cara muestra sorpresa total.\n\nVIÑETA 5: Los tres se abrazan riendo, con globos cayendo por toda la habitacion.",
    questions: [
      { type: "choice", prompt: "Que estaban preparando Ana y Carla?", answer: "Una sorpresa de cumpleaños para Dani", options: ["Una sorpresa de cumpleaños para Dani", "Una broma para asustarlo", "Una mudanza de muebles"] },
      { type: "choice", prompt: "Donde escondieron la caja?", answer: "Detras del sofa", options: ["Detras del sofa", "En el armario", "Debajo de la cama"] },
      { type: "truefalse", prompt: "Dani sabia desde el principio que le preparaban una sorpresa.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"cuchichean\" significa que Ana y Carla hablan...", answer: "en voz muy baja, en secreto", options: ["en voz muy baja, en secreto", "gritando muy fuerte", "cantando una cancion"] }
    ],
    writingPrompt: "Describe que viñeta añadirias justo despues de la numero 5 para terminar la historia.",
    writingKeywords: ["viñeta", "final", "historia"]
  },
  {
    id: "read-c03",
    subject: "language",
    skill: "lang_main_idea",
    textType: "comic",
    difficulty: 4,
    wordCount: 101,
    title: "Comic: El invento que no funcionaba",
    text: "VIÑETA 1: Pablo presenta orgulloso su invento: una maquina hecha con piezas de juguete. \"Servira para ordenar mi habitacion sola!\", anuncia.\n\nVIÑETA 2: Pulsa el boton y la maquina empieza a moverse, lanzando calcetines por todas partes en lugar de guardarlos.\n\nVIÑETA 3: Su hermana entra justo cuando un calcetin le cae en la cabeza. Pablo se rie nervioso: \"Esta, eh, casi funciona perfecto...\".\n\nVIÑETA 4: Los dos terminan recogiendo la habitacion juntos, entre risas, mientras la maquina sigue lanzando calcetines de fondo.\n\nVIÑETA 5: Pablo apunta en su libreta: \"Version 2: hacer que guarde los calcetines, no que los lance\".",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del comic?", answer: "El invento de Pablo fallo, pero el sigue intentando mejorarlo", options: ["El invento de Pablo fallo, pero el sigue intentando mejorarlo", "Pablo se enfado y rompio su invento", "La hermana de Pablo arreglo la maquina"] },
      { type: "choice", prompt: "Que hace la maquina en vez de ordenar?", answer: "Lanza calcetines por todas partes", options: ["Lanza calcetines por todas partes", "Se apaga sola", "Ordena los libros"] },
      { type: "truefalse", prompt: "Pablo decide no volver a intentar mejorar su invento.", answer: false }
    ],
    writingPrompt: "Inventa tu propia maquina imaginaria y explica para que serviria y que problema podria tener.",
    writingKeywords: ["invento", "maquina", "serviria"]
  },
  {
    id: "read-n17",
    subject: "language",
    skill: "lang_literal",
    textType: "narrative",
    difficulty: 1,
    wordCount: 58,
    title: "El helado derretido",
    text: "Carlitos compro un helado de chocolate en el quiosco de la playa. Estaba tan entretenido construyendo un castillo de arena que se olvido de comerselo a tiempo.\n\nCuando se acordo, el helado ya se habia derretido por completo en el cucurucho. Carlitos se rio de su despiste y fue corriendo a comprar otro, esta vez prometiendo comerselo rapido.",
    questions: [
      { type: "choice", prompt: "De que sabor era el helado de Carlitos?", answer: "Chocolate", options: ["Chocolate", "Fresa", "Vainilla"] },
      { type: "choice", prompt: "Por que se derritio el helado?", answer: "Porque Carlitos se olvido de comerlo a tiempo", options: ["Porque Carlitos se olvido de comerlo a tiempo", "Porque hacia mucho frio", "Porque se le cayo al suelo"] },
      { type: "truefalse", prompt: "Carlitos se enfado mucho por el helado derretido.", answer: false }
    ],
    writingPrompt: "Cuenta algo que se te haya olvidado hacer a tiempo alguna vez.",
    writingKeywords: ["olvide", "tiempo"]
  },
  {
    id: "read-n18",
    subject: "language",
    skill: "lang_inference",
    textType: "narrative",
    difficulty: 2,
    wordCount: 86,
    title: "El regalo escondido",
    text: "Sara busco por toda la casa su regalo de cumpleaños, convencida de que sus padres lo habrian escondido en algun lugar facil de encontrar. Miro en el armario, bajo la cama y hasta en el garaje, pero no encontro nada.\n\nEl dia de su cumpleaños, su padre le entrego una caja pequeña: dentro habia una nota que decia \"Mira en el lugar donde guardamos los recuerdos\". Sara corrio hacia el album de fotos familiar y alli, entre las paginas, encontro las llaves de su bicicleta nueva.",
    questions: [
      { type: "choice", prompt: "Donde busco Sara primero su regalo?", answer: "En el armario, bajo la cama y en el garaje", options: ["En el armario, bajo la cama y en el garaje", "En la cocina", "En el jardin"] },
      { type: "choice", prompt: "Donde encontro finalmente la pista del regalo?", answer: "En el album de fotos familiar", options: ["En el album de fotos familiar", "En su mochila del colegio", "Debajo de su almohada"] },
      { type: "truefalse", prompt: "El regalo de Sara era directamente una bicicleta envuelta.", answer: false }
    ],
    writingPrompt: "Inventa una pista divertida que esconderias para que alguien encuentre un regalo.",
    writingKeywords: ["pista", "regalo", "esconderia"]
  },
  {
    id: "read-n19",
    subject: "language",
    skill: "lang_main_idea",
    textType: "narrative",
    difficulty: 2,
    wordCount: 66,
    title: "El club de los lunes",
    text: "Cada lunes por la tarde, un grupo de niños del barrio se reunia en el parque para intercambiar cromos, comics y peonzas usadas. No habia normas estrictas, solo una: nadie podia irse del club sin haber hecho al menos un intercambio justo.\n\nCon el tiempo, aquel pequeño grupo se convirtio en el momento favorito de la semana para muchos, mas alla de lo que consiguieran intercambiar.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "El club se convirtio en el momento favorito de la semana para los niños", options: ["El club se convirtio en el momento favorito de la semana para los niños", "Los niños se peleaban cada lunes", "El club se disolvio rapidamente"] },
      { type: "choice", prompt: "Cual era la unica norma del club?", answer: "Hacer al menos un intercambio justo", options: ["Hacer al menos un intercambio justo", "Llevar siempre la misma peonza", "No hablar con nadie nuevo"] },
      { type: "truefalse", prompt: "El club se reunia todos los dias de la semana.", answer: false }
    ],
    writingPrompt: "Que normas pondrias tu si creases un club con tus amigos?",
    writingKeywords: ["club", "normas", "amigos"]
  },
  {
    id: "read-n20",
    subject: "language",
    skill: "lang_inference",
    textType: "narrative",
    difficulty: 3,
    wordCount: 90,
    title: "La carrera que no gano",
    text: "Aunque entreno todos los dias durante un mes, Carla termino la carrera del colegio en quinto lugar, muy lejos del podio que tanto habia soñado. Al principio sintio una decepcion enorme y queria irse a casa sin hablar con nadie.\n\nSin embargo, su profesor de educacion fisica le señalo algo que ella no habia notado: su tiempo era casi un minuto mejor que el de la carrera anterior. Carla se dio cuenta entonces de que, aunque no hubiera ganado a sus compañeros, si habia ganado claramente contra su propio record.",
    questions: [
      { type: "choice", prompt: "En que posicion termino Carla la carrera?", answer: "Quinta", options: ["Quinta", "Primera", "Ultima"] },
      { type: "choice", prompt: "Que le hizo notar el profesor a Carla?", answer: "Que habia mejorado mucho su propio tiempo", options: ["Que habia mejorado mucho su propio tiempo", "Que el resto de corredores habian hecho trampa", "Que la carrera se repetiria"] },
      { type: "truefalse", prompt: "Carla se sintio feliz desde el primer momento al terminar la carrera.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"decepcion\" describe un sentimiento de...", answer: "tristeza por no lograr lo esperado", options: ["tristeza por no lograr lo esperado", "alegria muy grande", "sorpresa agradable"] }
    ],
    writingPrompt: "Cuenta una vez que mejoraste en algo aunque no quedaras el primero.",
    writingKeywords: ["mejore", "aunque", "primero"]
  },
  {
    id: "read-n21",
    subject: "language",
    skill: "lang_main_idea",
    textType: "narrative",
    difficulty: 3,
    wordCount: 89,
    title: "El huerto compartido",
    text: "Cuando el colegio propuso crear un huerto comunitario para el verano, casi nadie se ofrecio porque sonaba a mucho trabajo bajo el sol. Solo cuatro niños, entre ellos Iris, decidieron apuntarse sin saber muy bien por donde empezar.\n\nDurante las primeras semanas, regaron tomates que no crecian y plantaron semillas en el lugar equivocado. Poco a poco, gracias a los consejos de un vecino jardinero, el huerto empezo a dar fruto. Para septiembre, todo el colegio disfrutaba de las verduras que aquel pequeño grupo habia conseguido cultivar con paciencia.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "Un grupo pequeño consiguio un huerto exitoso con esfuerzo y paciencia", options: ["Un grupo pequeño consiguio un huerto exitoso con esfuerzo y paciencia", "El huerto fracaso por completo", "Todo el colegio trabajo en el huerto desde el principio"] },
      { type: "choice", prompt: "Quien ayudo a mejorar el huerto?", answer: "Un vecino jardinero", options: ["Un vecino jardinero", "El director del colegio", "Un programa de television"] },
      { type: "truefalse", prompt: "Las primeras semanas del huerto fueron un exito total.", answer: false }
    ],
    writingPrompt: "Que cultivarias tu si tuvieras un pequeño huerto? Explica por que.",
    writingKeywords: ["cultivaria", "huerto", "porque"]
  },
  {
    id: "read-n22",
    subject: "language",
    skill: "lang_order_text",
    textType: "narrative",
    difficulty: 2,
    wordCount: 59,
    title: "El cumpleaños sorpresa",
    text: "Para organizar la fiesta sorpresa de Nico, sus amigos siguieron un plan muy concreto. Primero, decoraron el salon mientras el estaba en el entrenamiento. Despues, escondieron los regalos detras de las cortinas.\n\nCuando Nico llego a casa, todos se escondieron en silencio. Por ultimo, al encender las luces, gritaron juntos \"sorpresa!\" mientras Nico se quedaba boquiabierto en la puerta.",
    questions: [
      { type: "choice", prompt: "Que hicieron primero los amigos de Nico?", answer: "Decorar el salon", options: ["Decorar el salon", "Esconder los regalos", "Gritar sorpresa"] },
      { type: "choice", prompt: "Donde escondieron los regalos?", answer: "Detras de las cortinas", options: ["Detras de las cortinas", "Debajo de la mesa", "En el armario"] },
      { type: "truefalse", prompt: "Nico sabia de la fiesta sorpresa desde el principio.", answer: false }
    ],
    writingPrompt: "Describe los pasos que seguirias tu para organizar una fiesta sorpresa.",
    writingKeywords: ["primero", "despues", "sorpresa"]
  },
  {
    id: "read-i09",
    subject: "language",
    skill: "lang_literal",
    textType: "informative",
    difficulty: 1,
    wordCount: 50,
    title: "El pulpo y sus ocho brazos",
    text: "El pulpo es un animal marino que tiene ocho brazos cubiertos de pequeñas ventosas. Estas ventosas le permiten agarrarse a las rocas y tambien sentir el sabor de lo que toca.\n\nAdemas, el pulpo no tiene huesos, lo que le permite esconderse en huecos diminutos para escapar de sus depredadores.",
    questions: [
      { type: "choice", prompt: "Cuantos brazos tiene un pulpo?", answer: "Ocho", options: ["Ocho", "Seis", "Diez"] },
      { type: "choice", prompt: "Para que le sirven las ventosas al pulpo?", answer: "Para agarrarse y sentir sabores", options: ["Para agarrarse y sentir sabores", "Para nadar mas rapido", "Para respirar bajo el agua"] },
      { type: "truefalse", prompt: "El pulpo tiene huesos como la mayoria de los animales.", answer: false }
    ],
    writingPrompt: "Que otra caracteristica curiosa de un animal marino conoces?",
    writingKeywords: ["animal", "marino", "curioso"]
  },
  {
    id: "read-i10",
    subject: "language",
    skill: "lang_main_idea",
    textType: "informative",
    difficulty: 2,
    wordCount: 78,
    title: "Como hacen miel las abejas",
    text: "Las abejas obreras visitan cientos de flores cada dia para recolectar nectar, un liquido dulce que guardan en una bolsa especial dentro de su cuerpo. De vuelta en la colmena, lo pasan de una abeja a otra hasta que se transforma poco a poco en miel.\n\nDespues, depositan la miel en celdas de cera y la abanican con sus alas para que se seque un poco. Una sola colmena puede producir varios kilos de miel en un verano.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "Como las abejas transforman el nectar en miel paso a paso", options: ["Como las abejas transforman el nectar en miel paso a paso", "Las abejas no producen miel en verano", "Las abejas viven siempre solas"] },
      { type: "choice", prompt: "Donde guardan la miel las abejas?", answer: "En celdas de cera", options: ["En celdas de cera", "En hojas de arbol", "En el suelo"] },
      { type: "truefalse", prompt: "Las abejas hacen miel con agua de lluvia.", answer: false }
    ],
    writingPrompt: "Que pasos seguirias tu para explicarle a alguien como se hace la miel?",
    writingKeywords: ["pasos", "miel", "abejas"]
  },
  {
    id: "read-i11",
    subject: "language",
    skill: "lang_vocabulary",
    textType: "informative",
    difficulty: 3,
    wordCount: 67,
    title: "Los osos polares y el hielo",
    text: "Los osos polares dependen del hielo marino del Artico para cazar focas, su alimento principal. Caminan largas distancias sobre el hielo, esperando pacientemente junto a los agujeros donde las focas salen a respirar.\n\nEn los ultimos años, el calentamiento global ha reducido la cantidad de hielo disponible cada verano, lo que obliga a estos animales a nadar distancias cada vez mas largas para encontrar zonas donde cazar.",
    questions: [
      { type: "choice", prompt: "De que se alimentan principalmente los osos polares?", answer: "De focas", options: ["De focas", "De peces pequeños", "De plantas marinas"] },
      { type: "vocabulary", prompt: "En el texto, \"pacientemente\" significa que los osos esperan...", answer: "con calma, sin prisa", options: ["con calma, sin prisa", "con mucha rapidez", "gritando fuerte"] },
      { type: "truefalse", prompt: "El hielo marino esta aumentando cada año en el Artico.", answer: false }
    ],
    writingPrompt: "Por que crees que es importante proteger el hielo del Artico?",
    writingKeywords: ["proteger", "hielo", "porque"]
  },
  {
    id: "read-i12",
    subject: "language",
    skill: "lang_main_idea",
    textType: "informative",
    difficulty: 3,
    wordCount: 74,
    title: "Las bibliotecas publicas",
    text: "Las primeras bibliotecas publicas, abiertas a cualquier persona sin importar su dinero, comenzaron a extenderse hace poco mas de cien años. Antes de eso, los libros eran muy caros y solo unas pocas personas podian permitirse tener una coleccion propia.\n\nHoy en dia, las bibliotecas no solo prestan libros, sino que tambien organizan talleres, clubes de lectura y actividades para niños durante el verano, convirtiendose en un lugar de encuentro para toda la comunidad.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "Las bibliotecas han evolucionado para ser espacios abiertos a todos", options: ["Las bibliotecas han evolucionado para ser espacios abiertos a todos", "Los libros siempre fueron baratos", "Las bibliotecas solo prestan libros"] },
      { type: "choice", prompt: "Que otras actividades organizan las bibliotecas hoy?", answer: "Talleres y clubes de lectura", options: ["Talleres y clubes de lectura", "Partidos de futbol", "Conciertos de musica"] },
      { type: "truefalse", prompt: "Antiguamente todas las personas podian comprar libros facilmente.", answer: false }
    ],
    writingPrompt: "Que actividad te gustaria que organizara tu biblioteca favorita?",
    writingKeywords: ["biblioteca", "actividad", "gustaria"]
  },
  {
    id: "read-i13",
    subject: "language",
    skill: "lang_vocabulary",
    textType: "informative",
    difficulty: 4,
    wordCount: 101,
    title: "Los terremotos y las placas tectonicas",
    text: "La superficie de la Tierra esta dividida en enormes piezas de roca llamadas placas tectonicas, que se mueven muy lentamente, apenas unos centimetros por año. Aunque ese movimiento parece insignificante, con el tiempo acumula una enorme cantidad de energia en los bordes donde dos placas se rozan entre si.\n\nCuando esa energia se libera de golpe, se produce un terremoto: el suelo tiembla durante unos segundos mientras la energia acumulada se propaga en todas direcciones. Los cientificos llamados sismologos utilizan instrumentos llamados sismografos para medir la intensidad de estos movimientos y estudiar donde es mas probable que ocurran en el futuro.",
    questions: [
      { type: "choice", prompt: "Que son las placas tectonicas?", answer: "Enormes piezas de roca que forman la superficie terrestre", options: ["Enormes piezas de roca que forman la superficie terrestre", "Instrumentos para medir terremotos", "Capas de la atmosfera"] },
      { type: "vocabulary", prompt: "En el texto, \"insignificante\" significa algo...", answer: "muy pequeño o de poca importancia", options: ["muy pequeño o de poca importancia", "extremadamente grande", "peligroso y dañino"] },
      { type: "truefalse", prompt: "Las placas tectonicas se mueven muy rapido, varios metros por segundo.", answer: false },
      { type: "choice", prompt: "Para que usan los sismologos los sismografos?", answer: "Para medir la intensidad de los terremotos", options: ["Para medir la intensidad de los terremotos", "Para predecir el tiempo atmosferico", "Para estudiar a los animales marinos"] }
    ],
    writingPrompt: "Que medidas de seguridad crees que deberiamos seguir si ocurre un terremoto?",
    writingKeywords: ["seguridad", "terremoto", "medidas"]
  },
  {
    id: "read-l05",
    subject: "language",
    skill: "lang_text_structure",
    textType: "letter",
    difficulty: 2,
    wordCount: 58,
    title: "Carta de invitacion",
    text: "Hola Marcos:\n\nEste sabado celebro mi cumpleaños en el parque grande, a partir de las cinco de la tarde. Habra tarta, juegos de agua y un torneo improvisado de peonzas, asi que no olvides traer la tuya.\n\nMe haria mucha ilusion que vinieras. Avisame si puedes venir para reservarte un trozo de tarta de chocolate.\n\nUn saludo,\nElena",
    questions: [
      { type: "choice", prompt: "Que celebra Elena?", answer: "Su cumpleaños", options: ["Su cumpleaños", "El fin de curso", "Una mudanza"] },
      { type: "choice", prompt: "Que debe traer Marcos segun la carta?", answer: "Su peonza", options: ["Su peonza", "Un regalo caro", "Comida para todos"] },
      { type: "truefalse", prompt: "La fiesta es por la mañana.", answer: false }
    ],
    writingPrompt: "Escribe una breve invitacion para una fiesta o quedada que te gustaria organizar.",
    writingKeywords: ["invito", "fiesta", "hora"]
  },
  {
    id: "read-l06",
    subject: "language",
    skill: "lang_text_structure",
    textType: "letter",
    difficulty: 4,
    wordCount: 96,
    title: "Carta al periodico local",
    text: "Estimados señores del periodico:\n\nLes escribo porque me gustaria compartir una idea con los demas vecinos del barrio. Desde hace meses, el parque cercano a mi casa esta lleno de papeles y botellas que la gente deja despues de comer alli.\n\nMe parece que seria una buena idea organizar una jornada de limpieza entre los vecinos, especialmente los niños, para aprender a cuidar nuestro espacio comun. Estoy seguro de que muchas familias estarian dispuestas a participar si se anunciara con tiempo.\n\nGracias por darme la oportunidad de compartir esta propuesta.\n\nAtentamente,\nuna vecina de nueve años",
    questions: [
      { type: "choice", prompt: "Cual es el problema que describe la carta?", answer: "El parque esta lleno de basura", options: ["El parque esta lleno de basura", "No hay suficientes parques", "El parque esta cerrado"] },
      { type: "choice", prompt: "Que propone la autora de la carta?", answer: "Organizar una jornada de limpieza con vecinos", options: ["Organizar una jornada de limpieza con vecinos", "Cerrar el parque para siempre", "Construir un parque nuevo"] },
      { type: "truefalse", prompt: "La carta esta escrita por el alcalde del pueblo.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"comun\" se refiere a un espacio que...", answer: "es compartido por todos", options: ["es compartido por todos", "pertenece a una sola familia", "esta prohibido visitar"] }
    ],
    writingPrompt: "Que problema de tu barrio o colegio te gustaria solucionar? Como lo harias?",
    writingKeywords: ["problema", "solucion", "barrio"]
  },
  {
    id: "read-d04",
    subject: "language",
    skill: "lang_literal",
    textType: "dialogue",
    difficulty: 2,
    wordCount: 54,
    title: "En la frutería",
    text: "-Buenos dias -dijo la madre de Dani-. Necesito un kilo de manzanas y medio kilo de fresas, por favor.\n\n-Aqui tiene -respondio el frutero-. Las fresas estan muy dulces esta semana.\n\n-Genial, ponme otro medio kilo entonces -dijo ella sonriendo-. Mi hijo las adora.\n\nDani, que esperaba en la puerta, sonrio al escuchar eso.",
    questions: [
      { type: "choice", prompt: "Que compra la madre de Dani al principio?", answer: "Manzanas y fresas", options: ["Manzanas y fresas", "Naranjas y platanos", "Solo manzanas"] },
      { type: "choice", prompt: "Por que decide comprar mas fresas?", answer: "Porque estan muy dulces y a su hijo le encantan", options: ["Porque estan muy dulces y a su hijo le encantan", "Porque estan de oferta", "Porque se le habian olvidado"] },
      { type: "truefalse", prompt: "A Dani no le gustan las fresas.", answer: false }
    ],
    writingPrompt: "Escribe un breve dialogo entre un cliente y un vendedor en una tienda que te guste.",
    writingKeywords: ["dijo", "respondio", "tienda"]
  },
  {
    id: "read-d05",
    subject: "language",
    skill: "lang_inference",
    textType: "dialogue",
    difficulty: 5,
    wordCount: 118,
    title: "La decision dificil",
    text: "-No se que hacer -confeso Marta, sentada junto a su hermano mayor-. Me han invitado al cumpleaños de Laura el mismo dia que tengo la final del torneo.\n\n-Y que es lo que realmente quieres hacer tu? -preguntó el, sin darle ninguna pista de su opinion.\n\n-Quiero jugar la final, pero me preocupa que Laura se enfade conmigo si no voy -respondio Marta, mirando al suelo.\n\n-A veces, las decisiones dificiles no tienen una opcion perfecta -dijo su hermano-. Lo importante es elegir lo que de verdad te importa y, despues, explicarselo con sinceridad a la otra persona.\n\nMarta se quedo pensativa un momento y, finalmente, asintio con la cabeza, como si por fin hubiera encontrado su respuesta.",
    questions: [
      { type: "choice", prompt: "Cual es el dilema de Marta?", answer: "Elegir entre la final del torneo y el cumpleaños de Laura", options: ["Elegir entre la final del torneo y el cumpleaños de Laura", "No saber que regalo comprar", "No tener transporte para ir a ningun sitio"] },
      { type: "choice", prompt: "Que consejo le da el hermano de Marta?", answer: "Elegir lo que de verdad le importa y explicarlo con sinceridad", options: ["Elegir lo que de verdad le importa y explicarlo con sinceridad", "Ir a las dos cosas a la vez", "No ir a ninguna de las dos"] },
      { type: "truefalse", prompt: "El hermano le dice directamente a Marta lo que debe elegir.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"pensativa\" describe a alguien que esta...", answer: "reflexionando en silencio", options: ["reflexionando en silencio", "riendo a carcajadas", "corriendo muy rapido"] }
    ],
    writingPrompt: "Que harias tu en el lugar de Marta? Explica tu decision.",
    writingKeywords: ["decision", "porque", "elegiria"]
  },
  {
    id: "read-no06",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 1,
    wordCount: 37,
    title: "Cartel del comedor del campamento",
    text: "COMEDOR DEL CAMPAMENTO\n\n- El desayuno es de 8:00 a 8:45.\n- La comida es de 13:00 a 14:00.\n- La cena es de 20:00 a 20:45.\n- Por favor, lavate las manos antes de cada comida.",
    questions: [
      { type: "choice", prompt: "A que hora es la comida?", answer: "De 13:00 a 14:00", options: ["De 13:00 a 14:00", "De 8:00 a 8:45", "De 20:00 a 20:45"] },
      { type: "truefalse", prompt: "El cartel pide lavarse las manos antes de comer.", answer: true },
      { type: "choice", prompt: "Cuanto dura el desayuno?", answer: "45 minutos", options: ["45 minutos", "Una hora", "15 minutos"] }
    ]
  },
  {
    id: "read-no07",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 3,
    wordCount: 59,
    title: "Anuncio: se busca mascota perdida",
    text: "SE BUSCA: PERRO PERDIDO\n\nResponde al nombre de Toby. Es pequeño, de color marron con una mancha blanca en el pecho. Se perdio el martes por la tarde cerca del parque central.\n\nLleva un collar azul sin chapa. Si lo ves, por favor llama al telefono de la familia que aparece en el cartel. Hay una recompensa por encontrarlo.",
    questions: [
      { type: "choice", prompt: "Como se llama el perro perdido?", answer: "Toby", options: ["Toby", "Max", "Rocky"] },
      { type: "choice", prompt: "Donde se perdio el perro?", answer: "Cerca del parque central", options: ["Cerca del parque central", "En la playa", "En el colegio"] },
      { type: "truefalse", prompt: "El collar de Toby tiene una chapa con su nombre.", answer: false }
    ],
    writingPrompt: "Si encontraras a Toby, que harias para devolverlo a su familia?",
    writingKeywords: ["encontrar", "familia", "haria"]
  },
  {
    id: "read-no08",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 4,
    wordCount: 66,
    title: "Normas de seguridad para la excursion",
    text: "EXCURSION AL BOSQUE - NORMAS DE SEGURIDAD\n\n1. Permanece siempre dentro del grupo y a la vista de un monitor.\n2. No te alejes del camino señalizado bajo ninguna circunstancia.\n3. Lleva siempre tu botella de agua y un silbato de emergencia.\n4. Si te separas del grupo, quedate en el mismo sitio y haz sonar el silbato.\n5. Esta prohibido tocar plantas o animales desconocidos.",
    questions: [
      { type: "choice", prompt: "Que debes hacer si te separas del grupo?", answer: "Quedarte en el mismo sitio y usar el silbato", options: ["Quedarte en el mismo sitio y usar el silbato", "Correr a buscar al grupo por tu cuenta", "Esconderte hasta que anochezca"] },
      { type: "choice", prompt: "Que esta prohibido segun las normas?", answer: "Tocar plantas o animales desconocidos", options: ["Tocar plantas o animales desconocidos", "Llevar botella de agua", "Hablar con los monitores"] },
      { type: "truefalse", prompt: "Se permite alejarse del camino señalizado si hay un adulto cerca.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"señalizado\" significa que el camino esta...", answer: "marcado con señales claras", options: ["marcado con señales claras", "cerrado al publico", "cubierto de nieve"] }
    ],
    writingPrompt: "Por que crees que es importante seguir estas normas en una excursion al bosque?",
    writingKeywords: ["seguridad", "importante", "porque"]
  },
  {
    id: "read-c04",
    subject: "language",
    skill: "lang_order_text",
    textType: "comic",
    difficulty: 3,
    wordCount: 86,
    title: "Comic: La carrera de sacos",
    text: "VIÑETA 1: Cinco niños se meten dentro de sacos, listos para la carrera. El monitor grita: \"Preparados, listos, ya!\".\n\nVIÑETA 2: Todos saltan torpemente. Carla se cae al segundo salto, pero se rie y se levanta rapido.\n\nVIÑETA 3: Pablo va en cabeza, saltando con fuerza, mientras los demas intentan alcanzarlo.\n\nVIÑETA 4: Justo antes de la meta, Pablo tropieza con una piedra y cae al suelo.\n\nVIÑETA 5: Carla, que venia detras, cruza la meta entre risas justo cuando Pablo se levanta sacudiendose la arena.",
    questions: [
      { type: "choice", prompt: "Que le pasa a Carla al principio de la carrera?", answer: "Se cae pero se levanta riendo", options: ["Se cae pero se levanta riendo", "Gana la carrera enseguida", "Se queda fuera del saco"] },
      { type: "choice", prompt: "Quien gana finalmente la carrera?", answer: "Carla", options: ["Carla", "Pablo", "Ninguno de los dos termina"] },
      { type: "truefalse", prompt: "Pablo gana la carrera sin ningun problema.", answer: false }
    ],
    writingPrompt: "Inventa otra viñeta divertida que podria pasar en una carrera de sacos.",
    writingKeywords: ["viñeta", "carrera", "divertido"]
  },
  {
    id: "read-c05",
    subject: "language",
    skill: "lang_inference",
    textType: "comic",
    difficulty: 5,
    wordCount: 109,
    title: "Comic: El cientifico distraido",
    text: "VIÑETA 1: El profesor Marcos mezcla liquidos de colores en su laboratorio improvisado en el garaje. \"Esta vez si va a funcionar!\", dice con confianza.\n\nVIÑETA 2: Añade una pizca de polvo blanco a la mezcla. Un pequeño \"POF!\" suena, y una nube de humo morado llena la habitacion.\n\nVIÑETA 3: Cuando el humo se disipa, todo el garaje, incluido el profesor, ha quedado pintado de un color morado brillante.\n\nVIÑETA 4: Su hermana entra, lo mira de arriba a abajo y suelta una carcajada: \"Otra vez no!\".\n\nVIÑETA 5: El profesor Marcos, sin perder el animo, anota en su libreta: \"Experimento 47: descubierta pintura morada accidental. Intentar venderla.\"",
    questions: [
      { type: "choice", prompt: "Que ocurre cuando Marcos añade el polvo blanco?", answer: "Se produce una explosion de humo morado", options: ["Se produce una explosion de humo morado", "El liquido se vuelve transparente", "Nada, el experimento no hace efecto"] },
      { type: "choice", prompt: "Como reacciona la hermana de Marcos?", answer: "Se rie porque ya ha pasado antes", options: ["Se rie porque ya ha pasado antes", "Se enfada muchisimo", "Llama a los bomberos"] },
      { type: "truefalse", prompt: "Marcos se desanima por completo y deja de experimentar.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"se disipa\" significa que el humo...", answer: "desaparece poco a poco", options: ["desaparece poco a poco", "se hace mas espeso", "cambia de color"] }
    ],
    writingPrompt: "Inventa el experimento 48 del profesor Marcos: que probaria y que podria salir mal?",
    writingKeywords: ["experimento", "profesor", "pasaria"]
  },
  {
    id: "read-n23",
    subject: "language",
    skill: "lang_literal",
    textType: "narrative",
    difficulty: 1,
    wordCount: 55,
    title: "El paraguas equivocado",
    text: "Iris cogio el paraguas de su hermano por error y salio corriendo hacia el colegio bajo la lluvia. Era mucho mas grande que el suyo y le costaba sujetarlo con el viento.\n\nCuando llego a clase, su mejor amiga se rio al verla luchando contra el paraguas gigante, pero al menos Iris llego completamente seca.",
    questions: [
      { type: "choice", prompt: "De quien era el paraguas que cogio Iris?", answer: "De su hermano", options: ["De su hermano", "De su madre", "De su amiga"] },
      { type: "choice", prompt: "Que problema tuvo Iris con el paraguas?", answer: "Le costaba sujetarlo por el viento", options: ["Le costaba sujetarlo por el viento", "Se le rompio enseguida", "Se le olvido en casa"] },
      { type: "truefalse", prompt: "Iris llego mojada al colegio.", answer: false }
    ],
    writingPrompt: "Cuenta una vez que usaste algo que no era tuyo por error.",
    writingKeywords: ["error", "cogi", "porque"]
  },
  {
    id: "read-n24",
    subject: "language",
    skill: "lang_inference",
    textType: "narrative",
    difficulty: 2,
    wordCount: 67,
    title: "El examen sorpresa",
    text: "Cuando el profesor anuncio un examen sorpresa de matematicas, la mayoria de la clase se quejo en voz alta. Carlitos, sin embargo, se quedo tranquilo: llevaba toda la semana repasando las tablas de multiplicar por su cuenta, sin que nadie se lo pidiera.\n\nAl final del dia, fue uno de los pocos que aprobo con buena nota, y sus compañeros empezaron a preguntarle su secreto para estudiar.",
    questions: [
      { type: "choice", prompt: "Como reacciono la mayoria de la clase al examen sorpresa?", answer: "Se quejaron", options: ["Se quejaron", "Se alegraron mucho", "No dijeron nada"] },
      { type: "choice", prompt: "Por que estaba tranquilo Carlitos?", answer: "Porque habia repasado por su cuenta toda la semana", options: ["Porque habia repasado por su cuenta toda la semana", "Porque ya sabia que no habria examen", "Porque copio las respuestas"] },
      { type: "truefalse", prompt: "Carlitos suspendio el examen como casi todos.", answer: false }
    ],
    writingPrompt: "Que habito de estudio crees que te ayudaria a ti a prepararte mejor para los examenes?",
    writingKeywords: ["estudio", "habito", "ayudaria"]
  },
  {
    id: "read-n25",
    subject: "language",
    skill: "lang_main_idea",
    textType: "narrative",
    difficulty: 3,
    wordCount: 89,
    title: "El traductor improvisado",
    text: "Cuando una familia recien llegada de otro pais se mudo al barrio, su hija Mei no hablaba todavia mucho español. En el primer dia de campamento, se sentaba sola durante los descansos, sin saber como unirse a los juegos.\n\nDani, que habia aprendido algunas palabras de ingles en el colegio, empezo a usar gestos y dibujos para explicarle las normas de los juegos. Poco a poco, entre risas y malentendidos divertidos, Mei aprendio suficiente español para jugar sin ayuda, y Dani se convirtio en su mejor amigo del verano.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "Dani ayudo a Mei a integrarse usando gestos y paciencia", options: ["Dani ayudo a Mei a integrarse usando gestos y paciencia", "Mei se quedo sola todo el verano", "Dani aprendio chino con Mei"] },
      { type: "choice", prompt: "Como se comunicaba Dani con Mei al principio?", answer: "Con gestos y dibujos", options: ["Con gestos y dibujos", "Hablando muy alto en español", "Escribiendo cartas largas"] },
      { type: "truefalse", prompt: "Mei nunca aprendio a jugar con el resto del grupo.", answer: false }
    ],
    writingPrompt: "Como ayudarias tu a alguien nuevo que no entiende bien tu idioma?",
    writingKeywords: ["ayudaria", "idioma", "gestos"]
  },
  {
    id: "read-n26",
    subject: "language",
    skill: "lang_inference",
    textType: "narrative",
    difficulty: 4,
    wordCount: 115,
    title: "El silencio de Carla",
    text: "Carla llevaba toda la tarde mas callada de lo habitual, contestando con monosilabos cada vez que alguien le preguntaba algo. Sus amigas pensaron primero que estaba enfadada con ellas, asi que intentaron recordar si habian dicho algo que la hubiera molestado.\n\nFue su hermana mayor quien, al verla asi durante la cena, le pregunto directamente que le pasaba. Carla confeso entonces que estaba muy nerviosa por la audicion de baile del dia siguiente, y que no queria contarlo por miedo a que sus amigas se rieran si fallaba. Su hermana le recordo que sus amigas nunca se habian reido de ella por intentar algo nuevo, y Carla se sintio mucho mejor solo por haberlo compartido.",
    questions: [
      { type: "choice", prompt: "Por que estaba callada Carla?", answer: "Estaba nerviosa por una audicion de baile", options: ["Estaba nerviosa por una audicion de baile", "Estaba enfadada con sus amigas", "Se habia peleado con su hermana"] },
      { type: "choice", prompt: "Que pensaron primero sus amigas?", answer: "Que estaba enfadada con ellas", options: ["Que estaba enfadada con ellas", "Que estaba enferma", "Que se habia mudado de casa"] },
      { type: "truefalse", prompt: "Carla le conto su preocupacion a sus amigas antes que a su hermana.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"monosilabos\" se refiere a respuestas...", answer: "muy cortas, de una sola palabra", options: ["muy cortas, de una sola palabra", "muy largas y detalladas", "escritas en otro idioma"] }
    ],
    writingPrompt: "Por que crees que es importante contar a alguien cuando estamos preocupados por algo?",
    writingKeywords: ["contar", "preocupado", "importante"]
  },
  {
    id: "read-i14",
    subject: "language",
    skill: "lang_literal",
    textType: "informative",
    difficulty: 1,
    wordCount: 50,
    title: "Las jirafas y su cuello largo",
    text: "Las jirafas tienen el cuello mas largo de todos los animales terrestres, pudiendo medir hasta dos metros. Sin embargo, tienen el mismo numero de huesos en el cuello que las personas: solo siete.\n\nLa diferencia esta en que cada hueso de la jirafa es mucho mas grande que el nuestro.",
    questions: [
      { type: "choice", prompt: "Cuanto puede medir el cuello de una jirafa?", answer: "Hasta dos metros", options: ["Hasta dos metros", "Medio metro", "Diez metros"] },
      { type: "choice", prompt: "Cuantos huesos tiene el cuello de una jirafa?", answer: "Siete", options: ["Siete", "Veinte", "Tres"] },
      { type: "truefalse", prompt: "Las jirafas tienen muchos mas huesos en el cuello que las personas.", answer: false }
    ],
    writingPrompt: "Que otro animal con una caracteristica fisica sorprendente conoces?",
    writingKeywords: ["animal", "caracteristica"]
  },
  {
    id: "read-i15",
    subject: "language",
    skill: "lang_vocabulary",
    textType: "informative",
    difficulty: 2,
    wordCount: 66,
    title: "Como funcionan los semaforos",
    text: "Los semaforos ayudan a organizar el trafico para que coches y peatones puedan moverse de forma segura. La luz roja indica que hay que detenerse por completo, la amarilla avisa de que el cambio esta proximo, y la verde permite avanzar.\n\nEn algunos paises, los semaforos para peatones muestran un muñeco que camina o que esta quieto, para que sea facil entenderlos incluso sin saber leer.",
    questions: [
      { type: "choice", prompt: "Que indica la luz amarilla del semaforo?", answer: "Que el cambio de luz esta proximo", options: ["Que el cambio de luz esta proximo", "Que hay que detenerse del todo", "Que se puede avanzar rapido"] },
      { type: "vocabulary", prompt: "En el texto, \"peatones\" son las personas que...", answer: "caminan por la calle", options: ["caminan por la calle", "conducen coches", "viajan en avion"] },
      { type: "truefalse", prompt: "La luz verde indica que hay que detenerse.", answer: false }
    ],
    writingPrompt: "Por que crees que es importante respetar los semaforos al cruzar la calle?",
    writingKeywords: ["semaforo", "seguridad", "importante"]
  },
  {
    id: "read-i16",
    subject: "language",
    skill: "lang_main_idea",
    textType: "informative",
    difficulty: 4,
    wordCount: 92,
    title: "El reciclaje y sus contenedores",
    text: "Separar correctamente la basura ayuda a que los materiales puedan reutilizarse en lugar de acabar acumulados durante años en vertederos. Por eso, en muchas ciudades existen contenedores de distintos colores: el amarillo para envases de plastico y latas, el azul para papel y carton, el verde para vidrio, y el marron para restos organicos.\n\nAunque al principio puede parecer complicado recordar cada color, con la practica se convierte en un habito sencillo que, multiplicado por millones de personas, reduce de forma importante la cantidad de basura que termina contaminando el medio ambiente.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del texto?", answer: "Separar la basura correctamente ayuda a reducir la contaminacion", options: ["Separar la basura correctamente ayuda a reducir la contaminacion", "Todos los contenedores son del mismo color", "El reciclaje no sirve para nada"] },
      { type: "choice", prompt: "Para que sirve el contenedor amarillo?", answer: "Para envases de plastico y latas", options: ["Para envases de plastico y latas", "Para papel y carton", "Para restos de comida"] },
      { type: "truefalse", prompt: "El reciclaje no tiene ningun efecto sobre el medio ambiente.", answer: false }
    ],
    writingPrompt: "Que cosas reciclas tu en casa? Explica como lo haces.",
    writingKeywords: ["reciclo", "casa", "contenedor"]
  },
  {
    id: "read-l07",
    subject: "language",
    skill: "lang_text_structure",
    textType: "letter",
    difficulty: 3,
    wordCount: 69,
    title: "Carta de agradecimiento",
    text: "Querida monitora Sofia:\n\nAhora que termina el campamento, queria darte las gracias por toda la paciencia que tuviste conmigo cuando no sabia nadar bien. Al principio me daba mucho miedo meterme en la parte profunda de la piscina.\n\nGracias a tus consejos y a que nunca te enfadaste por mis dudas, ahora puedo nadar todo el largo sin pararme. Espero verte el verano que viene.\n\nCon mucho cariño,\nValeria",
    questions: [
      { type: "choice", prompt: "Por que agradece Valeria a su monitora?", answer: "Por su paciencia enseñandole a nadar", options: ["Por su paciencia enseñandole a nadar", "Por regalarle un bañador", "Por llevarla a casa cada dia"] },
      { type: "choice", prompt: "Que le daba miedo a Valeria al principio?", answer: "La parte profunda de la piscina", options: ["La parte profunda de la piscina", "El sol fuerte", "Los demas niños del grupo"] },
      { type: "truefalse", prompt: "Valeria sigue sin saber nadar al final de la carta.", answer: false }
    ],
    writingPrompt: "Escribe una carta breve de agradecimiento a alguien que te haya ayudado a aprender algo.",
    writingKeywords: ["gracias", "aprendi", "ayuda"]
  },
  {
    id: "read-l08",
    subject: "language",
    skill: "lang_text_structure",
    textType: "letter",
    difficulty: 5,
    wordCount: 119,
    title: "Carta a mi yo del futuro",
    text: "Querido yo del futuro:\n\nTe escribo esta carta el ultimo dia de tercero de primaria, justo antes de las vacaciones de verano. No se cuantos años tendras cuando la leas, pero espero que sigas recordando lo nervioso que estabas hoy por el examen final de matematicas.\n\nMe gustaria preguntarte si conseguiste, como tanto querias, formar parte del equipo de natacion del colegio el año que viene. Tambien quiero que sepas que este verano voy a intentar aprender a montar en monociclo, aunque ahora mismo me parezca imposible.\n\nSea lo que sea que estes haciendo cuando leas esto, espero que te acuerdes de seguir intentando cosas nuevas, igual que yo intento hacerlo ahora.\n\nCon cariño,\nTu yo de nueve años",
    questions: [
      { type: "choice", prompt: "Cuando escribe la carta el autor?", answer: "El ultimo dia de tercero de primaria", options: ["El ultimo dia de tercero de primaria", "En su cumpleaños", "El primer dia de clase"] },
      { type: "choice", prompt: "Que quiere aprender a hacer este verano?", answer: "Montar en monociclo", options: ["Montar en monociclo", "Tocar la guitarra", "Hablar otro idioma"] },
      { type: "truefalse", prompt: "El autor ya sabe con seguridad si entrara en el equipo de natacion.", answer: false },
      { type: "vocabulary", prompt: "En el texto, la expresion \"seguir intentando cosas nuevas\" sugiere un mensaje de...", answer: "animo y curiosidad hacia el futuro", options: ["animo y curiosidad hacia el futuro", "miedo a equivocarse", "tristeza por el pasado"] }
    ],
    writingPrompt: "Escribe tu propia carta breve dirigida a ti mismo dentro de cinco años.",
    writingKeywords: ["futuro", "espero", "yo"]
  },
  {
    id: "read-no09",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 2,
    wordCount: 37,
    title: "Normas del taller de manualidades",
    text: "TALLER DE MANUALIDADES\n\n1. Pide siempre permiso antes de usar las tijeras.\n2. Comparte el material con tus compañeros.\n3. Limpia tu mesa al terminar cada actividad.\n4. Guarda tus trabajos en la carpeta con tu nombre.",
    questions: [
      { type: "choice", prompt: "Que se debe pedir antes de usar las tijeras?", answer: "Permiso", options: ["Permiso", "Dinero", "Un dibujo"] },
      { type: "truefalse", prompt: "Cada niño debe guardar sus trabajos en una carpeta con su nombre.", answer: true },
      { type: "choice", prompt: "Que se debe hacer al terminar la actividad?", answer: "Limpiar la mesa", options: ["Limpiar la mesa", "Romper los dibujos", "Salir corriendo"] }
    ]
  },
  {
    id: "read-no10",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 5,
    wordCount: 89,
    title: "Reglamento oficial del campeonato regional",
    text: "REGLAMENTO DEL CAMPEONATO REGIONAL DE PEONZAS\n\nArticulo 1: Podran participar todos los niños inscritos previamente en su club correspondiente antes del 30 de junio.\n\nArticulo 2: Cada categoria se establecera segun la edad del participante a fecha del campeonato, no segun la edad con la que se inscribio.\n\nArticulo 3: Cualquier reclamacion debera presentarse por escrito al comite organizador antes de que finalice la jornada de competicion.\n\nArticulo 4: El comite organizador se reserva el derecho de modificar el horario de las pruebas en caso de condiciones meteorologicas adversas.",
    questions: [
      { type: "choice", prompt: "Hasta cuando se podian inscribir los participantes?", answer: "Hasta el 30 de junio", options: ["Hasta el 30 de junio", "Hasta el dia del campeonato", "No hay fecha limite"] },
      { type: "choice", prompt: "Como se determina la categoria de cada participante?", answer: "Segun su edad en la fecha del campeonato", options: ["Segun su edad en la fecha del campeonato", "Segun su edad cuando se inscribio", "Por sorteo aleatorio"] },
      { type: "truefalse", prompt: "Las reclamaciones se pueden presentar de forma oral en cualquier momento.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"adversas\" describe condiciones meteorologicas...", answer: "desfavorables o malas", options: ["desfavorables o malas", "perfectas y soleadas", "sin ningun viento"] }
    ],
    writingPrompt: "Por que crees que es importante que un campeonato tenga un reglamento claro y escrito?",
    writingKeywords: ["reglamento", "importante", "claro"]
  },
  {
    id: "read-d06",
    subject: "language",
    skill: "lang_main_idea",
    textType: "dialogue",
    difficulty: 3,
    wordCount: 83,
    title: "El consejo del entrenador",
    text: "-No entiendo por que sigo perdiendo si entreno todos los dias -se quejo Nico, frustrado.\n\n-Cuanto tiempo dedicas a cada tecnica? -preguntó el entrenador.\n\n-Pues... la misma que a todas -respondio Nico, dudando.\n\n-Ahi esta el problema -dijo el entrenador-. Llevas semanas fallando el mismo lanzamiento, pero le dedicas el mismo tiempo que a los que ya dominas. Prueba a entrenar mas ese lanzamiento concreto esta semana.\n\nNico lo intento, y en el siguiente torneo, ese lanzamiento se convirtio en su mejor arma.",
    questions: [
      { type: "choice", prompt: "Cual es la idea principal del dialogo?", answer: "Entrenar mas lo que falla ayuda a mejorar", options: ["Entrenar mas lo que falla ayuda a mejorar", "Nico debe dejar de entrenar", "El entrenador no sabe ayudar a Nico"] },
      { type: "choice", prompt: "Que error cometia Nico al entrenar?", answer: "Dedicaba el mismo tiempo a todo, sin enfocarse en lo que fallaba", options: ["Dedicaba el mismo tiempo a todo, sin enfocarse en lo que fallaba", "No entrenaba nunca", "Entrenaba solo los fines de semana"] },
      { type: "truefalse", prompt: "Nico ignoro el consejo del entrenador.", answer: false }
    ],
    writingPrompt: "Que estrategia usarias tu para mejorar en algo que se te resulta dificil?",
    writingKeywords: ["mejorar", "estrategia", "dificil"]
  },
  {
    id: "read-c06",
    subject: "language",
    skill: "lang_main_idea",
    textType: "comic",
    difficulty: 4,
    wordCount: 95,
    title: "Comic: El robot ayudante",
    text: "VIÑETA 1: Sara presenta su robot casero a la clase. \"Se llama Tornillo y puede recoger juguetes\", explica orgullosa.\n\nVIÑETA 2: Pulsa el boton y Tornillo avanza lentamente, agarra un peluche con su pinza mecanica.\n\nVIÑETA 3: De repente, Tornillo gira hacia el lado equivocado y choca contra la pizarra, soltando el peluche por los aires.\n\nVIÑETA 4: Toda la clase se rie, pero tambien aplaude, sorprendida de que un robot casero hiciera tanto.\n\nVIÑETA 5: El profesor le dice a Sara: \"Esto demuestra mucho mas ingenio que un robot perfecto comprado en una tienda\".",
    questions: [
      { type: "choice", prompt: "Para que sirve el robot de Sara?", answer: "Para recoger juguetes", options: ["Para recoger juguetes", "Para hacer la comida", "Para hablar idiomas"] },
      { type: "choice", prompt: "Que ocurre cuando Tornillo se mueve?", answer: "Choca contra la pizarra y suelta el peluche", options: ["Choca contra la pizarra y suelta el peluche", "Funciona perfectamente sin errores", "Se apaga inmediatamente"] },
      { type: "truefalse", prompt: "El profesor se enfada porque el robot no funciono bien.", answer: false }
    ],
    writingPrompt: "Inventa otro robot casero util y explica para que serviria.",
    writingKeywords: ["robot", "serviria", "inventaria"]
  },
  {
    id: "read-n27",
    subject: "language",
    skill: "lang_main_idea",
    textType: "narrative",
    difficulty: 5,
    wordCount: 130,
    title: "El verano de las cartas perdidas",
    text: "Antes de irse de campamento, Lucia y su mejor amiga prometieron escribirse cada semana, como hacian las protagonistas de su libro favorito. Sin embargo, despues de enviar tres cartas sin recibir ninguna respuesta, Lucia empezo a sentirse dolida, convencida de que su amiga se habia olvidado de ella.\n\nAl volver a casa en septiembre, descubrio la verdad: el buzon del campamento de su amiga tenia un problema y llevaba semanas sin repartir correctamente la correspondencia. Todas las cartas de Lucia habian llegado de golpe el ultimo dia, junto con las que su amiga si habia escrito durante todo el verano.\n\nLas dos se rieron mucho al imaginarse la cara de extrañeza del cartero al ver aquel monton de cartas atrasadas, y prometieron, esta vez, llamarse por telefono ademas de escribirse.",
    questions: [
      { type: "choice", prompt: "Por que dejo de recibir cartas Lucia?", answer: "Porque el buzon del campamento tenia un problema", options: ["Porque el buzon del campamento tenia un problema", "Porque su amiga ya no queria escribirle", "Porque Lucia dejo de escribir primero"] },
      { type: "choice", prompt: "Que sintio Lucia al no recibir respuesta?", answer: "Se sintio dolida, pensando que su amiga la habia olvidado", options: ["Se sintio dolida, pensando que su amiga la habia olvidado", "Se alegro de no tener que escribir mas", "No le importo en absoluto"] },
      { type: "truefalse", prompt: "La amiga de Lucia nunca le escribio ninguna carta.", answer: false },
      { type: "vocabulary", prompt: "En el texto, \"correspondencia\" se refiere a...", answer: "las cartas que se envian y reciben", options: ["las cartas que se envian y reciben", "el dinero ahorrado", "los juegos del campamento"] }
    ],
    writingPrompt: "Cuenta una vez que pensaste algo equivocado sobre una situacion y luego descubriste la verdad.",
    writingKeywords: ["pense", "verdad", "descubri"]
  },
  {
    id: "read-n28",
    subject: "language",
    skill: "lang_order_text",
    textType: "narrative",
    difficulty: 3,
    wordCount: 75,
    title: "El plan de estudio de Marcos",
    text: "Antes de los examenes finales, Marcos organizo su tiempo en tres partes claras. Primero, dedicaba media hora cada tarde a repasar matematicas, su asignatura mas dificil. Despues, leia un capitulo del libro de lectura obligatoria.\n\nPor ultimo, se permitia veinte minutos de videojuegos como premio si habia cumplido con las dos primeras tareas. Gracias a ese orden, llego a los examenes mucho mas tranquilo que sus compañeros, que repasaban todo de golpe la noche anterior.",
    questions: [
      { type: "choice", prompt: "Que hacia Marcos primero cada tarde?", answer: "Repasar matematicas", options: ["Repasar matematicas", "Jugar videojuegos", "Leer un capitulo"] },
      { type: "choice", prompt: "Cuando se permitia Marcos jugar a videojuegos?", answer: "Despues de cumplir las dos primeras tareas", options: ["Despues de cumplir las dos primeras tareas", "Antes de estudiar", "Solo los fines de semana"] },
      { type: "truefalse", prompt: "Marcos repasaba todo la noche antes del examen, como sus compañeros.", answer: false }
    ],
    writingPrompt: "Organiza tu propio plan de estudio con tres pasos en orden.",
    writingKeywords: ["primero", "despues", "plan"]
  },
  {
    id: "read-n29",
    subject: "language",
    skill: "lang_vocabulary",
    textType: "narrative",
    difficulty: 4,
    wordCount: 94,
    title: "La actuacion improvisada",
    text: "Cuando el actor principal de la obra del campamento se puso enfermo justo antes del estreno, todos pensaron que tendrian que cancelar la funcion. Sin embargo, Carla, que se sabia el guion entero de memoria por haber ayudado a los actores a ensayar, se ofrecio a sustituirlo sin dudarlo.\n\nAunque estaba visiblemente nerviosa al principio, su conocimiento del texto le permitio improvisar con naturalidad cuando se le olvido una linea. El publico, que no sabia nada del cambio de ultima hora, aplaudio entusiasmado al final, sin sospechar la hazaña que habia ocurrido entre bastidores.",
    questions: [
      { type: "choice", prompt: "Por que pudo Carla sustituir al actor?", answer: "Porque se sabia el guion de memoria", options: ["Porque se sabia el guion de memoria", "Porque era la directora de la obra", "Porque ya habia actuado antes en ese papel"] },
      { type: "vocabulary", prompt: "En el texto, \"entre bastidores\" se refiere a lo que ocurre...", answer: "detras del escenario, sin que el publico lo vea", options: ["detras del escenario, sin que el publico lo vea", "en el escenario principal", "fuera del teatro"] },
      { type: "truefalse", prompt: "El publico sabia desde el principio que habia un cambio de actor.", answer: false }
    ],
    writingPrompt: "Cuenta una vez que tuviste que improvisar porque algo no salio como esperabas.",
    writingKeywords: ["improvise", "nervios", "porque"]
  },
  {
    id: "read-i17",
    subject: "language",
    skill: "lang_literal",
    textType: "informative",
    difficulty: 2,
    wordCount: 67,
    title: "Las estaciones del año",
    text: "La Tierra tarda un año en dar una vuelta completa alrededor del sol, y durante ese recorrido, su inclinacion provoca los cambios de estacion. En primavera, las plantas florecen; en verano, los dias son mas largos y calurosos.\n\nEn otoño, las hojas de muchos arboles cambian de color y caen, y en invierno los dias se acortan y las temperaturas bajan considerablemente en muchas regiones del planeta.",
    questions: [
      { type: "choice", prompt: "Cuanto tarda la Tierra en dar una vuelta al sol?", answer: "Un año", options: ["Un año", "Un mes", "Una semana"] },
      { type: "choice", prompt: "Que ocurre con las hojas de los arboles en otoño?", answer: "Cambian de color y caen", options: ["Cambian de color y caen", "Crecen mas rapido", "Se vuelven mas verdes"] },
      { type: "truefalse", prompt: "Los dias son mas largos en invierno que en verano.", answer: false }
    ],
    writingPrompt: "Cual es tu estacion favorita del año? Explica por que.",
    writingKeywords: ["estacion", "favorita", "porque"]
  },
  {
    id: "read-i18",
    subject: "language",
    skill: "lang_vocabulary",
    textType: "informative",
    difficulty: 5,
    wordCount: 107,
    title: "La memoria y como aprendemos",
    text: "Cuando aprendemos algo nuevo, nuestro cerebro crea conexiones entre neuronas que, al principio, son muy debiles y se olvidan facilmente. Sin embargo, cada vez que repasamos esa informacion, esas conexiones se fortalecen, haciendo que el recuerdo sea cada vez mas estable y duradero.\n\nPor eso, repasar un mismo contenido varios dias seguidos, en sesiones cortas, resulta mucho mas efectivo que estudiar todo de golpe la noche anterior a un examen. Los cientificos llaman a este fenomeno repeticion espaciada, y han demostrado que ayuda a que la informacion pase de la memoria a corto plazo a la memoria a largo plazo, donde permanece disponible durante mucho mas tiempo.",
    questions: [
      { type: "choice", prompt: "Que ocurre en el cerebro cuando aprendemos algo nuevo?", answer: "Se crean conexiones entre neuronas", options: ["Se crean conexiones entre neuronas", "El cerebro se hace mas grande", "Se borran recuerdos antiguos automaticamente"] },
      { type: "vocabulary", prompt: "En el texto, \"duradero\" significa que algo...", answer: "se mantiene durante mucho tiempo", options: ["se mantiene durante mucho tiempo", "desaparece muy rapido", "cambia constantemente"] },
      { type: "truefalse", prompt: "Segun el texto, estudiar todo de golpe la noche anterior es mas efectivo que repasar varios dias.", answer: false },
      { type: "choice", prompt: "Como se llama la tecnica de repasar varios dias en sesiones cortas?", answer: "Repeticion espaciada", options: ["Repeticion espaciada", "Memoria fotografica", "Aprendizaje pasivo"] }
    ],
    writingPrompt: "Que tecnica de estudio usarias tu a partir de ahora despues de leer este texto?",
    writingKeywords: ["tecnica", "estudio", "usaria"]
  },
  {
    id: "read-no11",
    subject: "language",
    skill: "lang_text_structure",
    textType: "notice",
    difficulty: 3,
    wordCount: 48,
    title: "Anuncio: feria de ciencias",
    text: "FERIA DE CIENCIAS DEL CAMPAMENTO\n\nFecha: sabado 12 de julio, de 10:00 a 13:00.\nLugar: pabellon deportivo.\nCada grupo debera presentar su proyecto en una mesa numerada que se asignara el dia anterior.\nSe ruega traer el material propio, ya que el campamento solo facilitara mesas y enchufes.",
    questions: [
      { type: "choice", prompt: "Donde se celebrara la feria de ciencias?", answer: "En el pabellon deportivo", options: ["En el pabellon deportivo", "En el comedor", "En la piscina"] },
      { type: "choice", prompt: "Que debe traer cada grupo?", answer: "Su propio material", options: ["Su propio material", "Solo las mesas", "Comida para todos"] },
      { type: "truefalse", prompt: "El campamento facilitara todo el material necesario para los proyectos.", answer: false }
    ],
    writingPrompt: "Que proyecto de ciencias presentarias tu en una feria como esta?",
    writingKeywords: ["proyecto", "ciencias", "presentaria"]
  },
  {
    id: "read-d07",
    subject: "language",
    skill: "lang_vocabulary",
    textType: "dialogue",
    difficulty: 4,
    wordCount: 89,
    title: "La negociacion del horario",
    text: "-Si terminamos antes el entrenamiento, podriamos ir a la piscina -propuso Ana al resto del equipo.\n\n-Pero entonces no nos dara tiempo a practicar el ejercicio nuevo -objeto el capitan, dudoso.\n\n-Y si lo practicamos mañana a primera hora? -sugirio Ana-. Asi aprovechamos hoy que hace tanto calor.\n\nEl capitan se quedo pensando un momento antes de responder.\n\n-Me parece un buen compromiso -admitio finalmente-. Pero solo si todos estan de acuerdo en venir mas temprano mañana.\n\nTodos asintieron, satisfechos con el plan negociado entre Ana y el capitan.",
    questions: [
      { type: "choice", prompt: "Que propone Ana al equipo?", answer: "Terminar antes para ir a la piscina", options: ["Terminar antes para ir a la piscina", "Cancelar el entrenamiento entero", "Cambiar de deporte"] },
      { type: "vocabulary", prompt: "En el texto, \"compromiso\" se refiere a un acuerdo en el que...", answer: "ambas partes ceden un poco", options: ["ambas partes ceden un poco", "una parte impone su voluntad", "nadie consigue lo que queria"] },
      { type: "truefalse", prompt: "El capitan acepta la propuesta de Ana sin ninguna condicion.", answer: false }
    ],
    writingPrompt: "Cuenta una vez en la que tuviste que llegar a un acuerdo con alguien para resolver un problema.",
    writingKeywords: ["acuerdo", "resolvimos", "compromiso"]
  },
  {
    id: "read-c07",
    subject: "language",
    skill: "lang_order_text",
    textType: "comic",
    difficulty: 2,
    wordCount: 61,
    title: "Comic: La torre de cubos",
    text: "VIÑETA 1: Tres niños empiezan a apilar cubos de madera, uno encima de otro, con cuidado.\n\nVIÑETA 2: La torre va creciendo cada vez mas alta, mas alta que la mesa.\n\nVIÑETA 3: Cuando ponen el ultimo cubo, la torre tiembla un instante.\n\nVIÑETA 4: La torre se mantiene en pie y los tres niños saltan de alegria, chocando las manos.",
    questions: [
      { type: "choice", prompt: "Que construyen los niños?", answer: "Una torre de cubos de madera", options: ["Una torre de cubos de madera", "Un puente de papel", "Un castillo de arena"] },
      { type: "choice", prompt: "Que pasa cuando ponen el ultimo cubo?", answer: "La torre tiembla pero se mantiene en pie", options: ["La torre tiembla pero se mantiene en pie", "La torre se cae completamente", "Deciden no poner mas cubos"] },
      { type: "truefalse", prompt: "La torre se cae al final de la historia.", answer: false }
    ],
    writingPrompt: "Inventa una viñeta 5 explicando que hacen los niños despues de terminar la torre.",
    writingKeywords: ["viñeta", "torre", "despues"]
  }
);

OFFLINE_MISSIONS.push(
  {
    id: 'offline-lang-001',
    subject: 'language',
    skill: 'lang_oral',
    type: 'offline',
    title: 'Entrevista familiar',
    instructions: 'Pregunta a un adulto por un recuerdo de su infancia y cuentalo despues en 4 frases ordenadas.',
    parentPrompt: 'Comprueba que escucha, respeta turnos y cuenta el recuerdo con principio y final.'
  },
  {
    id: 'offline-math-001',
    subject: 'math',
    skill: 'math_measure_time_money',
    type: 'offline',
    title: 'Compra simulada',
    instructions: 'Elige 3 objetos de casa, ponles precio inventado y calcula cuanto cuestan juntos.',
    parentPrompt: 'Revisa que suma precios y explica si recibiria cambio al pagar con 10 euros.'
  },
  {
    id: 'offline-art-002',
    subject: 'arts',
    skill: 'art_storyboard',
    type: 'project',
    title: 'Comic de tres vinetas',
    instructions: 'Dibuja una historia con inicio, problema y final en tres vinetas.',
    parentPrompt: 'Pide que explique que ocurre en cada vineta y cual es el problema.'
  },
  {
    id: 'offline-move-002',
    subject: 'movement',
    skill: 'move_coordination',
    type: 'offline',
    title: 'Circuito seguro',
    instructions: 'Monta un circuito con 4 estaciones: saltar, zigzag, equilibrio y lanzamiento suave.',
    parentPrompt: 'Confirma que respeta el orden, descansa si lo necesita y recoge el material.'
  },
  {
    id: 'offline-sci-002',
    subject: 'science',
    skill: 'sci_environment',
    type: 'project',
    title: 'Detective del ahorro',
    instructions: 'Busca 3 acciones de casa que ahorren agua o energia y escribe una mejora posible.',
    parentPrompt: 'Valida que propone acciones realistas y entiende por que cuidan el entorno.'
  }
);

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
  dynamicWords: DYNAMIC_WORDS,
  getAllSkills,
  getSkill,
  getQuestionsBySkill,
  validate: validateCurriculumData
};

window.CurriculumData = CurriculumData;
