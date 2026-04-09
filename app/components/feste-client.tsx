'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  MapPin,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function FesteClient({ feste }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [pausedCards, setPausedCards] = useState<{ [key: string]: boolean }>({})
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})

  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    if (!Array.isArray(feste)) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const updated: any = { ...prev }

        feste.forEach((fest: any) => {
          if (!fest?._id) return

          const images = Array.isArray(fest?.images)
            ? fest.images.filter(Boolean)
            : []

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

  const nextImage = () => {
    if (!lightboxImages) return
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
  }

  const prevImage = () => {
    if (!lightboxImages) return
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold">
            Unsere <span className="text-green-600">Feste</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(feste) &&
            feste.map((fest: any, index: number) => {
              if (!fest) return null

              const images = Array.isArray(fest.images)
                ? fest.images.filter((img: any) => typeof img === 'string')
                : []

              const currentIndex =
                images.length > 0
                  ? (currentImageIndex[fest._id] || 0) % images.length
                  : 0

              return (
                <motion.div
                  key={fest._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => {
                    if (!fest._id) return
                    setHoveredCard(fest._id)
                    setPausedCards((p) => ({ ...p, [fest._id]: true }))
                  }}
                  onMouseLeave={() => {
                    setHoveredCard(null)
                    if (!fest._id) return
                    setPausedCards((p) => ({ ...p, [fest._id]: false }))
                  }}
                  className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
                >

                  {/* Slider */}
                  <motion.div
                    className="relative aspect-[4/3] bg-gray-100"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      if (images.length < 2 || !fest._id) return

                      if (info.offset.x < -50) {
                        setCurrentImageIndex((p) => ({
                          ...p,
                          [fest._id]: (currentIndex + 1) % images.length
                        }))
                      }

                      if (info.offset.x > 50) {
                        setCurrentImageIndex((p) => ({
                          ...p,
                          [fest._id]: (currentIndex - 1 + images.length) % images.length
                        }))
                      }
                    }}
                  >
                    {images.length > 0 ? (
                      images.map((img: string, i: number) => (
                        <Image
                          key={i}
                          src={img}
                          alt={fest?.name || 'Fest'}
                          fill
                          onClick={() => {
                            setLightboxImages(images)
                            setLightboxIndex(i)
                          }}
                          className={`absolute inset-0 object-cover transition-opacity duration-700 ${
                            i === currentIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        Kein Bild vorhanden
                      </div>
                    )}

                    {fest?.date && (
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {new Date(fest.date).toLocaleDateString('de-DE', {
                          day: '2-digit',
                          month: 'short'
                        })}
                      </div>
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="p-5">

                    {fest?.region && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin size={14} />
                        {fest.region}
                      </div>
                    )}

                    <h3 className="font-bold text-lg mb-2">
                      {fest?.name || 'Unbenanntes Fest'}
                    </h3>

                    {fest?.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {fest.description}
                      </p>
                    )}

                    {/* Quick Facts */}
                    {hoveredCard === fest._id &&
                      Array.isArray(fest?.quickFacts) && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {fest.quickFacts.map((fact: any, i: number) => (
                            <span
                              key={i}
                              className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                            >
                              {fact}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* 🔥 Highlights (NEU) */}
                    {hoveredCard === fest._id &&
                      Array.isArray(fest?.highlights) &&
                      fest.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {fest.highlights.map((item: any, i: number) => {

                            if (typeof item === 'string') {
                              return (
                                <span key={i} className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                                  {item}
                                </span>
                              )
                            }

                            const url = item.url?.toLowerCase() || ''

                            let icon = '🔗'
                            let style = 'bg-gray-200 text-gray-700'
                            let label = item.text

                            if (url.includes('helferliste.online')) {
                              icon = '📝'
                              style = 'bg-emerald-600 text-white'
                              label = 'Helferliste'
                            } else if (url.startsWith('http')) {
                              icon = '🌐'
                              style = 'bg-blue-100 text-blue-700'
                            }

                            return (
                              <a
                                key={i}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-xs px-4 py-2 rounded-lg font-medium hover:scale-105 transition ${style}`}
                              >
                                {icon} {label}
                              </a>
                            )
                          })}
                        </div>
                      )}

                  </div>
                </motion.div>
              )
            })}
        </div>

        {/* Lightbox */}
        {lightboxImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

            <button onClick={() => setLightboxImages(null)} className="absolute top-5 right-5 text-white">
              <X size={32} />
            </button>

            <button onClick={prevImage} className="absolute left-5 text-white">
              <ChevronLeft size={32} />
            </button>

            <button onClick={nextImage} className="absolute right-5 text-white">
              <ChevronRight size={32} />
            </button>

            <Image
              src={lightboxImages[lightboxIndex]}
              alt="Bild"
              width={1400}
              height={900}
              className="max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  )
}
