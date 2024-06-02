import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Switch } from 'react-router-dom'
import LoadingPage from './pages/LoadingPage'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {
  return (
    <>
      <MantineProvider >
     <HashRouter>
      <Switch>
        <Route path={'/loading'} component={LoadingPage}/>
        <Route exact path={'/'} component={()=>{
          return <LoadingPage/>
          // return <div>
          //   Opps, there's nothing here, do not access this page directly, checkout App.tsx pls
          // </div>
        }}/>
      </Switch>
      </HashRouter>
      </MantineProvider>
    </>
  )
}

export default App
