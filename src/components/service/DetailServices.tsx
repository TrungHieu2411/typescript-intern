import React from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Layout,
  Pagination,
  Popover,
  Select,
  Space,
  Table,
} from "antd";
import {
  BellFilled,
  SearchOutlined,
} from "@ant-design/icons";

import "../css/style.css";
import SlideMain from "../../containers/SlideMain";
import { Link } from "react-router-dom";
import Column from "antd/es/table/Column";
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
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 2,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isAbsent: true,
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 3,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: true,
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 4,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: false,
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 5,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isAbsent: false,
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 6,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: false,
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 7,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isAbsent: true,
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 8,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: true,

    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  // ...Thêm dữ liệu của các thiết bị khác
];

function DetailServices() {
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
                    Chi tiết
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
            <div className="row mt-3">
              <div className="col-4 mt-3">
                <Card style={{ height: 530 }}>
                  <h6 style={{ color: "#FF7506" }}>Thông tin dịch vụ</h6>
                  <Form className="mt-3">
                    <table>
                      <tr>
                        <td>
                          <label htmlFor="" className="mb-2 me-2">
                            Mã dịch vụ:
                          </label>
                        </td>
                        <td>
                          <label className="mb-2">
                            <small>202</small>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="" className="mb-2">
                            Tên dịch vụ:
                          </label>
                        </td>
                        <td>
                          <label className="mb-2">
                            <small>Khám tim mạch</small>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="" className="mb-2">
                            Mô tả:
                          </label>
                        </td>
                        <td>
                          <label className="mb-2">
                            <small>Chuyên các bệnh lý về tim</small>
                          </label>
                        </td>
                      </tr>
                    </table>
                  </Form>
                  <h6 style={{ color: "#FF7506" }}>Quy tắc cấp số</h6>
                  <table>
                    <tr>
                      <td>
                        <label id="tangTuDong">Tăng tự động</label>
                      </td>
                      <td>
                        <Input
                          value="0001"
                          className="mb-2"
                          style={{ width: 58, height: 40 }}
                        />
                      </td>
                      <td>
                        <p className="mx-2 mb-2">đến</p>
                      </td>
                      <td>
                        <Input
                          value="0009"
                          className="mb-2"
                          style={{ width: 58, height: 40 }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label id="prefix">Prefix</label>
                      </td>
                      <td>
                        <Input
                          value="0001"
                          className="mb-2"
                          style={{ width: 58, height: 40 }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label id="resetMoiNgay">Reset mỗi ngày</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="">
                          <small>Ví dụ: 201-2001</small>
                        </label>
                      </td>
                    </tr>
                  </table>
                </Card>
              </div>
              <div className="col-7 mt-3">
                <Card style={{ height: 530 }}>
                  <div className="row">
                    <div className="col-3">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="">Trạng thái</label>
                        </div>
                        <div className="col-12">
                          <Select defaultValue="all" style={{ width: 140 }}>
                            <Select.Option value="all">Tất cả</Select.Option>
                            <Select.Option value="active">
                              Hoạt động
                            </Select.Option>
                            <Select.Option value="inactive">
                              Ngưng hoạt động
                            </Select.Option>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="col-5 ">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="">Chọn thời gian</label>
                        </div>
                        <div className="col-6">
                          <DatePicker />
                        </div>
                        <div className="col-6">
                          <DatePicker />
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row">
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
                  <div className="row mt-3">
                    <Table
                      dataSource={data}
                      pagination={false}
                      size="small"
                      className="custom-table mb-4 pb-3"
                    >
                      <Column
                        title={<span className="table-title">Số thứ tự</span>}
                        dataIndex="id"
                        key="id"
                        render={(text: string) => <span>{text}</span>}
                      />
                      <Column
                        title={<span className="table-title">Trạng thái</span>}
                        dataIndex="isActive"
                        key="isActive"
                        render={(isActive: boolean, record: any) => (
                          <Badge
                            color={record.isAbsent ? "#FF6A6A" : "#4277FF"}
                            text={
                              record.isAbsent
                                ? "Vắng"
                                : isActive
                                ? "Đã hoàn thành"
                                : "Đang thực hiện"
                            }
                          />
                        )}
                      />
                    </Table>
                  </div>
                  <Pagination
                    total={100}
                    showSizeChanger={false}
                    style={{ textAlign: "right" }}
                  />
                </Card>
              </div>
              <div className="col-1 mt-3">
                <Card className="fixed-card-service text-center">
                  <Link
                    to={"/addService"}
                    className="text-decoration-none"
                    style={{ color: "#FF7506" }}
                  >
                    <img src="./assets/image/edit-square.png" alt="" />
                    <p className=" fw-bold" style={{ fontSize: 9 }}>
                      Cập nhật danh sách
                    </p>
                  </Link>
                  <Divider className="px-4" />
                  <Link
                    to={"/service"}
                    className="text-decoration-none"
                    style={{ color: "#FF7506" }}
                  >
                    <img src="./assets/image/back-square.png" alt="" />
                    <p className="fw-bold" style={{ fontSize: 9 }}>
                      Quay lại
                    </p>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DetailServices;
