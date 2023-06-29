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
import Icon, { BellFilled } from "@ant-design/icons";

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

const content = (
  <div>
    <p>Số 1: 100</p>
    <p>Số 2: 200</p>
    <p>Số 3: 300</p>
  </div>
);

function AddProgressives() {
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <Breadcrumb className="fs-6" separator=">">
                  <Breadcrumb.Item>Cấp số</Breadcrumb.Item>
                  <Breadcrumb.Item
                    className="text-decoration-none"
                    href="/device"
                  >
                    Danh sách cấp số
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="fw-bold custom-color">
                    Cấp số mới
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
              <h4 style={{ color: "#FF7506" }}>Quản lý cấp số</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1180, height: 545 }}>
                <h4 className="text-center" style={{ color: "#FF9138" }}>
                  CẤP SỐ MỚI
                </h4>
                <p className="text-center fw-bold">
                  Dịch vụ khách hàng lựa chọn
                </p>
                <p className="text-center">
                  <Form>
                    <Form.Item>
                      <Select
                        defaultValue="all"
                        style={{ width: 300 }}
                        className="text-start"
                      >
                        <Select.Option value="all">Chọn dịch vụ</Select.Option>
                        <Select.Option value="connected">
                          Khám tim mạch
                        </Select.Option>
                        <Select.Option value="disconnected">
                          Khám sản - Phụ khoa
                        </Select.Option>
                        <Select.Option value="disconnected">
                          Khám răng hàm mặt
                        </Select.Option>
                        <Select.Option value="disconnected">
                          Khám tai mũi họng
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <div className="col-6 text-center offset-3 mt-5">
                      <Form.Item>
                        <Button
                          danger
                          htmlType="submit"
                          href="/progressive"
                          className="mx-3 pt-2 mt-4"
                          style={{
                            background: "#FFF2E7",
                            color: "#FF9138",
                            height: 38,
                            width: 115,
                          }}
                        >
                          Hủy bỏ
                        </Button>
                        <Popover content={content} title="Số">
                          <Button
                            type="link"
                            style={{
                              background: "#FF9138",
                              color: "white",
                              height: 38,
                              width: 115,
                            }}
                            className="mx-3 pt-2 mt-4 me-3"
                          >
                            In số
                          </Button>
                        </Popover>
                      </Form.Item>
                    </div>
                  </Form>
                </p>
              </Card>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AddProgressives;
