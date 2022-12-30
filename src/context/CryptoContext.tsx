import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, createContext, useContext, useEffect, ReactNode, } from "react";
import { ListCoinProps } from "../components/CoinTable";
import { CoinList } from "../config/api";
import { auth, db } from "../fireBaseApp";

interface ChildrenProp {
    children: ReactNode
}

const Crypto = createContext<any>({})

const CryptoContext:React.FC<ChildrenProp> = ({children}) => {
    const [currency, currencySet] = useState<string>('NGN');
    const [symbol, symbolSet] = useState<string>('NGN');
    const [listCoin, listCoinSet] = useState<ListCoinProps[]>([]);
    const [loading, loadingSet] = useState<boolean>(true);
    const [user, userSet] = useState<any>();
    const [watchlist, watchlistSet] = useState<string[]>([]);

    useEffect(() => {
      if(user){
        const coinRef = doc(db, 'watchlist', user.uid)
        
      var unsubscribe =   onSnapshot(coinRef, (coin) => {
          if(coin.exists()){
            console.log(coin.data().coins)
            watchlistSet(coin.data().coins);
          }else{
            'No Data in the Watchlist'
          }
        })
      }
      return () => {
        unsubscribe
      }
    }, [user])

    useEffect(() => {
      onAuthStateChanged(auth, user => {
        if(user) userSet(user);
        else(userSet(null))
      })
    },[])

    const fetchCoin = async() => {
        const {data} = await axios.get(CoinList(currency))
        listCoinSet(data)
        loadingSet(false)
      };

    useEffect(() => {
        if(currency === 'NGN')symbolSet('NGN')
        else if(currency === 'USD')symbolSet('$')
        else if(currency === 'EUR')symbolSet('EU')
        else if (currency === 'GBP')symbolSet('GBP')
    },[currency])

  return (
   <Crypto.Provider value={{currency, symbol, currencySet,
    listCoin, loading, loadingSet, fetchCoin,  user, watchlist}}>
    {children}
   </Crypto.Provider>
  )
}

export default CryptoContext


export const CryptoData = () => {
    return useContext(Crypto)
}