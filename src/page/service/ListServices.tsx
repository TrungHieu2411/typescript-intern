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
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filterIsActive, setFilterIsActive] = useState<string>("all");

  //----------------------------------------
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const serviceData = useSelector(
    (state: RootState) => state.firestoreServiceData.data
  ) as ServiceData[];
  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  //----------------------------------------
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const filteredRoleManagementData = serviceData
    .filter((service) =>
      service.nameService.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .filter((auth) => {
      if (filterIsActive === "all") {
        return true;
      } else {
        return auth.isActive === filterIsActive;
      }
    });

  const handleFilterChange = (value: string) => {
    setFilterIsActive(value);
  };
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Layout.Content style={{ margin: "16px" }}>
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
                    <DatePicker size="large" style={{ width: 130 }} />
                    <img
                      style={{ width: 15 }}
                      src="./assets/image/arrow-right.png"
                      alt=""
                    />
                    <DatePicker size="large" style={{ width: 130 }} />
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
                  dataSource={filteredRoleManagementData}
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
