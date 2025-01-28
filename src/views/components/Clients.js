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
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Invoice #123453</h3>
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
                    <Row className="my-4 d-flex">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            VoxLeads
                          </div>
                          <div>
                            <p>Embankment, 050105 Bucharest, Romania</p>
                            <p>tel: +4 (074) 1090873</p>
                          </div>
                        </div>
                      </Col>
                      <Col lg="6" className="text-right">
                        <div>
                          <div className="form-control-label">
                            Billed to: John Doe
                          </div>
                          <div>
                            <p>4006 Locust View Drive</p>
                            <p>San Francisco CA</p>
                            <p>California</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Invoice #
                          </div>
                          <div>
                            123453
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Invoice Date
                          </div>
                          <div>
                            2025-01-27
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Invoice Summary
                  </h6>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Item/th>
                        <th scope="col">Qty</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">
                        <Media className="align-items-center">
                            <span className="mb-0 text-sm">
                            Agent minutes
                            </span>
                        </Media>
                        </th>
                        <td>4000</td>         
                        <td>
                        <div className="invoice-qty">
                            $0.09 / m
                        </div>
                        </td>
                        <td>
                        <div className="invoice-amount">
                            $360
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                        <Media className="align-items-center">
                            <span className="mb-0 text-sm">
                            Agent (3 pack)
                            </span>
                        </Media>
                        </th>
                        <td>1</td>         
                        <td>
                        <div className="invoice-qty">
                            $11.99 / mo
                        </div>
                        </td>
                        <td>
                        <div className="invoice-amount">
                            $11.99
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                        <Media className="align-items-center">
                            <span className="mb-0 text-sm">
                            Agent (single)
                            </span>
                        </Media>
                        </th>
                        <td>1</td>         
                        <td>
                        <div className="invoice-qty">
                            $5.99 / mo
                        </div>
                        </td>
                        <td>
                        <div className="invoice-amount">
                            $5.99
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                         &nbsp;
                        </th>
                        <td>&nbsp;</td>         
                        <td>
                        <div className="text-xl font-weight-bold">
                            Total
                        </div>
                        </td>
                        <td>
                        <div className="text-xl font-weight-bold">
                            $377.98
                        </div>
                        </td>
                    </tr>
                    </tbody>
                  </Table>
                  <hr className="my-4" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Clients;
