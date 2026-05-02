export default {
  name: 'fest',
  type: 'document',
  title: 'Fest',

  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },

    {
      name: 'slug',
      type: 'slug',
      options: { source: 'name' }
    },

    {
      name: 'description',
      type: 'text',
      title: 'Beschreibung'
    },

    // 🔥 NEU: START
    {
      name: 'startDate',
      title: 'Start (Datum & Uhrzeit)',
      type: 'datetime',
      description: 'Wann beginnt das Fest?',
      validation: Rule => Rule.required()
    },

    // 🔥 NEU: ENDE
    {
      name: 'endDate',
      title: 'Ende (Datum & Uhrzeit)',
      type: 'datetime',
      description: 'Wann endet das Fest?',
      validation: Rule =>
        Rule.required().custom((end, context) => {
          const start = context.document?.startDate
          if (!start || !end) return true
          return new Date(end) > new Date(start)
            ? true
            : 'Ende muss nach Start liegen'
        })
    },

    // 🔥 OPTIONAL (für alte Daten)
    {
      name: 'date',
      title: 'Fallback Datum',
      type: 'datetime',
      description: 'Nur verwenden wenn kein Start/Ende gesetzt ist'
    },

    {
      name: 'region',
      type: 'string',
      title: 'Ort'
    },

    {
      name: 'vibe',
      type: 'string',
      title: 'Stimmung / Vibe'
    },

    {
      name: 'organizer',
      type: 'string',
      title: 'Veranstalter'
    },

    // 🔥 Bilder
    {
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },

    {
      name: 'image',
      type: 'image',
      title: 'Fallback Bild',
      hidden: true
    },

    // 🔥 Badges
    {
      name: 'quickFacts',
      title: 'Kurzinfos',
      type: 'array',
      of: [{ type: 'string' }]
    },

    // 🔥 Links
    {
      name: 'highlights',
      title: 'Links / Highlights',
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
            { name: 'text', type: 'string', title: 'Text' },
            { name: 'url', type: 'url', title: 'Link' }
          ]
        }
      ]
    }
  ]
}
