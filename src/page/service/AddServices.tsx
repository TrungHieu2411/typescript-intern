import { useState } from "react";
import { Button, Card, Checkbox, Form, Input, Layout, message } from "antd";
import TextArea from "antd/es/input/TextArea";

import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";
import SlideMain from "../../containers/SlideMain";
import "../../assets/css/style.css";


import Account from "../../components/User/Account";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import moment from "moment";
import { createService } from "../../redux/service/serviceSlice";
import { useDispatch } from "react-redux";
import { firestore } from "../../firebase/firebaseConfig";

interface ServiceData {
  id: string;
  codeService: string;
  nameService: string;
  description: string;
}

function AddServices() {
  //------------
  const [newService, setNewService] = useState<ServiceData>({
    id: "",
    codeService: "",
    nameService: "",
    description: "",
  });
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
//--------------------------------
  const dispatch = useDispatch();
  const onFinish = async () => {
    message.success(`Thêm mới thiết bị ${newService.codeService} thành công!`);
    await dispatch(createService(newService) as any);
    // Thêm ghi chú vào collection noteUsers
    await addNoteToCollection(`Thêm mới dịch vụ: ${newService.codeService}`);
  };
  
//--------------------------------
  const [form] = Form.useForm();

  const handleAddService = () => {
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

  const [isAutoIncrement, setIsAutoIncrement] = useState<boolean>(false);

  const handleAutoIncrementChange = (e: CheckboxChangeEvent) => {
    setIsAutoIncrement(e.target.checked);
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
                  text="Dịch vụ"
                  text2="Danh sách dịch vụ"
                  href="service"
                  text3="Thêm dịch vụ"
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
                <Form className="mt-3" form={form} onFinish={onFinish}>
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Mã dịch vụ:{" "}
                            <span style={{ color: "#FF7506" }}>*</span>
                          </label>
                          <Form.Item
                            name="codeService"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập mã dịch vụ!",
                              },
                            ]}
                          >
                            <Input
                              value={newService.codeService}
                              onChange={(e) =>
                                setNewService({
                                  ...newService,
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
                          <Form.Item
                            name="nameService"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên dịch vvụ!",
                              },
                            ]}
                          >
                            <Input
                              value={newService.nameService}
                              onChange={(e) =>
                                setNewService({
                                  ...newService,
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
                      <Form.Item
                        name="description"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mô tả!",
                          },
                        ]}
                      >
                        <TextArea
                          rows={5}
                          placeholder="Mô tả dịch vụ"
                          value={newService.description}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              description: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
                <h6 style={{ color: "#FF7506" }}>Quy tắc cấp số</h6>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Checkbox
                          className="blue-checkbox"
                          id="tangTuDong"
                          checked={isAutoIncrement}
                          onChange={handleAutoIncrementChange}
                        >
                          Tăng tự động
                        </Checkbox>
                      </td>
                      <td>
                        <Input
                          value={"0001"}
                          className="mb-2"
                          style={{ width: 58, height: 40 }}
                        />
                      </td>
                      <td>
                        <p className="mx-2 mb-2">đến</p>
                      </td>
                      <td>
                        <Input
                          value={"9999"}
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
                          className="mb-2"
                          style={{ width: 58, height: 40 }}
                          value={"0001"}
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
                          className="mb-2"
                          style={{ width: 58, height: 40 }}
                          value={"0001"}
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
                  </tbody>
                </table>
                <div className="mt-3 mb-3 text-right">
                  <span style={{ color: "#FF7506" }}>*</span>{" "}
                  <small>Là trường hợp thông tin bắt buộc</small>
                </div>
              </Card>
              <div className="col-6 text-center offset-3 mb-3 mt-3">
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
                    onClick={handleAddService}
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

export default AddServices;
