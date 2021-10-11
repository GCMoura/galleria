import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

function App() {

  const history = useHistory()

  const BASE_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000'
  : 'https://rijksmuseum.herokuapp.com'
  
  const [images, setImages] = useState([])
  const [storeImages, setStoreImages] = useState([])
  
  useEffect(() => {    
    try {
      fetch(`${BASE_URL}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        setStoreImages( [data.artObjects ] )
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  
  function getArt(){
    const arr = []
    for (const key in storeImages) {
      storeImages[key].forEach(img => {
        arr.push(img.webImage.url)
      })
    }
    setImages([arr])
  }

  return (
    <>
      <h1>Galleria</h1>
      <button onClick={getArt}>Click</button>
      {  
          images.map((image) => {
            image.map((img, index) => {
              console.log(img)
              return(
                <main>
                  <img key={index} src={ img } alt="" height='200' width='400'/>
                </main> 
            )
            })
          })
        }
    </>
  );
}

export default App;
