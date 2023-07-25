import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Layout, Select, message } from "antd";
import SlideMain from "../../../containers/SlideMain";
import Account from "../../../components/User/Account";
import BreadCrumbThree from "../../../components/BreadCrumb/BreadCrumbThree";
import "../../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";

import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/store";
import { updateAuthManagement } from "../../../redux/authManagement/authManagementSlice";

const { Content } = Layout;

interface AuthManagementData {
  nameRole: any;
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: firebase.firestore.DocumentReference | null; // Thay đổi kiểu dữ liệu của role thành DocumentReference
  isActive: string;
  userName: string;
  password: string;
}
function UpdateAuthManagements() {
  const { id } = useParams<{ id: string }>();

  const [authManagement, setAuthManagement] = useState<AuthManagementData>({
    id: "",
    fullName: "",
    phone: "",
    email: "",
    role: null,
    isActive: "",
    userName: "",
    password: "",
    nameRole: "",
  });

  useEffect(() => {
    const fetchAuthManagement = async () => {
      const authManagementRef = firebase
        .firestore()
        .collection("authManagements")
        .doc(id);
      const authManagementSnapshot = await authManagementRef.get();

      if (authManagementSnapshot.exists) {
        const authManagementData =
          authManagementSnapshot.data() as AuthManagementData;
        setAuthManagement((prevAuthManagement) => ({
          ...prevAuthManagement,
          ...authManagementData,
          role: authManagementData.role || null,
        }));
      }
    };

    fetchAuthManagement();
  }, [id]);

  const addNoteToCollection = async (action: string) => {
    const noteUsersCollection = firebase.firestore().collection("noteUsers");
    const ipAddress = await fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => data.ip)
      .catch((error) => {
        console.error("Failed to fetch IP address:", error);
        return "";
      });

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

  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const handleUpdateAuthManagement = async () => {
    if (typeof id === "string") {
      message.success(
        `Cập nhật thông tin tài khoản: ${authManagement.userName} thành công!`
      );
      await addNoteToCollection(
        `Cập nhật thông tin tài khoản: ${authManagement.userName}`
      );
      try {
        dispatch(updateAuthManagement(id, authManagement));
        console.log("Service updated successfully!");
        window.location.href = "/authManagement";
      } catch (error) {
        console.error("Error updating service:", error);
      }
    }
  };

  useEffect(() => {
    const fetchAuthManagement = async () => {
      const authManagementRef = firebase
        .firestore()
        .collection("authManagements")
        .doc(id);
      const authManagementSnapshot = await authManagementRef.get();

      if (authManagementSnapshot.exists) {
        const authManagementData =
          authManagementSnapshot.data() as AuthManagementData;
        setAuthManagement((prevAuthManagement) => ({
          ...prevAuthManagement,
          ...authManagementData,
          role: authManagementData.role || null,
        }));
      }
    };

    fetchAuthManagement();
  }, [id]);

  //----------------------

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

            if (roleRef) {
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
  }, []);

  const [roleValue, setRoleValue] = useState<string | null>(null);
  useEffect(() => {
    const fetchRoleData = async () => {
      if (authManagement.role) {
        const roleRef = authManagement.role;
        const roleSnapshot = await roleRef.get();
        if (roleSnapshot.exists) {
          const roleData = roleSnapshot.data();
          if (roleData && roleData.nameRole) {
            const roleName = roleData.nameRole;
            setRoleValue(roleName);
          }
        }
      }
    };

    fetchRoleData();
  }, [authManagement]);

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "0px 16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbThree
                  text="Cài đặt hệ thống"
                  text2="Quản lý tài khoản"
                  href="/authManagement"
                  text3="Cập nhật tài khoản"
                />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Account />
                </span>
              </div>
            </div>
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Quản lý tài khoản</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140 }}>
                <h6 style={{ color: "#FF7506" }}>Thông tin tài khoản</h6>
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Họ tên: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={authManagement.fullName}
                              onChange={(e) =>
                                setAuthManagement({
                                  ...authManagement,
                                  fullName: e.target.value,
                                })
                              }
                              placeholder="Nhập họ và tên"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Số điện thoại:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={authManagement.phone}
                              onChange={(e) =>
                                setAuthManagement({
                                  ...authManagement,
                                  phone: e.target.value,
                                })
                              }
                              placeholder="Nhập số điện thoại"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Email: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={authManagement.email}
                              onChange={(e) =>
                                setAuthManagement({
                                  ...authManagement,
                                  email: e.target.value,
                                })
                              }
                              placeholder="Nhập email"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Vai trò: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Select value={roleValue}>
                              {authManagementData.map((authManagement) => (
                                <Select.Option
                                  key={authManagement.id}
                                  value={authManagement.role}
                                >
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tên đăng nhập:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={authManagement.userName}
                              onChange={(e) =>
                                setAuthManagement({
                                  ...authManagement,
                                  userName: e.target.value,
                                })
                              }
                              placeholder="Nhập tên đăng nhập"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Mật khẩu:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input.Password
                              value={authManagement.password}
                              onChange={(e) =>
                                setAuthManagement({
                                  ...authManagement,
                                  password: e.target.value,
                                })
                              }
                              placeholder="Nhập mật khẩu"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Nhập lại mật khẩu:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input.Password
                              value={authManagement.password}
                              onChange={(e) =>
                                setAuthManagement({
                                  ...authManagement,
                                  password: e.target.value,
                                })
                              }
                              placeholder="Nhập lại mật khẩu"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tình trạng:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Select
                              placeholder="Chọn tình trạng"
                              value={authManagement.isActive}
                              onChange={(value) =>
                                setAuthManagement({
                                  ...authManagement,
                                  isActive: value,
                                })
                              }
                            >
                              <Select.Option value="active">
                                Hoạt động
                              </Select.Option>
                              <Select.Option value="inactive">
                                Ngưng hoạt động
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5 pb-3 text-right">
                      <span style={{ color: "#FF7506" }}>*</span>{" "}
                      <small>Là trường hợp thông tin bắt buộc</small>
                    </div>
                  </div>
                </Form>
              </Card>
              <div className="col-6 text-center offset-3 mt-3">
                <Form.Item>
                  <Button
                    danger
                    htmlType="submit"
                    href="/authManagement"
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
                    onClick={handleUpdateAuthManagement}
                  >
                    Cập nhật
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default UpdateAuthManagements;
