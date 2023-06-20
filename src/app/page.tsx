'use client'

import { useEffect, useState } from "react";
import { FormControlLabel, FormGroup, Grid, Switch, Typography } from "@mui/material";

import TokenAsset from "@/components/TokenAsset";

// "BTC", "ETH", "USDT", "BNB", "USDC", "XRP", "ADA", "DOGE", "TRX", "SOL", "MATIC", "LTC", "DOT", "TON", "DAI", "BUSD", "WBTC", "SHIB"

export default function Home() {
  const allCoins = ["BTC", "ETH", "USDT", "BNB", "USDC", "XRP", "ADA", "DOGE"];
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([])
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const toggle = () =>{
    setIsFavorite((prev: boolean) => !prev);
  }

  const favoriteToggle = (coin: string) => {
    if (favoriteCoins.includes(coin)) {
      setFavoriteCoins(prev => {
        const coins = prev.filter((item: string) => item != coin);
        localStorage.setItem('favoriteCoins', JSON.stringify(coins));
        return coins;
      })
    }else {
      setFavoriteCoins((prev =>{
        const coins = [...prev, coin]
        localStorage.setItem('favoriteCoins', JSON.stringify(coins));
        return coins;
      }))
    }
  }

  useEffect(() => {
    const favorites = localStorage.getItem('favoriteCoins')
    console.log(favorites);
    favorites ? setFavoriteCoins(JSON.parse(favorites)) : setFavoriteCoins([])
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-1">
      <FormGroup>
        <FormControlLabel control={<Switch onChange={toggle} />} label="Favorites" />
      </FormGroup>
      <span>{isFavorite.toString()}</span>
      <span>{favoriteCoins.toString()}</span>

      <Typography fontWeight={500} fontSize={{xs: 24, sm: 32}} padding={'20px'}>
        Cryptocurrency Tracker
      </Typography>
      <Grid container spacing={2}>
        {
          isFavorite 
          ? favoriteCoins.map((coin: string, index: number) =>  (
            <Grid key={index} item xs={12} md={6} xl={4}>
              <TokenAsset symbol={coin} isFavorite={favoriteCoins.includes(coin)}></TokenAsset>
            </Grid>
          ))
          : allCoins.map((coin: string, index: number) =>  (
            <Grid key={index} item xs={12} md={12} lg={6} xl={4} onClick={() => favoriteToggle(coin)}>
              <TokenAsset symbol={coin} isFavorite={favoriteCoins.includes(coin)}></TokenAsset>
            </Grid>
          ))
        }
      </Grid>
    </main>
  )
}
