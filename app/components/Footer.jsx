import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Footer = () => {
  return (
    <div className='mt-16 sm:mt-20 px-4 sm:px-6'>
      <div className='text-center'>
        <Image src = {assets.light100} alt = '' className = 'w-16 sm:w-20 mx-auto mb-2'/>

        <div className='w-full sm:w-max flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 mx-auto'>
            <Image src = {assets.mail_icon} alt = '' className = 'w-5 sm:w-6'/>
            <span className='text-sm sm:text-base break-all'>danielbotros15@gmail.com</span>
        </div>
      </div>

      <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-auto mt-8 sm:mt-12 py-6 max-w-6xl'>
        <p className='text-sm mb-6 sm:mb-0'>@ 2026 Daniel Misherky. All rights reserved.</p>
        <ul className='flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-10 justify-center'>
            <li><a target = "_blank" className = "text-sm underline hover:text-gray-600 dark:hover:text-gray-400 transition-colors" href = "https://www.instagram.com/misherdaniel/">Instagram</a></li>
            <li><a target = "_blank" className = "text-sm underline hover:text-gray-600 dark:hover:text-gray-400 transition-colors" href = "https://github.com/Dmish13">Github</a></li>
            <li><a target = "_blank" className = "text-sm underline hover:text-gray-600 dark:hover:text-gray-400 transition-colors" href = "https://www.linkedin.com/in/daniel-misherky-419835245/">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
