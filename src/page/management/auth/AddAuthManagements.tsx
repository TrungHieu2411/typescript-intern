import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  Popover,
  Select,
} from "antd";
import { BellFilled } from "@ant-design/icons";

import SlideMain from "../../../containers/SlideMain";
import Account from "../../../components/User/Account";
import BreadCrumbThree from "../../../components/BreadCrumb/BreadCrumbThree";
import "../../../assets/css/style.css";

// firebase
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";

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
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  isActive: string;

  userName: string;
  password: string;
}
function AddAuthManagements() {
  const [newAuthManagement, setNewAuthManagement] =
    useState<AuthManagementData>({
      id: "",
      fullName: "",
      phone: "",
      email: "",
      role: "",
      isActive: "",
      userName: "",
      password: "",
    });

  const handleAddAuthManagement = async () => {
    try {
      const { password, email } = newAuthManagement;

      // Create user with email and password
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Get the user's ID
      const userId = userCredential.user?.uid;

      // Save the user's information in Firestore
      if (userId) {
        const authManagementCollection = firebase
          .firestore()
          .collection("authManagements");

        await authManagementCollection.doc(userId).set({
          fullName: newAuthManagement.fullName,
          phone: newAuthManagement.phone,
          email: newAuthManagement.email,
          role: newAuthManagement.role,
          isActive: newAuthManagement.isActive,
          userName: newAuthManagement.userName,
          password: newAuthManagement.password,
        });
      }

      setNewAuthManagement({
        id: "",
        fullName: "",
        phone: "",
        email: "",
        role: "",
        isActive: "",
        userName: "",
        password: "",
      });

      window.location.href = "/authManagement";
    } catch (error) {
      console.error(error);
    }
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
                  text3="Thêm tài khoản"
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
                              value={newAuthManagement.fullName}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
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
                              value={newAuthManagement.phone}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
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
                              value={newAuthManagement.email}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
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
                              value={newAuthManagement.role}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
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
                              value={newAuthManagement.userName}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
                                  userName: e.target.value,
                                })
                              }
                              placeholder="203"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Mật khẩu:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input.Password
                              value={newAuthManagement.password}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
                                  password: e.target.value,
                                })
                              }
                              placeholder="Khám tim mạch"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Nhập lại mật khẩu:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input.Password
                              value={newAuthManagement.password}
                              onChange={(e) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
                                  password: e.target.value,
                                })
                              }
                              placeholder="Khám tim mạch"
                            />
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
                              value={newAuthManagement.isActive}
                              onChange={(value) =>
                                setNewAuthManagement({
                                  ...newAuthManagement,
                                  isActive: value,
                                })
                              }
                            >
                              <Select.Option value="all">Tất cả</Select.Option>
                              <Select.Option value="Hoạt động">
                                Hoạt động
                              </Select.Option>
                              <Select.Option value="Ngưng hoạt động">
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
