import { NAVBAR_HEIGHT } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-50 shadow-xl'
        style={{
            height: `${NAVBAR_HEIGHT}px`,
        }}
    >
        <div className='flex justify-between items-center w-full
        py-3 px-8 bg-sky-700'>
            <div className='flex items-center gap-4 md:gap-6'>
                <Link 
                    href={'/'}
                    className='cursor-pointer hover:!text-priamry-300'
                    scroll={false}
                >
                   <div className='flex items-center gap-3'>
                    <Image 
                        src={'/logo.svg'}
                        alt='App logo'
                        width={24}
                        height={24}
                        className='w-6 h-6'
                    />
                    <div className='text-xl font-bold'>
                        RENT
                        <span className='text-rose-500 font-light'>APP</span>
                    </div>
                   </div>
                </Link>
                <p className='hidden md:block text-white'>
                    Discover the best rental properties in your area with our advance search
                </p>
                <div className='flex items-center gap-5'>
                    <Link href={'/signin'} >
                    <Button className='text-white border-white border-2 bg-transparent hover:bg-sky-600'>
                        Sign in
                        </Button>
                        </Link>
                    <Link href={'/signup'} >
                    <Button
                    variant={'outline'}
                     className='text-white bg-rose-600 border-white hover:bg-sky-600'>
                        Sign up
                        </Button>
                        </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar