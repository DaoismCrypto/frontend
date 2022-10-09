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
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllListedToken, buyToken, getUser, getTokenList } from "src/api";
import { Box, Close, Filter, Magnify, Sort } from "mdi-material-ui";
import OwnerCard from "src/components/OwnerCard";

export default function TestPage() {
  const [user, setUser] = useState<string>();
  const [tokens, setTokens] = useState<any[]>([]);
  const [sort, setSort] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [criteria, setCriteria] = useState<string | null>(null);
  const [ownedTokens, setOwnedTokens] = useState<any[]>([]);

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

  const loadOwnedTokens = async () => {
    const ownedTokens = await getTokenList();
    setOwnedTokens(ownedTokens);
  };

  useEffect(() => {
    checkForUser();
  }, []);

  useEffect(() => {
    loadUserTokens();
    loadOwnedTokens();
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
          xs={9}
          // mb={6}
          display="flex"
          alignItems="center"
          width="100%"
        >
          <TextField
            fullWidth
            type="text"
            label="Token Name"
            placeholder="Search Criteria"
            helperText="Search the Token you have"
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
        </Grid>
        <Grid item xs={3} p={5} pb={8} display="flex" alignItems="center">
          <Sort />
          Sort by
          <FormControl>
            {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
              <Sort />
            </InputLabel> */}
            <NativeSelect
              defaultValue={"date"}
              inputProps={{
                name: "Sort",
              }}
              sx={{ ml: 3 }}
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value={"date"}>Date</option>
              <option value={"name"}>Name</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid alignItems="center" pt={12} spacing={4} container width="100%">
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" className="modal__title">
              Listed Tokens
            </Typography>
          </Grid>
          {tokens &&
            tokens
              .filter((x) => x[1].includes(criteria) || criteria == null)
              .sort((x) => x[sort == "date" ? 5 : 1])
              .map((token, index) => {
                return (
                  <>
                    <Grid item xs={12} md={4} key={index}>
                      <BalanceCard
                        tokenName={token[1]}
                        serialNumber={token[0]}
                        tokenId={token[8]}
                        price={token[7]}
                        time={token[5]}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} key={index}>
                      <OwnerCard
                        tokenName={token[1]}
                        serialNumber={token[0]}
                        tokenId={token[8]}
                        price={token[7]}
                        time={token[5]}
                      />
                    </Grid>
                  </>
                );
              })}
        </Grid>
        <Divider />
        <Grid alignItems="center" pt={12} spacing={4} container width="100%">
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" className="modal__title">
              Owned Tokens
            </Typography>
          </Grid>
          {tokens &&
            tokens
              .filter((x) => x[1].includes(criteria) || criteria == null)
              .sort((x) => x[sort == "date" ? 5 : 1])
              .map((token, index) => {
                return (
                  <>
                    <Grid item xs={12} md={4} key={index}>
                      <BalanceCard
                        tokenName={token[1]}
                        serialNumber={token[0]}
                        tokenId={token[8]}
                        price={token[7]}
                        time={token[5]}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} key={index}>
                      <OwnerCard
                        tokenName={token[1]}
                        serialNumber={token[0]}
                        tokenId={token[8]}
                        price={token[7]}
                        time={token[5]}
                      />
                    </Grid>
                  </>
                );
              })}
        </Grid>
      </Grid>
      {
        <Button
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
        </Button>
      }
    </>
  );
}
