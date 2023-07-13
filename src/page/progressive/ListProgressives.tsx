import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  DatePicker,
  Input,
  Layout,
  Select,
  Space,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";

import SlideMain from "../../containers/SlideMain";
import BreadCrumbTwo from "../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../components/User/Account";
import "../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const { Content } = Layout;

const renderStatus = (status: string) => {
  let color = "";
  let text = "";

  if (status === "Đã bỏ qua") {
    color = "#FF0000"; // Đỏ
    text = "Đã bỏ qua";
  } else if (status === "Đang chờ") {
    color = "#FFA500"; // Cam
    text = "Đang chờ";
  } else if (status === "Đã sử dụng") {
    color = "#008000"; // Xanh lá cây
    text = "Đã sử dụng";
  }

  return <Badge color={color} text={text} />;
};

interface ProgressiveData {
  id: string;
  number: string;
  nameCustomer: string;
  timeCreate: string;
  deadLineUsed: string;
  status: string;
  service: string;
  fullName: string;
  authManagementId: string;
  typeDevice: string;
  nameService:
    | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
    | string;
}

interface ServiceData {
  id: string;
  nameService: string;
}

interface DeviceData {
  id: string;
  typeDevice: string;
}

function ListProgressives() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filterNameService, setFilterNameService] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterTypeDevice, setFilterTypeDevice] = useState<string>("all");
  //-------
  const [serviceData, setServiceData] = useState<ServiceData[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const serviceRef = firebase.firestore().collection("services");
      const snapshot = await serviceRef.get();
      setServiceData(
        snapshot.docs.map((doc) => {
          const service = doc.data() as ServiceData;
          service.id = doc.id;
          return service;
        })
      );
    };

    fetchServices();
  }, []);
  //------------

  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const deviceRef = firebase.firestore().collection("devices");
      const snapshot = await deviceRef.get();
      const uniqueDevices = new Set<string>();

      snapshot.docs.forEach((doc) => {
        const device = doc.data() as DeviceData;
        device.id = doc.id;
        uniqueDevices.add(device.typeDevice);
      });

      const devices = Array.from(uniqueDevices).map((typeDevice) => ({
        id: typeDevice,
        typeDevice: typeDevice,
      }));

      setDeviceData(devices);
    };

    fetchDevices();
  }, []);
  //------------
  const [progressiveData, setProgressiveData] = useState<ProgressiveData[]>([]);

  useEffect(() => {
    const fetchProgressive = async () => {
      const progressiveRef = firebase.firestore().collection("progressives");
      const snapshot = await progressiveRef.get();
      setProgressiveData(
        await (
          await Promise.all(
            snapshot.docs.map(async (doc) => {
              const progressive = doc.data() as ProgressiveData;
              progressive.id = doc.id;

              const serviceRef = progressive.nameService;
              if (
                serviceRef !== null &&
                serviceRef instanceof firebase.firestore.DocumentReference
              ) {
                const serviceDoc = await serviceRef.get();
                if (serviceDoc.exists) {
                  const serviceData = serviceDoc.data();
                  if (serviceData && serviceData.nameService) {
                    const nameService = serviceData.nameService;
                    progressive.nameService = nameService;
                  }
                }
              }

              const authManagementId = progressive.authManagementId;
              if (authManagementId) {
                // Fetch the associated device document
                const deviceRef = firebase
                  .firestore()
                  .collection("devices")
                  .where("authManagementId", "==", authManagementId);
                const deviceSnapshot = await deviceRef.get();

                if (!deviceSnapshot.empty) {
                  const deviceData = deviceSnapshot.docs[0].data();
                  const typeDevice = deviceData.typeDevice;
                  progressive.typeDevice = typeDevice;
                }
              }

              return progressive;
            })
          )
        ).sort((a, b) => Number(a.number) - Number(b.number)) // Sắp xếp theo STT tăng dần
      );
    };

    fetchProgressive();
  }, []);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const filteredAuthManagementData = progressiveData
    .filter((progressive) =>
      progressive.nameService
        .toString()
        .toLowerCase()
        .includes(searchKeyword.toLowerCase())
    )
    .filter((progressive) => {
      if (filterNameService === "all") {
        return true;
      } else {
        return progressive.nameService === filterNameService;
      }
    })
    .filter((progressive) => {
      if (filterStatus === "all") {
        return true;
      } else {
        return progressive.status === filterStatus;
      }
    })
    .filter((progressive) => {
      if (filterTypeDevice === "all") {
        return true;
      } else {
        return progressive.typeDevice === filterTypeDevice;
      }
    });

  const handleFilterChangeNameService = (value: string) => {
    setFilterNameService(value);
  };

  const handleFilterChangeStatus = (value: string) => {
    setFilterStatus(value);
  };

  const handleFilterChangeTypeDevice = (value: string) => {
    setFilterTypeDevice(value);
  };

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbTwo text="Cấp số" text2="Danh sách cấp số" />
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
            <div className="row mt-3 justify-content-center">
              <div className="col-2">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Tên dịch vụ</label>
                  </div>
                  <div className="col-12">
                    <Select
                      size="large"
                      defaultValue="all"
                      style={{ width: 170 }}
                      onChange={handleFilterChangeNameService}
                      value={filterNameService} // Thêm giá trị value để đồng bộ giá trị hiển thị
                    >
                      <Select.Option value="all">Tất cả</Select.Option>
                      {serviceData.map((service) => (
                        <Select.Option key={service.id} value={service.nameService}>
                          {service.nameService}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col-2 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Tình trạng</label>
                  </div>
                  <div className="col-12">
                    <Select
                      size="large"
                      defaultValue="all"
                      style={{ width: 170 }}
                      onChange={handleFilterChangeStatus}
                      value={filterStatus} // Thêm giá trị value để đồng bộ giá trị hiển thị
                    >
                      <Select.Option value="all">Tất cả</Select.Option>
                      <Select.Option value="Đang chờ">Đang chờ</Select.Option>
                      <Select.Option value="Đã sử dụng">
                        Đã sử dụng
                      </Select.Option>
                      <Select.Option value="Bỏ qua">Bỏ qua</Select.Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col-2 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Nguồn cấp</label>
                  </div>
                  <div className="col-12">
                    <Select
                      size="large"
                      defaultValue="all"
                      style={{ width: 170 }}
                      onChange={handleFilterChangeTypeDevice}
                      value={filterTypeDevice} // Thêm giá trị value để đồng bộ giá trị hiển thị
                    >
                      <Select.Option value="all">Tất cả</Select.Option>
                      {deviceData.map((device) => (
                        <Select.Option
                          key={device.id}
                          value={device.typeDevice}
                        >
                          {device.typeDevice}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Chọn thời gian</label>
                  </div>
                  <div className="col">
                    <DatePicker size="large" style={{ width: 130 }} />
                    <img
                      style={{ width: 15 }}
                      src="../assets/image/arrow-right.png"
                      alt=""
                    />
                    <DatePicker size="large" style={{ width: 130 }} />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="row" style={{ width: 200 }}>
                  <div className="col-12">
                    <label htmlFor="">Từ khóa</label>
                  </div>
                  <div className="col-12">
                    <Input
                      size="large"
                      placeholder="Nhập từ khóa"
                      suffix={
                        <Space>
                          <SearchOutlined
                            className="d-flex align-items-center justify-content-center"
                            style={{ color: "#FF7506" }}
                          />
                        </Space>
                      }
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-11 mt-3">
                <Table
                  dataSource={filteredAuthManagementData}
                  pagination={{ pageSize: 5 }}
                  bordered
                  rowClassName={() => "table-row"}
                  className="mb-3"
                >
                  <Column
                    title={<span className="table-title">STT</span>}
                    dataIndex="number"
                    key="number"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Tên khách hàng</span>}
                    dataIndex="fullName"
                    key="fullName"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Tên dịch vụ</span>}
                    dataIndex="nameService"
                    key="nameService"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Thời gian cấp</span>}
                    dataIndex="timeCreate"
                    key="timeCreate"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Hạn sử dụng</span>}
                    dataIndex="deadLineUsed"
                    key="deadLineUsed"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Trạng thái</span>}
                    dataIndex="status"
                    key="status"
                    render={(status: string) => renderStatus(status)}
                  />
                  <Column
                    title={<span className="table-title">Nguồn cấp</span>}
                    dataIndex="typeDevice"
                    key="typeDevice"
                  />
                  <Column
                    title=""
                    dataIndex="ct"
                    key="ct"
                    render={(_: any, record: { id: string }) => (
                      <>
                        <Link to={`/detailProgressive/${record.id}`}>
                          Chi tiết
                        </Link>
                      </>
                    )}
                  />
                </Table>
              </div>
              <div className="col-1 mt-3">
                <Link to={"/addProgressive"}>
                  <Card className="fixed-card text-center">
                    <img src="../assets/image/add-square.png" alt="" />
                    <p className="fw-bold" style={{ fontSize: 10 }}>
                      Cấp số mới
                    </p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ListProgressives;
