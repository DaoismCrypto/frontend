import BalanceCard from '../components/BalanceCard'
import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { getMyBalance } from 'src/api'

export default function TestPage() {
  useEffect(() => {
    getMyBalance('0x03E8614301A39a8c3B85B82d81e1F88BEA5D059f')
  }, [])

  return (
    <>
      <Grid alignItems='center' container width='100%' p={16}>
        <Grid item xs={12}>
          <BalanceCard tokenName='Coin Name' />
        </Grid>
      </Grid>
    </>
  )
}
