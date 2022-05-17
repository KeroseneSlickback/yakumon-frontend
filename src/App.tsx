import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import MainLayout from "./Modules/Layout/MainLayout";
import DateTest from "./Pages/DateTest";
import Home from "./Pages/Home";
import Store from "./Pages/Store";
import Reservation from "./Pages/Reservation";
import Confirmation from "./Pages/Confirmation";

import { theme, GlobalStyles } from "./Styles/Variables";
import RearPortal from "./Pages/RearPortal";
import { RequireEmployeeAuth } from "./Modules/Auth/RequireEmployeeAuth";
import EmployeeSection from "./Pages/EmployeeSection";
import { RequireOwnerAuth } from "./Modules/Auth/RequireOwnerAuth";
import OwnerSection from "./Pages/OwnerSection";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/:id" element={<Store />} />
          <Route path="/reservation/:id" element={<Reservation />} />
          <Route path="/datetest" element={<DateTest />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="/portal" element={<RearPortal />}>
            <Route
              path="owner"
              element={
                <RequireOwnerAuth>
                  <OwnerSection />
                </RequireOwnerAuth>
              }
            />
            <Route
              path="employee"
              element={
                <RequireEmployeeAuth>
                  <EmployeeSection />
                </RequireEmployeeAuth>
              }
            />
          </Route>
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
