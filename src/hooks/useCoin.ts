import { CoinI } from "@/interfaces/coin.interface";
import { useEffect, useState } from "react"

export const useCoin = (symbol: string) => {
  const [coin, setCoin] = useState<CoinI>();
  
  useEffect(() => {
    const loadCoin = async () => {  
      const response = await fetch(`/api/coin-data/${symbol}`);
      const data = await response.json();
      setCoin(data);
    }

    loadCoin();
  }, [])
  
  return { coin };
}