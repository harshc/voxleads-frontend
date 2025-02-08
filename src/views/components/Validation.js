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
import api from "../../services/api";


const Validation = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        

        if (!sessionId) {
          console.error('No session ID found');
          return;
        }

        const response = await api.get(`/queues/stripe/session-status?session_id=${encodeURIComponent(sessionId)}`);
        
        if (response.data) {
          setStatus(response.data.status === 'paid' ? 'complete' : 'failed');
          setCustomerEmail(response.data.customer_email);
          setOrderDetails(response.data);  // Assuming the API returns order details
        }
      } catch (error) {
        console.error('Error fetching session status:', error);
        setStatus('failed');
      }
    };

    fetchSessionStatus();
  }, []);

  return (
    <>
      <UserHeader/>
      <Container className="mt--7" fluid>
        <Row>
          <Col lg="8" className="mx-auto">
            <Card className="bg-secondary shadow">
              <CardBody>
                {!status ? (
                  <Row>
                    <Col className="mb-4">
                      <div className="text-center">
                        <h2>Loading...</h2>
                      </div>
                    </Col>
                  </Row>
                ) : status === 'complete' || status === 'success' ? (
                  <Row>
                    <Col className="mb-4">
                      <div className="success">
                        <h2 className="text-center mb-4">Transaction Confirmed!</h2>
                        <h3>Thank you for your purchase!</h3>
                        <p>We are pleased to confirm that we have received your order <b>{orderDetails?.order_number || ''}</b> placed on <b>{new Date().toLocaleDateString()}</b>. Here are the details of your transaction:</p>
                        
                        <div className="order-summary mb-4">
                          <h4 className="mb-2">Order Summary</h4>
                          <h6 className="heading-small text-muted mb-2">Item(s) Purchased:</h6>
                          <ul className="list-unstyled mb-2 pl-2 text-sm">
                            <li className="mb-1">{orderDetails?.product_name || ''} - {orderDetails?.quantity || ''} - ${orderDetails?.price || ''}</li>
                          </ul>
                          <h6 className="heading-small text-muted mb-1">Subtotal: ${orderDetails?.subtotal || ''}</h6>
                          <h6 className="heading-small text-muted mb-1">Tax: ${orderDetails?.tax || ''}</h6>
                          <h6 className="heading-small mb-1">Total Amount: ${orderDetails?.total || ''}</h6>
                        </div>

                        <div className="payment-info mb-4">
                          <h4 className="mb-2">Payment Information</h4>
                          <h6 className="heading-small mb-1">Payment Method: {orderDetails?.payment_method || 'Credit Card'}</h6>
                          <h6 className="heading-small mb-1">Transaction ID: {orderDetails?.transaction_id || ''}</h6>
                        </div>

                        <div className="more-info mb-4">
                          <h4 className="mb-2">Next Steps</h4>
                          <p className="mb-1">You will receive a confirmation email shortly at {customerEmail}. If you have any questions or need assistance, please contact our customer support team at support@voxleads.ai</p>
                        </div>

                        <h4>Thank you for using Vox Leads!</h4>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col className="mb-4">
                      <div className="failure">
                        <h2 className="text-center mb-4">Transaction Failed</h2>
                        <h3>We're Sorry, Your Payment Was Unsuccessful</h3>
                        <p>Unfortunately, we were unable to process your payment for order <b>{orderDetails?.order_number || ''}</b>.</p>
                        
                        <div className="more-info">
                          <h4 className="mb-2">What to Do Next</h4>
                          <ul className="mb-2 pl-4 text-sm">
                            <li className="mb-1">Check Your Payment Information: Verify that all details are correct and try again.</li>
                            <li className="mb-1">Use a Different Payment Method: If possible, consider using an alternative payment method.</li>
                            <li className="mb-1">Contact Your Bank: If you believe there should be sufficient funds, please reach out to your bank for further assistance.</li>
                          </ul>
                          <p>If you need help or have any questions, feel free to contact our customer support team at support@voxleads.ai</p>
                          <p>We appreciate your understanding and hope to assist you in completing your purchase soon!</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Validation;
