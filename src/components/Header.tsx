import { Flex, FormControl, HStack, Input, Select,} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { CryptoData } from "../context/CryptoContext"

const Header = () => {
  const {currency ,currencySet} = CryptoData();

  return (
   <HStack w={'100vw'} justify={'space-between'} bg={'gray.900'} p={2} px={'2rem'}>
   <Flex fontSize={'2xl'}>
   <NavLink  to={'/'} style={({isActive}) => isActive? {color:'goldenrod'}:{color:'white'}} >
      Cryto-Hub
    </NavLink>
   </Flex>

     <FormControl  w={'100px'}>
      <Select 
      rounded={'full'}
      p={2}
      variant={'outline'}
      value={currency}
      onChange={(e) => currencySet(e.target.value)}
      >
        <option value={'NGN'}>NGN</option>
        <option value={'USD'}>USD</option>
        <option value={'EUR'}>EUR</option>
        <option value={'GBP'}>GBP</option>
      </Select>
    </FormControl>

   </HStack>
  )
}
export default Header
