import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./Pages/Home";

import { DarkTheme, LightTheme, GlobalStyles } from "./Styles/Variables";

function App() {
  const [theme, setTheme] = useState("dark");

  const setMode = (mode: string) => {
    localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggle = () => {
    theme === "dark" ? setMode("light") : setMode("dark");
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme ? setTheme(localTheme) : setMode("dark");
  }, []);

  return (
    <ThemeProvider theme={theme === "dark" ? DarkTheme : LightTheme}>
      <GlobalStyles />
      {/* Layout */}
      <Home />
      {/* <Routes>
        <Route path="/"></Route>
      </Routes> */}
      {/* Layout */}
    </ThemeProvider>
  );
}

export default App;
