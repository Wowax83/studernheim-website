'use client'

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
import { useState, memo } from 'react'

/* ---------------- HELPERS ---------------- */

function getEventDate(fest: any) {
  return new Date(fest.startDate || fest.date)
}

function getFestRange(fest: any) {
  if (fest.startDate && fest.endDate) {
    return {
      start: new Date(fest.startDate),
      end: new Date(fest.endDate)
    }
  }

  const base = getEventDate(fest)

  const start = new Date(base)
  start.setHours(0, 0, 0, 0)

  const end = new Date(base)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

function getFestStatus(fest: any) {
  const now = new Date()
  const { start, end } = getFestRange(fest)

  const recentEnd = new Date(end)
  recentEnd.setDate(recentEnd.getDate() + 7)

  if (now >= start && now <= end) return 'live'
  if (now > end && now <= recentEnd) return 'recent'
  if (now < start) return 'upcoming'
  return 'past'
}

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

/* ---------------- FEST CARD ---------------- */

const FestCard = memo(function FestCard({ fest, openLightbox }: any) {
  const images = fest?.images || []
  const [index, setIndex] = useState(0)

  // 🔥 SWIPE STATE
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const status = getFestStatus(fest)
  const currentImage = images[index]

  function handleSwipe() {
    if (touchStart === null || touchEnd === null) return
    if (images.length <= 1) return

    const distance = touchStart - touchEnd

    if (Math.abs(distance) < 60) return

    if (distance > 0) {
      setIndex((i) => (i + 1) % images.length)
    } else {
      setIndex((i) => (i - 1 + images.length) % images.length)
    }
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">

      {/* 🔥 IMAGE WRAPPER (FIXED) */}
      <div
        className="relative aspect-[4/3] bg-gray-100 overflow-hidden"
        style={{ touchAction: 'pan-y' }} // 🔥 entscheidend!
        onTouchStart={(e) => {
          setTouchEnd(null)
          setTouchStart(e.targetTouches[0].clientX)
        }}
        onTouchMove={(e) => {
          setTouchEnd(e.targetTouches[0].clientX)
        }}
        onTouchEnd={handleSwipe}
      >

        {/* BADGES */}
        {status === 'live' && (
          <div className="absolute top-3 left-3 z-10 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
            🎉 Läuft gerade
          </div>
        )}

        {status === 'recent' && (
          <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
            🔥 Kürzlich
          </div>
        )}

        {status === 'upcoming' && (
          <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
            ⏳ Bald
          </div>
        )}

        {currentImage ? (
          <Image
            src={currentImage}
            alt={fest?.name || 'Fest'}
            fill
            className="object-cover cursor-zoom-in"
            onClick={() => openLightbox(images, index)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Kein Bild vorhanden
          </div>
        )}

        {/* Desktop Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4">

        {fest?.region && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <MapPin size={14} />
            {fest.region}
          </div>
        )}

        <h3 className="font-bold text-lg mb-2">{fest?.name}</h3>

        {fest?.description && (
          <p className="text-gray-600 text-sm mb-3">
            {fest.description}
          </p>
        )}

        {Array.isArray(fest?.quickFacts) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {fest.quickFacts.map((fact: any, i: number) => (
              <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                {fact}
              </span>
            ))}
          </div>
        )}

        {Array.isArray(fest?.highlights) && (
          <div className="flex flex-wrap gap-2">
            {fest.highlights.map((item: any, i: number) => {
              if (!item?.url) return null
              const meta = getLinkMeta(item.url, item.text)
              const Icon = meta.icon

              return (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg shadow ${meta.className}`}
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
  )
})

/* ---------------- MAIN ---------------- */

export default function FesteClient({ feste }: any) {
  const [ref, inView] = useInView({ triggerOnce: true })

  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const sortedFeste = [...(feste || [])].sort((a, b) => {
    const aStatus = getFestStatus(a)
    const bStatus = getFestStatus(b)

    const order = {
      live: 0,
      recent: 1,
      upcoming: 2,
      past: 3
    }

    if (order[aStatus] !== order[bStatus]) {
      return order[aStatus] - order[bStatus]
    }

    return getEventDate(a).getTime() - getEventDate(b).getTime()
  })

  return (
    <section id="feste" className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div ref={ref} className={`text-center mb-10 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-5xl font-bold">
            Unsere <span className="text-green-600">Feste</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFeste.map((fest: any) => (
            <FestCard
              key={fest._id}
              fest={fest}
              openLightbox={(images: string[], index: number) => {
                setLightboxImages(images)
                setLightboxIndex(index)
              }}
            />
          ))}
        </div>

      </div>

      {/* LIGHTBOX */}
      {lightboxImages && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

          <button
            onClick={() => setLightboxImages(null)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={32} />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((i) =>
                (i - 1 + lightboxImages.length) % lightboxImages.length
              )
            }
            className="absolute left-5 text-white"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((i) =>
                (i + 1) % lightboxImages.length
              )
            }
            className="absolute right-5 text-white"
          >
            <ChevronRight size={32} />
          </button>

          <Image
            src={lightboxImages[lightboxIndex]}
            alt="Bild"
            width={1200}
            height={800}
            className="max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  )
}
