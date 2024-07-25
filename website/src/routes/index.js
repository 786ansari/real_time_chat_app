import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Join from "../pages/Auth/Join";
import ChatPage from "../pages/Chat";
import NotFound from "../pages/Notfound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "../pages/Auth/Register";
import { ProfileProvider } from "../context/Profile.context";
import { PrivateRoute } from "./Private.routes";
import PublicRoute from "./Public.routes";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute element={Join}  />,
    },
    {
      path: "/login",
      element:<PublicRoute element={Join}  />,
    },
    {
      path: "/register",
      element: <PublicRoute element={Register}  />,
    },
    {
      path: "/chat",
      element: <PrivateRoute element={ChatPage} />
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <ProfileProvider>
        <RouterProvider router={routes}></RouterProvider>
      </ProfileProvider>
      <ToastContainer />
    </>
  );
};

export default Routes;
