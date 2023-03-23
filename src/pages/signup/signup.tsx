import { UserOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Values } from "../../@types/on-finish-types";
import { axiosInstans } from "../../api/axios";
import { Auth } from "../../components";

export const SignUp: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (val: Values) => {
    try {
      setLoading(true);
      await axiosInstans.post("register", {
        name: val.username,
        email: val.email,
        password: val.password,
      });

      navigate("/login");
    } catch (e: any) {
      console.log(e);

      messageApi.open({
        type: "error",
        content: e.response.data.message,
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <Auth
        loading={loading}
        onFinish={onFinish}
        title="Sign up"
        link="login"
        userName={
          <Form.Item
            className="mb-8"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
        }
      />
    </>
  );
};
