import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletComponent = (props) => {
    const formatCoordinates = (coord, isLatitude) => {
        const direction = isLatitude ? (coord > 0 ? 'N' : 'S') : (coord > 0 ? 'E' : 'W');
        const formattedCoord = Math.abs(coord).toFixed(5);
        console.log(findVal(`${formattedCoord}° ${direction}`));
    }
    const findVal = (coord)=>{
        const value = parseFloat(coord.match(/[+-]?\d+(\.\d+)?/)[0]); // Extract numeric value
        const direction = coord.includes('N') || coord.includes('E') ? 1 : -1; // Determine direction
        return value * direction; 
    }
    useEffect(() => {
        async function reverseCoding(lat,long){
            formatCoordinates(lat,true)
            try{
                const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=58899302416b41978bb2b9c1210d1832&pretty=1`)
                const resData = await res.json()
                console.log(resData.results[0].components)
            }
            catch(error){
                console.log(error)
            }
        }
        if (props.lat !== null && props.long !== null) {
        const map = L.map('map').setView([props.lat, props.long], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        L.marker([props.lat, props.long]).addTo(map)
            .bindPopup(`Longitude : ${props.long}<br>Latitude : ${props.lat}`)
            .openPopup();
        L.marker(["11.055608","76.99398"]).addTo(map)
            .bindPopup(`Longitude : ${"11.055608"}<br>Latitude : ${"76.99398"}`)
            .openPopup();
        reverseCoding(props.lat,props.long)
        }
    }, [props.lat, props.long]);

    return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default LeafletComponent;
