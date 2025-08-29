import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useRef } from "react";
import { useCallback } from "react";

const googleProps = ['marker']

const MapComp = ({mapMarker}) => {

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
            <Map
            style={{ width: '50vw', height: '50vw' }}
            defaultCenter={{lat: 22.54992, lng: 0}}
            defaultZoom={3}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId={import.meta.env.VITE_MAP_ID}
            >
                <AdvancedMarker position={{lat: 29.5, lng: -81.2}} />
            </Map>
        </APIProvider>
    )
}

export default MapComp;