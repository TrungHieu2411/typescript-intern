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
import { Link } from "react-router-dom";

import BreadCrumbTwo from "../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../components/User/Account";
import SlideMain from "../../containers/SlideMain";
import "../../assets/css/style.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getService } from "../../redux/service/serviceSlice";
import { ThunkDispatch } from "redux-thunk";
import dayjs from "dayjs";

const renderIsActive = (status: string) => {
  let color = "";
  let text = "";

  if (status === "Hoạt động") {
    color = "#008000"; // Xanh lá cây
    text = "Hoạt động";
  } else if (status === "Ngưng hoạt động") {
    color = "#FF0000"; // Đỏ
    text = "Ngưng hoạt động";
  }

  return <Badge color={color} text={text} />;
};

interface ServiceData {
  timeStamp: string | number | Date | null | undefined;
  number: string;
  progressiveId: string;
  isActive: string;
  authManagementId: string;
  id: string;
  codeService: string;
  nameService: string;
  description: string;
}
function ListService() {
  //----------------------------------------
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const serviceData = useSelector(
    (state: RootState) => state.firestoreServiceData.data
  ) as ServiceData[];
  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  //----------------------------------------
  const parseDate = (dateStr: any) => {
    const [day, month, year] = dateStr.split("/");
    const paddedDay = day.padStart(2, "0"); // Add leading zero if day has only one digit
    const paddedMonth = month.padStart(2, "0"); // Add leading zero if month has only one digit
    return dayjs(`${year}-${paddedMonth}-${paddedDay}`);
  };

  // State và hàm xử lý thay đổi thời gian
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const handleStartDateChange = (value: any) => {
    // Xử lý sự kiện khi người dùng chọn từ ngày
    setStartDate(value);
  };
    
  const handleEndDateChange = (value: any) => {
    // Xử lý sự kiện khi người dùng chọn tới ngày
    setEndDate(value);
  };

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filterIsActive, setFilterIsActive] = useState<string>("all");
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const handleFilterChange = (value: string) => {
    setFilterIsActive(value);
  };

  const filteredServiceData = serviceData
    .filter((service) =>
      service.nameService.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .filter((service) => {
      if (filterIsActive === "all") {
        return true;
      } else {
        return service.isActive === filterIsActive;
      }
    })
    .filter((service) => {
      // Custom filter function for timeStamp column
      const currentDate = parseDate(service.timeStamp); // Parse the timeStamp to dayjs object
      const start = startDate ? parseDate(startDate.format("DD/MM/YYYY")) : null;
      const end = endDate ? parseDate(endDate.format("DD/MM/YYYY")) : null;

      if (start && end) {
        return currentDate.isAfter(start) && currentDate.isBefore(end);
      } else if (start) {
        return currentDate.isAfter(start);
      } else if (end) {
        return currentDate.isBefore(end);
      }

      return true;
    });

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Layout.Content style={{ margin: "0px 16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbTwo text="Dịch vụ" text2="Danh sách dịch vụ" />
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
            <div className="row mt-3 justify-content-center">
              <div className="col-3">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Trạng thái hoạt động</label>
                  </div>
                  <div className="col-12">
                    <Select
                      size="large"
                      defaultValue="all"
                      style={{ width: 280 }}
                      onChange={handleFilterChange}
                      value={filterIsActive} // Thêm giá trị value để đồng bộ giá trị hiển thị
                    >
                      <Select.Option value="all">Tất cả</Select.Option>
                      <Select.Option value="Hoạt động">Hoạt động</Select.Option>
                      <Select.Option value="Ngưng hoạt động">
                        Ngưng hoạt động
                      </Select.Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col-5 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Chọn thời gian</label>
                  </div>
                  <div className="col">
                    <DatePicker
                      size="large"
                      style={{ width: 130 }}
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                    <img
                      style={{ width: 15 }}
                      src="./assets/image/arrow-right.png"
                      alt=""
                    />
                    <DatePicker
                      size="large"
                      style={{ width: 130 }}
                      value={endDate}
                      onChange={handleEndDateChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Từ khóa</label>
                  </div>
                  <div className="col-12">
                    <Input
                      size="large"
                      style={{ width: 280 }}
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
                  dataSource={filteredServiceData}
                  pagination={{ pageSize: 3 }}
                  bordered
                  rowClassName={() => "table-row"}
                  className="mb-2"
                >
                  <Table.Column
                    title={<span className="table-title">Mã dịch vụ</span>}
                    dataIndex="codeService"
                    key="codeService"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Table.Column
                    title={<span className="table-title">Tên dịch vụ</span>}
                    dataIndex="nameService"
                    key="nameService"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Table.Column
                    title={<span className="table-title">Mô tả</span>}
                    dataIndex="description"
                    key="description"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Table.Column
                    title={
                      <span className="table-title">Trạng thái hoạt động</span>
                    }
                    dataIndex="isActive"
                    key="isActive"
                    render={(isActive: string) => renderIsActive(isActive)}
                  />
                  <Table.Column
                    title=""
                    dataIndex="ct"
                    key="ct"
                    render={(_: any, record: { id: string }) => (
                      <>
                        <Link to={`/detailService/${record.id}`}>Chi tiết</Link>
                      </>
                    )}
                  />
                  <Table.Column
                    title=""
                    dataIndex="cn"
                    key="cn"
                    render={(_: any, record: { id: string }) => (
                      <>
                        <Link to={`/editService/${record.id}`}>Cập nhật</Link>
                      </>
                    )}
                  />
                </Table>
              </div>
              <div className="col-1 mt-3">
                <Link to={"/addService"}>
                  <Card className="fixed-card text-center">
                    <img src="../assets/image/add-square.png" alt="" />
                    <p className="fw-bold" style={{ fontSize: 10 }}>
                      Thêm dịch vụ
                    </p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default ListService;
