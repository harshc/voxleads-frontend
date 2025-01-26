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

const Profile = () => {
  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="4">
            <Card className="card-profile shadow sticky-top">
              <CardBody className="pt-0 pt-md-4">
                <div className="">
                  <ul className="d-flex p-4 list-unstyled">
                    <li>
                      <a href="#" className="icon-link px-4 py-2">
                        Account Information
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon-link px-4 py-2">
                        Billing Information
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon-link px-4 py-2">
                        Change Password
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon-link px-4 py-2">
                        Billing History
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
                    <h3 className="mb-0">Account Profile</h3>
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
                    User Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="uFirstName"
                          >
                            First Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uFirstName"
                            placeholder="First Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="uLastName"
                          >
                            Last Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uLastName"
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
                            htmlFor="uEmail"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uEmail"
                            placeholder="Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="uPhone"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uPhone"
                            placeholder="Phone Number"
                            type="tel"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    User Address
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="uAddress1"
                          >
                            Street Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uAddress1"
                            placeholder="House number and street name"
                            type="text"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            className="form-control-alternative"
                            id="uAddress2"
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
                            htmlFor="uCity"
                          >
                            Town / City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uCity"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="uStateProv"
                          >
                            State / Province
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uStateProv"
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
                            htmlFor="uCountry"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uCountry"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="uZipPostal"
                          >
                            Zip / Postal Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uZipPostal"
                            placeholder="Zip / Postal Code"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div class="btn-group" role="group" aria-label="Same address for billing">
                        <input type="checkbox" class="btn-check" id="userAddressBilling" />
                        <label class="btn btn-outline-primary" for="userAddressBilling">Use the same address for billing</label>
                      </div>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Account Password</h3>
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
                    Update Password
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="uPass"
                          >
                            Current Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uPass"
                            placeholder="Enter your current password"
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="newPass"
                          >
                            New Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="newPass"
                            placeholder="Enter a new password"
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="newPass2"
                          >
                            Re-Enter New Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="newPass2"
                            placeholder="Re-enter the new password"
                            type="tel"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Google Auth Login
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <div>... add google auth login connection ...</div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Billing Information</h3>
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
                    Credit Card Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="credit-card-number">Card Number</label>
                          <input type="text" 
                            className="form-control-alternative" 
                            autocomplete="off" 
                            autocorrect="off"
                            autocapitalize="none" spellcheck="false"
                            name="credit-card-number" 
                            id="credit-card-number"
                            maxlength="22" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="expiration">Expiration Date</label>
                          <input type="text" 
                            autocomplete="off" 
                            autocorrect="off" 
                            autocapitalize="none"
                            spellcheck="false" 
                            className="form-control-alternative"
                            name="expiration" 
                            id="expiration"
                            placeholder="MM / YYYY" 
                            maxlength="7" />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="cvv">Security Code </label>
                          <input type="text" 
                            autocomplete="off" 
                            autocorrect="off" 
                            autocapitalize="none"
                            spellcheck="false" 
                            className="form-control-alternative"
                            name="cvv" 
                            id="cvv" 
                            maxlength="4" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="ccName">Name on the Credit Card</label>
                          <input type="text" 
                            className="form-control-alternative" 
                            autocomplete="off" 
                            autocorrect="off"
                            autocapitalize="none" spellcheck="false"
                            name="ccName" 
                            id="ccName">
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Billing Address
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <div class="btn-group" role="group" aria-label="Same address as profile">
                        <input type="checkbox" class="btn-check" id="userAddressBilling" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="userAddressBilling">Use the same address as profile</label>
                      </div>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="uAddress1"
                          >
                            Street Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uAddress1"
                            placeholder="House number and street name"
                            type="text"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            className="form-control-alternative"
                            id="uAddress2"
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
                            htmlFor="uCity"
                          >
                            Town / City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uCity"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="uStateProv"
                          >
                            State / Province
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uStateProv"
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
                            htmlFor="uCountry"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uCountry"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="uZipPostal"
                          >
                            Zip / Postal Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="uZipPostal"
                            placeholder="Zip / Postal Code"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
            <hr className="my-4" />
          </Col>
        </Row>
        <Row>
            <hr className="my-4" />
            <p>begin new page blocks</p>
        </Row>
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Billing History</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Invoice ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <div
                          className="avatar rounded-circle mr-3">
                          <img
                            alt="..."
                            src={require("../../assets/img/theme/bootstrap.jpg")}
                          />
                        </div>
                        <Media>
                          <span className="mb-0 text-sm">
                            Invoice #123456
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Jan. 22, 2025</td>         
                    <td>
                      <div className="invoice-amount">
                        $1,111.11
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                      </Badge>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i class="bi bi-arrow-down-right-circle-fill"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Invoice
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Download Invoice
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <div className="avatar rounded-circle mr-3">
                          <img
                            alt="..."
                            src={require("../../assets/img/theme/bootstrap.jpg")}
                          />
                        </div>
                        <Media>
                          <span className="mb-0 text-sm">
                            Invoice #123453
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Jan. 20, 2025</td>         
                    <td>
                      <div className="invoice-amount">
                        $1,111.11
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Approved
                      </Badge>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i class="bi bi-arrow-down-right-circle-fill"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Invoice
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Download Invoice
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <div className="avatar rounded-circle mr-3">
                          <img
                            alt="..."
                            src={require("../../assets/img/theme/bootstrap.jpg")}
                          />
                        </div>
                        <Media>
                          <span className="mb-0 text-sm">
                            Invoice #123453
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Jan. 20, 2025</td>         
                    <td>
                      <div className="invoice-amount">
                        $1,111.11
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        Failed
                      </Badge>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i class="bi bi-arrow-down-right-circle-fill"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Invoice
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Download Invoice
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
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
