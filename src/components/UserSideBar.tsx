import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Image, Avatar, Stack, Text, VStack, useToast, HStack, Box } from '@chakra-ui/react'
import { signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { CryptoData } from '../context/CryptoContext';
import { auth, db } from '../fireBaseApp';
import NumberFormat from '../utility/NumberFormat';
import { ListCoinProps } from './CoinTable';

export const UserSideBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
   const {user, listCoin, watchlist, symbol} = CryptoData();
 
   const logOut = () => {
    signOut(auth)
    toast({
        title: 'logout successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
   };

   const removeFromWatchList =async(coin:ListCoinProps)=>{
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
      <>
        <Avatar  src={user.photoURL}
        name={user.displayName || user.email }
        cursor={'pointer'}
        onClick={onOpen}
        />
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}        
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader  color='goldenrod'>
               <Stack>
                <Text fontFamily={'serif'} color='goldenrod'  >
                     Welcome to Crypto-Hub 
                </Text>
                <VStack my={3}>
                <Avatar  
                    w={'130px'}
                    h={'120px'}
                    src={user.photoURL}
                    name={user.displayName}
                    cursor={'pointer'}
                    onClick={onOpen}
                    />
                    <Text color={'black'}>{user.email}</Text>
                </VStack>                    
               </Stack>                
            </DrawerHeader>
  
            <DrawerBody bg={'gray.800'} p={5} mt={2} 
            textAlign={'center'} overflowY={'scroll'}>
              <Text  fontSize='2rem'>Watchlist</Text>
              <Box>
                {
                  listCoin.map((coin:ListCoinProps) => {
                    if(watchlist.includes(coin.id))
                    return(
                      <HStack key={coin.id} 
                      bg='gray.600'
                      border='solid 1px gold' my={3} 
                      spacing={4} p={2}>
                        <Text>{coin.name}</Text>
                        <Text>{symbol}{NumberFormat(coin?.current_price.toFixed(2))}</Text>
                        <Button color={'red'} 
                        fontSize='1.2rem'
                        fontFamily={'cursive'}
                        colorScheme='none' 
                        onClick={() => removeFromWatchList(coin)}
                        >
                          X
                        </Button>
                      </HStack>
                    )
                  })
                }
              </Box>
            </DrawerBody>
  
            <DrawerFooter bg={'gray.800'}>
              <Button colorScheme='red' 
              size={'lg'}
              onClick={logOut}
              color={'gold'} w={'full'}>
                Logout
                </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }