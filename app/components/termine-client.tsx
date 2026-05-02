'use client'

import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Globe,
  MessageCircle,
  Instagram,
  Facebook,
  ClipboardList
} from 'lucide-react'
import { useInView } from 'react-intersection-observer'

/* 🔗 LINK META */
function getLinkMeta(url: string, text?: string) {
  const u = url.toLowerCase()

  if (u.includes('helferliste')) {
    return { label: text || 'Helferliste', icon: ClipboardList, className: 'bg-emerald-600 text-white' }
  }
  if (u.includes('wa.me') || u.includes('whatsapp')) {
    return { label: text || 'WhatsApp', icon: MessageCircle, className: 'bg-green-500 text-white' }
  }
  if (u.includes('instagram')) {
    return { label: text || 'Instagram', icon: Instagram, className: 'bg-pink-500 text-white' }
  }
  if (u.includes('facebook')) {
    return { label: text || 'Facebook', icon: Facebook, className: 'bg-blue-600 text-white' }
  }

  return { label: text || 'Website', icon: Globe, className: 'bg-gray-800 text-white' }
}

/* 🔥 HELPERS */

function getEventRange(event: any) {
  const start = new Date(event.startDate || event.date)
  const end = event.endDate ? new Date(event.endDate) : start
  return { start, end }
}

function getEventStatus(event: any) {
  const now = new Date()
  const { start, end } = getEventRange(event)

  if (now >= start && now <= end) return 'live'
  if (now < start) return 'upcoming'
  return 'past'
}

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('de-DE')
}

/* ---------------- COMPONENT ---------------- */

export default function TermineClient({ events }: { events: any[] }) {
  const { ref, inView } = useInView({ triggerOnce: true })

  const now = new Date()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 🔥 FILTER + SORT + LIMIT
  const filteredEvents = [...events]
    .filter(e => {
      const { start, end } = getEventRange(e)

      // anzeigen wenn:
      // - läuft gerade
      // - oder heute / zukünftig
      return end >= now || start >= today
    })
    .sort((a, b) => {
      const aStatus = getEventStatus(a)
      const bStatus = getEventStatus(b)

      const order = {
        live: 0,
        upcoming: 1,
        past: 2
      }

      if (order[aStatus] !== order[bStatus]) {
        return order[aStatus] - order[bStatus]
      }

      return new Date(a.startDate || a.date).getTime() -
             new Date(b.startDate || b.date).getTime()
    })
    .slice(0, 4) // 🔥 nur 4 anzeigen

  return (
    <section id="termine" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold">
            Aktuelle <span className="text-green-600">Termine</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {filteredEvents.map((event: any) => {
            const { start } = getEventRange(event)
            const status = getEventStatus(event)

            return (
              <div
                key={event._id}
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row gap-4">

                  {/* Datum */}
                  <div className="w-20 h-20 bg-green-600 text-white rounded-lg flex flex-col items-center justify-center">
                    <div className="text-xl font-bold">{start.getDate()}</div>
                    <div className="text-xs">
                      {start.toLocaleDateString('de-DE', { month: 'short' })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">

                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{event.title}</h3>

                      {status === 'live' && (
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                          🔥 Heute
                        </span>
                      )}
                    </div>

                    {event.description && (
                      <p className="text-gray-600 mb-3">
                        {event.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">

                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(event.startDate || event.date)}
                      </div>

                      {event.time && (
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {event.time}
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {event.location}
                        </div>
                      )}

                      {event.organizer && (
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {event.organizer}
                        </div>
                      )}
                    </div>

                    {/* Links */}
                    {Array.isArray(event.highlights) && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {event.highlights.map((item: any, i: number) => {
                          if (!item?.url) return null

                          const meta = getLinkMeta(item.url, item.text)
                          const Icon = meta.icon

                          return (
                            <a
                              key={i}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${meta.className}`}
                            >
                              <Icon size={14} />
                              {meta.label}
                            </a>
                          )
                        })}
                      </div>
                    )}

                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
