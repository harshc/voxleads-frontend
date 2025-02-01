import React, { useState, useEffect } from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Badge,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  NavItem,
  NavLink,
  Nav,
  UncontrolledTooltip,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";

const Logs = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  
  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="4">
            <Card className="card-profile shadow mb-4">
              <CardBody className="pt-4">
                <div className="">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        Call Logs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        Stats
                      </a>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="card-stats shadow mb-4">
              <CardBody>
                <Row>
                  <Col>
                    <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                    >
                        Call Time
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                        350 / 4000
                    </span>
                  </Col>
                  <Col className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i className="fas fa-chart-bar" />
                  </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <a href="#">
                    <span className="text-nowrap">Add more minutes</span>
                  </a>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="5">
                    <h3 className="mb-0">Call Logs</h3>
                  </Col>
                  <Col className="text-right" xs="7">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        href="#"
                        role="button"
                        size="sm"
                        color="primary"
                        onClick={(e) => e.preventDefault()}
                      >
                        Select Agent <i className="fas fa-angle-down ml-2" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Sara Doe
                        </DropdownItem>
                        <DropdownItem
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          John Doe
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Row>
                <Col className="mb-4 d-flex justify-content-start align-items-center text-lg">
                  <h3 className="mb-0">Agent:</h3>
                  <div className="ml-2">
                    <a href="#">Sara Doe</a>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <h3 className="mb-3">Active Call</h3>
                  <Card className="card-stats mb-4 mb-lg-0 border-success">
                      <CardBody>
                        <Row>
                          <Col>
                            <CardTitle
                            tag="h4"
                            className="text-uppercase font-weight-bold mb-0"
                            >
                                <a href="">Lead_Name</a>
                            </CardTitle>
                            <div className="text-sm form-control-label">
                                +1 (927) 123-4557
                            </div>
                          </Col>
                          <Col className="col-auto">
                            <div className="company_logo avatar avatar-sm rounded-circle shadow">
                                <img
                                alt="..."
                                className="rounded-circle"
                                src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                />
                            </div>
                          </Col>
                        </Row>
                        <Row className="justify-content-between mt-3">
                          <Col xs="6">
                            <Badge color="success" className="text-sm text-white bg-success">
                              03:12:45 m
                            </Badge>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Badge color="" className="badge-dot">
                              <i className="bg-success" />
                              In Progress
                            </Badge>
                          </Col>
                        </Row>
                      </CardBody>
                  </Card>
                </Col>
                <Col lg="6">
                  <h3 className="mb-3">Next in Queue</h3>
                  <Card className="card-stats mb-0">
                    <CardBody>
                      <Row>
                        <Col>
                          <CardTitle
                          tag="h4"
                          className="text-uppercase font-weight-bold mb-0"
                          >
                          <a href="">Lead_Name</a>
                          </CardTitle>
                          <div className="text-sm form-control-label">
                            +1 (927) 123-4557
                          </div>
                        </Col>
                        <Col className="col-auto">
                          <div className="company_logo avatar avatar-sm rounded-circle shadow">
                              <img
                              alt="..."
                              className="rounded-circle"
                              src={require("../../assets/img/theme/team-4-800x800.jpg")}
                              />
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-between mt-3">
                        <Col xs="6">
                          <Badge color="light" className="text-sm border">
                            00:00:00 m
                          </Badge>
                        </Col>
                        <Col xs="6" className="text-right">
                            <Badge color="" className="badge-dot">
                              <i className="bg-warning" />
                              In Queue
                            </Badge>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col className="text-right text-sm mt-2">
                  <a href="#">View upcoming call queue</a>
                </Col>
              </Row>
              <Row className="mb-3 mt-4">
                <Col>    
                  <Nav className="justify-content-start" pills>
                    <NavItem className="mr-2 mr-md-0">
                      <NavLink
                        className={classnames("py-2 px-3", {
                          active: activeNav === 1,
                        })}
                        href="#"
                        onClick={(e) => toggleNavs(e, 1)}
                      >
                        <span className="d-none d-md-block">Call History</span>
                        <span className="d-md-none">History</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames("py-2 px-3", {
                          active: activeNav === 2,
                        })}
                        data-toggle="tab"
                        href="#"
                        onClick={(e) => toggleNavs(e, 2)}
                      >
                        <span className="d-none d-md-block">Call Queue</span>
                        <span className="d-md-none">Queue</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
              <Table className="align-items-center table-flush table-secondary table-striped table-hover" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Call ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Minutes</th>
                    <th scope="col">Status</th>
                    <th scope="col">Agent</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            <a href="#">
                              Call #123456
                            </a>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>2025-01-27 08:26:49</td>         
                    <td>
                      <div className="time-amount">
                        04:12:34 m
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        In Progress
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip996637554"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip996637554"
                        >
                          Sara Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Call Log
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Archive Call Log
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            <a href="#">
                              Call #123456
                            </a>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>2025-01-27 08:26:49</td>         
                    <td>
                      <div className="time-amount">
                        11:12:34 m
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        Completed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip996637554"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip996637554"
                        >
                          Sara Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Call Log
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Archive Call Log
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            <a href="#">
                              Call #123456
                            </a>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>2025-01-27 08:26:49</td>         
                    <td>
                      <div className="time-amount">
                        00:00:00 m
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-warning" />
                        In Queue
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip996637554"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip996637554"
                        >
                          Sara Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Call Log
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Archive Call Log
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            <a href="#">
                              Call #123456
                            </a>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>2025-01-27 08:26:49</td>         
                    <td>
                      <div className="time-amount">
                        00:00:00 m
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-danger" />
                        Failed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip996637554"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip996637554"
                        >
                          Sara Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Call Log
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Archive Call Log
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
              </CardBody>
              <CardFooter className="py-4">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col md="5" className="text-sm mb-3 mb-md-0">
                    Showing <strong>1 - 10</strong> of 345
                  </Col>
                  <Col md="7">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </nav>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
               <CardHeader className="bg-white border-0">
                 <Row className="align-items-center">
                   <Col xs="5">
                     <h3 className="mb-0">Call #123453</h3>
                   </Col>
                   <Col className="d-flex justify-content-end" xs="7">
                      <div>
                        <Button
                            color="primary"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                        >
                            Print
                        </Button>
                      </div>
                      <div className="ml-2">
                        <Button
                            color="light"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                        >
                            Close
                        </Button>
                      </div>
                    </Col>
                 </Row>
               </CardHeader>
               <CardBody>
                <Row>
                  <Col className="mb-4 d-flex justify-content-start align-items-center text-lg">
                    <h3 className="mb-0">Agent:</h3>
                    <div className="ml-2">
                      <a href="#">Sara Doe</a>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <div className="mb-4">
                       <div className="form-control-label">
                         Call ID
                       </div>
                       <div>
                         #123453
                       </div>
                     </div>
                     <div>
                       <div className="form-control-label">
                         Call Date
                       </div>
                       <div>
                         2025-01-27 12:53:23
                       </div>
                     </div>
                  </Col>
                  <Col lg="6">
                    <Card className="card-stats mt-4 mt-lg-0 border-success">
                      <CardBody>
                        <Row>
                          <Col>
                            <CardTitle
                            tag="h4"
                            className="text-uppercase font-weight-bold mb-0"
                            >
                              <a href="">Lead_Name</a>
                            </CardTitle>
                            <div className="text-sm form-control-label">
                              +1 (927) 123-4557
                            </div>
                          </Col>
                          <Col className="col-auto">
                            <div className="company_logo avatar avatar-sm rounded-circle shadow">
                              <img
                              alt="..."
                              className="rounded-circle"
                              src={require("../../assets/img/theme/team-4-800x800.jpg")}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="justify-content-between mt-3">
                        <Col xs="6">
                            <Badge color="success" className="text-sm text-white bg-success">
                              03:12:45 m
                            </Badge>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Badge color="" className="badge-dot">
                            <i className="bg-success" />
                            Completed
                          </Badge>
                        </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                   <hr className="my-4" />
                   <h6 className="heading-small text-muted mb-4">
                     Call Summary
                   </h6>
                    <Card className="card-stats mb-0">
                      <CardBody>
                        <Row>
                          <div className="col text-sm chat-description">
                            Add chat transcript here...
                          </div>
                        </Row>
                      </CardBody>
                    </Card>
               </CardBody>
            </Card>
          </Col>
        </Row>
        <div aria-live="polite" aria-atomic="true" className="position-relative">
        {/*<!-- Position it: -->
        <!-- - `.toast-container` for spacing between toasts -->
        <!-- - `top-0` & `end-0` to position the toasts in the upper right corner -->
        <!-- - `.p-3` to prevent the toasts from sticking to the edge of the container  -->*/}
        <div className="toast-container top-0 end-0 p-3">
      
          {/*<!-- Then put toasts within -->*/}
          <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Bootstrap</strong>
              <small className="text-body-secondary">just now</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              See? Just like this.
            </div>
          </div>
      
          <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Bootstrap</strong>
              <small className="text-body-secondary">2 seconds ago</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Heads up, toasts will stack automatically
              <div className="mt-2 pt-2 border-top d-flex justify-content-end">
                <button type="button" className="btn btn-primary btn-sm">Take action</button>
                <button type="button" className="btn btn-light btn-sm ml-2" data-bs-dismiss="toast">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Container>
    </>
  );
};

export default Logs;
