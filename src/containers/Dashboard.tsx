import React from "react";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Layout,
  Progress,
  Select,
  Statistic,
  Tag,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

import SlideMain from "../containers/SlideMain";
import BreadCrumbOne from "../components/BreadCrumb/BreadCrumbOne";
import Account from "../components/User/Account";
import "../assets/css/style.css";
import { Area } from "@ant-design/charts";

// Sử dụng WaveChart trong component của bạn

const { Content } = Layout;

const data = [
  { day: "1", "Cấp số": 2500 },
  { day: "2", "Cấp số": 3500 },
  { day: "3", "Cấp số": 2000 },
  { day: "4", "Cấp số": 3000 },
  { day: "5", "Cấp số": 3500 },
  { day: "6", "Cấp số": 2500 },
  { day: "7", "Cấp số": 4500 },
  { day: "8", "Cấp số": 3500 },
  { day: "9", "Cấp số": 5500 },
  { day: "10", "Cấp số": 5000 },
  { day: "11", "Cấp số": 6000 },
  { day: "12", "Cấp số": 3500 },
];

const config = {
  data: data,
  autoFit: false,
  xField: "day",
  yField: "Cấp số",
  animation: {
    appear: {
      animation: "path-in",
      duration: 3000,
    },
  },
  xAxis: {
    range: [0, 1],
  },
  smooth: true,
  areaStyle: () => {
    return {
      fill: "l(270) 0:#ffffff 0.5:#6e92f6 1:#0a4bff",
    };
  },
};
function Dashboard() {
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col">
                <BreadCrumbOne text="Dashboard" />
              </div>
            </div>
            <div className="pt-3 ">
              <h4 style={{ color: "#FF7506" }}>Biểu đồ cấp số </h4>
              <div className="row row-cols-4 mt-4">
                <div className="col">
                  <Card className="shadow" style={{ width: 170, height: 130 }}>
                    <div className="row align-items-center">
                      <div className="col-4 p-0">
                        <Button
                          style={{ width: 45, height: 45, color: "#6695FB", background: "#00F5FF"}}
                          className="sttdacap"
                          shape="circle"
                          icon={
                            <img
                              src="../assets/image/icon-dasboard03.png"
                              alt=""
                            />
                          }
                        />
                      </div>
                      <div className="col-6 ps-2">
                        <span style={{ fontSize: 12 }} className="">
                          Số thứ tự đã cấp
                        </span>
                      </div>

                      <div className="col-6 p-0 my-3 pt-1 text-start">
                        <h4 style={{ fontSize: 25 }}>3.452</h4>
                      </div>
                      <div className="col-6 ps-4 my-3 text-end">
                        <Tag
                          style={{ background: "#FF950126", borderRadius: 30 }}
                        >
                          <Statistic
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#FF9138", fontSize: 7 }}
                            prefix={<ArrowUpOutlined style={{ fontSize: 7 }} />}
                            suffix="%"
                          />
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col">
                  <Card className="shadow" style={{ width: 170, height: 130 }}>
                    <div className="row align-items-center">
                      <div className="col-4 p-0">
                        <Button
                          style={{ width: 45, height: 45, color: "#35C75A", background: "#FAF0E6" }}
                          shape="circle"
                          icon={
                            <img
                              src="../assets/image/icon-dasboard02.png"
                              alt=""
                            />
                          }
                        />
                      </div>
                      <div className="col-6 ps-2 p-0">
                        <span style={{ fontSize: 12 }} className="">
                          Số thứ tự đã sử dụng
                        </span>
                      </div>

                      <div className="col-6 p-0 my-3 pt-1 text-start">
                        <h4 style={{ fontSize: 25 }}>3.452</h4>
                      </div>
                      <div className="col-6 ps-4 my-3 text-end">
                        <Tag
                          style={{ background: "#FF950126", borderRadius: 30 }}
                        >
                          <Statistic
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#FF9138", fontSize: 7 }}
                            prefix={
                              <ArrowDownOutlined style={{ fontSize: 7 }} />
                            }
                            suffix="%"
                          />
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col">
                  <Card className="shadow" style={{ width: 170, height: 130 }}>
                    <div className="row align-items-center">
                      <div className="col-4 p-0">
                        <Button
                          style={{ width: 45, height: 45, color: "#FFAC6A", background: "#EEEED1" }}
                          shape="circle"
                          icon={
                            <img
                              src="../assets/image/icon-dasboard05.png"
                              alt=""
                            />
                          }
                        />
                      </div>
                      <div className="col-6 ps-2 p-0">
                        <span style={{ fontSize: 12 }} className="">
                          Số thứ tự đang chờ
                        </span>
                      </div>

                      <div className="col-6 p-0 my-3 pt-1 text-start">
                        <h4 style={{ fontSize: 25 }}>3.452</h4>
                      </div>
                      <div className="col-6 ps-4 my-3 text-end">
                        <Tag
                          style={{ background: "#FF950126", borderRadius: 30 }}
                        >
                          <Statistic
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#FF9138", fontSize: 7 }}
                            prefix={<ArrowUpOutlined style={{ fontSize: 7 }} />}
                            suffix="%"
                          />
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col">
                  <Card className="shadow" style={{ width: 170, height: 130 }}>
                    <div className="row align-items-center">
                      <div className="col-4 p-0">
                        <Button
                          style={{ width: 45, height: 45, color: "#F86D6D", background: "#FFFFE0" }}
                          shape="circle"
                          icon={
                            <img
                              src="../assets/image/icon-dasboard07.png"
                              alt=""
                            />
                          }
                        />
                      </div>
                      <div className="col-6 ps-2 p-0">
                        <span style={{ fontSize: 12 }} className="">
                          Số thứ tự đã bỏ qua
                        </span>
                      </div>

                      <div className="col-6 p-0 my-3 pt-1 text-start">
                        <h4 style={{ fontSize: 25 }}>3.452</h4>
                      </div>
                      <div className="col-6 ps-4 my-3 text-end">
                        <Tag
                          style={{ background: "#FF950126", borderRadius: 30 }}
                        >
                          <Statistic
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#FF9138", fontSize: 7 }}
                            prefix={
                              <ArrowDownOutlined style={{ fontSize: 7 }} />
                            }
                            suffix="%"
                          />
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-12 mt-4">
                  <Card
                    className="shadow card-container"
                    style={{ width: 770, height: 445 }}
                  >
                    <div className="row">
                      <div className="col">
                        <h4>Bảng thống kê theo tháng</h4>
                        <p>Năm 2023</p>
                      </div>
                      <div className="col text-end">
                        <p>
                          Xem theo{" "}
                          <Select style={{ width: 85 }}>
                            {["Ngày", "Tháng", "Năm"].map((option) => (
                              <Select.Option key={option}>
                                {option}
                              </Select.Option>
                            ))}
                          </Select>
                        </p>
                      </div>
                    </div>
                    {/* ...Nội dung Card... */}
                    <Area {...config} />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Sider width={410} theme="light">
          <div className="row mt-2">
            <div className="col-12">
              <span className="d-flex align-items-center justify-content-center">
                <Account />
              </span>
            </div>
            <div className="col mt-3  pb-2 ms-3">
              <h4 style={{ color: "#FF7506" }}>Tổng quan</h4>
            </div>
            <div className="col-12">
              <Card
                className="shadow mx-3 d-flex align-items-center justify-content-center"
                style={{ height: 80 }}
              >
                <div className="row">
                  <div className="col-3">
                    <div className="progress-container">
                      <div className="outer-progress">
                        <Progress type="circle" strokeColor={"#FF7506"} size={60} percent={90} />
                        <div className="inner-progress">
                          <Progress
                            type="circle"
                            strokeColor={"#7E7D88"}
                            size={50}
                            percent={5}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 p-0">
                    <div className="row ">
                      <div className="col-12 p-0">
                        <h4
                          className="ms-3 me-2 mt-1 fw-bold"
                          style={{ fontSize: 20 }}
                        >
                          4.221
                        </h4>
                      </div>
                      <div className="col-12 p-0">
                        <span
                          style={{ fontSize: 12, color: "#FF7506" }}
                          className="me-4 pe-2 d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="pe-1"
                            src="../assets/image/monitor.png"
                            alt=""
                          />
                          Thiết bị
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 p-0">
                    <div className="row">
                      <div className="col-9 my-1 p-0">
                        <Badge color="#FFD130" text="Đang hoạt động" />{" "}
                      </div>
                      <div className="col-3 my-1">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          276
                        </span>
                      </div>
                      <div className="col-9 p-0">
                        <Badge color="#7E7D88" text="Ngưng hoạt động" />{" "}
                      </div>
                      <div className="col-3">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          4.221
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-12 my-2">
              <Card
                className="shadow mx-3 d-flex align-items-center"
                style={{ height: 80 }}
              >
                <div className="row">
                  <div className="col-3">
                    <div className="progress-container">
                      <div className="outer-progress">
                        <Progress type="circle" strokeColor={"#4277FF"} size={60} percent={76} />
                        <div className="inner-progress">
                          <Progress
                            type="circle"
                            strokeColor={"#7E7D88"}
                            size={50}
                            percent={20}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 p-0">
                    <div className="row">
                      <div className="col-12 p-0">
                        <h4
                          className="ms-3 me-2 mt-1 fw-bold"
                          style={{ fontSize: 20 }}
                        >
                          4.324
                        </h4>
                      </div>
                      <div className="col-12 p-0">
                        <span
                          style={{ fontSize: 12, color: "#4277FF" }}
                          className="me-4 pe-2 d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="pe-1"
                            src="../assets/image/group-304.png"
                            alt=""
                          />
                          Dịch vụ
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 p-0">
                    <div className="row">
                      <div className="col-9 my-1 p-0">
                        <Badge color="#4277FF" text="Đang hoạt động" />{" "}
                      </div>
                      <div className="col-3 my-1">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          3.444
                        </span>
                      </div>
                      <div className="col-9 p-0">
                        <Badge color="#4277FF" text="Ngưng hoạt động" />{" "}
                      </div>
                      <div className="col-3">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          3.44
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-12">
              <Card
                className="shadow mx-3 d-flex align-items-center"
                style={{ height: 80 }}
              >
                <div className="row">
                  <div className="col-3">
                    <div className="progress-container">
                      <div className="outer-progress">
                        <Progress type="circle" strokeColor={"#35C75A"} size={60} percent={86} />
                        <div className="inner-progress">
                          <Progress type="circle" strokeColor={"#7E7D88"} size={50} percent={20} />
                          <div className="inner-progress">
                            <Progress type="circle" strokeColor={"#F178B6"} size={40} percent={10} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 p-0">
                    <div className="row">
                      <div className="col-12 p-0">
                        <h4
                          className="ms-3 me-2 mt-1 fw-bold"
                          style={{ fontSize: 20 }}
                        >
                          4.324
                        </h4>
                      </div>
                      <div className="col-12 p-0">
                        <span
                          style={{ fontSize: 12, color: "#35C75A" }}
                          className="me-4 pe-2 d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="pe-1"
                            src="./assets/image/fi-layers.png"
                            alt=""
                          />
                          Cấp số
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 p-0">
                    <div className="row">
                      <div className="col-9 p-0">
                        <Badge color="#35C75A" text="Đang chờ" />{" "}
                      </div>
                      <div className="col-3 ">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          3.444
                        </span>
                      </div>
                      <div className="col-9 p-0">
                        <Badge color="#35C75A" text="Đã sử dụng" />{" "}
                      </div>
                      <div className="col-3">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          3.444
                        </span>
                      </div>
                      <div className="col-9 p-0">
                        <Badge color="#35C75A" text="Bỏ qua" />{" "}
                      </div>
                      <div className="col-3">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          3.44
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12">
              <DatePicker
                className="hide-datepicker"
                open
                style={{ position: "absolute", bottom: -0 }}
              />
            </div>
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
