
function App() {

  const BASE_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000'
  : 'https://rijksmuseum.herokuapp.com'

  
  async function getArt(){
    await fetch(`${BASE_URL}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
      })

  }



  return (
    <>
      <h1>Galleria</h1>
      <button onClick={getArt }>Click</button>
    </>
  );
}

export default App;
