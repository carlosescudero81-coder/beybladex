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
    ['eng_greetings', 'Choose a greeting.', 'Hello!', ['Goodbye!', 'Red', 'Seven'], 'Hello es un saludo.'],
    ['eng_greetings', 'How do you say "buenos dias"?', 'Good morning', ['Good night', 'Thank you', 'Dog'], 'Good morning se usa por la manana.'],
    ['eng_vocabulary', 'What color is "blue"?', 'azul', ['rojo', 'verde', 'amarillo'], 'Blue significa azul.'],
    ['eng_vocabulary', 'Choose the animal.', 'cat', ['table', 'pencil', 'blue'], 'Cat es un animal.'],
    ['eng_like_routines', 'Complete: I like ___ football.', 'playing', ['am', 'is', 'the'], 'I like playing expresa una actividad que gusta.'],
    ['eng_like_routines', 'Choose the routine.', 'I brush my teeth.', ['I am a tiger.', 'Blue pencil.', 'Goodbye apple.'], 'Brush my teeth es una rutina.'],
    ['eng_short_dialogue', 'Best answer: How are you?', 'I am fine, thank you.', ['I am eight.', 'It is a pencil.', 'Good night dog.'], 'La pregunta pide como estas.'],
    ['eng_short_dialogue', 'Best answer: What do you like?', 'I like apples.', ['My name is Ana.', 'It is Monday.', 'Close the door.'], 'What do you like pregunta por gustos.']
  ];
  return rows.map((row, index) => buildChoiceQuestion(`gen-eng-${index + 1}`, 'english', row[0], index < 4 ? 1 : 2, row[1], row[2], row[3], row[4]));
}

