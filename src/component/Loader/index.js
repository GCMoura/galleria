import React from 'react'

import './index.scss'

function Loader() {
  return(
    <div className="loader">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__ball"></div>
        <h4>Loading...</h4>
      </div>

  )
}

export default Loader