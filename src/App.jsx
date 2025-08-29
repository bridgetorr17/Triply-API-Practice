import { useState, useEffect } from "react"

const App = () => {

    const [place, setPlace] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [newPlace, setNewPlace] = useState({});

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
        console.log(result);
    }

    const POSTreq = async ()  => {

        const data = {
            "input": place,
            "locationBias": {
                "circle": {
                    "center": {
                        "latitude": 37.7937,
                        "longitude": -122.3965
                    },
                "radius": 500.0
                }
            }
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
            <div style={{ position: 'relative', width: '300px' }}>
                <input
                    type="text"
                    aria-autocomplete="list"
                    aria-expanded={true}
                    aria-controls="suggestion-list"
                    onChange={(e) => {setPlace(e.target.value)}}
                />
                {suggestions.length > 0 && (
                    <ul
                        id="suggestion-list"
                        role="listbox"
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'white',
                            border: '1px solid #ccc',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            zIndex: 1000,
                        }}
                        >
                        {suggestions.map((sug, index) => (
                            <li
                            key={index}
                            role="option"
                            onClick={() => handleSelect(sug)}
                            style={{ padding: '8px', cursor: 'pointer' }}
                            >
                                {sug.placePrediction?.text?.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <span>{newPlace.placePrediction?.structuredFormat?.mainText?.text}</span>
            </div>
        </>
    )
}

export default App;