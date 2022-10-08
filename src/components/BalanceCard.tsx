import { Button, Card, CardActions, TextField, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Login, Logout } from '@mui/icons-material'
import { MouseEvent, useState } from 'react'

// Used to toggle the buy-sell interface
const Toggle = ({ options }: { options: string[] }) => {
  const [type, setType] = useState('buy')

  function handleChange(e: MouseEvent<HTMLElement>, value: string) {
    e.preventDefault()
    setType(value)
  }

  const toggleButtons = options.map(option => {
    return (
      <ToggleButton key={option} fullWidth value={option}>
        {option}
      </ToggleButton>
    )
  })

  return (
    <Stack marginLeft='1rem' marginRight='1rem' marginBottom='1rem'>
      <ToggleButtonGroup exclusive onChange={handleChange} fullWidth value={type}>
        {toggleButtons}
      </ToggleButtonGroup>
    </Stack>
  )
}

const BalanceCard = ({ amount }: { amount: number }) => {
  const [weight, setWeight] = useState(0)

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
      <Toggle options={['buy', 'sell']} />
      <Toggle options={['order', 'limit', 'stop']} />
      <Stack width='100%'>
        <TextField
          onChange={e => {
            e.preventDefault()
            if (e.target.value === '-1') {
              e.target.value = '0'
            }
            setWeight(parseInt(e.target.value))
          }}
          style={{
            marginLeft: '1rem',
            marginRight: '1rem',
            marginBottom: '1rem'
          }}
          type='number'
          value={weight}
        />
      </Stack>
    </Card>
  )
}

export default BalanceCard
