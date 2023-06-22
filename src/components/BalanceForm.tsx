import { Box, Button, TextField, Typography, } from '@mui/material';
import { AbstractProvider, formatEther, isAddress } from 'ethers';
import { FormEvent, useState } from 'react';

export default function BalanceForm() {
  const ethers = require('ethers');
  const provider: AbstractProvider = ethers.getDefaultProvider();

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

  return (
    <>
      <Typography fontWeight={500} fontSize={{xs: 22, sm: 28}} padding={'20px'}>
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
    </>
  )
}