function buildGeneratedScienceArtMovementQuestions() {
  const rows = [
    ['science', 'sci_living_things', 'Que necesitan normalmente las plantas para vivir?', 'agua, luz y aire', ['solo plastico', 'oscuridad siempre', 'ruido fuerte'], 'Las plantas son seres vivos y tienen necesidades.'],
    ['science', 'sci_living_things', 'Cual es un animal vertebrado?', 'perro', ['caracol', 'lombriz', 'medusa'], 'Los vertebrados tienen columna vertebral.'],
    ['science', 'sci_health', 'Que desayuno ayuda mas a empezar el dia?', 'fruta, leche o pan y agua', ['solo caramelos', 'nada de agua', 'patatas fritas siempre'], 'Un desayuno equilibrado da energia.'],
    ['science', 'sci_health', 'Antes de comer conviene...', 'lavarse las manos', ['tocar el suelo', 'no beber agua', 'correr con tijeras'], 'Lavarse las manos reduce microbios.'],
    ['science', 'sci_materials', 'Que material suele ser flexible?', 'tela', ['piedra', 'cristal', 'ladrillo'], 'La tela se dobla con facilidad.'],
    ['science', 'sci_materials', 'Si el hielo se calienta, se convierte en...', 'agua', ['arena', 'papel', 'metal'], 'El hielo es agua solida.'],
    ['science', 'sci_time_history', 'Que estudian los historiadores?', 'el pasado', ['solo planetas', 'solo canciones', 'solo carreras'], 'La historia estudia hechos del pasado.'],
    ['science', 'sci_time_history', 'Los romanos pertenecen a...', 'Edad Antigua', ['Prehistoria', 'Edad Contemporanea', 'futuro'], 'Roma es una civilizacion de la Edad Antigua.'],
    ['science', 'sci_environment', 'Para ahorrar energia debo...', 'apagar luces que no uso', ['dejar todo encendido', 'tirar pilas al suelo', 'abrir el grifo siempre'], 'Ahorrar energia cuida el entorno.'],
    ['science', 'sci_environment', 'Que contenedor suele usar el papel?', 'azul', ['verde', 'amarillo', 'marron'], 'El contenedor azul se usa para papel y carton.'],
    ['arts', 'art_color_line_texture', 'Un color primario es...', 'rojo', ['naranja', 'marron', 'gris'], 'Rojo, azul y amarillo son colores primarios.'],
    ['arts', 'art_color_line_texture', 'Una textura puede ser...', 'rugosa', ['silenciosa', 'rapida', 'dulce'], 'La textura describe como parece o se siente una superficie.'],
    ['arts', 'art_storyboard', 'Un storyboard sirve para...', 'ordenar una historia en dibujos', ['medir litros', 'sumar monedas', 'lavar pinceles'], 'Ayuda a planificar escenas.'],
    ['arts', 'art_music_rhythm', 'El ritmo en musica es...', 'una repeticion ordenada de sonidos', ['un color oscuro', 'una regla de ortografia', 'un mapa'], 'El ritmo organiza sonidos en el tiempo.'],
    ['movement', 'move_warmup', 'Antes de hacer ejercicio conviene...', 'calentar suave', ['empezar al maximo', 'no moverse nunca', 'cerrar los ojos corriendo'], 'El calentamiento prepara el cuerpo.'],
    ['movement', 'move_coordination', 'Botar una pelota mientras caminas trabaja...', 'coordinacion', ['ortografia', 'historia antigua', 'multiplicacion'], 'Coordinar es usar movimientos juntos con control.'],
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
    ['Choose the greeting.', 'Good morning', ['Blue pencil', 'Three cats'], 'Good morning is a greeting.'],
    ['How do you say "adios"?', 'Goodbye', ['Hello', 'Please'], 'Goodbye means adios.'],
    ['Complete: My name ___ Leo.', 'is', ['are', 'am not'], 'My name is Leo.'],
    ['Answer: How are you?', 'I am fine.', ['I am eight apples.', 'It is a pencil.'], 'I am fine answers how you are.'],
    ['Choose the polite word.', 'please', ['window', 'jump'], 'Please is used to ask politely.'],
    ['How do you say "gracias"?', 'thank you', ['sorry', 'school'], 'Thank you means gracias.'],
    ['Complete: Nice to ___ you.', 'meet', ['blue', 'run'], 'Nice to meet you is a greeting phrase.'],
    ['Choose the question for a name.', 'What is your name?', ['What color is it?', 'Where is my bag?'], 'This question asks for a name.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`eng-greetings-exp-${String(index + 1).padStart(2, '0')}`, 'english', 'eng_greetings', index < 4 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Which word means "lapiz"?', 'pencil', ['chair', 'apple'], 'Pencil means lapiz.'],
    ['Which word means "mesa"?', 'table', ['book', 'dog'], 'Table means mesa.'],
    ['Which word means "rojo"?', 'red', ['green', 'small'], 'Red means rojo.'],
    ['Which word means "perro"?', 'dog', ['cat', 'bird'], 'Dog means perro.'],
    ['Which word means "libro"?', 'book', ['shoe', 'milk'], 'Book means libro.'],
    ['Which word means "ventana"?', 'window', ['door', 'pencil'], 'Window means ventana.'],
    ['Which word means "manzana"?', 'apple', ['water', 'desk'], 'Apple means manzana.'],
    ['Which word means "escuela"?', 'school', ['park', 'beach'], 'School means escuela.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`eng-vocab-exp-${String(index + 1).padStart(2, '0')}`, 'english', 'eng_vocabulary', index < 5 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Complete: I like ___ football.', 'playing', ['is', 'blue'], 'I like playing football is a correct pattern.'],
    ['Choose the correct sentence.', 'I like apples.', ['I likes apples.', 'I apple like.'], 'After I we use like.'],
    ['Complete: I get up ___ seven.', 'at', ['in', 'on'], 'We use at with clock times.'],
    ['Choose a daily routine.', 'I brush my teeth.', ['I am a pencil.', 'Blue is run.'], 'Brushing teeth is a routine.'],
    ['Complete: I have breakfast in the ___.', 'morning', ['night moon', 'pencil'], 'Breakfast is usually in the morning.'],
    ['Choose the negative.', 'I do not like broccoli.', ['I like broccoli.', 'Like I broccoli.'], 'Do not makes the sentence negative.'],
    ['Answer: Do you like music?', 'Yes, I do.', ['Yes, I am eight.', 'No, it is red.'], 'Yes, I do answers a do you like question.'],
    ['Complete: I go to school by ___.', 'bus', ['hungry', 'green'], 'Bus is a transport word.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`eng-routines-exp-${String(index + 1).padStart(2, '0')}`, 'english', 'eng_like_routines', 2, prompt, answer, wrong, explanation));
  });

  [
    ['A: What color is it? B: ___', 'It is blue.', ['I am Carlos.', 'Good night.'], 'The question asks for color.'],
    ['A: How old are you? B: ___', 'I am eight.', ['It is a table.', 'I like red.'], 'How old asks for age.'],
    ['A: Where is the book? B: ___', 'It is on the table.', ['I am fine.', 'My name is Ana.'], 'Where asks for place.'],
    ['A: Can I have a pencil? B: ___', 'Yes, here you are.', ['I am seven.', 'It is sunny.'], 'This is a polite classroom answer.'],
    ['A: What is your favourite sport? B: ___', 'I like football.', ['It is under the chair.', 'Goodbye teacher.'], 'The answer names a sport.'],
    ['A: Is it a cat? B: ___', 'No, it is a dog.', ['I am in the park.', 'It is three.'], 'The answer compares animals.'],
    ['A: What day is it? B: ___', 'It is Monday.', ['It is a backpack.', 'I am fine.'], 'Monday is a day.'],
    ['A: Thank you. B: ___', 'You are welcome.', ['I am red.', 'Where is it?'], 'You are welcome replies to thank you.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`eng-dialogue-exp-${String(index + 1).padStart(2, '0')}`, 'english', 'eng_short_dialogue', index < 4 ? 2 : 3, prompt, answer, wrong, explanation));
  });
}

