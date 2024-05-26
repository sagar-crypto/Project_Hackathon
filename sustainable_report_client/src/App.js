import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "views/LoginPage/LoginPage.js";
import SignUp from "views/LoginPage/Signup.js";
import Home from "views/home.js";     
import SupplierDetail from "views/LoginPage/supplierdetail.js"
import Form from "views/form.js"
import Report from "views/report"

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
          <Route path="/form" element={<Form />} />
          <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
