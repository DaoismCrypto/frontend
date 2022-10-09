import { useRouter } from "next/router";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import * as axios from "axios";
import RenderLineChart from "../../components/transactions/chart";

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
  const router = useRouter();

  const handleClick = (params: string) => {
    router.push(`/transaction/buy/${params}`);
  };

  const headerText: string[] = [
    "Token Name",
    "Token Price (ETH)",
    "Quota (Tonne)",
    "Actions",
  ];

  return (
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
                  <Button onClick={() => handleClick(data.id)}>Details</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function BuySide({ data }: { data: DataType[] }) {
  return (
    <RenderLineChart data={data} />

    // <Card
    //   raised
    //   sx={{
    //     margin: "5%",
    //     width: "90%",
    //   }}
    // >
    //   <DataTable />
    // </Card>
  );
}

export async function getServerSideProps() {
  const encodedParams = new URLSearchParams();
  encodedParams.append("symbol", "AAPL");
  encodedParams.append("period", "1y");

  const options = {
    method: "POST",
    url: "https://yahoo-finance97.p.rapidapi.com/price",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "fe3eddd72cmsh92456b091d5a012p1a1486jsnbb8c55751760",
      "X-RapidAPI-Host": "yahoo-finance97.p.rapidapi.com",
    },
    data: encodedParams,
  };

  const response = await axios.default.request(options);

  return {
    props: {
      data: response.data.data,
    },
  };
}

export type DataType = {
  Close: number;
  Date: number | string;
  Dividends: number;
  High: number;
  Low: number;
  Open: number;
  "Stock Splits": number;
  Volume: number;
};
