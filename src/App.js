import { useState } from 'react'

function App() {

  const BASE_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000'
  : 'https://rijksmuseum.herokuapp.com'
  
  const [image, setImage] = useState([])
  
  async function getArt(){
    await fetch(`${BASE_URL}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        const dataImage = data.artObjects

        dataImage.forEach(element => {
          // console.log(element.webImage.url)

            setImage( [element.webImage.url])
          
        });
        
      })
      

  }

  return (
    <>
      <h1>Galleria</h1>
      <button onClick={getArt}>Click</button>
      <div>
      <ul>
        {
          image.map((index, img) => {
            {/* console.log(img) */}
            return <li key={index}>  {1} </li>
            {/* <img src={img} key={index} width="300" height="150"/> */}
          })
        }
      </ul>
      </div>
    </>
  );
}

export default App;
