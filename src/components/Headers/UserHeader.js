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

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import React, {useEffect, useState} from "react";
import {auth} from "../../firebase-config";

const UserHeader = () => {
  const [user, setUser] = useState({ name:"", photo: ""});

  useEffect(()=> {
    const currentUser = auth.currentUser;
    if(currentUser) {
      setUser({
        name: currentUser.displayName || "No Name", 
        photo: currentUser.photoURL || require("../../assets/img/icons/common/google.svg")});
    }
  }, []);
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "50px",
          // backgroundImage: `url(${require("../../assets/img/theme/profile-cover.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />
      </div>
    </>
  );
};

export default UserHeader;
