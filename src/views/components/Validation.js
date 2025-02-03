import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Badge,
  Table,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";

const Validation = () => {
  return (
        <>
        <UserHeader/>
        <Container className="mt--7" fluid>
            <Row>
                <Col lg="8" className="mx-auto">
                  <Card className="bg-secondary shadow">
                    <CardBody>
                      {/* ✅ Confirmation messages */}
                      <Row>
                        <Col className="mb-4">
                          <div className="success">
                            <h2 className="text-center mb-4">Transaction Confirmed!</h2>
                            <h3>Thank you for your purchase!</h3>
                            <p>We are pleased to confirm that we have received your order <b>#[Order Number]</b> placed on <b>[Order Date]</b>. Here are the details of your transaction:</p>
                            
                            <div className="order-summary mb-4">
                              <h4 className="mb-2">Order Summary</h4>
                              <h6 className="heading-small text-muted mb-2">Item(s) Purchased:</h6>
                              <ul className="list-unstyled mb-2 pl-2 text-sm">
                                <li className="mb-1">[Product Name 1] - [Quantity] - [Price]</li>
                                <li className="mb-1">[Product Name 2] - [Quantity] - [Price]</li>
                              </ul>
                              <h6 className="heading-small text-muted mb-1">Subtotal: $[Subtotal Amount]</h6>
                              <h6 className="heading-small text-muted mb-1">Tax: $[Tax Amount]</h6>
                              <h6 className="heading-small mb-1">Total Amount: $[Total Amount]</h6>
                            </div>

                            <div className="payment-info mb-4">
                              <h4 className="mb-2">Payment Information</h4>
                              <h6 className="heading-small mb-1">Payment Method: [Credit Card/PayPal/etc.]</h6>
                              <h6 className="heading-small mb-1">Transaction ID: [Transaction ID]</h6>
                            </div>
  
                            <div className="more-info mb-4">
                              <h4 className="mb-2">Next Steps</h4>
                              <p className="mb-1">You will receive a confirmation email shortly at [Customer Email Address]. If you have any questions or need assistance, please contact our customer support team at [Customer Support Email/Phone Number].</p>
                            </div>
    
                            <h4>Thank you for using Vox Leads!</h4>
                          </div>
                        </Col>
                      </Row>
                      {/* ✅ Failed messages */}
                      <Row>
                        <Col className="mb-4">
                          <div className="failure">
                            <h2 className="text-center mb-4">Transaction Failed</h2>
                            <h3>We're Sorry, Your Payment Was Unsuccessful</h3>
                            <p>Unfortunately, we were unable to process your payment for order <b>#[Order Number]</b>.</p>
                            
                            <div className="more-info">
                              <h4 className="mb-2">What to Do Next</h4>
                              <ul className="mb-2 pl-4 text-sm">
                                <li className="mb-1">Check Your Payment Information: Verify that all details are correct and try again.</li>
                                <li className="mb-1">Use a Different Payment Method: If possible, consider using an alternative payment method.</li>
                                <li className="mb-1">Contact Your Bank: If you believe there should be sufficient funds, please reach out to your bank for further assistance.</li>
                              </ul>
                              <p>If you need help or have any questions, feel free to contact our customer support team at [Customer Support Email/Phone Number].</p>
                              <p>We appreciate your understanding and hope to assist you in completing your purchase soon!</p>
                            </div>
  
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
            </Row>
        </Container>
        </>
        );
};

export default Validation;
