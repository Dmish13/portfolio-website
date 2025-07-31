import React from 'react'
import Image from 'next/image'
import { assets, workData } from '@/assets/assets'
import { motion } from 'framer-motion'

const Projects = () => {
  return (
    <motion.div initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:1}}id="projects" className = 'w-full px-[-12%] py-10 scroll-mt-20'>
      <motion.h4 initial = {{opacity:0, y:-20}} whileInView = {{opacity:1, y:0}} transition = {{duration:0.5, delay:0.3}} className='text-center mb-2 text-lg font-Ovo'>What I Offer</motion.h4>
      <motion.h2 initial = {{opacity:0, y:-20}} whileInView = {{opacity:1, y:0}} transition = {{duration:0.5, delay:0.5}} className= 'text-center text-5xl font-Ovo'>My Projects</motion.h2>

      <motion.p initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:0.5, delay:0.7}}className = 'text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        Here is a list of my projects (work in progress).
      </motion.p>

      <motion.div initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:0.6, delay:0.9}} className='grid grid-cols-auto my-10 gap-5'>
        {workData.map((project,index)=>(
          <a target = "_blank" href = {project.link}>
            <motion.div whileHover = {{scale:1.05}} transition = {{duration:0.3}} key={index} className = 'aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group' style={{backgroundImage:`url(${project.bgImage})`}}>
                <motion.div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
                <motion.div>
                    <motion.h2 className='font-semibold'>{project.title}</motion.h2>
                    <motion.p className='text-sm text-gray-700'>{project.description}</motion.p>
                  </motion.div>
                  <motion.div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_2px_0_#000] group-hover:bg-lime-300 transition'>
                    <Image src={assets.send_icon} alt = 'send icon' className='w-5'/>
                    </motion.div>
                
                </motion.div>
                
            </motion.div>
          </a>
        ))}
      </motion.div>

        <a href = "https://github.com/Dmish13" target = "_blank" className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-gray-100 duration-500'>
          Show More <Image src = {assets.right_arrow_bold} alt= 'Right Arrow' className='w-4'></Image>
        </a>
      
    </motion.div>
  )
}

export default Projects
