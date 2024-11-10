import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, X } from 'lucide-react';

export default function Contact() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const letterVariants = {
    initial: {
      rotateX: 0,
      y: 0,
      scale: 1,
      opacity: 1
    },
    open: {
      rotateX: 180,
      y: -50,
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.5,
      }
    },
    exit: {
      rotateX: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-gray-900 py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          Click the envelope to reveal contact details
        </motion.p>

        <div className="flex justify-center items-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {!isLetterOpen ? (
              <motion.div
                key="letter"
                initial="initial"
                animate="initial"
                exit="open"
                variants={letterVariants}
                className="cursor-pointer"
                onClick={() => setIsLetterOpen(true)}
              >
                <div className="w-80 h-56 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-xl flex items-center justify-center">
                  <Mail className="text-white w-24 h-24" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                className="w-full max-w-2xl bg-gray-800/90 backdrop-blur-lg p-8 rounded-xl shadow-2xl"
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  onClick={() => setIsLetterOpen(false)}
                >
                  <X size={24} />
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="bg-blue-500/20 p-4 rounded-xl">
                        <Mail className="text-blue-400 w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg">Email</h3>
                        <a href="mailto:Anuirawtt@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                          Anuirawtt@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="bg-blue-500/20 p-4 rounded-xl">
                        <Phone className="text-blue-400 w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg">Phone</h3>
                        <a href="tel:+917050566412" className="text-gray-400 hover:text-blue-400 transition-colors">
                          +91 7050566412
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="bg-blue-500/20 p-4 rounded-xl">
                        <MapPin className="text-blue-400 w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg">Location</h3>
                        <p className="text-gray-400">
                          DEHRI ON SONE, ROHTASH, BIHAR
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Contact Form */}
                  <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    ></textarea>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white font-medium flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-indigo-600 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </motion.button>
                  </motion.form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}