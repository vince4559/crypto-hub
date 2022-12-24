import { Box, Button, color, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoData } from '../context/CryptoContext';
import { Line } from 'react-chartjs-2';
import { chartDays, ChartDaysProps } from '../config/ChartDays';
import { 
    Chart as ChartJS,
    LineElement,
    CategoryScale, //x-axis
    LinearScale,  // y-axis
    PointElement,
    Legend,
  Tooltip,  
    ChartOptions,
 } from 'chart.js';


 ChartJS.register(
    LineElement,
    CategoryScale, 
    LinearScale,  
    PointElement,
    Legend,
    Tooltip,
 );


const LineChart = ({id}:any) => {
   const {currency, symbol} = CryptoData();
   const [days, daysSet] = useState<number>(1);
    const[historic, historicSet] = useState<any>();    

    
    const fetchHistoric = async() => {
       const  { data } = await axios.get(HistoricalChart(id, days, currency))
       historicSet(data?.prices)
    };

// console.log(historic);

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
            label: `price past ${days}day in ${currency}`,
            data: historic?.map((coin:any) =>coin[1] ),
            borderColor: 'gold',
            backgroundColor: 'white',
            tension:0.4
        }]
};

const options: ChartOptions<any> = {
    elements:{
        point:{
            radius: 1,
        },
    },
}

  return (
    <Box w={'100%'}>
        {
            !historic? 
            (<VStack>
                <Spinner size={'lg'} />
                <Text color={'red.300'}>Toggle price if the chart does'nt come up</Text>
                </VStack>) 
            : 
            (
            <Box  mt={['2rem','2rem','4rem','4rem']}>
              <Line
              data ={data}
                options={options}
              />
              <HStack justify={'center'}>
                {chartDays.map((day:ChartDaysProps) => {
                    const selected = day.value === days;
                    return (
              <Button colorScheme={selected? 'yellow' : 'white'} border={'1px solid orange'} size={'sm'} 
              onClick={() => daysSet(day.value)}
              >
                {day.label}
            </Button>
            )
          })}
        </HStack>
             </Box>
            )
        }        
    </Box>
  )
}

export default LineChart

