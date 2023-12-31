import Link from "antd/es/typography/Link";
import { useEffect, useState } from "react";

import { Button, List, Popover } from "antd";
import { BellFilled } from "@ant-design/icons";

import firebase from "firebase/compat/app";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { getProgressive } from "../../redux/progressive/progressiveSlice";

interface UserData {
  fullName: string;
  image: string;
}
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
  nameService: firebase.firestore.DocumentReference | null;
}

const Account = () => {
  //------------

  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
  const progressiveData = useSelector(
    (state: RootState) => state.firestoreProgressiveData.data
  ) as ProgressiveData[];
  useEffect(() => {
    dispatch(getProgressive());
  });
  //=--------

  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserData>({
    fullName: "",
    image: "",
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Lấy id từ localStorage
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchUser = async () => {
      const userRef = firebase
        .firestore()
        .collection("authManagements")
        .doc(userId || id); // Sử dụng userId nếu tồn tại, nếu không thì sử dụng id từ params

      const userSnapshot = await userRef.get();

      if (userSnapshot.exists) {
        const userData = userSnapshot.data() as UserData;
        setUser(userData);

        setImageUrl(userData.image);
      }
    };

    fetchUser();
  }, [userId, id]);
  //-------
  const popoverContent = (
    <div
      style={{
        width: 300,
        marginTop: -12,
        marginLeft: -20,
        marginRight: -12,
        borderRadius: 5,
        maxHeight: 300, // Đặt chiều cao tối đa của phần tử
        overflowY: "auto", // Kích hoạt cuộn theo chiều dọc khi danh sách vượt quá chiều cao tối đa
      }}
    >
      <div
        className="list-item-wrapper ms-2"
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1,
          width: 275,
        }}
      >
        <h5 className="item-title ps-3">Thông báo</h5>
      </div>
      <List
        className="mt-4 ms-2"
        dataSource={progressiveData}
        renderItem={(item) => (
          <List.Item>
            <div className="container pe-4">
              <div className="list-item-wrapper" style={{ height: 50 }}>
                <List.Item>
                  <span>
                    <span className="fw-bold" style={{ color: "#BF5805" }}>
                      Người dùng: <span>{item.fullName}</span>
                    </span>
                    <br />
                    <span>
                      Thời gian nhận số: <span>{item.timeCreate}</span>
                    </span>
                  </span>
                </List.Item>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <>
      <Button style={{ background: "#FFF2E5" }} type="ghost" shape="circle">
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
      <Link href={`/admin/${userId}`}>
        <img
          style={{
            width: 50,
            height: 50,
            marginLeft: 10,
            borderRadius: "50%",
          }}
          src={imageUrl || "../assets/image/logo.jpg"}
          alt=""
        />
      </Link>

      <span className="ms-2">
        <Link
          href={`/admin/${userId}`}
          className="text-decoration-none"
          style={{ color: "black" }}
        >
          <p className="mb-0">Xin chào</p>
          <p className="mb-0 fw-bold">{user.fullName}</p>
        </Link>
      </span>
    </>
  );
};

export default Account;
