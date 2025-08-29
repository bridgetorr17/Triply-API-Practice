import { useEffect, useRef } from 'react';

function AdvancedMarkerWrapper({ map, position, title }) {
  const markerRef = useRef();

  useEffect(() => {
    if (map && !markerRef.current) {
      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position,
        title,
      });
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
    };
  }, [map]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.position = position;
      if (title !== undefined) markerRef.current.title = title;
    }
  }, [position, title]);

  return null;
}

export default AdvancedMarkerWrapper;
