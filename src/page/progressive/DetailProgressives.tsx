import React, { useEffect, useState } from "react";
import { Card, Layout } from "antd";
import { Link } from "react-router-dom";

import SlideMain from "../../containers/SlideMain";
import Account from "../../components/User/Account";
import "../../assets/css/style.css";


import { useParams } from "react-router-dom";
import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";
import { firestore } from "../../firebase/firebaseConfig";

const { Content } = Layout;

interface ProgressiveData {
  id: string;
  number: string;
  nameService: any;
  timeCreate: string;
  deadLineUsed: string;
  fullName: string;
  phone: string;
  email: string;
  authManagementId: string;
  status: string;
}

interface DeviceData {
  typeDevice: string;
}

function DetailProgressives() {
  const { id } = useParams<{ id: string }>();

  //-------------
  const [progressive, setProgressive] = useState<ProgressiveData>({
    number: "",
    nameService: null,
    timeCreate: "",
    deadLineUsed: "",
    fullName: "",
    phone: "",
    email: "",
    authManagementId: "",
    id: "",
    status: "",
  });

  //----------------------------------------
  const [typeDevice, setTypeDevice] = useState<string>("");
  useEffect(() => {
    const fetchProgressive = async () => {
      const progressiveRef = firestore
        .collection("progressives")
        .doc(id);
      const progressiveSnapshot = await progressiveRef.get();

      if (progressiveSnapshot.exists) {
        const progressiveData = progressiveSnapshot.data() as ProgressiveData;
        setProgressive({
          ...progressiveData,
          nameService: progressiveData.nameService || null,
        });

        if (progressiveData.authManagementId) {
          // Fetch the associated device document
          const deviceRef = firestore
            .collection("devices")
            .where("authManagementId", "==", progressiveData.authManagementId);
          const deviceSnapshot = await deviceRef.get();

          if (!deviceSnapshot.empty) {
            const deviceData = deviceSnapshot.docs[0].data() as DeviceData;
            setTypeDevice(deviceData.typeDevice);
          }
        }
      }
    };

    fetchProgressive();
  }, [id]);

  //----------------------------------------
  const [nameServiceValue, setNameServiceValue] = useState<string | null>(null);
  useEffect(() => {
    const fetchProgressive = async () => {
      const progressiveRef = firestore.collection("progressives");
      const snapshot = await progressiveRef.get();
      await Promise.all(
        snapshot.docs.map(async (doc) => {
          const progressive = doc.data() as ProgressiveData;
          progressive.id = doc.id;

          const nameServiceRef = progressive.nameService;

          if (
            nameServiceRef 
          ) {
            const nameServiceDoc = await nameServiceRef.get();
            if (nameServiceDoc.exists) {
              const nameServiceData = nameServiceDoc.data();
              if (nameServiceData && nameServiceData.nameService) {
                const nameService = nameServiceData.nameService;
                progressive.nameService = nameService;
                setNameServiceValue(nameService); // Đặt giá trị cho nameServiceValue
              }
            }
          }
          return progressive;
        })
      );
    };

    fetchProgressive();
  }, []);
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "0px 16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbThree
                  text="Cấp số"
                  text2="Danh sách cấp số"
                  href="/progressive"
                  text3="Chi tiết"
                />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Account />
                </span>
              </div>
            </div>
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Quản lý cấp số</h4>
            </div>
            <div className="row mt-3">
              <div className="col-11">
                <Card style={{ width: 1080 }}>
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
                            <p>{progressive.fullName}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              <span className="me-5 fw-bold">Tên dịch vụ:</span>{" "}
                            </p>
                          </td>
                          <td>
                            <p>
                              <span>{nameServiceValue}</span>
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
                              <span>{progressive.number}</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              <span className="me-5 fw-bold">
                                Thời gian cấp:
                              </span>{" "}
                            </p>
                          </td>
                          <td>
                            <p>
                              <span>{progressive.timeCreate}</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              <span className="me-5 fw-bold">Hạn sử dụng:</span>
                            </p>
                          </td>
                          <td>
                            <p>
                              <span>{progressive.deadLineUsed}</span>
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
                            <p>{typeDevice}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="me-5 fw-bold">Trạng thái:</p>{" "}
                          </td>
                          <td>
                            <p>{progressive.status}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="me-5 fw-bold">Số điện thoại:</p>
                          </td>
                          <td>
                            <p>{progressive.phone}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="me-5 fw-bold">Địa chỉ Email:</p>
                          </td>
                          <td>
                            <p>{progressive.email}</p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="col-1 ">
                <Link to={"/progressive"}>
                  <Card className="fixed-card text-center">
                    <img src="../assets/image/back-square.png" alt="" />
                    <p style={{ fontSize: 10 }} className="fw-bold p-0">
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
