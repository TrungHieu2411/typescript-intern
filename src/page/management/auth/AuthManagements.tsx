import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  Col,
  Input,
  Layout,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";

import SlideMain from "../../../containers/SlideMain";
import BreadCrumbTwo from "../../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../../components/User/Account";
import "../../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";

const { Content } = Layout;

const renderIsActive = (status: string) => {
  let color = "";
  let text = "";

  if (status === "Hoạt động") {
    color = "#008000"; // Xanh lá cây
    text = "Hoạt động";
  } else if (status === "Ngưng hoạt động") {
    color = "#FF0000"; // Đỏ
    text = "Ngưng hoạt động";
  }

  return <Badge color={color} text={text} />;
};

interface AuthManagementData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: firebase.firestore.DocumentReference | null;
  isActive: string;
}
function AuthManagements() {
  const [authManagementData, setAuthManagementData] = useState<
    AuthManagementData[]
  >([]);

  useEffect(() => {
    const fetchAuthManagement = async () => {
      const authManagementRef = firebase
        .firestore()
        .collection("authManagements");
      const snapshot = await authManagementRef.get();
      setAuthManagementData(
        await Promise.all(
          snapshot.docs.map(async (doc) => {
            const authManagement = doc.data() as AuthManagementData;
            authManagement.id = doc.id;

            const roleRef = authManagement.role;

            if (
              roleRef &&
              roleRef instanceof firebase.firestore.DocumentReference
            ) {
              const roleDoc = await roleRef.get();
              if (roleDoc.exists) {
                const roleData = roleDoc.data();
                if (roleData && roleData.nameRole) {
                  const roleName = roleData.nameRole;
                  authManagement.role = roleName;
                }
              }
            }

            return authManagement;
          })
        )
      );
    };
    fetchAuthManagement();
  });

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbTwo
                  text="Cài đặt hệ thống"
                  text2="Quản lý tài khoản"
                />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Account />
                </span>
              </div>
            </div>
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Danh sách tài khoản</h4>
            </div>
            <Row justify="space-between" className="pt-2">
              <Col lg={5}>
                <Row style={{ maxWidth: 200 }}>
                  <label htmlFor="">Tên vai trò</label>
                  <Col span={24}>
                    <Select
                      size="large"
                      defaultValue="all"
                      style={{ width: 325 }}
                    >
                      <Select.Option value="all">Tất cả</Select.Option>
                      <Select.Option value="active">Hoạt động</Select.Option>
                      <Select.Option value="inactive">
                        Ngưng hoạt động
                      </Select.Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col lg={9}>
                <Row style={{ maxWidth: 325 }} className="ms-3">
                  <label htmlFor="">Từ khóa</label>
                  <Col span={24}>
                    <Input
                      size="large"
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
                  dataSource={authManagementData}
                  
                  pagination={{pageSize: 5}}
                  bordered
                  className="mb-3"
                >
                  <Column
                    title={<span className="table-title">Tên đăng nhập</span>}
                    dataIndex="userName"
                    key="userName"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Họ tên</span>}
                    dataIndex="fullName"
                    key="fullName"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Số điện thoại</span>}
                    dataIndex="phone"
                    key="phone"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Email</span>}
                    dataIndex="email"
                    key="email"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Vai trò</span>}
                    dataIndex="role"
                    key="role"
                  />
                  <Column
                    title={
                      <span className="table-title">Trạng thái hoạt động</span>
                    }
                    dataIndex="isActive"
                    key="isActive"
                    render={(isActive: string) => renderIsActive(isActive)}
                  />
                  <Column
                    title=""
                    dataIndex="cn"
                    key="cn"
                    render={(_: any, record: { id: string }) => (
                      <>
                        <Link to={`/editAuthManagement/${record.id}`}>
                          Cập nhật
                        </Link>
                      </>
                    )}
                  />
                </Table>
                
              </div>
              <div className="col-1 mt-3">
                <Link to={"/addAuthManagement"}>
                  <Card className="fixed-card text-center">
                    <img src="../assets/image/add-square.png" alt="" />
                    <p className="fw-bold" style={{ fontSize: 10 }}>
                      Thêm tài khoản
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

export default AuthManagements;
