import { Box, Spinner, VStack } from '@chakra-ui/react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoData } from '../context/CryptoContext';
import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    LineElement,
    CategoryScale, //x-axis
    LinearScale,  // y-axis
    PointElement,
    ChartOptions,
 } from 'chart.js';

 ChartJS.register(
    LineElement,
    CategoryScale, 
    LinearScale,  
    PointElement
 );


const LineChart = ({id}:any) => {
   const {currency, symbol} = CryptoData();
   const [days, daysSet] = useState<number>(1);
    const[historic, historicSet] = useState<any>(null);    

    
    const fetchHistoric = async() => {
       const  { data } = await axios.get(HistoricalChart(id, days, currency))
       historicSet(data?.prices)
    };

console.log(historic);

useEffect(() => {
let history = fetchHistoric()
return () => {
    !history
}
},[currency, days]);

const data = {
    labels: historic?.map((coin:any) => {
        let date = new Date(coin[0]);
        let time = date.getHours() > 12?
        `${date.getHours() - 12}:${date.getMinutes()} PM`:
        `${date.getHours()}:${date.getMinutes()} AM`
        return days === 1 ? time : date.toLocaleDateString()
        }),
    datasets:[{
            labels: `price past ${days} in ${currency}`,
            data: historic?.map((coin:any) =>coin[1] ),
            borderColor: 'gold',
            fil:true,
            tension:0.4
        }]
};

const options: ChartOptions<any> = {
    Element: {
        points: {
            radius: 0
        }
    },
}

  return (
    <Box w={'100%'}>
        {
            !historic? 
            (<VStack><Spinner size={'lg'} /></VStack>) 
            : 
            (
            <Box  mt={['2rem','2rem','6rem','6rem']}>
              <Line
              data ={data}
                options={options}
              />
             </Box>
            )
        }        
    </Box>
  )
}

export default LineChart

