import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface RowType {
  id: string;
  name: string;
  price: number;
  quota: number;
}

const rows: RowType[] = [
  {
    id: "1",
    quota: 5,
    name: "Mark",
    price: 2,
  },
  {
    id: "2",
    quota: 3,
    name: "Wen Jun",
    price: 1,
  },
];

const DataTable = () => {
  const headerText: string[] = [
    "Token Name",
    "Token Price (ETH)",
    "Quota (Tonne)",
    "Actions",
  ];

  return (
    <>
      <TableContainer>
        <Table
          aria-label="Table in dashboard"
          stickyHeader
          sx={{ minWidth: 800 }}
        >
          <TableHead>
            <TableRow>
              {headerText.map((text, index) => (
                <TableCell align="center" key={index}>
                  <Typography fontWeight="bold">{text}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((data) => {
              return (
                <TableRow hover key={data.id}>
                  <TableCell align="center">{data.name}</TableCell>
                  <TableCell align="center">{data.price}</TableCell>
                  <TableCell align="center">{data.quota}</TableCell>
                  <TableCell align="center">
                    <Link
                      href={{
                        pathname: "/transaction/buy/[name]/[id]",
                        query: { id: parseInt(data.id) - 1, name: data.name },
                      }}
                    >
                      Details
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default function BuySide() {
  return (
    <Card
      raised
      sx={{
        margin: "5%",
        width: "90%",
      }}
    >
      <DataTable />
    </Card>
  );
}
