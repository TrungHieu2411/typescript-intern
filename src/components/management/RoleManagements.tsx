import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Input,
  Layout,
  Popover,
  Space,
  Table,
} from "antd";
import { BellFilled, SearchOutlined } from "@ant-design/icons";

import "../css/style.css";
import SlideMain from "../../containers/SlideMain";
import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";
const { Content } = Layout;

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);
const data = [
  {
    id: "1",
    name: "Quản trị viên",
    ipAddress: "10",
    cn: "Cập nhật",
  },
  {
    id: "2",
    name: "Người dùng thông thường",
    ipAddress: "25",
    cn: "Cập nhật",
  },
  {
    id: "3",
    name: "Quản lý nội dung",
    ipAddress: "8",
    cn: "Cập nhật",
  },
];

function RoleManagement() {
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <Breadcrumb className="fs-6" separator=">">
                  <Breadcrumb.Item>Cài đặt hệ thống</Breadcrumb.Item>
                  <Breadcrumb.Item className="fw-bold custom-color">
                    Quản lý vai trò
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
              <h4 style={{ color: "#FF7506" }}>Danh sách vai trò</h4>
            </div>
            <div className="col-3 offset-9">
              <div className="row" style={{ width: 220 }}>
                <div className="col-12">
                  <label htmlFor="">Từ khóa</label>
                </div>
                <div className="col-12">
                  <Input
                    placeholder="Nhập từ khóa"
                    suffix={
                      <Space>
                        <SearchOutlined
                          className="d-flex align-items-center justify-content-center"
                          style={{ color: "#1890ff" }}
                        />
                      </Space>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-11 mt-3">
                <Table
                  dataSource={data}
                  pagination={false}
                  bordered
                  className="mb-3"
                >
                  <Column
                    title={<span className="table-title">Tên vai trò</span>}
                    dataIndex="id"
                    key="id"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Số người dùng</span>}
                    dataIndex="name"
                    key="name"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Mô tả</span>}
                    dataIndex="ipAddress"
                    key="ipAddress"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title=""
                    dataIndex="cn"
                    key="cn"
                    render={(text: string) => (
                      <Link to={"/editDevice"}>{text}</Link>
                    )}
                  />
                </Table>
              </div>
              <div className="col-1 mt-3">
                <Link to={"/addRoleManagement"}>
                  <Card className="fixed-card text-center">
                    <img src="./assets/image/add-square.png" alt="" />
                    <p className="fw-bold" style={{ fontSize: 12 }}>
                      Thêm vai trò
                    </p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default RoleManagement;
