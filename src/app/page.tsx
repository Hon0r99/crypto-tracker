'use client'

import { FormEvent, useEffect, useState } from "react";
import { Button, FormControlLabel, FormGroup, Grid, Switch, TextField, Typography } from "@mui/material";

import TokenAsset from "@/components/TokenAsset";
import { AbstractProvider, formatEther, isAddress } from "ethers";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ethers = require('ethers');
const provider: AbstractProvider = ethers.getDefaultProvider();

export default function Home() {
  const allCoins = ["BTC", "ETH", "USDT", "BNB", "USDC", "XRP"];

  const [favoriteCoins, setFavoriteCoins] = useLocalStorage<string[]>("favoriteCoins", []);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [address, setAdress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [balanceError, setBalanceError] = useState<string>('');

  const getBalance = (address: string) => {
    provider.getBalance(address)
      .then((balance: bigint) => {
        setBalance(formatEther(balance));
        setBalanceError('');
      })
      .catch(() => setBalanceError('Something goes wrong 😢'))
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if(!isAddress(address)) {
      setBalanceError('Invalid ETH address');
    }else if (address === '') {
      setBalanceError('Address is requaried');
    }else {
      getBalance(address);
    }
  }

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
          ? favoriteCoins.map((coin: string) =>  (
            <Grid key={coin} item xs={12} md={12} lg={6} xl={4}  onClick={() => handleTokenClick(coin)}>
              <TokenAsset symbol={coin} isFavorite={favoriteCoins.includes(coin)}></TokenAsset>
            </Grid>
          ))
          : allCoins.map((coin: string) =>  (
            <Grid key={coin} item xs={12} md={12} lg={6} xl={4} onClick={() => handleTokenClick(coin)}>
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
        onSubmit={(event) => {handleSubmit(event)}}
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
        balance && <Typography fontSize={26} fontWeight={500}>Balance: {balance} ETH</Typography>
      }
      {
        balanceError && <Typography fontSize={18} fontWeight={500} className="text-[red]">{balanceError}</Typography>
      }
    </main>
  )
}
