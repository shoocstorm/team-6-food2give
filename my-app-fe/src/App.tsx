import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DonorPage from "./pages/DonorPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import VolunteerPage from "./pages/VolunteerPage";
import Layout from "./layouts/Layout";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat",
      allVariants: {
        color: "#ffffff",
      },
    },
    palette: {
      mode: "dark",
      background: {
        default: "#000000",
        paper: "#121212",
      },
      primary: {
        main: "#77dd77",
      },
      secondary: {
        main: "#ffb347",
      },
      text: {
        primary: "#ffffff",
        secondary: "#b0b0b0",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#000000",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            color: "#77dd77",
            border: "1px solid #77dd77",
          },
          outlined: {
            borderColor: "#77dd77",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route
                  path="/donor"
                  element={<DonorPage donorId="Bread Talk" />}
                />
                <Route
                  path="/volunteer"
                  element={<VolunteerPage volunteerId="Bob" />}
                />
              </Route>
            </Routes>
          </Router>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
