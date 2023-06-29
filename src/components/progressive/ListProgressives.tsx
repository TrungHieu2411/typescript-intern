import React, { useState } from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  DatePicker,
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
      name: "Khách hàng 1",
      ipAddress: "Dịch vụ 1",
      isActive: "Thời gian cấp 1",
      status: "Đã bỏ qua",
      service: "Nguồn cấp 1",
      ct: "Chi tiết",
    },
    {
      id: 2,
      name: "Khách hàng 2",
      ipAddress: "Dịch vụ 2",
      isActive: "Thời gian cấp 2",
      status: "Đang chờ",
      service: "Nguồn cấp 2",
      ct: "Chi tiết",
    },
    {
      id: 3,
      name: "Khách hàng 3",
      ipAddress: "Dịch vụ 3",
      isActive: "Thời gian cấp 3",
      status: "Đã sử dụng",
      service: "Nguồn cấp 3",
      ct: "Chi tiết",
    },
  ];

  const renderStatus = (status: string) => {
    let color = '';
    let text = '';

    if (status === "Đã bỏ qua") {
      color = '#FF0000'; // Đỏ
      text = 'Đã bỏ qua';
    } else if (status === "Đang chờ") {
      color = '#FFA500'; // Cam
      text = 'Đang chờ';
    } else if (status === "Đã sử dụng") {
      color = '#008000'; // Xanh lá cây
      text = 'Đã sử dụng';
    }

    return <Badge color={color} text={text} />;
  };

function ListProgressives() {
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
                  <Breadcrumb.Item className="fw-bold custom-color">
                    Danh sách cấp số
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
            <div className="row mt-3 justify-content-center">
              <div className="col-2">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Tên dịch vụ</label>
                  </div>
                  <div className="col-12">
                    <Select defaultValue="all" style={{ width: 170 }}>
                      <Select.Option value="all">Tất cả</Select.Option>
                      <Select.Option value="active">
                        Khám sản - Phụ khoa
                      </Select.Option>
                      <Select.Option value="inactive">
                        Khám răng hàm mặt
                      </Select.Option>
                      <Select.Option value="inactive">
                        Khám tai mũi họng
                      </Select.Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col-2 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Tình trạng</label>
                  </div>
                  <div className="col-12">
                    <Select defaultValue="all" style={{ width: 170 }}>
                      <Select.Option value="all">Tất cả</Select.Option>
                      <Select.Option value="connected">Đang chờ</Select.Option>
                      <Select.Option value="disconnected">
                        Đã sử dụng
                      </Select.Option>
                      <Select.Option value="disconnected">Bỏ qua</Select.Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col-2 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Nguồn cấp</label>
                  </div>
                  <div className="col-12">
                    <Select defaultValue="all" style={{ width: 170 }}>
                      <Select.Option value="all">Tất cả</Select.Option>
                      <Select.Option value="connected">Kiosk</Select.Option>
                      <Select.Option value="disconnected">
                        Hệ thống
                      </Select.Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Chọn thời gian</label>
                  </div>
                  <div className="col-12">
                    <DatePicker.RangePicker />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="row" style={{ width: 200 }}>
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
                    title={<span className="table-title">STT</span>}
                    dataIndex="id"
                    key="id"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Tên khách hàng</span>}
                    dataIndex="name"
                    key="name"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Tên dịch vụ</span>}
                    dataIndex="ipAddress"
                    key="ipAddress"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Thời gian cấp</span>}
                    dataIndex="isActive"
                    key="isActive"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Hạn sử dụng</span>}
                    dataIndex="isActive"
                    key="isActive"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Trạng thái</span>}
                    dataIndex="status"
                    key="status"
                    render={(status: string) => renderStatus(status)}
                  />
                  <Column
                    title={<span className="table-title">Nguồn cấp</span>}
                    dataIndex="service"
                    key="service"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title=""
                    dataIndex="ct"
                    key="ct"
                    render={(text: string) => (
                      <Link to={"/detailProgressive"}>{text}</Link>
                    )}
                  />
                </Table>
                <Pagination
                  total={100}
                  showSizeChanger={false}
                  style={{ textAlign: "right" }}
                />
              </div>
              <div className="col-1 mt-3">
                <Link to={"/addProgressive"}>
                  <Card className="fixed-card text-center">
                    <PlusSquareOutlined className="fs-4" />
                    <p className="fw-bold" style={{ fontSize: 12 }}>
                      Cấp số mới
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

export default ListProgressives;
