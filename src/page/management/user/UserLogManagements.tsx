import React from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Layout,
  Pagination,
  Popover,
  Row,
  Space,
  Table,
} from "antd";
import { BellFilled, SearchOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";

import SlideMain from "../../../containers/SlideMain";
import BreadCrumbTwo from "../../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../../components/User/Account";
import "../../../assets/css/style.css";

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

function UserLogManagements() {
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbTwo text="Cài đặt hệ thống" text2="Nhật ký hoạt động" />
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
            <Row justify="space-between" className="mt-5">
              <Col lg={8} md={12}>
                <Row style={{ width: 325 }}>
                  <label htmlFor="">Chọn thời gian</label>
                  <Col span={24} className="d-flex align-items-center">
                    <DatePicker size="large" style={{ width: 130 }} />
                    <img
                      style={{ width: 15}}
                      src="./assets/image/arrow-right.png"
                      alt=""
                    />
                    <DatePicker size="large" style={{ width: 130 }} />
                  </Col>
                </Row>
              </Col>
              <Col lg={8} md={12}>
                <Row style={{ width: 275 }} className="ms-3">
                  <label htmlFor="">Từ khóa</label>
                  <Col span={24}>
                    <Input size="large"
                      placeholder="Nhập từ khóa"
                      suffix={
                        <Space>
                          <SearchOutlined
                            className="d-flex align-items-center justify-content-center"
                            style={{ color: "#FF7506" }}
                          />
                        </Space>
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="row mt-3">
              <div className="col-11">
                <Table
                  dataSource={data}
                  pagination={false}
                  bordered
                  className="mb-3"
                >
                  <Column
                    title={<span className="table-title">Tên đăng nhập</span>}
                    dataIndex="id"
                    key="id"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={
                      <span className="table-title">Thời gian tác động</span>
                    }
                    dataIndex="name"
                    key="name"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">IP thực hiện</span>}
                    dataIndex="ipAddress"
                    key="ipAddress"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={
                      <span className="table-title">Thao tác thực hiện</span>
                    }
                    dataIndex="cn"
                    key="cn"
                    render={(text: string) => <span>{text}</span>}
                  />
                </Table>
                <Pagination
                  total={100}
                  showSizeChanger={false}
                  style={{ textAlign: "right" }}
                />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default UserLogManagements;
