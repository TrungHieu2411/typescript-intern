import React from "react";
import { Route, Routes } from "react-router-dom";

//Xử lý Đăng nhập
import ConfilmPassword from "./page/auth/ConfilmPassword";
import ForgotPassword from "./page/auth/ForgotPassword";
import Login from "./page/auth/Login";

//Thiết bị
import AddDevices from "./page/device/AddDevices";
import DetailDevices from "./page/device/DetailDevices";
import ListDevices from "./page/device/ListDevices";
import UpdateDevices from "./page/device/UpdateDevices";
//Dịch vụ
import ListServices from "./page/service/ListServices";
import AddServices from "./page/service/AddServices";
import DetailServices from "./page/service/DetailServices";
import UpdateServices from "./page/service/UpdateServices";
//Cấp số
import ListProgressives from "./page/progressive/ListProgressives";
import AddProgressives from "./page/progressive/AddProgressives";
import DetailProgressives from "./page/progressive/DetailProgressives";
//Báo cáo
import ListReport from "./page/report/ListReport";
//Quản lý vai trò
import RoleManagement from "./page/management/role/RoleManagements";
import AddRoleManagements from "./page/management/role/AddRoleManagements";
import UpdateRoleManagements from "./page/management/role/UpdateRoleManagements";
//Quản lý tài khoản
import AuthManagements from "./page/management/auth/AuthManagements";
import AddAuthManagements from "./page/management/auth/AddAuthManagements";
import UpdateAuthManagements from "./page/management/auth/UpdateAuthManagements";
//Thông tin tài khoản
import UserLogManagements from "./page/management/user/UserLogManagements";
import Admin from "./containers/Admin";
import Dashboard from "./containers/Dashboard";
import NotFould from "./page/error/NotFould";

const Router = () => {
  // Hàm kiểm tra trạng thái đăng nhập
  const isLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true";
  };

  const allowAccess = isLoggedIn(); // Xác định trạng thái cho phép truy cập

  return (
    <Routes>
      {allowAccess ? (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:id" element={<Admin />} />

          <Route path="/device" element={<ListDevices />} />
          <Route path="/addDevice" element={<AddDevices />} />
          <Route path="/detailDevice/:id" element={<DetailDevices />} />
          <Route path="/editDevice/:id" element={<UpdateDevices />} />

          <Route path="/service" element={<ListServices />} />
          <Route path="/addService" element={<AddServices />} />
          <Route path="/detailService/:id" element={<DetailServices />} />
          <Route path="/editService/:id" element={<UpdateServices />} />

          <Route path="/progressive" element={<ListProgressives />} />
          <Route path="/addProgressive" element={<AddProgressives />} />
          <Route
            path="/detailProgressive/:id"
            element={<DetailProgressives />}
          />

          <Route path="/report" element={<ListReport />} />

          <Route path="/roleManagement" element={<RoleManagement />} />
          <Route path="/addRoleManagement" element={<AddRoleManagements />} />
          <Route
            path="/editRoleManagement/:id"
            element={<UpdateRoleManagements />}
          />

          <Route path="/authManagement" element={<AuthManagements />} />
          <Route path="/addAuthManagement" element={<AddAuthManagements />} />
          <Route
            path="/editAuthManagement/:id"
            element={<UpdateAuthManagements />}
          />

          <Route path="/userLogManagement" element={<UserLogManagements />} />
          {/* Các route khác cho phép truy cập khi đăng nhập */}
          <Route path="/*" element={<NotFould />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quenmatkhau" element={<ForgotPassword />} />
          <Route path="/xacnhanmatkhau/:id" element={<ConfilmPassword />} />
          <Route path="/*" element={<NotFould />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
