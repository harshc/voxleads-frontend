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
import { useAccount } from "../../context/AccountContext";
import { useTime } from "../../context/TimeContext";

const Header = () => {
  const { 
    userProfileComplete, 
    companyProfileComplete, 
    subscriptionComplete, 
    loading 
  } = useAccount();
  const { formattedTime, timezone } = useTime();

  const getWarningMessage = () => {
    const incomplete = [];
    if (!userProfileComplete) incomplete.push(<a key="user" href="/admin/user-profile" className="text-underline text-secondary">User Profile</a>);
    if (!companyProfileComplete) incomplete.push(<a key="company" href="/admin/call-centers" className="text-underline text-secondary">Company Profile</a>);
    if (!subscriptionComplete) incomplete.push(<a key="payment" href="/admin/payment" className="text-underline text-secondary">Payment Subscription</a>);
    
    if (incomplete.length === 0) return null;
    
    return (
      <>
        ACTION REQUIRED: Please complete your {incomplete.reduce((prev, curr, i) => [
          prev,
          i < incomplete.length - 1 ? (i === incomplete.length - 2 ? " and " : ", ") : "",
          curr
        ])} before adding Leads.
      </>
    );
  };

  return (
    <>
      <div className="header bg-gradient-default pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <div className="text-right mb-3">
              <span className="text-white">
                {formattedTime} ({timezone})
              </span>
            </div>
            {!loading && getWarningMessage() && (
              <Row className="border border-danger bg-warning px-0 py-2 w-100 mx-auto align-items-center mb-4 rounded">
                <Col className="col-auto">
                  <div className="icon shadow d-flex align-items-center justify-content-center">
                    <i className="fas fa-triangle-exclamation text-white text-lg" />
                  </div>
                </Col>
                <Col>
                  <p className="form-control-label mb-0 text-white">{getWarningMessage()}</p>
                </Col>
              </Row>
            )}
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
                          4000
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
