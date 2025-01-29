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
import { useState } from "react";
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

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

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
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Test Call
                    </h6>
                    <h2 className="text-white mb-0">Try Our Automated Agent</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <div className="py-2 px-3 nav-link">
                          <span className="d-block">Vox Agent</span>
                        </div>
                      </NavItem>
                      <NavItem>
                        <div className="py-2 px-3 nav-link bg-success">
                          <span className="d-block text-white">Online</span>
                        </div>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading text-muted mb-4">
                    Try a 5 minute call with one of our Agents
                  </h6>
                  <div>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label text-white"
                            htmlFor="testPhone"
                          >
                            Enter your phone number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="testPhone"
                            placeholder="Your Phone Number"
                            type="tel"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                    <Button color="primary" href="#">
                      Start Call
                    </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                    <Row>
                    <div className="col">
                    <CardTitle
                    tag="h2"
                    className="text-uppercase font-weight-bold mb-0"
                    >
                    Sara Doe
                    </CardTitle>
                    <div>
                        <Badge color="" className="badge-dot">
                            <i className="bg-success" />
                            Online
                        </Badge>
                    </div>
                    </div>
                    <Col className="col-auto">
                    <div className="company_logo avatar avatar-lg rounded-circle shadow">
                        <img
                        alt="..."
                        className="rounded-circle"
                        src="https://voxleads-api-stg-bv7a.uc.r.appspot.com/static/media/team-4-800x800.99c612eb60728a5aeeb0.jpg"
                        />
                    </div>
                    </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                    <a href="#">
                        View Agent Details
                    </a>
                    </p>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
