'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import { termine } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export default function Termine() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="termine" className="py-20 sm:py-28 bg-gradient-to-b from-emerald-50/30 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Aktuelle <span className="gradient-text">Termine</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Verpassen Sie keine Veranstaltung - hier finden Sie alle kommenden Termine auf einen Blick.
          </p>
        </motion.div>

        <div className="space-y-4">
          {termine.map((termin, index) => (
            <motion.div
              key={termin.id}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Date Box */}
                <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex flex-col items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <div className="text-3xl font-bold">
                    {new Date(termin.date).getDate()}
                  </div>
                  <div className="text-xs uppercase">
                    {new Date(termin.date).toLocaleDateString('de-DE', { month: 'short' })}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {termin.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {termin.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} className="text-green-600" />
                      <span>{formatDate(termin.date)}</span>
                    </div>
                    
                    {termin.time && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} className="text-green-600" />
                        <span>{termin.time}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} className="text-green-600" />
                      <span>{termin.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={16} className="text-green-600" />
                      <span>{termin.organizer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
            onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Newsletter abonnieren
          </button>
        </motion.div>
      </div>
    </section>
  )
}