function appendScienceArtsMovementExpansion() {
  [
    ['Que necesitan las plantas para vivir?', 'agua, luz y aire', ['solo plastico', 'oscuridad siempre'], 'Las plantas necesitan agua, luz y aire.'],
    ['Un mamifero normalmente...', 'nace de su madre y mama', ['tiene ruedas', 'es de piedra'], 'Los mamiferos maman cuando son crias.'],
    ['Cual es un animal vertebrado?', 'pez', ['lombriz', 'caracol'], 'Los peces tienen columna vertebral.'],
    ['Las raices de una planta sirven para...', 'tomar agua y sujetarse', ['volar', 'hacer sonido'], 'Las raices absorben agua y fijan la planta.'],
    ['Un ser vivo...', 'nace, crece y se reproduce', ['no cambia nunca', 'es siempre de metal'], 'Esas son funciones vitales.'],
    ['Cual es una parte de una flor?', 'petalo', ['rueda', 'pantalla'], 'Los petalos forman parte de muchas flores.'],
    ['Los animales carnivoros comen principalmente...', 'otros animales', ['piedras', 'solo sol'], 'Carnivoro significa que come carne.'],
    ['Un habitat es...', 'el lugar donde vive un ser vivo', ['una operacion', 'un instrumento musical'], 'El habitat es su entorno de vida.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-living-exp-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_living_things', index < 5 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Que ayuda a prevenir enfermedades?', 'lavarse las manos', ['comer suelo', 'no dormir nunca'], 'La higiene de manos reduce microbios.'],
    ['Para crecer sano conviene...', 'comer variado', ['solo chuches', 'no beber agua'], 'Una dieta variada aporta nutrientes.'],
    ['Despues de hacer ejercicio es importante...', 'beber agua', ['esconder las zapatillas', 'no respirar'], 'El cuerpo necesita hidratarse.'],
    ['Los dientes se cuidan...', 'cepillandolos', ['pintandolos con rotulador', 'no usandolos'], 'Cepillarse limpia restos de comida.'],
    ['Dormir ayuda a...', 'descansar y aprender mejor', ['perder memoria siempre', 'no crecer'], 'El descanso ayuda al cuerpo y al cerebro.'],
    ['Antes de cruzar una calle hay que...', 'mirar y usar paso de peatones', ['correr sin mirar', 'cerrar los ojos'], 'Es una norma basica de seguridad.'],
    ['Una postura saludable al escribir es...', 'espalda recta y mesa adecuada', ['cuello torcido', 'tumbado en el suelo siempre'], 'La postura evita molestias.'],
    ['Que grupo debe tomarse a menudo?', 'frutas y verduras', ['refrescos', 'caramelos'], 'Frutas y verduras aportan vitaminas y fibra.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-health-exp-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_health', index < 5 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Que material es transparente normalmente?', 'vidrio', ['madera', 'carton'], 'El vidrio deja pasar la luz.'],
    ['Una cuchara suele estar hecha de...', 'metal', ['papel mojado', 'lana'], 'Muchas cucharas son de metal.'],
    ['El papel se obtiene de...', 'madera de arboles', ['arena', 'hierro'], 'El papel procede de fibras vegetales.'],
    ['Si congelas agua, se convierte en...', 'hielo', ['vapor caliente', 'arena'], 'El agua solida es hielo.'],
    ['Un cambio reversible es...', 'derretir hielo', ['quemar papel', 'cocer un huevo'], 'El hielo puede volver a ser agua.'],
    ['Que material es flexible?', 'goma', ['cristal rigido', 'piedra'], 'La goma se puede doblar con facilidad.'],
    ['Un objeto impermeable...', 'no deja pasar agua facilmente', ['se disuelve siempre', 'es invisible'], 'Impermeable significa que resiste el paso del agua.'],
    ['Para reciclar una botella de plastico se usa el contenedor...', 'amarillo', ['azul', 'verde solo vidrio'], 'El amarillo recoge envases de plastico, latas y briks.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-materials-exp-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_materials', index < 5 ? 2 : 3, prompt, answer, wrong, explanation));
  });

  [
    ['Que usamos para ordenar hechos de antes a despues?', 'linea del tiempo', ['brujula rota', 'balanza'], 'Una linea del tiempo ordena sucesos.'],
    ['La Prehistoria termina con la aparicion de...', 'la escritura', ['la television', 'los cohetes'], 'La escritura marca el paso a la Historia.'],
    ['Una fuente historica puede ser...', 'una moneda antigua', ['un numero inventado', 'una nube'], 'Los objetos antiguos dan informacion del pasado.'],
    ['Los romanos pertenecen a...', 'Edad Antigua', ['Prehistoria', 'Edad Contemporanea solamente'], 'Roma es una civilizacion antigua.'],
    ['Un siglo tiene...', '100 anos', ['10 anos', '1000 dias'], 'Un siglo son cien anos.'],
    ['El pasado familiar se puede conocer con...', 'fotos y relatos', ['solo adivinanzas', 'un termometro'], 'Fotos y relatos conservan memoria.'],
    ['Los primeros humanos vivian principalmente de...', 'cazar y recolectar', ['comprar por internet', 'conducir coches'], 'En la Prehistoria cazaban y recolectaban.'],
    ['Un mapa ayuda a conocer...', 'lugares y rutas', ['sabores', 'canciones'], 'Los mapas representan espacios.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-history-exp-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_time_history', index < 4 ? 2 : 3, prompt, answer, wrong, explanation));
  });

  [
    ['Que accion ahorra energia?', 'apagar luces que no usamos', ['dejar todo encendido', 'abrir la nevera para jugar'], 'Apagar luces reduce consumo.'],
    ['Para cuidar un parque debemos...', 'tirar residuos a la papelera', ['romper plantas', 'dejar basura'], 'La basura debe ir a papeleras o contenedores.'],
    ['Que transporte contamina menos?', 'bicicleta', ['coche para ir a la esquina', 'moto parada encendida'], 'La bicicleta no emite humo.'],
    ['El agua se cuida si...', 'cerramos el grifo al enjabonarnos', ['dejamos correr el agua', 'llenamos vasos para tirarlos'], 'Cerrar el grifo evita malgastar agua.'],
    ['Reducir significa...', 'usar menos recursos', ['comprar sin parar', 'tirar todo nuevo'], 'Reducir es consumir menos.'],
    ['Una especie protegida necesita...', 'respeto y cuidado de su habitat', ['que la molesten', 'basura cerca'], 'Proteger habitat ayuda a los seres vivos.'],
    ['El contenedor azul es para...', 'papel y carton', ['vidrio', 'restos organicos siempre'], 'El azul recoge papel y carton.'],
    ['Un huerto escolar ayuda a aprender sobre...', 'plantas y alimentos', ['videojuegos solamente', 'trafico aereo'], 'Un huerto muestra ciclos de plantas y alimentos.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`sci-env-exp-${String(index + 1).padStart(2, '0')}`, 'science', 'sci_environment', index < 5 ? 1 : 2, prompt, answer, wrong, explanation));
  });

  [
    ['Mezclar rojo y amarillo produce...', 'naranja', ['verde', 'morado'], 'Rojo y amarillo forman naranja.'],
    ['Una linea curva...', 'no es recta', ['siempre mide 1 km', 'no se puede dibujar'], 'La linea curva cambia de direccion.'],
    ['La textura de una lija es...', 'aspera', ['suave como algodon', 'invisible'], 'La lija tiene textura rugosa.'],
    ['Los colores frios incluyen...', 'azul y verde', ['rojo y naranja', 'solo negro'], 'Azul y verde suelen considerarse frios.'],
    ['Para dar sensacion de cerca puedes dibujar...', 'mas grande', ['siempre sin color', 'fuera del papel'], 'Los objetos cercanos se representan mas grandes.'],
    ['Un collage se hace con...', 'recortes pegados', ['solo sonidos', 'agua invisible'], 'El collage combina materiales pegados.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`art-color-exp-${String(index + 1).padStart(2, '0')}`, 'arts', 'art_color_line_texture', 1, prompt, answer, wrong, explanation));
  });

  [
    ['Un storyboard sirve para...', 'ordenar escenas', ['medir temperatura', 'hacer una resta'], 'El storyboard planifica una narracion visual.'],
    ['En una viñeta se puede mostrar...', 'una accion de la historia', ['solo una multiplicacion', 'un silencio vacio siempre'], 'Cada viñeta cuenta una parte.'],
    ['Para que se entienda una historia visual conviene...', 'mantener orden claro', ['mezclar todo sin sentido', 'quitar todos los personajes'], 'El orden ayuda a leer imagenes.'],
    ['Un bocadillo de comic muestra...', 'lo que dice un personaje', ['el peso', 'la temperatura'], 'El bocadillo contiene dialogo.'],
    ['El plano general muestra...', 'el lugar y los personajes', ['solo una letra', 'nada'], 'Sirve para situar la escena.'],
    ['Una flecha de movimiento indica...', 'direccion', ['olor', 'sabor'], 'Las flechas muestran hacia donde se mueve algo.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`art-story-exp-${String(index + 1).padStart(2, '0')}`, 'arts', 'art_storyboard', 2, prompt, answer, wrong, explanation));
  });

  [
    ['El ritmo es...', 'una repeticion de sonidos o movimientos', ['un color', 'un material duro'], 'El ritmo organiza sonidos o gestos.'],
    ['Un sonido fuerte tiene...', 'mayor intensidad', ['menos volumen siempre', 'color rojo'], 'La intensidad diferencia fuerte y suave.'],
    ['Las palmas pueden marcar...', 'pulso', ['sabor', 'temperatura'], 'Las palmas ayudan a seguir el pulso.'],
    ['Un instrumento de percusion se toca normalmente...', 'golpeando o sacudiendo', ['leyendo', 'dibujando'], 'La percusion produce sonido con golpes o sacudidas.'],
    ['Una cancion puede expresar...', 'emociones', ['solo centimetros', 'solo mapas'], 'La musica comunica emociones.'],
    ['Silencio en musica significa...', 'pausa sin sonido', ['gritar', 'correr mas'], 'El silencio tambien forma parte del ritmo.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`art-music-exp-${String(index + 1).padStart(2, '0')}`, 'arts', 'art_music_rhythm', 1, prompt, answer, wrong, explanation));
  });

  [
    ['Antes de correr conviene...', 'calentar', ['sentarse una hora', 'comer mucho'], 'El calentamiento prepara el cuerpo.'],
    ['Al terminar ejercicio conviene...', 'volver a la calma', ['parar de golpe siempre', 'no respirar'], 'La vuelta a la calma baja pulsaciones poco a poco.'],
    ['Un calentamiento puede incluir...', 'movilidad suave', ['empujones', 'saltos peligrosos'], 'La movilidad suave prepara articulaciones.'],
    ['Si algo duele durante el ejercicio debes...', 'parar y avisar', ['seguir fuerte', 'ocultarlo'], 'El dolor es una senal para parar.'],
    ['Beber agua tras moverse ayuda a...', 'hidratarse', ['olvidar reglas', 'cansarse mas'], 'El cuerpo pierde agua al moverse.'],
    ['La ropa deportiva debe permitir...', 'moverse con comodidad', ['tropezar', 'no doblar rodillas'], 'La comodidad mejora seguridad.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`move-warmup-exp-${String(index + 1).padStart(2, '0')}`, 'movement', 'move_warmup', 1, prompt, answer, wrong, explanation));
  });

  [
    ['Saltar a la pata coja trabaja...', 'equilibrio', ['lectura silenciosa', 'ortografia solamente'], 'Mantenerse sobre una pierna entrena equilibrio.'],
    ['Botar una pelota con una mano trabaja...', 'coordinacion', ['historia antigua', 'dibujo de mapas'], 'Coordinar mano y vista ayuda a botar.'],
    ['En un circuito motor debes...', 'seguir el orden y cuidar seguridad', ['empujar para ganar', 'saltarte todo'], 'El circuito se completa con orden.'],
    ['Lanzar a una diana mejora...', 'punteria', ['memoria historica', 'lectura musical'], 'Apuntar y lanzar trabajan precision.'],
    ['Para girar sin caerte necesitas...', 'control corporal', ['ojos cerrados siempre', 'suelo mojado'], 'El control corporal ayuda al equilibrio.'],
    ['Un relevo se practica pasando...', 'un testigo u objeto', ['una silla pesada', 'un vaso lleno'], 'El relevo incluye entregar un objeto.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`move-coord-exp-${String(index + 1).padStart(2, '0')}`, 'movement', 'move_coordination', 2, prompt, answer, wrong, explanation));
  });

  [
    ['En un juego de equipo es importante...', 'respetar reglas', ['hacer trampas', 'enfadarse siempre'], 'Las reglas hacen el juego justo.'],
    ['Si un companero se cae, debes...', 'ayudar y avisar', ['reirte', 'seguir empujando'], 'La seguridad esta por encima del resultado.'],
    ['Cooperar significa...', 'trabajar juntos', ['jugar solo contra todos', 'ignorar al equipo'], 'Cooperar es colaborar.'],
    ['Aceptar perder ayuda a...', 'aprender y seguir jugando', ['romper material', 'culpar siempre'], 'Perder tambien ensena.'],
    ['Una norma de seguridad es...', 'mirar antes de lanzar', ['lanzar sin avisar', 'correr con ojos cerrados'], 'Mirar evita golpes.'],
    ['El juego limpio incluye...', 'felicitar al rival', ['insultar', 'cambiar reglas a escondidas'], 'El respeto forma parte del deporte.']
  ].forEach(([prompt, answer, wrong, explanation], index) => {
    QUESTION_BANK.push(makeChoiceQuestion(`move-rules-exp-${String(index + 1).padStart(2, '0')}`, 'movement', 'move_rules_teamwork', 2, prompt, answer, wrong, explanation));
  });
}

