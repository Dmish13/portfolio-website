import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "4b2ba683-bedc-440c-897c-df53b4905216");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <motion.div initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:1}}>
      <motion.div id="contact" className = 'w-full px-[-12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto]'>
      <motion.h4 initial = {{opacity:0, y:-20}} whileInView = {{opacity:1, y:0}} transition = {{duration:0.5, delay:0.3}} className='text-center mb-2 text-lg font-Ovo'>Connect with me</motion.h4>
      <motion.h2 initial = {{opacity:0, y:-20}} whileInView = {{opacity:1, y:0}} transition = {{duration:0.5, delay:0.5}} className= 'text-center text-5xl font-Ovo'>Get in touch</motion.h2>

      <motion.p initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:0.5, delay:0.7}} className = 'text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        I'd love to hear from you. If you have any comments, questions or concerns, please contact me.
      </motion.p>

      <motion.form initial = {{opacity:0}} whileInView = {{opacity:1}} transition = {{duration:0.5, delay:0.9}}onSubmit = {onSubmit} className='max-w-2xl mx-auto'>
        <div className='grid grid-cols-auto gap-6 mt-10 mb-8'>
            <motion.input initial = {{opacity:0, x:-50}} whileInView = {{opacity:1, x:0}} transition = {{duration:0.6, delay:1.1}} type="text" placeholder='Enter your name' required className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white' name = 'name'/>
            <motion.input initial = {{opacity:0, x:50}} whileInView = {{opacity:1, x:0}} transition = {{duration:0.6, delay:1.2}} type="email" placeholder='Enter your email' required className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white' name = 'email'/>

        </div>
        <motion.textarea initial = {{opacity:0, y:100}} whileInView = {{opacity:1, y:0}} transition = {{duration:0.6, delay:1.3}} rows='6' placeholder='Enter your message' required className='w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6' name = 'message'></motion.textarea>

        <motion.button whileHover={{scale:1.05}} transition={{duration:0.3}} type="submit" className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 cursor-pointer'>Submit Now<Image src={assets.right_arrow_white} alt='' className='w-4'/></motion.button>
        <p className='mt-4'>{result}</p>
      </motion.form>
      </motion.div>
    </motion.div>
  )
}

export default Contact
