import { useEffect, useState } from 'react'
import './App.css'
import LeafletComponent from './components/LeafletComponent'

function App() {
  const [longitude,setLongitude] = useState(null)
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
      <LeafletComponent lat={latitude} long={longitude}></LeafletComponent>
    </>
  )
}

export default App
