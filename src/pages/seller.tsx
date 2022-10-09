import BalanceCard from "../components/BalanceCard";
import {
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Modal,
  Divider,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllListedToken, buyToken, getUser, getTokenList} from "src/api";
import { Box, Close, Filter, Magnify, Sort } from "mdi-material-ui";

export default function TestPage() {
  const [user, setUser] = useState<string>();
  const [tokens, setTokens] = useState<any[]>([]);
  const [sort, setSort] = useState<string | null>(null);
  const [showSort, setShowSort] = useState(false);
  const [open, setOpen] = useState(false);
  const [criteria, setCriteria] = useState<string | null>(null);
  const price_to_bid_in_string = "0.0101";

  const checkForUser = async () => {
    const temp = sessionStorage.getItem("user");
    if (temp == null) {
      const address = await getUser();
      setUser(address);
    } else {
      setUser(temp);
    }
  };

  const loadUserTokens = async () => {
    const userTokens = await getAllListedToken(false);
    setTokens(userTokens);
  };

  useEffect(() => {
    checkForUser();
  }, []);

  useEffect(() => {
    loadUserTokens();
  }, [user]);

  const modal = (title: string, subtitle: string) => {
    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="modal">
          <Grid className="modal__content">
            <Grid item xs>
              <Typography variant="h6" component="h2" className="modal__title">
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body1" className="modal__subtitle">
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
    );
  };

  return (
    <>
      <Grid alignItems="center" container width="100%" p={{ xs: 5, sm: 16 }}>
        <Grid
          item
          xs={10}
          mb={6}
          display="flex"
          alignItems="center"
          width="100%"
        >
          <TextField
            fullWidth
            type="text"
            label="Coin Name"
            placeholder="Search Criteria"
            helperText="Search the coin you have"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
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
        <Grid alignItems="center" spacing={4} container width="100%">
          {tokens &&
            tokens
              .filter((x) => x[1].includes(criteria) || criteria == null)
              .map((token, index) => {
                return (
                  <Grid item xs={12} md={4} key={index}>
                    <BalanceCard
                      tokenName={token[1]}
                      serialNumber={token[0]}
                      tokenId={token[8]}
                      price={token[7]}
                    />
                  </Grid>
                );
              })}
        </Grid>
      </Grid>
      {<Button
        onClick={async () => {
          // transferFrom('0xF2842fb04291d002d27F1E78279F65994870a0be', '0x9482C1abfdF380010A01217514bd99A801F4bE00', 0)
          // The unit of price is ether
          // buyToken(0,price_to_bid_in_string)
          // const ans = await getUserTokens()
          // console.log(ans)
          //getAllListedToken(false);
          getTokenList();
        }}
      >
        test
      </Button> }
    </>
  );
}
