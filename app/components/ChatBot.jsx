'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m Mr. Light 100. I can answer questions about Daniel\'s skills, projects, work experience, and education. What would you like to know?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const [isCompact, setIsCompact] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [navIsOpen, setNavIsOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Keep a reliable viewport unit for mobile (handles keyboard on Android/Samsung)
  useEffect(() => {
    const setVh = () => {
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`)
    }

    // When viewport changes (keyboard opens/closes), update and scroll
    const onVResize = () => {
      setVh()
      if (isOpen) setTimeout(scrollToBottom, 220)
    }

    setVh()
    window.addEventListener('resize', setVh)
    window.addEventListener('orientationchange', setVh)
    if (window.visualViewport) window.visualViewport.addEventListener('resize', onVResize)

    return () => {
      window.removeEventListener('resize', setVh)
      window.removeEventListener('orientationchange', setVh)
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', onVResize)
    }
  }, [isOpen])

  // Detect very narrow screens or landscape with low height and enable compact/fullscreen chat
  useEffect(() => {
    const checkCompact = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const isNarrow = w <= 360
      const isLandscapeCompact = w > h && h <= 420
      setIsCompact(isNarrow || isLandscapeCompact)
    }

    checkCompact()
    window.addEventListener('resize', checkCompact)
    window.addEventListener('orientationchange', checkCompact)
    if (window.visualViewport) window.visualViewport.addEventListener('resize', checkCompact)

    return () => {
      window.removeEventListener('resize', checkCompact)
      window.removeEventListener('orientationchange', checkCompact)
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', checkCompact)
    }
  }, [])

  // Detect general mobile viewport (phones/tablets narrow screens)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const setMobile = () => setIsMobile(mq.matches)
    setMobile()
    try { mq.addEventListener('change', setMobile) } catch { mq.addListener(setMobile) }
    return () => { try { mq.removeEventListener('change', setMobile) } catch { mq.removeListener(setMobile) } }
  }, [])

  // Measure navbar height so the chat doesn't overlap it in landscape
  useEffect(() => {
    const measureNav = () => {
      const nav = document.querySelector('nav')
      const h = nav ? nav.getBoundingClientRect().height : 0
      setNavHeight(h)
    }

    measureNav()
    window.addEventListener('resize', measureNav)
    window.addEventListener('orientationchange', measureNav)
    return () => {
      window.removeEventListener('resize', measureNav)
      window.removeEventListener('orientationchange', measureNav)
    }
  }, [])

  // Close chat when the mobile nav opens so they don't overlap
  useEffect(() => {
    const handleNavOpen = () => {
      setIsOpen(false)
      setNavIsOpen(true)
    }
    const handleNavClose = () => setNavIsOpen(false)

    window.addEventListener('nav:opened', handleNavOpen)
    window.addEventListener('nav:closed', handleNavClose)
    return () => {
      window.removeEventListener('nav:opened', handleNavOpen)
      window.removeEventListener('nav:closed', handleNavClose)
    }
  }, [])

  // Show preview bubble on initial load
  useEffect(() => {
    const hasSeenPreview = sessionStorage.getItem('chatbot-preview-seen')
    if (!hasSeenPreview) {
      const timer = setTimeout(() => {
        setShowPreview(true)
      }, 1500) // Show after 1.5 seconds
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClosePreview = () => {
    setShowPreview(false)
    sessionStorage.setItem('chatbot-preview-seen', 'true')
  }

  const handleOpenFromPreview = () => {
    setShowPreview(false)
    setIsOpen(true)
    sessionStorage.setItem('chatbot-preview-seen', 'true')
  }

  // Compute compact vs normal styles to keep S8+ and similar devices from covering too much
  const getContainerStyles = () => {
    const viewportOffsetTop = typeof window !== 'undefined' ? (window.visualViewport?.offsetTop || 0) : 0
    const topOffset = navHeight + viewportOffsetTop + 12
    // Make compact maxHeight smaller to avoid covering most of the screen on tall-density devices
    const compactMaxHeightPx = navHeight + 180
    const normalMaxHeight = 'calc(var(--vh, 1vh) * 100 - 140px)'

    const compact = {
      // bottom-sheet style for compact/mobile
      left: '12px',
      right: '12px',
      bottom: `calc(env(safe-area-inset-bottom, 0px) + 8px)`,
      // use a fixed-ish height (vh-aware) so different phones look consistent
      height: 'min(55vh, calc(var(--vh, 1vh) * 60))',
      maxHeight: `calc(var(--vh, 1vh) * 100 - ${navHeight + 32}px)`,
      top: `auto`
    }

    const normal = {
      bottom: 'calc(12px + env(safe-area-inset-bottom))',
      maxHeight: normalMaxHeight
    }

    // Use mobile bottom-sheet style when on mobile OR compact small screens
    return (isMobile || isCompact) ? compact : normal
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages })
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again or use the contact form.' }])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I\'m having trouble connecting. Please try the contact form instead.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen || navIsOpen ? 'hidden' : 'fixed bottom-6 right-6'} z-50 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl border-2 border-purple-200 cursor-pointer`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Image src={assets.light100} alt='Mr. Light 100' className='w-12 h-12 object-contain' />
      </motion.button>

      {/* Preview Chat Bubble */}
      <AnimatePresence>
        {showPreview && !isOpen && !navIsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className='fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl p-4 max-w-xs border border-gray-200'
          >
            <div className='flex justify-between items-start mb-3'>
              <div className='flex items-center gap-2'>
                <Image src={assets.light100} alt='Mr. Light 100' className='w-8 h-8 bg-purple-100 rounded-full p-1' />
                <h4 className='font-semibold text-gray-900 text-sm'>Mr. Light 100</h4>
              </div>
              <button
                onClick={handleClosePreview}
                className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
              >
                ✕
              </button>
            </div>
            <p className='text-gray-700 text-sm mb-4 leading-relaxed'>
              Hi! 👋 I'm your AI assistant. I can help you learn about Daniel's skills, projects, work experience, and education. Ask me anything!
            </p>
            <div className='flex gap-2'>
              <button
                onClick={handleClosePreview}
                className='flex-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer'
              >
                Maybe Later
              </button>
              <button
                onClick={handleOpenFromPreview}
                className='flex-1 btn text-sm cursor-pointer'
              >
                Let's Chat!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={
              `z-[9999] ${isMobile || isCompact ? 'fixed left-3 right-3 rounded-t-2xl' : 'fixed inset-x-4 sm:right-6 sm:left-auto sm:w-96 rounded-2xl'} ` +
              `${isMobile || isCompact ? 'mx-0' : ''} bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-200`
            }
            style={{ ...getContainerStyles(), borderRadius: isMobile || isCompact ? '16px 16px 12px 12px' : undefined }}
          >
            {/* Header */}
            <div className='bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4 flex items-center justify-between' style={isCompact ? { paddingTop: 'env(safe-area-inset-top, 12px)', minHeight: '56px' } : { minHeight: '56px' }}>
              <div className='flex items-center gap-3'>
                <Image src={assets.light100} alt='Mr. Light 100' className='w-10 h-10 bg-white rounded-full p-1' />
                <div>
                  <h3 className='font-semibold text-lg'>Mr. Light 100</h3>
                  <p className='text-xs text-purple-100'>AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer'
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50' style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200'
                    }`}
                  >
                    <p className='text-sm leading-relaxed'>{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className='flex justify-start'>
                  <div className='bg-white text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none shadow-sm border border-gray-200'>
                    <div className='flex space-x-2'>
                      <div className='w-2 h-2 bg-purple-600 rounded-full animate-bounce'></div>
                      <div className='w-2 h-2 bg-purple-600 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
                      <div className='w-2 h-2 bg-purple-600 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className='p-4 bg-white border-t border-gray-200'>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setTimeout(scrollToBottom, 300)}
                  placeholder='Ask about skills, projects...'
                  className='flex-1 px-4 py-2 border-2 border-gray-300 rounded-full outline-none focus:border-purple-400 transition-colors text-gray-900 text-sm'
                  disabled={isLoading}
                />
                <button
                  type='submit'
                  disabled={isLoading || !input.trim()}
                  className='btn disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
