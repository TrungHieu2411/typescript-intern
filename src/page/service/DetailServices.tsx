import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Layout,
  Pagination,
  Popover,
  Select,
  Space,
  Table,
} from "antd";
import { BellFilled, SearchOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

import SlideMain from "../../containers/SlideMain";
import "../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";
import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";
import Account from "../../components/User/Account";

const popoverContent = (
  <Card
    title="Thông báo"
    className="p-0 m-0"
    bordered={false}
    style={{ width: 270 }}
  ></Card>
);

const data = [
  {
    id: 1,
    name: "Thiết bị A",
    ipAddress: "192.168.1.1",
    isActive: "Đã hoàn thành",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 2,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: "Đã hoàn thành",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 3,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: "Đang thực hiện",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 4,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: "Vắng",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 5,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: "Đã hoàn thành",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 6,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: "Đang thực hiện",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 7,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: "Vắng",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  {
    id: 8,
    name: "Thiết bị B",
    ipAddress: "192.168.1.2",
    isActive: "Đã hoàn thành",
    ct: "Chi tiết",
    cn: "Cập nhật",
  },
  // ...Thêm dữ liệu của các thiết bị khác
];

interface ServiceData {
  codeService: string;
  nameService: string;
  description: string;
  progressiveId: string;
}

const renderIsActive = (status: string) => {
  let color = "";
  let text = "";

  if (status === "Vắng") {
    color = "#535261"; // Xanh lá cây
    text = "Vắng";
  } else if (status === "Đang thực hiện") {
    color = "#5490EB"; // Đỏ
    text = "Đang thực hiện";
  } else if (status === "Đã hoàn thành") {
    color = "#34CD26"; // Đỏ
    text = "Đã hoàn thành";
  }

  return <Badge color={color} text={text} />;
};

function DetailServices() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ServiceData>({
    codeService: "",
    nameService: "",
    description: "",
  progressiveId: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      const serviceRef = firebase.firestore().collection("services").doc(id);
      const serviceSnapshot = await serviceRef.get();

      if (serviceSnapshot.exists) {
        const serviceData = serviceSnapshot.data() as ServiceData;
        setService(serviceData);
      } 
    };
    fetchService();
  }, [id]);

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Layout.Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbThree text="Dịch vụ" text2="Danh sách dịch vụ" href="/service" text3="Chi tiết"/>
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
              <h4 style={{ color: "#FF7506" }}>Quản lý dịch vụ</h4>
            </div>
            <div className="row mt-3">
              <div className="col-4 mt-3">
                <Card style={{ height: 550 }}>
                  <h6 style={{ color: "#FF7506" }}>Thông tin dịch vụ</h6>
                  <Form className="mt-3">
                    <table>
                      <tr>
                        <td>
                          <label htmlFor="" className="mb-2 me-2">
                            Mã dịch vụ:
                          </label>
                        </td>
                        <td>
                          <label className="mb-2">
                            <small>{service.codeService}</small>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="" className="mb-2">
                            Tên dịch vụ:
                          </label>
                        </td>
                        <td>
                          <label className="mb-2">
                            <small>{service.nameService}</small>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="" className="mb-2">
                            Mô tả:
                          </label>
                        </td>
                        <td>
                          <label className="mb-2">
                            <small>{service.description}</small>
                          </label>
                        </td>
                      </tr>
                    </table>
                  </Form>
                  <h6 style={{ color: "#FF7506" }}>Quy tắc cấp số</h6>
                  <table>
                    <tr>
                      <td>
                        <label id="tangTuDong">Tăng tự động</label>
                      </td>
                      <td>
                        <Input
                          value="0001"
                          className="mb-2"
                          style={{ width: 58, height: 40 }}
                        />
                      </td>
                      <td>
                        <p className="mx-2 mb-2">đến</p>
                      </td>
                      <td>
                        <Input
                          value="0009"
                          className="mb-2"
                          style={{ width: 58, height: 40 }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label id="prefix">Prefix</label>
                      </td>
                      <td>
                        <Input
                          value="0001"
                          className="mb-2"
                          style={{ width: 58, height: 40 }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label id="resetMoiNgay">Reset mỗi ngày</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="">
                          <small>Ví dụ: 201-2001</small>
                        </label>
                      </td>
                    </tr>
                  </table>
                </Card>
              </div>
              <div className="col-7 mt-3">
                <Card style={{ height: 550 }}>
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="">Trạng thái</label>
                      <Select defaultValue="all" style={{ width: 140 }}>
                        <Select.Option value="all">Tất cả</Select.Option>
                        <Select.Option value="active">Đã hoàn thành</Select.Option>
                        <Select.Option value="inactive">
                          Đang thực hiện
                        </Select.Option>
                        <Select.Option value="inactive">
                          Vắng
                        </Select.Option>
                      </Select>
                    </div>

                    <div className="col-5 p-0">
                      <label htmlFor="">Chọn thời gian</label>

                      <div className="col-12">
                        <DatePicker style={{ width: 125 }} />
                        <img
                          style={{ width: 15 }}
                          src="../assets/image/arrow-right.png"
                          alt=""
                        />
                        <DatePicker style={{ width: 125 }} />
                      </div>
                    </div>

                    <div className="col-4">
                      <label htmlFor="">Từ khóa</label>
                      <Input
                        placeholder="Nhập từ khóa"
                        suffix={
                          <Space>
                            <SearchOutlined
                              className="d-flex align-items-center justify-content-center"
                              style={{ color: "#1890ff" }}
                            />
                          </Space>
                        }
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <Table
                      dataSource={data}
                      pagination={false}
                      size="small"
                      rowClassName={() => "table-row"}
                      className="custom-table mb-4 pb-3"
                    >
                      <Table.Column
                        title={<span className="table-title">Số thứ tự</span>}
                        dataIndex="id"
                        key="id"
                        render={(text: string) => <span>{text}</span>}
                      />
                      <Table.Column
                        title={<span className="table-title">Trạng thái</span>}
                        dataIndex="isActive"
                        key="isActive"
                        render={(isActive: string) => renderIsActive(isActive)}
                      />
                    </Table>
                  </div>
                  <Pagination
                    total={100}
                    showSizeChanger={false}
                    style={{ textAlign: "right" }}
                  />
                </Card>
              </div>
              <div className="col-1 mt-3">
                <Card className="fixed-card-service text-center">
                  <Link
                    to={`/editService/${id}`}
                    className="text-decoration-none"
                    style={{ color: "#FF7506" }}
                  >
                    <img src="../assets/image/edit-square.png" alt="" />
                    <p className=" fw-bold" style={{ fontSize: 9 }}>
                      Cập nhật danh sách
                    </p>
                  </Link>
                  <Divider className="px-4" />
                  <Link
                    to={"/service"}
                    className="text-decoration-none"
                    style={{ color: "#FF7506" }}
                  >
                    <img src="../assets/image/back-square.png" alt="" />
                    <p className="fw-bold" style={{ fontSize: 10 }}>
                      Quay lại
                    </p>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default DetailServices;
