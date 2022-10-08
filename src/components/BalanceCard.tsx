import { Button, Card, TextField, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'

// Used to toggle the buy-sell interface
const Toggle = ({ value, options, updateFn }: ToggleProps) => {
  function handleChange(e: MouseEvent<HTMLElement>, value: string) {
    e.preventDefault()
    updateFn(value)
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
      <ToggleButtonGroup exclusive onChange={handleChange} fullWidth value={value}>
        {toggleButtons}
      </ToggleButtonGroup>
    </Stack>
  )
}

const BalanceCard = ({ amount }: { amount: number }) => {
  const [transaction, setTransaction] = useState('buy')
  const [transactionType, setTransactionType] = useState('order')
  const [weight, setWeight] = useState(0)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Stack alignItems='center' paddingTop={2} width='100%'>
        <Typography variant='h5'>Plutonium {amount} ETH</Typography>
      </Stack>
      <Toggle options={['buy', 'sell']} updateFn={setTransaction} value={transaction} />
      <Toggle options={['order', 'limit', 'stop']} updateFn={setTransactionType} value={transactionType} />
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
        <Stack style={{ margin: '1rem' }} width='100%'>
          <Typography fontWeight='bold' variant='body1'>
            Account Balance: 50 ETH
          </Typography>
          <Typography fontWeight='bold' variant='body1'>
            Cost Per Kg Of Material: 0.05 ETH
          </Typography>
          <Typography fontWeight='bold' variant='body1'>
            Total Cost: {(weight * 0.05).toPrecision(5)} ETH
          </Typography>
          <Typography fontWeight='bold' variant='body1'>
            Remaining Balance: {(50 - weight * 0.05).toPrecision(5)} ETH
          </Typography>
        </Stack>
        <Button
          disabled={weight === 0}
          style={{
            margin: '1rem'
          }}
          variant='outlined'
        >{`Set ${transaction} ${transactionType} ${weight} kg of Plutonium `}</Button>
      </Stack>
    </Card>
  )
}

type ToggleProps = {
  updateFn: Dispatch<SetStateAction<string>>
  options: string[]
  value: string
}

export default BalanceCard
