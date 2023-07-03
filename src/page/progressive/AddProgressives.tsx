import React from "react";
import {
  Button,
  Card,
  Form,
  Layout,
  Popover,
  Select,
} from "antd";
import { BellFilled } from "@ant-design/icons";

import SlideMain from "../../containers/SlideMain";
import Account from "../../components/User/Account";
import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";
import "../../assets/css/style.css";

const { Content } = Layout;

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
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
                <BreadCrumbThree text="Cấp số" text2=" Danh sách cấp số" href="roleManagement" text3="Cấp số mới" />
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
                  <Account link="/admin" img="../assets/image/logo.jpg" hello="Xin chào" name="Thạch Lê Trung Hiếu"/>
                </span>
              </div>
            </div>
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Quản lý cấp số</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140, height: 550 }}>
                <h3 className="text-center mb-4" style={{ color: "#FF9138" }}>
                  CẤP SỐ MỚI
                </h3>
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
