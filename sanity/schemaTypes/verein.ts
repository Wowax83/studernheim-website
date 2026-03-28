export default {
  name: 'verein',
  type: 'document',
  title: 'Verein',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'description', type: 'text', title: 'Beschreibung' },
    { name: 'category', type: 'string', title: 'Kategorie' },
    { name: 'contact', type: 'string', title: 'Kontakt' },
    { name: 'image', type: 'image', title: 'Bild' },
    {
      name: 'quickFacts',
      type: 'array',
      title: 'Highlights',
      of: [{ type: 'string' }]
    }
  ]
}
