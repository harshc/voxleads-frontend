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

const Centers = () => {
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
                    <h3 className="mb-0">Company Profiles</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Add New
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Col xl="6">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                            <div className="col">
                                <CardTitle
                                tag="h2"
                                className="text-uppercase font-weight-bold mb-0"
                                >
                                Company_Name
                                </CardTitle>
                            </div>
                            <Col className="col-auto">
                                <div className="company_logo icon icon-shape bg-danger text-white rounded-circle shadow">
                                  <i className="fas fa-chart-bar" />
                                </div>
                            </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-sm">
                                <a href="#">
                                  View Company Details
                                </a>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="6">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                            <div className="col">
                                <CardTitle
                                tag="h2"
                                className="text-uppercase font-weight-bold mb-0"
                                >
                                Company_Name2
                                </CardTitle>
                            </div>
                            <Col className="col-auto">
                                <div className="company_logo icon icon-shape bg-danger text-white rounded-circle shadow">
                                  <i className="fas fa-chart-bar" />
                                </div>
                            </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-sm">
                                <a href="#">
                                  View Company Details
                                </a>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
              </CardBody>
            </Card>
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Company Profile</h3>
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
                  <h6 className="heading-small text-muted mb-4">
                    Company Information
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
                    <Row>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            company_name@email.com
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            (555) 123-4567
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <div>
                          <div className="form-control-label">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Company Address
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <div>
                          <div className="form-control-label">
                            Suite 11 - 123 StreetName Blvd., CityName, StateName, CountryName, ZipCode
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
              </CardBody>
            </Card>
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Edit Company Profile</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Company Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="ccName"
                          >
                            Company Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="ccName"
                            placeholder="Company Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="ccEmail"
                          >
                            Company Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="ccEmail"
                            placeholder="Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="ccPhone"
                          >
                            Company Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="ccPhone"
                            placeholder="Phone Number"
                            type="tel"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="ccDescription"
                          >
                            Company Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="ccDescription"
                            placeholder="Add a custom bio..."
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <div className="input-group mb-3">
                            <div className="form-control-label">
                              Company Logo
                            </div>
                            <input type="file" className="form-control-alternative" id="ccinputLogoFile">
                            <label className="input-group-text" for="ccinputLogoFile">Upload</label>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Company Address
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="ccAddress1"
                          >
                            Street Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="ccAddress1"
                            placeholder="Address number and street name"
                            type="text"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            className="form-control-alternative"
                            id="ccAddress2"
                            placeholder="Apartment, suite, unit, etc. (optional)"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="ccCity"
                          >
                            Town / City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="ccCity"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="ccStateProv"
                          >
                            State / Province
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="ccStateProv"
                            placeholder="State / Province"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="ccCountry"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="ccCountry"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="ccZipPostal"
                          >
                            Zip / Postal Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="ccZipPostal"
                            placeholder="Zip / Postal Code"
                            type="email"
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
                      <Col lg="6">
                        <FormGroup>
                          <div className="input-group mb-3">
                            <label className="input-group-text" for="ccTimeZone">Time Zone</label>
                            <select className="form-select" id="ccTimeZone">
                                <option selected>Choose one</option>
                                <option value="1">UTC-0</option>
                                <option value="2">UTC-1</option>
                                <option value="3">...</option>
                            </select>
                          </div>
                          <span>Default Time Zone is set to UTC-0</span>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <div className="input-group">
                            <span className="input-group-text">Monday</span>
                            <input type="text" placeholder="Open" id="ccMondayOpen" aria-label="Open" className="form-control-alternative">
                            <input type="text" placeholder="Close" id="ccMondayClose" aria-label="Close" className="form-control-alternative">
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <div className="input-group">
                            <span className="input-group-text">Tuesday</span>
                            <input type="text" placeholder="Open" id="ccTuesdayOpen" aria-label="Open" className="form-control-alternative">
                            <input type="text" placeholder="Close" id="ccTuesdayClose" aria-label="Close" className="form-control-alternative">
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <div className="input-group">
                            <span className="input-group-text">Wednesday</span>
                            <input type="text" placeholder="Open" id="ccWednesdayOpen" aria-label="Open" className="form-control-alternative">
                            <input type="text" placeholder="Close" id="ccWednesdayClose" aria-label="Close" className="form-control-alternative">
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <div className="input-group">
                            <span className="input-group-text">Thursday</span>
                            <input type="text" placeholder="Open" id="ccThursdayOpen" aria-label="Open" className="form-control-alternative">
                            <input type="text" placeholder="Close" id="ccThursdayClose" aria-label="Close" className="form-control-alternative">
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <div className="input-group">
                            <span className="input-group-text">Friday</span>
                            <input type="text" placeholder="Open" id="ccFridayOpen" aria-label="Open" className="form-control-alternative">
                            <input type="text" placeholder="Close" id="ccFridayClose" aria-label="Close" className="form-control-alternative">
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <div className="input-group">
                            <span className="input-group-text">Saturday</span>
                            <input type="text" placeholder="Open" id="ccSaturdayOpen" aria-label="Open" className="form-control-alternative">
                            <input type="text" placeholder="Close" id="ccSaturdayClose" aria-label="Close" className="form-control-alternative">
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <div className="input-group">
                            <span className="input-group-text">Sunday</span>
                            <input type="text" placeholder="Open" id="ccSundayOpen" aria-label="Open" className="form-control-alternative">
                            <input type="text" placeholder="Close" id="ccSundayClose" aria-label="Close" className="form-control-alternative">
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Call Logs</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Call ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Minutes</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            Call #123456
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
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Live
                      </Badge>
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
                            Call #123456
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
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Completed
                      </Badge>
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
                            Call #123456
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
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        Failed
                      </Badge>
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
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Centers;
