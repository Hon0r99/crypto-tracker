'use client'

import { NextPage } from "next";
import { Typography } from "@mui/material";

import CoinList from "@/components/CoinList";
import BalanceForm from "@/components/BalanceForm";

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-3">
      <Typography fontWeight={500} fontSize={{xs: 24, sm: 32}} padding={'20px'} textAlign={'center'}>
        Cryptocurrency Tracker
      </Typography>
      <CoinList />
      <BalanceForm />
    </main>
  )
}

export default Home;