import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='fixed inset-0 flex gap-2 items-center justify-center
    bg-sky-500/10'>
        <Loader2 className='w-6 h-6 animate-spin text-white' />
        <span className='text-sm font-medium text-black'>
            Loading...
        </span>
    </div>
  )
}

export default Loading