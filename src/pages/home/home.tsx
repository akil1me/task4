import { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstans } from "../../api/axios";
import { Container, Head } from "../../components";
import { RootState, authActions, usersActions } from "../../store";
import { Status, dataAddKey } from "./table-config";

import {
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import "./home.scss";

export const Home: React.FC = () => {
  const { users } = useSelector((item: RootState) => item.users);
  const dispatch = useDispatch();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [blocking, setBlocking] = useState<boolean>(false);
  const [deleting, setDelting] = useState<boolean>(false);

  const handleStatusClick = async (status: "blocked" | "active") => {
    const datum = {
      status,
      id: selectedRowKeys,
    };
    try {
      setLoading(true);
      setBlocking(true);
      await axiosInstans.put("users", datum);
      const { data } = await axiosInstans.get("users");

      dispatch(usersActions.setUsers(dataAddKey(data)));
    } catch (error) {
      console.log(error);
    } finally {
      setBlocking(false);
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    const config: AxiosRequestConfig<any> = {
      params: selectedRowKeys,
      data: selectedRowKeys,
    };
    try {
      setLoading(true);
      setDelting(true);
      const delelted = await axiosInstans.delete("users", config);

      dispatch(authActions.setDeletedUsers(delelted.data.rows));
      const { data } = await axiosInstans.get("users");
      dispatch(usersActions.setUsers(dataAddKey(data)));
    } catch (error) {
      console.log(error);
    } finally {
      setDelting(false);
      setLoading(false);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstans.get("users");
        dispatch(usersActions.setUsers(dataAddKey(data)));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [users?.length, dispatch]);

  return (
    <>
      <Head />
      <Container>
        <div className="mb-4">
          <Space wrap>
            <Button
              className="h-auto"
              icon={<LockOutlined className="align-middle" />}
              onClick={() => handleStatusClick("blocked")}
              disabled={!hasSelected}
              loading={blocking}
            >
              Block
            </Button>
            <Button
              className="h-auto"
              type="dashed"
              icon={<UnlockOutlined className="align-middle" />}
              onClick={() => handleStatusClick("active")}
              disabled={!hasSelected}
              loading={blocking}
            >
              Unblock
            </Button>
            <Button
              className="h-auto"
              danger
              icon={<DeleteOutlined className="align-middle" />}
              onClick={deleteUser}
              disabled={!hasSelected}
              loading={deleting}
            >
              Delete
            </Button>
          </Space>
          <span className="ml-2">
            {hasSelected ? `Selected ${selectedRowKeys.length} users` : ""}
          </span>
        </div>
        <div className="home-table">
          <Table
            rowSelection={rowSelection}
            pagination={false}
            columns={[
              {
                title: "ID",
                dataIndex: "id",
                width: 50,
              },
              {
                title: "Name",
                dataIndex: "name",
              },
              {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Registered",
                dataIndex: "registered_at",
                render: (text: string): React.ReactNode => text.slice(0, 10),
              },
              {
                title: "Last login",
                dataIndex: "last_login_at",
                render: (text: string): React.ReactNode =>
                  text === null ? "Not logined" : text.slice(0, 10),
              },
              {
                title: "Status",
                dataIndex: "status",
                render: (text: Status): React.ReactNode => (
                  <Tag color={text === "blocked" ? "volcano" : "green"}>
                    {text}
                  </Tag>
                ),
              },
            ]}
            loading={loading}
            dataSource={users}
          />
        </div>
      </Container>
    </>
  );
};
