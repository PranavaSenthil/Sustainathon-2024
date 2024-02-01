import { Button} from 'flowbite-react'
import React from 'react'
import GoogleButton from '../components/GoogleButton'
import { Link } from 'react-router-dom'

export default function SignIn() {
  return (
    <>
        <div className='flex p-3 max-w-3xl m-auto mt-8 flex-row'>
            <div className='flex-1'>
                <div className='flex flex-col gap-7  justify-center min-h-full'>
                    <p className='font-bold text-4xl'>Sign in to</p>
                    <img src='logo.png' className='h-aut0 w-52' />
                    <div>
                        <p className='text-xs'>If you dont have an account register</p>
                        <p className='text-xs'>You can <Link to="/sign-up" className='text-button font-semibold'>Register now!</Link></p>
                    </div>
                </div>
            </div>
            <div className='flex-1 p-3 shadow-lg rounded-lg py-8 bg-bg'>
                <form className='flex flex-col gap-4 px-5 py-3' >
                    <p className='mb-5 font-bold text-xl'>Sign In</p>
                    <input
                        placeholder='Email / User name'
                        className="bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black" 
                    />
                    <input type="password" placeholder='Password' className='bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black'/>
                    <button type='submit' className='bg-button h-10 hover:bg-6359D8 text-white py-2 px-4 rounded-lg flex justify-center text-xs'>Sign In</button>
                    <p className='text-xs text-right text-gray-400'>Forgot pasword?</p>
                    <div className="flex items-center justify-center">
                        <div className="border-t border-gray-400 w-1/4"></div>
                        <span className="mx-4 text-xs text-gray-400">or continue with</span>
                        <div className="border-t border-gray-400 w-1/4"></div>
                    </div>
                    <GoogleButton/>
                </form>
            </div>
        </div>
    </>
  )
}
