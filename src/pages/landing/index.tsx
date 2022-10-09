import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowRight from "mdi-material-ui/ArrowRight";

const createData = (name: string, dayChange: number, lastPrice: number) => {
  return { name, dayChange, lastPrice };
};

const rows = [
  createData("Frozen yoghurt", -1.59, 6.04),
  createData("Ice cream sandwich", 2.37, 9.03),
  createData("Eclair", -2.62, 16.01),
  createData("Cupcake", 3.05, 3.7),
  createData("Gingerbread", -3.56, 16.2),
];

type Impact = {
  img: string;
  header: string;
  description: string;
};

const impacts: Impact[] = [
  {
    img: "/images/pages/landing_2.png",
    header: "Lorum Ipsum",
    description:
      "Lorum Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry standard dummy text ever since the 1500s",
  },
  {
    img: "/images/pages/landing_2.png",
    header: "Lorum Ipsum",
    description:
      "Lorum Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry standard dummy text ever since the 1500s",
  },
];

const ImpactCard = (impact: Impact, isLeft: boolean) => {
  return (
    <Box
      display="flex"
      width="70%"
      alignSelf={isLeft ? "flex-start" : "flex-end"}
      mb={8}
    >
      <Card sx={{ pb: 0, mb: 0, borderRadius: "15px" }}>
        <CardHeader
          title={impact.header}
          titleTypographyProps={{
            sx: {
              lineHeight: "2rem !important",
              letterSpacing: "0.15px !important",
            },
          }}
          sx={{ pb: 0 }}
        />
        <CardContent sx={{ py: 0, my: 0 }}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            {/* <Typography variant='h5' sx={{ mr: 4 }}>
            45%
          </Typography> */}
            <Grid item xs={12} sm={3} order={isLeft ? 1 : 2}>
              <Box
                component="img"
                sx={{
                  height: "auto",
                  width: "100%",
                  objectFit: "contain",
                }}
                src={impact.img}
              />
            </Grid>
            <Grid
              item
              xs={12}
              ml={isLeft ? 5 : 0}
              sm={isLeft ? 8 : 9}
              order={isLeft ? 2 : 1}
            >
              <Typography variant="body2">{impact.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default function TestPage() {
  return (
    <>
      <Grid
        container
        // spacing={6}
        p={{ xs: 4, sm: 16 }}
        style={{
          backgroundColor: "#ddf1ff",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          flexDirection="column"
          px={6}
          py={{ xs: 5, md: 12 }}
        >
          <Typography fontFamily="Playfair Display" variant="h2">
            Interactive Platform for Trading Rare Resources
          </Typography>
          <Divider style={{ width: "100%", marginTop: 12, marginBottom: 12 }} />
          <Typography mb={6} fontFamily="DM Sans" variant="body1">
            Powered by blockchain Lorum Ipsum is simply dummy text of the
            printing and typesetting
          </Typography>
          <Button variant="contained" startIcon={<ArrowRight />}>
            Try Now!
          </Button>
        </Grid>
        {/* Image starts */}
        <Grid
          item
          xs={12}
          sm={6}
          justifyContent="center"
          display="flex"
          px={6}
          py={{ xs: 5, md: 15 }}
        >
          <Box
            component="img"
            sx={{
              height: "auto",
              width: "100%",
              objectFit: "contain",
            }}
            src="/images/pages/landing.png"
          />
        </Grid>
      </Grid>
      <Grid
        container
        // spacing={6}
        p={{ xs: 4, sm: 16 }}
        style={{
          backgroundColor: "#fff",
        }}
      >
        {/* Image ends */}
        {/* Table for Popular tokens starts */}
        <Grid container px={5} py={8}>
          <Grid item xs={8} pb={4}>
            <Typography fontFamily="Playfair Display" variant="h4" mb={3}>
              Popular Rare Resource Tokens
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            padding={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography
              fontFamily="DM Sans"
              variant="caption"
              mb={3}
              textAlign="right"
            >
              View more tokens
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Last Price</TableCell>
                    <TableCell align="right">24h Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.lastPrice}</TableCell>
                      <TableCell align="right">
                        <Typography
                          color={
                            row.dayChange > 0 ? "success.main" : "error.main"
                          }
                        >
                          {row.dayChange}%
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        {/* Table for Popular tokens ends */}
      </Grid>
      <Grid
        container
        // spacing={6}
        p={{ xs: 4, sm: 16 }}
        style={{
          backgroundColor: "#e9fbff",
        }}
      >
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          flexDirection="column"
          padding={6}
        >
          <Typography fontFamily="Playfair Display" variant="h2">
            Environmental / Social Impact
          </Typography>
          {/* <Divider style={{ width: '100%' }} /> */}
          <Typography my={6} fontFamily="DM Sans" variant="body1">
            Lorum Ipsum is simply dummy text of the printing and typesetting
          </Typography>
          <Stack direction="column" spacing={2}>
            {impacts.map((impact, index) =>
              ImpactCard(impact, index % 2 === 0)
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
