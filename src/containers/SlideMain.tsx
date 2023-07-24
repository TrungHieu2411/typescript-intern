import {
  AppstoreOutlined,
  DashboardOutlined,
  FileOutlined,
  LaptopOutlined,
  LogoutOutlined,
  NumberOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";
import Link from "antd/es/typography/Link";
import firebase from "firebase/compat/app";

function SlideMain() {
  const handleLogoutClick = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (userId !== null) {
        const authManagementsCollection = firebase.firestore().collection("authManagements");

        await Promise.all([
          authManagementsCollection.doc(userId).update({
            isActive: "Ngưng hoạt động",
          }),
          new Promise<void>((resolve) => {
            localStorage.setItem("isLoggedIn", "false");
            resolve();
          }),
        ]);
        console.log("Đã cập nhật trạng thái thành Ngưng hoạt động");

        // Xóa thông tin người dùng khỏi Local Storage khi đăng xuất
        localStorage.removeItem("userId");

        // Có thể thực hiện các hành động tiếp theo sau khi cập nhật và đăng xuất thành công

        // Sau khi đăng xuất thành công, chuyển đến trang đăng nhập bằng cách sử dụng window.location.href
        window.location.href = "/"; // Thay "/login" bằng đường dẫn của trang đăng nhập của bạn
      } else {
        console.log("Không tìm thấy userId trong Local Storage.");
      }
    } catch (error) {
      console.log("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  return (
    <div>
      <Sider className="slide" width={200}>
        <div className="slide">
          <Menu theme="light" className="menu-items">
            <div className="text-center py-4 mb-4">
              <Link href="/dashboard">
                <img
                  src="../../../assets/image/logo.jpg"
                  style={{ width: 100, height: 80 }}
                  className="logoImg"
                  alt="Logo"
                />
              </Link>
            </div>
            <Menu.Item
              key="dashboard"
              icon={<DashboardOutlined />}
              className="menu-item a"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              key="devices"
              icon={<LaptopOutlined />}
              className="menu-item a"
            >
              <Link href="/device">Thiết bị</Link>
            </Menu.Item>
            <Menu.Item
              key="services"
              icon={<AppstoreOutlined />}
              className="menu-item a"
            >
              <Link href="/service">Dịch vụ</Link>
            </Menu.Item>
            <Menu.Item
              key="level"
              icon={<NumberOutlined />}
              className="menu-item a"
            >
              <Link href="/progressive">Cấp số</Link>
            </Menu.Item>
            <Menu.Item
              key="reports"
              icon={<FileOutlined />}
              className="menu-item a"
            >
              <Link href="/report">Báo cáo</Link>
            </Menu.Item>
            <SubMenu
              icon={<SettingOutlined />}
              title="Cài đặt hệ thống"
              className="a"
            >
              <Menu.Item key="role">
                <Link href="/roleManagement">Quản lý vai trò</Link>
              </Menu.Item>
              <Menu.Item key="component">
                <Link href="/authManagement">Quản lý tài khoản</Link>
              </Menu.Item>
              <Menu.Item key="user-logs">
                <Link href="/userLogManagement">Nhật ký người dùng</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="logout"
              style={{ background: "#FFF2E7", color: "#FF7506" }}
              id="logout"
              icon={<LogoutOutlined />}
              className="menu-item mb-4"
            >
              <Link onClick={handleLogoutClick}>
                Đăng xuất
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
    </div>
  );
}

export default SlideMain;
