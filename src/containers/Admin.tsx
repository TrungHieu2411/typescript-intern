import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Layout,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import { CameraOutlined } from "@ant-design/icons";
import SlideMain from "./SlideMain";
import "../assets/css/style.css";
import firebase from "firebase/compat/app";
import { useParams } from "react-router-dom";
import Account from "../components/User/Account";
import { getAuthMangement } from "../redux/authManagement/authManagementSlice";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

const { Content } = Layout;

interface UserData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: firebase.firestore.DocumentReference | null;
  isActive: string;
  image: string; // Thêm trường image vào đây
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

  const handleUpdateAuthManagement = () => {
    const userRef = firebase.firestore().collection("authManagements").doc(id);
    const updatedUser = {
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      image: imageUrl || user.image,
      userName: user.userName,
      password: user.password,
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
    setImageFile(file);
    message.loading("Đang tải ảnh...");
    try {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`authManagements/${file.name}`);
      const uploadTaskSnapshot = await imageRef.put(file);
      const imageUrl = await uploadTaskSnapshot.ref.getDownloadURL();

      setImageUrl(imageUrl);
      setLoadingImage(false);
      message.success("Đã tải ảnh thành công!");

      // Cập nhật trường 'image' của đối tượng 'user'
      setUser({
        ...user,
        image: imageUrl,
      });
    } catch (error) {
      setLoadingImage(false);
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = firebase
        .firestore()
        .collection("authManagements")
        .doc(id);
      const userSnapshot = await userRef.get();

      if (userSnapshot.exists) {
        const userData = userSnapshot.data() as UserData;
        setUser(userData);
        setImageUrl(userData.image);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const updateAuthManagement = () => {
      if (imageUrl) {
        handleUpdateAuthManagement();
      }
    };
  
    updateAuthManagement();
  }, [imageUrl]);
  
  

  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const authManagementData = useSelector(
    (state: RootState) => state.firestoreProgressiveData.data
  ) as UserData[];
  useEffect(() => {
    dispatch(getAuthMangement());
  }, []);

  const [roleValue, setRoleValue] = useState<string | null>(null);
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
                  <Account />
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
                          preview={true}
                          style={{
                            borderRadius: "50%",
                            width: 285,
                            height: 285,
                          }}
                          placeholder={
                            loadingImage ? (
                              <Spin tip="Đang tải ảnh, vui lòng chờ..." />
                            ) : (
                              <img
                                src={imageUrl || "../assets/image/logo.jpg"}
                                alt=""
                              />
                            )
                          }
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
