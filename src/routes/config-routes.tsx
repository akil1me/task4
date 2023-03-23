import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import { Home, Login, SignUp } from "../pages";
import { RootState } from "../store";

type RoutesType = {
  path: string;
  element: React.ReactNode;
};

const routes: RoutesType[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

const auth = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];

export const ConfigRoutes = () => {
  const { user } = useSelector((item: RootState) => item.auth);
  const { users } = useSelector((item: RootState) => item.users);

  const status = users.find((item) => item.id === user?.id);
  if (status?.status === "blocked") {
    localStorage.removeItem("user");
    window.location.reload();
  }
  return useRoutes([...(user ? routes : auth)]);
};
