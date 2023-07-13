import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Form, Input, Layout, message } from "antd";
import TextArea from "antd/es/input/TextArea";

import Account from "../../../components/User/Account";
import SlideMain from "../../../containers/SlideMain";
import BreadCrumbThree from "../../../components/BreadCrumb/BreadCrumbThree";
import "../../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";
import { useParams } from "react-router-dom";
import moment from "moment";

const { Content } = Layout;

interface RoleManagementData {
  nameRole: string;
  description: string;
}

function UpdateRoleManagements() {
  const { id } = useParams<{ id: string }>();

  //-------------
  const [roleManagement, setRoleManagement] = useState<RoleManagementData>({
    nameRole: "",
    description: "",
  });
  const [groupA, setGroupA] = useState<boolean[]>([]);
  const [groupB, setGroupB] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchRoleManagement = async () => {
      const roleManagementRef = firebase
        .firestore()
        .collection("roles")
        .doc(id);
      const roleManagementSnapshot = await roleManagementRef.get();

      if (roleManagementSnapshot.exists) {
        const roleManagementData =
          roleManagementSnapshot.data() as RoleManagementData;
        setRoleManagement(roleManagementData);
      }
    };

    fetchRoleManagement();
  }, [id]);

  //-------------

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

  const handleUpdateRoleManagement = async () => {
    const roleManagementRef = firebase.firestore().collection("roles").doc(id);
    const updatedRoleManagement = {
      nameRole: roleManagement.nameRole,
      description: roleManagement.description,
      permissions: {
        groupA,
        groupB,
      },
    };
    message.success(
      `Cập nhật thông tin vai trò ${roleManagement.nameRole} thành công!`
    );
    // Thêm ghi chú vào collection noteUsers
    await addNoteToCollection(`Cập nhật vai trò: ${roleManagement.nameRole}`);

    roleManagementRef
      .update(updatedRoleManagement)
      .then(() => {
        console.log("RoleManagement updated successfully!");
        window.location.href = "/roleManagement";
      })
      .catch((error) => {
        console.error("Error updating RoleManagement:", error);
      });
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
                  text="Cài đặt hệ thống"
                  text2="Quản lý vai trò"
                  href="/roleManagement"
                  text3="Cập nhật vai trò"
                />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Account />
                </span>
              </div>
            </div>
            <div className="pt-5">
              <h4 style={{ color: "#FF7506" }}>Danh sách vai trò</h4>
            </div>
            <div className="mt-4 pt-2">
              <Card>
                <h6 style={{ color: "#FF7506" }}>Thông tin vai trò</h6>
                <Form className="mt-3 mb-2">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tên vai trò:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input
                              value={roleManagement.nameRole}
                              onChange={(e) =>
                                setRoleManagement({
                                  ...roleManagement,
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
                          <Form.Item className="">
                            <TextArea
                              rows={5}
                              placeholder="Mô tả vai trò"
                              value={roleManagement.description}
                              onChange={(e) =>
                                setRoleManagement({
                                  ...roleManagement,
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
                                id="tangTuDong"
                                checked={groupA[0]}
                                onChange={(e) =>
                                  setGroupA([
                                    e.target.checked,
                                    ...groupA.slice(1),
                                  ])
                                }
                              >
                                Tất cả
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                id="prefix"
                                checked={groupA[1]}
                                onChange={(e) =>
                                  setGroupA([
                                    ...groupA.slice(0, 1),
                                    e.target.checked,
                                    ...groupA.slice(2),
                                  ])
                                }
                              >
                                Chức năng x
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                id="suffix"
                                checked={groupA[2]}
                                onChange={(e) =>
                                  setGroupA([
                                    ...groupA.slice(0, 2),
                                    e.target.checked,
                                    ...groupA.slice(3),
                                  ])
                                }
                              >
                                Chức năng y
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox"
                                id="resetMoiNgay"
                                checked={groupA[3]}
                                onChange={(e) =>
                                  setGroupA([
                                    ...groupA.slice(0, 3),
                                    e.target.checked,
                                  ])
                                }
                              >
                                Chức năng z
                              </Checkbox>
                            </td>
                          </tr>
                        </table>
                        <h6 style={{ color: "#FF7506" }} className="mt-4">
                          Nhóm chức năng B
                        </h6>
                        <table>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                id="resetMoiNgay"
                                onChange={(e) =>
                                  setGroupB([
                                    e.target.checked,
                                    ...groupB.slice(1),
                                  ])
                                }
                              >
                                Tất cả
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                id="tangTuDong"
                                onChange={(e) =>
                                  setGroupB([
                                    ...groupB.slice(0, 1),
                                    e.target.checked,
                                    ...groupB.slice(2),
                                  ])
                                }
                              >
                                Chức năng x
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
                                id="prefix"
                                checked={groupB[2]}
                                onChange={(e) =>
                                  setGroupB([
                                    ...groupB.slice(0, 2),
                                    e.target.checked,
                                    ...groupB.slice(3),
                                  ])
                                }
                              >
                                Chức năng y
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox"
                                id="suffix"
                                checked={groupB[3]}
                                onChange={(e) =>
                                  setGroupB([
                                    ...groupB.slice(0, 3),
                                    e.target.checked,
                                  ])
                                }
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
                    onClick={handleUpdateRoleManagement}
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

export default UpdateRoleManagements;
