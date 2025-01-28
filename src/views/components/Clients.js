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

const Clients = () => {
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
                        Client List
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
                    <h3 className="mb-0">Account Profile</h3>
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
                    User Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row className="my-4">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            First Name
                          </div>
                          <div>
                            John
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Last Name
                          </div>
                          <div>
                            Doe
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
                            johndoe@mail.com
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
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    User Address
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
              </CardBody>
            </Card>
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Client List</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Client ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Numer</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <span className="mb-0 text-sm">
                          123
                        </span>
                      </Media>
                    </th>
                    <td>
                      <div>
                        Client Name
                      </div>
                    </td>         
                    <td>
                      <div>
                        n/a
                      </div>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Clients;
