import React from 'react'
import Image from 'next/image'
import { serviceData } from '@/assets/assets'
import { assets } from '@/assets/assets'
import { motion } from 'framer-motion'
const Qualities = () => {
  return (
    <motion.div initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:1}}id="qualities" className = 'w-full px-[-12%] py-10 scroll-mt-20'>
      <motion.h4 initial = {{opacity:0, y:-20}} whileInView = {{opacity:1, y:0}} transition = {{duration:0.5, delay:0.3}} className='text-center mb-2 text-lg font-Ovo'>What I Offer</motion.h4>
      <motion.h2 initial = {{opacity:0, y:-20}} whileInView = {{opacity:1, y:0}} transition = {{duration:0.5, delay:0.5}} className= 'text-center text-5xl font-Ovo'>My Top Qualities</motion.h2>

      <motion.p initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:0.5, delay:0.7}} className = 'text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        Here is a list of my top qualities.
      </motion.p>

      <motion.div initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:0.6, delay:0.9}} className='grid grid-cols-auto gap-6 my-10'>
        {serviceData.map(({icon, title, description},index)=>(
            <motion.div  whileHover = {{scale:1.05}}  key={index} className='border border-gray-400 rounded-lg px-8 py-12 hover:shadow-lg hover:shadow-black'>
                <Image src={icon} className='w-10'/>
                <h3 className='text-lg my-4 text-gray-700'>{title}</h3>
                <p className='text-sm text-gray-600 leading-5'>{description}</p>

            </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Qualities
