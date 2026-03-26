'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Users, Sparkles, Calendar } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Mit Herz dabei',
    description: 'Wir organisieren und koordinieren alle wichtigen Veranstaltungen in Studernheim - von der Kerwe bis zum Weihnachtsmarkt.'
  },
  {
    icon: Users,
    title: 'Gemeinschaft stärken',
    description: 'Die SAG bringt Menschen zusammen und fördert das Miteinander aller Generationen in unserem Dorf.'
  },
  {
    icon: Sparkles,
    title: 'Tradition bewahren',
    description: 'Wir pflegen pfälzische Traditionen und schaffen gleichzeitig Raum für neue Ideen und Projekte.'
  },
  {
    icon: Calendar,
    title: 'Aktiv das ganze Jahr',
    description: 'Von Frühjahrsputz bis Silvester - die SAG sorgt für ein abwechslungsreiches Programm durch alle Jahreszeiten.'
  }
]

export default function SAG() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="sag" className="py-20 sm:py-28 bg-gradient-to-b from-white to-green-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Die <span className="gradient-text">SAG</span> Studernheim
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Die Studernheimer Arbeitsgemeinschaft ist das Herzstück unserer Dorfgemeinschaft. 
            Ehrenamtliches Engagement, das unser Dorf lebendig macht.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={28} />
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Mitmachen bei der SAG
          </button>
        </motion.div>
      </div>
    </section>
  )
}
