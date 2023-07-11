import React, { useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Input,
  Layout,
  Popover,
  Select,
  Space,
  Table,
} from "antd";
import { BellFilled, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import SlideMain from "../../containers/SlideMain";
import BreadCrumbTwo from "../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../components/User/Account";
import "../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";
import { setData } from "../../redux/device/deviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);

const renderIsActive = (status: string) => {
  let color = "";

  if (status === "Hoạt động") {
    color = "#008000"; // Xanh lá cây
  } else if (status === "Ngưng hoạt động") {
    color = "#FF0000"; // Đỏ
  }

  return <Badge color={color} text={status} />;
};

const renderIsConnected = (status: string) => {
  let color = "";
  let text = "";

  if (status === "Kết nối") {
    color = "#008000"; // Xanh lá cây
    text = "Kết nối";
  } else if (status === "Mất kết nối") {
    color = "#FF0000"; // Đỏ
    text = "Mất kết nối";
  }

  return <Badge color={color} text={text} />;
};

interface DeviceData {
  id: string;
  codeDevice: string;
  nameDevice: string;
  ipAddress: string;
  isConnected: string;
  service: string;
  authManagementId: string;
  isActive: string;
}

function ListDevices() {
  const dispatch = useDispatch();
  const deviceData = useSelector((state: RootState) => state.firestoreDeviceData.data);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const deviceRef = firebase.firestore().collection("devices");
        const snapshot = await deviceRef.get();

        const deviceData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const device = doc.data() as DeviceData;
            device.id = doc.id;
        
            const authManagementId = device.authManagementId;
            if (authManagementId) {
              const authManagementRef = firebase
                .firestore()
                .collection("authManagements")
                .doc(authManagementId);
              const authManagementSnapshot = await authManagementRef.get();
        
              if (authManagementSnapshot.exists) {
                const authManagementData = authManagementSnapshot.data();
                if (authManagementData) {
                  const isActive = authManagementData.isActive;
                  device.isActive = isActive;
                }
              }
            }
            return device;
          })
        );

        dispatch(setData(deviceData));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDevice();
  }, [dispatch]);

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Layout.Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbTwo text="Thiết bị" text2="Danh sách thiết bị" />
              </div>
              <div className="col-auto">
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
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Danh sách thiết bị</h4>
            </div>
            <div className="row mt-3 justify-content-center">
              <div className="col-3">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Trạng thái hoạt động</label>
                  </div>
                  <div className="col-12">
                    <Select
                      size="large"
                      defaultValue="all"
                      style={{ width: 280 }}
                    >
                      <Select.Option value="all">Tất cả</Select.Option>
                      <Select.Option value="active">Hoạt động</Select.Option>
                      <Select.Option value="inactive">
                        Ngưng hoạt động
                      </Select.Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col-5 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Trạng thái kết nối</label>
                  </div>
                  <div className="col-12">
                    <Select
                      size="large"
                      defaultValue="all"
                      style={{ width: 280 }}
                    >
                      <Select.Option value="all">Tất cả</Select.Option>
                      <Select.Option value="connected">Kết nối</Select.Option>
                      <Select.Option value="disconnected">
                        Mất kết nối
                      </Select.Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Từ khóa</label>
                  </div>
                  <div className="col-12">
                    <Input
                      size="large"
                      style={{ width: 280 }}
                      placeholder="Nhập từ khóa"
                      suffix={
                        <Space>
                          <SearchOutlined
                            style={{ color: "#FF7506" }}
                            className="d-flex align-items-center justify-content-center"
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
                  dataSource={deviceData}
                  pagination={{ pageSize: 5 }}
                  bordered
                  className="mb-3"
                  rowClassName={() => "table-row"}
                >
                  <Table.Column
                    title="Mã thiết bị"
                    dataIndex="codeDevice"
                    key="codeDevice"
                  />
                  <Table.Column
                    title="Tên thiết bị"
                    dataIndex="nameDevice"
                    key="nameDevice"
                  />
                  <Table.Column
                    title="Địa chỉ IP"
                    dataIndex="ipAddress"
                    key="ipAddress"
                  />
                  <Table.Column
                    title="Trạng thái hoạt động"
                    dataIndex="isActive"
                    key="isActive"
                    render={(isActive: string) =>
                      renderIsActive(isActive)
                    }
                  />
                  <Table.Column
                    title="Trạng thái kết nối"
                    dataIndex="isConnected"
                    key="isConnected"
                    render={(isConnected: string) =>
                      renderIsConnected(isConnected)
                    }
                  />
                  <Table.Column
                    title="Dịch vụ sử dụng"
                    dataIndex="service"
                    key="service"
                    width={220}
                    ellipsis={{ showTitle: false }}
                    render={(service: string) => (
                      <Popover
                        content={service}
                        overlayStyle={{ maxWidth: 300 }}
                        placement="topLeft"
                      >
                        <span>{service + " "}</span>
                      </Popover>
                    )}
                  />
                  <Table.Column
                    title=""
                    dataIndex="ct"
                    key="ct"
                    render={(_: any, record: { id: string }) => (
                      <>
                        <Link to={`/detailDevice/${record.id}`}>Chi tiết</Link>
                      </>
                    )}
                  />
                  <Table.Column
                    title=""
                    dataIndex="cn"
                    key="cn"
                    render={(_: any, record: { id: string }) => (
                      <>
                        <Link to={`/editDevice/${record.id}`}>Cập nhật</Link>
                      </>
                    )}
                  />
                </Table>
              </div>
              <div className="col-1 mt-3">
                <Link to={"/addDevice"}>
                  <Card className="fixed-card text-center">
                    <img src="../assets/image/add-square.png" alt="" />
                    <p className="fw-bold" style={{ fontSize: 10 }}>
                      Thêm thiết bị
                    </p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default ListDevices;
