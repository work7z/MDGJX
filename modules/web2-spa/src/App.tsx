import { useState } from 'react'
import './App.css'
import './index.scss'
import "./globals.css";
import Home from './[lang]/[category]/page';
import ClientWrapper from './[lang]/[category]/src/common/clientWrapper';

function App() {

  return (
    <>
      <ClientWrapper>
        <Home params={{
          subCategory: '',
          category: '',
          id: ''
        }} searchParams={{}} />
      </ClientWrapper>
    </>
  )
}

export default App
