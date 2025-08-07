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
    <div className = 'fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]'>
        <Image src={assets.header_bg_color} alt='' className= 'w-full' />
    </div>
    <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm":""}`}>
        <a href="#top">
            <Image src ={assets.light100} alt="" className = 'w-15 cursor-pointer mr-14'/>
        </a>

        <ul className = {`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? "": "bg-white shadow-sm bg-opacity-50"}`}>
            <li><a className = 'font-Ovo hover:bg-gray-200 transtion-colors duration-200 rounded-md' href="#top">Home</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-200 transtion-colors duration-200 rounded-md' href="#about">About Me</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-200 transtion-colors duration-200 rounded-md' href="#qualities">My Top Qualities</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-200 transtion-colors duration-200 rounded-md' href="#projects">Projects</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-200 transtion-colors duration-200 rounded-md' href="#contact">Contact Me</a></li>
        </ul>

        <div className='flex items-center gap-4'>
            <a href="#contact" className='hidden lg:flex items-center gap-3 px-10 border border-gray-500 rounded-full ml-4 font-Ovo hover:bg-gray-200 transition-colors duration-200'>Contact<Image src={assets.arrow_icon} alt = "" className = 'w-3'></Image></a>

            <button className='block md:hidden ml-3 cursor-pointer' onClick={openMenu}>
                <Image src={assets.menu_black} alt='' className = 'w-6'/>
            </button>
        </div>

        <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500'>
            <div className = 'absolute right-6 top-6 cursor-pointer' onClick={closeMenu}>
                <Image src={assets.close_black} alt='' className='w-5 cursor-pointer'/>
            </div>
            <li><a className = 'font-Ovo hover:bg-gray-200 transtion-colors duration-200 rounded-md' onClick={closeMenu} href="#top">Home</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-200 transtion-colors duration-200 rounded-md' onClick={closeMenu} href="#about">About Me</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-200 transtion-colors duration-200 rounded-md' onClick={closeMenu} href="#qualities">My Top Qualities</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-200 transtion-colors duration-200 rounded-md' onClick={closeMenu} href="#projects">Projects</a></li>
            <li><a className = 'font-Ovo hover:bg-gray-200 transtion-colors duration-200 rounded-md' onClick={closeMenu} href="#contact">Contact Me</a></li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar
