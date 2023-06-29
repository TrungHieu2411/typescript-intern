import React from "react";
import { Breadcrumb, Button, Card, Layout, Popover } from "antd";
import Icon, { BellFilled, PlusSquareOutlined } from "@ant-design/icons";

import "../css/style.css";
import SlideMain from "../../containers/SlideMain";
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

function DetailProgressives() {
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
                  <Breadcrumb.Item
                    className="text-decoration-none"
                    href="/device"
                  >
                    Danh sách cấp số
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
              <h4 style={{ color: "#FF7506" }}>Quản lý cấp số</h4>
            </div>
            <div className="row">
              <div className="col-10 mt-3">
                <Card style={{ width: 1050 }}>
                  <h6 style={{ color: "#FF7506" }}>Thông tin cấp số</h6>
                  <div className="row">
                    <div className="col">
                      <table>
                        <tr>
                          <td>
                            <p>
                              <p className="me-5 fw-bold">Họ tên: </p>
                            </p>
                          </td>
                          <td>
                            <p>KOI_02</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              <span className="me-5 fw-bold">
                                Tên dịch vụ:
                              </span>{" "}
                            </p>
                          </td>
                          <td>
                            <p>
                              <span>Kiosk</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              <span className="me-5 fw-bold">Số thứ tự:</span>{" "}
                            </p>
                          </td>
                          <td>
                            <p>
                              <span>323.424.454.33</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              <span className="me-5 fw-bold">Thời gian cấp:</span>{" "}
                            </p>
                          </td>
                          <td>
                            <p>
                              <span>323.424.454.33</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              <span className="me-5 fw-bold">Hạn sử dụng:</span>{" "}
                            </p>
                          </td>
                          <td>
                            <p>
                              <span>323.424.454.33</span>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="col">
                      <table>
                        <tr>
                          <td>
                            <p className="me-5 fw-bold">Nguồn cấp: </p>
                          </td>
                          <td>
                            <p>KOI_02</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="me-5 fw-bold">Trạng thái:</p>{" "}
                          </td>
                          <td>
                            <p>đâsdasd</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="me-5 fw-bold">Số điện thoại:</p>
                          </td>
                          <td>
                            <p>CMS</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="me-5 fw-bold">Địa chỉ Email:</p>
                          </td>
                          <td>
                            <p>CMS</p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="col-2 mt-3">
                <Link to={"/editDevice"}>
                  <Card className="fixed-card text-center">
                    <PlusSquareOutlined className="fs-4" />
                    <p style={{ fontSize: 12 }} className="fw-bold p-0">
                      Quay lại
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

export default DetailProgressives;
