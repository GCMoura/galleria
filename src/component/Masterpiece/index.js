import React from 'react'

import './index.css'

function Masterpiece({ src, title }){

  
  return(
    <figure className="masterpiece">
      <img src={src} alt={title} className="img"/>
      <figcaption className="figcaption"> {title} </figcaption>
    </figure>
  )
}

export default Masterpiece