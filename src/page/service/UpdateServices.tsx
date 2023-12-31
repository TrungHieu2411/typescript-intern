import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Form, Input, Layout, message } from "antd";
import TextArea from "antd/es/input/TextArea";

import Account from "../../components/User/Account";
import SlideMain from "../../containers/SlideMain";
import "../../assets/css/style.css";



import { useParams } from "react-router-dom";
import BreadCrumbFour from "../../components/BreadCrumb/BreadCrumbFour";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateService } from "../../redux/service/serviceSlice";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { firestore } from "../../firebase/firebaseConfig";

interface ServiceData {
  codeService: string;
  nameService: string;
  description: string;
  isActive: string;
}
function UpdateServices() {
  const { id } = useParams<{ id: string }>();
  //------------
  const [service, setService] = useState<ServiceData>({
    codeService: "",
    nameService: "",
    description: "",
    isActive: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      const serviceRef = firestore.collection("services").doc(id);
      const serviceSnapshot = await serviceRef.get();

      if (serviceSnapshot.exists) {
        const serviceData = serviceSnapshot.data() as ServiceData;
        setService(serviceData);
      }
    };
    fetchService();
  }, [id]);

  //------------

  const addNoteToCollection = async (action: string) => {
    const noteUsersCollection = firestore.collection("noteUsers");
    const ipAddress = await fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => data.ip)
      .catch((error) => {
        console.error("Failed to fetch IP address:", error);
        return "";
      });

    // Lấy userId từ localStorage
    const userName = localStorage.getItem("userName");
    try {
      await noteUsersCollection.add({
        action: action,
        timeAction: moment().format("DD/MM/YYYY HH:mm:ss"),
        ipAddress: ipAddress,
        userName: userName,
      });
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const handleUpdateService = async () => {
    if (typeof id === "string") {
      const serviceData = {
        id: id,
        codeService: service.codeService,
        nameService: service.nameService,
        description: service.description,
        isActive: "Hoạt động",
      };

      message.success(`Cập nhật thông tin ${service.codeService} thành công!`);
      await addNoteToCollection(`Cập nhật dịch vụ: ${service.codeService}`);
      dispatch(updateService(id, serviceData));
      try {
        console.log("Service updated successfully!");
        window.location.href = "/service";
      } catch (error) {
        console.error("Error updating service:", error);
      }
    }
  };

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Layout.Content style={{ margin: "0px 16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbFour
                  text="Dịch vụ"
                  text2="Danh sách dịch vụ"
                  href="/service"
                  text3="Chi tiết"
                  href2={`/detailService/${id}`}
                  text4="Cập nhật"
                />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Account />
                </span>
              </div>
            </div>
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Quản lý dịch vụ</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140 }}>
                <h6 style={{ color: "#FF7506" }}>Thông tin dịch vụ</h6>
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Mã dịch vụ:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={service.codeService}
                              onChange={(e) =>
                                setService({
                                  ...service,
                                  codeService: e.target.value,
                                })
                              }
                              placeholder="203"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tên dịch vụ:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={service.nameService}
                              onChange={(e) =>
                                setService({
                                  ...service,
                                  nameService: e.target.value,
                                })
                              }
                              placeholder="Khám tim mạch"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Mô tả: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item className="">
                        <TextArea
                          value={service.description}
                          onChange={(e) =>
                            setService({
                              ...service,
                              description: e.target.value,
                            })
                          }
                          rows={5}
                          placeholder="Mô tả dịch vụ"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
                <h6 style={{ color: "#FF7506" }}>Quy tắc cấp số</h6>
                <table>
                  <tr>
                    <td>
                      <Checkbox className="blue-checkbox" id="tangTuDong">
                        Tăng tự động
                      </Checkbox>
                    </td>
                    <td>
                      <Input
                        value="0001"
                        className="mb-2"
                        style={{ width: 58, height: 40 }}
                      />
                    </td>
                    <td>
                      <p className="mx-2 mb-2">đến</p>
                    </td>
                    <td>
                      <Input
                        value="9999"
                        className="mb-2"
                        style={{ width: 58, height: 40 }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Checkbox className="blue-checkbox" id="prefix">
                        Prefix
                      </Checkbox>
                    </td>
                    <td>
                      <Input
                        value="0001"
                        className="mb-2"
                        style={{ width: 58, height: 40 }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Checkbox className="blue-checkbox" id="suffix">
                        Suffix
                      </Checkbox>
                    </td>
                    <td>
                      <Input
                        value="0001"
                        className="mb-2"
                        style={{ width: 58, height: 40 }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Checkbox className="blue-checkbox" id="resetMoiNgay">
                        Reset mỗi ngày
                      </Checkbox>
                    </td>
                  </tr>
                </table>
                <div className="mt-1 mb-4 text-right">
                  <span style={{ color: "#FF7506" }}>*</span>{" "}
                  <small>Là trường hợp thông tin bắt buộc</small>
                </div>
              </Card>
              <div className="col-6 text-center offset-3 mt-3">
                <Form.Item>
                  <Button
                    danger
                    htmlType="submit"
                    href="/service"
                    className="mx-3 pt-2"
                    style={{
                      background: "#FFF2E7",
                      color: "#FF9138",
                      height: 38,
                      width: 115,
                    }}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="link"
                    onClick={handleUpdateService}
                    style={{
                      background: "#FF9138",
                      color: "white",
                      height: 38,
                      width: 115,
                    }}
                    className="mx-3 pt-2 me-5"
                  >
                    Cập nhật
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default UpdateServices;
