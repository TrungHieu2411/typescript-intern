import React from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Input,
  Layout,
  Pagination,
  Popover,
  Select,
  Space,
  Table,
} from "antd";
import Icon, {
  BellFilled,
  PlusSquareOutlined,
  SearchOutlined,
} from "@ant-design/icons";

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
    id: 1,
    name: "Thiết bị A",
    ipAddress: "192.168.1.1",
    isActive: true,
    isConnected: true,
    service: "Dịch vụ X",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 2,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: false,
    isConnected: false,
    service: "Dịch vụ Y",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 2,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: false,
    isConnected: false,
    service: "Dịch vụ Y",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 2,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: false,
    isConnected: false,
    service: "Dịch vụ Y",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 2,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: false,
    isConnected: false,
    service: "Dịch vụ Y",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 2,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: false,
    isConnected: false,
    service: "Dịch vụ Y",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  
  // ...Thêm dữ liệu của các thiết bị khác
];

function ListDevices() {
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
                  <Breadcrumb.Item className="fw-bold custom-color">
                    Danh sách thiết bị
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
              <h4 style={{ color: "#FF7506" }}>Danh sách thiết bị</h4>
            </div>
            <div className="row mt-3 justify-content-center">
              <div className="col-3">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Trạng thái hoạt động</label>
                  </div>
                  <div className="col-12">
                    <Select defaultValue="all" style={{ width: 280 }}>
                      <Select.Option value="all">Tất cả</Select.Option>
                      <Select.Option value="active">Hoạt động</Select.Option>
                      <Select.Option value="inactive">
                        Ngưng hoạt động
                      </Select.Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col-5 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Trạng thái kết nối</label>
                  </div>
                  <div className="col-12">
                    <Select defaultValue="all" style={{ width: 280 }}>
                      <Select.Option value="all">Tất cả</Select.Option>
                      <Select.Option value="connected">Kết nối</Select.Option>
                      <Select.Option value="disconnected">
                        Mất kết nối
                      </Select.Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Từ khóa</label>
                  </div>
                  <div className="col-12">
                    <Input
                      style={{ width: 280 }}
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
            </div>
            <div className="row">
              <div className="col-11 mt-3">
                <Table dataSource={data} pagination={false} bordered className="mb-3">
                  <Column
                    title={<span className="table-title">Mã thiết bị</span>}
                    dataIndex="id"
                    key="id"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Tên thiết bị</span>}
                    dataIndex="name"
                    key="name"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Địa chỉ IP</span>}
                    dataIndex="ipAddress"
                    key="ipAddress"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={
                      <span className="table-title">Trạng thái hoạt động</span>
                    }
                    dataIndex="isActive"
                    key="isActive"
                    render={(isActive: boolean) => (
                      <Badge
                        color="#4277FF"
                        text={isActive ? "Hoạt động" : "Ngừng hoạt động"}
                      />
                    )}
                  />
                  <Column
                    title={
                      <span className="table-title">Trạng thái kết nối</span>
                    }
                    dataIndex="isConnected"
                    key="isConnected"
                    render={(isConnected: boolean) => (
                      <Badge
                        color="#4277FF"
                        text={isConnected ? "Hoạt động" : "Ngừng hoạt động"}
                      />
                    )}
                  />
                  <Column
                    title={<span className="table-title">Dịch vụ sử dụng</span>}
                    dataIndex="service"
                    key="service"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title=""
                    dataIndex="ct"
                    key="ct"
                    render={(text: string) => <Link to={"/detailDevice"}>{text}</Link>}
                  />
                  <Column
                    title=""
                    dataIndex="cn"
                    key="cn"
                    render={(text: string) => <Link to={"/editDevice"}>{text}</Link>}
                  />
                </Table>
                <Pagination
                    total={100}
                    showSizeChanger={false}
                    style={{ textAlign: "right" }}
                  />
               
              </div>
              <div className="col-1 mt-3">
                <Link to={"/addDevice"}>
                  <Card className="fixed-card text-center">
                    <PlusSquareOutlined className="fs-4" />
                    <p className="fw-bold" style={{fontSize: 12}}>Thêm thiết bị</p>
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

export default ListDevices;
