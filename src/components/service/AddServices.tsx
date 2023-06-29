import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  Popover,
  Select,
} from "antd";
import Icon, { BellFilled } from "@ant-design/icons";

import "../css/style.css";
import SlideMain from "../../containers/SlideMain";
import TextArea from "antd/es/input/TextArea";
const { Content } = Layout;

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);

function AddServices() {
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <Breadcrumb className="fs-6" separator=">">
                  <Breadcrumb.Item>Dịch vụ</Breadcrumb.Item>
                  <Breadcrumb.Item
                    className="text-decoration-none"
                    href="/service"
                  >
                    Danh sách dịch vụ
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="fw-bold custom-color">
                    Thêm dịch vụ
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
              <h4 style={{ color: "#FF7506" }}>Quản lý dịch vụ</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140 }}>
                <h6 style={{ color: "#FF7506" }}>Thông tin dịch vụ</h6>
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Mã dịch vụ:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input placeholder="203" />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tên dịch vụ:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input placeholder="Khám tim mạch" />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Mô tả: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item className="">
                        <TextArea
                          rows={5}
                          placeholder="Mô tả dịch vụ"
                          maxLength={6}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
                <h6 style={{ color: "#FF7506" }}>Quy tắc cấp số</h6>
                <table>
                  <tr>
                    <td>
                      <Checkbox className="blue-checkbox" id="tangTuDong">Tăng tự động</Checkbox>
                    </td>
                    <td>
                      <Input value="0001" className="mb-2" style={{width: 58, height: 40}}/>
                    </td>
                    <td>
                        <p className="mx-2 mb-2">đến</p>
                    </td>
                    <td>
                      <Input value="0009" className="mb-2" style={{width: 58, height: 40}}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Checkbox className="blue-checkbox" id="prefix">Prefix</Checkbox>
                    </td>
                    <td>
                      <Input value="0001" className="mb-2" style={{width: 58, height: 40}}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Checkbox className="blue-checkbox" id="suffix">Suffix</Checkbox>
                    </td>
                    <td>
                      <Input value="0001" className="mb-2" style={{width: 58, height: 40}}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Checkbox className="blue-checkbox" id="resetMoiNgay">Reset mỗi ngày</Checkbox>
                    </td>
                  </tr>
                </table>
              <div className="mt-4 text-right">
                      <span style={{ color: "#FF7506" }}>*</span>{" "}
                      <small>Là trường hợp thông tin bắt buộc</small>
                    </div>
              </Card>
              <div className="col-6 text-center offset-3 mt-3">
                <Form.Item>
                  <Button
                    danger
                    htmlType="submit"
                    href="/service"
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
                    href="/service"
                  >
                    Thêm dịch vụ
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

export default AddServices;
