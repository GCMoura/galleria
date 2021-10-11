import React from "react";
import { useHistory } from "react-router";

function Galleria() {

  const history = useHistory()

  const test = history.location.state.detail
  console.log(test)
  return(
    <p>Oi</p>
    
  )

}

export default Galleria