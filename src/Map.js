import React from 'react'
 import "./map.css"
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
function Map({center,zoom}) {
    return (
       <div className="map">
        <LeafletMap center={center} zoom={zoom}>
            <TileLayer  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </LeafletMap>
       </div>
    )
}

export default Map
