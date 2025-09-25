import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Coverage from "../pages/coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/parcel/SendParcel";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:"coverage",
        Component:Coverage,
        loader:()=>fetch('./serviceCenter.json')
      },
      {
        path:"sendParcel",
        element:<PrivateRoute><SendParcel/></PrivateRoute>,
        loader:()=>fetch('./serviceCenter.json')
      }
    ]
  },
  {
    path:"/",
    Component:AuthLayout,
    children:[
      {
        path:"login",
        Component:Login
      },
      {
        path:"register",
        Component:Register
      }
    ]
  }
]);
