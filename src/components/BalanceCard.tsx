import { Button, Card, CardActions, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Login, Logout } from '@mui/icons-material'
import { MouseEvent, useState } from 'react'

const ToggleBuySell = () => {
  const [type, setType] = useState('buy')

  function handleChange(e: MouseEvent<HTMLElement>, value: string) {
    e.preventDefault()
    setType(value)
  }

  return (
    <ToggleButtonGroup exclusive onChange={handleChange} value={type}>
      <ToggleButton value='buy'>Buy</ToggleButton>
      <ToggleButton value='sell'>Sell</ToggleButton>
    </ToggleButtonGroup>
  )
}

const BalanceCard = ({ amount }: { amount: number }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Stack alignItems='center' paddingTop={2} width='100%'>
        <Typography variant='h5'>Wallet Balance: {amount} ETH</Typography>
      </Stack>
      <CardActions>
        <Stack alignItems='center' direction='row' justifyContent='space-evenly' spacing={2} width='100%'>
          <Button variant='outlined' startIcon={<Login />}>
            Deposit
          </Button>
          <Button variant='outlined' startIcon={<Logout />}>
            Withdraw
          </Button>
        </Stack>
      </CardActions>
      <ToggleBuySell />
    </Card>
  )
}

export default BalanceCard
