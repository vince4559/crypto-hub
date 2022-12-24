import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import Carousel from './Carousel'
import crypto from "../assets/crpto.jpg" 


const Banner = () => {
  return (
  <Box mt={'2rem'} py={'2rem'} bgImage={crypto} bgPos={'top'} bgRepeat={'no-repeat'} 
  bgBlendMode={'darken'} bgColor={'gray.900'} >
    <Stack>
      <Heading textAlign={'center'}>
        Top Trending Coins
      </Heading>
      <Text textAlign={'center'} fontFamily={'monospace'} fontSize={'1.2rem'} color={'white'}>
      Get all information about your favorite coins
      </Text>
    </Stack>
    <Carousel />
  </Box>
  )
}

export default Banner

