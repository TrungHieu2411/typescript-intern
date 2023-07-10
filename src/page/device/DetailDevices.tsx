import React, { useEffect, useState } from "react";
import { Button, Card, Layout, Popover } from "antd";
import { BellFilled } from "@ant-design/icons";

import SlideMain from "../../containers/SlideMain";
import { Link, useParams } from "react-router-dom";

import Account from "../../components/User/Account";
import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";
import "../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);

interface DeviceData {
  codeDevice: string;
  nameDevice: string;
  ipAddress: string;
  isActive: string;
  isConnected: string;
  service: string;
  typeDevice: string;
  authManagementId: string;
}

interface AuthManagementData {
  userName: string;
  password: string;
}
function DetailDevices() {
   const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<DeviceData>({
    codeDevice: "",
    nameDevice: "",
    ipAddress: "",
    isActive: "",
    isConnected: "",
    service: "",
    typeDevice: "",
    authManagementId: "",
  });
  const [authManagement, setAuthManagement] = useState<AuthManagementData>({
    userName: "",
    password: "",
  });

//------------
  useEffect(() => {
    const fetchDevice = async () => {
      const deviceRef = firebase.firestore().collection("devices").doc(id);
      const deviceSnapshot = await deviceRef.get();

      if (deviceSnapshot.exists) {
        const deviceData = deviceSnapshot.data() as DeviceData;
        setDevice(deviceData);

        if (deviceData.authManagementId) {
          const authManagementRef = firebase
            .firestore()
            .collection("authManagements")
            .doc(deviceData.authManagementId);
          const authManagementSnapshot = await authManagementRef.get();

          if (authManagementSnapshot.exists) {
            const authManagementData = authManagementSnapshot.data() as AuthManagementData;
            setAuthManagement(authManagementData);
          }
        }
      }
    };

    fetchDevice();
  }, [id]);

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Layout.Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbThree
                  text="Thiết bị"
                  text2="Danh sách thiết bị"
                  href="/device"
                  text3="Chi tiết thiết bị"
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
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Quản lý thiết bị</h4>
            </div>
            <div className="row mt-3">
              <div className="col-11 ">
                <Card style={{ width: 1080, height: 550 }}>
                  <h6 style={{ color: "#FF7506" }}>Thông tin thiết bị</h6>
                  <div className="row mt-3">
                    <div className="col">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <p className="me-5 fw-bold"> Mã thiết bị: </p>
                            </td>
                            <td>
                              <p>{device.codeDevice}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>
                                <span className="me-5 fw-bold">
                                  Tên thiết bị:
                                </span>{" "}
                              </p>
                            </td>
                            <td>
                              <p>
                                <span>{device.nameDevice}</span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>
                                <span className="me-5 fw-bold">
                                  Địa chỉ IP:
                                </span>{" "}
                              </p>
                            </td>
                            <td>
                              <p>
                                <span>{device.ipAddress}</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <p className="me-5 fw-bold"> Loại thiết bị: </p>
                            </td>
                            <td>
                              <p>{device.typeDevice}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="me-5 fw-bold">Tên đăng nhập:</p>{" "}
                            </td>
                            <td>
                              <p>{authManagement.userName}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="me-5 fw-bold">Mật khẩu:</p>
                            </td>
                            <td>
                              <p>{authManagement.password}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12">
                      <p className="fw-bold">Dịch vụ sử dụng:</p>
                      <span>{device.service}</span>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="col-1">
                <Link to={`/editDevice/${id}`}>
                  <Card className="fixed-card text-center">
                    <img src="../assets/image/edit-square.png" alt="" />
                    <p style={{ fontSize: 10 }} className="fw-bold p-0">
                      Cập nhật thiết bị
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

export default DetailDevices;
