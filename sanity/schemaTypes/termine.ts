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

    // ✅ Typ (Fest oder Termin)
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

    // 🔥 IDENTISCH wie bei Vereinen
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

      // 👉 nur bei Fest anzeigen
      hidden: ({ document }: { document?: any }) => document?.type !== 'fest',
    },
  ],
}
