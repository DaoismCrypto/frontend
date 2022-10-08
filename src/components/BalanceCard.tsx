import { Button, Card, TextField, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'

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

const BalanceCard = ({ tokenName, tokenSymbol }: { tokenName: string; tokenSymbol: string }) => {
  const [transactionType, setTransactionType] = useState('order')
  const [weight, setWeight] = useState(0)

  return (
    <Card sx={{ p: '16px', mb: 0, borderRadius: '15px', maxWidth: 345 }}>
      <Stack alignItems='center' py={4} width='100%'>
        <Typography variant='h5'>{tokenName}</Typography>
        <Typography variant='h6'>{tokenSymbol}</Typography>
      </Stack>
      <Toggle
        options={['unlist', 'transfer back', 'change price']}
        updateFn={setTransactionType}
        value={transactionType}
      />
      <Stack width='100%'>
        {transactionType === 'change price' ? (
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
        ) : null}

        <Button
          disabled={weight === 0}
          style={{
            margin: '1rem'
          }}
          variant='outlined'
        >{`Change ${tokenName}'s price to ${weight} ETH`}</Button>
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
