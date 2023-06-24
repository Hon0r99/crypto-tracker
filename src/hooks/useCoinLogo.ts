import { useEffect, useState } from "react"

export const useGetCoinLogo = (symbol: string): {logo: string} => {
  const [logo, setLogo] = useState<string>('');
  
  useEffect(() => {
    const loadLogo = async () => {  
      const response = await fetch(`/api/logo/${symbol}`);
      const data = await response.json();
      setLogo(data);
    }

    loadLogo();
  }, [])
  
  return { logo };
}