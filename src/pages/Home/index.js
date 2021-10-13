import { useState } from 'react'
import { useHistory } from 'react-router'

function Home() {

  const history = useHistory()

  const [artist, setArtist] = useState('')

  function showGalleria(event){
    event.preventDefault()
    console.log(artist)
    history.push({
      pathname: "/galleria",
      state: {
        artist: artist,
      }
    })
  }

  return(
    <form onSubmit={showGalleria}>
      <input type='submit' value="Rembrandt" onClick={(event) => { setArtist(event.target.value) }} />
      <input type='submit' value="Vermeer" onClick={(event) => { setArtist(event.target.value) }} />
    </form>
  )
}
export default Home;
