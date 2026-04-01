export default {
  name: 'verein',
  title: 'Vereine',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'category',
      title: 'Kategorie',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image'
    },

    // 👉 HIER NEU
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
      ]
    },

    {
      name: 'contact',
      title: 'Kontakt',
      type: 'object',
      fields: [
        { name: 'name', title: 'Ansprechpartner', type: 'string' },
        { name: 'email', title: 'E-Mail', type: 'string' },
        { name: 'phone', title: 'Telefon', type: 'string' }
      ]
    }
  ]
}
