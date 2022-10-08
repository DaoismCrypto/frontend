import type { NextPage } from 'next'
import { Paper, Table, TableBody, TableCell, TableHead, TableContainer, TableRow } from '@mui/material'

const MOCK_DATA = [
  {
    id: '1',
    quota: 5,
    name: 'Mark',
    price: '2'
  },
  {
    id: '2',
    quota: 3,
    name: 'Wen Jun',
    price: '1'
  }
]

const DataTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Token Name</TableCell>
            <TableCell align='center'>Token Price</TableCell>
            <TableCell align='center'>Quota (Tonne)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {MOCK_DATA.map(data => {
            return (
              <TableRow key={data.id}>
                <TableCell align='center'>{data.name}</TableCell>
                <TableCell align='center'>{data.price}</TableCell>
                <TableCell align='center'>{data.quota}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const BuySide: NextPage = () => {
  return <DataTable />
}

export default BuySide
