import { useEffect, useState } from "react";
import { Card, Form, Input, Select, Button, Layout, message } from "antd";
import Account from "../../components/User/Account";
import SlideMain from "../../containers/SlideMain";
import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";
import "../../assets/css/style.css";
import firebase from "firebase/compat/app";
import { useDispatch } from "react-redux";
import { createDevice } from "../../redux/device/deviceSlice";
import moment from "moment";

interface DeviceData {
  id: string;
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
  id: string;
  userName: string;
  password: string;
}

function AddDevices() {
  //------------
  const [service, setService] = useState<{ id: String; nameService: string }[]>(
    []
  );
  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceSnapshot = await firebase
          .firestore()
          .collection("services")
          .get();
        const serviceData = serviceSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            nameService: data.nameService,
          };
        });
        setService(serviceData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchService();
  }, []);

  const [newDevice, setNewDevice] = useState<DeviceData>({
    id: "",
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
    id: "",
    userName: "",
    password: "",
  });

  //------------
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
  const dispatch = useDispatch();
  const onFinish = async () => {
    message.success(`Thêm mới thiết bị ${newDevice.codeDevice} thành công!`);
    await dispatch(createDevice(newDevice) as any);
    // Thêm ghi chú vào collection noteUsers
    await addNoteToCollection(`Thêm mới dịch vụ: ${newDevice.codeDevice}`);
  };
  //----------------------------------------
  const [form] = Form.useForm();
  const handleAddDevice = async () => {
    try {
      // Kiểm tra và submit form
      await form.validateFields();

      const { username, password } = form.getFieldsValue();

      // Lấy thông tin authManagement từ Firebase Firestore
      const authManagementCollection = firebase
        .firestore()
        .collection("authManagements");
      const snapshot = await authManagementCollection.get();
      const matchingData = snapshot.docs.find((doc) => {
        const data = doc.data() as AuthManagementData;
        return data.userName === username && data.password === password;
      });

      if (matchingData) {
        const authManagementId = matchingData.id;

        // Thực hiện thêm thiết bị và lưu trữ authManagementId
        const deviceCollection = firebase.firestore().collection("devices");
        await deviceCollection.add({
          codeDevice: newDevice.codeDevice,
          nameDevice: newDevice.nameDevice,
          ipAddress: newDevice.ipAddress,
          isActive: "Hoạt động",
          isConnected: "Kết nối",
          service: newDevice.service,
          typeDevice: newDevice.typeDevice,
          authManagementId: authManagementId,
        });
        message.success(
          `Thêm mới thiết bị ${newDevice.nameDevice} thành công!`
        );
        // Thêm ghi chú vào collection noteUsers
        await addNoteToCollection(`Thêm mới thiết bị: ${newDevice.codeDevice}`);

        // Thực hiện điều hướng đến trang danh sách sản phẩm
        window.location.href = "/device";
      } else {
        message.error("Tên đăng nhập hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      console.error("Validation failed:", error);
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
                <BreadCrumbThree
                  text="Thiết bị"
                  text2="Danh sách thiết bị"
                  href="/device"
                  text3="Thêm thiết bị"
                />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Account />
                </span>
              </div>
            </div>
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Quản lý thiết bị</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140 }}>
                <h6 style={{ color: "#FF7506" }}>Thông tin thiết bị</h6>
                <Form className="mt-3" form={form} onFinish={onFinish}>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Mã thiết bị: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="codeDevice"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mã thiết bị!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Nhập mã thiết bị"
                          value={newDevice.codeDevice}
                          onChange={(e) =>
                            setNewDevice({
                              ...newDevice,
                              codeDevice: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Loại thiết bị:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="typeDevice"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn loại thiết bị!",
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          value={newDevice.typeDevice}
                          onChange={(value) =>
                            setNewDevice({
                              ...newDevice,
                              typeDevice: value,
                            })
                          }
                          aria-required
                          placeholder="Chọn loại thiết bị"
                        >
                          <Select.Option value="Kiosk">Kiosk</Select.Option>
                          <Select.Option value="Display counter">
                            Display counter
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Tên thiết bị:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="nameDevice"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên thiết bị!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Nhập tên thiết bị"
                          value={newDevice.nameDevice}
                          onChange={(e) =>
                            setNewDevice({
                              ...newDevice,
                              nameDevice: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Tên đăng nhập:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên đăng nhập!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Nhập tên đăng nhập"
                          value={authManagement.userName}
                          onChange={(e) =>
                            setAuthManagement({
                              ...authManagement,
                              userName: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Địa chỉ IP: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="ipAddress"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập địa chỉ IP!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Nhập địa chỉ IP"
                          value={newDevice.ipAddress}
                          onChange={(e) =>
                            setNewDevice({
                              ...newDevice,
                              ipAddress: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-1">
                        Mật khẩu: <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                          },
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Nhập mật khẩu"
                          value={authManagement.password}
                          onChange={(e) =>
                            setAuthManagement({
                              ...authManagement,
                              password: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="mb-1">
                        Dịch vụ sử dụng:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Form.Item
                        name="service"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập dịch vụ sử dụng!",
                          },
                        ]}
                      >
                        <Select
                          mode="tags"
                          style={{ height: 35, borderColor: "#FFAC6A" }}
                          tokenSeparators={[" "]}
                          className="w-100"
                          value={newDevice.service}
                          onChange={(value) =>
                            setNewDevice({
                              ...newDevice,
                              service: value,
                            })
                          }
                          aria-required
                          placeholder="Nhập dịch vụ sử dụng"
                        >
                          {service.map((service) => (
                            <Select.Option
                              key={service.nameService}
                              value={" " + service.nameService}
                            >
                              {" "}
                              {service.nameService}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-4 mb-4 text-right">
                      <span style={{ color: "#FF7506" }}>*</span>{" "}
                      <small>Là trường hợp bắt buộc</small>
                    </div>
                  </div>
                </Form>
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
                    style={{
                      background: "#FF9138",
                      color: "white",
                      height: 38,
                      width: 115,
                    }}
                    className="mx-3 pt-2 me-5"
                    onClick={handleAddDevice}
                  >
                    Thêm dịch vụ
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

export default AddDevices;
