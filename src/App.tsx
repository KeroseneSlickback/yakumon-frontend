import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import MainLayout from "./Modules/Layout/MainLayout";
import DateTest from "./Pages/DateTest";
import Home from "./Pages/Home";
import Store from "./Pages/Store";
import Stylist from "./Pages/Stylist";

import { theme, GlobalStyles } from "./Styles/Variables";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/stylist" element={<Stylist />} />
          <Route path="/datetest" element={<DateTest />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
