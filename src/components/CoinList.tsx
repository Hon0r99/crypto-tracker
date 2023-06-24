
import { useState } from "react";
import { Box, FormControlLabel, FormGroup, Grid, Switch, Typography } from "@mui/material";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import Coin from "@/components/Coin";

const allCoins = ["BTC", "ETH", "USDT", "BNB", "USDC", "XRP"];

const CoinList: React.FC = () => {
  const [favoriteCoins, setFavoriteCoins] = useLocalStorage<string[]>("favoriteCoins", []);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const toggleFavorite = (): void =>{
    setIsFavorite((prev: boolean) => !prev);
  }

  const handleTokenClick = (coin: string): void => {
    if (favoriteCoins.includes(coin)) {
      setFavoriteCoins((prev: string[]) => prev.filter((item: string) => item != coin));
    }else {
      setFavoriteCoins(((prev: string[]) => [...prev, coin]));
    }
  }

  return (
    <Box className='w-[100%] transition-all'>
      <Typography fontWeight={500} fontSize={{xs: 22, sm: 28}} padding={'20px'} textAlign={'center'}>
        Coins list
      </Typography>
      <FormGroup>
        <FormControlLabel control={<Switch onChange={toggleFavorite} />} label="Favorites" />
      </FormGroup>
      <Grid container spacing={2}>
        {
          isFavorite 
          ? favoriteCoins.map((coin: string) =>  (
              <Coin key={coin} symbol={coin} isFavorite={favoriteCoins.includes(coin)} handleTokenClick={handleTokenClick}></Coin>
          ))
          : allCoins.map((coin: string) =>  (
              <Coin key={coin} symbol={coin} isFavorite={favoriteCoins.includes(coin)} handleTokenClick={handleTokenClick}></Coin>
          ))
        }
      </Grid>
    </Box>
  )
}

export default CoinList;