import { IconButton, Typography } from "@mui/material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getPenny } from "../api/TwetchActions";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B17C01"
    }
  }
});

export default function BoostIcon(props) {
  const txId = props.tx;
  const count = props.count;
  const handleClick = (e) => {
    e.stopPropagation();
    boostContent(txId);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton disabled onClick={handleClick} color="primary">
          <StarBorderIcon style={{ color: "#696969" }} />
        </IconButton>
        <Typography className="hoverRed" component="span" variant="body1">
          {count}
        </Typography>
      </div>
    </ThemeProvider>
  );
}

async function boostContent(txid) {
  let penny = await getPenny();
  return;
  window.boostPublish.open({
    content: txid,
    tag: "$zeroschool",
    wallets: ["moneybutton", "relayx"],
    initialWallet: "moneybutton",
    diff: { min: 1, max: 100, initial: 1 },
    outputs: [
      {
        to: "1C2meU6ukY9S4tY6DdbhNqc8PuDhif5vPE",
        amount: penny,
        currency: "BSV"
      }
    ],
    onPayment: (payment, boostJobStatus) => {
      setBoostJobTx(payment.txid);
      console.log(payment, boostJobStatus);
      setOpenBoost(true);
    }
  });
}
