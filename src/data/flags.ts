export interface Flag {
  id: string;
  name: string;
  year: string;
  character: string;
  description: string;
  image: string;
}

export const flags: Flag[] = [
  {
    id: 'hidalgo',
    name: 'Estandarte de Hidalgo',
    year: '1810',
    character: 'Miguel Hidalgo y Costilla',
    description: 'Utilizado durante el Grito de Dolores. Tiene la imagen de la Virgen de Guadalupe. Fue el primer símbolo de unión de los insurgentes.',
    image: 'https://lh3.googleusercontent.com/-HY32j8Enfjw/VnMC51I4D8I/AAAAAAAALOE/i1TyJkwCAXY/s446-Ic42/01-estandarte-de-higalgo-historia-bandera-mexico.jpeg'
  },
  {
    id: 'morelos',
    name: 'Estandarte de Morelos',
    year: '1812',
    character: 'José María Morelos y Pavón',
    description: 'Presenta por primera vez un águila coronada posada sobre un nopal encima de un puente de tres arcos. Incluye la frase en latín "Con los ojos y las garras, igualmente victoriosa".',
    image: 'https://lh3.googleusercontent.com/-ofdAAQ9xm-Q/VnMC6GwzFHI/AAAAAAAALOY/YPGkW7Qph2s/s415-Ic42/02-estandarte-de-morelos-historia-bandera-mexico.jpg'
  },
  {
    id: 'trigarante',
    name: 'Bandera del Ejército Trigarante',
    year: '1821',
    character: 'Agustín de Iturbide y Vicente Guerrero',
    description: 'Diseñada tras el Plan de Iguala. Tiene tres franjas diagonales: blanco (religión), verde (independencia) y rojo (unión), con una estrella en cada franja.',
    image: 'https://lh3.googleusercontent.com/-xFE3neDILk8/VnMC5y-EpSI/AAAAAAAALOM/a9FXrqafkio/s448-Ic42/03-ejercito-trigarante-historia-bandera-mexico.jpeg'
  },
  {
    id: 'primer_imperio',
    name: 'Bandera del Primer Imperio',
    year: '1821 - 1823',
    character: 'Agustín de Iturbide',
    description: 'Adopta el orden actual de los colores (verde, blanco y rojo) en franjas verticales. El escudo es un águila coronada posada sobre un nopal, pero sin la serpiente.',
    image: 'https://lh3.googleusercontent.com/-NmhESKbwESA/VnMC6TflN8I/AAAAAAAALOU/7gLs1lOzOxU/s448-Ic42/04-primera-bandera-1821-1823-historia-bandera-mexico.png'
  },
  {
    id: 'primera_republica',
    name: 'Bandera de la República',
    year: '1823 - 1864',
    character: 'Congreso Constituyente',
    description: 'Se quita la corona al águila para representar la República. Se añade la serpiente siendo devorada y ramas de encino y laurel en la base.',
    image: 'https://lh3.googleusercontent.com/-iAF5eXodwNE/VnMC6rO4P7I/AAAAAAAALOg/bIHl36c0fwg/s448-Ic42/05-bandera-federal-historia-1823-1864-bandera-mexico.png'
  },
  {
    id: 'segundo_imperio',
    name: 'Bandera del Segundo Imperio',
    year: '1864 - 1867',
    character: 'Maximiliano de Habsburgo',
    description: 'Mantiene los colores, pero el escudo se vuelve más europeo. Destacan cuatro águilas coronadas en las esquinas de la bandera.',
    image: 'https://lh3.googleusercontent.com/-N5NfHbCOpU4/VnMC7BXhUdI/AAAAAAAALOo/DXl7rxNOwM4/s448-Ic42/06-bandera-no-oficial-1846-%2525201879-historia-bandera-mexico.png'
  },
  {
    id: 'porfirista',
    name: 'Bandera Porfirista',
    year: '1880 - 1916',
    character: 'Porfirio Díaz',
    description: 'El águila se representa de frente, con las alas extendidas, devorando a la serpiente. Estilo afrancesado característico de la época.',
    image: 'https://lh3.googleusercontent.com/-N9yWQJljnhY/VnMC7ufva3I/AAAAAAAALO0/48odFwA5jRg/s448-Ic42/07-bandera-1880-1916-historia-bandera-mexico.png'
  },
  {
    id: 'carrancista',
    name: 'Bandera Carrancista',
    year: '1916 - 1934',
    character: 'Venustiano Carranza',
    description: 'Para romper con el régimen de Díaz, Carranza decreta que el águila debe mostrarse de perfil izquierdo, retomando códices nahuas.',
    image: 'https://lh3.googleusercontent.com/-QmEubC8Ird8/VnMC746zFhI/AAAAAAAALO4/QH4Ew_Ge-uc/s450-Ic42/08-bandera-1916-1934-historia-bandera-mexico.png'
  },
  {
    id: 'actual',
    name: 'Bandera Actual',
    year: '1968 - Presente',
    character: 'Gustavo Díaz Ordaz (Diseño de Eppens)',
    description: 'Adoptada previo a los Juegos Olímpicos de 1968. El águila es más estilizada y agresiva. Es el diseño oficial que conocemos hoy en día.',
    image: 'https://lh3.googleusercontent.com/-84sSSMtY5MQ/Vmn53Yf0qHI/AAAAAAAAK-g/NmPBAt2a3s4/s450-Ic42/bandera-de-mexico.png'
  }
];
