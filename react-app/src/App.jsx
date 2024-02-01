import { useEffect, useState } from 'react'
import './App.css'
import LeafletComponent from './components/LeafletComponent'
import { BrowserRouter, Navigate, Route,Routes } from 'react-router-dom';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  // const [longitude,setLongitude] = useState(null)
  // const [latitude,setLatitude] = useState(null)
  // const [error,setError] = useState(null)
  // useEffect(()=>{
  //   const successHandler = (position)=>{
  //     setLongitude(position.coords.longitude)
  //     setLatitude(position.coords.latitude)
  //   }
  //   const errorHandler = (error)=>{
  //     setError(error)
  //   }
  //   if(!navigator.geolocation){
  //     setError("Error")
  //   }
  //   navigator.geolocation.getCurrentPosition(successHandler,errorHandler)
  // },[])
  return (
    <>
      {/* <LeafletComponent lat={latitude} long={longitude}></LeafletComponent> */}
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to="/sign-in"/>}></Route>
            <Route path='/sign-in' element={<SignIn/>}></Route>
            <Route path='/sign-up' element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
