'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Info } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { feste } from '@/lib/data'

export default function Feste() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="feste" className="py-20 sm:py-28 bg-gradient-to-b from-green-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Unsere <span className="gradient-text">Feste</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Das ganze Jahr über feiern wir gemeinsam - traditionell, gesellig und mit viel Herzblut.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {feste.map((fest, index) => (
            <motion.div
              key={fest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(fest.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={fest.image}
                  alt={fest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Date Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 glass text-white text-sm font-medium rounded-full flex items-center gap-1">
                  <Calendar size={14} />
                  {fest.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin size={14} />
                  {fest.region}
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {fest.name}
                </h3>
                
                <p className="text-green-600 font-medium text-sm mb-3">
                  {fest.vibe}
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {fest.description}
                </p>

                {/* Quick Facts - Show on Hover */}
                {hoveredCard === fest.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 pt-4 mt-4 space-y-2"
                  >
                    <div className="flex items-start gap-2 text-sm">
                      <Info size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Quick Facts:</p>
                        <ul className="space-y-1 text-gray-600">
                          {fest.quickFacts?.map((fact, i) => (
                            <li key={i} className="text-xs">• {fact}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="text-xs text-gray-500 mt-4">
                  Veranstalter: {fest.organizer}
                </div>
              </div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
