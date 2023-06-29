import React from "react";
import { Button, Input, Typography, Form } from "antd";
import { FormInstance } from "antd/lib/form";
const { Link } = Typography;

const ConfilmPassword: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);

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
                autoComplete="off"
                ref={formRef}
              >
                <div className="col-12 px-5 text-center">
                  <label htmlFor="" className="fs-5 fw-bold">
                    Đặt lại mật khẩu mới
                  </label>
                </div>
                <div className="col-12 px-5 mt-2">
                  <label htmlFor="" className="px-4 ">
                    Mật khẩu
                    <span>*</span>
                  </label>
                  <Form.Item  className="px-4">
                    <Input.Password />
                  </Form.Item>
                </div>
                <div className="col-12 px-5">
                  <label htmlFor="" className="px-4 ">
                    Nhập lại mật khẩu
                    <span>*</span>
                  </label>
                  <Form.Item  className="px-4">
                    <Input.Password />
                  </Form.Item>
                </div>
                <div className="col-12 text-center">
                  <Form.Item>
                    <Button
                      style={{ background: "#FF9138", color: "white" }}
                      className="w-25 mt-2"
                      type="link"
                      href="/"
                    >
                      Xác nhận
                    </Button>
                  </Form.Item>
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
};

export default ConfilmPassword;
