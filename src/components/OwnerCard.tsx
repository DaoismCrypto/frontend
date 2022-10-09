import {
  Button,
  Card,
  TextField,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Input,
  InputAdornment,
} from "@mui/material";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { changePrice, unlist, transferBack, postToMarket } from "../api";
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
  time,
}: {
  tokenName: string;
  serialNumber: string;
  tokenId: number;
  time: number;
}) => {
  const [transactionType, setTransactionType] = useState("");
  const [weight, setWeight] = useState(0);

  const dateInYYYYMMDD = new Date(time * 1000).toLocaleDateString("en-UK");

  const selectCorrectOption = (id: number) => {
    switch (transactionType) {
      default:
        return postToMarket(id, weight);
    }
  };

  const generateButtonText = () => {
    switch (transactionType) {
      case "Post to Market":
        return `sell ${tokenName}  at ${weight === NaN ? 0 : weight} WEI`;
      default:
        return "Select an action";
    }
  };

  return (
    <Card sx={{ p: "16px", mb: 0, borderRadius: "15px" }}>
      <Stack alignItems="center" py={4} width="100%">
        <Typography variant="h5">{tokenName}</Typography>
        <Typography variant="caption">{`Serial #: ${serialNumber}`}</Typography>
        <Typography variant="caption">
          {`Minted at ${dateInYYYYMMDD}`}
        </Typography>
      </Stack>
      <Toggle
        options={["Post to Market"]}
        updateFn={setTransactionType}
        value={transactionType}
      />
      <Stack width="100%">
        {transactionType === "Post to Market" ? (
          <Input
            onChange={(e) => {
              e.preventDefault();
              // if (e.target.value === "-1" || !e.target.value) {
              //   e.target.value = "0";
              // }
              setWeight(parseInt(e.target.value));
            }}
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
              marginBottom: "1rem",
            }}
            type="decimal"
            value={weight}
            endAdornment={<InputAdornment position="end">WEI</InputAdornment>}
          />
        ) : null}

        <Button
          disabled={weight === 0}
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
