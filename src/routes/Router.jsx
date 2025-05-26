import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePg from "../pages/HomePg";
import Status from "../pages/Status";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePg />,
  },
  {
    path: "/status",
    element: <Status />,
  },
]);

function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Router;
