import React from "react";
import { Button, Input, Typography, Form } from "antd";
import { FormInstance } from "antd/lib/form";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Link } = Typography;

const Login: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);
  const [showError, setShowError] = React.useState(false);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    setShowError(true);
    setShowForgotPassword(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    setShowError(true);
    setShowForgotPassword(false);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setShowError(false);
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
                  src="./assets/image/logo.jpg"
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
                    help={showError ? (
                        <div className="mb-4 mt-2 d-flex align-items-center">
                        <ExclamationCircleOutlined className="me-1 fs-5" />
                        <span>Sai mật khẩu hoặc tên đăng nhập</span>
                      </div>
                    ) : null}
                  >
                    <Input.Password />
                    {!showError && !showForgotPassword && (
                      <div className="mt-1">
                        <Link onClick={handleForgotPasswordClick} href="/quenmatkhau" style={{ color: "#E73F3F" }}>
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
                      <Link onClick={handleForgotPasswordClick} href="/quenmatkhau" style={{ color: "#E73F3F" }}>
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
              src="./assets/image/bg-main.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
