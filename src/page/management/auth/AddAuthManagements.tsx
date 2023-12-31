import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Layout, Select, message } from "antd";
import { Option } from "antd/lib/mentions";

import SlideMain from "../../../containers/SlideMain";
import Account from "../../../components/User/Account";
import BreadCrumbThree from "../../../components/BreadCrumb/BreadCrumbThree";
import "../../../assets/css/style.css";

import moment from "moment";
import { useDispatch } from "react-redux";
import { createAuthManagement } from "../../../redux/authManagement/authManagementSlice";
import { firestore } from "../../../firebase/firebaseConfig";

const { Content } = Layout;

interface AuthManagementData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: string; // Thay đổi kiểu dữ liệu của role thành DocumentReference
  isActive: string;
  userName: string;
  image: string;
  password: string;
  confirmPassword: string;
}

function AddAuthManagements() {
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    // Fetch roles from Firestore and set the roles state
    const fetchRoles = async () => {
      try {
        const rolesSnapshot = await firestore.collection("roles").get();
        const rolesData = rolesSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.nameRole, // Thay "name" bằng tên trường chứa tên vai trò trong tài liệu Firestore
          };
        });
        setRoles(rolesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoles();
  }, []);

  //-------------
  const [newAuthManagement, setNewAuthManagement] =
    useState<AuthManagementData>({
      id: "",
      fullName: "",
      phone: "",
      email: "",
      role: "", // Khởi tạo role ban đầu là null
      isActive: "",
      image: "",
      userName: "",
      password: "",
      confirmPassword: "",
    });

  const addNoteToCollection = async (action: string) => {
    const noteUsersCollection = firestore.collection("noteUsers");
    const ipAddress = await fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => data.ip)
      .catch((error) => {
        console.error("Failed to fetch IP address:", error);
        return "";
      });

    // Lấy userId từ localStorage
    const userName = localStorage.getItem("userName");
    try {
      await noteUsersCollection.add({
        action: action,
        timeAction: moment().format("DD/MM/YYYY HH:mm:ss"),
        ipAddress: ipAddress,
        userName: userName,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const passwordMatchError = password !== newAuthManagement.confirmPassword;
    setNewAuthManagement((prevState) => ({
      ...prevState,
      password: password,
    }));
    setPasswordMatchError(passwordMatchError);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = e.target.value;
    const passwordMatchError = confirmPassword !== newAuthManagement.password;
    setNewAuthManagement((prevState) => ({
      ...prevState,
      confirmPassword: confirmPassword,
    }));
    setPasswordMatchError(passwordMatchError);
  };

  const dispath = useDispatch();
  const onFinish = async () => {
    message.success(
      `Thêm mới tài khoản ${newAuthManagement.userName} thành công!`
    );
    await dispath(createAuthManagement(newAuthManagement) as any);
    // Thêm ghi chú vào collection noteUsers
    await addNoteToCollection(
      `Thêm mới tài khoản: ${newAuthManagement.userName}`
    );
    window.location.href = "/authManagement";
  };

  const [form] = Form.useForm();

  const handleAddAuthManagement = () => {
    // Kiểm tra và submit form
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "0px 16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbThree
                  text="Cài đặt hệ thống"
                  text2="Quản lý tài khoản"
                  href="/authManagement"
                  text3="Thêm tài khoản"
                />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Account />
                </span>
              </div>
            </div>
            <div className="pt-4 mt-2">
              <h4 style={{ color: "#FF7506" }}>Quản lý tài khoản</h4>
            </div>
            <div className="pt-3">
              <Card style={{ width: 1140 }}>
                <h6 style={{ color: "#FF7506" }}>Thông tin tài khoản</h6>
                <Form className="mt-3" form={form} onFinish={onFinish}>
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Họ tên: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item
                            name="fullName"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập họ và tên!",
                              },
                            ]}
                          >
                            <Input
                              value={newAuthManagement.fullName}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
                                  fullName: e.target.value,
                                })
                              }
                              placeholder="Nhập họ và tên"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Số điện thoại:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập số điện thoại!",
                              },
                            ]}
                          >
                            <Input
                              value={newAuthManagement.phone}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
                                  phone: e.target.value,
                                })
                              }
                              placeholder="Nhập số điện thoại"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Email: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                type: "email", // Kiểm tra định dạng email
                                message: "Vui lòng nhập đúng định dạng email!",
                              },
                              {
                                required: true,
                                message: "Vui lòng nhập email!",
                              },
                            ]}
                          >
                            <Input
                              value={newAuthManagement.email}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
                                  email: e.target.value,
                                })
                              }
                              placeholder="Nhập email"
                            />
                          </Form.Item>
                        </div>

                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Vai trò: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item
                            name="role"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập vai trò!",
                              },
                            ]}
                          >
                            <Select
                              value={newAuthManagement.role}
                              onChange={(value) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
                                  role: value,
                                })
                              }
                              placeholder="Chọn vai trò"
                            >
                              {roles.map((role) => (
                                <Option key={role.id} value={role.id}>
                                  {role.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tên đăng nhập:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item
                            name="userName"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên đăng nhập!",
                              },
                            ]}
                          >
                            <Input
                              value={newAuthManagement.userName}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
                                  userName: e.target.value,
                                })
                              }
                              placeholder="Nhập tên đăng nhập"
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <div className="col-12">
                            <label htmlFor="" className="mb-2">
                              Mật khẩu:{" "}
                              <span style={{ color: "#FF7506" }}>*</span>
                            </label>
                            <Form.Item
                              name="password"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập mật khẩu!",
                                },
                              ]}
                            >
                              <Input.Password
                                value={newAuthManagement.password}
                                onChange={handlePasswordChange}
                                placeholder="Nhập mật khẩu"
                              />
                            </Form.Item>
                          </div>
                          <div className="col-12">
                            <label htmlFor="" className="mb-2">
                              Nhập lại mật khẩu:{" "}
                              <span style={{ color: "#FF7506" }}>*</span>
                            </label>
                            <Form.Item
                              name="confirmPassword"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập lại mật khẩu!",
                                },
                              ]}
                              validateStatus={passwordMatchError ? "error" : ""}
                              help={
                                passwordMatchError &&
                                "Mật khẩu không khớp. Vui lòng nhập lại."
                              }
                            >
                              <Input.Password
                                value={newAuthManagement.confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="Nhập lại mật khẩu"
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tình trạng:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item
                            name="isActive"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập trạng thái!",
                              },
                            ]}
                          >
                            <Select
                              value={newAuthManagement.isActive}
                              onChange={(value) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
                                  isActive: value,
                                })
                              }
                              placeholder="Chọn trạng thái"
                            >
                              <Option value="Hoạt động">Hoạt động</Option>
                              <Option value="Ngưng hoạt động">
                                Ngưng hoạt động
                              </Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="mb-5 pb-4 text-right">
                      <span style={{ color: "#FF7506" }}>*</span>{" "}
                      <small>Là trường hợp thông tin bắt buộc</small>
                    </div>
                  </div>
                </Form>
              </Card>
              <div className="col-6 text-center offset-3 mt-3">
                <Form.Item>
                  <Button
                    danger
                    htmlType="submit"
                    href="/authManagement"
                    className="mx-3 pt-2"
                    style={{
                      background: "#FFF2E7",
                      color: "#FF9138",
                      height: 38,
                      width: 115,
                    }}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="link"
                    style={{
                      background: "#FF9138",
                      color: "white",
                      height: 38,
                      width: 115,
                    }}
                    className="mx-3 pt-2 me-5"
                    onClick={handleAddAuthManagement}
                  >
                    Thêm
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AddAuthManagements;
