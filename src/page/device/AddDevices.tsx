import React, { useState } from "react";
import { Popover, Card, Form, Input, Select, Button, Layout } from "antd";

import { BellFilled } from "@ant-design/icons";

import Account from "../../components/User/Account";
import SlideMain from "../../containers/SlideMain";
import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";
import "../../assets/css/style.css";

// firebase
import firebase from "firebase/compat/app";

const { Content } = Layout;
const { Option } = Select;
const popoverContent = <div></div>; // Thay thế nội dung popover của bạn tại đây

const tags = [
  " Khám tim mạch",
  " Khám Sản - Phụ khoa",
  " Khám răng hàm mặt",
  " Khám tai mũi họng",
  " Khám hô hấp",
  " Khám tổng quát",
];

interface DeviceData {
  id: string;
  codeDevice: string;
  nameDevice: string;
  ipAddress: string;
  isActive: string;
  isConnected: string;
  service: string;
  typeDevice: string;
}
function AddDevices() {
  const [newDevice, setNewDevice] = useState<DeviceData>({
    id: "",
    codeDevice: "",
    nameDevice: "",
    ipAddress: "",
    isActive: "",
    isConnected: "",
    service: "",
    typeDevice: "",
  });

  const handleAddDevice = async () => {
    const deviceCollection = firebase.firestore().collection("devices");

    try {
      await deviceCollection.add({
        codeDevice: newDevice.codeDevice,
        nameDevice: newDevice.nameDevice,
        ipAddress: newDevice.ipAddress,
        isActive: newDevice.isActive,
        isConnected: newDevice.isConnected,
        service: newDevice.service,
        typeDevice: newDevice.typeDevice,
      });

      setNewDevice({
        id: "",
        codeDevice: "",
        nameDevice: "",
        ipAddress: "",
        isActive: "",
        isConnected: "",
        service: "",
        typeDevice: "",
      });

      // Thực hiện điều hướng đến trang danh sách sản phẩm
      window.location.href = "/device";
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
                  text="Thiết bị"
                  text2="Danh sách thiết bị"
                  href="/device"
                  text3="Thêm thiết bị"
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
              <h4 style={{ color: "#FF7506" }}>Quản lý thiết bị</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140 }}>
                <h6 style={{ color: "#FF7506" }}>Thông tin thiết bị</h6>
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Mã thiết bị: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="codeDevice"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mã thiết bị!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Nhập mã thiết bị"
                          value={newDevice.codeDevice}
                          onChange={(e) =>
                            setNewDevice({
                              ...newDevice,
                              codeDevice: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Loại thiết bị:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="typeDevice"
                        rules={[
                          {
                            required: false,
                            message: "Vui lòng chọn loại thiết bị!",
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          value={newDevice.typeDevice}
                          onChange={(value) =>
                            setNewDevice({
                              ...newDevice,
                              typeDevice: value,
                            })
                          }
                        >
                          <Option value="all">Chọn loại thiết bị</Option>
                          <Option value="Kiosk">Kiosk</Option>
                          <Option value="Display counter">Display counter</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Tên thiết bị:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="nameDevice"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên thiết bị!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Nhập tên thiết bị"
                          value={newDevice.nameDevice}
                          onChange={(e) =>
                            setNewDevice({
                              ...newDevice,
                              nameDevice: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Tên đăng nhập:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: false,
                            message: "Vui lòng nhập tên đăng nhập!",
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Nhập tên đăng nhập" />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Địa chỉ IP: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="ipAddress"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập địa chỉ IP!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Nhập địa chỉ IP"
                          value={newDevice.ipAddress}
                          onChange={(e) =>
                            setNewDevice({
                              ...newDevice,
                              ipAddress: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Mật khẩu: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: false,
                            message: "Vui lòng nhập mật khẩu!",
                          },
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Nhập mật khẩu"
                        />
                      </Form.Item>
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="mb-1">
                        Dịch vụ sử dụng:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="service"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập dịch vụ sử dụng!",
                          },
                        ]}
                      >
                        <Select
                          mode="tags"
                          style={{ height: 35, borderColor: "#FFAC6A" }}
                          tokenSeparators={[","]}
                          className="w-100"
                          value={newDevice.service}
                          onChange={(value) =>
                            setNewDevice({
                              ...newDevice,
                              service: value,
                            })
                          }
                        >
                          {tags.map((tag) => (
                            <Option key={tag}> {tag}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-4 mb-5 text-right">
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
                    href="/device"
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
                    onClick={handleAddDevice}
                  >
                    Thêm thiết bị
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

export default AddDevices;
