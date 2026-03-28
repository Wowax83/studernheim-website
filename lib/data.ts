export interface Fest {
  id: string
  name: string
  region: string
  vibe: string
  description: string
  date: string
  image: string
  organizer: string
  quickFacts: string[]
}

export interface Verein {
  id: string
  name: string
  description: string
  category: string
  contact?: string
  quickFacts?: string[]
}

export interface Termin {
  id: string
  title: string
  date: string
  time?: string
  location: string
  description: string
  organizer: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  image?: string
}

export const feste: Fest[] = [
  {
  id: '1',
  name: 'Studernheimer Kerwe',
  region: 'Festplatz Studernheim',
  vibe: 'Live-Musik • Festzelt • Dorfgemeinschaft',
  description: 'Die Kerwe ist das absolute Highlight des Jahres in Studernheim. Im festlich geschmückten Festzelt sorgt Live-Musik für beste Stimmung, während sich Freunde, Familien und Vereine zum gemeinsamen Feiern treffen. Hier erlebt man echte Dorfgemeinschaft und unvergessliche Abende.',
  date: 'August',
  image: '/images/kerwe.jpg',
  organizer: 'SAG Studernheim',
  quickFacts: [
    'Großes Festzelt mit Live-Bands',
    'Mehrere Tage Programm',
    'Treffpunkt für das ganze Dorf',
    'Stimmung bis spät in die Nacht'
   ]
 },
  {
  id: '2',
  name: 'Winterverbrennung',
  region: 'Festplatz Studernheim',
  vibe: 'Feuer • Tradition • Gemeinschaft',
  description: 'Mit der Winterverbrennung wird in Studernheim symbolisch der Winter verabschiedet und der Frühling begrüßt. Beim großen Feuer versammeln sich Jung und Alt, um gemeinsam diesen alten Brauch zu feiern. In gemütlicher Atmosphäre mit Essen, Getränken und guter Gesellschaft entsteht ein besonderes Erlebnis für das ganze Dorf.',
  date: 'Februar / März',
  image: '/images/winterverbrennung.jpg',
  organizer: 'SAG Studernheim',
  quickFacts: [
    'Großes traditionelles Feuer',
    'Brauchtum zum Winteraustreiben',
    'Treffpunkt für Jung und Alt',
    'Gemütliche Atmosphäre mit Verpflegung'
  ]
  },
  {
    id: '3',
    name: 'Wandertag durchs Grüne',
    region: 'Rundweg Studernheim',
    vibe: 'Natur & Gemeinschaft',
    description: 'Gemeinsam wandern wir durch die malerische Landschaft rund um Studernheim. Verschiedene Routen für jeden Fitnesslevel, mit Einkehr im Dorfgemeinschaftshaus.',
    date: 'Mai & Oktober',
    image: 'https://cdn.abacus.ai/images/523aaa8b-1ebd-49d8-b8ea-9b4fe2787428.png',
    organizer: 'Sportverein Studernheim',
    quickFacts: [
      '3 Routen: 5km, 10km, 15km',
      'Geführte Touren',
      'Einkehr mit Vesper',
      'Für alle Altersgruppen'
    ]
  },
  {
    id: '4',
    name: 'Sommerfest',
    region: 'Dorfplatz',
    vibe: 'Sonnige Geselligkeit',
    description: 'Ein entspanntes Fest unter freiem Himmel mit Grillspezialitäten, kühlen Getränken und Live-Musik. Der perfekte Start in die Sommerferien für alle Generationen.',
    date: 'Juli',
    image: 'https://cdn.abacus.ai/images/77d34bad-3242-4a2b-bd27-340ba675c0b5.png',
    organizer: 'Dorfgemeinschaft',
    quickFacts: [
      'Grillstand & Salate',
      'Kinderprogramm ganztags',
      'Live-Band am Abend',
      'Gemütliches Beisammensein'
    ]
  },
  {
    id: '5',
    name: 'Weihnachtsmarkt',
    region: 'Kirchplatz',
    vibe: 'Besinnliche Vorfreude',
    description: 'Unser stimmungsvoller Weihnachtsmarkt verzaubert mit handgefertigten Geschenken, Glühwein, gebrannten Mandeln und einem liebevoll gestalteten Rahmenprogramm.',
    date: 'Dezember',
    image: 'https://cdn.abacus.ai/images/046a0cac-fd94-42fb-a693-a1f54dd4b5ef.png',
    organizer: 'SAG & Vereine',
    quickFacts: [
      '15+ Handwerksstände',
      'Nikolaus für die Kinder',
      'Weihnachtskonzert',
      'Warme Leckereien'
    ]
  },
  {
    id: '6',
    name: 'Dorffest',
    region: 'Gesamtes Dorf',
    vibe: 'Zusammen feiern',
    description: 'Das große Fest für alle Studernheimer! Mit Aktivitäten im ganzen Dorf, sportlichen Wettkämpfen, kulinarischen Highlights und einem bunten Abendprogramm.',
    date: 'September',
    image: 'https://cdn.abacus.ai/images/37015476-c2ea-420e-9a1c-06b4c7d465a8.png',
    organizer: 'Alle Vereine gemeinsam',
    quickFacts: [
      'Dorf-Olympiade',
      'Stände aller Vereine',
      'Große Tombola',
      'Feuerwerk zum Abschluss'
    ]
  }
]

