import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Footer = () => {
  return (
    <div className = 'mt-20'>
      <div className = 'text-center'>
        <Image src = {assets.light100} alt = '' className = 'w-20 mx-auto mb-2'/>

        <div className='w-max flex items-center gap-2 mx-auto'>
            <Image src = {assets.mail_icon} alt = '' className = 'w-6 mx-auto mb-2'/>
            danielbotros15@gmail.com
        </div>
      </div>

      <div className = 'text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>
        <p className='mb-4 sm:mb-0'>@ 2025 Daniel Misherky. All rights reserved.</p>
        <ul className='flex flex-wrap items-center gap-6 sm:gap-10 justify-center'>
            <li><a target = "_blank" className = "underline hover:text-gray-600 transition-colors" href = "https://www.instagram.com/misherdaniel/">Instagram</a></li>
            <li><a target = "_blank" className = "underline hover:text-gray-600 transition-colors" href = "https://github.com/Dmish13">Github</a></li>
            <li><a target = "_blank" className = "underline hover:text-gray-600 transition-colors" href = "https://www.linkedin.com/in/daniel-misherky-419835245/">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
