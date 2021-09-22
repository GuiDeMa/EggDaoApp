import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import App from "./App";

const theme = createTheme({
  palette: {
    primary: {
      light: "#e7ab3e",
      main: "#b17c01",
      dark: "#7d5000"
    },
    secondary: {
      light: "#72ff51",
      main: "#21e800",
      dark: "#00b400"
    }
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  rootElement
);
