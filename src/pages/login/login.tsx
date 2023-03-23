import { message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Values } from "../../@types/on-finish-types";
import { axiosInstans } from "../../api/axios";
import { Auth } from "../../components";
import { authActions } from "../../store";

export const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onFinish = async (val: Values) => {
    try {
      setLoading(true);
      const { data } = await axiosInstans.post("login", {
        email: val.email,
        password: val.password,
      });
      dispatch(authActions.setUser(data));
    } catch (e: any) {
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
      <Auth loading={loading} onFinish={onFinish} title="Login" link="signup" />
    </>
  );
};
