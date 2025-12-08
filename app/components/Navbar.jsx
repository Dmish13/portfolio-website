'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { useRef, useState, useEffect } from 'react'

const Navbar = () => {
    const [isScroll, setIsScroll] = useState(false);
    const sideMenuRef = useRef();
    
    const openMenu = () =>{
        sideMenuRef.current.style.transform = 'translateX(-16rem)'
    }

    const closeMenu = () =>{
        sideMenuRef.current.style.transform = 'translateX(16rem)'
    }

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            if(scrollY>50){
                setIsScroll(true)
            }
            else{
                setIsScroll(false)
            }
        })
    },[])

  return (
    <>
    <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all ${isScroll ? "bg-gray-900/95 backdrop-blur-lg shadow-lg":"bg-gray-900/90"}`}>
        <a href="#top">
            <Image src ={assets.light100} alt="" className = 'w-15 cursor-pointer mr-14'/>
        </a>

        <ul className = {`hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 rounded-full px-6 lg:px-12 py-3 transition-all ${isScroll ? "": "bg-gray-800/50 shadow-sm backdrop-blur-sm"} text-gray-100 text-sm lg:text-base`}>
            <li><a className = 'font-Ovo hover:bg-gray-700 transtion-colors duration-200 rounded-md px-2 lg:px-3 py-1 whitespace-nowrap' href="#top">Home</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-700 transtion-colors duration-200 rounded-md px-2 lg:px-3 py-1 whitespace-nowrap' href="#about">About</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-700 transtion-colors duration-200 rounded-md px-2 lg:px-3 py-1 whitespace-nowrap' href="#qualities">Qualities</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-700 transtion-colors duration-200 rounded-md px-2 lg:px-3 py-1 whitespace-nowrap' href="#projects">Projects</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-700 transtion-colors duration-200 rounded-md px-2 lg:px-3 py-1 whitespace-nowrap' href="#contact">Contact</a></li>
        </ul>

        <div className='flex items-center gap-4'>
            <a href="#contact" className='hidden lg:flex items-center gap-3 px-8 py-2.5 border-2 border-gray-300 rounded-full font-Ovo bg-gray-800/80 hover:bg-gray-700 transition-all duration-200 text-gray-100 font-medium shadow-sm'>Contact<Image src={assets.arrow_icon} alt = "" className = 'w-3 invert'></Image></a>

            <button className='block md:hidden ml-3 cursor-pointer' onClick={openMenu}>
                <Image src={assets.menu_black} alt='' className = 'w-6 invert'/>
            </button>
        </div>

        <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-gray-900 transition duration-500'>
            <div className = 'absolute right-6 top-6 cursor-pointer' onClick={closeMenu}>
                <Image src={assets.close_black} alt='' className='w-5 cursor-pointer invert'/>
            </div>
            <li><a className = 'font-Ovo text-gray-100 hover:bg-gray-700 transtion-colors duration-200 rounded-md px-3 py-1 block' onClick={closeMenu} href="#top">Home</a></li>
            <li><a className = 'font-Ovo text-gray-100 hover:bg-gray-700 transtion-colors duration-200 rounded-md px-3 py-1 block' onClick={closeMenu} href="#about">About Me</a></li>
            <li><a className = 'font-Ovo text-gray-100 hover:bg-gray-700 transtion-colors duration-200 rounded-md px-3 py-1 block' onClick={closeMenu} href="#qualities">My Top Qualities</a></li>
            <li><a className = 'font-Ovo text-gray-100 hover:bg-gray-700 transtion-colors duration-200 rounded-md px-3 py-1 block' onClick={closeMenu} href="#projects">Projects</a></li>
            <li><a className = 'font-Ovo text-gray-100 hover:bg-gray-700 transtion-colors duration-200 rounded-md px-3 py-1 block' onClick={closeMenu} href="#contact">Contact Me</a></li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar
