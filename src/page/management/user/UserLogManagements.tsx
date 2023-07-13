import React, { useEffect, useState } from "react";
import {
  Col,
  DatePicker,
  Input,
  Layout,
  Row,
  Space,
  Table,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";

import SlideMain from "../../../containers/SlideMain";
import BreadCrumbTwo from "../../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../../components/User/Account";
import "../../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";

const { Content } = Layout;

interface NoteUserData {
  userName: string;
  timeAction: string;
  ipAddress: string;
  action: string;
}
function UserLogManagements() {
  const [noteUserData, setNoteUserData] = useState<NoteUserData[]>([]);

  useEffect(() => {
    const fetchNoteUser = async () => {
      try {
        const serviceRef = firebase.firestore().collection("noteUsers");
        const snapshot = await serviceRef.get();

        const serviceData = snapshot.docs.map(async (doc) => {
          const service = doc.data() as NoteUserData;

          return service;
        });

        const resolvedServiceData = await Promise.all(serviceData);
        setNoteUserData(resolvedServiceData);
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch service data.");
      }
    };

    fetchNoteUser();
  }, []);

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
                  text2="Nhật ký hoạt động"
                />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Account />
                </span>
              </div>
            </div>
            <Row justify="space-between" className="mt-5">
              <Col lg={8} md={12}>
                <Row style={{ width: 325 }}>
                  <label htmlFor="">Chọn thời gian</label>
                  <Col span={24} className="d-flex align-items-center">
                    <DatePicker size="large" style={{ width: 130 }} />
                    <img
                      style={{ width: 15 }}
                      src="./assets/image/arrow-right.png"
                      alt=""
                    />
                    <DatePicker size="large" style={{ width: 130 }} />
                  </Col>
                </Row>
              </Col>
              <Col lg={8} md={12}>
                <Row style={{ width: 275 }} className="ms-3">
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

            <div className="row mt-3">
              <div className="col-11">
                <Table
                  dataSource={noteUserData}
                  pagination={{ pageSize: 5 }}
                  bordered
                  rowClassName={() => "table-row"}
                  className="mb-3"
                >
                  <Column
                    title={<span className="table-title">Tên đăng nhập</span>}
                    dataIndex="userName"
                    key="userName"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={
                      <span className="table-title">Thời gian tác động</span>
                    }
                    dataIndex="timeAction"
                    key="timeAction"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">IP thực hiện</span>}
                    dataIndex="ipAddress"
                    key="ipAddress"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={
                      <span className="table-title">Thao tác thực hiện</span>
                    }
                    dataIndex="action"
                    key="action"
                    render={(text: string) => <span>{text}</span>}
                  />
                </Table>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default UserLogManagements;
