import BalanceCard from "../components/transactions/BalanceCard";
import {
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getMyBalance } from "src/api";
import { Magnify, Sort } from "mdi-material-ui";

export default function TestPage() {
  useEffect(() => {
    getMyBalance("0x03E8614301A39a8c3B85B82d81e1F88BEA5D059f");
  }, []);

  const [showSort, setShowSort] = useState(false);

  return (
    <>
      <Grid alignItems="center" container width="100%" p={{ xs: 5, sm: 16 }}>
        <Grid
          item
          xs={10}
          mb={6}
          display="flex"
          justifyContent="center"
          width="100%"
        >
          <TextField
            fullWidth
            type="text"
            label="Coin Name"
            placeholder="DogeCoin"
            helperText="Search the coin you have"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Magnify fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            color="inherit"
            onClick={() => setShowSort(!showSort)}
            style={{ marginBottom: 12, marginLeft: 12 }}
          >
            <Sort />
            <Typography>Sort</Typography>
          </IconButton>
        </Grid>
        {/* <Grid item xs={2} alignItems='center' display='flex' height='100%'></Grid> */}
        <Grid item xs={12}>
          <BalanceCard tokenName="Coin Name" />
        </Grid>
      </Grid>
    </>
  );
}
