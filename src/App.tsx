import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import MainLayout from "./Modules/Layout/MainLayout";
import DateTest from "./Pages/DateTest";
import Home from "./Pages/Home";

import { DarkTheme, LightTheme, GlobalStyles } from "./Styles/Variables";

function App() {
  const [theme, setTheme] = useState("dark");

  const setMode = (mode: string) => {
    localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggle = (): void => {
    theme === "dark" ? setMode("light") : setMode("dark");
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme ? setTheme(localTheme) : setMode("dark");
  }, []);

  return (
    <ThemeProvider theme={theme === "dark" ? DarkTheme : LightTheme}>
      <GlobalStyles />
      <MainLayout themeToggle={themeToggle} theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/datetest" element={<DateTest />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
