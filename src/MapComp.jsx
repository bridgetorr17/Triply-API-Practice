import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useRef } from "react";
import { useCallback } from "react";

const MapComp = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    });

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return ( isLoaded ?
        <GoogleMap
            mapContainerStyle={{ width: '50vw', height: '50vw' }}
            center={{ lat: 37.7749, lng: -122.4194 }} // Example: San Francisco
            zoom={12}
            onLoad={onMapLoad}
        />
        : <div>Loading...</div>
    )
}

export default MapComp;