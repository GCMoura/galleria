import { useState } from 'react'

import '../../styles/loader.scss'

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
    document.querySelector('.loader').style.display = "block"
    getArt()
  }
  
  function getArt(){
    
    try {
      fetch(`${BASE_URL}/${page}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        
        for(let index in data.artObjects){  
          let id = data.artObjects[index].id.split('-')
          if(id[1] === 'SK'){
            if(data.artObjects[index].webImage !== null && data.artObjects[index].hasImage){
              if( data.artObjects[index].principalOrFirstMaker === artist){
                arrArt.push(data.artObjects[index].webImage.url)
                arrArtTitle.push(data.artObjects[index].title)
              }
            }
          }
        }
        
        page++
        if(page <= Math.floor(data.count / 100 + 1) && page <= 7){
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
      <h1>Galleria</h1>
      
      <form onSubmit={handleSubmit}>
        <input type='submit' value="Rembrandt van Rijn" onClick={(event) => { setArtist(event.target.value) }} />
        <input type='submit' value="Johannes Vermeer" onClick={(event) => { setArtist(event.target.value) }} />
        <input type='submit' value="Vincent van Gogh" onClick={(event) => { setArtist(event.target.value) }} />
        <input type='submit' name="Jan Havicksz. Steen" value="Jan Steen" onClick={(event) => { setArtist(event.target.name) }} />
      </form> 

      <div class="loader">
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__ball"></div>
        <h4>Loading...</h4>
      </div>

      {
        storeImages.map((img, index) => {
          
          return (
            <main key={index}>
              <img  src={img} alt='' width='300' height='300' />
              <h3> {storeTitle[index] } </h3>
            </main>
          )
        })
      }
    </>
  );  
}
export default Home;
