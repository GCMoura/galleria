import { useState } from 'react'

function App() {

  const BASE_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000'
  : 'https://rijksmuseum.herokuapp.com'
  
  const [storeImages, setStoreImages] = useState([])
  const [storeTitle, setStoreTitle] = useState([])
  const arrArt = []
  const arrArtTitle = []
  var page = 1
 
  function getArt(){
    try {
      fetch(`${BASE_URL}/${page}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        // console.log(data.artObjects)
        for(let index in data.artObjects){  
          let id = data.artObjects[index].id.split('-')
          if(id[1] === 'SK'){
            if(data.artObjects[index].webImage !== null && data.artObjects[index].hasImage){
              if( data.artObjects[index].principalOrFirstMaker === 'Rembrandt van Rijn'){
                arrArt.push(data.artObjects[index].webImage.url)
                arrArtTitle.push(data.artObjects[index].title)
              }
            }
          }
        }
        
        console.log('page - ', page)
        page++
        if(page <= Math.floor(data.count / 100 + 1) && page <= 9){
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
      <button onClick={getArt}>Click</button>
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

export default App;
