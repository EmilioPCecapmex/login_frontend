import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
let theme = createTheme({
  palette: {
    primary: {
      light:"rgb(175, 140, 85)",
      main: "rgb(175, 140, 85,50)",
      dark: "rgb(175, 140, 85)",
    },
    secondary: {
      light: "#69C0E5",
      main: "rgb(21, 33, 47)",
      dark: "#A2C1CD",
    },
   
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});
root.render(
  <React.StrictMode>
        <ThemeProvider theme={theme}>
    <App  />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
