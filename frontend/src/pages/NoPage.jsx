import React from 'react'

function NoPage() {
  return (
    <div className='flex items-center justify-center h-[90vh]'>

        <div class="w-14 flex flex-row items-center justify-between">
          <div class="w-3 h-3 rounded-full bg-pink-500 transform -translate-y-full animate-wave delay-[0.4s]"></div>
          <div class="w-3 h-3 rounded-full bg-pink-500 transform -translate-y-full animate-wave delay-[0.2s]"></div>
          <div class="w-3 h-3 rounded-full bg-pink-500 transform -translate-y-full animate-wave"></div>
        </div>
    </div>
  )
}

export default NoPage