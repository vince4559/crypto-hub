import './App.css'
import { Route, Routes } from 'react-router-dom'
import SharedComponents from './components/SharedComponents'
import Home from './pages/Home'
import Coins from './pages/Coins'
import { Box } from '@chakra-ui/react'

function App() {
 
  return (
    <Box bg={'black'} minH={'100vh'} w={'100vw'} >
      <Routes>
        <Route path='/' element={<SharedComponents />}>
        <Route index element={<Home />} />
        <Route path='/coins/:id' element={<Coins />} />
      </Route>
    </Routes>
    </Box>
  )
}

export default App
