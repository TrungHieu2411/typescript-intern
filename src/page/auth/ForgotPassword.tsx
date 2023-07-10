import React, { useEffect, useState } from "react";
import { Button, Input, Form, message } from "antd";
import { FormInstance } from "antd/lib/form";
import firebase from "firebase/compat/app";

const ForgotPassword: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);

//------------
  const [email, setEmail] = useState("");
  const onFinish = async (values: any) => {
    const { email } = values;

    try {
      const accountId = await getAccountIdByEmail(email);
      if (!accountId) {
        message.error("Không tìm thấy địa chỉ email.");
        return;
      }

      setTimeout(() => {
        window.location.href = `/xacnhanmatkhau/${accountId}`;
      }, 2000);
    } catch (error) {
      console.log("Lỗi gửi email đặt lại mật khẩu:", error);
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

//------------
  const getAccountIdByEmail = async (email: string) => {
    try {
      const authManagementCollection = firebase.firestore().collection("authManagements");
      const snapshot = await authManagementCollection.where("email", "==", email).get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const accountId = doc.id;
        return accountId;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Lỗi kiểm tra email:", error);
      return null;
    }
  };

  const handleCancelClick = () => {
    console.log("Bấm nút Hủy");
    window.location.href = "/"; // Chuyển đến trang chủ
  };

//------------
  useEffect(() => {
    const emailParam = new URLSearchParams(window.location.search).get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <div className="row px-5">
              <div className="col-12 text-center">
                <img
                  className="h-50 mt-5"
                  src="../assets/image/logo.jpg"
                  alt=""
                />
              </div>
              <Form
                name="basic"
                autoComplete="off"
                ref={formRef}
                onFinish={onFinish}
              >
                <div className="col-12 px-5 text-center">
                  <label htmlFor="" className="fs-5 fw-bold">
                    Đặt lại mật khẩu
                  </label>
                </div>
                <div className="col-12 px-5 mt-2 text-center">
                  <label htmlFor="" className="px-4">
                    Vui lòng nhập email để đặt lại mật khẩu của bạn{" "}
                    <span>*</span>
                  </label>
                  <Form.Item
                    name="email"
                    className="px-4"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ email!",
                      },
                      {
                        type: "email",
                        message: "Địa chỉ email không hợp lệ!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>

                <div className="col-12 text-center">
                  <Form.Item>
                    <Button
                      danger
                      onClick={handleCancelClick}
                      className="me-3 mt-2 w-25"
                    >
                      Hủy
                    </Button>
                    <Button
                      type="primary"
                      style={{ background: "#FF9138", color: "white" }}
                      className="w-25"
                      htmlType="submit"
                    >
                      Tiếp tục
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-7">
            <img
              className="img-fluid"
              src="../assets/image/quenmatkhau.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
