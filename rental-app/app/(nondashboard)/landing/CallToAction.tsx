'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
const CallToAction = () => {
  return (
    <div className='relative py-24'>
        <Image 
            src={"/landing-call-to-action.jpg"}
            alt='rental app landing page call to action photo'
            fill
            className='object-cover object-center'
        />
        <div className='absolute inset-0 bg-gray-900/50'> </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true}}
            className='relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12'
        >
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='mb-6 md:mb-0 md:mr-10'>
                 <h2 className='text-2xl font-bold text-white'>
                    Find your dream rental here</h2>   
                </div>
                <div>
                    <p className='text-white mb-2'>
                        Discover a wide range of rental properties tailored to your desired.
                    </p>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default CallToAction