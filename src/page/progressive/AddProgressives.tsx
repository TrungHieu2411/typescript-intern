import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Layout,
  Select,
  Modal,
  message,
  Input,
} from "antd";
import SlideMain from "../../containers/SlideMain";
import Account from "../../components/User/Account";
import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";
import "../../assets/css/style.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useParams } from "react-router-dom";
import moment from "moment";

const { Content } = Layout;

interface ServiceData {
  id: string;
  nameService: string;
  progressiveId: number;
}

function AddProgressives() {
  const determineCounter = (serviceId: string): number => {
    const serviceIndex = nameService.findIndex(
      (service) => service.id === serviceId
    );

    return Math.floor(serviceIndex / 3) + 1;
  };

  //-------
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

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchUser = async () => {
      const userRef = firebase
        .firestore()
        .collection("authManagements")
        .doc(userId || id);
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
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const expirationHour = currentDate.getHours();
    const expirationMinute = currentDate.getMinutes();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    return `${expirationHour}:${expirationMinute} ${currentDay}/${currentMonth}/${currentYear}`;
  };

  const addNoteToCollection = async (action: string) => {
    const noteUsersCollection = firebase.firestore().collection("noteUsers");
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
  const [progressiveNumber, setProgressiveNumber] = useState<number>(0);

  const handleAddProgressive = async () => {
    const progressiveCollection = firebase
      .firestore()
      .collection("progressives");
    const serviceRef = firebase.firestore().doc(`services/${selectedService}`);
    try {
      const lastProgressiveSnapshot = await progressiveCollection
        .orderBy("number", "desc")
        .limit(1)
        .get();
      let lastProgressiveNumber = 0;
      if (!lastProgressiveSnapshot.empty) {
        const lastProgressiveData = lastProgressiveSnapshot.docs[0].data();
        lastProgressiveNumber = lastProgressiveData.number;
      }
      const newProgressiveNumber = lastProgressiveNumber + 1;
      setProgressiveNumber(newProgressiveNumber);
      await progressiveCollection.add({
        number: newProgressiveNumber,
        nameService: serviceRef,
        timeCreate: getCurrentTime(),
        deadLineUsed: getExpirationTime(),
        fullName: customerInfo.fullName,
        phone: customerInfo.phone,
        email: customerInfo.email,
        authManagementId: userId,
        status: "Đang chờ",
        timeStamp: moment().format("DD/MM/YYYY"),
      });
      message.success(`Thêm mới cấp số ${newProgressiveNumber} thành công!`);
      // Thêm ghi chú vào collection noteUsers
      await addNoteToCollection(`Thêm mới cấp số: ${newProgressiveNumber}`);

      localStorage.setItem("progressiveAddedTime", getCurrentTime());
      localStorage.setItem("progressiveExpirationTime", getExpirationTime());

      window.location.href = "/progressive";
    } catch (error) {
      console.log(`Error adding document: ${error}`);
    }
  };
  //----------------------------------------
  const [isAddInfoModalVisible, setAddInfoModalVisible] = useState(false);
  const [isPrintModalVisible, setPrintModalVisible] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const showAddInfoModal = () => {
    setAddInfoModalVisible(true);
  };

  const handleAddInfoModalCancel = () => {
    setAddInfoModalVisible(false);
  };

  const handlePrintButtonClick = () => {
    showAddInfoModal();
  };

  const handlePrintConfirmButtonClick = () => {
    handleAddProgressive();
    setAddInfoModalVisible(false); // Hide the customer info modal
    setPrintModalVisible(true); // Show the print modal
  };

  const handlePrintModalCancel = () => {
    setPrintModalVisible(false);
  };

  //----------------------------------------
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
                  text2=" Danh sách cấp số"
                  href="/progressive"
                  text3="Cấp số mới"
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
            <div className="mt-3">
              <Card style={{ width: "100%", height: 550 }}>
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
                      </Form.Item>
                    </div>
                  </Form>
                </p>
              </Card>
            </div>
            <Modal
              visible={isAddInfoModalVisible}
              onCancel={handleAddInfoModalCancel}
              footer={null} // Removed the footer and added buttons directly inside the content
            >
              <h5 className="text-center mb-4" style={{ color: "#FF9138" }}>
                Điền thông tin khách hàng
              </h5>
              <Form className="mx-5" onFinish={handlePrintConfirmButtonClick}>
                <label htmlFor="" className="mb-1">
                  Tên khách hàng
                  <span style={{ color: "#FF7506" }}>*</span>
                </label>
                <Form.Item
                  name={"fullName"}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên khách hàng!",
                    },
                  ]}
                >
                  <Input
                    value={customerInfo.fullName}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        fullName: e.target.value,
                      })
                    }
                    placeholder="Nhập tên khách hàng"
                  />
                </Form.Item>
                <label htmlFor="" className="mb-1">
                  Số điện thoại
                  <span style={{ color: "#FF7506" }}>*</span>
                </label>
                <Form.Item
                  name={"phone"}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Item>
                <label htmlFor="" className="mb-1">
                  Email
                  <span style={{ color: "#FF7506" }}>*</span>
                </label>
                <Form.Item
                  name={"email"}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email!",
                    },
                  ]}
                >
                  <Input
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        email: e.target.value,
                      })
                    }
                    placeholder="Nhập email"
                  />
                </Form.Item>

                <div className="text-center mt-3">
                  <Button
                    danger
                    className="mx-3 pt-2"
                    style={{
                      background: "#FFF2E7",
                      color: "#FF9138",
                      height: 38,
                      width: 115,
                    }}
                    onClick={handleAddInfoModalCancel}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="link"
                    htmlType="submit"
                    style={{
                      background: "#FF9138",
                      color: "white",
                      height: 38,
                      width: 115,
                    }}
                    className="mx-3 pt-2"
                  >
                    In số
                  </Button>
                </div>
              </Form>
            </Modal>

            {/* Second Modal for Displaying Progressive Number and Details */}
            <Modal
              visible={isPrintModalVisible}
              onCancel={handlePrintModalCancel}
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
              <h4 className="text-center mt-4">Số thứ tự được cấp</h4>
              <h1
                className="text-center my-4 fw-bold"
                style={{ color: "#FF9138" }}
              >
                {progressiveNumber}
              </h1>

              <p className="text-center">
                DV: {selectedServiceData?.nameService}{" "}
                <span className="fw-bold">
                  (tại quầy số {determineCounter(selectedService)})
                </span>
              </p>
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AddProgressives;
