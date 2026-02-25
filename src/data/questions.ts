export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: "q1",
    text: "¿Qué estandarte fue utilizado durante el Grito de Dolores y es considerado el primer símbolo de unión?",
    options: ["Estandarte de Morelos", "Bandera del Ejército Trigarante", "Estandarte de Hidalgo", "Bandera del Primer Imperio"],
    correctAnswer: "Estandarte de Hidalgo",
    explanation: "El Estandarte de Hidalgo, con la imagen de la Virgen de Guadalupe, fue tomado por Miguel Hidalgo en Atotonilco en 1810."
  },
  {
    id: "q2",
    text: "¿Qué bandera presenta por primera vez un águila coronada posada sobre un nopal encima de un puente de tres arcos?",
    options: ["Bandera Carrancista", "Estandarte de Morelos", "Bandera de la República", "Bandera Porfirista"],
    correctAnswer: "Estandarte de Morelos",
    explanation: "El Estandarte de Morelos (1812) fue el primero en incluir el águila sobre un nopal, un símbolo prehispánico."
  },
  {
    id: "q3",
    text: "¿Qué significaban originalmente los colores de la Bandera del Ejército Trigarante (blanco, verde y rojo)?",
    options: ["Esperanza, Sangre, Paz", "Religión, Independencia, Unión", "Tierra, Mar, Cielo", "Libertad, Igualdad, Fraternidad"],
    correctAnswer: "Religión, Independencia, Unión",
    explanation: "Diseñada en 1821, sus colores representaban las Tres Garantías: Religión Católica (blanco), Independencia (verde) y Unión (rojo)."
  },
  {
    id: "q4",
    text: "¿En qué bandera se adopta por primera vez el orden actual de los colores (verde, blanco y rojo) en franjas verticales?",
    options: ["Bandera del Primer Imperio", "Bandera de la República", "Bandera Porfirista", "Bandera Actual"],
    correctAnswer: "Bandera del Primer Imperio",
    explanation: "Durante el imperio de Agustín de Iturbide (1821-1823) se estableció el orden vertical de los colores que conservamos hasta hoy."
  },
  {
    id: "q5",
    text: "¿Qué cambio importante se le hizo al escudo en la Bandera de la Primera República (1823)?",
    options: ["Se le puso una corona al águila", "Se quitaron las ramas de encino", "Se le quitó la corona al águila y se añadió la serpiente", "Se cambiaron los colores de las franjas"],
    correctAnswer: "Se le quitó la corona al águila y se añadió la serpiente",
    explanation: "Para representar el fin del imperio y el inicio de la República, el Congreso Constituyente quitó la corona imperial al águila."
  },
  {
    id: "q6",
    text: "¿Qué personaje decretó que el águila debía mostrarse de perfil izquierdo, retomando los códices nahuas?",
    options: ["Porfirio Díaz", "Venustiano Carranza", "Maximiliano de Habsburgo", "Gustavo Díaz Ordaz"],
    correctAnswer: "Venustiano Carranza",
    explanation: "En 1916, Venustiano Carranza buscó romper con el diseño afrancesado de Porfirio Díaz y volver a las raíces indígenas."
  },
  {
    id: "q7",
    text: "¿En qué año se adoptó el diseño de la Bandera Actual, previo a los Juegos Olímpicos?",
    options: ["1910", "1934", "1968", "1985"],
    correctAnswer: "1968",
    explanation: "El diseño actual, creado por Francisco Eppens Helguera, fue adoptado en 1968 durante el gobierno de Gustavo Díaz Ordaz."
  }
];
