'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, Clock, CheckCircle, User } from 'lucide-react'
import Image from 'next/image'
import { ortsverwaltungData } from '@/lib/data'

export default function Ortsverwaltung() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15
  })

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section
      id="ortsverwaltung"
      className="py-20 sm:py-28 bg-gradient-to-b from-white to-green-50/30 relative overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-green-100/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Ortsverwaltung</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Ihre Ansprechpartner für alle Anliegen rund um unser Dorf.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT */}
          <div className="space-y-6">
            
            {/* CONTACT */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ delay: 0.1 }}
              className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="text-green-600" size={26} />
                Kontakt
              </h3>

              <div className="space-y-4">
                {/* Adresse */}
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600">{ortsverwaltungData.address}</p>
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Telefon</p>
                    <a
                      href={`tel:${ortsverwaltungData.phone}`}
                      className="text-green-600 hover:text-green-800 transition"
                    >
                      {ortsverwaltungData.phone}
                    </a>
                  </div>
                </div>

                {/* Mail */}
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">E-Mail</p>
                    <a
                      href={`mailto:${ortsverwaltungData.email}`}
                      className="text-green-600 hover:text-green-800 transition"
                    >
                      {ortsverwaltungData.email}
                    </a>
                  </div>
                </div>

                {/* Ortsvorsteher */}
                <div className="flex items-start gap-3">
                  <User size={20} className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Ortsvorsteher</p>
                    <p className="text-gray-600">
                      Thomas Batke (FWG)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* OPENING HOURS */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="text-green-600" size={26} />
                Öffnungszeiten
              </h3>

              <div className="space-y-3">
                {ortsverwaltungData.openingHours.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="font-medium text-gray-900">{s.day}</span>
                    <span className="text-gray-600">{s.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            
            {/* SERVICES */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ delay: 0.3 }}
              className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-600" size={26} />
                Unsere Leistungen
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ortsverwaltungData.services.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-gray-700 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* TEAM */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ delay: 0.4 }}
              className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User className="text-green-600" size={26} />
                Ansprechpartner
              </h3>

              <div className="space-y-4">
                {ortsverwaltungData.contacts.map((c, i) => {
                  const isOrtsvorsteher = c.name === 'Thomas Batke'

                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300
                        ${isOrtsvorsteher 
                          ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg scale-[1.02]' 
                          : 'bg-green-50/60 hover:bg-green-50 hover:scale-[1.02]'
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold
                        ${isOrtsvorsteher 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gradient-to-br from-green-600 to-emerald-600 text-white'
                        }`}
                      >
                        {c.name.charAt(0)}
                      </div>

                      <div className="flex-1">
                        <p className={`font-medium ${isOrtsvorsteher ? 'text-white' : 'text-gray-900'}`}>
                          {c.name}
                        </p>

                        <p className={`text-sm mb-1 ${isOrtsvorsteher ? 'text-white/90' : 'text-gray-600'}`}>
                          {isOrtsvorsteher ? 'Ortsvorsteher (FWG)' : c.role}
                        </p>

                        <a
                          href={`tel:${c.phone}`}
                          className={`text-sm ${
                            isOrtsvorsteher 
                              ? 'text-white underline' 
                              : 'text-green-600 hover:text-green-800'
                          }`}
                        >
                          {c.phone}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
