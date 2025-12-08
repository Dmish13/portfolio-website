import React from 'react'
import Image from 'next/image'
import { assets, workData } from '@/assets/assets'
import { motion } from 'framer-motion'

const Projects = () => {
  return (
    <motion.div initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:1}}id="projects" className = 'w-full px-[-12%] py-10 scroll-mt-20'>
      <motion.h4 initial = {{opacity:0, y:-20}} whileInView = {{opacity:1, y:0}} transition = {{duration:0.5, delay:0.3}} className='text-center mb-2 text-lg font-Ovo text-gray-600 dark:text-gray-400'>What I Offer</motion.h4>
      <motion.h2 initial = {{opacity:0, y:-20}} whileInView = {{opacity:1, y:0}} transition = {{duration:0.5, delay:0.5}} className= 'text-center text-5xl font-Ovo font-bold text-gray-900 dark:text-gray-100'>My Projects</motion.h2>

      <motion.p initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:0.5, delay:0.7}}className = 'text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo text-gray-700 dark:text-gray-300'>
        Here is a list of my projects (work in progress).
      </motion.p>

      <motion.div initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:0.6, delay:0.9}} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 gap-5 max-w-7xl mx-auto px-4'>
        {workData.map((project,index)=>(
          <a key={index} target = "_blank" href = {project.link}>
            <motion.div whileHover = {{scale:1.05}} transition = {{duration:0.3}} className = 'aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group shadow-lg hover:shadow-2xl overflow-hidden' style={{backgroundImage:`url(${project.bgImage})`}}>
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <motion.div className='bg-white dark:bg-gray-800 w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7 shadow-xl'>
                <motion.div>
                    <motion.h2 className='font-semibold text-gray-900 dark:text-gray-100'>{project.title}</motion.h2>
                    <motion.p className='text-sm text-gray-700 dark:text-gray-300'>{project.description}</motion.p>
                  </motion.div>
                  <motion.div className='border rounded-full border-black dark:border-gray-300 w-9 aspect-square flex items-center justify-center shadow-[2px_2px_2px_0_#000] dark:shadow-[2px_2px_2px_0_rgba(255,255,255,0.3)] group-hover:bg-lime-300 dark:group-hover:bg-lime-500 transition'>
                    <Image src={assets.send_icon} alt = 'send icon' className='w-5 dark:invert'/>
                    </motion.div>
                
                </motion.div>
                
            </motion.div>
          </a>
        ))}
      </motion.div>

        <a href = "https://github.com/Dmish13" target = "_blank" className='w-max flex items-center justify-center gap-2 text-gray-900 dark:text-gray-100 border-2 border-gray-700 dark:border-gray-300 rounded-full py-3 px-10 mx-auto my-20 hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 font-medium'>
          Show More <Image src = {assets.right_arrow_bold} alt= 'Right Arrow' className='w-4 dark:invert'></Image>
        </a>
      
    </motion.div>
  )
}

export default Projects
