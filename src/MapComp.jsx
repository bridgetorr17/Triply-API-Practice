import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css"

const MapComp = ({place, coordinates}) => {
    const mapRef = useRef(null);
    console.log(`the coordinates are ${coordinates}`)
    return (
        <MapContainer
            center={coordinates}
            zoom={13}
            ref={mapRef}
            style={{height:"100vh", width: "100vw"}}>
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Marker position={coordinates}> 
                        <Popup>
                            {place.placePrediction?.structuredFormat?.mainText?.text}
                        </Popup>
                    </Marker>
        </MapContainer>
    )
}

export default MapComp;