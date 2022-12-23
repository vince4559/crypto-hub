
import { Box } from '@chakra-ui/react'
import Banner from '../components/Banner'
import CoinTable from '../components/CoinTable'
import crypto from "../assets/crpto.jpg" 

const Home = () => {
  return (
  <Box bgImage={crypto} bgPos={'top'} bgRepeat={'no-repeat'} 
  bgBlendMode={'darken'} bgColor={'blackAlpha.700'} >
    <Banner />
    <CoinTable />
  </Box>
  )
}

export default Home
