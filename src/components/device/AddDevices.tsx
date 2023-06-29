import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  Layout,
  Popover,
  Select,
} from "antd";
import { BellFilled } from "@ant-design/icons";

import "../css/style.css";
import SlideMain from "../../containers/SlideMain";
const { Content } = Layout;

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);

function AddDevices() {
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <Breadcrumb className="fs-6" separator=">">
                  <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                  <Breadcrumb.Item className="text-decoration-none" href="/device">Danh sách thiết bị</Breadcrumb.Item>
                  <Breadcrumb.Item className="fw-bold custom-color">
                    Thêm thiết bị
                  </Breadcrumb.Item>
                </Breadcrumb>
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
                  <img
                    style={{
                      width: 40,
                      height: 40,
                      marginLeft: 10,
                      borderRadius: "50%",
                    }}
                    src="./assets/image/logo.jpg"
                    alt=""
                  />

                  <span className="ms-2">
                    <p className="mb-0">Xin chào</p>
                    <p className="mb-0 fw-bold">Thạch Lê Trung Hiếu</p>
                  </span>
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
                      <label htmlFor="" className="mb-2">
                        Mã thiết bị: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập mã thiết bị"/>
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Loại thiết bị:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item>
                        <Select defaultValue="all">
                          <Select.Option value="all">Chọn loại thiết bị</Select.Option>
                          <Select.Option value="connected">
                            Kết nối
                          </Select.Option>
                          <Select.Option value="disconnected">
                            Mất kết nối
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Tên thiết bị:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập tên thiết bị"/>
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Tên đăng nhập:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập tài khoản"/>
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Địa chỉ IP: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập địa chỉ IP"/>
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Mật khẩu: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập mật khẩu"/>
                      </Form.Item>
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="mb-2">
                        Dịch vụ sử dụng:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập dịch vụ sử dụng"/>
                      </Form.Item>
                    </div>
                    <div className="col-4 mb-5 pb-1 text-right">
                      <span style={{ color: "#FF7506" }}>*</span> <small>Là trường hợp
                      thông tin bắt buộc</small>
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
                    style={{ background: "#FFF2E7", color: "#FF9138", height: 38, width: 115}}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="link"
                    style={{ background: "#FF9138", color: "white", height: 38, width: 115}}
                    className="mx-3 pt-2 me-5"
                    href="/device"
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
