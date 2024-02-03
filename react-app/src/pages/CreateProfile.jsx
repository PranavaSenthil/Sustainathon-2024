import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {getStorage} from "firebase/storage"
import { app } from "../../firebase"
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { profileSuccess } from "../redux/user/userSlice"

export default function CreateProfile() {
    const imagePicker = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData,setFormData] = useState({})
    const [imageFile,setImageFile] = useState(null)
    const [imageURL,setImageURL] = useState(null)
    const [imageUpload,setImageUpload] = useState(null)
    const [imageError,setImageError] = useState(null)
    const [user_type,setUserType] = useState("2")
    const {currentUser} = useSelector((state)=>state.user)
    const formHandler = (e)=>{
        setFormData((prev)=>{
            console.log({...prev,[e.target.id]:e.target.value})
            return({...prev,[e.target.id]:e.target.value})
        })
    }
    const handleImageChange = (e)=>{
        console.log(e.target.files[0])
        console.log(currentUser)
        setImageFile(e.target.files[0])
      }
    useEffect(()=>{
        if(imageFile)
            uploadImage()
    },[imageFile])

    const uploadImage = async()=>{
        const storage = getStorage(app)
        const filename = new Date().getTime() + imageFile.name
        const storeRef = ref(storage,filename)
        const uploadTask = uploadBytesResumable(storeRef,imageFile)
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(progress)
            },
            (error)=>{
                setImageError(error)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageURL(downloadURL)
                    setFormData((prev)=>{
                        console.log({...prev,"image":downloadURL})
                        return {...prev,"image":downloadURL}
                    })
                })
            }
        )
    }

    const clickHandler =async (e)=>{
        e.preventDefault()
        const username = currentUser.id
        const name = currentUser.username
        console.log(username)
        const revisedData = {...formData,username,name,user_type}
        console.log(revisedData)
        console.log({...currentUser,...formData})
        if(Object.keys(formData).length === 0){
            return
        }
        try{
            const res = await fetch('http://172.31.99.248:8000/api/create_userrecord/',{
                method:"POST",
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify(revisedData)
            })
            const resData = await res.json()
            console.log(resData)
            if(res.ok !== true){
               console.log(resData)
            }
            if(res.ok){
                dispatch(profileSuccess({...currentUser,...formData}))
                navigate("/sign-in")
            }
            
        }
        catch(error){
            console.log(error)
            // dispatch(updateFailure(error))
        }

    }
  return (
    <> 
        <div className="flex justify-start p-4">
            <img src='logo.png' className='h-aut0 w-36' />
        </div>
        <div className='flex-1 flex flex-col max-w-3xl m-auto mt-8 items-center shadow-lg rounded-lg py-8 bg-bg'>
            <form className='flex w-full flex-row items-center'>
                <div className="flex-1 flex flex-col items-center justify-center gap-7">
                    <p className="font-bold text-md mb-6">CREATE PROFILE</p>
                    <div className="relative w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => imagePicker.current.click()}>
                        <input type="file" accept="image/*" ref={imagePicker} onChange={handleImageChange} hidden />
                        <img src={imageURL || currentUser.image} alt="User" className="rounded-full w-full h-full object-cover border-8 border-lightgray" />
                    </div>
                    <p className="text-xs text-neutral-400">Click on the image to choose image</p>
                </div>
                <div className="line"></div>
                <div className="flex-1 px-10 mx-4">
                    <div className="flex flex-col gap-4 items-center">
                        <input
                            id="phoneNo"
                            type="text"
                            placeholder='Phone Number'
                            className="w-full bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black" onChange={formHandler}
                        />
                        <textarea id="address" type="text" placeholder='Address' className='w-full bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black'  onChange={formHandler}/>
                        <input id="area" type="text" placeholder='Sub Urban' className='w-full bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black'  onChange={formHandler}/>
                        <input id="city" type="text" placeholder='City' className='w-full bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black' onChange={formHandler} />
                        <input id="state" type="text" placeholder='State' className='w-full bg-F0EFFF placeholder-gray-400 border border-none rounded-md p-2 placeholder:text-xs text-xs text-black' onChange={formHandler} />
                        <div className="flex flex-row items-center">
                            <input type="checkbox" className="mr-2" onClick={()=>{
                                setUserType((prev)=>{
                                    console.log(prev)
                                    return ((prev === "2") ? "3" : "2")
                                })
                            }}></input>
                            <label className="text-gray-500 text-xs">Are you a worker ?</label><br></br>
                        </div>
                        <button type='submit' className='w-full bg-button h-10 hover:bg-6359D8 text-white py-2 px-4 rounded-lg flex justify-center text-xs' onClick={clickHandler}>Create</button>
                        
                    </div>
                </div>
            </form>
        </div>

    </>
  )
}
