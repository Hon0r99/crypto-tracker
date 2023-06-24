
import Image from 'next/image'
import { Box, Grid, Typography, } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import { numberWithCommas, roundDecimal } from '@/utils/general';
import { useGetCoin } from '@/hooks/useCoin';
import { useGetCoinLogo } from '@/hooks/useCoinLogo';

interface Props {
  symbol: string,
  isFavorite: boolean,
  handleTokenClick: Function
}

const Coin: React.FC<Props> = ({symbol, isFavorite, handleTokenClick}) => {
  const { logo } = useGetCoinLogo(symbol);
  const { coin } = useGetCoin(symbol);

  return (
    <Grid item xs={12} md={12} lg={6} xl={4}  onClick={() => handleTokenClick(symbol)}>
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
            coin &&
            <>
              <Box>
                <Typography fontWeight={500} fontSize={{xs: 14, sm: 20}}>
                  {coin?.name}
                  {' '}
                  <Typography component={'span'}>{coin?.symbol}</Typography>
                </Typography>
                <Typography fontSize={{xs: 14, sm: 16}}className='flex'>
                  ${roundDecimal(coin?.quote['USD'].price, 2)}
                  <Typography 
                    component={'span'} 
                    fontSize={10}
                    color={coin?.quote['USD'].percent_change_24h > 0 ? '#47A663' : '#C53030'}
                  >
                    {roundDecimal(coin?.quote['USD'].percent_change_24h, 2)}%
                  </Typography>
                </Typography>
              </Box>
              <Box>
                <Typography fontWeight={500} fontSize={{xs: 12, sm: 16}}>Market Cap</Typography>
                <Typography fontSize={{xs: 12, sm: 16}}>
                  ${numberWithCommas(Math.trunc(coin?.quote['USD'].market_cap))}
                </Typography>
              </Box>
              <Box>
                <Typography fontWeight={500} fontSize={{xs: 12, sm: 16}}>Volume(24H)</Typography>
                <Typography fontSize={{xs: 12, sm: 16}}>
                  ${numberWithCommas(Math.trunc(coin?.quote['USD'].volume_24h))}
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
    </Grid>
  )
}

export default Coin;