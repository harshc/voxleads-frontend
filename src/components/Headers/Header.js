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
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  return (
    <>
      <div className="header bg-gradient-default pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row className="border border-danger bg-warning opacity-5 px-3 py-2 align-items-center mb-4">
              <Col className="col-auto">
                <div className="icon shadow">
                  <i className="fas fa-triangle-exclamation text-white text-lg" />
                </div>
              </Col>
              <Col>
                <p className="form-control-label mb-0 text-white">ACTION REQUIRED: Please complete your <a href="/admin/user-profile" className="text-underline">User</a> and <a href="/admin/call-centers" className="text-underline">Company</a> profiles before adding Leads.</p>
              </Col>
            </Row>
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Call Credits
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          350 / 4000
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success opacity-5 text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-nowrap">
                        <a href="#">View Call Logs</a>
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Agents Online
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">2 / 5</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-user-group" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-nowrap">
                        <a href="#">View Agents</a>
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Leads
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">924</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-primary opacity-5 text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-nowrap">
                        <a href="#">View Leads</a>
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Bookings
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">12</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-default opacity-8 text-white rounded-circle shadow">
                          <i className="fas fa-calendar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-nowrap">
                        <a href="#">View Bookings</a>
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
