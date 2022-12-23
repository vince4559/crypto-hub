
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import CryptoContext from './context/CryptoContext'
import './index.css'
import 'react-alice-carousel/lib/alice-carousel.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
    <CryptoContext>
      <BrowserRouter>
        <App />
    </BrowserRouter>
    </CryptoContext>
    </ChakraProvider>
  </React.StrictMode>,
)
