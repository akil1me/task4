import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { Values } from "../../@types/on-finish-types";

type AuthProps = {
  link: string;
  title: string;
  userName?: React.ReactNode;
  loading: boolean;
  onFinish: (val: Values) => void;
};

export const Auth: React.FC<AuthProps> = ({
  title,
  link,
  userName,
  onFinish,
  loading,
}) => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="max-w-sm flex-auto px-3">
        <h2 className="text-center  text-2xl mb-8">{title}</h2>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {userName}
          <Form.Item
            className="mb-8"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                type: "email",
                message: "Please input Email type!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            className="mb-8"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              type="dashed"
              htmlType="submit"
              className="login-form-button"
            >
              {title}
            </Button>
            <span className="float-right">
              Or{" "}
              <Link className="text-blue-500" to={`/${link}`}>
                {link} now!
              </Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
