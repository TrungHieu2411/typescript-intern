import React from "react";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Layout,
  Pagination,
  Popover,
  Table,
} from "antd";
import { BellFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

import SlideMain from "../../containers/SlideMain";
import BreadCrumbTwo from "../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../components/User/Account";
import "../../assets/css/style.css";

const { Content } = Layout;
const { Column } = Table;

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
    id: "2010001",
    nameService: "Khám tim mạch",
    time: "07:20 - 10/06/2023",
    status: "Đang chờ",
    service: "Kiosk",
  },
  {
    id: "2010001",
    nameService: "Khám tim mạch",
    time: "07:20 - 10/06/2023",
    status: "Đang chờ",
    service: "Kiosk",
  },
  {
    id: "2010001",
    nameService: "Khám tim mạch",
    time: "07:20 - 10/06/2023",
    status: "Đang chờ",
    service: "Kiosk",
  },
  {
    id: "2010001",
    nameService: "Khám tim mạch",
    time: "07:20 - 10/06/2023",
    status: "Đang chờ",
    service: "Kiosk",
  },
  {
    id: "2010001",
    nameService: "Khám tim mạch",
    time: "07:20 - 10/06/2023",
    status: "Đang chờ",
    service: "Kiosk",
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
function ListReport() {
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbTwo text="Báo cáo" text2="Lập báo cáo" />
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
            <div className="row mt-5 justify-content-center">
              <div className="col text-start">
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
                    title={<span className="table-title">Số thứ tự</span>}
                    dataIndex="id"
                    key="id"
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
                    <img src="../assets/image/document-download.png" alt="" />
                    <p className="fw-bold" style={{ fontSize: 10 }}>
                      Tải về
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

export default ListReport;
