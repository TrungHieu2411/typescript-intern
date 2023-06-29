import React from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Layout,
  Pagination,
  Popover,
  Table,
} from "antd";
import {
  BellFilled,
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
      id: "1",
      name: "Dịch vụ A",
      ipAddress: "10/06/2023",
      isActive: true,
      service: "Nguồn A",
    },
    {
      id: "2",
      name: "Dịch vụ B",
      ipAddress: "15/08/2023",
      isActive: false,
      service: "Nguồn B",
    },
    {
      id: "3",
      name: "Dịch vụ C",
      ipAddress: "20/09/2023",
      isActive: true,
      service: "Nguồn C",
    },
    {
      id: "4",
      name: "Dịch vụ D",
      ipAddress: "25/10/2023",
      isActive: true,
      service: "Nguồn D",
    },
    {
      id: "5",
      name: "Dịch vụ E",
      ipAddress: "30/11/2023",
      isActive: false,
      service: "Nguồn E",
    },
  ];
  
function ListReport() {
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <Breadcrumb className="fs-6" separator=">">
                  <Breadcrumb.Item>Báo cáo</Breadcrumb.Item>
                  <Breadcrumb.Item className="fw-bold custom-color">
                    Lập báo cáo
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
            <div className="row mt-3 justify-content-center">
              <div className="col text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Chọn thời gian</label>
                  </div>
                  <div className="col-12">
                    <DatePicker.RangePicker />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-11 mt-3">
                <Table dataSource={data} pagination={false} bordered className="mb-3">
                  <Column
                    title={<span className="table-title">Số thứ tự</span>}
                    dataIndex="id"
                    key="id"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Tên dịch vụ</span>}
                    dataIndex="name"
                    key="name"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Thời gian cấp</span>}
                    dataIndex="ipAddress"
                    key="ipAddress"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={
                      <span className="table-title">Tình trạng</span>
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
                    title={<span className="table-title">Nguồn cấp</span>}
                    dataIndex="service"
                    key="service"
                    render={(text: string) => <span>{text}</span>}
                  />
                </Table>
                <Pagination
                    total={100}
                    showSizeChanger={false}
                    style={{ textAlign: "right" }}
                  />
              </div>
              <div className="col-1 mt-3">
                <Link to={"#"}>
                  <Card className="fixed-card text-center">
                    <img src="./assets/image/document-download.png" alt="" />
                    <p className="fw-bold" style={{fontSize: 12}}>Tải về</p>
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

export default ListReport;
