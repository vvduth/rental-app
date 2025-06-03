import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Link from 'next/link'
import React from 'react'
import { faFacebook,
    faTwitter,
    faInstagram,
    faYoutube
 } from '@fortawesome/free-brands-svg-icons'

const FooterSection = () => {
  return (
    <footer className='border-t border-geay-200 py-20'>
        <div className='max-w-4xl mx-auto px-6 sm:px-8'>
            <div className='flex flex-col md:flex-row
            justify-between items-center'>
                <div className='mb-4'>
                    <Link href={'/'} 
                    scroll={false}
                    className='text-xl font-bold'>
                    RENTAPP
                    </Link>
                </div>
                <nav className='mb-4'>
                    <ul className='flex space-x-6'>
                        <li>
                            <Link href={'/about'}>About Us</Link>

                        </li>
                        <li>
                            <Link href={'/contact'}>Contact</Link>
                        </li>
                        <li>
                            <Link href={'/privacy'}>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href={'/terms'}>Terms of Service</Link>
                        </li>
                        <li>
                            <Link href={'/faq'}>FAQ</Link>
                        </li>
                    </ul>
                </nav>
                <div className='flex space-x-4 mb-4'>
                    <a href='#'
                        aria-label='Facebook'
                        className='text-gray-600 hover:text-gray-800'
                    >
                        <FontAwesomeIcon icon={faFacebook} size='lg'
                         className="h-6 w-6"
                        />
                    </a>
                    <a href='#'
                        aria-label='Twitter'
                        className='text-gray-600 hover:text-gray-800'
                    >
                        <FontAwesomeIcon icon={faTwitter} size='lg'
                            className="h-6 w-6"
                        />
                    </a>
                    <a href='#'
                        aria-label='Instagram'
                        className='text-gray-600 hover:text-gray-800'
                    >
                        <FontAwesomeIcon icon={faInstagram} size='lg'
                            className="h-6 w-6"
                        />
                    </a>
                    <a href='#'
                        aria-label='YouTube'
                        className='text-gray-600 hover:text-gray-800'
                    >
                        <FontAwesomeIcon icon={faYoutube} size='lg'
                            className="h-6 w-6"
                        />
                    </a>
                </div>
            </div>
            <div className='mt-8 text-center text-gray-500 text-sm flex justify-center space-y-4'>
                <p>&copy; {new Date().getFullYear()} RENTAPP. All rights reserved.</p>
                <p>Built with ❤️ by Dukeroo</p>
            </div>
        </div>
    </footer>
  )
}

export default FooterSection