'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, User, Mail, Calendar, Users as UsersIcon, Heart, DollarSign, MessageSquare } from 'lucide-react'
import { useState, FormEvent } from 'react'
import Image from 'next/image'

const interests = [
  'Feste & Events',
  'Vereinsleben',
  'Wandern & Natur',
  'Kulinarik & Wein',
  'Dorfgeschichte',
  'Familienaktivitäten'
]

export default function ContactForm() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false)
      ;(e.target as HTMLFormElement).reset()
      setSelectedInterests([])
    }, 3000)
  }

  return (
    <section id="kontakt" className="py-20 sm:py-28 bg-gradient-to-b from-white to-green-50/30 relative">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <div className="relative w-full h-full">
          <Image
            src="https://cdn.abacus.ai/images/200c6305-6649-45ec-96a4-f771ca659063.png"
            alt="Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Kontaktieren Sie <span className="gradient-text">uns</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Sie haben Fragen oder möchten mehr über Studernheim erfahren? Wir freuen uns auf Ihre Nachricht!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={40} className="text-green-600" />
              </div>
              <h3 className="font-heading text-3xl font-bold text-gray-900 mb-4">
                Vielen Dank!
              </h3>
              <p className="text-gray-600 text-lg">
                Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Max Mustermann"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail *
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="max@beispiel.de"
                    />
                  </div>
                </div>
              </div>

              {/* Dates & Travelers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-2">
                    Geplanter Besuch
                  </label>
                  <div className="relative">
                    <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="dates"
                      name="dates"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="z.B. Juni 2026"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-2">
                    Anzahl Personen
                  </label>
                  <div className="relative">
                    <UsersIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      id="travelers"
                      name="travelers"
                      min="1"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="2"
                    />
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ihre Interessen
                </label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedInterests.includes(interest)
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (optional)
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    id="budget"
                    name="budget"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="low">Bis 500€</option>
                    <option value="medium">500€ - 1.000€</option>
                    <option value="high">1.000€ - 2.500€</option>
                    <option value="luxury">Über 2.500€</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Ihre Nachricht *
                </label>
                <div className="relative">
                  <MessageSquare size={20} className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder="Teilen Sie uns mit, wie wir Ihnen helfen können..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-heading font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Nachricht senden
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                * Pflichtfelder. Wir behandeln Ihre Daten vertraulich und geben sie nicht an Dritte weiter.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
