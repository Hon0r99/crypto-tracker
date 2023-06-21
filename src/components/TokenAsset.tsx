
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { Box, Typography, } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import { numberWithCommas, roundDecimal } from '@/utils/general';

interface Props {
  symbol: string,
  isFavorite: boolean
}

export default function TokenAsset({symbol, isFavorite}: Props) {
  const [logo, setLogo] = useState<string>('');
  const [coinData, setCoinData] = useState<any>();

  async function fetchLogo(): Promise<void> {
    try {
      const response = await fetch(`/api/logo/${symbol}`);
      const responseJson = await response.json();
      setLogo(responseJson)
    } catch (error) {
      console.log(error);
    }
  }
  
  async function fetchCoinData(): Promise<void> {
    try {
      const response = await fetch(`/api/coin-data/${symbol}`);
      const responseJson = await response.json();
      setCoinData(responseJson)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLogo();
    fetchCoinData()
  }
  , []);

  return (
     <Box
        border={'2px solid'}
        sx={{
          '&:hover': {
            borderColor: 'black'
          },
        }}
        className='
          relative 
          left-0 
          w-[100%]
          h-[90px] 
          flex 
          items-center 
          justify-evenly 
          cursor-pointer
          hover:left-[-5px]
          transition-all
        '
      >
        {
          logo && 
          <Box
            className='hidden md:block'

          >
            <Image
              src={logo}
              alt={`${symbol} icon`}
              width={50}
              height={50}
              quality={100}
            />
          </Box>
        }
        {
          coinData &&
          <>
            <Box>
              <Typography fontWeight={500} fontSize={{xs: 14, sm: 20}}>
                {coinData?.name}
                {' '}
                <Typography component={'span'}>{coinData?.symbol}</Typography>
              </Typography>
              <Typography fontSize={{xs: 14, sm: 16}}className='flex'>
                ${roundDecimal(coinData?.quote['USD'].price, 2)}
                <Typography 
                  component={'span'} 
                  fontSize={10}
                  color={coinData?.quote['USD'].percent_change_24h > 0 ? '#47A663' : '#C53030'}
                >
                  {roundDecimal(coinData?.quote['USD'].percent_change_24h, 2)}%
                </Typography>
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={500} fontSize={{xs: 12, sm: 16}}>Market Cap</Typography>
              <Typography fontSize={{xs: 12, sm: 16}}>
                ${numberWithCommas(Math.trunc(coinData?.quote['USD'].market_cap))}
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={500} fontSize={{xs: 12, sm: 16}}>Volume(24H)</Typography>
              <Typography fontSize={{xs: 12, sm: 16}}>
                ${numberWithCommas(Math.trunc(coinData?.quote['USD'].volume_24h))}
              </Typography>
            </Box>
            {
              isFavorite
              ? <StarIcon />
              : <StarOutlineIcon />
            }
          </>
        }
      </Box>
  )
}
