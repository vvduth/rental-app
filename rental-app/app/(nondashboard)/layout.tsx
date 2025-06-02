"use client";
import React from 'react'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import Navbar from '@/components/Navbar'
import { useGetAuthUserQuery } from '@/state/api'
const LandingPayout = ({children}: {
    children: React.ReactNode
}) => {
  const {data: authUser} = useGetAuthUserQuery()
  
  return (
    <div className='h-full'>
        <Navbar/>
        <main
        style={{
          paddingTop: `${NAVBAR_HEIGHT}px`,
        }}
        className={`h-full flex w-full flex-col`}>{
                children
            }</main>
    </div>
  )
}

export default LandingPayout