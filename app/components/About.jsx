import { assets, infoList, toolsData } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.div 
      id='about' 
      className='w-full px-6 sm:px-12 lg:px-[12%] py-20 scroll-mt-20' 
      initial={{opacity:0}} 
      whileInView={{opacity:1}} 
      transition={{duration:1}}
    >
      {/* Section Header */}
      <div className='text-center mb-16'>
        <motion.h4 
          initial={{opacity:0, y:-20}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration:0.5, delay:0.3}} 
          className='mb-2 text-lg font-Ovo text-gray-600 dark:text-gray-400'
        >
          Introduction
        </motion.h4>
        <motion.h2 
          className='text-4xl sm:text-5xl font-Ovo font-semibold text-gray-900 dark:text-gray-100' 
          initial={{opacity:0, y:-20}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration:0.5, delay:0.5}}
        >
          About Me
        </motion.h2>
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{opacity:0}} 
        whileInView={{opacity:1}} 
        transition={{duration:0.8}} 
        className='flex w-full flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20'
      >
        {/* Profile Image */}
        <motion.div 
          initial={{opacity:0, scale: 0.9}} 
          whileInView={{opacity:1, scale:1}} 
          transition={{duration:0.6}} 
          className='w-64 sm:w-80 lg:w-96 flex-shrink-0'
        >
          <Image 
            src={assets.Profile} 
            alt='Profile picture' 
            className='w-full rounded-3xl shadow-xl'
          />
        </motion.div>

        {/* Content Section */}
        <motion.div 
          initial={{opacity:0}} 
          whileInView={{opacity:1}} 
          transition={{duration:0.6, delay:0.8}} 
          className='flex-1 w-full'
        >
          {/* Bio */}
          <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-12 max-w-2xl'>
            I am a passionate Computer Science student with knowledge of several programming languages and frameworks, and I am looking for experience in the field through internships.
          </p>

          {/* Info Cards */}
          <motion.div
            initial={{opacity:0}} 
            whileInView={{opacity:1}} 
            transition={{duration:0.8, delay:1}}
            className='mb-16'
          >
            <motion.ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-5xl mx-auto'>
              {infoList.map(({icon, title, description}, index)=> (
                <motion.li 
                  whileHover={{scale:1.05, y:-5}} 
                  key={index} 
                  className='border border-gray-300 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-[#fcf4ff] dark:hover:bg-gray-800 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-500 transition-all duration-500 bg-white dark:bg-gray-800/50'
                >
                  <a href="#projects" className='block'>
                    <Image src={icon} alt={title} className='w-8 mb-4'/>
                    <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2'>{title}</h3>
                    <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>{description}</p>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Tools Section */}
          <motion.div
            initial={{opacity:0, y:20}} 
            whileInView={{opacity:1, y:0}} 
            transition={{duration:0.5, delay:1.3}}
          >
            <motion.h4 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 font-Ovo'>
              Tools & Technologies
            </motion.h4>

            <motion.ul 
              initial={{opacity:0}} 
              whileInView={{opacity:1}} 
              transition={{duration:0.6, delay:1.5}} 
              className='flex flex-wrap gap-4'
            >
              {toolsData.map((tool, index)=>(
                <motion.li  
                  whileHover={{scale:1.15, y:-3}} 
                  className='flex items-center justify-center w-16 aspect-square border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md transition-all duration-500 bg-white dark:bg-gray-800' 
                  key={index}
                >
                  <Image src={tool} alt='Tool' className='w-8'/>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default About
