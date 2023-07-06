import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Form, Input, Layout, Popover } from "antd";
import { BellFilled } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import Account from "../../../components/User/Account";
import SlideMain from "../../../containers/SlideMain";
import BreadCrumbThree from "../../../components/BreadCrumb/BreadCrumbThree";
import "../../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";
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

interface RoleManagementData {
  nameRole: string;
  description: string;
}
function UpdateRoleManagements() {
  const { id } = useParams<{ id: string }>();
  const [roleManagement, setRoleManagement] = useState<RoleManagementData>({
    nameRole: "",
    description: "",
  });
  useEffect(() => {
    const fetchRoleManagement = async () => {
      const roleManagementRef = firebase
        .firestore()
        .collection("roleManagements")
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

  const handleUpdateRoleManagement = () => {
    const roleManagementRef = firebase
      .firestore()
      .collection("roleManagements")
      .doc(id);
    const updatedRoleManagement = {
      nameRole: roleManagement.nameRole,
      description: roleManagement.description,
    };

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
              <h4 style={{ color: "#FF7506" }}>Danh sach vai trò</h4>
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
                            placeholder="203" />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Mô tả: <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item className="">
                            <TextArea
                              rows={5}
                              placeholder="Mô tả dịch vụ"
                              maxLength={6}
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
                                className="blue-checkbox"
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
                                id="prefix"
                              >
                                Chức năng y
                              </Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Checkbox
                                className="blue-checkbox mb-2"
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
