import jsonString from "../dummy.json";
import RenderLineChart from "src/components/transactions/Chart";
import {
  Button,
  Card,
  Grid,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTokenInfo } from "src/api";

const BalanceCard = ({
  tokenName,
  initialPrice,
}: {
  tokenName: string;
  initialPrice: number;
}) => {
  const router = useRouter();
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);

  return (
    <Card sx={{ p: "16px", mb: 0, borderRadius: "15px", maxWidth: 345 }}>
      <Stack alignItems="center" py={4} width="100%">
        <Typography variant="h5">
          {tokenName} {price.toPrecision(5)} ETH
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
          variant="outlined"
        >
          Buy {weight} token for {price} each
        </Button>
      </Stack>
    </Card>
  );
};

export default function TokenPage({ data }: { data: DataType[] }) {
  return (
    <>
      <Grid container justifyContent="space-evenly" width="100%">
        <Grid item m={6}>
          <BalanceCard tokenName="AAPL" initialPrice={data[0].Close} />
        </Grid>
        <Grid item m={6}>
          <RenderLineChart data={data} />
        </Grid>
      </Grid>
    </>
  );
}

// Used to simulate the graph of a buying page
export function getServerSideProps() {
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
