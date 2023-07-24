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
      // Sau khi đăng xuất thành công, chuyển đến trang đăng nhập bằng cách sử dụng window.location.href
      window.location.href = "/login"; // Thay "/login" bằng đường dẫn của trang đăng nhập của bạn
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
              key="logout"
              style={{ background: "#FFF2E7", color: "#FF7506" }}
              id="logout"
              icon={<LogoutOutlined />}
              className="menu-item mb-4"
            >
              <Link onClick={handleLogoutClick}>Đăng nhập</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
    </div>
  );
}

export default SlideMain;
