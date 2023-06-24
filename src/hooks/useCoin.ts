import axios from "axios";
import { useEffect, useState } from "react"

import { CoinI } from "@/interfaces/coin.interface";

export const useGetCoin = (symbol: string): {coin: CoinI} => {
  const [coin, setCoin] = useState<any>();
  
  useEffect(() => {
    const loadCoin = async () => {  
      const response = await axios.get(`/api/coin-data/${symbol}`);
      const data = response.data;
      setCoin(data);
    }

    loadCoin();
  }, [])
  
  return { coin };
}