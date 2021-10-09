import { useState, useEffect } from 'react'
import Paint from './components/Paint'

function App() {

  const BASE_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000'
  : 'https://rijksmuseum.herokuapp.com'
  
  const [images, setImages] = useState([])
  // const [imagesURL, setImagesURL] = useState([])
  var imagesURL = [1,2,3]
  
  // async function getArt(){
  //   try {
  //     await fetch(`${BASE_URL}`)
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       //console.log(data.artObjects)
  //       setImages([...images, data.artObjects]) 
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   getMasterpieces()
  // }

  useEffect(() => {
    try {
      fetch(`http://localhost:5000`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setImages([data.artObjects]) 
      })
    } catch (error) {
      console.log(error)
    }
    //getMasterpieces()
  }, [])

  function getMasterpieces(){
    images.map(el => {
      console.log(el.length)
      for (let index = 0; index < el.length; index++) {
        imagesURL.push(el[index].webImage.url)
        //console.log(el[index].webImage.url)
        // setImagesURL([...imagesURL, el[index].webImage.url])
      }
    })
    console.log(imagesURL)
  }

  return (
    <>
      <h1>Galleria</h1>
      <button onClick={getMasterpieces}>Click</button>
      <div>
       {
        imagesURL.map(el => {
          console.log(el)
        })
       }
      
      </div>
    </>
  );
}

export default App;
