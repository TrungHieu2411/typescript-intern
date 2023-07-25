import { useEffect, useState } from "react";
import {
  Badge,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Layout,
  Select,
  Space,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

import SlideMain from "../../containers/SlideMain";
import "../../assets/css/style.css";



import BreadCrumbThree from "../../components/BreadCrumb/BreadCrumbThree";
import Account from "../../components/User/Account";
import { getProgressive } from "../../redux/progressive/progressiveSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import dayjs from "dayjs";
import { firestore } from "../../firebase/firebaseConfig";

interface ServiceData {
  codeService: string;
  nameService: string;
  description: string;
  progressiveId: string;
}

const renderIsActive = (status: string) => {
  let color = "";
  let text = "";

  if (status === "Bỏ qua") {
    color = "#535261"; // Xanh lá cây
    text = "Vắng";
  } else if (status === "Đang chờ") {
    color = "#5490EB"; // Đỏ
    text = "Đang thực hiện";
  } else if (status === "Đã sử dụng") {
    color = "#34CD26"; // Đỏ
    text = "Đã hoàn thành";
  }

  return <Badge color={color} text={text} />;
};

interface ProgressiveData {
  timeStamp: any;
  progressive: any;
  id: string;
  number: string;
  status: string;
}
function DetailServices() {
  const { id } = useParams<{ id: string }>();
  //------------
  const [service, setService] = useState<ServiceData>({
    codeService: "",
    nameService: "",
    description: "",
    progressiveId: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      const serviceRef = firestore.collection("services").doc(id);
      const serviceSnapshot = await serviceRef.get();

      if (serviceSnapshot.exists) {
        const serviceData = serviceSnapshot.data() as ServiceData;
        setService(serviceData);
      }
    };
    fetchService();
  }, [id]);

  //----------------------------------------
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const progressiveData = useSelector(
    (state: RootState) => state.firestoreProgressiveData.data
  ) as ProgressiveData[];
  useEffect(() => {
    dispatch(getProgressive());
  }, []);
  //----------------------------------------
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
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


  const [filterStatus, setFilterStatus] = useState<string>("all");
  const filteredRoleManagementData = progressiveData
    .filter((progressive) => {
      const isActiveText = renderIsActive(
        progressive.status
      ).props.text.toLowerCase();
      return (
        isActiveText.includes(searchKeyword.toLowerCase()) &&
        (filterStatus === "all" || isActiveText === filterStatus.toLowerCase())
      );
    })
    .filter((progressive) => {
      if (filterStatus === "all") {
        return true;
      } else {
        return renderIsActive(progressive.status).props.text === filterStatus;
      }
    }).filter((progressive) => {
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

  const handleFilterChangeStatus = (value: string) => {
    setFilterStatus(value);
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
                  href="/service"
                  text3="Chi tiết"
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
            <div className="row mt-3">
              <div className="col-4 mt-3">
                <Card style={{ height: 500 }}>
                  <h6 style={{ color: "#FF7506" }}>Thông tin dịch vụ</h6>
                  <Form className="mt-3">
                    <table>
                      <tr>
                        <td>
                          <label htmlFor="" className="mb-2 me-4">
                            Mã dịch vụ:
                          </label>
                       
                          <label className="mb-2">
                            <small>{service.codeService}</small>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="" className="mb-2 me-3 pe-1">
                            Tên dịch vụ:
                          </label>
                       
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
                          value="9999"
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
                <Card style={{ height: 500 }}>
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="">Trạng thái</label>
                      <Select
                        defaultValue="all"
                        style={{ width: 140 }}
                        onChange={handleFilterChangeStatus}
                        value={filterStatus} // Thêm giá trị value để đồng bộ giá trị hiển thị
                      >
                        <Select.Option value="all">Tất cả</Select.Option>
                        <Select.Option value="Đã hoàn thành">
                          Đã hoàn thành
                        </Select.Option>
                        <Select.Option value="Đang thực hiện">
                          Đang thực hiện
                        </Select.Option>
                        <Select.Option value="Vắng">Vắng</Select.Option>
                      </Select>
                    </div>

                    <div className="col-5 p-0">
                      <label htmlFor="">Chọn thời gian</label>

                      <div className="col-12">
                        <DatePicker style={{ width: 125 }} 
                         value={startDate}
                         onChange={handleStartDateChange}
                        />
                        <img
                          style={{ width: 15 }}
                          src="../assets/image/arrow-right.png"
                          alt=""
                        />
                        <DatePicker style={{ width: 125 }} 
                         value={endDate}
                         onChange={handleEndDateChange}
                        />
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
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <Table
                      dataSource={filteredRoleManagementData}
                      pagination={{ pageSize: 8 }}
                      size="small"
                      rowClassName={() => "table-row"}
                      className="custom-table"
                    >
                      <Table.Column
                        title={<span className="table-title">Số thứ tự</span>}
                        dataIndex="number"
                        key="number"
                        render={(text: string) => <span>{text}</span>}
                      />
                      <Table.Column
                        title={<span className="table-title">Trạng thái</span>}
                        dataIndex="status"
                        key="status"
                        render={(status: string) => renderIsActive(status)}
                      />
                    </Table>
                  </div>
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
