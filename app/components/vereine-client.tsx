'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  MessageCircle,
  Instagram,
  Facebook,
  ClipboardList
} from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

function getLinkMeta(url: string, text?: string) {
  const u = url.toLowerCase()

  if (u.includes('helferliste')) {
    return { label: text || 'Helferliste', icon: ClipboardList, className: 'bg-emerald-600 hover:bg-emerald-700 text-white' }
  }
  if (u.includes('wa.me') || u.includes('whatsapp')) {
    return { label: text || 'WhatsApp', icon: MessageCircle, className: 'bg-green-500 hover:bg-green-600 text-white' }
  }
  if (u.includes('instagram')) {
    return { label: text || 'Instagram', icon: Instagram, className: 'bg-pink-500 hover:bg-pink-600 text-white' }
  }
  if (u.includes('facebook')) {
    return { label: text || 'Facebook', icon: Facebook, className: 'bg-blue-600 hover:bg-blue-700 text-white' }
  }

  return { label: text || 'Website', icon: Globe, className: 'bg-gray-800 hover:bg-gray-900 text-white' }
}

export default function VereineClient({ vereine }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [pausedCards, setPausedCards] = useState<{ [key: string]: boolean }>({})
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})

  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 50

  // 🔥 Auto Slider
  useEffect(() => {
    if (!Array.isArray(vereine)) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const updated: any = { ...prev }

        vereine.forEach((verein: any) => {
          if (!verein?._id) return

          const images = Array.isArray(verein?.images)
            ? verein.images.filter(Boolean)
            : []

          if (pausedCards[verein._id]) return

          if (images.length > 1) {
            const current = prev[verein._id] || 0
            updated[verein._id] = (current + 1) % images.length
          }
        })

        return updated
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [vereine, pausedCards])

  // 👉 Swipe
  const handleSwipe = (vereinId: string, imagesLength: number, currentIndex: number) => {
    if (touchStart === null || touchEnd === null) return

    const distance = touchStart - touchEnd

    if (distance > minSwipeDistance) {
      setCurrentImageIndex((p) => ({
        ...p,
        [vereinId]: (currentIndex + 1) % imagesLength
      }))
    }

    if (distance < -minSwipeDistance) {
      setCurrentImageIndex((p) => ({
        ...p,
        [vereinId]: (currentIndex - 1 + imagesLength) % imagesLength
      }))
    }
  }

  const nextImage = () => {
    if (!lightboxImages) return
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
  }

  const prevImage = () => {
    if (!lightboxImages) return
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
  }

  return (
    <section id="vereine" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-3 md:px-4">

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Unsere <span className="text-green-600">Vereine</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.isArray(vereine) &&
            vereine.map((verein: any, index: number) => {
              if (!verein) return null

              const images = Array.isArray(verein.images)
                ? verein.images.filter((img: any) => typeof img === 'string')
                : []

              const currentIndex =
                images.length > 0
                  ? (currentImageIndex[verein._id] || 0) % images.length
                  : 0

              const isActive =
                hoveredCard === verein._id || pausedCards[verein._id]

              return (
                <motion.div
                  key={verein._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => {
                    setHoveredCard(verein._id)
                    setPausedCards((p) => ({ ...p, [verein._id]: true }))
                  }}
                  onMouseLeave={() => {
                    setHoveredCard(null)
                    setPausedCards((p) => ({ ...p, [verein._id]: false }))
                  }}
                  className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
                >

                  {/* Slider */}
                  <div
                    className="relative aspect-[4/3] bg-gray-100 overflow-hidden touch-pan-y"
                    onTouchStart={(e) => {
                      setTouchEnd(null)
                      setTouchStart(e.targetTouches[0].clientX)
                    }}
                    onTouchMove={(e) => {
                      setTouchEnd(e.targetTouches[0].clientX)
                    }}
                    onTouchEnd={() =>
                      handleSwipe(verein._id, images.length, currentIndex)
                    }
                  >
                    {images.length > 0 ? (
                      images.map((img: string, i: number) => (
                        <Image
                          key={i}
                          src={img}
                          alt={verein?.name || 'Verein'}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onClick={() => {
                            setLightboxImages(images)
                            setLightboxIndex(i)
                          }}
                          className={`absolute inset-0 object-cover object-top scale-105 transition-opacity duration-700 ${
                            i === currentIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        Kein Bild vorhanden
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5">

                    {verein?.region && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin size={14} />
                        {verein.region}
                      </div>
                    )}

                    <h3 className="font-bold text-lg mb-2">{verein?.name}</h3>

                    {verein?.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {verein.description}
                      </p>
                    )}

                    {/* QuickFacts */}
                    {isActive && Array.isArray(verein?.quickFacts) && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {verein.quickFacts.map((fact: any, i: number) => (
                          <span
                            key={i}
                            className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                          >
                            {fact}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Highlights */}
                    {Array.isArray(verein?.highlights) && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {verein.highlights.map((item: any, i: number) => {
                          if (!item?.url) return null
                          const meta = getLinkMeta(item.url, item.text)
                          const Icon = meta.icon

                          return (
                            <a
                              key={i}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition hover:scale-105 ${meta.className}`}
                            >
                              <Icon size={16} />
                              {meta.label}
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
