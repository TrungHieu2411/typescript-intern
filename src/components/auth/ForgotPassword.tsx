import React from "react";
import { Button, Input, Typography, Form } from "antd";
import { FormInstance } from "antd/lib/form";
const { Link } = Typography;

const ForgotPassword: React.FC = () => {
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
                    Đặt lại mật khẩu
                  </label>
                </div>
                <div className="col-12 px-5 mt-2 text-center">
                  <label htmlFor="" className="px-4 ">
                    Vui lòng nhập email để đặt lại mật khẩu của bạn <span>*</span>
                  </label>
                  <Form.Item
                    name="username" className="px-4"
                  >
                    <Input />
                  </Form.Item>
                </div>
                
                <div className="col-12 text-center">
                  <Form.Item>
                  <Button
                      danger
                      htmlType="submit" 
                      href="/"
                      className="me-3 mt-2 w-25"
                    >
                      Hủy
                    </Button>
                    <Button
                      type="link"
                      style={{ background: "#FF9138", color: "white" }}
                      className="w-25"
                      href="/xacnhanmatkhau"
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
              src="./assets/image/bg-main.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
