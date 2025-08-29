import { useState } from "react"

const App = () => {

    const [place, setPlace] = useState('');

    const POSTreq = async (e)  => {
        e.preventDefault();

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

        const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_API_KEY
            },
            body: JSON.stringify(data)
        })

        const formatted = await response.json();

        console.log(formatted)
    }

    return (
        <>
        <form onSubmit={POSTreq}>
            <input 
                type="text" 
                id="place" 
                value={place}
                onChange={(e) => setPlace(e.target.value)}/>
            <button 
                type="submit" 
                >Submit</button>
        </form>
            
        </>
    )
}

export default App;