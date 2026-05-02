const FestCard = memo(function FestCard({ fest, openLightbox }: any) {
  const images = fest?.images || []

  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isInteracting, setIsInteracting] = useState(false)

  const minSwipeDistance = 50

  /* ---------------- SWIPE ---------------- */

  function handleSwipe() {
    if (touchStart === null || touchEnd === null) return
    if (images.length <= 1) return

    const distance = touchStart - touchEnd

    if (distance > minSwipeDistance) {
      setIndex((i) => (i + 1) % images.length)
    }

    if (distance < -minSwipeDistance) {
      setIndex((i) => (i - 1 + images.length) % images.length)
    }
  }

  /* ---------------- AUTO SLIDE ---------------- */

  useEffect(() => {
    if (images.length <= 1) return
    if (isInteracting) return

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length, isInteracting])

  const currentImage = images[index]

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">

      {/* 🔥 IMAGE WRAPPER */}
      <div
        className="relative aspect-[4/3] bg-gray-100 overflow-hidden touch-pan-y"
        onTouchStart={(e) => {
          setTouchEnd(null)
          setTouchStart(e.targetTouches[0].clientX)
          setIsInteracting(true)
        }}
        onTouchMove={(e) => {
          setTouchEnd(e.targetTouches[0].clientX)
        }}
        onTouchEnd={() => {
          handleSwipe()
          setTimeout(() => setIsInteracting(false), 1500)
        }}
      >

        {/* 🔥 IMAGE */}
        {currentImage ? (
          <motion.div
            key={index}
            initial={{ opacity: 0.3, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage}
              alt={fest?.name || 'Fest'}
              fill
              className="object-cover cursor-zoom-in"
              onClick={() => openLightbox(images, index)}
            />
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Kein Bild vorhanden
          </div>
        )}

        {/* 🔥 ARROWS (Desktop) */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded opacity-80 hover:opacity-100"
            >
              ‹
            </button>

            <button
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded opacity-80 hover:opacity-100"
            >
              ›
            </button>
          </>
        )}

        {/* 🔥 DOTS */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition ${
                  i === index
                    ? 'bg-white scale-110'
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* 🔥 CONTENT */}
      <div className="p-4">

        {fest?.region && (
          <div className="text-sm text-gray-500 mb-1">
            📍 {fest.region}
          </div>
        )}

        <h3 className="font-bold text-lg mb-2">{fest?.name}</h3>

        {fest?.description && (
          <p className="text-gray-600 text-sm mb-3">
            {fest.description}
          </p>
        )}

      </div>
    </div>
  )
})
