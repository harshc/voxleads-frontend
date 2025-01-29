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
import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {auth, db, googleProvider } from "../../firebase-config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); 

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // await saveUserData(userCredential.user);
      navigate("/admin/user-profile"); // Redirect to the details form
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Initiating Google login...");
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google login successful:", user);
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber
      };
      
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      navigate("/admin/user-profile", {state: userInfo});
    } catch (err) {
      setError(err.message);
    }
  };

  const saveUserData = async (user) => {
    const userDoc = doc(db, "users", user.uid);
    await setDoc(userDoc, {
      email: user.email,
      name: user.displayName || "",
      createdAt: new Date().toISOString(),
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/user-profile");
      }
    });
    return () => unsubscribe();
  }, [navigate]);


  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div className="btn-wrapper text-center">
            <Button
              className="btn-neutral btn-icon"
              color="default"
              onClick={handleGoogleLogin}
            >
              <span className="btn-inner--icon">
                <img
                  alt="Google"
                  src={require("../../assets/img/icons/common/google.svg").default}
                />
              </span>
              <span className="btn-inner--text">Google</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Or sign in with credentials</small>
          </div>
          <Form role="form" onSubmit={handleEmailLogin}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </FormGroup>
            {error && <div className="text-danger">{error}</div>}
            <div className="text-center">
              <Button className="my-4" color="primary" type="submit">
                Sign in
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Login;
