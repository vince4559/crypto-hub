import { Box, FormControl, Heading, Image, Input, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { CryptoData } from '../context/CryptoContext';
import NumberFormat from '../utility/NumberFormat';


export interface ListCoinProps{
  "id": string,
  "symbol": string,
  "name": string,
  "image": string,
  "current_price": number,
  "high_24h": number,
  "low_24h": number,
  "price_change_24h": number,
  "market_cap_change_percentage_24h": number,
  "ath": number,
  "ath_date": number,
  "atl": number,
  "atl_date": number,
  "price_change_percentage_24h": number
};



const CoinTable = () => {
  const {currency, symbol, fetchCoin, listCoin, loading} = CryptoData()
  const [search, searchSet] = useState<string>('');
  const [pageNumber, pageNumberSet] = useState<number>(0);
  const navigate = useNavigate()



  useEffect(() => {
    let coinInfo = fetchCoin()
    return () => {
      !coinInfo
    }
  },[currency])
 
  const handleCoinSearch = () => {
    return listCoin?.filter((coin:ListCoinProps) => 
    coin?.name.toLowerCase().includes(search) ||
    coin?.symbol.toLowerCase().includes(search)
    )
  }
 
  const userPage:number = 10;
  const pageVisited = pageNumber * userPage;
  const pageCount = Math.ceil(((handleCoinSearch()?.length) / userPage ));
  const changePage = ({selected}:any) => {
    pageNumberSet(selected)
    window.scroll(0, 450)
  }

  return (
   <Box p={'3rem'}>
    <Heading textAlign={'center'} size={'md'} m={4} color='white'>
      Crypto prices for market Cap
    </Heading>
   <VStack>
   <FormControl w={'70%'}>
     <Input type={'search'} 
     variant={'outline'}
     value={search}
     onChange={(e) => searchSet(e.target.value)}
     placeholder={'search for crypto'} />
    </FormControl>
   </VStack>

      {/* setting up table data */}

   <TableContainer mt={'4rem'}>
    {
      loading? 
      (<VStack>
      <Spinner size={'lg'} />
      <Text>Data Loading</Text>
      </VStack>) 
      :
       (
        <Table variant={'simple'}>
          <Thead>
            <Tr >
              <Th color={'white'} >Coin</Th>
              <Th color={'white'} >Price</Th>
              <Th color={'white'} >24h %Price_change</Th>
              <Th color={'white'} >24h %market cap</Th>
              <Th color={'white'} >all_time_low</Th>
              <Th color={'white'} >all_time_high</Th>
            </Tr>
          </Thead>
          <Tbody>
           {
            handleCoinSearch()
            ?.slice(pageVisited, pageVisited + userPage)
            ?.map((coin:ListCoinProps) => {
              const profit = coin?.price_change_percentage_24h >= 0;
              const mkt_cap_plus = coin?.market_cap_change_percentage_24h >=0
              return(
                <Tr key={coin.id} 
                onClick={() => navigate(`/coins/${coin.id}` , {replace:true}) }
                cursor='pointer' _hover={{backgroundColor : 'green'}}
                >
                  <Td>
                    
                      <Image alt={coin?.name} src={coin?.image} w='70px' />
                      <Text color={'white'} >{coin?.name}</Text>
                   
                  </Td>
                  <Td>
                    <Text>{symbol}{NumberFormat(coin?.current_price.toFixed(2))}</Text>
                  </Td>
                  <Td fontWeight={'bold'} color={profit? 'green.200' : 'red.400'}>
                    {profit && '+'}{coin?.price_change_percentage_24h.toFixed(2)}
                  </Td>
                  <Td fontWeight={'bold'} color={mkt_cap_plus? 'green.200' : 'red.400'}>
                    {mkt_cap_plus && '+'}{coin?.market_cap_change_percentage_24h.toFixed(2)}
                  </Td>
                  <Td>
                    {symbol}{NumberFormat(coin.atl.toFixed(2))}
                   <Text color={'white'} fontWeight='bold' >
                    {coin.atl_date.toString().split('T')[0]}
                   </Text>
                  </Td>
                  <Td>
                    {symbol}{NumberFormat(coin?.ath.toFixed(2))}
                   <Text color={'white'} fontWeight='bold' >
                    {coin.ath_date.toString().split('T')[0]}
                   </Text>
                  </Td>
                </Tr>
              )
            })
           }
          </Tbody>
        </Table>
       )
       }
   </TableContainer>
        {/* setting up pagination  */}

        <ReactPaginate 
          pageCount={pageCount}
          onPageChange={changePage}
        //  renderOnZeroPageCount ={null}
        previousLabel={''}
        nextLabel={''}
        containerClassName={'paginationBtns'}
        activeClassName={'paginationActive'}
          />
   </Box>
  )
}

export default CoinTable