export const vereine: Verein[] = [
  {
    id: '1',
    name: 'SAG Studernheim',
    description: 'Die Studernheimer Arbeitsgemeinschaft koordiniert und unterstützt Veranstaltungen und Projekte für unser Dorf.',
    category: 'Dorfgemeinschaft',
    contact: 'sag@studernheim.de'
  },
  {
    id: '2',
    name: 'SV Studernheim 1920',
    description: 'Der SV Studernheim 1920 ist ein zentraler Bestandteil des Dorflebens und bietet ein vielseitiges Sportangebot für alle Generationen. Ob Fußball, Gymnastik oder gemeinsames Wandern – hier stehen Bewegung, Teamgeist und Gemeinschaft im Mittelpunkt. Besonders die Jugendarbeit hat einen hohen Stellenwert und fördert früh den Spaß am Sport und das Miteinander.',
    category: 'Sport',
    contact: 'info@sv-studernheim.de',
    quickFacts: [
      'Traditionsverein seit 1920',
      'Fußball für Kinder, Jugendliche & Erwachsene',
      'Breitensport: Gymnastik & Wandern',
      'Starke Jugendarbeit und Nachwuchsförderung',
      'Aktives Vereinsleben & regelmäßige Veranstaltungen'
    ]
  },
  {
    id: '3',
    name: 'KG Royal Studernheim',
    description: 'Die KG Royal Studernheim steht für gelebte Fastnacht, ausgelassene Stimmung und kreative Vereinsarbeit. Mit Sitzungen, Auftritten und Umzügen sorgt der Verein jedes Jahr für unvergessliche Momente in der fünften Jahreszeit. Besonders die Tanzgruppen und aktiven Mitglieder prägen das bunte Vereinsleben und begeistern das Publikum.',
    category: 'Kultur & Fastnacht',
    contact: 'info@kg-royal-studernheim.de',
    quickFacts: [
      'Traditionelle Fastnachtsveranstaltungen',
      'Tanzgruppen & Showauftritte',
      'Teilnahme an Umzügen',
      'Aktives Vereinsleben das ganze Jahr',
      'Förderung von Nachwuchs im Karneval'
    ]
  },
  {
    id: '4',
    name: 'Landfrauen Studernheim',
    description: 'Die Landfrauen Studernheim engagieren sich aktiv für Gemeinschaft, Tradition und Bildung im Dorf. Mit vielfältigen Angeboten wie Kochkursen, Vorträgen und gemeinsamen Aktivitäten schaffen sie einen Treffpunkt für Austausch und Zusammenhalt. Dabei stehen regionale Kultur, Kreativität und das Miteinander im Mittelpunkt.',
    category: 'Gemeinschaft',
    contact: 'landfrauen@studernheim.de',
    quickFacts: [
      'Gemeinschaft und Austausch im Dorf',
      'Koch- und Backkurse',
      'Vorträge und Workshops',
      'Pflege von Tradition und Brauchtum',
      'Regelmäßige Treffen und Veranstaltungen'
    ]
  }
]

