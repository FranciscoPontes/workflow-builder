import React, { useState, useMemo, createContext } from "react";
import Layout from "./components/Layout";

import {
  responsiveFontSizes,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

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
            fontSize: "medium",
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          margin: "10px 0",
        },
      },
    },
  },
});

// handles typography responsiveness
theme = responsiveFontSizes(theme);

const App = ({ appData }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const updatedTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#FF5027" },
                secondary: { main: "#d32f2f", dark: "#9B9593" },
                borderSelection: { main: "rgb(178, 56, 27)" },
              }
            : {
                primary: { main: "#FF5027" },
                secondary: { main: "#d32f2f", dark: "#9B9593" },
                background: { default: "#444343", paper: "#444343" },
                borderSelection: { main: "rgb(178, 56, 27)" },
              }),
        },
      }),
    [mode]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <ColorModeContext.Provider value={colorMode}>
        {/* <StylesProvider generateClassName={generateClassName}> */}
        <ThemeProvider theme={updatedTheme}>
          <Layout props={appData} />
          <IconButton
            sx={{ ml: 1, alignSelf: "baseline" }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
            size="large"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </ThemeProvider>
        {/* </StylesProvider> */}
      </ColorModeContext.Provider>
    </Box>
  );
};

export default App;
