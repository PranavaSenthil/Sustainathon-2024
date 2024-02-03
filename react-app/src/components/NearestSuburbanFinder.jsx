import React, { useState, useEffect } from 'react';

function NearestSuburbanFinder() {
  const [nearestSuburban, setNearestSuburban] = useState(null);
  const [id,setId] = useState(null)
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location,setLocationDetails] = useState(null)
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

  useEffect(() => {
    if (nearestSuburban) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: 12,
      });

      new window.google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude,
        },
        map: map,
        title: nearestSuburban.name,
      });
    }
  }, [nearestSuburban]);

  return (
    <div className=''>
      <div style={{ width: '100%', height: '400px', marginBottom: '20px' }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
        )}
      </div>
    </div>
  );
}

export default NearestSuburbanFinder;
