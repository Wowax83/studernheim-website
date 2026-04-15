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

/* ---------------- ORTSVERWALTUNG ---------------- */

export interface Ortsverwaltung {
  address: string
  phone: string
  mobile: string
  email: string
  openingHours: { day: string; hours: string }[]
  officeHours: { day: string; hours: string }[]
  notes: string[]
}

/* ---------------- DATA ---------------- */

export const feste: Fest[] = [
  {
    id: '1',
    name: 'Studernheimer Kerwe',
    region: 'Festplatz Studernheim',
    vibe: 'Live-Musik • Festzelt • Dorfgemeinschaft',
    description: 'Die Kerwe ist das absolute Highlight des Jahres in Studernheim. Im festlich geschmückten Festzelt sorgt Live-Musik für beste Stimmung, während sich Freunde, Familien und Vereine zum gemeinsamen Feiern treffen.',
    date: 'August',
    image: '/images/kerwe.jpg',
    organizer: 'SAG Studernheim',
    quickFacts: [
      'Großes Festzelt mit Live-Bands',
      'Mehrere Tage Programm',
      'Treffpunkt für das ganze Dorf'
    ]
  }
]

export const vereine: Verein[] = [
  {
    id: '1',
    name: 'SAG Studernheim',
    description: 'Koordiniert Veranstaltungen und Projekte im Dorf.',
    category: 'Dorfgemeinschaft',
    contact: 'sag@studernheim.de'
  }
]

export const termine: Termin[] = [
  {
    id: '1',
    title: 'Frühjahrsputz im Dorf',
    date: '2026-04-12',
    time: '09:00 Uhr',
    location: 'Dorfplatz',
    description: 'Gemeinsam machen wir unser Dorf frühlingsfit.',
    organizer: 'SAG Studernheim'
  }
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Karl',
    role: 'Einwohner',
    content: 'Die Gemeinschaft hier ist einzigartig.'
  }
]

/* ---------------- ORTSVERWALTUNG DATA ---------------- */

export const ortsverwaltungData: Ortsverwaltung = {
  address: 'Frankenthaler Straße 4, 67227 Frankenthal - Studernheim',

  phone: '06233 42334',

  mobile: '0151 XXXXXXXX', // ← echte Nummer eintragen

  email: 'ortsvorsteher.studernheim@gmail.com',

  // Sprechstunden (Ortsvorsteher)
  openingHours: [
    { day: '1. Donnerstag im Monat', hours: '17:00 - 18:00 Uhr' },
    { day: '3. Donnerstag im Monat', hours: '20:00 - 21:00 Uhr' }
  ],

  // Verwaltung (Mitarbeiter vor Ort)
  officeHours: [
    { day: 'Donnerstag', hours: '09:00 - 12:00 Uhr' },
    { day: 'Donnerstag (flexibel)', hours: '13:00 - 16:00 Uhr' }
  ],

  // Hinweise
  notes: [
    'Sprechstunde nach vorheriger telefonischer Vereinbarung möglich',
    'Hausbesuche nach vorheriger Absprache möglich',
    'Während der Öffnungszeiten können Anliegen an die Stadt gestellt sowie gelbe Säcke abgeholt werden'
  ]
}
