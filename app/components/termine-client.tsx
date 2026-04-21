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
import { useState } from 'react'

/* 🔗 LINK META (aus Feste übernommen) */
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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('de-DE')
}

function getMonthLabel(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString('de-DE', {
    month: 'long',
    year: 'numeric',
  })
}

export default function TermineClient({ events }: { events: any[] }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  const sortedEvents = [...events]
    .filter(e => e.date)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const grouped = sortedEvents.reduce((acc: any, event: any) => {
    const key = getMonthLabel(event.date)
    if (!acc[key]) acc[key] = []
    acc[key].push(event)
    return acc
  }, {})

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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Aktuelle <span className="gradient-text">Termine</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(grouped).map(([month, monthEvents]: any, groupIndex) => (
            <div key={month}>

              {/* Monatsüberschrift */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: groupIndex * 0.1 }}
                className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-green-600 pl-4"
              >
                {month}
              </motion.h3>

              <div className="space-y-4">
                {monthEvents.map((event: any, index: number) => {
                  const dateObj = new Date(event.date)

                  return (
                    <motion.div
                      key={event._id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.05 }}
                      onMouseEnter={() => setHoveredEvent(event._id)}
                      onMouseLeave={() => setHoveredEvent(null)}
                      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex flex-col md:flex-row gap-6">

                        {/* Datum */}
                        <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex flex-col items-center justify-center text-white shadow-lg">
                          <div className="text-3xl font-bold">
                            {dateObj.getDate()}
                          </div>
                          <div className="text-xs uppercase">
                            {dateObj.toLocaleDateString('de-DE', { month: 'short' })}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">

                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-2xl font-bold text-gray-900">
                              {event.title}
                            </h3>

                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                              {event.type === 'fest' ? '🎉 Fest' : '📅 Termin'}
                            </span>
                          </div>

                          {event.description && (
                            <p className="text-gray-600 mb-4">
                              {event.description}
                            </p>
                          )}

                          {/* Details + Links */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-sm items-center">

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

                            {/* 🔥 ALLE LINKS ALS BUTTONS */}
                            {Array.isArray(event.highlights) && (
                              <div className="flex flex-wrap gap-2 col-span-full lg:col-span-1">
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
                                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition shadow-md ${meta.className}`}
                                    >
                                      <Icon size={16} />
                                      {meta.label}
                                    </a>
                                  )
                                })}
                              </div>
                            )}

                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
