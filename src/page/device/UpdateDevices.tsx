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
import { BellFilled } from "@ant-design/icons";

import SlideMain from "../../containers/SlideMain";
import Account from "../../components/User/Account";
import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";

//firebase
import firebase from "firebase/compat/app";

import { useParams } from "react-router-dom";

const { Content } = Layout;
const { Option } = Select;

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);

const tags = [
  " Khám tim mạch",
  " Khám Sản - Phụ khoa",
  " Khám răng hàm mặt",
  " Khám tai mũi họng",
  " Khám hô hấp",
  " Khám tổng quát",
];

interface DeviceData {
  codeDevice: string;
  nameDevice: string;
  ipAddress: string;
  isActive: string;
  isConnected: string;
  service: string;
  typeDevice: string;
}
function UpdateDevices() {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<DeviceData>({
    codeDevice: "",
    nameDevice: "",
    ipAddress: "",
    isActive: "",
    isConnected: "",
    service: "",
    typeDevice: ""
  });
  useEffect(() => {
    const fetchDevice = async () => {
      const deviceRef = firebase.firestore().collection("devices").doc(id);
      const deviceSnapshot = await deviceRef.get();
    
      if (deviceSnapshot.exists) {
        const deviceData = deviceSnapshot.data() as DeviceData;
        setDevice(deviceData);
      }
    };

    fetchDevice();
  }, [id]);

  const handleUpdateDevice = () => {
    const deviceRef = firebase.firestore().collection('devices').doc(id);
    const updatedDevice = {
      codeDevice: device.codeDevice,
      nameDevice: device.nameDevice,
      ipAddress: device.ipAddress,
      isActive: device.isActive,
      isConnected: device.isConnected,
      service: device.service,
      typeDevice: device.typeDevice
    };
  
    deviceRef
      .update(updatedDevice)
      .then(() => {
        console.log('Device updated successfully!');
        window.location.href = "/device";
      })
      .catch((error) => {
        console.error('Error updating device:', error);
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
                <BreadCrumbThree text="Thiết bị" text2="Danh sách thiết bị" href="/device" text3="Cập nhật thiết bị"/>
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
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Quản lý thiết bị</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140, height: 500 }}>
                <h6 style={{ color: "#FF7506" }}>Thông tin thiết bị</h6>
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Mã thiết bị: <span style={{ color: "#FF7506" }}></span>
                      </label>
                      <Form.Item className="">
                        <Input
                          value={device.codeDevice}
                          onChange={(e) =>
                            setDevice({
                              ...device,
                              codeDevice: e.target.value,
                            })
                          }
                          placeholder="Nhập mã thiết bị"
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Loại thiết bị:{" "}
                        <span style={{ color: "#FF7506" }}></span>
                      </label>
                      <Form.Item>
                        <Select defaultValue="all"
                        value={device.typeDevice}
                        onChange={(value) =>
                          setDevice({
                            ...device,
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
                      <label htmlFor="" className="mb-2">
                        Tên thiết bị: <span style={{ color: "#FF7506" }}></span>
                      </label>
                      <Form.Item className="">
                        <Input
                          value={device.nameDevice}
                          onChange={(e) =>
                            setDevice({
                              ...device,
                              codeDevice: e.target.value,
                            })
                          }
                          placeholder="Nhập tên thiết bị"
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Tên đăng nhập:{" "}
                        <span style={{ color: "#FF7506" }}></span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập tài khoản" />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Địa chỉ IP: <span style={{ color: "#FF7506" }}></span>
                      </label>
                      <Form.Item className="">
                        <Input
                          value={device.ipAddress}
                          onChange={(e) =>
                            setDevice({
                              ...device,
                              codeDevice: e.target.value,
                            })
                          }
                          placeholder="Nhập địa chỉ IP"
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Mật khẩu: <span style={{ color: "#FF7506" }}></span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập mật khẩu" />
                      </Form.Item>
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="mb-2">
                        Dịch vụ sử dụng:{" "}
                        <span style={{ color: "#FF7506" }}></span>
                      </label>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                      <Select
                          mode="tags"
                          style={{ height: 35, borderColor: "#FFAC6A" }}
                          tokenSeparators={[","]}
                          className="w-100"
                          value={device.service}
                          onChange={(value) =>
                            setDevice({
                              ...device,
                              service: value,
                            })
                          }
                        >
                          {tags.map((tag) => (
                            <Option key={tag}>{tag}</Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="col-4 mb-5 pb-1 text-right">
                      <span style={{ color: "#FF7506" }}></span>{" "}
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
                    onClick={handleUpdateDevice}
                    style={{
                      background: "#FF9138",
                      color: "white",
                      height: 38,
                      width: 115,
                    }}
                    className="mx-3 pt-2 me-5"
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

export default UpdateDevices;
