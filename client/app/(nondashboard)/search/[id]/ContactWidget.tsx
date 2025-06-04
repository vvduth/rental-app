import { Button } from '@/components/ui/button'
import { useGetAuthUserQuery } from '@/state/api'
import { Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ContactWidget = ({onOpenModal}: ContactWidgetProps) => {

    const {data: authUser} = useGetAuthUserQuery()
    const router = useRouter()
    const handleButtonClick = () => {
        if (authUser) {
            onOpenModal()
        } else {
            router.push('/signin')
        }
    }

  return (
    <div className='bg-white border border-gray-200 rounded-2xl
    p-7 h-fit min-w-[300px]'>  {/* Contact Property */}
      <div className="flex items-center gap-5 mb-4 border border-sky-200 p-4 rounded-xl">
        <div className="flex items-center p-4 bg-sky-900 rounded-full">
          <Phone className="text-sky-50" size={15} />
        </div>
        <div>
          <p>Contact This Property</p>
          <div className="text-lg font-bold text-sky-800">
            (424) 340-5574
          </div>
        </div>
      </div>
      <Button
        className="w-full bg-sky-700 text-white hover:bg-sky-600"
        onClick={handleButtonClick}
      >
        {authUser ? "Submit Application" : "Sign In to Apply"}
      </Button>
       <hr className="my-4" />
      <div className="text-sm">
         <div className="text-sky-600 mb-1">Language: English.</div>
        <div className="text-sky-600">
          Open by appointment on Monday - Sunday
        </div>
      </div>
      </div>
  )
}

export default ContactWidget