'use client'

import { useEffect, useState } from "react";
import { Button, FormControlLabel, FormGroup, Grid, Switch, TextField, Typography } from "@mui/material";

import TokenAsset from "@/components/TokenAsset";
import { AbstractProvider, formatEther } from "ethers";

// "BTC", "ETH", "USDT", "BNB", "USDC", "XRP", "ADA", "DOGE", "TRX", "SOL", "MATIC", "LTC", "DOT", "TON", "DAI", "BUSD", "WBTC", "SHIB"

const ethers = require('ethers')
const provider: AbstractProvider = ethers.getDefaultProvider()

export default function Home() {
  const allCoins = ["BTC", "ETH", "USDT", "BNB", "USDC", "XRP", "ADA", "DOGE"];
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([])
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [address, setAdress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [balanceError, setBalanceError] = useState<boolean>(false);
  
  const getBalance = (address: string) => {
    provider.getBalance(address)
      .then((balance: any) => {
        setBalance(formatEther(balance))
        setBalanceError(false)
      })
      .catch(() =>setBalanceError(true))
  }

  const toggleFavorite = () =>{
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
    favorites ? setFavoriteCoins(JSON.parse(favorites)) : setFavoriteCoins([])
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-3">
      <FormGroup>
        <FormControlLabel control={<Switch onChange={toggleFavorite} />} label="Favorites" />
      </FormGroup>
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
      <Typography fontWeight={500} fontSize={{xs: 24, sm: 32}} padding={'20px'}>
        Check balance
      </Typography>
      <form
        className="flex flex-row items-center"
        onSubmit={(event) => {
          event.preventDefault();
          getBalance(address)
        }}
      >
        <TextField
          placeholder="Wallet address"
          required
          size="small"
          className="w-[400px] mr-4 p-2"
          onChange={e => setAdress(e.target.value)}
        />
        <Button variant="outlined" type="submit" size="large">Submit</Button>
      </form>
      {
        balance && <Typography fontSize={28} fontWeight={500}>Balance: {balance} ETH</Typography>
      }
      {
        balanceError && <Typography fontSize={28} fontWeight={500} className="text-[red]">Something goes wrong 😢</Typography>
      }
    </main>
  )
}
