import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css"

const Recenter = ({coords}) => {
    const map = useMap();

    useEffect(() => {
        if (coords[0] && coords[1]) {
            map.setView(coords)
        }
    }, [coords, map]);

    return null
}

const MapComp = ({coordinates, setCoordinates, pins}) => {
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
                    {pins.map((pin,idx) => {
                        return (
                        <Marker 
                            key={`${pin.latitude}-${pin.longitude}-${idx}`}
                            position={[pin.latitude, pin.longitude]}> 
                            <Popup>{pin.place}</Popup>
                        </Marker>
                    )})}
                    <Recenter coords={coordinates}/>
        </MapContainer>
    )
}

export default MapComp;