const App = () => {

    const share = async () => {
        if (!navigator.share){
            alert('sharing not supported on this browser')
            return;
        }

        try{
            await navigator.share({
                title: 'Share triply',
                text: 'Check out triply',
                url: 'https://triplytravel.vercel.app'
            });
            console.log('shared successfully');
        }
        catch(err) {
            console.error('sharing failed', err)
        }
    }
    
    return (
        <>
            <button
                onClick={share}>
                Share!
            </button>
        </>
    )
}

export default App;