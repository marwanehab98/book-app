import React, { lazy, Suspense, useContext } from "react";
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  ProtectedRoute,
  BrowserRouter,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";

const Routess = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/favourites" element={<Main />} />
      {/* <Route path="/patients" element={<Main />} /> */}
    </Routes>
  );
};
export default Routess;
