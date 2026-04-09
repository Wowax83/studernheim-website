'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('de-DE')
}

export default function TermineClient({ events }: { events: any[] }) {
  const { ref, inView } = useInView({ triggerOnce: true })

  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  return (
    <section id="termine" className="py-20 sm:py-28 bg-gradient-to-b from-emerald-50/30 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Aktuelle <span className="gradient-text">Termine</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Verpassen Sie keine Veranstaltung - hier finden Sie alle kommenden Termine auf einen Blick.
          </p>
        </motion.div>

        {/* Liste */}
        <div className="space-y-4">
          {events.map((event, index) => {
            const dateObj = new Date(event.date)

            return (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredEvent(event._id)}
                onMouseLeave={() => setHoveredEvent(null)}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col md:flex-row gap-6">

                  {/* Datum Box */}
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex flex-col items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <div className="text-3xl font-bold">
                      {dateObj.getDate()}
                    </div>
                    <div className="text-xs uppercase">
                      {dateObj.toLocaleDateString('de-DE', { month: 'short' })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    
                    {/* Titel + Typ */}
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-heading text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {event.name || event.title}
                      </h3>

                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                        {event.type === 'fest' ? '🎉 Fest' : '📅 Termin'}
                      </span>
                    </div>

                    {/* Beschreibung */}
                    {event.description && (
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {event.description}
                      </p>
                    )}

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">

                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} className="text-green-600" />
                        <span>{formatDate(event.date)}</span>
                      </div>

                      {event.time && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={16} className="text-green-600" />
                          <span>{event.time}</span>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={16} className="text-green-600" />
                          <span>{event.location}</span>
                        </div>
                      )}

                      {event.organizer && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <User size={16} className="text-green-600" />
                          <span>{event.organizer}</span>
                        </div>
                      )}
                    </div>

                    {/* 🔥 Highlights (nur bei Hover + nur bei Festen) */}
                    {hoveredEvent === event._id &&
                      event.type === 'fest' &&
                      event.highlights && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="border-t border-gray-200 pt-4 mt-4 flex flex-wrap gap-2"
                        >
                          {event.highlights.map((item: any, i: number) =>
                            item.url ? (
                              <a
                                key={i}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition"
                              >
                                {item.text}
                              </a>
                            ) : (
                              <span
                                key={i}
                                className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                              >
                                {item.text}
                              </span>
                            )
                          )}
                        </motion.div>
                      )}

                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Sie möchten keine Termine verpassen?
          </p>
          <button
            onClick={() =>
              document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Newsletter abonnieren
          </button>
        </motion.div>
      </div>
    </section>
  )
}
