import { Box, Grid, GridItem, Image, Link, Stack, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoData } from '../context/CryptoContext'
import NumberFormat from '../utility/NumberFormat';


const Coins = () => {
 const {currency, symbol} =  CryptoData();
 const [coin, coinSet] = useState<CoinProps>();
const {id} = useParams()
 const fetchSingleCoin = async() => {
  const { data } = await axios.get(SingleCoin(id))
  coinSet(data)
 };

 console.log(coin)

 useEffect(() => {
let single = fetchSingleCoin()
return () => {
  !single
}
 },[])
 
  return (
   <Box p={5} >
   <Grid templateColumns='repeat(3, 1fr)' >
      <GridItem colSpan={[3,3,1,1]}>
        <VStack p={3} spacing={0}>
          <Image alt={coin?.id} src={coin?.image.large} w='100px' m={2} />
          <Text  fontSize='1.8rem'>{coin?.name} ({coin?.symbol})</Text>                   
        </VStack>
        <Text color='white' textAlign={'left'} >
            {coin?.description.en.slice(0, 600)}
          </Text>
       <Stack mt={4}>
       <Text fontWeight={'bold'} fontSize={'1.8rem'}>
        Rank:{coin?.market_cap_rank}</Text>
        <Text color={'white'} fontSize="xl">
          homepage: <Link isExternal href={coin?.links.homepage[0]} color={'gold'}> 
          {coin?.links.homepage[0]}</Link>
        </Text>
        <Text color={'white'} fontSize="xl">
          Official_forum: <Link isExternal href={coin?.links.official_forum_url[0]} color={'gold'}> 
          {coin?.links.official_forum_url[0]}</Link>
        </Text>
       <Text fontWeight={'bold'} fontSize={'1.2rem'}>
       Current_Price: {symbol}{coin?.market_data.current_price[currency.toLowerCase()]}
       </Text>
       <Text fontWeight={'bold'} fontSize={'1.2rem'}>
       Market_Cap:  {symbol}{coin?.market_data.market_cap[currency.toLowerCase()]}
       </Text>
       </Stack>

      </GridItem>
      <GridItem colSpan={2}>1</GridItem>
   </Grid>
   </Box>
  )
}

export default Coins


interface CoinProps{
  "id":string,
  "symbol": string,
  "name": string,
  "description": {
      "en": string,
      },
  "links": {
      "homepage": [
          string,
      ],
    
      "official_forum_url": [
         string,
      ],
  },
  "image": {
      "large":string
  },
  "market_cap_rank": number,
  "market_data": {
      "current_price": {
          "eur": number,
          "gbp": number,
          "ngn":number,
          "usd": number,
          },
        
      "market_cap": {
         
          "eur":number,
          "gbp": number,
          "ngn": number,
          "usd": number,
         
      },
  },  
}