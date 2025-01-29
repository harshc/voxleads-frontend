import React from "react";
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
  UncontrolledTooltip,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";

const Logs = () => {
  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="4">
            <Card className="card-profile shadow sticky-top">
              <CardBody className="pt-0 pt-md-4">
                <div className="">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        Company Profiles
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        Agents
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        Call Logs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        Booking Calendar
                      </a>
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
                  <Col xs="8">
                    <h3 className="mb-0">Call Logs</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <div>
                      <h6 className="heading-small text-muted mb-0 pb-0">304 / 4000 minutes</h6>
                      <p className="text-xs mb-0"><a href="#">Add more minutes</a></p>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
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
                        Live
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
              <CardFooter className="py-4">
                <div className="d-flex justify-content-between">
                <div>
                  <h6 className="heading-small text-muted mb-0 pb-0">Lifetime Minutes</h6>
                  <p className="text-sm mb-0">1245 m</p>
                </div>
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
                </div>
              </CardFooter>
            </Card>
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
               <CardHeader className="bg-white border-0">
                 <Row className="align-items-center">
                   <Col xs="8">
                     <h3 className="mb-0">Call #123453</h3>
                   </Col>
                   <Col className="text-right" xs="4">
                    <Button
                        color="primary"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Print
                    </Button>
                    </Col>
                 </Row>
               </CardHeader>
               <CardBody>
                   <div>
                     <Row className="my-4 d-flex justify-content-between">
                       <Col lg="6">
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
                                        Active
                                    </Badge>
                                </div>
                                </div>
                                <Col className="col-auto">
                                <div className="company_logo avatar avatar-lg rounded-circle shadow">
                                    <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                    />
                                </div>
                                </Col>
                                </Row>
                                <p className="mt-1 mb-0 text-sm">
                                <a href="#">
                                    View Agent Details
                                </a>
                                </p>
                            </CardBody>
                          </Card>
                       </Col>
                       <Col lg="6" className="text-right">
                         <div>
                           <div className="form-control-label">
                             Call Status
                           </div>
                           <div>
                            <Badge color="" className="badge-dot">
                                <i className="bg-success" />
                                Completed
                            </Badge>
                           </div>
                         </div>
                       </Col>
                     </Row>
                     <Row className="my-4 d-flex justify-content-between pl-lg-4">
                       <Col lg="4">
                         <div>
                           <div className="form-control-label">
                             Call ID
                           </div>
                           <div>
                             #123453
                           </div>
                         </div>
                       </Col>
                       <Col lg="4" className="text-right">
                         <div>
                           <div className="form-control-label">
                             Call Date
                           </div>
                           <div>
                             2025-01-27 12:53:23
                           </div>
                         </div>
                       </Col>
                     </Row>
                   </div>
                   <hr className="my-4" />
                   <h6 className="heading-small text-muted mb-4">
                     Call Summary
                   </h6>
                    <Card className="card-stats mb-0">
                      <CardBody>
                        <Row>
                          <div className="col text-sm">
                            Add chat transcript here...
                          </div>
                        </Row>
                      </CardBody>
                    </Card>
               </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Logs;
