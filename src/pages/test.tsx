import BalanceCard from '../components/BalanceCard'
import { Grid } from '@mui/material'

export default function TestPage() {
  return (
    <>
      <Grid alignItems='center' container width='100%'>
        <Grid item xs={12}>
          <BalanceCard amount={0.2} />
        </Grid>
      </Grid>
    </>
  )
}