function appendLivingThingsDepthExpansion() {
  [
    ['Un ave suele tener...', 'plumas', ['escamas de pez', 'ruedas'], 'Las aves se reconocen por sus plumas.'],
    ['Un pez respira en el agua con...', 'branquias', ['pulmones como nosotros siempre', 'antenas'], 'Las branquias ayudan a respirar bajo el agua.'],
    ['Los anfibios pueden vivir...', 'en agua y tierra', ['solo en metal', 'dentro de libros'], 'Muchos anfibios pasan parte de su vida en agua y tierra.'],
    ['Un insecto tiene normalmente...', 'seis patas', ['dos ruedas', 'ocho brazos humanos'], 'Los insectos tienen seis patas.'],
    ['Una seta pertenece al grupo de...', 'hongos', ['mamiferos', 'maquinas'], 'Las setas son hongos.'],
    ['Las plantas fabrican su alimento con ayuda de...', 'la luz del sol', ['el plastico', 'la television'], 'La fotosintesis necesita luz.'],
    ['Un animal herbivoro come principalmente...', 'plantas', ['piedras', 'otros animales siempre'], 'Herbivoro significa que se alimenta de plantas.'],
    ['Un animal omnivoro puede comer...', 'plantas y animales', ['solo aire', 'solo metal'], 'Omnivoro combina alimentos de origen vegetal y animal.'],
    ['La cadena alimentaria empieza muchas veces con...', 'plantas', ['coches', 'lapices'], 'Las plantas producen alimento para otros seres vivos.'],
    ['Un ecosistema incluye...', 'seres vivos y lugar donde viven', ['solo juguetes', 'solo numeros'], 'El ecosistema une organismos y entorno.'],
    ['Las hojas ayudan a la planta a...', 'fabricar alimento', ['caminar', 'hablar'], 'En las hojas ocurre gran parte de la fotosintesis.'],
    ['El tallo de una planta sirve para...', 'sostener y transportar sustancias', ['leer', 'correr'], 'El tallo sostiene y comunica partes de la planta.'],
    ['Las semillas sirven para...', 'formar nuevas plantas', ['hacer ruido siempre', 'medir tiempo'], 'De muchas semillas nacen nuevas plantas.'],
    ['Un cachorro es...', 'una cria de animal', ['una roca', 'un planeta'], 'Cachorro nombra a una cria.'],
    ['Migrar significa...', 'desplazarse a otro lugar', ['dormir todo el ano', 'no moverse nunca'], 'Algunos animales migran buscando alimento o clima.'],
    ['Hibernar es...', 'pasar una etapa de reposo', ['cantar fuerte', 'hacer mapas'], 'Algunos animales reducen actividad en invierno.'],
    ['Un reptil suele tener...', 'escamas', ['plumas', 'lana de oveja siempre'], 'Muchos reptiles tienen piel con escamas.'],
    ['Una rana adulta se clasifica como...', 'anfibio', ['ave', 'pez de metal'], 'La rana es un anfibio.'],
    ['Una ballena es...', 'mamifero', ['pez', 'insecto'], 'Aunque vive en el agua, la ballena es mamifero.'],
    ['Una mariposa es...', 'insecto', ['reptil', 'hongo'], 'La mariposa tiene caracteristicas de insecto.'],
    ['El camuflaje ayuda a algunos animales a...', 'protegerse o cazar', ['hacer sumas', 'convertirse en piedra'], 'Camuflarse permite pasar desapercibido.'],
    ['Los animales nocturnos estan mas activos...', 'de noche', ['solo al mediodia', 'nunca'], 'Nocturno significa activo durante la noche.'],
    ['Cuidar un nido es una conducta relacionada con...', 'reproduccion y cuidado de crias', ['reciclaje de vidrio', 'geometria'], 'Los nidos protegen huevos o crias.'],
    ['Un bosque ofrece a los seres vivos...', 'refugio y alimento', ['solo cemento', 'solo pantallas'], 'El bosque es habitat de muchos seres vivos.'],
    ['Una planta aromatica puede reconocerse por...', 'su olor', ['su enchufe', 'sus ruedas'], 'Aromaticas como romero o menta desprenden olor.'],
    ['Los seres vivos necesitan energia para...', 'realizar funciones vitales', ['ser invisibles', 'ser de cristal'], 'La energia permite vivir, crecer y moverse.'],
    ['La clasificacion ayuda a...', 'ordenar seres vivos por caracteristicas', ['confundir nombres', 'borrar el entorno'], 'Clasificar usa rasgos comunes.'],
    ['Un animal domestico vive normalmente...', 'con personas', ['solo en planetas lejanos', 'dentro de volcanes'], 'Domestico significa adaptado a convivir con personas.'],
    ['Un animal salvaje vive normalmente...', 'en la naturaleza', ['en una mochila escolar', 'en un estuche'], 'Salvaje no depende directamente de personas.'],
    ['Las bacterias son seres vivos...', 'microscopicos', ['gigantes siempre', 'de plastico'], 'Muchas bacterias solo se ven con microscopio.'],
    ['La lupa sirve para observar...', 'detalles pequenos', ['el sonido', 'el peso exacto'], 'La lupa aumenta la imagen.'],
    ['Una norma al observar animales es...', 'no molestarlos', ['perseguirlos siempre', 'romper su refugio'], 'Observar con respeto protege a los seres vivos.']
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
      ['hacer que la planta corra', 'convertirse en piedra'],
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
      ['silla', 'robot sin bateria'],
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
        ['tiene ruedas', 'esta hecho de plastico'],
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
        ['rueda', 'pantalla'],
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
        ['porque es de metal', 'porque no necesita entorno'],
        `La razon es que ${habitat[2]}.`
      ));
    }
  });
}

