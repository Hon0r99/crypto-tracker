'use client'

import BalanceForm from "@/components/BalanceForm";
import CoinList from "@/components/CoinList";
import { Typography } from "@mui/material";

export default function Home() {
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
