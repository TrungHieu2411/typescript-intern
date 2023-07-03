import React from "react";
import {
  Badge,
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
import { BellFilled, SearchOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";

import SlideMain from "../../containers/SlideMain";
import BreadCrumbTwo from "../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../components/User/Account";
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

const data = [
  {
    id: 2010001,
    nameCustomer: "Lê Huỳnh Ái Vân",
    nameService: "Khám tổng quát",
    time: "14:35 - 07/11/2021",
    deadTime: "14:35 - 07/11/2021",
    status: "Đã bỏ qua",
    service: "Kiosk",
    ct: "Chi tiết",
  },
  {
    id: 2010002,
    nameCustomer: "Nguyễn Văn A",
    nameService: "Chụp X-quang",
    time: "09:15 - 15/11/2021",
    deadTime: "09:15 - 15/11/2021",
    status: "Đã sử dụng",
    service: "Hệ thống",
    ct: "Chi tiết",
  },
  {
    id: 2010003,
    nameCustomer: "Trần Thị B",
    nameService: "Siêu âm tim",
    time: "10:30 - 20/11/2021",
    deadTime: "10:30 - 20/11/2021",
    status: "Đang chờ",
    service: "Kiosk",
    ct: "Chi tiết",
  },
  {
    id: 2010004,
    nameCustomer: "Phạm Văn C",
    nameService: "Điều trị cận thị",
    time: "13:45 - 25/11/2021",
    deadTime: "13:45 - 25/11/2021",
    status: "Đang chờ",
    service: "Kiosk",
    ct: "Chi tiết",
  },
  {
    id: 2010005,
    nameCustomer: "Nguyễn Thị D",
    nameService: "Phẫu thuật thẩm mỹ",
    time: "16:20 - 30/11/2021",
    deadTime: "16:20 - 30/11/2021",
    status: "Đã sử dụng",
    service: "Hệ thống",
    ct: "Chi tiết",
  },
];
const renderStatus = (status: string) => {
  let color = "";
  let text = "";

  if (status === "Đã bỏ qua") {
    color = "#FF0000"; // Đỏ
    text = "Đã bỏ qua";
  } else if (status === "Đang chờ") {
    color = "#FFA500"; // Cam
    text = "Đang chờ";
  } else if (status === "Đã sử dụng") {
    color = "#008000"; // Xanh lá cây
    text = "Đã sử dụng";
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
                <BreadCrumbTwo text="Cấp số" text2="Danh sách cấp số" />
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
                  <Account
                    link="/admin"
                    img="./assets/image/logo.jpg"
                    hello="Xin chào"
                    name="Thạch Lê Trung Hiếu"
                  />
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
                    <Select size="large" defaultValue="all" style={{ width: 170 }}>
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
                    <Select size="large" defaultValue="all" style={{ width: 170 }}>
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
                    <Select size="large" defaultValue="all" style={{ width: 170 }}>
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
                  <div className="col">
                    <DatePicker size="large" style={{ width: 130 }} />
                    <img
                      style={{ width: 15 }}
                      src="../assets/image/arrow-right.png"
                      alt=""
                    />
                    <DatePicker size="large" style={{ width: 130 }} />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="row" style={{ width: 200 }}>
                  <div className="col-12">
                    <label htmlFor="">Từ khóa</label>
                  </div>
                  <div className="col-12">
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
                  rowClassName={() => "table-row"}
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
                    dataIndex="nameCustomer"
                    key="nameCustomer"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Tên dịch vụ</span>}
                    dataIndex="nameService"
                    key="nameService"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Thời gian cấp</span>}
                    dataIndex="time"
                    key="time"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Hạn sử dụng</span>}
                    dataIndex="deadTime"
                    key="deadTime"
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
                    <img src="../assets/image/add-square.png" alt="" />
                    <p className="fw-bold" style={{ fontSize: 10 }}>
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
