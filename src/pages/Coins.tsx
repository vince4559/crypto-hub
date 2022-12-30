import { Box, Button, Grid, GridItem, HStack, Image, Link, Spinner, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { async } from '@firebase/util';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LineChart from '../components/LineChart';
import { SingleCoin } from '../config/api';
import { CryptoData } from '../context/CryptoContext'
import { db } from '../fireBaseApp';

export interface CoinProps{
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


interface CurrProp{
  currency: |string,
  symbol:string
};

type ParamsProps = {
  id: string
}

const Coins = () => {
 const {currency, symbol, loading, loadingSet, user, watchlist} =  CryptoData();
 const [coin, coinSet] = useState<CoinProps>();
const {id}= useParams() as ParamsProps
const toast = useToast();
 const fetchSingleCoin = async() => {
  const { data } = await axios.get(SingleCoin(id))
  coinSet(data)
  loadingSet(false)
 };

//  console.log(coin)

 useEffect(() => {
let single = fetchSingleCoin()
return () => {
  !single
}
 },[currency, id]);
 
const inWatchList = watchlist.includes(coin?.id);

 const addToWatchList =async()=>{
  const coinRef = doc(db, 'watchlist', user.uid);
  try {
    await setDoc(coinRef,
      {coins:watchlist? [...watchlist, coin?.id]: [coin?.id]
      });
      toast({
        title: `${coin?.name} added to watchlist `,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
  } catch (error:any) {
    toast({
      title: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }
 };

  const removeFromWatchList =async()=>{
  const coinRef = doc(db, 'watchlist', user.uid);
  try {
    await setDoc(coinRef,
      {coins: watchlist.filter((watch:string) => watch !==coin?.id)},
      {merge: true}
      );
      toast({
        title: `${coin?.name} removed from watchlist `,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
  } catch (error:any) {
    toast({
      title: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }
 };
 
  return (
   <Box p={5} >
    {
      loading? 
      (<VStack>
          <Spinner size={'lg'} />
          <Text color={'red.500'}>Data loading</Text>
          </VStack>) 
          :
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
      {
        user &&  
        <Button colorScheme={inWatchList? 'red' : 'yellow'} color='black' 
        onClick={inWatchList? removeFromWatchList: addToWatchList}
        >
        {inWatchList? 'Remove from watchlist' : 'Add to Watchlist'}
      </Button>
      }
       </Stack>

      </GridItem >
      <GridItem colSpan={[3,3,2,2]} mb={'3rem'} >
        <LineChart id={coin?.id} />
      </GridItem>
   </Grid>
   }
   </Box>
  )
}

export default Coins


