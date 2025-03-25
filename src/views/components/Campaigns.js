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

const Campaigns = () => {
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
                        All Campaigns
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
                  <Col xs="6">
                    <h3 className="mb-0">Campaigns</h3>
                  </Col>
                  <Col className="text-right" xs="6">
                    <div>
                      <Button color="primary" size="sm">
                        Add New
                      </Button>
                    </div>
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
                        <span className="d-none d-md-block">Active</span>
                        <span className="d-md-none">Active</span>
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
                        <span className="d-none d-md-block">Completed</span>
                        <span className="d-md-none">Completed</span>
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
                        <span className="d-none d-md-block">Scheduled</span>
                        <span className="d-md-none">Scheduled</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames("py-2 px-3", {
                          active: activeNav === 5,
                        })}
                        data-toggle="tab"
                        href="#"
                        onClick={(e) => toggleNavs(e, 5)}
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
                    <th scope="col">Campaign Name</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Groups</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <span className="align-items-center mb-0 text-sm">
                        <a href="#">
                          Campaign 1
                        </a>
                      </span>
                    </th>
                    <td>
                      2025-02-28 @ 9:00
                    </td>         
                    <td>
                      2025-03-12 @ 18:00
                    </td>
                    <td>
                      <div className="groups">
                        <a href="#">Group 1</a>, <a href="#">Group 2</a>
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        Completed
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
                            View Campaign
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Campaign
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="align-items-center mb-0 text-sm">
                        <a href="#">
                          Campaign 2
                        </a>
                      </span>
                    </th>
                    <td>
                      2025-02-28 @ 9:00
                    </td>         
                    <td>
                      2025-03-12 @ 18:00
                    </td>
                    <td>
                      <div className="groups">
                        <a href="#">Group 1</a>, <a href="#">Group 2</a>
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-warning" />
                        Scheduled
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
                            View Campaign
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Campaign
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="align-items-center mb-0 text-sm">
                        <a href="#">
                          Campaign 3
                        </a>
                      </span>
                    </th>
                    <td>
                      2025-02-28 @ 9:00
                    </td>         
                    <td>
                      2025-03-12 @ 18:00
                    </td>
                    <td>
                      <div className="groups">
                        <a href="#">Group 1</a>, <a href="#">Group 2</a>
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        Active
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
                            View Campaign
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Campaign
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="align-items-center mb-0 text-sm">
                        <a href="#">
                          Campaign 4
                        </a>
                      </span>
                    </th>
                    <td>
                      2025-02-28 @ 9:00
                    </td>         
                    <td>
                      2025-03-12 @ 18:00
                    </td>
                    <td>
                      <div className="groups">
                        <a href="#">Group 1</a>, <a href="#">Group 2</a>
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-yellow" />
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
                            View Campaign
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Campaign
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
                      <h3 className="mb-0">Campaign Details</h3>
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
                    <h6 className="heading-small text-muted mb-4">
                        Status & Description
                    </h6>
                    <div className="pl-lg-4">
                      <Row className="align-items-center">
                        {/* Status Dropdown */}
                        <Col lg="6">
                          <FormGroup>
                            <div className="d-flex align-items-center justify-content-between">
                              <label className="form-control-label" htmlFor="campaign_status">
                                 Status
                              </label>
                              <Badge color="" className="badge-dot">
                                <i className="bg-success" />
                              </Badge>
                            </div>
                            <Input type="select" name="campaign_status">
                              <option value="active" selected>Active</option>
                              <option value="scheduled">Scheduled</option>
                              <option value="completed">Completed</option>
                              <option value="pending">Pending</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="7">
                          <FormGroup>
                            <label>Campaign Name</label>
                            <Input
                              type="text"
                              name="campaign_name"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label className="form-control-label" htmlFor="dialog_flow">
                                Dialog Flow
                            </label>
                            <Input type="select" name="dialog_flow">
                              <option value="companyname" selected>Company Name</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="5">
                          <FormGroup>
                            <label>Description</label>
                            <Input
                              type="textarea"
                              name="campaign_description"
                              rows="4"
                            />
                            <span class="text-xs">For admin use only</span>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label>Start Date & Time</label>
                            <Input
                              type="datetime-local"
                              name="campaign_start"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label>End Date & Time</label>
                            <Input
                              type="datetime-local"
                              name="campaign_end"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Operating Hours
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col>
                          <FormGroup>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input className="custom-control-input" id="agHoursCompany" type="checkbox" checked />
                              <label className="custom-control-label" htmlFor="agHoursCompany">
                              <span className="text-default">
                                Operate Within Selected Company Hours
                              </span>
                              </label>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                        {/* if operating within company hours, do not show hour options */}
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <div className="input-group">
                              <label className="input-group-text" for="agTimeZone">Time Zone</label>
                              <select className="form-control-alternative form-control mx-2" id="ccTimeZone">
                                <option selected>Choose one</option>
                                <option value="1">UTC-0</option>
                                <option value="2">UTC-1</option>
                                <option value="3">...</option>
                              </select>
                            </div>
                            <span className="text-xs">Default Time Zone is set to UTC-0</span>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <div className="input-group">
                                <label className="input-group-text">Monday</label>
                                <select className="form-control-alternative form-control mx-2" id="agMondayStart">
                                    <option selected>Select opening time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                                <select className="form-control-alternative form-control mx-2" id="agMondayEnd">
                                    <option selected>Select closing time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col lg="12">
                            <FormGroup>
                            <div className="input-group">
                                <label className="input-group-text">Tuesday</label>
                                <select className="form-control-alternative form-control mx-2" id="agTuesdayStart">
                                    <option selected>Select opening time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                                <select className="form-control-alternative form-control mx-2" id="agTuesdayEnd">
                                    <option selected>Select closing time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                            </div>
                            </FormGroup>
                        </Col>
                        <Col lg="12">
                            <FormGroup>
                            <div className="input-group">
                                <label className="input-group-text">Wednesday</label>
                                <select className="form-control-alternative form-control mx-2" id="agWednesdayStart">
                                    <option selected>Select opening time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                                <select className="form-control-alternative form-control mx-2" id="agWednesdayEnd">
                                    <option selected>Select closing time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                            </div>
                            </FormGroup>
                        </Col>
                        <Col lg="12">
                            <FormGroup>
                            <div className="input-group">
                                <label className="input-group-text">Thursday</label>
                                <select className="form-control-alternative form-control mx-2" id="agThursdayStart">
                                    <option selected>Select opening time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                                <select className="form-control-alternative form-control mx-2" id="agThursdayEnd">
                                    <option selected>Select closing time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                            </div>
                            </FormGroup>
                        </Col>
                        <Col lg="12">
                            <FormGroup>
                            <div className="input-group">
                                <label className="input-group-text">Friday</label>
                                <select className="form-control-alternative form-control mx-2" id="agFridayStart">
                                    <option selected>Select opening time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                                <select className="form-control-alternative form-control mx-2" id="agFridayEnd">
                                    <option selected>Select closing time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                            </div>
                            </FormGroup>
                        </Col>
                        <Col lg="12">
                            <FormGroup>
                            <div className="input-group">
                                <label className="input-group-text">Saturday</label>
                                <select className="form-control-alternative form-control mx-2" id="agSaturdayStart">
                                    <option selected>Select opening time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                                <select className="form-control-alternative form-control mx-2" id="agSaturdayEnd">
                                    <option selected>Select closing time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                            </div>
                            </FormGroup>
                        </Col>
                        <Col lg="12">
                            <FormGroup>
                            <div className="input-group">
                                <label className="input-group-text">Sunday</label>
                                <select className="form-control-alternative form-control mx-2" id="agSundayStart">
                                    <option selected>Select opening time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                                <select className="form-control-alternative form-control mx-2" id="agSundayEnd">
                                    <option selected>Select closing time</option>
                                    <option value="1">00:00</option>
                                    <option value="2">00:30</option>
                                    <option value="3">01:00</option>
                                    <option value="3">01:30</option>
                                    <option value="3">02:00</option>
                                    <option value="3">02:30</option>
                                    <option value="3">03:00</option>
                                    <option value="3">03:30</option>
                                    <option value="3">...</option>
                                </select>
                            </div>
                            </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Lead Groups
                    </h6>
                    <div className="pl-lg-4">
                      {/* Lead Details */}
                      <Row>
                        <Col lg="12">
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input className="custom-control-input" id="group1" type="checkbox" checked />
                            <label className="custom-control-label" htmlFor="group1">
                            <span className="text-default">
                              Group 1
                            </span>
                            </label>
                          </div>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input className="custom-control-input" id="group2" type="checkbox" checked />
                            <label className="custom-control-label" htmlFor="group2">
                            <span className="text-default">
                              Group 2
                            </span>
                            </label>
                          </div>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input className="custom-control-input" id="group3" type="checkbox" />
                            <label className="custom-control-label" htmlFor="group3">
                            <span className="text-default">
                              Group 3
                            </span>
                            </label>
                          </div>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input className="custom-control-input" id="group4" type="checkbox" />
                            <label className="custom-control-label" htmlFor="group4">
                            <span className="text-default">
                              Group 4
                            </span>
                            </label>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <div className="mt-2 text-sm text-underline">
                            <a href="#">Edit Lead Groups</a>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Agents
                    </h6>
                    <div className="pl-lg-4">
                      {/* Agents */}
                      <Row>
                        <Col lg="12">
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input className="custom-control-input" id="agent1" type="checkbox" checked />
                            <label className="custom-control-label" htmlFor="agent1">
                            <span className="text-default">
                              Agent 1
                            </span>
                            </label>
                          </div>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input className="custom-control-input" id="agent2" type="checkbox" checked />
                            <label className="custom-control-label" htmlFor="agent2">
                            <span className="text-default">
                              Agent 2
                            </span>
                            </label>
                          </div>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input className="custom-control-input" id="agent3" type="checkbox" checked />
                            <label className="custom-control-label" htmlFor="agent3">
                            <span className="text-default">
                              Agent 3
                            </span>
                            </label>
                          </div>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input className="custom-control-input" id="agent4" type="checkbox" checked />
                            <label className="custom-control-label" htmlFor="agent4">
                            <span className="text-default">
                              Agent 4
                            </span>
                            </label>
                          </div>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input className="custom-control-input" id="agent5" type="checkbox" checked />
                            <label className="custom-control-label" htmlFor="agent5">
                            <span className="text-default">
                              Agent 5
                            </span>
                            </label>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <div className="mt-2 text-sm text-underline">
                            <a href="#">Edit Agents</a>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Call Logs
                    </h6>
                    <div className="pl-lg-4">
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

                        <Row>
                          <Col>
                            <div className="mt-2 text-sm text-underline">
                                <a href="#">View All Call Logs</a>
                            </div>
                          </Col>
                        </Row>
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

export default Campaigns;
