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
import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  CardTitle,
  Badge,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import api from "../services/api";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");


  const navigate = useNavigate();
  const isAuthenticated = auth.currentUser !== null;
  
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated.");
      navigate("/auth/login");
    } else {
      // Fetch user's phone number from Firestore
      const fetchUserPhoneNumber = async () => {
        try {
          const currentUser = auth.currentUser;
          if (currentUser) {
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const phone = userDoc.data().phone || "";
              if (phone) {
                setUserPhoneNumber(phone);
              } else {
                console.error("Error: No registered phone number found. Please update your profile.");
              }
              setUserPhoneNumber(userDoc.data().phone || "");
            }
          }
        } catch (error) {
          console.error("Error fetching user phone number:", error);
        }
      };
      fetchUserPhoneNumber();
    }
  }, [isAuthenticated, navigate]);

  const handleTestCall = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!userPhoneNumber) {
      setMessage("Error: Unable to fetch your registered phone number.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/calls/test-call?phone_number=${encodeURIComponent(userPhoneNumber)}`);
      const data = await response.json();
      if (response.ok) {
        console.log(`Call initiated successfully: ${JSON.stringify(data)}`);
      } else {
        console.log(`Error: ${data.detail}`);
      }
    } catch (error) {
      console.error(`Failed to connect to the server. ${error.detail}`);
    } finally {
      setLoading(false);
    }
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0 d-flex align-items-stretch" xl="8">
            <Card className="bg-gradient-default border border-secondary shadow w-100">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Test Call
                    </h6>
                    <h2 className="text-white mb-0">Speak With An Agent</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <div className="py-2 px-3 nav-link">
                          <span className="d-block">Vox Agent</span>
                        </div>
                      </NavItem>
                      <NavItem>
                        <div className="py-2 px-3 ml-2 ml-md-0 nav-link bg-success">
                          <span className="d-block text-white">Online</span>
                        </div>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="">
                <Row>
                <h6 className="heading text-muted mb-4">
                  Try a 5 minute call with one of our Agents
                </h6>
                </Row>
                <Row>
                <Col lg="6">
                <Form onSubmit={handleTestCall}>
                  <Row>
                    <Col>
                    <FormGroup>
                        <label
                        className="form-control-label text-white"
                        htmlFor="testPhone"
                        >
                        Your Registered Phone Number
                        </label>
                        <Input
                        className="form-control-alternative"
                        id="testPhone"
                        placeholder="Your Phone Number"
                        type="tel"
                        value={userPhoneNumber}
                        readOnly
                        />
                    </FormGroup>
                    </Col>
                  </Row>
                  <Button color="primary" disabled={loading}>
                    {loading ? "Calling..." : "Start Call"}
                  </Button>
                </Form>
                </Col>
                {/* If Call is Active */}
                <Col lg="6">
                    <Button color="success">
                    Active Call <span class="badge bg-secondary text-primary ml-4 text-xs">4:12:43 m</span>
                    </Button>
                </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow border">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Account Status</h2>
                    <h6 className="text-uppercase text-warning ls-1 mt-1">
                      Action Required
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="py-2">
                {/* Account Elements */}
                <div className="">
                  <ul className="list-group list-group-flush">
                    <a href="">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Complete User Profile</div>
                      </div>
                      <i className="ni ni-check-bold text-lg text-success"></i>
                    </li>
                    </a>
                    <a href="">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Complete Company Profile</div>
                      </div>
                      <i className="ni ni-fat-add text-xl text-yellow"></i>
                    </li>
                    </a>
                    <a href="">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Configure Your Agents</div>
                      </div>
                      <i className="ni ni-fat-add text-xl text-muted"></i>
                    </li>
                    </a>
                    <a href="">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Add Leads</div>
                      </div>
                      <i className="ni ni-fat-add text-xl text-muted"></i>
                    </li>
                    </a>
                    <a href="">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Call Credits</div>
                      </div>
                      <span className="badge bg-primary text-white rounded-pill">4000</span>
                    </li>
                    </a>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
