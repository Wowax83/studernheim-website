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
  ClipboardList,
  Play
} from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useRef, memo } from 'react'

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
  const videoUrl = fest?.videoUrl

  // 🎬 Swiper-Medien = Bilder gefolgt von (optional) Video als synthetischer Slide
  type Slide = { kind: 'image'; url: string } | { kind: 'video'; url: string; poster?: string }
  const slides: Slide[] = [
    ...images.map((url: string): Slide => ({ kind: 'image', url })),
    ...(videoUrl ? [{ kind: 'video' as const, url: videoUrl, poster: images[0] }] : []),
  ]
  const slideCount = slides.length
  const [index, setIndex] = useState(0)

  // 🔥 SWIPE STATE
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const status = getFestStatus(fest)
  const currentSlide = slides[index] || null

  function handleSwipe() {
    if (touchStart === null || touchEnd === null) return
    if (slideCount <= 1) return

    const distance = touchStart - touchEnd

    if (Math.abs(distance) < 60) return

    if (distance > 0) {
      setIndex((i) => (i + 1) % slideCount)
    } else {
      setIndex((i) => (i - 1 + slideCount) % slideCount)
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

        {currentSlide?.kind === 'image' ? (
          <Image
            src={currentSlide.url}
            alt={fest?.name || 'Fest'}
            fill
            className="object-cover cursor-zoom-in"
            onClick={() => openLightbox(slides, index)}
          />
        ) : currentSlide?.kind === 'video' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <video
              key={currentSlide.url}
              src={currentSlide.url}
              controls
              preload="metadata"
              playsInline
              poster={currentSlide.poster}
              className="w-full h-full object-contain"
            >
              Dein Browser unterstützt das Video-Tag nicht.
            </video>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Kein Bild vorhanden
          </div>
        )}

        {/* 🎬 Video-Indikator im letzten Slide */}
        {currentSlide?.kind === 'video' && (
          <div className="absolute top-3 right-3 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded shadow flex items-center gap-1">
            ▶ Video
          </div>
        )}

        {/* Desktop Buttons */}
        {slideCount > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i - 1 + slideCount) % slideCount)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded z-20"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setIndex((i) => (i + 1) % slideCount)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded z-20"
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

  const [lightboxSlides, setLightboxSlides] = useState<any[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null)

  // ⏸ Pause video when slide changes or lightbox closes
  useEffect(() => {
    const v = lightboxVideoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }, [lightboxIndex, lightboxSlides])

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
              openLightbox={(slides: any[], index: number) => {
                setLightboxSlides(slides)
                setLightboxIndex(index)
              }}
            />
          ))}
        </div>

      </div>

      {/* LIGHTBOX */}
      {lightboxSlides && lightboxSlides.length > 0 && (() => {
        const slide = lightboxSlides[lightboxIndex]
        const slideCount = lightboxSlides.length
        const close = () => setLightboxSlides(null)
        const prev = () =>
          setLightboxIndex((i) => (i - 1 + slideCount) % slideCount)
        const next = () => setLightboxIndex((i) => (i + 1) % slideCount)
        return (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

            <button
              onClick={close}
              className="absolute top-5 right-5 text-white z-20"
              aria-label="Schliessen"
            >
              <X size={32} />
            </button>

            {slideCount > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-5 text-white z-20"
                  aria-label="Vorheriges"
                >
                  <ChevronLeft size={32} />
                </button>

                <button
                  onClick={next}
                  className="absolute right-5 text-white z-20"
                  aria-label="Naechstes"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {slide?.kind === 'image' ? (
              <Image
                src={slide.url}
                alt="Fest Bild"
                width={1600}
                height={1200}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            ) : slide?.kind === 'video' ? (
              <video
                ref={lightboxVideoRef}
                src={slide.url}
                controls
                preload="metadata"
                playsInline
                poster={slide.poster}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            ) : null}

            {/* 🎬 Video-Indikator + Play-Hinweis im Video-Slide */}
            {slide?.kind === 'video' && (
              <div className="absolute top-5 left-5 z-20 bg-black/70 text-white text-xs px-2 py-1 rounded shadow flex items-center gap-1">
                <Play size={12} /> Video
              </div>
            )}
          </div>
        )
      })()}
    </section>
  )
}
