import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import ProtectedRoute from "./themes/onepirate/modules/components/ProtectedRoute.js";

import Home from "./themes/onepirate/Home";
import LogIn from "./themes/onepirate/LogIn";
import SignUp from "./themes/onepirate/SignUp";
import EventsList2 from "./themes/onepirate/modules/views/EventsList2";
import EditBookTable from "./themes/onepirate/modules/views/EditBookTable";
import Our_Workers from "./themes/onepirate/modules/views/Our_Workers";
import EditWorkers from "./themes/onepirate/modules/views/EditWorkers";
import AddWorkers from "./themes/onepirate/modules/views/AddWorkers";
import UserList from "./themes/onepirate/modules/views/UserList";
import EditUsers from "./themes/onepirate/modules/views/EditUsers";
import AddUsers from "./themes/onepirate/modules/views/AddUsers.js"
import Add_Dishe from "./themes/onepirate/modules/views/Add_Dishe.js";
import EditDish from "./themes/onepirate/modules/views/EditDish.js";
import Our_Dishes_2 from "./themes/onepirate/modules/views/Our_Dishes_2.js";
import Our_Dishes from "./themes/onepirate/modules/views/Our_Dishes.js";
import NotFoundPage from "./themes/onepirate/modules/views/NotFoundPage.js";
import PasswordResetForm from "./themes/onepirate/modules/views/PasswordResetForm.js";
import PasswordResetRequest from "./themes/onepirate/modules/views/PasswordResetRequest.js";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/*" element={<NotFoundPage />} />  
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password-reset-request" element={<PasswordResetRequest />} />
        <Route path="/password-reset/:token" element={<PasswordResetForm />} />

       {/* Admin-Only Routes */}
       <Route path="/workers" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Our_Workers />
          </ProtectedRoute>
        } />
        <Route path="/workers/:id" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <EditWorkers />
          </ProtectedRoute>
        } />
        <Route path="/addWorkers" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AddWorkers />
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <EventsList2 />
          </ProtectedRoute>
        } />
        <Route path="/events/:id" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <EditBookTable />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserList />
          </ProtectedRoute>
        } />
        <Route path="/users/usersList" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserList />
          </ProtectedRoute>
        } />
        <Route path="/users/addUsers" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AddUsers />
          </ProtectedRoute>
        } />
        <Route path="/users/updateUser/:id" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <EditUsers />
          </ProtectedRoute>
        } />
        {/* User-Permitted Routes for Dishes */}
        <Route path="/addDishe" element={<Add_Dishe />} />
        <Route path="/editDishe/:id" element={<EditDish />} />
        <Route path="/dishes" element={<Our_Dishes />} />
        <Route path="/dishe" element={<Our_Dishes_2 />} />
      </Routes>
    </BrowserRouter>
  );
}
