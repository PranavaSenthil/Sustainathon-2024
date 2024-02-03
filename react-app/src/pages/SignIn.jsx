import { useEffect, useState } from 'react'
import GoogleButton from '../components/GoogleButton'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'

export default function SignIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)

    const formHandler = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const clickHandler = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            setError('Please enter both email and password.')
            return
        }

        try {
            const res = await fetch('http://172.31.98.221:8000/api/login/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            })
            const resData = await res.json()

            if (res.ok) {
                dispatch(signInSuccess(resData))
                navigate('/dashboard?tab=home')
            } else {
                setError(resData.message || 'Failed to sign in.')
            }
        } catch (error) {
            console.error('Error:', error)
            setError('An error occurred. Please try again later.')
        }
    }

    return (
        <>
            <div className='flex p-3 max-w-3xl m-auto mt-8 flex-row'>
                <div className='flex-1'>
                    <div className='flex flex-col gap-7  justify-center min-h-full'>
                        <p className='font-bold text-4xl'>Sign in to</p>
                        <img src='logo.png' alt='Logo' className='h-auto w-52' />
                        <div>
                            <p className='text-xs'>If you don't have an account, register</p>
                            <p className='text-xs'>You can <Link to="/sign-up" className='text-button font-semibold'>Register now!</Link></p>
                        </div>
                    </div>
                </div>
                <div className='flex-1 p-3 shadow-lg rounded-lg py-8 bg-bg'>
                    <form className='flex flex-col w-full gap-4 px-5 py-3' >
                        <p className='mb-5 font-bold text-xl'>Sign In</p>
                        <input
                            id="email"
                            type="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={formHandler}
                            className="bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black"
                        />
                        <input
                            id="password"
                            type="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={formHandler}
                            className='bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black'
                        />
                        {error && <p className='text-xs text-red-500'>{error}</p>}
                        <button type='submit' className='bg-button h-10 hover:bg-6359D8 text-white py-2 px-4 rounded-lg flex justify-center text-xs' onClick={clickHandler}>Sign In</button>

                        <p className='text-xs text-right text-gray-400'>Forgot password?</p>
                        <div className="flex items-center justify-center">
                            <div className="border-t border-gray-400 w-1/4"></div>
                            <span className="mx-4 text-xs text-gray-400">or continue with</span>
                            <div className="border-t border-gray-400 w-1/4"></div>
                        </div>
                        <GoogleButton />
                    </form>
                </div>
            </div>
        </>
    )
}
