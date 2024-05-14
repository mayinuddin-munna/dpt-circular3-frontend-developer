import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/shared/Home/Home";
import Main from "../layout/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      }
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
