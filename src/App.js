import { useState } from 'react'
import Paint from './components/Paint'

function App() {

  const BASE_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000'
  : 'https://rijksmuseum.herokuapp.com'
  
  const [image, setImage] = useState([])
  
  async function getArt(){
    var dataImage
    try {
      await fetch(`${BASE_URL}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data.artObjects)
        dataImage = data.artObjects
      })
    } catch (error) {
      console.log(error)
    }
    dataImage.map(masterpieces => {
      console.log(masterpieces)

      var painting = masterpieces.id.split('-')
      if(painting[1] === "SK") {
        return setImage([...image, masterpieces.webImage.url ]) 
      }
      return null
    })
  }

  return (
    <>
      <h1>Galleria</h1>
      <button onClick={getArt}>Click</button>
      <div>
        {
          image.map((img, index) => {
            console.log(img)
            return <Paint key={index} src={img}/>
          })
        }
      
      </div>
    </>
  );
}

export default App;
