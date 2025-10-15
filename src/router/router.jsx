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
import Rider from "../pages/dashboard/rider/Rider";
import PendingRiders from "../pages/dashboard/admin/PendingRiders";
import ActiveRiders from "../pages/dashboard/admin/ActiveRiders";
import MakeAdmin from "../pages/dashboard/admin/MakeAdmin";
import Forbidden from "../components/shared/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/dashboard/admin/AssignRider";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliveries from "../pages/dashboard/rider/PendingDeliveries";
import CompletedDeliveries from "../pages/dashboard/rider/CompletedDeliveries";
import MyEarnings from "../pages/dashboard/rider/MyEarnings";
import DashboardHome from "../pages/dashboard/DashboardHome";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import UserDashboard from "../pages/dashboard/UserDashboard";
import RiderDashboard from "../pages/dashboard/RiderDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import About from "../pages/about/About";


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
      },
      {
        path:"about",
        Component: About
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
        index:true,
        Component:DashboardHome
      },
      {
        path:"userDashboard",
        Component: UserDashboard
      },
      {
        path:"riderDashboard",
        Component: RiderDashboard
      },
      {
        path:"adminDashboard",
        Component:AdminDashboard
      },
      {
        path:"updateProfile",
        Component:UpdateProfile
      },
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
        path:'pending-deliveries',
        element: <RiderRoute><PendingDeliveries/></RiderRoute>
      },
      {
        path:'completed-deliveries',
        element: <RiderRoute><CompletedDeliveries/></RiderRoute>
      },
      {
        path:'my-earnings',
        element: <RiderRoute><MyEarnings/></RiderRoute>
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
