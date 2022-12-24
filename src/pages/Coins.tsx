import { Box, Button, Grid, GridItem, HStack, Image, Link, Stack, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LineChart from '../components/LineChart';
import { SingleCoin } from '../config/api';
import { CryptoData } from '../context/CryptoContext'


interface CurrProp{
  currency: |string,
  symbol:string
};

type ParamsProps = {
  id: string
}

const Coins = () => {
 const {currency, symbol}:any =  CryptoData();
 const [coin, coinSet] = useState<CoinProps>();
const {id}= useParams() as ParamsProps
 const fetchSingleCoin = async() => {
  const { data } = await axios.get(SingleCoin(id))
  coinSet(data)
 };

//  console.log(coin)

 useEffect(() => {
let single = fetchSingleCoin()
return () => {
  !single
}
 },[currency, id]);

 
  return (
   <Box p={5} >
   <Grid templateColumns='repeat(3, 1fr)' gap={'3rem'} >
      <GridItem colSpan={[3,3,1,1]}>
        <VStack p={3} spacing={0}>
          <Image alt={coin?.id} src={coin?.image.large} w='100px' m={2} />
          <Text  fontSize='1.8rem'>{coin?.name} ({coin?.symbol})</Text>                   
        </VStack>
        <Text color='white' textAlign={'left'} >
            {coin?.description.en.slice(0, 400)}
          </Text>
       <Stack mt={4}>
       <Text fontWeight={'bold'} fontSize={'1.8rem'}>
        Rank:{coin?.market_cap_rank}</Text>
        <Text color={'white'} fontSize="xl">
          homepage: <Link isExternal href={coin?.links.homepage[0]} color={'gold'}> 
          {coin?.links.homepage[0]}</Link>
        </Text>
       <Text fontWeight={'bold'} fontSize={'1.2rem'}>
       Current_Price: {symbol}{coin?.market_data?.current_price[currency.toLowerCase()]}
       </Text>
       <Text fontWeight={'bold'} fontSize={'1.2rem'}>
       Market_Cap:  {symbol}{coin?.market_data.market_cap[currency.toLowerCase()]}
       </Text>
       </Stack>

      </GridItem >
      <GridItem colSpan={[3,3,2,2]} >
        <LineChart id={coin?.id} />
      </GridItem>
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
  },
  "image": {
      "large":string
  },
  "market_cap_rank": number,
  "market_data": {
      "current_price": string  
      "market_cap": string
  },  
}