import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Galleria from './pages/Galleria'

function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/galleria" component={Galleria} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes