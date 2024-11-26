import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import OwnerLanding from "./pages/OwnerLanding"
import TrusteeLanding from "./pages/TrusteeLanding"
import ContractorLanding from "./pages/ContractorLanding"
import EmailStatement from "./pages/DownloadStatement"
import ChangeFR from "./pages/FRChange"
import Levies from "./pages/LevyACCDetails"
import User from "./pages/UserAcc"
import PasswordResetRequest1 from "./pages/PwReset";
import PasswordResetConfirm1 from "./pages/ConfirmPw";
import AccDetailsViewFunc1 from "./pages/AccountDetails";


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Home />             
            </ProtectedRoute>
          }
        />
        <Route path="/ownerLanding" element={<OwnerLanding />} />
        <Route path="/trusteeLanding" element={<TrusteeLanding />} />
        <Route path="/contractorLanding" element={<ContractorLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/notfound" element={<NotFound />}></Route>
        <Route path="/statement" element={<EmailStatement />}></Route>
        <Route path="/friendly" element={<ChangeFR />}></Route>
        <Route path="/levyAccounts" element={<Levies />}></Route>
        <Route path="/password-reset" element={<PasswordResetRequest1 />} />
        <Route path="/password-reset-confirm" element={<PasswordResetConfirm1 />} />
        <Route path="/user" element={<User />}></Route>
        <Route path="/account" element={<AccDetailsViewFunc1 />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

