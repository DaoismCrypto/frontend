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
import { useState, useEffect } from "react";
import { getAllListedToken, getUser } from "src/api";

const DataTable = () => {
  const headerText: string[] = [
    "Token Name",
    "Token Price (WEI)",
    "Quota",
    "Unit",
    "Actions",
  ];
  const [user, setUser] = useState<string>();
  {
    /* (serialNumber, name, information, unit, quota, time, prevOwner, price, tokenId) */
  }
  const [tokens, setTokens] = useState<any[]>([]);

  const checkForUser = async () => {
    const temp = sessionStorage.getItem("user");
    if (temp == null) {
      const address = await getUser();
      setUser(address);
    } else {
      setUser(temp);
    }
  };

  const loadTokens = async () => {
    const userTokens = await getAllListedToken(false);
    setTokens(userTokens);
  };

  useEffect(() => {
    checkForUser();
  }, []);

  useEffect(() => {
    loadTokens();
  }, [user]);


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
            {tokens.map((data) => {
              return (
                <TableRow hover key={data[8]}>
                  <TableCell align="center">{data[1]}</TableCell>
                  <TableCell align="center">
                    {parseInt(data[7]._hex, 16)}
                  </TableCell>
                  <TableCell align="center">
                    {parseInt(data[4]._hex, 16)}
                  </TableCell>
                  <TableCell align="center">{data[3]}</TableCell>
                  <TableCell align="center">
                    <Link
                      href={{
                        pathname: `/transaction/buy/${data[1]}/${data[8]}`,
                        query: { id: data[8], name: data[1] },
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
    <>
      <Typography
        variant="h4"
        component="h2"
        className="table__title"
        my={6}
        style={{ marginLeft: "5%" }}
      >
        All Currently Listed Tokens
      </Typography>
      <Card
        raised
        sx={{
          marginLeft: "5%",
          marginRight: "5%",
          width: "90%",
        }}
      >
        <DataTable />
      </Card>
    </>
  );
}
