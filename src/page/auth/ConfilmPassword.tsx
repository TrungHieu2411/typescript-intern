import React, { useState, useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import { FormInstance } from "antd/lib/form";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const ConfirmPassword: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailParam = searchParams.get("email");

    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, []);

  const onFinish = async (values: any) => {
    const { password } = values;

    try {
      if (!email) {
        message.error("Không tìm thấy địa chỉ email.");
        return;
      }

      // Xác nhận mật khẩu mới
      await firebase.auth().confirmPasswordReset(email, password);

      setIsSuccess(true);
      message.success("Thay đổi mật khẩu thành công!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.log("Lỗi thay đổi mật khẩu:", error);
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <div className="row px-5">
              <div className="col-12 text-center">
                <img className="h-50 mt-5" src="../assets/image/logo.jpg" alt="" />
              </div>

              <Form
                name="basic"
                autoComplete="off"
                ref={formRef}
                onFinish={onFinish}
              >
                <div className="col-12 px-5 text-center">
                  <label htmlFor="" className="fs-5 fw-bold">
                    Đặt lại mật khẩu mới
                  </label>
                </div>
                <div className="col-12 px-5 mt-2">
                  <label htmlFor="" className="px-4">
                    Mật khẩu mới<span>*</span>
                  </label>
                  <Form.Item
                    name="password"
                    className="px-4"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu mới!",
                      },
                      {
                        min: 6,
                        message: "Mật khẩu phải có ít nhất 6 ký tự!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </div>
                <div className="col-12 px-5">
                  <label htmlFor="" className="px-4">
                    Xác nhận lại mật khẩu mới<span>*</span>
                  </label>
                  <Form.Item
                    name="passwordConfirmation"
                    className="px-4"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng xác nhận lại mật khẩu mới!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error("Mật khẩu không khớp!"));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </div>
                <div className="col-12 text-center">
                  <Form.Item>
                    <Button
                      style={{ background: "#FF9138", color: "white" }}
                      className="w-25 mt-2"
                      htmlType="submit"
                    >
                      Xác nhận
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-7">
            <img className="img-fluid" src="../assets/image/bg-main.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassword;
