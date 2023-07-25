import { useState } from "react";
import { Button, Card, Checkbox, Form, Input, Layout, message } from "antd";
import TextArea from "antd/es/input/TextArea";

import SlideMain from "../../../containers/SlideMain";
import Account from "../../../components/User/Account";
import BreadCrumbThree from "../../../components/BreadCrumb/BreadCrumbThree";
import "../../../assets/css/style.css";


import moment from "moment";
import { useDispatch } from "react-redux";
import { createRoleManagement } from "../../../redux/roleManagement/roleManagementSlice";
import { firestore } from "../../../firebase/firebaseConfig";

const { Content } = Layout;

interface RoleManagementData {
  id: string;
  nameRole: string;
  description: string;
  userNumber: number;
}

function AddRoleManagements() {
  //-------------
  const [newRoleManagement, setNewRoleManagement] =
    useState<RoleManagementData>({
      nameRole: "",
      description: "",
      userNumber: 0,
      id: "",
    });
  const [groupA, setGroupA] = useState<boolean[]>([]);
  const [groupB, setGroupB] = useState<boolean[]>([]);

  //-------------

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
  const dispatch = useDispatch();
  const onFinish = async () => {
    message.success(
      `Thêm mới vai trò ${newRoleManagement.nameRole} thành công!`
    );
    await dispatch(createRoleManagement(newRoleManagement) as any);
    // Thêm ghi chú vào collection noteUsers
    await addNoteToCollection(
      `Thêm mới vai trò: ${newRoleManagement.nameRole}`
    );
  };
  //----------------------------------------
  const [form] = Form.useForm();

  const handleAddRoleManagement = () => {
    // Kiểm tra và submit form
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

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
                  text2="Quản lý vai trò"
                  href="/roleManagement"
                  text3="Thêm vai trò"
                />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Account />
                </span>
              </div>
            </div>
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Danh sach vai trò</h4>
            </div>
            <div className="mt-4 pt-2">
              <Card style={{width: 1140}}>
                <h6 style={{ color: "#FF7506" }}>Thông tin vai trò</h6>
                <Form className="mt-3 " form={form} onFinish={onFinish}>
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tên vai trò:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item
                            name="nameRole"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên vai trò!",
                              },
                            ]}
                          >
                            <Input
                              value={newRoleManagement.nameRole}
                              onChange={(e) =>
                                setNewRoleManagement({
                                  ...newRoleManagement,
                                  nameRole: e.target.value,
                                })
                              }
                              placeholder="Nhập tên vai trò"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Mô tả: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item
                            name="description"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập mô tả vai trò!",
                              },
                            ]}
                          >
                            <TextArea
                              rows={5}
                              placeholder="Mô tả vai trò"
                              value={newRoleManagement.description}
                              onChange={(e) =>
                                setNewRoleManagement({
                                  ...newRoleManagement,
                                  description: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="text-right">
                        <span style={{ color: "#FF7506" }}>*</span>{" "}
                        <small>Là trường hợp thông tin bắt buộc</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Phân quyền chức năng:{" "}
                        <span style={{ color: "#FF7506" }}>*</span>
                      </label>
                      <Card style={{ background: "#FFF2E7" }} className="">
                        <h6 style={{ color: "#FF7506" }}>Nhóm chức năng A</h6>
                        <table>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                checked={groupA[0]}
                                onChange={(e) =>
                                  setGroupA([
                                    e.target.checked,
                                    ...groupA.slice(1),
                                  ])
                                }
                                id="tangTuDong"
                              >
                                Tất cả
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                checked={groupA[1]}
                                onChange={(e) =>
                                  setGroupA([
                                    ...groupA.slice(0, 1),
                                    e.target.checked,
                                    ...groupA.slice(2),
                                  ])
                                }
                                id="prefix"
                              >
                                Chức năng x
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                checked={groupA[2]}
                                onChange={(e) =>
                                  setGroupA([
                                    ...groupA.slice(0, 2),
                                    e.target.checked,
                                    ...groupA.slice(3),
                                  ])
                                }
                                id="suffix"
                              >
                                Chức năng y
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox"
                                checked={groupA[3]}
                                onChange={(e) =>
                                  setGroupA([
                                    ...groupA.slice(0, 3),
                                    e.target.checked,
                                  ])
                                }
                                id="resetMoiNgay"
                              >
                                Chức năng z
                              </Checkbox>
                            </td>
                          </tr>
                        </table>
                        <h6 style={{ color: "#FF7506" }} className="mt-3">
                          Nhóm chức năng B
                        </h6>
                        <table>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                checked={groupB[0]}
                                onChange={(e) =>
                                  setGroupB([
                                    e.target.checked,
                                    ...groupB.slice(1),
                                  ])
                                }
                                id="resetMoiNgay"
                              >
                                Tất cả
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                checked={groupB[1]}
                                onChange={(e) =>
                                  setGroupB([
                                    ...groupB.slice(0, 1),
                                    e.target.checked,
                                    ...groupB.slice(2),
                                  ])
                                }
                                id="tangTuDong"
                              >
                                Chức năng x
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                checked={groupB[2]}
                                onChange={(e) =>
                                  setGroupB([
                                    ...groupB.slice(0, 2),
                                    e.target.checked,
                                    ...groupB.slice(3),
                                  ])
                                }
                                id="prefix"
                              >
                                Chức năng y
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-3"
                                checked={groupB[3]}
                                onChange={(e) =>
                                  setGroupB([
                                    ...groupB.slice(0, 3),
                                    e.target.checked,
                                  ])
                                }
                                id="suffix"
                              >
                                Chức năng z
                              </Checkbox>
                            </td>
                          </tr>
                        </table>
                      </Card>
                    </div>
                  </div>
                </Form>
              </Card>
              <div className="col-6 text-center offset-3 mt-3">
                <Form.Item>
                  <Button
                    danger
                    htmlType="submit"
                    href="/roleManagement"
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
                    onClick={handleAddRoleManagement}
                  >
                    Thêm dịch vụ
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

export default AddRoleManagements;
