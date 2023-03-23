import { Button, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, authActions } from "../../store";

const { Header } = Layout;

export const Head: React.FC = () => {
  const { user } = useSelector((item: RootState) => item.auth);
  const dispatch = useDispatch();
  return (
    <>
      <Layout className="layout sticky top-0 z-10">
        <Header>
          <div className="container mx-auto max-w-5xl flex items-center justify-between">
            {user && (
              <a href="/" className="text-white">
                Welcome {user.name}
              </a>
            )}
            <Button
              onClick={() => dispatch(authActions.setUser(null))}
              className="text-white"
              type="dashed"
            >
              Log out
            </Button>
          </div>
        </Header>
      </Layout>
    </>
  );
};
