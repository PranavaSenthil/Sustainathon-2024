import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

function NearestSuburbanFinder() {
  const [nearestSuburban, setNearestSuburban] = useState(null);
  const [id,setId] = useState('')
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locations,setLocationDetails] = useState(null)
  const location = useLocation()
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const id = urlParams.get("id")
    if(id){
        console.log(id)
      setId(id)
    }
  },[location.search])
  const getLocationArea = (locationDetails) => {
    const addressComponents = locationDetails.address_components;
    let area = null;
  
    for (let component of addressComponents) {
      if (
        component.types.includes("sublocality_level_1")
      ) {
        area = component.long_name;
        break; 
      }
    }
    console.log(area)
    return area;
  };
  const getLocationDetails = async(latitude, longitude)=>{
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD34h9d_K9bH8A6PTpiSViKvq7zomZ1Yjc`
      );
      const data = await response.json();
      if (response.ok && data.status === 'OK' && data.results.length > 0) {
        const locationDetails = data.results[0];
        const area = getLocationArea(locationDetails)
        setLocationDetails(area);
      } else {
        console.log("failed to fetch")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          console.log(position.coords.latitude,position.coords.longitude)
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };
  
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(()=>{
    console.log(latitude,longitude)
    if(latitude && longitude){
      getLocationDetails(latitude,longitude)
    }
  },[latitude,longitude])
  useEffect(() => {
    const findNearestSuburban = async () => {
      if (!latitude || !longitude) return;

      const response = await fetch(
        `/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=3000&type=suburb&key=AIzaSyD34h9d_K9bH8A6PTpiSViKvq7zomZ1Yjc`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'OK' && data.results.length > 0) {
          const nearestLocation = data.results[0];
          setNearestSuburban(nearestLocation);
        } else {
          setError('No nearby suburbs found.');
        }
      } else {
        setError('Failed to fetch nearby suburbs: ' + response.statusText);
      }
      setLoading(false);
    };

    findNearestSuburban();
  }, [latitude, longitude]);
  useEffect(()=>{
    if(locations && id){
        const fetchData = async()=>{
            console.log("hello")
            try{
                const res = await fetch(`http://172.31.98.221:8000/fetch/get_nearbySubadmin?service_id=${id}&area=${locations}`)
                const resData =await res.json()
                console.log(res)
                console.log(resData)
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    }
  },[id])


  return (
    <>
        {/* <p>{locations}</p>
        <p>{id}</p> */}
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='flex h-9 w-full'>
                <p>Company name : Reliance</p>
                <p></p>
            </div>
            <button>BOOK</button>
        </div>
    </>
  );
}

export default NearestSuburbanFinder;
