import React from "react";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/auth/ForgotPassword";
import Login from "./components/auth/Login";
import ConfilmPassword from "./components/auth/ConfilmPassword";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import ListDevices from "./components/device/ListDevices";
import AddDevices from "./components/device/AddDevices";
import DetailDevices from "./components/device/DetailDevices";
import UpdateDevices from "./components/device/UpdateDevices";
import ListServices from "./components/service/ListServices";
import AddServices from "./components/service/AddServices";
import UpdateServices from "./components/service/UpdateServices";
import DetailServices from "./components/service/DetailServices";
import AddProgressives from "./components/progressive/AddProgressives";
import ListProgressives from "./components/progressive/ListProgressives";
import DetailProgressives from "./components/progressive/DetailProgressives";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/quenmatkhau" element={<ForgotPassword />} />
      <Route path="/xacnhanmatkhau" element={<ConfilmPassword />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/device" element={<ListDevices />} />
      <Route path="/addDevice" element={<AddDevices />} />
      <Route path="/detailDevice" element={<DetailDevices />} />
      <Route path="/editDevice" element={<UpdateDevices />} />

      <Route path="/service" element={<ListServices />} />
      <Route path="/addService" element={<AddServices />} />
      <Route path="/detailService" element={<DetailServices />} />
      <Route path="/editService" element={<UpdateServices />} />


      <Route path="/progressive" element={<ListProgressives />} />
      <Route path="/addProgressive" element={<AddProgressives />} />
      <Route path="/detailProgressive" element={<DetailProgressives />} />
    </Routes>
  );
};

export default Router;
