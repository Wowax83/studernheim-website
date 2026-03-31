'use client'

export default function TermineClient({ events }: { events: any[] }) {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Termine</h2>

      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="p-5 rounded-xl border bg-white/80 backdrop-blur hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">
              {event.name || event.title}
            </h3>

            <p className="text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString('de-DE')}
            </p>

            <span className="text-xs mt-2 inline-block">
              {event.type === 'fest' ? '🎉 Fest' : '📅 Termin'}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
