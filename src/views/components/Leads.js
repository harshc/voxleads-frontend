import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
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

const Leads = () => {
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
                        All Leads
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        Lead Groups
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        Add New
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
                    <h3 className="mb-0">Leads</h3>
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
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Phone Numer</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <span className="mb-0 text-sm">
                          <a href="#">
                            123
                          </a>
                        </span>
                      </Media>
                    </th>
                    <td>
                      <div>
                        Lead Name
                      </div>
                    </td>         
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        Active
                      </Badge>
                    </td>
                    <td>
                      <div>
                        (333) 765-4321
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
                            View Client
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Client
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
                            123
                          </a>
                        </span>
                      </Media>
                    </th>
                    <td>
                      <div>
                        Lead Name
                      </div>
                    </td>         
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-warning" />
                        Unsubscribed
                      </Badge>
                    </td>
                    <td>
                      <div>
                        (333) 765-4321
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
                            View Client
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Client
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
                            123
                          </a>
                        </span>
                      </Media>
                    </th>
                    <td>
                      <div>
                        Lead Name
                      </div>
                    </td>         
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-danger" />
                        Flagged
                      </Badge>
                    </td>
                    <td>
                      <div>
                        (333) 765-4321
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
                            View Client
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Client
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
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Lead Profile</h3>
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
                        Lead Information
                      </h6>
                    </div>
                    <div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="leadOnOff" checked />
                        <label className="form-check-label" for="leadOnOff">
                          <Badge color="" className="badge-dot">
                            <i className="bg-success" />
                            Active
                          </Badge>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="pl-lg-4">
                    <Row className="my-4">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            First Name
                          </div>
                          <div>
                            Sam
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Last Name
                          </div>
                          <div>
                            Smith
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Email
                          </div>
                          <div>
                            sammys@mail.com
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Phone Number
                          </div>
                          <div>
                            (555) 123-4567
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg="12">
                          <div className="form-control-label">
                            Lead Notes
                          </div>
                          <div className="form-control-label">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </div>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Lead Address
                  </h6>
                  <div className="pl-lg-4">
                    <Row className="my-4">
                      <Col lg="12">
                        <div>
                          <div className="form-control-label">
                            Address
                          </div>
                          <div>
                            Unit 22 - 123 Calle 38 Norte
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            City
                          </div>
                          <div>
                            Playa del Carmen
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            State / Province
                          </div>
                          <div>
                            Quintana Roo
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Country
                          </div>
                          <div>
                            Mexico
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Zip / Postal Code
                          </div>
                          <div>
                            71002
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Groups
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <div>
                          <div className="form-control-label">
                            Group_name
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
              </CardBody>
              <CardFooter className="py-4">
                <Row className="align-items-center">
                    <Col xs="8">
                    <Button
                        color="danger"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Delete Lead
                    </Button>
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
              </CardFooter>
            </Card>
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Edit Lead Profile</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Lead Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadFirstName"
                          >
                            First Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadFirstName"
                            placeholder="First Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadLastName"
                          >
                            Last Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadLastName"
                            placeholder="Last Name"
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
                            htmlFor="leadEmail"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadEmail"
                            placeholder="Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadPhone"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadPhone"
                            placeholder="Phone Number"
                            type="tel"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Lead Address
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadAddress1"
                          >
                            Street Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadAddress1"
                            placeholder="House number and street name"
                            type="text"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            className="form-control-alternative"
                            id="leadAddress2"
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
                            htmlFor="leadCity"
                          >
                            Town / City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadCity"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadStateProv"
                          >
                            State / Province
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadStateProv"
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
                            htmlFor="leadCountry"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadCountry"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadZipPostal"
                          >
                            Zip / Postal Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadZipPostal"
                            placeholder="Zip / Postal Code"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadNotes"
                          >
                            Lead Notes
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadNotes"
                            placeholder="Add notes about this lead."
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Lead Groups
                  </h6>
                  <p>Assign a Lead to one or several groups.</p>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <div class="btn-group" role="group" aria-label="Assign Agent to Companies">
                            <input type="checkbox" class="btn-check" id="btncheck1" />
                            <label class="btn btn-outline-primary" for="btncheck1">Group_name</label>

                            <input type="checkbox" class="btn-check" id="btncheck2" />
                            <label class="btn btn-outline-primary" for="btncheck2">Group_name2</label>

                            <input type="checkbox" class="btn-check" id="btncheck3" />
                            <label class="btn btn-outline-primary" for="btncheck3">Group_name3</label>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
              <CardFooter className="py-4">
                <Row className="align-items-center">
                    <Col xs="8">
                    <Button
                        color="danger"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Cancel
                    </Button>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Button
                        color="primary"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Save
                    </Button>
                    </Col>
                </Row>
              </CardFooter>
            </Card>
            <hr className="my-4" />
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                    <h3 className="mb-0">Groups/Segments</h3>
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
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Leads</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <span className="mb-0 text-sm">
                          <a href="#">
                            123
                          </a>
                        </span>
                      </Media>
                    </th>
                    <td>
                      <div>
                        Group Name
                      </div>
                    </td>         
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        Published
                      </Badge>
                    </td>
                    <td>
                      <div>
                        3435
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
                            View Group
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Group
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
                            123
                          </a>
                        </span>
                      </Media>
                    </th>
                    <td>
                      <div>
                        Group Name
                      </div>
                    </td>         
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-warning" />
                        Pending
                      </Badge>
                    </td>
                    <td>
                      <div>
                        43
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
                            View Group
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Group
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
                            123
                          </a>
                        </span>
                      </Media>
                    </th>
                    <td>
                      <div>
                        Group Name
                      </div>
                    </td>         
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-danger" />
                        Draft
                      </Badge>
                    </td>
                    <td>
                      <div>
                        86
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
                            View Group
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Group
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
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Edit Group/Segment</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Group Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="gsName"
                          >
                            Group/Segment Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="gsName"
                            placeholder="Name Your Group"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <div className="input-group">
                            <label className="input-group-text" for="gsStatus">Status</label>
                            <select className="form-control-alternative form-control mx-2" id="gsStatus">
                                <option selected>Select one...</option>
                                <option value="1">Published</option>
                                <option value="2">Pending</option>
                                <option value="2">Draft</option>
                            </select>
                          </div>
                          <span className="text-xs">Default Time Zone is set to UTC-0</span>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="gsDescription"
                          >
                            Group Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="gsDescription"
                            placeholder="Add notes about this lead."
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
              <CardFooter className="py-4">
                <Row className="align-items-center">
                    <Col xs="8">
                    <Button
                        color="danger"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Cancel
                    </Button>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Button
                        color="primary"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Save
                    </Button>
                    </Col>
                </Row>
              </CardFooter>
            </Card>
            <hr className="my-4" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Leads;
