const App = () => {
    let displayMessage = '';

    const sendEmail = async () => {
        console.log('trying to send an email, starting in the frontend')

        const res = await fetch ('http://localhost:8000/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mess: "hello!"})
        })

        const result = await res.json();
        //displayMessage = result.message();
        console.log(result);
    }
    
    return (
        <>
            <button onClick={sendEmail}>Send an email</button>
            <span>{displayMessage}</span>
        </>
    )
}

export default App;