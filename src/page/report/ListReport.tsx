import React, { useEffect, useState } from "react";
import { Badge, Card, DatePicker, Layout, Table } from "antd";
import { Link } from "react-router-dom";

import SlideMain from "../../containers/SlideMain";
import BreadCrumbTwo from "../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../components/User/Account";
import "../../assets/css/style.css";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getProgressive } from "../../redux/progressive/progressiveSlice";

const { Content } = Layout;
const { Column } = Table;

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
  typeDevice: string;
  id: string;
  number: string;
  nameService: firebase.firestore.DocumentReference | null;
  timeCreate: string;
  status: string;
  authManagementId: "";
}

function ListReport() {
  
//----------------------------------------
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const progressiveData = useSelector(
    (state: RootState) => state.firestoreProgressiveData.data
  ) as ProgressiveData[];
  useEffect(() => {
    dispatch(getProgressive());
  }, []);
//----------------------------------------

  const [filteredData, setFilteredData] = useState<ProgressiveData[]>([]);
  useEffect(() => {
    setFilteredData(progressiveData);
  }, [progressiveData]);
  
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { order } = sorter;

    let sortedData = [...progressiveData];

    sortedData = [...progressiveData].sort((a, b) => {
      if (sorter.field === "number") {
        return Number(a.number) - Number(b.number);
      } else if (sorter.field === "nameService") {
        const nameA = a.nameService
          ? a.nameService.toString().toLowerCase()
          : "";
        const nameB = b.nameService
          ? b.nameService.toString().toLowerCase()
          : "";
        return nameA.localeCompare(nameB);
      } else if (sorter.field === "timeCreate") {
        const dateA = new Date(a.timeCreate).getTime();
        const dateB = new Date(b.timeCreate).getTime();
        return dateA - dateB;
      } else if (sorter.field === "status") {
        const statusA = a.status.toLowerCase();
        const statusB = b.status.toLowerCase();
        return statusA.localeCompare(statusB);
      } else if (sorter.field === "typeDevice") {
        const deviceA = a.typeDevice.toLowerCase();
        const deviceB = b.typeDevice.toLowerCase();
        return deviceA.localeCompare(deviceB);
      }
      return 0;
    });

    if (order === "descend") {
      sortedData.reverse();
    }

    setFilteredData(sortedData);
  };

  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col mt-2">
                <BreadCrumbTwo text="Báo cáo" text2="Lập báo cáo" />
              </div>
              <div className="col-auto ">
                <span className="d-flex align-items-center justify-content-center me-5">
                  <Account />
                </span>
              </div>
            </div>
            <div className="row mt-5 justify-content-center">
              <div className="col text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Chọn thời gian</label>
                  </div>
                  <div className="col">
                    <DatePicker size="large" style={{ width: 130 }} 
                     />
                    <img
                      style={{ width: 15 }}
                      src="../assets/image/arrow-right.png"
                      alt=""
                    />
                    <DatePicker size="large" style={{ width: 130 }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-11 mt-3">
                <Table
                  dataSource={filteredData}
                  pagination={{ pageSize: 6 }}
                  bordered
                  rowClassName={() => "table-row"}
                  className="mb-3"
                  onChange={handleTableChange}
                >
                  <Column
                    title={<span className="table-title">Số thứ tự</span>}
                    dataIndex="number"
                    key="number"
                    render={(text: string) => <span>{text}</span>}
                    sorter={{ multiple: 1 }}
                  />
                  <Column
                    title={<span className="table-title">Tên dịch vụ</span>}
                    dataIndex="nameService"
                    key="nameService"
                    render={(text: string) => <span>{text}</span>}
                    sorter={{ multiple: 1 }}
                  />
                  <Column
                    title={<span className="table-title">Thời gian cấp</span>}
                    dataIndex="timeCreate"
                    key="timeCreate"
                    render={(text: string) => <span>{text}</span>}
                    sorter={{ multiple: 1 }}
                  />
                  <Column
                    title={<span className="table-title">Trạng thái</span>}
                    dataIndex="status"
                    key="status"
                    render={(status: string) => renderStatus(status)}
                    sorter={{ multiple: 1 }}
                  />
                  <Column
                    title={<span className="table-title">Nguồn cấp</span>}
                    dataIndex="typeDevice"
                    key="typeDevice"
                    render={(text: string) => <span>{text}</span>}
                    sorter={{ multiple: 1 }}
                  />
                </Table>
              </div>
              <div className="col-1 mt-3">
                <Link to={"#"}>
                  <Card className="fixed-card text-center">
                    <img src="../assets/image/document-download.png" alt="" />
                    <p className="fw-bold" style={{ fontSize: 10 }}>
                      Tải về
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

export default ListReport;
