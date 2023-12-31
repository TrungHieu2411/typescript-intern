import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Layout,
  Progress,
  Select,
  Statistic,
  Tag,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

import SlideMain from "../containers/SlideMain";
import BreadCrumbOne from "../components/BreadCrumb/BreadCrumbOne";
import Account from "../components/User/Account";
import "../assets/css/style.css";
import { Area } from "@ant-design/charts";

import Link from "antd/es/typography/Link";
import { firestore } from "../firebase/firebaseConfig";

// Sử dụng WaveChart trong component của bạn

const { Content } = Layout;

const config: any = {
  autoFit: false,
  animation: {
    appear: {
      animation: "path-in",
      duration: 3000,
    },
  },
  xAxis: {
    range: [0, 1],
  },
  smooth: true,
  areaStyle: () => {
    return {
      fill: "l(270) 0:#ffffff 0.5:#6e92f6 1:#0a4bff",
    };
  },
};

function Dashboard() {
  const [selectedView, setSelectedView] = useState("Ngày");

  const handleViewChange = (value: any) => {
    setSelectedView(value);
  };

  //--------------------------------------------------------------------------------------------------
  const [columnCount, setColumnCount] = useState(0);
  const [usedingCount, setUsedingCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [skipCount, setSkipCount] = useState(0);

  useEffect(() => {
    // Lấy tham chiếu đến collection "progressives"
    const collectionRef = firestore.collection("progressives");

    // Lấy dữ liệu từ Firestore và đếm số lượng cột
    collectionRef.get().then((snapshot) => {
      // Đếm số lượng cột từ snapshot
      const columnCount = snapshot.empty
        ? 0
        : Object.keys(snapshot.docs[0].data()).length;
      setColumnCount(columnCount);
    });

    // Lấy dữ liệu từ Firestore và đếm số lượng cột
    collectionRef.get().then((snapshot) => {
      // Đếm số lượng cột từ snapshot
      const columns = snapshot.empty
        ? []
        : snapshot.docs.map((doc) => doc.data());
      const columnCount = columns.length;
      setColumnCount(columnCount);

      // Đếm số lượng cột có trạng thái "Đã sử dụng"
      const usedingColumns = columns.filter(
        (column) => column.status === "Đã sử dụng"
      );
      const usedingCount = usedingColumns.length;
      setUsedingCount(usedingCount);
    });

    // Lấy dữ liệu từ Firestore và đếm số lượng cột
    collectionRef.get().then((snapshot) => {
      // Đếm số lượng cột từ snapshot
      const columns = snapshot.empty
        ? []
        : snapshot.docs.map((doc) => doc.data());
      const columnCount = columns.length;
      setColumnCount(columnCount);

      // Đếm số lượng cột có trạng thái "Đang chờ"
      const pendingColumns = columns.filter(
        (column) => column.status === "Đang chờ"
      );
      const pendingCount = pendingColumns.length;
      setPendingCount(pendingCount);
    });

    // Lấy dữ liệu từ Firestore và đếm số lượng cột
    collectionRef
      .get()
      .then((snapshot) => {
        // Đếm số lượng cột từ snapshot
        const columns = snapshot.empty
          ? []
          : snapshot.docs.map((doc) => doc.data());
        const columnCount = columns.length;
        setColumnCount(columnCount);

        // Đếm số lượng cột có trạng thái "Bỏ qua"
        const skipColumns = columns.filter(
          (column) => column.status === "Bỏ qua"
        );
        const skipCount = skipColumns.length;
        setSkipCount(skipCount);
      })

      .catch((error) => {
        console.error("Lỗi truy vấn Firestore: ", error);
      });
  }, []);
  //--------------------------------------------------------------------------------------------------
  const [deviceCount, setDeviceCount] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const [isNotActive, setIsNotActive] = useState(0);

  useEffect(() => {
    // Lấy tham chiếu đến collection "progressives"
    const collectionRef = firestore.collection("devices");

    // Lấy dữ liệu từ Firestore và đếm số lượng cột
    collectionRef.get().then((snapshot) => {
      // Đếm số lượng cột từ snapshot
      const columnCountDevice = snapshot.empty
        ? 0
        : Object.keys(snapshot.docs[0].data()).length;
      setDeviceCount(columnCountDevice);
    });

    collectionRef.get().then((snapshot) => {
      // Đếm số lượng cột từ snapshot
      const columns = snapshot.empty
        ? []
        : snapshot.docs.map((doc) => doc.data());
      const columnCountDevice = columns.length;
      setDeviceCount(columnCountDevice);

      // Đếm số lượng cột có trạng thái "Bỏ qua"
      const deviceCount = columns;
      const deviceCountNumber = deviceCount.length;
      setDeviceCount(deviceCountNumber);
    });

    // Lấy dữ liệu từ Firestore và đếm số lượng cột
    collectionRef.get().then((snapshot) => {
      // Đếm số lượng cột từ snapshot
      const columns = snapshot.empty
        ? []
        : snapshot.docs.map((doc) => doc.data());
      const columnCountDevice = columns.length;
      setDeviceCount(columnCountDevice);

      // Đếm số lượng cột có trạng thái "Bỏ qua"
      const activeColumns = columns.filter(
        (column) => column.isActive === "Hoạt động"
      );
      const isActive = activeColumns.length;
      setIsActive(isActive);
    });

    // Lấy dữ liệu từ Firestore và đếm số lượng cột
    collectionRef
      .get()
      .then((snapshot) => {
        // Đếm số lượng cột từ snapshot
        const columns = snapshot.empty
          ? []
          : snapshot.docs.map((doc) => doc.data());
        const columnCountDevice = columns.length;
        setDeviceCount(columnCountDevice);

        // Đếm số lượng cột có trạng thái "Bỏ qua"
        const activeColumns = columns.filter(
          (column) => column.isActive === "Ngưng hoạt động"
        );
        const isNotActive = activeColumns.length;
        setIsNotActive(isNotActive);
      })
      .catch((error) => {
        console.error("Lỗi truy vấn Firestore: ", error);
      });
  }, []);
  //--------------------------------------------------------------------------------------------------
  const [serviceCount, setServiceCount] = useState(0);
  const [isActiveService, setIsActiveService] = useState(0);
  const [isNotActiveService, setIsNotActiveService] = useState(0);

  useEffect(() => {
    const serviceCollectionRef = firestore.collection("services");

    // Lấy dữ liệu từ Firestore và đếm số lượng cột
    // Đếm số lượng cột trong bảng "services"
    serviceCollectionRef
      .get()
      .then((snapshot) => {
        const columnCountService = snapshot.empty
          ? 0
          : Object.keys(snapshot.docs[0].data()).length;
        setServiceCount(columnCountService);
      })
      .catch((error) => {
        console.error("Lỗi truy vấn Firestore (services): ", error);
      });

    serviceCollectionRef.get().then((snapshot) => {
      // Đếm số lượng cột từ snapshot
      const columns = snapshot.empty
        ? []
        : snapshot.docs.map((doc) => doc.data());
      const columnCountService = columns.length;
      setServiceCount(columnCountService);

      const serviceCount = columns;
      const serviceCountNumber = serviceCount.length;
      setServiceCount(serviceCountNumber);
    });

    // Lấy dữ liệu từ Firestore và đếm số lượng cột
    serviceCollectionRef.get().then((snapshot) => {
      // Đếm số lượng cột từ snapshot
      const columns = snapshot.empty
        ? []
        : snapshot.docs.map((doc) => doc.data());
      const columnCountDevice = columns.length;
      setServiceCount(columnCountDevice);

      // Đếm số lượng cột có trạng thái "Bỏ qua"
      const activeColumns = columns.filter(
        (column) => column.isActive === "Hoạt động"
      );
      const isActiveService = activeColumns.length;
      setIsActiveService(isActiveService);
    });

    // Lấy dữ liệu từ Firestore và đếm số lượng cột
    serviceCollectionRef
      .get()
      .then((snapshot) => {
        // Đếm số lượng cột từ snapshot
        const columns = snapshot.empty
          ? []
          : snapshot.docs.map((doc) => doc.data());
        const columnCountDevice = columns.length;
        setServiceCount(columnCountDevice);

        // Đếm số lượng cột có trạng thái "Bỏ qua"
        const activeColumns = columns.filter(
          (column) => column.isActive === "Ngưng hoạt động"
        );
        const isNotActiveService = activeColumns.length;
        setIsNotActiveService(isNotActiveService);
      })
      .catch((error) => {
        console.error("Lỗi truy vấn Firestore: ", error);
      });
  }, []);
  //--------------------------------------------------------------------------------------------------

  const getCurrentMonthYear = () => {
    const currentDate = new Date();
    const monthsInVietnamese = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    const month = monthsInVietnamese[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
  };

  //------------------
  //---------Device
  const activeDevice: number = Math.floor((isActive * 100) / deviceCount);
  const notActiveDevice: number = Math.floor(100 - activeDevice);

  //---------Service
  const activeService: number = Math.floor(
    (isActiveService * 100) / serviceCount
  );
  const notActiveService: number = Math.floor(100 - activeService);

  //---------Progressive
  const pendingProgressive: number = Math.floor(
    (pendingCount * 100) / columnCount
  );
  const usedingProgressive: number = Math.floor(
    (usedingCount * 100) / columnCount
  );
  const skipingProgressive: number =
    100 - pendingProgressive - usedingProgressive;
  //------------------
  const dataByDay = [
    { day: "1", "Cấp số": 0 },
    { day: "2", "Cấp số": 0 },
    { day: "3", "Cấp số": 0 },
    { day: "4", "Cấp số": 0 },
    { day: "5", "Cấp số": 0 },
    { day: "6", "Cấp số": 0 },
    { day: "7", "Cấp số": 0 },
    { day: "8", "Cấp số": 0 },
    { day: "9", "Cấp số": 0 },
    { day: "10", "Cấp số": 0 },
    { day: "11", "Cấp số": 0 },
    { day: "12", "Cấp số": 0 },
    { day: "13", "Cấp số": 0 },
    { day: "14", "Cấp số": 0 },
    { day: "15", "Cấp số": 0 },
    { day: "16", "Cấp số": 0 },
    { day: "17", "Cấp số": 0 },
    { day: "18", "Cấp số": 0 },
    { day: "19", "Cấp số": 0 },
    { day: "20", "Cấp số": 0 },
    { day: "21", "Cấp số": 0 },
    { day: "22", "Cấp số": 0 },
    { day: "23", "Cấp số": 0 },
    { day: "24", "Cấp số": 0 },
    { day: "25", "Cấp số": 0 },
    { day: "26", "Cấp số": 0 },
    { day: "27", "Cấp số": 0 },
    { day: "28", "Cấp số": 0 },
    { day: "29", "Cấp số": 0 },
    { day: "30", "Cấp số": 0 },
    { day: "31", "Cấp số": 0 },
  ];

  const dataByWeek = [
    { week: "tuần 1", "Cấp số": 0 },
    { week: "tuần 2", "Cấp số": 0 },
    { week: "tuần 3", "Cấp số": 0 },
    { week: "tuần 4", "Cấp số": 0 },
  ];

  const dataByMonth = [
    { month: "1", "Cấp số": 0 },
    { month: "2", "Cấp số": 0 },
    { month: "3", "Cấp số": 0 },
    { month: "4", "Cấp số": 0 },
    { month: "5", "Cấp số": 0 },
    { month: "6", "Cấp số": 0 },
    { month: "7", "Cấp số": 0 },
    { month: "8", "Cấp số": 0 },
    { month: "9", "Cấp số": 0 },
    { month: "10", "Cấp số": 0 },
    { month: "11", "Cấp số": 0 },
    { month: "12", "Cấp số": 0 },
  ];

  type DataItem = {
    day?: string;
    week?: string;
    month?: string;
    "Cấp số": number;
  };

  interface ProgressiveData {
    id: string;
    timeCreate: string;
    timeCreateMonth: string;
    timeCreateWeek: string;
  }

  interface DateCountMap {
    [date: string]: number;
  }
  const [fetchedData, setFetchedData] = useState<DataItem[]>([]);
  const [fetchedDataMonth, setFetchedDataMonth] = useState<DataItem[]>([]);
  const [fetchedDataWeek, setFetchedDataWeek] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const progressiveRef = firestore.collection("progressives");
        const snapshot = await progressiveRef.get();

        const fetchedProgressiveData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const progressive = doc.data() as ProgressiveData;
            progressive.id = doc.id;

            // Extract date from timeCreate field
            const timeCreate = progressive.timeCreate;
            if (timeCreate) {
              const dateParts = timeCreate.split(" ");
              if (dateParts.length === 2) {
                const [timePart, datePart] = dateParts;
                const [day, month] = datePart.split("/");
                const formattedDate = `${day}`;
                const formattedDateMonth = `${month}`;

                progressive.timeCreate = formattedDate;
                progressive.timeCreateMonth = formattedDateMonth;

                // Calculate week from day
                const weekNumber = Math.ceil(Number(day) / 7);
                const formattedDateWeek = `tuần ${weekNumber}`;
                progressive.timeCreateWeek = formattedDateWeek;
              }
            }

            return progressive;
          })
        );

        // Count the occurrences of each date in timeCreate, timeCreateMonth, and timeCreateWeek
        const dateCount = fetchedProgressiveData.reduce((acc, progressive) => {
          const { timeCreate } = progressive;
          if (timeCreate) {
            acc[timeCreate] = (acc[timeCreate] || 0) + 1;
          }
          return acc;
        }, {} as DateCountMap);

        const dateCountMonth = fetchedProgressiveData.reduce(
          (acc, progressive) => {
            const { timeCreateMonth } = progressive;
            if (timeCreateMonth) {
              acc[timeCreateMonth] = (acc[timeCreateMonth] || 0) + 1;
            }
            return acc;
          },
          {} as DateCountMap
        );

        const dateCountWeek = fetchedProgressiveData.reduce(
          (acc, progressive) => {
            const { timeCreateWeek } = progressive;
            if (timeCreateWeek) {
              acc[timeCreateWeek] = (acc[timeCreateWeek] || 0) + 1;
            }
            return acc;
          },
          {} as DateCountMap
        );

        // Update dataByMonth and dataByWeek with the new counts
        const updatedDataByMonth = dataByMonth.map((item) => ({
          ...item,
          "Cấp số": dateCountMonth[item.month] || 0,
          day: item.month,
        }));

        const updatedDataByWeek = dataByWeek.map((item) => ({
          ...item,
          "Cấp số": dateCountWeek[item.week] || 0,
          day: item.week,
        }));

        // Update dataByDay, dataByMonth, and dataByWeek with the new counts
        const updatedDataByDay = dataByDay.map((item) => ({
          ...item,
          "Cấp số": dateCount[item.day] || 0,
          day: item.day,
        }));

        setFetchedData(updatedDataByDay);
        setFetchedDataMonth(updatedDataByMonth);
        setFetchedDataWeek(updatedDataByWeek);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  // Update getDataBySelectedView() to return data based on the selected view
  const getDataBySelectedView = (): DataItem[] => {
    if (selectedView === "Ngày") {
      return fetchedData.map((item) => ({
        ...item,
        day: item.day,
      }));
    } else if (selectedView === "Tháng") {
      return fetchedDataMonth.map((item) => ({
        ...item,
        month: item.month,
      }));
    } else if (selectedView === "Tuần") {
      return fetchedDataWeek.map((item) => ({
        ...item,
        week: item.week,
      }));
    }
    return [];
  };
  //---------
  return (
    <Layout className="layout">
      <SlideMain />
      <Layout>
        <Content style={{ margin: "0px 16px" }}>
          <div className="container">
            <div className="row mt-2">
              <div className="col">
                <BreadCrumbOne text="Dashboard" />
              </div>
            </div>
            <div className="pt-3 mt-3">
              <h4 style={{ color: "#FF7506" }}>Biểu đồ cấp số </h4>
              <div className="row row-cols-4 my-4">
                <div className="col">
                  <Card className="shadow" style={{ width: 170, height: 130 }}>
                    <div className="row align-items-center">
                      <div className="col-4 p-0">
                        <Link href="/progressive">
                          <Button
                            style={{
                              width: 45,
                              height: 45,
                              color: "#6695FB",
                              background: "#00F5FF",
                            }}
                            className="sttdacap"
                            shape="circle"
                            icon={
                              <img
                                src="../assets/image/icon-dasboard03.png"
                                alt=""
                              />
                            }
                          />
                        </Link>
                      </div>
                      <div className="col-6 ps-2">
                        <Link href="/progressive">
                          <span
                            style={{ fontSize: 12, color: "black" }}
                            className=""
                          >
                            Số thứ tự đã cấp
                          </span>
                        </Link>
                      </div>

                      <div className="col-6 p-0 my-3 pt-1 text-start">
                        <h4 style={{ fontSize: 25 }}>{columnCount}</h4>
                      </div>
                      <div className="col-6 ps-4 my-3 text-end">
                        <Tag
                          style={{ background: "#FF950126", borderRadius: 30 }}
                        >
                          <Statistic
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#FF9138", fontSize: 7 }}
                            prefix={<ArrowUpOutlined style={{ fontSize: 7 }} />}
                            suffix="%"
                          />
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col">
                  <Card className="shadow" style={{ width: 170, height: 130 }}>
                    <div className="row align-items-center">
                      <div className="col-4 p-0">
                        <Link href="/progressive">
                          <Button
                            style={{
                              width: 45,
                              height: 45,
                              color: "#35C75A",
                              background: "#FAF0E6",
                            }}
                            shape="circle"
                            icon={
                              <img
                                src="../assets/image/icon-dasboard02.png"
                                alt=""
                              />
                            }
                          />
                        </Link>
                      </div>
                      <div className="col-6 ps-2 p-0">
                        <Link href="progressive">
                          <span
                            style={{ fontSize: 12, color: "black" }}
                            className=""
                          >
                            Số thứ tự đã sử dụng
                          </span>
                        </Link>
                      </div>

                      <div className="col-6 p-0 my-3 pt-1 text-start">
                        <h4 style={{ fontSize: 25 }}>{usedingCount}</h4>
                      </div>
                      <div className="col-6 ps-4 my-3 text-end">
                        <Tag
                          style={{ background: "#FF950126", borderRadius: 30 }}
                        >
                          <Statistic
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#FF9138", fontSize: 7 }}
                            prefix={
                              <ArrowDownOutlined style={{ fontSize: 7 }} />
                            }
                            suffix="%"
                          />
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col">
                  <Card className="shadow" style={{ width: 170, height: 130 }}>
                    <div className="row align-items-center">
                      <div className="col-4 p-0">
                        <Link href="progressive">
                          <Button
                            style={{
                              width: 45,
                              height: 45,
                              color: "#FFAC6A",
                              background: "#EEEED1",
                            }}
                            shape="circle"
                            icon={
                              <img
                                src="../assets/image/icon-dasboard05.png"
                                alt=""
                              />
                            }
                          />
                        </Link>
                      </div>
                      <div className="col-6 ps-2 p-0">
                        <Link href="progressive">
                          <span
                            style={{ fontSize: 12, color: "black" }}
                            className=""
                          >
                            Số thứ tự đang chờ
                          </span>
                        </Link>
                      </div>

                      <div className="col-6 p-0 my-3 pt-1 text-start">
                        <h4 style={{ fontSize: 25 }}>{pendingCount}</h4>
                      </div>
                      <div className="col-6 ps-4 my-3 text-end">
                        <Tag
                          style={{ background: "#FF950126", borderRadius: 30 }}
                        >
                          <Statistic
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#FF9138", fontSize: 7 }}
                            prefix={<ArrowUpOutlined style={{ fontSize: 7 }} />}
                            suffix="%"
                          />
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col">
                  <Card className="shadow" style={{ width: 170, height: 130 }}>
                    <div className="row align-items-center">
                      <div className="col-4 p-0">
                        <Link href="progressive">
                          <Button
                            style={{
                              width: 45,
                              height: 45,
                              color: "#F86D6D",
                              background: "#FFFFE0",
                            }}
                            shape="circle"
                            icon={
                              <img
                                src="../assets/image/icon-dasboard07.png"
                                alt=""
                              />
                            }
                          />
                        </Link>
                      </div>
                      <div className="col-6 ps-2 p-0">
                        <Link href="progressive">
                          <span
                            style={{ fontSize: 12, color: "black" }}
                            className=""
                          >
                            Số thứ tự đã bỏ qua
                          </span>
                        </Link>
                      </div>

                      <div className="col-6 p-0 my-3 pt-1 text-start">
                        <h4 style={{ fontSize: 25 }}>{skipCount}</h4>
                      </div>
                      <div className="col-6 ps-4 my-3 text-end">
                        <Tag
                          style={{ background: "#FF950126", borderRadius: 30 }}
                        >
                          <Statistic
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#FF9138", fontSize: 7 }}
                            prefix={
                              <ArrowDownOutlined style={{ fontSize: 7 }} />
                            }
                            suffix="%"
                          />
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="col-12 mt-1">
                <Card
                  className="shadow card-container"
                  style={{ width: 775, height: 435 }}
                >
                  <div className="row">
                    <div className="col">
                      {selectedView === "Ngày" && (
                        <>
                          <h4>Bảng thống kê theo ngày</h4>
                          <p>{getCurrentMonthYear()}</p>
                        </>
                      )}
                      {selectedView === "Tuần" && (
                        <>
                          <h4>Bảng thống kê theo tuần</h4>
                          <p>{getCurrentMonthYear()}</p>
                        </>
                      )}
                      {selectedView === "Tháng" && (
                        <>
                          <h4>Bảng thống kê theo tháng</h4>
                          <p>Năm {new Date().getFullYear()}</p>
                        </>
                      )}
                    </div>
                    <div className="col text-end">
                      <p>
                        Xem theo{" "}
                        <Select
                          style={{ width: 85 }}
                          value={selectedView}
                          onChange={handleViewChange}
                        >
                          {["Ngày", "Tuần", "Tháng"].map((option) => (
                            <Select.Option key={option} value={option}>
                              {option}
                            </Select.Option>
                          ))}
                        </Select>
                      </p>
                    </div>
                  </div>
                  {/* ...Nội dung Card... */}
                  <Area
                    data={getDataBySelectedView()}
                    xField={"day"}
                    yField="Cấp số"
                    {...config}
                  />
                </Card>
              </div>
            </div>
          </div>
        </Content>
        <Sider width={400} theme="light">
          <div className="row mt-2">
            <div className="col-12">
              <span className="d-flex align-items-center justify-content-center">
                <Account />
              </span>
            </div>
            <div className="col mt-3 pb-2 ms-3">
              <h4 style={{ color: "#FF7506" }}>Tổng quan</h4>
            </div>
            <div className="col-12">
              <Card
                className="shadow mx-3 d-flex align-items-center justify-content-center"
                style={{ height: 80 }}
              >
                <div className="row">
                  <div className="col-3 p-1">
                    <div className="progress-container">
                      <Link href="/device">
                        <div className="outer-progress mt-1">
                          <Progress
                            type="circle"
                            strokeColor={"#FF7506"}
                            size={60}
                            percent={activeDevice}
                          />
                          <div className="inner-progress">
                            <Progress
                              type="circle"
                              strokeColor={"#7E7D88"}
                              size={50}
                              percent={notActiveDevice}
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-3 p-0">
                    <div className="row mt-1">
                      <div className="col-12 p-0">
                        <h4
                          className="ms-3 pe-2 mt-1 fw-bold"
                          style={{ fontSize: 20 }}
                        >
                          {deviceCount}
                        </h4>
                      </div>
                      <div className="col-12 p-0">
                        <span
                          style={{ fontSize: 12, color: "#FF7506" }}
                          className="me-4 pe-2 d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="pe-1"
                            src="../assets/image/monitor.png"
                            alt=""
                          />
                          Thiết bị
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 mt-2 p-0">
                    <div className="row">
                      <div className="col-9 my-1 p-0">
                        <Badge
                          color="#FF7506"
                          text={
                            <span style={{ fontSize: "12px" }}>
                              Đang hoạt động
                            </span>
                          }
                        />
                      </div>
                      <div className="col-3 my-1">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          {isActive}
                        </span>
                      </div>
                      <div className="col-9 p-0">
                        <Badge
                          color="#7E7D88"
                          text={
                            <span style={{ fontSize: "12px" }}>
                              Ngưng hoạt động
                            </span>
                          }
                        />{" "}
                      </div>
                      <div className="col-3">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          {isNotActive}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-12 my-2">
              <Card
                className="shadow mx-3 d-flex align-items-center"
                style={{ height: 80 }}
              >
                <div className="row">
                  <div className="col-3 p-1">
                    <div className="progress-container">
                      <Link href="/service">
                        <div className="outer-progress mt-1">
                          <Progress
                            type="circle"
                            strokeColor={"#4277FF"}
                            size={60}
                            percent={activeService}
                          />
                          <div className="inner-progress">
                            <Progress
                              type="circle"
                              strokeColor={"#7E7D88"}
                              size={50}
                              percent={notActiveService}
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-3 p-0">
                    <div className="row mt-1">
                      <div className="col-12 p-0">
                        <h4
                          className="ms-3 me-2 mt-1 fw-bold"
                          style={{ fontSize: 20 }}
                        >
                          {serviceCount}
                        </h4>
                      </div>
                      <div className="col-12 p-0">
                        <span
                          style={{ fontSize: 12, color: "#4277FF" }}
                          className="me-4 pe-2 d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="pe-1"
                            src="../assets/image/group-304.png"
                            alt=""
                          />
                          Dịch vụ
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 mt-2 p-0">
                    <div className="row">
                      <div className="col-9 my-1 p-0">
                        <Badge
                          color="#4277FF"
                          text={
                            <span style={{ fontSize: "12px" }}>
                              Đang hoạt động
                            </span>
                          }
                        />{" "}
                      </div>
                      <div className="col-3 my-1">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          {isActiveService}
                        </span>
                      </div>
                      <div className="col-9 p-0">
                        <Badge
                          color="#7E7D88"
                          text={
                            <span style={{ fontSize: "12px" }}>
                              Ngưng hoạt động
                            </span>
                          }
                        />{" "}
                      </div>
                      <div className="col-3">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          {isNotActiveService}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-12">
              <Card
                className="shadow mx-3 d-flex align-items-center"
                style={{ height: 80 }}
              >
                <div className="row">
                  <div className="col-3 p-1">
                    <div className="progress-container">
                      <Link href="/progressive">
                        <div className="outer-progress mt-1">
                          <Progress
                            type="circle"
                            strokeColor={"#35C75A"}
                            size={60}
                            percent={pendingProgressive}
                          />
                          <div className="inner-progress">
                            <Progress
                              type="circle"
                              strokeColor={"#7E7D88"}
                              size={50}
                              percent={usedingProgressive}
                            />
                            <div className="inner-progress">
                              <Progress
                                type="circle"
                                strokeColor={"#F178B6"}
                                size={40}
                                percent={skipingProgressive}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-3 p-0">
                    <div className="row mt-1">
                      <div className="col-12 p-0">
                        <h4
                          className="ms-3 me-2 mt-1 fw-bold"
                          style={{ fontSize: 20 }}
                        >
                          {columnCount}
                        </h4>
                      </div>
                      <div className="col-12 p-0">
                        <span
                          style={{ fontSize: 12, color: "#35C75A" }}
                          className="me-4 pe-2 d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="pe-1"
                            src="./assets/image/fi-layers.png"
                            alt=""
                          />
                          Cấp số
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 mt-1 p-0">
                    <div className="row">
                      <div className="col-9 p-0">
                        <Badge
                          color="#35C75A"
                          text={
                            <span style={{ fontSize: "12px" }}>Đang chờ</span>
                          }
                        />{" "}
                      </div>
                      <div className="col-3 ">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          {pendingCount}
                        </span>
                      </div>
                      <div className="col-9 p-0">
                        <Badge
                          color="#7E7D88"
                          text={
                            <span style={{ fontSize: "12px" }}>Đã sử dụng</span>
                          }
                        />{" "}
                      </div>
                      <div className="col-3">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          {usedingCount}
                        </span>
                      </div>
                      <div className="col-9 p-0">
                        <Badge
                          color="#F178B6"
                          text={
                            <span style={{ fontSize: "12px" }}>Bỏ qua</span>
                          }
                        />{" "}
                      </div>
                      <div className="col-3">
                        <span
                          className="text-end fw-bold"
                          style={{ color: "#FF7506" }}
                        >
                          {skipCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12">
              <DatePicker
                className="hide-datepicker"
                open
                style={{ position: "absolute", bottom: -8 }}
              />
            </div>
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