export const termine: Termin[] = [
  {
    id: '1',
    title: 'Frühjahrsputz im Dorf',
    date: '2026-04-12',
    time: '09:00 Uhr',
    location: 'Treffpunkt Dorfplatz',
    description: 'Gemeinsam machen wir unser Dorf frühlingsfit! Besen und Handschuhe werden gestellt.',
    organizer: 'SAG Studernheim'
  },
  {
    id: '2',
    title: 'Weinprobe im Wingert',
    date: '2026-06-20',
    time: '17:00 Uhr',
    location: 'Weinberge Studernheim',
    description: 'Genießen Sie pfälzische Weine inmitten unserer Weinberge.',
    organizer: 'Winzergemeinschaft'
  },
  {
    id: '3',
    title: 'Sommerfest',
    date: '2026-07-18',
    time: '15:00 Uhr',
    location: 'Dorfplatz',
    description: 'Unser großes Sommerfest mit Grill, Musik und Spaß für die ganze Familie.',
    organizer: 'Dorfgemeinschaft'
  },
  {
    id: '4',
    title: 'Studernheimer Kerwe',
    date: '2026-08-14',
    time: 'Ganztägig',
    location: 'Festplatz',
    description: 'Das Highlight des Jahres - unsere traditionelle Kerwe!',
    organizer: 'SAG Studernheim'
  }
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Schmidt',
    role: 'Einwohnerin seit 40 Jahren',
    content: 'Studernheim ist mehr als nur ein Dorf - es ist eine Familie. Die Gemeinschaft hier ist einzigartig, und man spürt bei jedem Fest, wie sehr die Menschen zusammenhalten.'
  },
  {
    id: '2',
    name: 'Thomas Wagner',
    role: 'Zugezogen 2015',
    content: 'Als wir nach Studernheim kamen, wurden wir sofort herzlich aufgenommen. Die Mischung aus Tradition und Moderne macht das Dorfleben hier so besonders.'
  },
  {
    id: '3',
    name: 'Sophie Müller',
    role: 'Jugendleiterin',
    content: 'Für unsere Jugend wird hier viel geboten. Die Vereine arbeiten Hand in Hand, und es ist schön zu sehen, wie engagiert alle für unser Dorf sind.'
  }
]

export const ortsverwaltungData = {
  address: 'Hauptstraße 1, 67376 Studernheim',
  phone: '06344 / 1234',
  email: 'info@studernheim.de',
  openingHours: [
    { day: 'Montag', hours: '8:00 - 12:00 Uhr' },
    { day: 'Dienstag', hours: '14:00 - 18:00 Uhr' },
    { day: 'Mittwoch', hours: '8:00 - 12:00 Uhr' },
    { day: 'Donnerstag', hours: '14:00 - 16:00 Uhr' },
    { day: 'Freitag', hours: 'Geschlossen' }
  ],
  services: [
    'Meldewesen & Ausweise',
    'Bauanträge & Genehmigungen',
    'Friedhofsverwaltung',
    'Vereinsförderung',
    'Ordnungsangelegenheiten',
    'Bürgersprechstunde'
  ],
  contacts: [
    { role: 'Ortsbürgermeister', name: 'Hans Becker', phone: '06344 / 1234-10' },
    { role: 'Verwaltung', name: 'Andrea Klein', phone: '06344 / 1234-11' },
    { role: 'Bauhof', name: 'Jürgen Hoffmann', phone: '06344 / 1234-20' }
  ]
}
