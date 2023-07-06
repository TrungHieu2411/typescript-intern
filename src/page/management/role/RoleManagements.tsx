import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Layout,
  Popover,
  Row,
  Space,
  Table,
} from "antd";
import { BellFilled, SearchOutlined } from "@ant-design/icons";

import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";

import SlideMain from "../../../containers/SlideMain";
import BreadCrumbTwo from "../../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../../components/User/Account";
import "../../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";

const { Content } = Layout;

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);

// const data = [
//   {
//     nameRole: "Kế toán",
//     userNumber: "6",
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//     cn: "Cập nhật",
//   },
//   {
//     nameRole: "Bác sĩ",
//     userNumber: "6",
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//     cn: "Cập nhật",
//   },
//   {
//     nameRole: "Lễ tân",
//     userNumber: "6",
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//     cn: "Cập nhật",
//   },
//   {
//     nameRole: "Quản lý",
//     userNumber: "6",
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//     cn: "Cập nhật",
//   },
//   {
//     nameRole: "Admin",
//     userNumber: "6",
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//     cn: "Cập nhật",
//   },
 
// ];

interface RoleManagementData {
  id: string;
  nameRole: string;
  description: string;
}
function RoleManagement() {
  const [roleManagementData, setRoleManagementData] = useState<RoleManagementData[]>([]);

  useEffect(() => {
    const fetchRoleManagement = async () => {
      const roleManagementRef = firebase.firestore().collection("roleManagements");
      await roleManagementRef.onSnapshot((snapshot) => {
        const roleManagementData: RoleManagementData[] = [];
        snapshot.forEach((doc) => {
          const roleManagement = doc.data() as RoleManagementData;
          roleManagement.id = doc.id;
          roleManagementData.push(roleManagement)
        })
        setRoleManagementData(roleManagementData)
      })
    }
    fetchRoleManagement();
  })
  
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbTwo text="Cài đặt hệ thống" text2="Quản lý vai trò" />
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
              <Col lg={5}>
                <Row style={{ maxWidth: 200 }}>
                  <Col span={24}>
                  <h4 style={{ color: "#FF7506" }}>Danh sách vai trò</h4>
                  </Col>
                </Row>
              </Col>
              <Col lg={9}>
                <Row style={{ maxWidth: 325 }} className="ms-3">
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
            <div className="row">
              <div className="col-11 mt-3">
                <Table
                  dataSource={roleManagementData}
                  pagination={false}
                  bordered
                  rowClassName={() => "table-row"}
                  className="mb-3"
                >
                  <Column
                    title={<span className="table-title">Tên vai trò</span>}
                    dataIndex="nameRole"
                    key="nameRole"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Số người dùng</span>}
                    dataIndex="userNumber"
                    key="userNumber"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Mô tả</span>}
                    dataIndex="description"
                    key="description"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title=""
                    dataIndex="cn"
                    key="cn"
                    render={(_: any, record: { id: string }) => (
                      <>
                        <Link to={`/editRoleManagement/${record.id}`}>Cập nhật</Link>
                      </>
                    )}
                  />
                </Table>
              </div>
              <div className="col-1 mt-3">
                <Link to={"/addRoleManagement"}>
                  <Card className="fixed-card text-center">
                    <img src="../assets/image/add-square.png" alt="" />
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
