'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Info } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function FesteClient({ feste }: any) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // 🔥 Bild-Slider State
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number
  }>({})

  // 🔄 Auto-Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const updated: any = { ...prev }

        feste?.forEach((fest: any) => {
          if (fest.images?.length > 1) {
            const current = prev[fest._id] || 0
            updated[fest._id] = (current + 1) % fest.images.length
          }
        })

        return updated
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [feste])

  return (
    <section
      id="feste"
      className="py-20 sm:py-28 bg-gradient-to-b from-green-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Unsere <span className="text-green-600">Feste</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Das ganze Jahr über feiern wir gemeinsam – traditionell,
            gesellig und mit viel Herzblut.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {feste?.map((fest: any, index: number) => {
            const currentIndex = currentImageIndex[fest._id] || 0
            const currentImage =
              fest.images && fest.images.length > 0
                ? fest.images[currentIndex]
                : null

            return (
              <motion.div
                key={fest._id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(fest._id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image / Slider */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {currentImage ? (
                    <Image
                      src={currentImage}
                      alt={fest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Kein Bild vorhanden
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Date Badge */}
                  {fest.date && (
                    <div className="absolute top-4 right-4 px-3 py-1 text-white text-sm bg-black/50 rounded-full flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(fest.date).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Region */}
                  {fest.region && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin size={14} />
                      {fest.region}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {fest.name}
                  </h3>

                  {/* Vibe */}
                  {fest.vibe && (
                    <p className="text-green-600 font-medium text-sm mb-3">
                      {fest.vibe}
                    </p>
                  )}

                  {/* Description */}
                  {fest.description && (
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {fest.description}
                    </p>
                  )}

                  {/* Quick Facts (Hover) */}
                  {hoveredCard === fest._id && fest.quickFacts && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-gray-200 pt-4 mt-4 space-y-2"
                    >
                      <div className="flex items-start gap-2 text-sm">
                        <Info size={16} className="text-green-600 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">
                            Highlights:
                          </p>
                          <ul className="space-y-1 text-gray-600">
                            {fest.quickFacts.map(
                              (fact: string, i: number) => (
                                <li key={i} className="text-xs">
                                  • {fact}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Organizer */}
                  {fest.organizer && (
                    <div className="text-xs text-gray-500 mt-4">
                      Veranstalter: {fest.organizer}
                    </div>
                  )}
                </div>

                {/* Shine Effekt */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
