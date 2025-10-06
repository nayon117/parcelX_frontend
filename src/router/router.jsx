import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Coverage from "../pages/coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/parcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/dashboard/merchant/MyParcels";
import Payment from "../pages/dashboard/payment/Payment";
import PaymentHistory from "../pages/dashboard/payment/PaymentHistory";
import TrackParcel from "../pages/dashboard/merchant/TrackParcel";
import Rider from "../pages/dashboard/rider/Rider";
import PendingRiders from "../pages/dashboard/admin/PendingRiders";
import ActiveRiders from "../pages/dashboard/admin/ActiveRiders";
import MakeAdmin from "../pages/dashboard/admin/MakeAdmin";
import Forbidden from "../components/shared/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/dashboard/admin/AssignRider";


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
        path: "forbidden",
        Component: Forbidden
      },
      {
        path:"sendParcel",
        element:<PrivateRoute><SendParcel/></PrivateRoute>,
        loader:()=>fetch('./serviceCenter.json')
      },
      {
        path:"rider",
        element:<PrivateRoute><Rider/></PrivateRoute>,
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
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
    children:[
      {
        path:"myParcels",
        Component:MyParcels
      },
      {
        path:"payment/:id",
        Component: Payment
      },
      {
        path:"paymentHistory",
        Component: PaymentHistory
      },
      {
        path:"track",
        Component: TrackParcel
      },
      {
        path:'assign-rider',
        element: <AdminRoute><AssignRider/></AdminRoute>
      },
      {
        path:'pending-riders',
        element: <AdminRoute><PendingRiders/></AdminRoute>
      },
      {
        path:'active-riders',
        element: <AdminRoute><ActiveRiders/></AdminRoute>
      },
      {
        path:'makeAdmin',
        element:<AdminRoute><MakeAdmin/></AdminRoute>
      }
    ]
  }
]);
