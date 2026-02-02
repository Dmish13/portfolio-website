import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'
import { motion } from "motion/react"
const Header = () => {
  return (
    <div className='w-full max-w-4xl px-4 sm:px-6 text-center mx-auto min-h-screen flex flex-col items-center justify-center gap-3'>
      <motion.div initial = {{scale:0}} whileInView={{scale:1}} transition={{duration:0.8, type:'spring', stiffness: 100}}>
        <Image src= {assets.Profile} alt='' className='rounded-full w-20 sm:w-24 md:w-28'/>
      </motion.div>
      <motion.h3 initial = {{y:-20, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.6, delay: 0.3}} className='flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl mb-3 font-Ovo flex-wrap'>Hi! I'm Daniel Misherky
            <Image src = {assets.hand_icon} alt='' className='w-5 sm:w-6'/>
        </motion.h3>

    <motion.h1 initial = {{y:-30, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.8, delay:0.5}} className='text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-Ovo leading-tight'>
        Computer Science Student at University of South Florida
    </motion.h1>
    <motion.p initial = {{opacity:0}} whileInView= {{opacity:1}} transition={{duration:0.6, delay:0.7}}className = 'w-full max-w-2xl mx-auto font-Ovo text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
        I am a computer science student at USF looking for software engineering and/or data analyst internships.
    </motion.p>
    <div className= 'flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 w-full'>
        <motion.a initial = {{y:-20, opacity:0}} whileInView={{y:0,opacity:1}} transition = {{duration:0.6, delay:1}} href="#contact" className='btn w-full sm:w-auto'>
          Contact Me <Image src={assets.right_arrow_white} alt='' className='w-4'/></motion.a>
        <motion.a  initial = {{y:-20, opacity:0}} whileInView={{y:0,opacity:1}} transition = {{duration:0.6, delay:1.2}} href="/DANIEL_MISHERKY_RESUME.pdf" download className='btn w-full sm:w-auto'>
        My Resume <Image src={assets.download_icon} alt='' className='w-4 dark:invert'/></motion.a>
    </div>
    </div>
  )
}

export default Header

