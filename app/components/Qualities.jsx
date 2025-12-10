import React from 'react'
import Image from 'next/image'
import { serviceData } from '@/assets/assets'
import { assets } from '@/assets/assets'
import { motion } from 'framer-motion'
const Qualities = () => {
  return (
    <motion.div 
      initial={{opacity:0}} 
      whileInView={{opacity:1}} 
      transition={{duration:1}} 
      id="qualities" 
      className='w-full px-6 sm:px-12 lg:px-[12%] py-20 scroll-mt-20'
    >
      {/* Section Header */}
      <div className='text-center mb-16'>
        <motion.h4 
          initial={{opacity:0, y:-20}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration:0.5, delay:0.3}} 
          className='mb-2 text-lg font-Ovo text-gray-600 dark:text-gray-400'
        >
          What I Offer
        </motion.h4>
        <motion.h2 
          initial={{opacity:0, y:-20}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration:0.5, delay:0.5}} 
          className='text-4xl sm:text-5xl font-Ovo font-semibold text-gray-900 dark:text-gray-100'
        >
          My Top Qualities
        </motion.h2>
        <motion.p 
          initial={{opacity:0}} 
          whileInView={{opacity:1}} 
          transition={{duration:0.5, delay:0.7}} 
          className='max-w-2xl mx-auto mt-5 font-Ovo text-gray-700 dark:text-gray-300'
        >
          Here is a list of my top qualities.
        </motion.p>
      </div>

      {/* Qualities Grid */}
      <motion.div 
        initial={{opacity:0}} 
        whileInView={{opacity:1}} 
        transition={{duration:0.6, delay:0.9}} 
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6'
      >
        {serviceData.map(({icon, title, description}, index)=>(
          <motion.div  
            whileHover={{scale:1.05, y:-5}} 
            key={index} 
            className='border border-gray-300 dark:border-gray-700 rounded-xl px-6 py-10 hover:shadow-2xl hover:shadow-purple-200 dark:hover:shadow-purple-900/30 hover:border-purple-200 dark:hover:border-purple-500 transition-all duration-200 bg-white dark:bg-gray-800 group min-h-[160px] sm:min-h-[220px]'
          >
            <div className='w-14 h-14 sm:w-16 sm:h-16 mb-4 flex items-center justify-center bg-purple-50 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-800/50 transition-colors duration-300'>
              <Image src={icon} className='w-8 sm:w-10 dark:invert' alt={title}/>
            </div>
            <h3 className='text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100'>{title}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Qualities
