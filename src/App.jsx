import { useState, useEffect } from "react"
import MapComp from "./MapComp"

const App = () => {

    const [place, setPlace] = useState('');
    const [newPlace, setNewPlace] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (!place) {
            setSuggestions([]);
            return;
        }
        POSTreq();
    }, [place])

    const handleSelect = async (selectedPlace) => {
        setNewPlace(selectedPlace);
        setPlace('');
        setSuggestions([]);

        const placeId = selectedPlace.placePrediction.placeId;

        const response = await fetch( `https://places.googleapis.com/v1/places/${placeId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_API_KEY,
                    "X-Goog-FieldMask": "location"
                },
            }
        );

        const result = await response.json();
        setMarker({
            lat: result.location.latitude,
            lng: result.location.longitude
        })
    }

    const POSTreq = async ()  => {

        const data = {
            "input": place
        }

        try{
            const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_API_KEY
                },
                body: JSON.stringify(data)
            })

            const result = await response.json();
            if (result.suggestions){
                setSuggestions(result.suggestions)
                console.log(result.suggestions);
            } else{
                setSuggestions([])
            }
        }
        catch(err){
            console.error("Autocomplete request failed:", error);
            setSuggestions([]);
        }
        
    }

    return (
        <>
            <div className="relative w-72">
                <input
                    type="text"
                    aria-autocomplete="list"
                    aria-expanded={true}
                    aria-controls="suggestion-list"
                    onChange={(e) => {setPlace(e.target.value)}}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {suggestions.length > 0 && (
                    <ul
                        id="suggestion-list"
                        role="listbox"
                        className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-48 overflow-y-auto z-20 rounded"
                        >
                        {suggestions.map((sug, index) => (
                            <li
                            key={index}
                            role="option"
                            onClick={() => handleSelect(sug)}
                            className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {sug.placePrediction?.text?.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mt-2 text-gray-700">
                <span>{newPlace.placePrediction?.structuredFormat?.mainText?.text}</span>
            </div>
            <div className="mt-4 h-96 w-full rounded overflow-hidden">
                <MapComp mapMarker={marker}/>
            </div>
        </>
    )
}

export default App;