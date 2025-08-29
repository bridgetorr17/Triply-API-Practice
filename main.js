
const POSTreq = async ()  => {
    const place = document.querySelector('#place').value;
    console.log('sending autocomplete request for ', place)

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
            'X-Goog-Api-Key': 'YOUR_API_KEY'
        },
        body: JSON.stringify(data)
    })

    formatted = await response.json();

    console.log(formatted)
}

document.querySelector('#submit').addEventListener('click', POSTreq);
