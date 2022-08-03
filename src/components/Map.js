import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
function Map({ location }) {
  function ChangeView({ center }) {
    const map = useMap();
    map.setView(center, 14);
    return null;
  }
  return (
    <MapContainer center={location} zoom={100}>
      <ChangeView center={location} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}></Marker>
    </MapContainer>
  );
}

export default Map;
