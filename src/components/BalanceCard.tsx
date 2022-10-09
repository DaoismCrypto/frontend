import { Button, Card, TextField, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { changePrice, unlist, transferBack } from '../api'

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

const BalanceCard = ({
  tokenName,
  tokenSymbol,
  tokenId
}: {
  tokenName: string
  tokenSymbol: string
  tokenId: number
}) => {
  const [transactionType, setTransactionType] = useState('order')
  const [weight, setWeight] = useState(0)

  const selectCorrectOption = (id: number) => {
    switch (transactionType) {
      case 'unlist':
        return unlist(id)
      case 'transfer back':
        return transferBack(id)
      case 'change price':
        return changePrice(id, weight)
      default:
        return null
    }
  }

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
              if (e.target.value === '-1' || !e.target.value) {
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
          onClick={() => selectCorrectOption(tokenId)}
        >{`Change ${tokenName}'s price to ${weight === NaN ? 0 : weight} ETH`}</Button>
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
