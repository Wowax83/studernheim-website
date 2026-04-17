// /sanity/schemaTypes/verein.ts

export default {
  name: 'verein',
  title: 'Vereine',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text'
    },
    {
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [{ type: 'image' }]
    },

    // 🔥 QuickFacts
    {
      name: 'quickFacts',
      title: 'Quick Facts',
      type: 'array',
      of: [{ type: 'string' }]
    },

    // 🔥 Highlights (Buttons)
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
              type: 'string'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: Rule =>
                Rule.uri({
                  scheme: ['http', 'https']
                })
            }
          ]
        }
      ]
    }
  ]
}
