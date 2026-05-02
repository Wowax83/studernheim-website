export default {
  name: 'termine',
  title: 'Termine',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },

    // 🔥 NEU: echtes Datum + Uhrzeit
    {
      name: 'startDate',
      title: 'Startdatum & Uhrzeit',
      type: 'datetime',
    },

    {
      name: 'endDate',
      title: 'Enddatum & Uhrzeit',
      type: 'datetime',
    },

    // 🔥 Fallback (für alte Daten)
    {
      name: 'date',
      title: 'Datum (Fallback)',
      type: 'datetime',
      description: 'Nur verwenden, wenn kein Startdatum gesetzt ist',
    },

    // ❌ ALT (nicht mehr nötig)
    // time wird nicht mehr gebraucht, weil datetime alles kann

    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
    },
    {
      name: 'location',
      title: 'Ort',
      type: 'string',
    },

    // ✅ Typ (Termin oder Fest)
    {
      name: 'type',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Termin', value: 'termin' },
          { title: 'Fest', value: 'fest' },
        ],
        layout: 'radio',
      },
      initialValue: 'termin',
    },

    // 🔥 Highlights (nur bei Fest sichtbar)
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'text',
              subtitle: 'url'
            }
          },
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string'
            },
            {
              name: 'url',
              title: 'Link',
              type: 'url'
            }
          ]
        }
      ],
      hidden: ({ document }: { document?: any }) => document?.type !== 'fest',
    },
  ],
}
