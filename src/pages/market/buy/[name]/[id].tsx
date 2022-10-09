import jsonString from "../dummy.json";
import RenderLineChart from "src/components/transactions/chart";
import {
  Button,
  Card,
  Grid,
  TextField,
  Stack,
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { buyToken, getPrice } from "../../../../api/index";
import { useRouter } from "next/router";
import { ethers } from "ethers";

const BalanceCard = () => {
  const router = useRouter();
  const [weight, setWeight] = useState(0);
  const [tokenPrice, setPrice] = useState(0);
  const [tName, setName] = useState("Loading...");
  const [tId, setId] = useState(0);

  useEffect(() => {
    const { id, name } = router.query;
    getPrice(parseInt(id as string)).then((p) => setPrice(p.toNumber()));
    setName(name as string);
    setId(parseInt(id as string));
  }, []);

  return (
    <Card sx={{ p: "16px", mb: 0, borderRadius: "15px", maxWidth: 345 }}>
      <Stack alignItems="center" py={4} width="100%">
        <Typography variant="h5">
          {tName} {tokenPrice} WEI
        </Typography>
      </Stack>
      <Stack width="100%">
        <TextField
          onChange={(e) => {
            e.preventDefault();
            if (e.target.value === "-1" || !e.target.value) {
              e.target.value = "0";
            }
            setWeight(parseInt(e.target.value));
          }}
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
            marginBottom: "1rem",
          }}
          type="number"
          value={weight}
        />

        <Button
          disabled={weight === 0}
          style={{
            margin: "1rem",
          }}
          onClick={(e) => {
            e.preventDefault();
            const priceInWei = weight * tokenPrice;
            buyToken(tId, ethers.utils.formatEther(priceInWei));
          }}
          variant="outlined"
        >
          Buy {weight} token for {ethers.utils.formatEther(weight * tokenPrice)}{" "}
          ETH
        </Button>
      </Stack>
    </Card>
  );
};

export default function TokenPage({ data }: { data: DataType[] }) {
  const router = useRouter();
  const rows = [
    {
      id: "1",
      name: "Mark",
      price: 2,
      date: "2021-01-01",
    },
    {
      id: "2",
      name: "Wen Jun",
      price: 1,
      date: "2021-01-01",
    },
    {
      id: "1",
      name: "Mark",
      price: 2,
      date: "2021-01-01",
    },
    {
      id: "2",
      name: "Wen Jun",
      price: 1,
      date: "2021-01-01",
    },

    {
      id: "1",
      name: "Mark",
      price: 2,
      date: "2021-01-01",
    },
    {
      id: "2",
      name: "Wen Jun",
      price: 1,
      date: "2021-01-01",
    },
  ];

  const headerText: string[] = ["Token Name", "Token Price (WEI)", "Date"];

  return (
    <>
      <Grid container justifyContent="space-evenly" width="100%">
        <Grid xs={12} item m={8} pl={24}>
          <Typography variant="h4" fontFamily="DM Sans">
            Trading {router.query.name}
          </Typography>
        </Grid>
        <Grid item m={8} margin={2}>
          <RenderLineChart data={data} />
        </Grid>
        <Grid item m={4}>
          <BalanceCard />
        </Grid>
      </Grid>

      <Divider sx={{ mx: 24, mt: 8 }} />
      <Box mt={12} mx={24}>
        <Typography
          variant="h4"
          mb={8}
          sx={{
            marginLeft: "5%",
            marginRight: "5%",
            width: "90%",
          }}
          fontFamily="DM Sans"
        >
          Previous Transactions
        </Typography>
        <Card
          raised
          sx={{
            marginLeft: "5%",
            marginRight: "5%",
            width: "90%",
          }}
        >
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
                      <TableCell align="center">
                        {parseInt(data.price, 16)}
                      </TableCell>
                      <TableCell align="center">{data.date}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  );
}

// Used to simulate the graph of a buying page
export async function getServerSideProps() {
  return {
    props: {
      data: jsonString,
    },
  };
}

export type DataType = {
  Close: number;
  Date: number | string | Date;
  Dividends: number;
  High: number;
  Low: number;
  Open: number;
  "Stock Splits": number;
  Volume: number;
};
