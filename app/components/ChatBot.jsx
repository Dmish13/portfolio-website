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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
        className='fixed bottom-6 right-6 z-50 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl border-2 border-purple-200'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <span className='text-gray-700 text-2xl font-bold'>✕</span>
        ) : (
          <Image src={assets.light100} alt='Mr. Light 100' className='w-12 h-12 object-contain' />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='fixed bottom-20 left-4 right-4 z-50 sm:right-6 sm:left-auto sm:w-96 h-[450px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200'
          >
            {/* Header */}
            <div className='bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Image src={assets.light100} alt='Mr. Light 100' className='w-10 h-10 bg-white rounded-full p-1' />
                <div>
                  <h3 className='font-semibold text-lg'>Mr. Light 100</h3>
                  <p className='text-xs text-purple-100'>AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors'
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
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
                  placeholder='Ask about skills, projects...'
                  className='flex-1 px-4 py-2 border-2 border-gray-300 rounded-full outline-none focus:border-purple-400 transition-colors text-gray-900 text-sm'
                  disabled={isLoading}
                />
                <button
                  type='submit'
                  disabled={isLoading || !input.trim()}
                  className='btn disabled:opacity-50 disabled:cursor-not-allowed'
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
