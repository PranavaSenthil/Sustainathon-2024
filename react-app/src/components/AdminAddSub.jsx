import React from 'react'

export default function AdminAddSub() {
  return (
    <div className='flex-1 p-3 shadow-lg rounded-lg py-8 bg-bg'>
        <form className='flex flex-col w-full gap-4 px-5 py-3' >
            <p className='mb-5 font-bold text-xl'>Sign In</p>
              <input
                  id="email"
                  placeholder='Email'
                  className="bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black"  
              />
            <input id="password" type="password" placeholder='Password' className='bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black' />
            
            <button type='submit' className='bg-button h-10 hover:bg-6359D8 text-white py-2 px-4 rounded-lg flex justify-center text-xs'>Sign In</button>
                    
        </form>
      </div>
  )
}
