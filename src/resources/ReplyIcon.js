import { useHistory } from "react-router-dom";
import { SvgIcon, IconButton, Typography } from "@mui/material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#085AF6"
    }
  }
});

export default function ReplyIcon(props) {
  const txId = props.tx;
  const count = props.count;
  const history = useHistory();
  const handleClick = (e) => {
    e.stopPropagation();
    if (!localStorage.tokenTwetchAuth) {
      alert("Please Log in"); //Snackbar
      return;
    }
    history.push(`/compose/${txId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton onClick={handleClick} color="primary">
          <SvgIcon
            style={{
              color: "transparent",
              width: "18px",
              cursor: "pointer",
              height: "18px",
              display: "inline-block",
              verticalAlign: "top"
            }}
            focusable="false"
            viewBox="0 0 18 16"
            aria-hidden="true"
          >
            <path
              d="M1.23539 7.83782C1.23539 10.8638 3.87012 12.3511 9.32777 12.3511C10.1343 12.3511 10.4838 13.0948 10.8602 13.7872C11.1559 14.377 11.4517 14.9412 12.0163 14.9412C12.2045 14.9412 12.3927 14.8899 12.5808 14.7617C13.7907 13.9924 14.7854 13.0179 15.6457 11.787C16.5598 10.5048 16.8824 8.68407 16.8824 7.83782C16.8824 4.24767 13.6294 1.52942 9.32777 1.52942C4.86486 1.52942 1.23539 4.35025 1.23539 7.83782Z"
              stroke="#696969"
              color="transparent"
              strokeWidth="1.29647"
              strokeMiterlimit="10"
            ></path>
          </SvgIcon>
        </IconButton>
        <Typography className="hoverRed" component="span" variant="body1">
          {count}
        </Typography>
      </div>
    </ThemeProvider>
  );
}
