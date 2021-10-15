import { useState } from 'react'

import Loader from '../../component/Loader'
import Masterpiece from '../../component/Masterpiece'

function Home() {
  
  const BASE_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000'
  : 'https://rijksmuseum.herokuapp.com'
  
  const [storeImages, setStoreImages] = useState([])
  const [storeTitle, setStoreTitle] = useState([])
  const [artist, setArtist] = useState('')

  const arrArt = []
  const arrArtTitle = []
  var page = 1

  function handleSubmit(event){
    event.preventDefault()
    console.log(artist)
    document.querySelector('.loader').style.display = "block"
    getArt()
  }
  
  function getArt(){
    try {
      fetch(`${BASE_URL}/${artist}/${page}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        for(let index in data.artObjects){  
          let id = data.artObjects[index].id.split('-')
          if(id[1] === 'SK'){
            if(data.artObjects[index].webImage !== null && data.artObjects[index].hasImage){
              console.log('page - ', page)
              arrArt.push(data.artObjects[index].webImage.url)
              arrArtTitle.push(data.artObjects[index].title)
             }
           }
        }
        
        page++
        if(page <= Math.floor(data.count / 100 + 1) && page <= 15){
          getArt()
        } else {
          page = 1
          document.querySelector('.loader').style.display = "none"
          setStoreImages(arrArt)
          setStoreTitle(arrArtTitle)
        }

      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <header>
      <h1>Galleria</h1>
      
      <form onSubmit={handleSubmit}>
        <input  type='submit' value="Rembrandt van Rijn" onClick={(event) => { setArtist(event.target.value) } } />
        <input  type='submit' value="Johannes Vermeer" onClick={(event) => { setArtist(event.target.value) }} />
        <input  type='submit' value="Vincent van Gogh" onClick={(event) => { setArtist(event.target.value) }} />
      </form> 
    </header>
    
    <div className="loader-div">
      <Loader />
    </div>

    <main >
      {
        storeImages.map((img, index) => {
          
          return (
              <Masterpiece 
                key={index}
                src={img}
                title={ storeTitle[index] }
              />
          )
        })
      }
    </main>
    </>
  );  
}
export default Home;
