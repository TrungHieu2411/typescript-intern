import Link from "antd/es/typography/Link";
import React, { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import { useParams } from "react-router-dom";

interface UserData {
  fullName: string;
  image: string;
}
const Account = () => {
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
  
  return (
    <>
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
