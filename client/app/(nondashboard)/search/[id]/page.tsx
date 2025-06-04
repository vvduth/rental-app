"use client"
import { useGetAuthUserQuery } from '@/state/api'
import { useParams } from 'next/navigation'
import React from 'react'
import ImagePreviews from './ImagePreviews'
import PropertyOverview from './PropertyOverview'
import PropertyDetails from './PropertyDetails'

const SingleListing = () => {
const {id} = useParams()
const propertyId = Number(id)
const {data: authUser} = useGetAuthUserQuery()

    return (
   <div>
     <ImagePreviews 
         images={["/singlelisting-2.jpg", "/singlelisting-3.jpg"]}
    />
    <div className='flex flex-col md:flex-row justify-center gap-10 mx-10 md:w-2/3 md:mx-auto
    mt-1'>
        <div className='order-2 md:order-1'>
            <PropertyOverview 
                propertyId = {propertyId}
            />
                <PropertyDetails
                propertyId={propertyId}
            />
        </div>
    </div>
   </div>
  )
}

export default SingleListing