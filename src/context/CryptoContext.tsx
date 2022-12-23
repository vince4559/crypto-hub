import { useState, createContext, useContext, useEffect, ReactNode, } from "react";

interface ChildrenProp {
    children: ReactNode
}

const Crypto = createContext<any>({})

const CryptoContext:React.FC<ChildrenProp> = ({children}) => {
    const [currency, currencySet] = useState<string>('NGN');
    const [symbol, symbolSet] = useState<string>('NGN');

    useEffect(() => {
        if(currency === 'NGN')symbolSet('NGN')
        else if(currency === 'USD')symbolSet('$')
        else if(currency === 'EUR')symbolSet('EU')
        else if (currency === 'GBP')symbolSet('GBP')
    },[currency])

  return (
   <Crypto.Provider value={{currency, symbol, currencySet}}>
    {children}
   </Crypto.Provider>
  )
}

export default CryptoContext


export const CryptoData = () => {
    return useContext(Crypto)
}