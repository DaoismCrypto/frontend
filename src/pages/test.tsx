import BalanceCard from '../components/BalanceCard'
import { Grid, TextField, IconButton, InputAdornment, Typography, Modal, Divider, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  getQuota,
  list,
  mint,
  transferFrom,
  getPrevOwner,
  getSupply,
  getUnit,
  getTokenInfo,
  getAllListedTokens,
  buyToken,
  getToken
} from 'src/api'
import { Box, Close, Filter, Magnify, Sort } from 'mdi-material-ui'

export default function TestPage() {
  useEffect(() => {
    // getMyBalance('0x03E8614301A39a8c3B85B82d81e1F88BEA5D059f')
    // test('0x03E8614301A39a8c3B85B82d81e1F88BEA5D059f')
  }, [])

  const [sort, setSort] = useState<string | null>(null)
  const [showSort, setShowSort] = useState(false)
  const [open, setOpen] = useState(false)
  const price_to_bid_in_string = "0.0101"

  const modal = (title: string, subtitle: string) => {
    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className='modal'>
          <Grid className='modal__content'>
            <Grid item xs>
              <Typography variant='h6' component='h2' className='modal__title'>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant='body1' className='modal__subtitle'>
                  {subtitle}
                </Typography>
              )}
            </Grid>
            <Grid item xs={5}>
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
        </Box>
      </Modal>
    )
  }

  return (
    <>
      <Grid alignItems='center' container width='100%' p={{ xs: 5, sm: 16 }}>
        <Grid item xs={10} mb={6} display='flex' justifyContent='center' width='100%'>
          <TextField
            fullWidth
            type='text'
            label='Coin Name'
            placeholder='DogeCoin'
            helperText='Search the coin you have'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
          <IconButton
            color='inherit'
            onClick={() => setShowSort(!showSort)}
            style={{ marginBottom: 12, marginLeft: 12 }}
          >
            <Sort />
            <Typography>Sort</Typography>
          </IconButton>
        </Grid>
        {/* <Grid item xs={2} alignItems='center' display='flex' height='100%'></Grid> */}
        <Grid item xs={12}>
          <BalanceCard tokenName='Coin Name' tokenSymbol={'COIN'} />
        </Grid>
      </Grid>
      <Button
        onClick={() =>
          // transferFrom('0xF2842fb04291d002d27F1E78279F65994870a0be', '0x9482C1abfdF380010A01217514bd99A801F4bE00', 0)
          // The unit of price is ether buyToken(0,price_to_bid_in_string)
          //getToken(0)
          getAllListedTokens()
        }
      >
        test
      </Button>
    </>
  )
}
