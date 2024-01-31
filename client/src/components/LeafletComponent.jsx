import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletComponent = (props) => {
  useEffect(() => {
    if (props.lat !== null && props.long !== null) {
      const map = L.map('map').setView([props.lat, props.long], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      L.marker([props.lat, props.long]).addTo(map)
        .bindPopup(`Longitude : ${props.long}<br>Latitude : ${props.lat}`)
        .openPopup();
    }
  }, [props.lat, props.long]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default LeafletComponent;
