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

const Bookings = () => {
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
                        All Bookings
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
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                        New Bookings (24h)
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                        12
                    </span>
                  </Col>
                  <Col className="col-auto">
                  <div className="icon icon-shape bg-default text-white rounded-circle shadow">
                      <i className="fas fa-calendar" />
                  </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="5">
                    <h3 className="mb-0">Bookings</h3>
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
                        Filter <i className="fas fa-angle-down ml-2" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Newest First
                        </DropdownItem>
                        <DropdownItem
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Oldest First
                        </DropdownItem>
                        <DropdownItem
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          All
                        </DropdownItem>
                        <DropdownItem
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Unread
                        </DropdownItem>
                        <DropdownItem
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Responded
                        </DropdownItem>
                        <DropdownItem
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Pending
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
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
                        <span className="d-none d-md-block">All</span>
                        <span className="d-md-none">All</span>
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
                        <span className="d-none d-md-block">Unread</span>
                        <span className="d-md-none">Unread</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames("py-2 px-3", {
                          active: activeNav === 3,
                        })}
                        data-toggle="tab"
                        href="#"
                        onClick={(e) => toggleNavs(e, 3)}
                      >
                        <span className="d-none d-md-block">Opened</span>
                        <span className="d-md-none">Opened</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames("py-2 px-3", {
                          active: activeNav === 4,
                        })}
                        data-toggle="tab"
                        href="#"
                        onClick={(e) => toggleNavs(e, 4)}
                      >
                        <span className="d-none d-md-block">Pending</span>
                        <span className="d-md-none">Pending</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
              <Table className="align-items-center table-flush table-secondary table-striped table-hover border" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Call ID</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col">Lead</th>
                    <th scope="col">Location</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                          <span className="mb-0 text-sm">
                            <a href="#">
                              Call #123456
                            </a>
                          </span>
                      </Media>
                    </th>
                    <td>2025-02-28 @ 9:00</td>         
                    <td>
                      <a href="">
                        Lead_Name
                      </a>
                    </td>
                    <td>
                      <div className="location">
                        235 Somestreet, Austin <a href="#" className="text-underline">(Map)</a>
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-yellow" />
                        Unread
                      </Badge>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Booking
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Call Log
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Lead Details
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Booking
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                          <span className="mb-0 text-sm">
                            <a href="#">
                              Call #123456
                            </a>
                          </span>
                      </Media>
                    </th>
                    <td>2025-02-27 @ 10:00</td>         
                    <td>
                      <a href="">
                        Lead_Name
                      </a>
                    </td>
                    <td>
                      <div className="location">
                        235 Somestreet, Austin <a href="#" className="text-underline">(Map)</a>
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        Responded
                      </Badge>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Booking
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Call Log
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Lead Details
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Booking
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                          <span className="mb-0 text-sm">
                            <a href="#">
                              Call #123456
                            </a>
                          </span>
                      </Media>
                    </th>
                    <td>2025-01-27 @ 14:00</td>         
                    <td>
                      <a href="">
                        Lead_Name
                      </a>
                    </td>
                    <td>
                      <div className="location">
                        235 Somestreet, Austin <a href="#" className="text-underline">(Map)</a>
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-warning" />
                        Pending
                      </Badge>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Booking
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Call Log
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Lead Details
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Booking
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                          <span className="mb-0 text-sm">
                            <a href="#">
                              Call #123456
                            </a>
                          </span>
                      </Media>
                    </th>
                    <td>2025-01-20 @ 14:00</td>         
                    <td>
                      <a href="">
                        Lead_Name
                      </a>
                    </td>
                    <td>
                      <div className="location">
                        235 Somestreet, Austin <a href="#" className="text-underline">(Map)</a>
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-danger" />
                        Cancelled
                      </Badge>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Booking
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Call Log
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Lead Details
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Booking
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
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
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
            {/* Booking Details */}
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="6">
                      <h3 className="mb-0">Booking Details</h3>
                    </Col>
                    <Col xs="6" className="d-flex justify-content-end">
                      <div>
                        <Button color="primary" size="sm">
                        Edit
                        </Button>
                      </div>
                      <div className="ml-2">
                        <Button color="light" size="sm">
                        Close
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Card className="card-stats mb-4 mb-lg-0 border-success shadow">
                      <CardBody>
                        <Row className="align-items-center">
                          <Col>
                            <h5 className="text-uppercase font-weight-bold mb-2">
                                Date & Time
                            </h5>
                            <div className="text-sm form-control-label">
                                March 3, 2025
                            </div>
                            <Badge color="success" className="text-sm text-white bg-success">
                              2:00 PM
                            </Badge>
                          </Col>
                          <Col className="col-auto text-center">
                            <h6 className="heading-small text-muted mb-1">
                              Booked By
                            </h6>
                            <div className="company_logo avatar avatar-sm rounded-circle shadow">
                                <img
                                alt="..."
                                className="rounded-circle"
                                src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>

                    <h6 className="heading-small text-muted mb-4">
                        Status & Priority
                    </h6>
                    <div className="pl-lg-4">
                      <Row className="mb-3 align-items-center">
                        {/* Status Dropdown */}
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="status">
                               Status <i className="bg-yellow" />
                             </label>
                            <Input type="select" name="status">
                              <option value="unread" selected>Unread</option>
                              <option value="responded">Responded</option>
                              <option value="pending">Pending</option>
                              <option value="cancelled">Cancelled</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        {/* Ugency Dropdown */}
                        <Col lg="6">
                          <FormGroup>
                            <label
                               className="form-control-label"
                               htmlFor="leadUrgency"
                             >
                               Urgency
                             </label>
                             <select className="form-control-alternative form-control" id="leadUrgency">
                               <option selected>Select one...</option>
                               <option value="1">Critical</option>
                               <option value="2">High</option>
                               <option value="3">Medium</option>
                               <option value="4">Low</option>
                             </select>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row className="align-items-center">
                        <Col lg="12">
                            <span className="form-control-label">
                               Last Updated On: 
                             </span>
                             <span className="ml-1">
                               02/26/2025
                             </span>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Lead Details
                    </h6>
                    <div className="pl-lg-4">
                      {/* Lead Details */}
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              type="text"
                              name="first_name"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              type="text"
                              name="last_name"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>
  
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label>Email</label>
                            <Input
                              type="email"
                              name="email"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label>Phone Number</label>
                            <Input
                              type="text"
                              name="phone_number"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>
  
                      {/* Address Fields */}
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label>Street Address</label>
                            <Input
                              type="text"
                              name="street_address"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>
  
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label>City</label>
                            <Input
                              type="text"
                              name="city"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label>State</label>
                            <Input
                              type="text"
                              name="state"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>
  
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label>Country</label>
                            <Input
                              type="text"
                              name="country"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label>Zip Code</label>
                            <Input
                              type="text"
                              name="zip_code"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <div className="mt-2 text-sm text-underline">
                            <a href="#">View Lead's full details</a>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Additional Information
                    </h6>
                    <div className="pl-lg-4">
                      {/* Booking Notes */}
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label>Booking Notes</label>
                            <Input
                              type="textarea"
                              name="notes"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Call Information
                    </h6>
                    <div className="pl-lg-4">
                      <Table className="align-items-center table-flush table-secondary table-striped table-hover border" responsive>
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
                                  <span className="mb-0 text-sm">
                                      <a href="#">
                                      Call #123456
                                      </a>
                                  </span>
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
                                  Completed
                                </Badge>
                              </td>
                              <td>
                                <div className="avatar-group">
                                  <a
                                  className="avatar avatar-sm"
                                  href="#"
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
                                    href="#"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={(e) => e.preventDefault()}
                                    >
                                  <i className="fas fa-angle-down" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        View Call Log
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Delete Call Log
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div> 

                    {/* Save/Delete Buttons */}
                    <Row className="mt-4 justify-content-between align-items-center">
                      <Col xs="6" className="">
                        <div>
                          <Button color="danger" size="sm">
                            Delete
                          </Button>
                        </div>
                      </Col>
                      <Col xs="6" className="d-flex justify-content-end">
                        <div>
                            <Button color="primary" size="sm">
                            Edit
                            </Button>
                        </div>
                        <div className="ml-2">
                            <Button color="light" size="sm">
                            Close
                            </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Bookings;
