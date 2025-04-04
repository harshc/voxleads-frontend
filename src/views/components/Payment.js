import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; // Separate component for payment form
import api from "../../services/api";
import { auth } from "../../firebase-config";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
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
    Table,
    UncontrolledTooltip,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useNavigate } from "react-router-dom";

// ✅ Load Stripe with your Public Key
// Test Mode
const stripePromise = loadStripe("pk_test_51QhECUI5EzG8iF5egJVi7t1fD0tru3pRtbc06CEqujq6UFQx199kb8BG2lVqZfjk98TiO8MvD5KTP5hWzFhj0ILR00rttkJyK4");
// Live Mode
//const stripePromise = loadStripe("pk_live_51QhECUI5EzG8iF5emCL9dDrfGPHzWxnp5aEQfmKdNf78gLSF4t4AvG83Pokzolw81MGW651rWhNpNpBdKcRLpCLT00JdGe0f2o");

const Payment = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const currentUser = auth.currentUser; // ✅ Get current user from AuthContext
    const [queueCount, setQueueCount] = useState(5); // Default queue count
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const createCheckoutSession = async () => {
            const currentUser = auth.currentUser;
            setLoading(true)
            if (!currentUser) {
                console.log("User is not authenticated.");
                navigate("/auth/login");
            }

            try {
                console.log(`Creating Stripe Checkout for ${currentUser.uid}`);

                // ✅ Call backend to create checkout session
                const response = await api.post("/queues/stripe/checkout", {
                    client_id: currentUser.uid,
                    queue_count: queueCount,
                });
                console.log(response.data.clientSecret)
                setClientSecret(response.data.clientSecret);
                setLoading(false);
            } catch (error) {
                console.error("Error creating Stripe Checkout session:", error);
                setLoading(false);
            }
        };

        createCheckoutSession();
    }, [queueCount, navigate]); // ✅ Runs when queue count changes

    const options = {
        clientSecret,
    };

    return (
        <>
        <UserHeader/>
        <Container className="mt--7" fluid>
            <Row>
                <Col lg="8" className="mx-auto">
                <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                    <Col>
                        <h1 className="mb-0">Select Your Plan</h1>
                    </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                    <Col className="mb-4">
                    {/* ✅ Queue Selection Options */}
                    <div className="queue-options d-flex justify-content-center align-items-center">
                        <Button
                            color="primary"
                            onClick={() => setQueueCount(5)}
                            className={queueCount === 5 ? "selected" : ""}
                        >
                            5 Agents
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => setQueueCount(10)}
                            className={queueCount === 10 ? "selected" : ""}
                        >
                            10 Agents
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => setQueueCount(15)}
                            className={queueCount === 15 ? "selected" : ""}
                        >
                            15 Agents
                        </Button>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div id="checkout">
                        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
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

export default Payment;
