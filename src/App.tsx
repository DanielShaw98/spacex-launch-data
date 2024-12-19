import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LaunchTable from "./components/LaunchTable";
import LaunchSummary from "./pages/LaunchSummary";
import Header from "./components/Header/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LaunchTable />} />
          <Route path="/launch/:id" element={<LaunchSummary />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
