import {
  Button,
  Card,
  TextField,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { changePrice, unlist, transferBack } from "../api";
import { mdiEthereum } from "@mdi/js";
import Icon from "@mdi/react";

const Toggle = ({ value, options, updateFn }: ToggleProps) => {
  function handleChange(e: MouseEvent<HTMLElement>, value: string) {
    e.preventDefault();
    updateFn(value);
  }

  const toggleButtons = options.map((option) => {
    return (
      <ToggleButton key={option} fullWidth value={option}>
        {option}
      </ToggleButton>
    );
  });

  return (
    <Stack marginLeft="1rem" marginRight="1rem" marginBottom="1rem">
      <ToggleButtonGroup
        exclusive
        onChange={handleChange}
        fullWidth
        value={value}
      >
        {toggleButtons}
      </ToggleButtonGroup>
    </Stack>
  );
};

const OwnerCard = ({
  tokenName,
  serialNumber,
  tokenId,
  price,
  time,
}: {
  tokenName: string;
  serialNumber: string;
  tokenId: number;
  price: { _hex: string };
  time: number;
}) => {
  const [transactionType, setTransactionType] = useState("");
  const [weight, setWeight] = useState(parseInt(price._hex, 16));

  const dateInYYYYMMDD = new Date(time * 1000).toLocaleDateString("en-UK");

  const selectCorrectOption = (id: number) => {
    switch (transactionType) {
      case "Unlist":
        return unlist(id);
      case "Transfer Back":
        return transferBack(id);
      case "change price":
        return changePrice(id, weight);
      default:
        return null;
    }
  };

  const generateButtonText = () => {
    switch (transactionType) {
      case "change price":
        return `Change ${tokenName}'s price to ${
          weight === NaN ? 0 : weight
        } ETH`;
      case "Unlist":
      case "Transfer Back":
        return transactionType + " " + tokenName;
      default:
        return "Select an action";
    }
  };

  return (
    <Card sx={{ p: "16px", mb: 0, borderRadius: "15px" }}>
      <Stack alignItems="center" py={4} width="100%">
        <Typography variant="h5">{tokenName}</Typography>
        <Typography
          variant="h6"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Icon path={mdiEthereum} title="Ether" size={1} />
          WEI: {parseInt(price._hex, 16)}
        </Typography>
        <Typography variant="caption">
          {`Serial #: ${serialNumber}
          , Minted at ${dateInYYYYMMDD}`}
        </Typography>
      </Stack>
      <Toggle
        options={["Post to Market"]}
        updateFn={setTransactionType}
        value={transactionType}
      />
      <Stack width="100%">
        {transactionType === "change price" ? (
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
        ) : null}

        <Button
          disabled={
            (weight === 0 || weight === parseInt(price._hex, 16)) &&
            transactionType === "change price"
          }
          style={{
            margin: "1rem",
          }}
          variant="outlined"
          onClick={() => selectCorrectOption(tokenId)}
        >
          {generateButtonText()}
        </Button>
      </Stack>
    </Card>
  );
};

type ToggleProps = {
  updateFn: Dispatch<SetStateAction<string>>;
  options: string[];
  value: string;
};

export default OwnerCard;