appendMathExpansion();
appendLanguageExpansion();
appendEnglishExpansion();
appendScienceArtsMovementExpansion();
appendLivingThingsDepthExpansion();
appendLivingThingsClassificationPool();

READING_BANK.push(
  {
    id: 'read-003',
    subject: 'language',
    skill: 'lang_main_idea',
    difficulty: 2,
    title: 'El parque de los recuerdos',
    text: 'Cuando era pequeno, Dani bajaba al parque despues del colegio. Alli jugaba al futbol, celebraba cumpleanos y aprendia a cuidar a sus amigos. Anos despues, recordaba aquel lugar con alegria.',
    questions: [
      {
        prompt: 'Cual es la idea principal del texto?',
        answer: 'Los recuerdos felices del parque',
        options: ['Los recuerdos felices del parque', 'Como arreglar una bicicleta', 'Una receta de verano']
      },
      {
        prompt: 'Que aprendia Dani con sus amigos?',
        answer: 'A cuidarlos',
        options: ['A cuidarlos', 'A pilotar aviones', 'A pintar paredes']
      }
    ]
  },
  {
    id: 'read-004',
    subject: 'language',
    skill: 'lang_order_text',
    difficulty: 2,
    title: 'La mochila lista',
    text: 'Primero, Carla miro el horario. Despues, metio los libros y el estuche. Por ultimo, cerro la mochila y la dejo junto a la puerta.',
    questions: [
      {
        prompt: 'Que hizo Carla primero?',
        answer: 'Miro el horario',
        options: ['Miro el horario', 'Cerro la mochila', 'Salio al patio']
      },
      {
        prompt: 'Que palabra indica el final?',
        answer: 'Por ultimo',
        options: ['Por ultimo', 'Primero', 'Despues']
      }
    ]
  },
  {
    id: 'read-005',
    subject: 'language',
    skill: 'lang_inference',
    difficulty: 2,
    title: 'El entrenamiento secreto',
    text: 'Leo repetia los lanzamientos una y otra vez. Aunque se equivoco varias veces, siguio probando hasta que la peonza giro en el centro.',
    questions: [
      {
        prompt: 'Como es Leo?',
        answer: 'perseverante',
        options: ['perseverante', 'perezoso', 'desordenado']
      },
      {
        prompt: 'Por que siguio probando?',
        answer: 'Queria mejorar',
        options: ['Queria mejorar', 'Queria dormir', 'Queria perder la peonza']
      }
    ]
  },
  {
    id: 'read-006',
    subject: 'language',
    skill: 'lang_literal',
    difficulty: 1,
    title: 'Excursion al rio',
    text: 'El sabado, tres amigos caminaron hasta el rio. Llevaron bocadillos, agua y una cuerda para jugar sin acercarse a la corriente.',
    questions: [
      {
        prompt: 'Cuantos amigos fueron al rio?',
        answer: 'tres',
        options: ['tres', 'dos', 'cinco']
      },
      {
        prompt: 'Que llevaron para beber?',
        answer: 'agua',
        options: ['agua', 'zumo', 'leche']
      }
    ]
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
  getAllSkills,
  getSkill,
  getQuestionsBySkill,
  validate: validateCurriculumData
};

window.CurriculumData = CurriculumData;
