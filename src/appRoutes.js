import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./themes/onepirate/Home";
import LogIn from "./themes/onepirate/LogIn";
import SignUp from "./themes/onepirate/SignUp";

export default function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path ="/signUp" element={<SignUp/>}/>
          {/* <Route path="/signUp" element={<SignAp />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/image/:imgURL" element={<ImageCompany />} />
          <Route  path="/password-reset-request"  element={<PasswordResetRequest />}/>
          <Route path="/password-reset/:token" element={<PasswordResetForm />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/*" element={ <NotFoundPage/>} />  */}
  
        </Routes>
      </BrowserRouter>
    );
  }
  