const App = () => {

    const backendTest = async () => {
        const message = 'message to the backend'

        const res = await fetch ('http://localhost:8000/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mess: message})
        })

        const result = await res.json();
        console.log(result.message);
    }
    
    backendTest();
    console.log('just called the backend test')

    return (
        <>
         <span>hello</span>
        </>
    )
}

export default App;