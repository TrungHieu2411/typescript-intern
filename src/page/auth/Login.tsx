import React, { useState } from "react";
import { Button, Input, Typography, Form } from "antd";
import { FormInstance } from "antd/lib/form";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const { Link } = Typography;

const Login: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);
  const [showError, setShowError] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const onFinish = async (values: any) => {
    
    const { email, password } = values;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      // Đăng nhập thành công, thực hiện các hành động tiếp theo
      console.log("Đăng nhập thành công!");

      // Đăng nhập thành công, cập nhật trạng thái đăng nhập
      setIsLoggedIn(true);
      setShowError(false); // Đặt lại trạng thái lỗi

      // Thực hiện các hành động tiếp theo sau khi đăng nhập thành công
      // Ví dụ: chuyển đến trang admin
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const adminURL = `/admin/${userId}`;
          
        // Lưu trạng thái đăng nhập vào Local Storage
        localStorage.setItem("isLoggedIn", "true");

        window.location.href = adminURL;
        localStorage.setItem('userId', userId);
      }
    } catch (error) {
      // Xảy ra lỗi trong quá trình đăng nhập
      console.log("Lỗi đăng nhập:", error);

      setShowError(true); // Hiển thị thông báo lỗi
    }
  };

  const handleForgotPasswordClick = () => {
    // Xử lý sự kiện khi bấm nút "Quên mật khẩu"
    console.log("Bấm nút Quên mật khẩu");
  };

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
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                ref={formRef}
              >
                <div className="col-12 px-5">
                  <label htmlFor="">
                    Tên đăng nhập <span>*</span>
                  </label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-12 px-5">
                  <label htmlFor="">
                    Mật khẩu <span>*</span>
                  </label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu!",
                      },
                    ]}
                    validateStatus={
                      showError &&
                      formRef.current?.getFieldValue("email") &&
                      formRef.current?.getFieldValue("password")
                        ? "error"
                        : ""
                    }
                    help={
                      showError &&
                      formRef.current?.getFieldValue("email") &&
                      formRef.current?.getFieldValue("password") ? (
                        <div className="mb-4 mt-2 d-flex align-items-center">
                          <ExclamationCircleOutlined className="me-1 fs-5" />
                          <span>Sai mật khẩu hoặc tên đăng nhập</span>
                         
                        </div>
                      ) :  <Link
                      onClick={handleForgotPasswordClick}
                      href="/quenmatkhau"
                      style={{ color: "#E73F3F", marginLeft: "auto" }}
                    >
                      Quên mật khẩu?
                    </Link>
                    }
                  >
                    <Input.Password />
                  </Form.Item>
                </div>
                <div className="col-12 text-center">
                  <Form.Item>
                    <Button
                      type="default"
                      style={{ background: "#FF9138", color: "white" }}
                      htmlType="submit"
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                  {showError && (
                    <div className="mt-1">
                      <Link
                        onClick={handleForgotPasswordClick}
                        href="/quenmatkhau"
                        style={{ color: "#E73F3F" }}
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                  )}
                </div>
              </Form>
            </div>
          </div>
          <div className="col-7">
            <img
              className="img-fluid"
              src="../assets/image/bg-main.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
