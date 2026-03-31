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
  ],
}
