import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#86352C" },
    secondary: { main: "#AC4439" },
    background: { default: "#fff" }
  },
  typography: {
    h1: {
      fontSize: "3.75rem",
      marginBottom: "1rem"
    },
    h2: {
      fontSize: "3rem",
      marginBottom: "1rem"
    },
    h3: {
      fontSize: "2rem",
      marginBottom: "1rem"
    },
    body1: {
      fontSize: "1.2rem",
      marginBottom: "1rem"
    }
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: "h2",
        h2: "h3",
        h3: "h4",
        h4: "h4",
        h5: "h4",
        h6: "h4",
        subtitle1: "h3",
        subtitle2: "h4",
        body1: "p",
        body2: "span"
      }
    }
  }
});

export default theme;
