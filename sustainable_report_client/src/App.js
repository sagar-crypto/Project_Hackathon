import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./views/LoginPage/LoginPage.js";
// import SignUp from "./views/LoginPage/Signup.js"
// import evef from "./views/LoginPage/EmailVerification.js"
// import resetpass from "./views/LoginPage/ResetPassword.js"
// import forgotpass from "./views/LoginPage/ForgotPass.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login-page" component={LoginPage} />
          {/* <Route path="/sign-up" component={SignUp} />
          <Route path="/Evef/:token" component={evef} />
          <Route path="/resetpass/:token" component={resetpass} />
          <Route path="/forgotpass" component={forgotpass} /> */}
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
