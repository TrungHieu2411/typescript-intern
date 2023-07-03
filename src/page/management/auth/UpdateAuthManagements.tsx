import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  Popover,
  Select,
} from "antd";
import { BellFilled} from "@ant-design/icons";

import SlideMain from "../../../containers/SlideMain";
import Account from "../../../components/User/Account";
import BreadCrumbThree from "../../../components/BreadCrumb/BreadCrumbThree";
import "../../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";

import { useParams } from "react-router-dom";

const { Content } = Layout;

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);

interface AuthManagementData {
  fullName: string;
  phone: string;
  email: string;
  role: string;
  isActive: string;
  
  userName: string;
  password: string;
}
function UpdateAuthManagements() {
  const { id } = useParams<{ id: string }>();
  const [authManagement, setAuthManagement] = useState<AuthManagementData>({
    fullName: "",
    phone: "",
    email: "",
    role: "",
    isActive: "",
    userName: "",
    password: "",
  });
  useEffect(() => {
    const fetchAuthManagement = async () => {
      const authManagementRef = firebase
        .firestore()
        .collection("authManagements")
        .doc(id);
      const authManagementSnapshot = await authManagementRef.get();

      if (authManagementSnapshot.exists) {
        const authManagementData =
          authManagementSnapshot.data() as AuthManagementData;
        setAuthManagement(authManagementData);
      }
    };
    fetchAuthManagement();
  }, [id]);

  const handleUpdateAuthManagement = () => {
    const authManagemenRef = firebase
      .firestore()
      .collection("authManagements")
      .doc(id);
    const updatedAuthManagement = {
      fullName: authManagement.fullName,
      phone: authManagement.phone,
      email: authManagement.email,
      role: authManagement.role,
      isActive: authManagement.isActive,

     
      userName: authManagement.userName,
      password: authManagement.password,
    };

    authManagemenRef
      .update(updatedAuthManagement)
      .then(() => {
        console.log("AuthManagement updated successfully!");
        window.location.href = "/authManagement";
      })
      .catch((error) => {
        console.error("Error updating AuthManagement:", error);
      });
  };


  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbThree
                  text="Cài đặt hệ thống"
                  text2="Quản lý tài khoản"
                  href="/authManagement"
                  text3="Cập nhật tài khoản"
                />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Button
                    style={{ background: "#FFF2E7" }}
                    type="ghost"
                    shape="circle"
                  >
                    <Popover
                      placement="bottomLeft"
                      content={popoverContent}
                      trigger="click"
                    >
                      <BellFilled
                        style={{ color: "#FF7506" }}
                        className="fs-5 d-flex align-items-center justify-content-center"
                      />
                    </Popover>
                  </Button>
                  <Account
                    link="/admin"
                    img="../assets/image/logo.jpg"
                    hello="Xin chào"
                    name="Thạch Lê Trung Hiếu"
                  />
                </span>
              </div>
            </div>
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Quản lý tài khoản</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140 }}>
                <h6 style={{ color: "#FF7506" }}>Thông tin tài khoản</h6>
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Họ tên: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={authManagement.fullName}
                              onChange={(e) =>
                                setAuthManagement({
                                  ...authManagement,
                                  fullName: e.target.value,
                                })
                              }
                              placeholder="203"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Số điện thoại:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={authManagement.phone}
                              onChange={(e) =>
                                setAuthManagement({
                                  ...authManagement,
                                  phone: e.target.value,
                                })
                              }
                              placeholder="Khám tim mạch"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Email: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={authManagement.email}
                              onChange={(e) =>
                                setAuthManagement({
                                  ...authManagement,
                                  email: e.target.value,
                                })
                              }
                              placeholder="Khám tim mạch"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Vai trò: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={authManagement.role}
                              onChange={(e) =>
                                setAuthManagement({
                                  ...authManagement,
                                  role: e.target.value,
                                })
                              }
                              placeholder="Khám tim mạch"
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="mb-5 text-right">
                        <span style={{ color: "#FF7506" }}>*</span>{" "}
                        <small>Là trường hợp thông tin bắt buộc</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tên đăng nhập:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input 
                             value={authManagement.userName}
                             onChange={(e) =>
                               setAuthManagement({
                                 ...authManagement,
                                 userName: e.target.value,
                               })
                             }
                            placeholder="203" />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Mật khẩu:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input.Password 
                            value={authManagement.password}
                            onChange={(e) =>
                              setAuthManagement({
                                ...authManagement,
                                password: e.target.value,
                              })
                            }
                            placeholder="Khám tim mạch" />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Nhập lại mật khẩu:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input.Password 
                             value={authManagement.password}
                             onChange={(e) =>
                               setAuthManagement({
                                 ...authManagement,
                                 password: e.target.value,
                               })
                             }
                            placeholder="Khám tim mạch" />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tình trạng:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Select
                              defaultValue="all"
                              value={authManagement.isActive}
                              onChange={(value) =>
                                setAuthManagement({
                                  ...authManagement,
                                  isActive: value,
                                })
                              }
                            >
                              <Select.Option value="all">Tất cả</Select.Option>
                              <Select.Option value="active">
                                Hoạt động
                              </Select.Option>
                              <Select.Option value="inactive">
                                Ngưng hoạt động
                              </Select.Option>
                            </Select>
                          </Form.Item>
                          
                        </div>
                      </div>
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
                    onClick={handleUpdateAuthManagement}
                  >
                    Cập nhật
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

export default UpdateAuthManagements;
