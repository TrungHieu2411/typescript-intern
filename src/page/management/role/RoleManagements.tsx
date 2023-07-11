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
import firebase from "firebase/compat/app";
import { DocumentData } from "@firebase/firestore";

const { Content } = Layout;

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);

interface RoleManagementData {
  id: string;
  nameRole: string;
  description: string;
  userNumber: number;
  role: string;
}

interface AuthManagementData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: string | firebase.firestore.DocumentReference<DocumentData> | null;
  isActive: string;
}
function RoleManagement() {
  const [authManagementData, setAuthManagementData] = useState<
    AuthManagementData[]
  >([]);

  const [roleManagementData, setRoleManagementData] = useState<
    RoleManagementData[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const authManagementRef = firebase.firestore().collection("authManagements");
      const roleManagementRef = firebase.firestore().collection("roles");

      const authManagementSnapshot = await authManagementRef.get();
      const roleManagementSnapshot = await roleManagementRef.get();

      const authManagementData: AuthManagementData[] = await Promise.all(
        authManagementSnapshot.docs.map(async (doc) => {
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
      );

      const roleManagementData: RoleManagementData[] = roleManagementSnapshot.docs.map(
        (doc) => {
          const roleManagement = doc.data() as RoleManagementData;
          roleManagement.id = doc.id;
          return roleManagement;
        }
      );

      setAuthManagementData(authManagementData);
      setRoleManagementData(roleManagementData);
    };

    fetchData();
  }, []);

  const countNameRoleOccurrences = () => {
    const nameRoleCounts: { [key: string]: number } = {};

    roleManagementData.forEach((role) => {
      const { nameRole } = role;
      const count = authManagementData.filter( 
        (authManagement) => authManagement.role === nameRole 
      ).length;
      nameRoleCounts[nameRole] = count;
    });

    return nameRoleCounts;
  };

  const nameRoleCounts = countNameRoleOccurrences();

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
                  text2="Quản lý vai trò"
                />
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
                  dataSource={roleManagementData}
                  pagination={{ pageSize: 5 }}
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
                    render={(text: string, record: RoleManagementData) => (
                      <span>
                        {text} {nameRoleCounts[record.nameRole]}
                      </span>
                    )}
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
                        <Link to={`/editRoleManagement/${record.id}`}>
                          Cập nhật
                        </Link>
                      </>
                    )}
                  />
                </Table>
                <div>
                  </div>
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
