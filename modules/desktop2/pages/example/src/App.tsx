import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Switch } from 'react-router-dom'
import LoadingPage from './pages/LoadingPage'

function App() {

  return (
    <>
     <HashRouter>
      <Switch>
        <Route path={'/loading'} component={LoadingPage}/>
        <Route exact path={'/'} component={()=>{
          return <div>
            Opps, there's nothing here, do not access this page directly, checkout App.tsx pls
          </div>
        }}/>
      </Switch>
      </HashRouter>
    </>
  )
}

export default App
