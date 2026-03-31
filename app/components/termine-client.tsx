'use client'

export default function TermineClient({ events }: { events: any[] }) {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Termine</h2>

      <div className="space-y-4">
        {events.map((event) => {
          const dateObj = new Date(event.date)

          const day = dateObj.toLocaleDateString('de-DE', { day: '2-digit' })
          const month = dateObj.toLocaleDateString('de-DE', { month: 'short' })

          return (
            <div
              key={event._id}
              className="flex items-center gap-6 p-5 rounded-2xl bg-white shadow-md hover:shadow-lg transition"
            >
              {/* Datum Box */}
              <div className="bg-green-600 text-white rounded-xl px-4 py-3 text-center min-w-[70px]">
                <div className="text-2xl font-bold">{day}</div>
                <div className="text-xs uppercase">{month}</div>
              </div>

              {/* Inhalt */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {event.name || event.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {event.description || ''}
                </p>

                <div className="flex gap-6 text-sm text-gray-500 mt-2 flex-wrap">
                  <span>
                    📅 {dateObj.toLocaleDateString('de-DE')}
                  </span>

                  {event.type === 'fest' ? (
                    <span>🎉 Fest</span>
                  ) : (
                    <span>📅 Termin</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
