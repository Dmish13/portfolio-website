import { assets } from '@/assets/assets'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Contact = () => {
  const [result, setResult] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    setResult("Sending...")

    // get form data
    const formData = new FormData(event.target)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    // send to your API route
    try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const resData = await response.json()

    if (response.ok && resData.success) {
      setResult("Form Submitted Successfully ✅")
      event.target.reset()
    } else {
      setResult("Something went wrong ❌")
      console.error(resData)
    }
  } catch (err) {
    console.error("Error submitting form:", err)
    setResult("Server error ❌")
  }
}

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <motion.div
        id="contact"
        className='w-full px-6 sm:px-12 lg:px-[12%] py-20 scroll-mt-20'
      >
        {/* Section Header */}
        <div className='text-center mb-16'>
          <motion.h4
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mb-2 text-lg font-Ovo text-gray-600 dark:text-gray-400'
          >
            Connect with me
          </motion.h4>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='text-4xl sm:text-5xl font-Ovo font-semibold mb-5 text-gray-900 dark:text-gray-100'
          >
            Get in touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className='max-w-2xl mx-auto font-Ovo text-gray-700 dark:text-gray-300 text-base sm:text-lg'
          >
            I'd love to hear from you. If you have any comments, questions or concerns, please contact me.
          </motion.p>
        </div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          onSubmit={onSubmit}
          className='max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6'>
            <motion.input
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              type="text"
              placeholder='Enter your name'
              required
              className='p-4 outline-none border-2 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 border-gray-300 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300'
              name='name'
            />

            <motion.input
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              type="email"
              placeholder='Enter your email'
              required
              className='p-4 outline-none border-2 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 border-gray-300 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300'
              name='email'
            />
          </div>

          <motion.textarea
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            rows='6'
            placeholder='Enter your message'
            required
            className="w-full p-4 outline-none border-2 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 mb-6 focus:ring-2 border-gray-300 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 resize-none"
            name='message'
          ></motion.textarea>

          <div className='text-center'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              type="submit"
              className='py-4 px-10 flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full mx-auto hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer font-semibold'
            >
              Submit Now
              <Image src={assets.right_arrow_white} alt='arrow' className='w-4' />
            </motion.button>

            {result && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mt-6 text-center font-semibold text-lg text-white'
              >
                {result}
              </motion.p>
            )}
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  )
}

export default Contact
