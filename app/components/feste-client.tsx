'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Info, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function FesteClient({ feste }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const [pausedCards, setPausedCards] = useState<{ [key: string]: boolean }>({})
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})

  // 🔥 Lightbox State
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // 🔄 Auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const updated: any = { ...prev }

        feste?.forEach((fest: any) => {
          const images = Array.isArray(fest.images) ? fest.images.filter(Boolean) : []
          if (pausedCards[fest._id]) return

          if (images.length > 1) {
            const current = prev[fest._id] || 0
            updated[fest._id] = (current + 1) % images.length
          }
        })

        return updated
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [feste, pausedCards])

  // 🔥 Swipe Handler
  const handleSwipe = (festId: string, direction: number, length: number) => {
    setCurrentImageIndex((prev) => {
      const current = prev[festId] || 0
      const next = (current + direction + length) % length
      return { ...prev, [festId]: next }
    })
  }

  return (
    <section id="feste" className="py-20 sm:py-28 bg-gradient-to-b from-green-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Unsere <span className="text-green-600">Feste</span></h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feste?.map((fest: any, index: number) => {
            const images = Array.isArray(fest.images) ? fest.images.filter(Boolean) : []
            const currentIndex = images.length > 0 ? (currentImageIndex[fest._id] || 0) % images.length : 0

            return (
              <motion.div
                key={fest._id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setPausedCards((p) => ({ ...p, [fest._id]: true }))}
                onMouseLeave={() => setPausedCards((p) => ({ ...p, [fest._id]: false }))}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >

                {/* 🔥 Swipe + Slider */}
                <motion.div
                  className="relative aspect-[4/3]"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (images.length < 2) return
                    if (info.offset.x < -50) handleSwipe(fest._id, 1, images.length)
                    if (info.offset.x > 50) handleSwipe(fest._id, -1, images.length)
                  }}
                >
                  {images.map((img: string, i: number) => (
                    <Image
                      key={i}
                      src={img}
                      alt=""
                      fill
                      onClick={() => {
                        setLightboxImages(images)
                        setLightboxIndex(i)
                      }}
                      className={`absolute inset-0 object-cover transition-opacity duration-700 ${
                        i === currentIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}

                  {/* Datum */}
                  {fest.date && (
                    <div className="absolute top-3 right-3 z-20 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {new Date(fest.date).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </div>
                  )}
                </motion.div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold">{fest.name}</h3>
                  <p className="text-sm text-gray-600">{fest.description}</p>
                </div>

              </motion.div>
            )
          })}
        </div>

        {/* 🔥 LIGHTBOX */}
        {lightboxImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

            <button
              onClick={() => setLightboxImages(null)}
              className="absolute top-5 right-5 text-white"
            >
              <X size={32} />
            </button>

            <Image
              src={lightboxImages[lightboxIndex]}
              alt=""
              width={1200}
              height={800}
              className="object-contain max-h-[90vh]"
            />

          </div>
        )}
      </div>
    </section>
  )
}
