import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import MainLayout from "./Modules/Layout/MainLayout";
import Home from "./Pages/Home";
import Store from "./Pages/Store";
import Reservation from "./Pages/Reservation";
import Confirmation from "./Pages/Confirmation";

import { theme, GlobalStyles } from "./Styles/Variables";
import RearPortal from "./Pages/SubPages/RearPortal";
import { RequireEmployeeAuth } from "./Modules/Auth/RequireEmployeeAuth";
import EmployeeSection from "./Pages/SubPages/EmployeeSection";
import { RequireOwnerAuth } from "./Modules/Auth/RequireOwnerAuth";
import OwnerSection from "./Pages/SubPages/OwnerSection";
import NotFound from "./Pages/SubPages/NotFound";
import NotAuthorized from "./Pages/SubPages/NotAuthorized";
import OwnerEmployeeLogin from "./Pages/SubPages/OwnerEmployeeLogin";
import NewStorePortal from "./Pages/SubPages/NewStorePortal";
import EditStorePortal from "./Pages/SubPages/EditStorePortal";
import AppointmentConfirmation from "./Pages/SubPages/AppointmentConfirmation";
import EditAppointment from "./Pages/SubPages/EditAppointment";
import EmployeeCreateAppointment from "./Pages/SubPages/EmployeeCreateAppointment";
import EmployeeTimeOff from "./Pages/SubPages/EmployeeTimeOff";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainLayout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="store/:id" element={<Store />} />
          <Route path="reservation/:id" element={<Reservation />} />
          <Route path="confirmation/:id" element={<Confirmation />} />
          <Route
            path="appointmentConfirm/:id"
            element={<AppointmentConfirmation />}
          />
          <Route path="portal" element={<RearPortal />}>
            <Route index element={<OwnerEmployeeLogin />} />
            <Route
              path="employee"
              element={
                <RequireEmployeeAuth>
                  <EmployeeSection />
                </RequireEmployeeAuth>
              }
            />
            <Route
              path="editAppointment/:id"
              element={
                <RequireEmployeeAuth>
                  <EditAppointment />
                </RequireEmployeeAuth>
              }
            />
            <Route
              path="createAppointment/:id"
              element={
                <RequireEmployeeAuth>
                  <EmployeeCreateAppointment />
                </RequireEmployeeAuth>
              }
            />
            <Route
              path="timeOff/:id"
              element={
                <RequireEmployeeAuth>
                  <EmployeeTimeOff />
                </RequireEmployeeAuth>
              }
            />
            <Route
              path="owner"
              element={
                <RequireOwnerAuth>
                  <OwnerSection />
                </RequireOwnerAuth>
              }
            />
            <Route
              path="newstore"
              element={
                <RequireOwnerAuth>
                  <NewStorePortal />
                </RequireOwnerAuth>
              }
            />
            <Route
              path="editStore/:id"
              element={
                <RequireOwnerAuth>
                  <EditStorePortal />
                </RequireOwnerAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="noauth" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
