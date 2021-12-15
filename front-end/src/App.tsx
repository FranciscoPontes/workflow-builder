import React from "react";
import Layout, { ILayout } from "./components/Layout";

import {
  responsiveFontSizes,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

// const generateClassName = createGenerateClassName({
//   disableGlobal: true,
//   seed: "workflow-gui",
//   productionPrefix: "workflow-gui-prod",
// });

var el = document.getElementsByTagName("html")[0];
console.log("el", el);

var style = window.getComputedStyle(el, null).getPropertyValue("font-size");
var fontSize = parseFloat(style);

console.log("FONT-SIZE:", fontSize);

let theme = createTheme({
  // typography: {
  //   // Tell Material-UI what's the font-size on the html element is.
  //   // htmlFontSize: 16 * (fontSize / 16),
  // },
});

theme = createTheme(theme, {
  palette: {
    primary: { main: "#FF5027" },
    secondary: { main: "#9B9593" },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          [theme.breakpoints.down("md")]: {
            fontSize: "x-small",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "small",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          [theme.breakpoints.down("md")]: {
            fontSize: "x-small",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "small",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          [theme.breakpoints.down("md")]: {
            fontSize: "x-small",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "small",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          [theme.breakpoints.down("md")]: {
            fontSize: "inherit",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "large",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          [theme.breakpoints.down("md")]: {
            fontSize: "x-small",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "small",
          },
        },
      },
    },
  },
});

// handles typography responsiveness
theme = responsiveFontSizes(theme);

const App = ({ props }: ILayout) => {
  return (
    <div>
      {/* <StylesProvider generateClassName={generateClassName}> */}
      <ThemeProvider theme={theme}>
        <Layout props={props} />
      </ThemeProvider>
      {/* </StylesProvider> */}
    </div>
  );
};

export default App;
