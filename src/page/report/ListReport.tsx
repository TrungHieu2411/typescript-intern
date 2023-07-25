import { useEffect, useState } from "react";
import { Badge, Card, DatePicker, Layout, Table } from "antd";
import { Link } from "react-router-dom";

import SlideMain from "../../containers/SlideMain";
import BreadCrumbTwo from "../../components/BreadCrumb/BreadCrumbTwo";
import Account from "../../components/User/Account";
import "../../assets/css/style.css";



import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getProgressive } from "../../redux/progressive/progressiveSlice";
import tableExport from "antd-table-export";
import dayjs from "dayjs";
const { Content } = Layout;
const { Column } = Table;

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "nameService",
    key: "nameService",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "timeCreate",
    key: "timeCreate",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Nguồn cấp",
    dataIndex: "typeDevice",
    key: "typeDevice",
  },
];

const renderStatus = (status: string) => {
  let color = "";
  let text = "";

  if (status === "Bỏ qua") {
    color = "#FF0000"; // Đỏ
    text = "Bỏ qua";
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
  timeStamp: any;
  typeDevice: string;
  id: string;
  number: string;
  nameService: any;
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

  const handleExportToExcel = () => {
    const exportInstance = new tableExport(filteredData, columns);
    exportInstance.download("Báo cáo", "xlsx");
  };

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

   const filteredServiceData = progressiveData
    .filter((progressive) => {
      // Custom filter function for timeStamp column
      const currentDate = parseDate(progressive.timeStamp); // Parse the timeStamp to dayjs object
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
        <Content style={{ margin: "0px 16px" }}>
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
                    value={startDate}
                      onChange={handleStartDateChange}
                    />
                    <img
                      style={{ width: 15 }}
                      src="../assets/image/arrow-right.png"
                      alt=""
                    />
                    <DatePicker size="large" style={{ width: 130 }} 
                     value={endDate}
                      onChange={handleEndDateChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-11 mt-3">
                <Table
                  dataSource={filteredServiceData}
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
                  <Card
                    className="fixed-card text-center"
                    onClick={handleExportToExcel}
                  >
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
