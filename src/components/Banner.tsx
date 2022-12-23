import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import Carousel from './Carousel'


const Banner = () => {
  return (
  <Box p={3} pt={'4rem'}>
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

