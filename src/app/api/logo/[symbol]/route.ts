import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const symbol = request.url.slice(request.url.lastIndexOf('/') + 1)
  const response = await axios.get(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}&aux=logo`,
    {
      headers: {
        Accept: 'application/json',
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
      },
    } 
  );
  return NextResponse.json(response.data.data[symbol][0].logo);
  
}