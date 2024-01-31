import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [longitide,setLongitude] = useState(null)
  const [latitude,setLatitude] = useState(null)
  const [error,setError] = useState(null)
  useEffect(()=>{
    const successHandler = (position)=>{
      setLongitude(position.coords.longitude)
      setLatitude(position.coords.latitude)
    }
    const errorHandler = (error)=>{
      setError(error)
    }
    if(!navigator.geolocation){
      setError("Error")
    }
    navigator.geolocation.getCurrentPosition(successHandler,errorHandler)
  },[])
  return (
    <>
      <h1>Alester</h1>
      <h1>{longitide}</h1>
      <h1>{"latitide"+latitude}</h1>
      <h1>{error}</h1>
    </>
  )
}

export default App
