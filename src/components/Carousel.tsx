import { Box, HStack, Image, Text, VStack, } from "@chakra-ui/react"
import {useEffect, useState } from 'react'
import axios from "axios"
import { TrendingCoins } from "../config/api";
import { CryptoData } from "../context/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import NumberFormat from "../utility/NumberFormat";

interface TrendingProps {
  "id": string,
  "symbol": string,
  "name": string,
  "image": string,
  "current_price": number,
  "price_change_percentage_24h": number, 
};

const Carousel = () => {
  const {currency, symbol} = CryptoData();
const [trending, trendingSet] = useState<TrendingProps[]>();
const fetchTrending = async() => {
    const {data} = await axios.get(TrendingCoins(currency))
    trendingSet(data)
};


useEffect(() => {
fetchTrending()
},[currency]);

const responsive ={
  0:{items:2},
  512: {items:4}
};

const items = trending?.map((coin:TrendingProps) => {
  const profit = coin.price_change_percentage_24h >=0;
  return(
    <Link to={`/coins/${coin.id}`} key={'coind?.id'}>
   <VStack>
   <Image alt={coin.name} objectFit={'contain'} 
    src={coin?.image}
    w={'120px'} p={2}
    />
    <HStack>
    <Text fontSize={'1.3rem'} color={'white'} >{coin.symbol}</Text>
    <Text color={profit ? 'green.300' : 'red.500'} fontWeight={'bold'}>
    {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}
    </Text>
    </HStack>
    <Text fontWeight={'bold'}>
        {symbol} {NumberFormat(coin?.current_price?.toFixed(2))}
    </Text>
   </VStack>
    </Link>
  )
})

  return (
    <HStack spacing={1} m={'3rem'}> 
    <AliceCarousel 
    items={items}
    mouseTracking
    infinite
    autoPlayInterval={900}
    animationDuration={1000}
    disableDotsControls
    responsive={responsive}
    autoPlay
    disableButtonsControls
    />
  </HStack>
  )
}

export default Carousel
