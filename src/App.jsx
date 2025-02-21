import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import FormPage from "./page/FormPage";
import DetailPage from "./page/DetailPage";
import QRCde from "./page/QRCode.jsx";
import SignInPage from "./page/SignInPage.jsx";
import SignupPage from "./page/SignupPage.jsx";
import PrivateRoute from "./components/AuthRoute.jsx";
import CreateBowl from "./page/CreateBowl.jsx";
import BowlDetails from "./page/BowlDetails.jsx";
import BowlAll from "./page/BowlAll.jsx";
import BowlType from "./page/BowlType.jsx";
import VerifyOTP from "./page/verifyOTP.jsx";
import Dashboard from "./page/Dashboard.jsx";
import EditPet from "./page/EditPet.jsx";
import Profile from "./page/Profile.jsx";
import EditBowl from "./page/EditBowl.jsx";
import TeamPage from "./page/TeamPage.jsx";
const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verifyotp" element={<VerifyOTP />} />
          <Route path="/team" element={<TeamPage />} />
          <Route
            path="/add_bowl"
            element={
              <PrivateRoute>
                <CreateBowl />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit_pet/:id"
            element={
              <PrivateRoute>
                <EditPet />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/bowl_type"
            element={
              <PrivateRoute>
                <BowlType />
              </PrivateRoute>
            }
          />
          <Route
            path="/bowl/edit/:bid"
            element={
              <PrivateRoute>
                <EditBowl />
              </PrivateRoute>
            }
          />
          <Route
            path="bowl/:id"
            element={
              <PrivateRoute>
                <BowlDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/register/:category/:type"
            element={
              <PrivateRoute>
                <FormPage />
              </PrivateRoute>
            }
          />

          {/* <Route
          path="/register/pet/:type"
          element={
            <PrivateRoute>
              <FormPage />
            </PrivateRoute>
          }
        /> */}
          <Route
            path="/bowls"
            element={
              <PrivateRoute>
                <BowlAll />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/nearby_bowls"
            element={
              <PrivateRoute>
                <BowlAll />
              </PrivateRoute>
            }
          />
          <Route path="/pet/:id" element={<DetailPage />} />
          <Route path="/qr-code/:id" element={<QRCde />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
