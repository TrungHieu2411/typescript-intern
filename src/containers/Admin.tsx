import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Layout,
  Popover,
  Select,
  Upload,
} from "antd";
import {
  BellFilled,
  CameraOutlined,
} from "@ant-design/icons";
import SlideMain from "./SlideMain";
import "../assets/css/style.css";
import firebase from "firebase/compat/app";
import { useParams } from "react-router-dom";

const { Content } = Layout;

const popoverContent = <h4>dadasd</h4>;

interface UserData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: firebase.firestore.DocumentReference | null;
  isActive: string;
  image: string;
  userName: string;
  password: string;
}

function Admin() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserData>({
    id: "",
    fullName: "",
    phone: "",
    email: "",
    role: null,
    isActive: "",
    image: "",
    userName: "",
    password: "",
  });

  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<any>(null);
  const [roleValue, setRoleValue] = useState<string | null>(null);

 // eslint-disable-next-line react-hooks/exhaustive-deps
 const handleUpdateAuthManagement = () => {
  const userRef = firebase.firestore().collection("authManagements").doc(id);
  const updatedUser: UserData = {
    fullName: user.fullName,
    phone: user.phone,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    image: imageUrl || user.image,
    userName: user.userName,
    password: user.password,
    id: user.id,
  };

  userRef
    .update(updatedUser)
    .then(() => {
      console.log("AuthManagement updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating AuthManagement:", error);
    });
};


  const handleImageUpload = async (file: any) => {
    setLoadingImage(true);
    setImageFile(file);

    try {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`authManagements/${file.name}`);
      const uploadTaskSnapshot = await imageRef.put(file);
      const imageUrl = await uploadTaskSnapshot.ref.getDownloadURL();

      setImageUrl(imageUrl);
      setLoadingImage(false);
    } catch (error) {
      setLoadingImage(false);
    }
  };

  const storedUserId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchUser = async () => {
      const userRef = firebase
        .firestore()
        .collection("authManagements")
        .doc(storedUserId || id);

      const userSnapshot = await userRef.get();
      
      if (userSnapshot.exists) {
        const userData = userSnapshot.data() as UserData;
        setUser(userData);
        setImageUrl(userData.image);
      }
    };

    fetchUser();
  }, [storedUserId, id]);

  useEffect(() => {
    const updateAuthManagement = () => {
      if (imageUrl) {
        handleUpdateAuthManagement();
      }
    };

    updateAuthManagement();
  }, [handleUpdateAuthManagement, imageUrl]);

  const [authManagementData, setAuthManagementData] = useState<UserData[]>([]);
  useEffect(() => {
    const fetchAuthManagement = async () => {
      const authManagementRef = firebase.firestore().collection("authManagements");
      const snapshot = await authManagementRef.get();
      setAuthManagementData(await Promise.all(snapshot.docs.map(async (doc) => {
        const authManagement = doc.data() as UserData;
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
      })))
    }
    fetchAuthManagement();
  }, []);

  useEffect(() => {
    const fetchRoleData = async () => {
      if (user.role) {
        const roleRef = user.role;
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
  }, [user]);

  const handleRoleChange = (value: string) => {
    setRoleValue(value);
    // Update user.role here if necessary
  };
  return (
    <Layout className="layout">
      <SlideMain />

      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col">
                <p className="fs-5" style={{ color: "#FF7506" }}>
                  Thông tin cá nhân
                </p>
              </div>
              <div className="col-auto">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Button
                    style={{ background: "#FFF2E7" }}
                    type="ghost"
                    shape="circle"
                    className="mb-5"
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
                  <img
                    className="mb-5"
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 10,
                      borderRadius: "50%",
                    }}
                    src={imageUrl || "../assets/image/logo.jpg"}
                    alt=""
                  />

                  <span className="ms-2 mb-5 me-4">
                    <p className="mb-0">Xin chào</p>
                    <p className="mb-0 fw-bold">{user.fullName}</p>
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-2 mx-5 pt-5">
              <Card className="mx-5">
                <div className="row">
                  <div className="col-4">
                    <div className="row text-center">
                      <div className="col-12" style={{ position: "relative" }}>
                        <Image
                          src={imageUrl || "../assets/image/logo.jpg"}
                          preview={false}
                          style={{
                            borderRadius: "50%",
                            width: 285,
                            height: 285,
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            right: "90px",
                            transform: "translate(50%, 50%)",
                          }}
                        >
                          <Button
                            style={{
                              background: "#FF7506",
                              color: "white",
                              width: 40,
                              height: 40,
                            }}
                            shape="circle"
                            icon={
                              <Upload
                                beforeUpload={handleImageUpload}
                                showUploadList={false}
                              >
                                <CameraOutlined
                                  className="d-flex align-items-center"
                                  style={{ fontSize: 28, color: "white" }}
                                />
                              </Upload>
                            }
                          />
                        </div>
                      </div>
                      <div className="col mt-4">
                        <h4>{user.fullName}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-8 mt-5">
                    <Form disabled>
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Tên người dùng:
                          </label>
                          <Form.Item className="">
                            <Input
                              value={user.fullName}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  fullName: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Tên đăng nhập:
                          </label>
                          <Form.Item className="">
                            <Input
                              value={user.userName}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  userName: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Số điện thoại:
                          </label>
                          <Form.Item className="">
                            <Input
                              value={user.phone}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Mật khẩu:
                          </label>
                          <Form.Item className="">
                            <Input
                              value={user.password}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  password: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Email:
                          </label>
                          <Form.Item className="">
                            <Input
                              value={user.email}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  email: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </div>
                        <div className="col-6">
                          <label htmlFor="" className="">
                            Vai trò:
                          </label>
                          <Form.Item className="">
                            <Select value={roleValue} onChange={handleRoleChange}>
                              {authManagementData.map((authManagement) => (
                                <Select.Option key={authManagement.id} value={authManagement.role}>
                                  
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;