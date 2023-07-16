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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getService, setData } from "../../redux/service/serviceSlice";
import { ThunkDispatch } from "redux-thunk";
import { getProgressive } from "../../redux/progressive/progressiveSlice";
import { getDevice } from "../../redux/device/deviceSlice";
import moment from "moment";
import "moment/locale/vi"; // Thay 'vi' bằng mã ngôn ngữ tương ứng nếu bạn muốn sử dụng ngôn ngữ khác
moment.locale("vi"); // Thay 'vi' bằng mã ngôn ngữ tương ứng nếu bạn muốn sử dụng ngôn ngữ khác

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

  //--------------------------------------------
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const serviceData = useSelector(
    (state: RootState) => state.firestoreServiceData.data
  ) as ServiceData[];
  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);
  //------------

  const deviceData = useSelector(
    (state: RootState) => state.firestoreDeviceData.data
  ) as DeviceData[];
  useEffect(() => {
    dispatch(getDevice());
  }, []);
  //------------

  const progressiveData = useSelector(
    (state: RootState) => state.firestoreProgressiveData.data
  ) as ProgressiveData[];
  useEffect(() => {
    dispatch(getProgressive());
  }, []);
  //--------------------------------------------

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
    })
    .filter((progressive) => {
      if (selectedDate === null) {
        return true;
      } else {
        // Lọc theo ngày đã chọn
        const selectedDateTime = selectedDate.getTime();
        const progressiveTime = new Date(progressive.timeCreate).getTime();
        return (
          progressiveTime >= selectedDateTime &&
          progressiveTime < selectedDateTime + 24 * 60 * 60 * 1000
        );
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
                        <Select.Option
                          key={service.id}
                          value={service.nameService}
                        >
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
                    <DatePicker
                      size="large"
                      style={{ width: 130 }}
                      // value={selectedDate ? moment(selectedDate) : null}
                      onChange={(date) =>
                        setSelectedDate(date ? date.toDate() : null)
                      }
                      format="DD/MM/YYYY" // Định dạng ngày tháng năm
                    />

                    <img
                      style={{ width: 15 }}
                      src="../assets/image/arrow-right.png"
                      alt=""
                    />
                    <DatePicker
                      size="large"
                      style={{ width: 130 }}
                      // value={selectedDate ? moment(selectedDate) : null}
                      onChange={(date) =>
                        setSelectedDate(date ? date.toDate() : null)
                      }
                      format="DD/MM/YYYY" // Định dạng ngày tháng năm
                    />
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
                  pagination={{ pageSize: 6 }}
                  bordered
                  rowClassName={() => "table-row"}
                  className="mb-2"
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
