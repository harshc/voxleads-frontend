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
import Profile from "views/components/Profile.js";
import Centers from "views/components/Centers.js";
import Clients from "views/components/Clients.js";
import Maps from "views/components/Maps.js";
import Register from "views/components/Register.js";
import Login from "views/components/Login.js";
import Tables from "views/components/Tables.js";
import Icons from "views/components/Icons.js";
import UserDetails from "views/components/UserDetails";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/call-centers",
    name: "Call Centers",
    icon: "ni ni-bullet-list-67 text-green",
    component: <Centers />,
    layout: "/admin",
  },
  {
    path: "/client-list",
    name: "Client List",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <Clients />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
