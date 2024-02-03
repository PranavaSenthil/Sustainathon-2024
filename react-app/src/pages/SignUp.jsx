import GoogleButton from '../components/GoogleButton'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'

export default function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData,setFormData] = useState({})
    const formHandler = (e)=>{
        setFormData((prev)=>{
            console.log({...prev,[e.target.id]:e.target.value})
            return {...prev,[e.target.id]:e.target.value}
        })
    }
    useEffect(()=>{
        setFormData((prev)=>{
            return {...prev,"image": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
        })
    },[])
    const clickHandler = async(e,service_type)=>{
        e.preventDefault()
        try{
            const res = await fetch('http://172.31.99.248:8000/api/register/',{
                method:"POST",
                body: JSON.stringify(formData),
                headers:{'Content-Type' : 'application/json'}
            })
            const resData = await res.json()
            console.log(resData)
            if(res.ok){
                const image= formData.image
                const result = {...resData,image,service_type}
                console.log(result)
                dispatch(signInSuccess(result))
                if(service_type =='4'){
                    navigate("/create-profile")
                }
                if(service_type == '2'){
                    navigate("/owner-details")
                }
            }
            if(!res.ok){
                console.log(resData)
            }
        }
        catch(error){
            console.log(error)
        }

    }
    return (
        <>
            <div className='flex p-3 max-w-3xl m-auto mt-10 flex-row'>
                <div className='flex-1'>
                    <div className='flex flex-col gap-7  justify-center min-h-full'>
                        <p className='font-bold text-4xl'>Sign up to</p>
                        <img src='logo.png' className='h-aut0 w-52' />
                        <div>
                            <p className='text-xs'>If you already have an account</p>
                            <p className='text-xs'>You can <Link to="/sign-in" className='text-button font-semibold'>Login here!</Link></p>
                        </div>
                    </div>
                </div>
                <div className='flex-1 p-5 shadow-lg rounded-lg py-5 bg-bg'>
                    <form className='flex flex-col gap-3 px-5' >
                    <p className='mb-5 font-bold text-xl'>Sign Up</p>
                        <input
                        type='text'
                            placeholder='Create user name'
                            id='username'
                            className="bg-F0EFFF  placeholder-gray-400 border border-none rounded-md p-2 focus:outline-none placeholder:text-xs text-xs"  onChange={formHandler}
                        />
                        <input type="email" id="email" placeholder='Enter email' className='bg-F0EFFF  placeholder-gray-400 border border-none rounded-md p-2 focus:outline-none placeholder:text-xs text-xs'  onChange={formHandler}/>
                        <input type="password" id="password" placeholder='Enter your password' className='bg-F0EFFF  placeholder-gray-400 border border-none rounded-md p-2 focus:outline-none placeholder:text-xs text-xs' onChange={formHandler}/>
                        <input type="password" id="conformPassword" placeholder='Conform password' className='bg-F0EFFF  placeholder-gray-400 border border-none rounded-md p-2 focus:outline-none placeholder:text-xs text-xs' onChange={formHandler}/>
                        <button type='submit' className='bg-button h-10 hover:bg-6359D8 text-white py-2 px-4 rounded-lg flex justify-center text-xs' onClick={(event)=>clickHandler(event,4)}>Sign up</button>
                        <button type='submit' className='bg-button h-10 hover:bg-6359D8 text-white py-2 px-4 rounded-lg flex justify-center text-xs' onClick={(event)=>clickHandler(event,2)}>Sign up as organiser</button>
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