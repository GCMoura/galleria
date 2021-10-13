import React, { useState } from "react";
import { useHistory } from "react-router";

function Galleria() {

  const history = useHistory()
  
  const BASE_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000'
  : 'https://rijksmuseum.herokuapp.com'
  
  const [storeImages, setStoreImages] = useState([])
  const [storeTitle, setStoreTitle] = useState([])
  const [artist, setArtist] = useState('')

  const arrArt = []
  const arrArtTitle = []
  var page = 1

  function returnHome(){
    history.push('/')
  }

  function handleSubmit(event){
    event.preventDefault()
    getArt()
    // let maxPage = 0
    // if(artist === "Rembrandt van Rijn"){
    //   maxPage = 9
    //   getArt(maxPage)
    // } else if(artist === "Johannes Vermeer"){
    //   maxPage = 8
    //   getArt(maxPage)
    // } else if(artist === 'Jan Havicksz. Steen'){
    //   maxPage = 7
    //   getArt(maxPage)
    // } else if(artist === 'Vincent van Gogh'){
    //   maxPage = 1
    //   getArt(maxPage)
    // }
  }
  
  function getArt(maxPage){
    try {
      fetch(`${BASE_URL}/${page}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(page)
        for(let index in data.artObjects){  
          let id = data.artObjects[index].id.split('-')
          if(id[1] === 'SK'){
            if(data.artObjects[index].webImage !== null && data.artObjects[index].hasImage){
              // console.log(data.artObjects[index].principalOrFirstMaker)
              if( data.artObjects[index].principalOrFirstMaker === artist){
                console.log(artist, page)
                arrArt.push(data.artObjects[index].webImage.url)
                arrArtTitle.push(data.artObjects[index].title)
              }
            }
          }
        }
        
        console.log('page - ', page)
        page++
        if(page <= Math.floor(data.count / 100 + 1) && page <= 7){
          getArt()
        } else {
          page = 1
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
      <button onClick={getArt}>Home</button>

      <form onSubmit={handleSubmit}>
        <input type='submit' value="Rembrandt van Rijn" onClick={(event) => { setArtist(event.target.value) }} />
        <input type='submit' value="Johannes Vermeer" onClick={(event) => { setArtist(event.target.value) }} />
        <input type='submit' value="Vincent van Gogh" onClick={(event) => { setArtist(event.target.value) }} />
        <input type='submit' value="Jan Havicksz. Steen" onClick={(event) => { setArtist(event.target.value) }} />
      </form> 
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

export default Galleria