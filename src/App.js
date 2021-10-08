import { useState } from 'react'

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
        setImage([...image, data.artObjects.webImage.url ]) 
      })
    } catch (error) {
      console.log(error)
    }
          
  }

  return (
    <>
      <h1>Galleria</h1>
      <button onClick={getArt}>Click</button>
      <div>
        {
          image.map((img, index) => {
            console.log(img)
            return <img src={img} key={index} width="300" height="150" alt=""/> 
          })
        }
      
      </div>
    </>
  );
}

export default App;
