import React, { useState, useEffect } from "react";
import { Button, Card, Form, Layout, Popover, Select, Modal } from "antd";
import { BellFilled } from "@ant-design/icons";

import SlideMain from "../../containers/SlideMain";
import Account from "../../components/User/Account";
import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";
import "../../assets/css/style.css";

// firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useParams } from "react-router-dom";

const { Content } = Layout;

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);

interface UserData {
  fullName: string;
  phone: string;
  email: string;
}

interface ServiceData {
  id: string;
  nameService: string;
  progressiveId: number;
}

function AddProgressives() {
  const [nameService, setService] = useState<ServiceData[]>([]);
  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceSnapshot = await firebase
          .firestore()
          .collection("services")
          .get();
        const serviceData: ServiceData[] = serviceSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            nameService: data.nameService,
            progressiveId: data.progressiveId,
          };
        });
        setService(serviceData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchService();
  }, []);

  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserData>({
    fullName: "",
    phone: "",
    email: "",
  });

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchUser = async () => {
      const userRef = firebase
        .firestore()
        .collection("authManagements")
        .doc(userId || id);

      const userSnapshot = await userRef.get();

      if (userSnapshot.exists) {
        const userData = userSnapshot.data() as UserData;
        setUser(userData);
      }
    };
    fetchUser();
  }, [userId, id]);

  const [selectedService, setSelectedService] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedServiceData, setSelectedServiceData] =
    useState<ServiceData | null>(null);

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    const service = nameService.find((service) => service.id === value);
    setSelectedServiceData(service || null);
  };

  const handlePrintButtonClick = () => {
    setShowPopup(true);
    handleAddProgressive();
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const getCurrentTime = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    return `${currentHour}:${currentMinute} ${currentDay}/${currentMonth}/${currentYear}`;
  };

  const getExpirationTime = () => {
    const expirationHour = 17;
    const expirationMinute = 30;
    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    // Check if current time is past the expiration time
    if (
      currentDate.getHours() > expirationHour ||
      (currentDate.getHours() === expirationHour &&
        currentDate.getMinutes() > expirationMinute)
    ) {
      // Increment the current day by 1
      currentDay += 1;

      // Adjust the month and year if necessary
      if (currentDay > 30) {
        currentDay = 1;
        currentMonth += 1;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear += 1;
        }
      }
    }

    return `${expirationHour}:${expirationMinute} ${currentDay}/${currentMonth}/${currentYear}`;
  };

  const handleAddProgressive = async () => {
    const progressiveCollection = firebase
      .firestore()
      .collection("progressives");
    const progressiveId = selectedServiceData?.progressiveId;
    const serviceRef = firebase.firestore().doc(`services/${selectedService}`);
    try {
      await progressiveCollection.add({
        number: progressiveId,
        nameService: serviceRef,
        timeCreate: getCurrentTime(),
        deadLineUsed: getExpirationTime(),
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
        authManagementId: userId,
      });

      window.location.href = "/progressive";
    } catch (error) {
      console.log(`Error adding document: ${error}`);
    }
  };

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbThree
                  text="Cấp số"
                  text2=" Danh sách cấp số"
                  href="/progressive"
                  text3="Cấp số mới"
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
              <h4 style={{ color: "#FF7506" }}>Quản lý cấp số</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1180, height: 550 }}>
                <h3 className="text-center mb-4" style={{ color: "#FF9138" }}>
                  CẤP SỐ MỚI
                </h3>
                <p className="text-center fw-bold">
                  Dịch vụ khách hàng lựa chọn
                </p>
                <p className="text-center">
                  <Form>
                    <Form.Item>
                      <Select
                        style={{ width: 300 }}
                        className="text-start"
                        onChange={handleServiceChange}
                        value={selectedService}
                        placeholder="Chọn dịch vụ"
                      >
                        {nameService.map((service) => (
                          <Select.Option key={service.id} value={service.id}>
                            {service.nameService}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <div className="col-6 text-center offset-3 mt-5">
                      <Form.Item>
                        <Button
                          danger
                          htmlType="submit"
                          href="/progressive"
                          className="mx-3 pt-2 mt-4"
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
                          style={{
                            background: "#FF9138",
                            color: "white",
                            height: 38,
                            width: 115,
                          }}
                          className="mx-3 pt-2 mt-4 me-3"
                          onClick={handlePrintButtonClick}
                        >
                          In số
                        </Button>
                        <Modal
                          visible={showPopup}
                          onCancel={handlePopupClose}
                          style={{
                            marginTop: 100,
                          }}
                          className="w-25"
                          footer={
                            <h6
                              style={{ background: "#FF9138" }}
                              className="py-2 text-center text-white"
                            >
                              Thời gian cấp: {getCurrentTime()}
                              <br />
                              Hạn sử dụng: {getExpirationTime()}
                            </h6>
                          }
                        >
                          <h4 className="text-center mt-4">
                            Số thứ tự được cấp
                          </h4>
                          <h1
                            className="text-center my-4 fw-bold"
                            style={{ color: "#FF9138" }}
                          >
                            {selectedServiceData?.progressiveId}
                          </h1>

                          <p className="text-center">
                            DV: {selectedServiceData?.nameService}{" "}
                            <span className="fw-bold">
                              (tại quầy số{" "}
                              {selectedService === "Khám tim mạch"
                                ? 1
                                : selectedService === "Khám sản - Phụ khoa"
                                ? 2
                                : selectedService === "Khám răng hàm mặt"
                                ? 3
                                : selectedService === "Khám tai mũi họng"
                                ? 4
                                : ""}
                              )
                            </span>
                          </p>
                        </Modal>
                      </Form.Item>
                    </div>
                  </Form>
                </p>
              </Card>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AddProgressives;