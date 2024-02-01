import { app } from '../../firebase'
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth'

export default function GoogleButton() {
    const auth = getAuth(app)   
    const formHandler = async()=>{
        const google = new GoogleAuthProvider()
        google.setCustomParameters({prompt : "select_account"})
        try{
            const resultFromGoogle = await signInWithPopup(auth,google)
            console.log(resultFromGoogle)
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <button type="button" className=" border  border-black py-2 px-4 rounded-lg flex justify-center items-center text-xs" onClick={formHandler}>
        <img src="google-icon.svg" alt="Google Icon" width="24" height="24" />
        Google
   </button>
  )
}
