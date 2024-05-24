import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "views/LoginPage/LoginPage.js";
import SignUp from "views/LoginPage/Signup.js";
import Home from "views/home.js";     
import SupplierDetail from "views/LoginPage/supplierdetail.js"

// import evef from "./views/LoginPage/EmailVerification.js"
// import resetpass from "./views/LoginPage/ResetPassword.js"
// import forgotpass from "./views/LoginPage/ForgotPass.js"

function App() {
  return (
    <BrowserRouter>
      <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<SupplierDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
