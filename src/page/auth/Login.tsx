import React from "react";
import { Button, Input, Typography, Form } from "antd";
import { FormInstance } from "antd/lib/form";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const { Link } = Typography;

const Login: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);
  const [showError, setShowError] = React.useState(false);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);

  const onFinish = (values: any) => {
    const { username, password } = values;
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        // Đăng nhập thành công, thực hiện các hành động tiếp theo
        console.log("Đăng nhập thành công:", userCredential.user);
        setShowError(false); // Đặt lại trạng thái lỗi
        setShowForgotPassword(false); // Đặt lại trạng thái quên mật khẩu
        window.location.href = "/admin"; // Chuyển đến trang /admin
      })
      .catch((error) => {
        // Xảy ra lỗi trong quá trình đăng nhập
        console.log("Lỗi đăng nhập:", error);
        setShowError(true);
        setShowForgotPassword(false);
      
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    setShowError(true);
    setShowForgotPassword(false);
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
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                ref={formRef}
              >
                <div className="col-12 px-5">
                  <label htmlFor="">
                    Tên đăng nhập <span>*</span>
                  </label>
                  <Form.Item
                    name="username"
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
                    validateStatus={showError ? "error" : ""}
                    help={
                      showError ? (
                        <div className="mb-4 mt-2 d-flex align-items-center">
                          <ExclamationCircleOutlined className="me-1 fs-5" />
                          <span>Sai mật khẩu hoặc tên đăng nhập</span>
                        </div>
                      ) : null
                    }
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu!" },
                    ]}
                  >
                    <Input.Password />
                    {!showError && !showForgotPassword && (
                      <div className="mt-1">
                        <Link
                          href="/quenmatkhau"
                          style={{ color: "#E73F3F" }}
                        >
                          Quên mật khẩu?
                        </Link>
                      </div>
                    )}
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
                  {showError && !showForgotPassword && (
                    <Link
                      href="/quenmatkhau"
                      style={{ color: "#E73F3F" }}
                    >
                      Quên mật khẩu?
                    </Link>
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
