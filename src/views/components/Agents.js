import React, { useState, useEffect } from "react";
import classnames from "classnames";
import {
  Button,
  Badge,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase-config";
import api from "../../services/api";

const timeZones = [
  "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00",
  "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC-01:00",
  "UTC+00:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00",
  "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00",
  "UTC+12:00", "UTC+13:00", "UTC+14:00"
];

const timeSlots = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30",
  "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

const Agents = () => {
  //const [agentData, setAgentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gst: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    manager_name: "",
    manager_email: "",
    manager_phone: "",
    total_staff: "",
    services_offered: "",
    timezone: "UTC+00:00",  //Will be updated dynamically
    description: "",
    operational_hours: {
      Monday: { open: "", close: "" },
      Tuesday: { open: "", close: "" },
      Wednesday: { open: "", close: "" },
      Thursday: { open: "", close: "" },
      Friday: { open: "", close: "" },
      Saturday: { open: "", close: "" },
      Sunday: { open: "", close: "" },
    },
  });

  const navigate = useNavigate();
  const currentUser = auth.currentUser;

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
                         Agents
                       </a>
                     </li>
                     <li>
                       <div className="d-flex icon-link px-4 py-2">
                         Agent Training (coming soon)
                       </div>
                     </li>
                   </ul>
                 </div>
               </CardBody>
             </Card>
           </Col>
           <Col xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="6">
                    <h3 className="mb-0">Agents</h3>
                    </Col>
                    <Col className="text-right" xs="6">
                    <Button
                        color="primary"
                        href="#add-new"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Add New
                    </Button>
                    </Col>
                </Row>
              </CardHeader>
                <Table className="align-items-center table-flush table-secondary table-striped table-hover" responsive>
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Language</th>
                      <th scope="col">Minutes (24h)</th>
                      <th scope="col">Calls (24h)</th>
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
                                Sara
                                </a>
                            </span>
                        </Media>
                        </th>
                        <td>English-US</td>         
                        <td>
                        <div className="time-amount">
                            120.34 m
                        </div>
                        </td>
                        <td>
                        <div className="calls-amount">
                            15
                        </div>
                        </td>
                        <td>
                        <Badge color="" className="badge-dot">
                            <i className="bg-success" />
                            Available
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
                                View Agent Details
                            </DropdownItem>
                            <DropdownItem
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                View Agent Call Log
                            </DropdownItem>
                            <DropdownItem
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                Delete Agent
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
                                Lucy
                                </a>
                            </span>
                        </Media>
                        </th>
                        <td>English-US</td>         
                        <td>
                        <div className="time-amount">
                            120.34 m
                        </div>
                        </td>
                        <td>
                        <div className="calls-amount">
                            15
                        </div>
                        </td>
                        <td>
                        <Badge color="" className="badge-dot">
                            <i className="bg-warning" />
                            Busy
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
                                View Agent Details
                            </DropdownItem>
                            <DropdownItem
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                View Agent Call Log
                            </DropdownItem>
                            <DropdownItem
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                Delete Agent
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
                                Alex
                                </a>
                            </span>
                        </Media>
                        </th>
                        <td>English-US</td>         
                        <td>
                        <div className="time-amount">
                            120.34 m
                        </div>
                        </td>
                        <td>
                        <div className="calls-amount">
                            15
                        </div>
                        </td>
                        <td>
                        <Badge color="" className="badge-dot">
                            <i className="bg-danger" />
                            Offline
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
                                View Agent Details
                            </DropdownItem>
                            <DropdownItem
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                View Agent Call Log
                            </DropdownItem>
                            <DropdownItem
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                Delete Agent
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </td>
                    </tr>
                  </tbody>
                </Table>
              <CardFooter className="py-4">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col md="5" className="text-sm mb-3 mb-md-0">
                    Showing <strong>1 - 5</strong> of 5
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
             <hr className="my-4" />
             <Card className="bg-secondary shadow">
               <CardHeader className="bg-white border-0">
                 <Row className="align-items-center">
                   <Col xs="8">
                     <h3 className="mb-0">Agent Profile</h3>
                   </Col>
                   <Col className="text-right" xs="4">
                     <Button
                       color="primary"
                       href="#"
                       onClick={(e) => e.preventDefault()}
                       size="sm"
                     >
                       Edit
                     </Button>
                   </Col>
                 </Row>
               </CardHeader>
               <CardBody>
                   <div className="d-flex justify-content-between mb-4">
                     <div>
                       <h6 className="heading-small text-muted">
                         Agent Information
                       </h6>
                     </div>
                     <div>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        Available
                      </Badge>
                     </div>
                   </div>
                   <div className="pl-lg-4">
                     <Row className="my-4">
                       <Col lg="9">
                         <div>
                           <div className="form-control-label mb-4">
                             Sara
                           </div>
                           <div className="form-control-label">
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                           </div>
                         </div>
                       </Col>
                       <Col lg="3">
                           <div className="company_logo rounded-circle shadow">
                             <img
                               alt="..."
                               className="rounded-circle img-fluid mx-auto"
                               src={require("../../assets/img/theme/team-4-800x800.jpg")}
                             />
                           </div>
                       </Col>
                     </Row>
                   </div>
                   <hr className="my-4" />
                   <h6 className="heading-small text-muted mb-4">
                     Voice & Personality
                   </h6>
                   <div className="pl-lg-4">
                     <Row className="my-4">
                       <Col lg="6">
                         <div>
                           <div className="form-control-label">
                             Laguage
                           </div>
                           <div>
                             English (US)
                           </div>
                         </div>
                       </Col>
                       <Col lg="6">
                         <div>
                           <div className="form-control-label">
                             Gender
                           </div>
                           <div>
                             Female
                           </div>
                         </div>
                       </Col>
                     </Row>
                     <Row className="my-4">
                       <Col lg="6">
                         <div>
                           <div className="form-control-label">
                             Voice Selected
                           </div>
                           <div>
                             Option 1
                           </div>
                         </div>
                       </Col>
                       <Col lg="6">
                         <div>
                           <div className="form-control-label">
                             Accent
                           </div>
                           <div>
                             American (USA)
                           </div>
                         </div>
                       </Col>
                     </Row>
                     <Row className="my-4">
                       <Col lg="12">
                         <div>
                           <div className="form-control-label">
                             Agent Persona
                           </div>
                           <div>
                             Academic researcher with endless enthusiasm for science and history
                           </div>
                         </div>
                       </Col>
                     </Row>
                     <Row className="my-4">
                       <Col lg="6">
                         <div>
                           <div className="form-control-label">
                             Speaking Style
                           </div>
                           <div>
                             Informative and Passionate
                           </div>
                         </div>
                       </Col>
                       <Col lg="6">
                         <div>
                           <div className="form-control-label">
                             Character Traits
                           </div>
                           <div>
                             Detail-oriented, Enthusiastic, Knowledgeable, ...
                           </div>
                         </div>
                       </Col>
                     </Row>
                   </div>
                   <hr className="my-4" />
                   <h6 className="heading-small text-muted mb-4">
                     Company Assigned To
                   </h6>
                   <div className="pl-lg-4">
                     <Row>
                       <Col lg="12">
                         <div>
                           <div className="form-control-label">
                             Company_Name
                           </div>
                         </div>
                       </Col>
                     </Row>
                   </div>
                   <hr className="my-4" />
                   <h6 className="heading-small text-muted mb-4">
                     Working Hours
                   </h6>
                   <div className="pl-lg-4">
                     <Row className="my-4">
                       <Col lg="12">
                         <div>
                           <div className="align-items-center d-flex mb-2">
                             <div>Time Zone:</div>
                             <div className="form-control-label px-2">
                                 UTC-5
                             </div>
                           </div>
                           <div className="text-xs">Current time is: 14:36:34</div>
                         </div>
                       </Col>
                     </Row>
                     <Row className="my-4">
                       <Col lg="12" className="my-1">
                         <div className="d-flex align-items-center">
                           <div>Monday:</div>
                           <div className="form-control-label px-2">
                             8:00
                           </div>
                           <div>-</div>
                           <div className="form-control-label px-2">
                             17:00
                           </div>
                         </div>
                       </Col>
                       <Col lg="12" className="my-1">
                         <div className="d-flex align-items-center">
                           <div>Tuesday:</div>
                           <div className="form-control-label px-2">
                             8:00
                           </div>
                           <div>-</div>
                           <div className="form-control-label px-2">
                             17:00
                           </div>
                         </div>
                       </Col>
                       <Col lg="12" className="my-1">
                         <div className="d-flex align-items-center">
                           <div>Wednesday:</div>
                           <div className="form-control-label px-2">
                             8:00
                           </div>
                           <div>-</div>
                           <div className="form-control-label px-2">
                             17:00
                           </div>
                         </div>
                       </Col>
                       <Col lg="12" className="my-1">
                         <div className="d-flex align-items-center">
                           <div>Thursday:</div>
                           <div className="form-control-label px-2">
                             8:00
                           </div>
                           <div>-</div>
                           <div className="form-control-label px-2">
                             17:00
                           </div>
                         </div>
                       </Col>
                       <Col lg="12" className="my-1">
                         <div className="d-flex align-items-center">
                           <div>Friday:</div>
                           <div className="form-control-label px-2">
                             8:00
                           </div>
                           <div>-</div>
                           <div className="form-control-label px-2">
                             17:00
                           </div>
                         </div>
                       </Col>
                       <Col lg="12" className="my-1">
                         <div className="d-flex align-items-center">
                           <div>Saturday:</div>
                           <div className="form-control-label px-2">
                             9:00
                           </div>
                           <div>-</div>
                           <div className="form-control-label px-2">
                             15:00
                           </div>
                         </div>
                       </Col>
                       <Col lg="12" className="my-1">
                         <div className="d-flex align-items-center">
                           <div>Sunday:</div>
                           <div className="form-control-label px-2">
                             10:00
                           </div>
                           <div>-</div>
                           <div className="form-control-label px-2">
                             15:00
                           </div>
                         </div>
                       </Col>
                     </Row>
                   </div>
                   <hr className="my-4" />
                   <h6 className="heading-small text-muted mb-4">
                     Recent Calls
                   </h6>
                   <div className="pl-lg-4">
                    <Row className="mb-3">
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
                      <Col className="text-sm mt-2">
                        <a href="#">View full Call Log for Sara_Agent</a>
                      </Col>
                    </Row>
                   </div>
               </CardBody>
             </Card>
             <hr className="my-4" />
             <Card className="bg-secondary shadow">
               <CardHeader className="bg-white border-0">
                 <Row className="align-items-center">
                   <Col xs="6">
                     <h3 className="mb-0">Edit Agent Profile</h3>
                   </Col>
                   <Col xs="6" className="d-flex justify-content-end">
                    <div>
                     <Button color="primary" size="sm" onClick={(e) => e.preventDefault()}>
                       Save
                     </Button>
                    </div>
                    <div className="ml-2">
                     <Button color="light" size="sm" onClick={(e) => e.preventDefault()}>
                       Cancel
                     </Button>
                    </div>
                   </Col>
                 </Row>
               </CardHeader>
               <CardBody>
                 <Form>
                   <h6 className="heading-small text-muted mb-4">
                     Agent Information
                   </h6>
                   <div className="pl-lg-4">
                     <Row>
                       <Col lg="6">
                         <FormGroup>
                             <label className="form-control-label" htmlFor="agStatus">
                               Status
                             </label>
                             <select className="form-control-alternative form-control" id="agStatus">
                                 <option selected>Choose one...</option>
                                 <option value="1">Available</option>
                                 <option value="2">Paused</option>
                                 <option value="2">Offline</option>
                                 <option value="3">...</option>
                             </select>
                         </FormGroup>
                       </Col>
                       <Col lg="6">
                        <FormGroup>
                           <div className="input-group">
                             <label className="form-control-label" htmlFor="agProfileImg">
                               Profile Photo
                             </label>
                             <input type="file" className="form-control-alternative form-control" id="agProfileImg" />
                           </div>
                         </FormGroup>
                       </Col>
                     </Row>
                     <Row>
                       <Col lg="6">
                         <FormGroup>
                           <label
                             className="form-control-label"
                             htmlFor="agFirstName"
                           >
                             First Name
                           </label>
                           <Input
                             className="form-control-alternative"
                             id="agFirstName"
                             placeholder="First Name"
                             type="text"
                           />
                         </FormGroup>
                       </Col>
                       <Col lg="6">
                         <FormGroup>
                           <label
                             className="form-control-label"
                             htmlFor="agLastName"
                           >
                             Last Name
                           </label>
                           <Input
                             className="form-control-alternative"
                             id="agLastName"
                             placeholder="Last Name"
                             type="text"
                           />
                         </FormGroup>
                       </Col>
                     </Row>
                     <Row>
                       <Col lg="12">
                         <FormGroup>
                           <label
                             className="form-control-label"
                             htmlFor="agBio"
                           >
                             Agent Bio
                           </label>
                           <Input
                             className="form-control-alternative"
                             id="agBio"
                             placeholder="Add a custom bio..."
                             type="textarea"
                           />
                         </FormGroup>
                       </Col>
                     </Row>
                   </div>
                   <hr className="my-4" />
                   <h6 className="heading-small text-muted mb-4">
                     Voice & Personality Options
                   </h6>
                   <div className="pl-lg-4">
                     <Row>
                       <Col lg="6">
                         <FormGroup>
                             <label
                               className="form-control-label"
                               htmlFor="agLanguage"
                             >
                               Language
                             </label>
                             <select className="form-control-alternative form-control" id="agLanguage">
                                 <option selected>Select one...</option>
                                 <option value="1">English</option>
                                 <option value="2">Spanish</option>
                                 <option value="2">French</option>
                                 <option value="2">Hindi</option>
                                 <option value="2">Mandarin</option>
                                 <option value="3">...</option>
                             </select>
                         </FormGroup>
                       </Col>
                       <Col lg="6">
                         <FormGroup>
                             <label
                               className="form-control-label"
                               htmlFor="agGenter"
                             >
                               Gender
                             </label>
                             <select className="form-control-alternative form-control" id="agGenter">
                                 <option selected>Select one...</option>
                                 <option value="1">Male</option>
                                 <option value="2">Female</option>
                                 <option value="3">...</option>
                             </select>
                         </FormGroup>
                       </Col>
                     </Row>
                     <Row>
                       <Col lg="6">
                         <FormGroup>
                             <label
                               className="form-control-label"
                               htmlFor="agVoice"
                             >
                               Voice
                             </label>
                             <select className="form-control-alternative form-control" id="agVoice">
                                 <option selected>Select one...</option>
                                 <option value="1">Vocie 1</option>
                                 <option value="2">Voice 2</option>
                                 <option value="2">Voice 3</option>
                                 <option value="3">...</option>
                             </select>
                         </FormGroup>
                       </Col>
                       <Col lg="6">
                         <FormGroup>
                             <label
                               className="form-control-label"
                               htmlFor="agAccent"
                             >
                               Accent
                             </label>
                             <select className="form-control-alternative form-control" id="agAccent">
                                 <option selected>Select one...</option>
                                 <option value="1">American (USA)</option>
                                 <option value="2">British (UK)</option>
                                 <option value="2">Indian (INDIA)</option>
                                 <option value="3">...</option>
                             </select>
                         </FormGroup>
                       </Col>
                     </Row>
                     <Row>
                       <Col lg="12">
                         <FormGroup>
                           <label
                             className="form-control-label"
                             htmlFor="agPersona"
                           >
                             Agent Persona
                           </label>
                           <Input
                             className="form-control-alternative"
                             id="agPersona"
                             placeholder="Add a custom persona..."
                             type="text"
                           />
                           <p className="text-xs mt-2"><b>Default persona:</b> Academic researcher with endless enthusiasm for science and history.</p>
                         </FormGroup>
                       </Col>
                     </Row>
                     <Row>
                       <Col lg="6">
                         <FormGroup>
                             <label
                               className="form-control-label"
                               htmlFor="agSpeakingstyle"
                             >
                               Speaking Style
                             </label>
                             <select className="form-control-alternative form-control" id="agSpeakingstyle">
                                 <option selected>Select one...</option>
                                 <option value="1">Informative and Passionate</option>
                                 <option value="2">Voice 2 (Male)</option>
                                 <option value="3">...</option>
                             </select>
                         </FormGroup>
                       </Col>
                       <Col lg="6">
                         <FormGroup>
                             <label className="form-control-label">
                               Character Traits
                             </label>
                             <div className="custom-control custom-control-alternative custom-checkbox">
                                <input className="custom-control-input" id="agTrait1" type="checkbox" />
                                <label className="custom-control-label" htmlFor="agTrait1">
                                <span className="text-muted">
                                    Detail Oriented
                                </span>
                                </label>
                            </div>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input className="custom-control-input" id="agTrait1" type="checkbox" />
                                <label className="custom-control-label" htmlFor="agTrait1">
                                <span className="text-muted">
                                    Enthusiastic
                                </span>
                                </label>
                            </div>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input className="custom-control-input" id="agTrait1" type="checkbox" />
                                <label className="custom-control-label" htmlFor="agTrait1">
                                <span className="text-muted">
                                    Knowledgeable
                                </span>
                                </label>
                            </div>
                         </FormGroup>
                       </Col>
                     </Row>
                   </div>
                   <hr className="my-4" />
                   <h6 className="heading-small text-muted mb-4">
                     Agent &#10238; Company
                   </h6>
                   <p>Assign an Agent to one or several companies.</p>
                   <div className="pl-lg-4">
                     <Row>
                       <Col lg="12">
                         <FormGroup>
                             <div className="custom-control custom-control-alternative custom-checkbox">
                                <input className="custom-control-input" id="agTrait1" type="checkbox" />
                                <label className="custom-control-label" htmlFor="agTrait1">
                                <span className="text-default">
                                    Company 1
                                </span>
                                </label>
                            </div>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input className="custom-control-input" id="agTrait1" type="checkbox" />
                                <label className="custom-control-label" htmlFor="agTrait1">
                                <span className="text-default">
                                    Company 2
                                </span>
                                </label>
                            </div>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input className="custom-control-input" id="agTrait1" type="checkbox" />
                                <label className="custom-control-label" htmlFor="agTrait1">
                                <span className="text-default">
                                    Company 3
                                </span>
                                </label>
                            </div>
                         </FormGroup>
                       </Col>
                     </Row>
                   </div>
                   <hr className="my-4" />
                   <h6 className="heading-small text-muted mb-4">
                     Working Hours
                   </h6>
                   <div className="pl-lg-4">
                     <Row>
                       <Col>
                         <FormGroup>
                             <div className="custom-control custom-control-alternative custom-checkbox">
                                <input className="custom-control-input" id="agTrait1" type="checkbox" />
                                <label className="custom-control-label" htmlFor="agTrait1">
                                <span className="text-default">
                                    Operate Within Company's Hours
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
                 </Form>
               </CardBody>
             </Card>
           </Col>
         </Row>
      </Container>
    </>
  );
};

export default Agents;
