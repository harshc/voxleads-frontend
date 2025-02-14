/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import { useAccount } from "./context/AccountContext";
import { Navigate } from "react-router-dom";
import Profile from "views/components/Profile.js";
import Centers from "views/components/Centers.js";
import Leads from "views/components/Leads.js";
import Clients from "views/components/Clients.js";
import Logs from "views/components/Logs.js";
import Maps from "views/components/Maps.js";
import Register from "views/components/Register.js";
import Login from "views/components/Login.js";
import Tables from "views/components/Tables.js";
import Icons from "views/components/Icons.js";
import UserHeader from "components/Headers/UserHeader";
import ProtectedRoute from "components/ProtectedRoutes";
import Payment from "views/components/Payment";
import Validation from "views/components/Validation";
import Agents from "views/components/Agents";
import Bookings from "views/components/Bookings";

const RouteWrapper = ({ children }) => {
  const { userProfileComplete, companyProfileComplete, subscriptionComplete } = useAccount();
  return children({ userProfileComplete, companyProfileComplete, subscriptionComplete });
};

const routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-app text-default",
    component: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-default",
    component: (
      <ProtectedRoute>
          <UserHeader />
          <Profile />
      </ProtectedRoute>
    ),
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/call-centers",
    name: "Call Centers",
    icon: "ni ni-headphones text-default",
    component: (
      <ProtectedRoute>
        <Centers />
      </ProtectedRoute>
    ),
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/agents",
    name: "Agents",
    icon: "ni ni-single-02 text-default",
    component: (
      <RouteWrapper>
        {({ userProfileComplete, companyProfileComplete, subscriptionComplete }) => (
          <ProtectedRoute>
            {userProfileComplete && companyProfileComplete && subscriptionComplete ? (
              <Agents />
            ) : (
              <Navigate to="/admin/index" replace />
            )}
          </ProtectedRoute>
        )}
      </RouteWrapper>
    ),
    layout: "/admin",
    showInSidebar: ({ userProfileComplete, companyProfileComplete, subscriptionComplete }) => 
      userProfileComplete && companyProfileComplete && subscriptionComplete,
  },
  {
    path: "/leads",
    name: "Leads",
    icon: "ni ni-collection text-default",
    component: (
      <RouteWrapper>
        {({ userProfileComplete, companyProfileComplete, subscriptionComplete }) => (
          <ProtectedRoute>
            {userProfileComplete && companyProfileComplete && subscriptionComplete ? (
              <Leads />
            ) : (
              <Navigate to="/admin/index" replace />
            )}
          </ProtectedRoute>
        )}
      </RouteWrapper>
    ),
    layout: "/admin",
    showInSidebar: ({ userProfileComplete, companyProfileComplete, subscriptionComplete }) => 
      userProfileComplete && companyProfileComplete && subscriptionComplete,
  },
  {
    path: "/logs",
    name: "Logs",
    icon: "ni ni-bullet-list-67 text-default",
    component: (
      <ProtectedRoute>
        <Logs />
      </ProtectedRoute>
    ),
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/bookings",
    name: "Bookings",
    icon: "ni ni-calendar-grid-58 text-default",
    component: (
      <ProtectedRoute>
        <Bookings />
      </ProtectedRoute>
    ),
    layout: "/admin",
    showInSidebar: true
  },
  { 
    path: "/payment", 
    name: "Payment",
    icon: "ni ni-credit-card text-default",
    component: 
      <ProtectedRoute>
        <Payment />
      </ProtectedRoute>,
    layout: "/admin",
    showInSidebar: true,
  },
  { 
    path: "/validation", 
    name: "Payment Validation",
    icon: "ni ni-credit-card text-default",
    component: 
      <ProtectedRoute>
        <Validation />
      </ProtectedRoute>,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-default",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-default",
    component: <Register />,
    layout: "/auth",
  }

];

// var routes = [
//   {
//     path: "/index",
//     name: "Dashboard",
//     icon: "ni ni-tv-2 text-primary",
//     component: <Index />,
//     layout: "/admin",
//   },
//   {
//     path: "/user-profile",
//     name: "User Profile",
//     icon: "ni ni-single-02 text-yellow",
//     component: (
//       <>
//         <UserHeader />
//         <Profile />
//       </>
//     ),
//     layout: "/admin",
//   },
//   {
//     path: "/call-centers",
//     name: "Call Centers",
//     icon: "ni ni-bullet-list-67 text-green",
//     component: <Centers />,
//     layout: "/admin",
//   },
//   {
//     path: "/leads",
//     name: "Leads",
//     icon: "ni ni-bullet-list-67 text-blue",
//     component: <Leads />,
//     layout: "/admin",
//   },
//   {
//     path: "/client-list",
//     name: "Client List",
//     icon: "ni ni-bullet-list-67 text-info",
//     component: <Clients />,
//     layout: "/admin",
//   },
//   {
//     path: "/tables",
//     name: "Tables",
//     icon: "ni ni-bullet-list-67 text-red",
//     component: <Tables />,
//     layout: "/admin",
//   },
//   {
//     path: "/login",
//     name: "Login",
//     icon: "ni ni-key-25 text-info",
//     component: <Login />,
//     layout: "/auth",
//   },
//   {
//     path: "/register",
//     name: "Register",
//     icon: "ni ni-circle-08 text-pink",
//     component: <Register />,
//     layout: "/auth",
//   },
// ];
export default routes;
