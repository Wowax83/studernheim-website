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
    {
      name: 'date',
      title: 'Datum',
      type: 'date',
    },
    {
      name: 'time',
      title: 'Uhrzeit',
      type: 'string',
    },
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

    // ✅ NEU: Typ (Fest oder normaler Termin)
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

    // ✅ NEU: Highlights (wie Vereine)
    {
      name: 'highlights',
      title: 'Highlights / Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
            {
              name: 'url',
              title: 'Link',
              type: 'url',
            },
          ],
        },
      ],

      // 🔥 Optional: nur anzeigen wenn Fest
      hidden: ({ document }) => document?.type !== 'fest',
    },
  ],
}
