import React from "react";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Layout,
  Popover,
} from "antd";
import Icon, {
  BellFilled,
  BellOutlined,
  CameraOutlined,
} from "@ant-design/icons";

import "./css/style.css";
import SlideMain from "../containers/SlideMain";
const { Content } = Layout;

const popoverContent = (
  <Card title="Thông báo" className="p-0 m-0" bordered={false} style={{width: 270}}>
    
  </Card>
);

function Admin() {
  return (
    <Layout className="layout">
      <SlideMain/>
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col">
                <p className="fs-5" style={{ color: "#FF7506" }}>
                  Thông tin đăng nhập
                </p>
              </div>
              <div className="col-auto">
                <span className="d-flex align-items-center justify-content-center me-5">
                <Button style={{background: "#FFF2E7"}} type="ghost" shape="circle" className="mb-5 ">
                    <Popover placement="bottomLeft" content={popoverContent} trigger="click">
                      <BellFilled style={{ color: "#FF7506" }} className="fs-5 d-flex align-items-center justify-content-center" />
                    </Popover>
                  </Button>
                  <img
                  className="mb-5 "
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 10,
                      borderRadius: "50%",
                    }}
                    src="./assets/image/logo.jpg"
                    alt=""
                  />

                  <span className="ms-2 mb-5 me-4">
                    <p className="mb-0">Xin chào</p>
                    <p className="mb-0 fw-bold">Thạch Lê Trung Hiếu</p>
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-5 mx-5 pt-5">
              <Card className="mx-5">
                <div className="row">
                  <div className="col-4">
                    <div className="row text-center">
                      <div className="col-12" style={{ position: "relative" }}>
                        <Image
                          src="./assets/image/logo.jpg"
                          className="h-75"
                          preview={false}
                          style={{ borderRadius: "50%" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            right: "90px",
                            transform: "translate(50%, 50%)",
                          }}
                        >
                          <Button
                            style={{ background: "#FF7506", color: "white" }}
                            shape="circle"
                            icon={
                              <CameraOutlined className="d-flex align-items-center fs-5" />
                            }
                          />
                        </div>
                      </div>
                      <div className="col mt-4">
                        <h4>Thạch Lê Trung Hiếu</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-8 mt-5">
                    <Form disabled>
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Tên người dùng:
                          </label>
                          <Form.Item className="">
                            <Input />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Tên đăng nhập:
                          </label>
                          <Form.Item className="">
                            <Input />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Số điện thoại:
                          </label>
                          <Form.Item className="">
                            <Input />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Mật khẩu:
                          </label>
                          <Form.Item className="">
                            <Input />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Email:
                          </label>
                          <Form.Item className="">
                            <Input />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Vai trò:
                          </label>
                          <Form.Item className="">
                            <Input />
                          </Form.Item>
                        </div>
                      </div>
                    </Form>
                  </div>
                  <div className="col-4"></div>
                </div>
              </Card>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
