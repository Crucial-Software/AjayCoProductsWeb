import React, { useEffect } from 'react'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Colors } from '../common/ConstantStyles'
import { useNavigate, useLocation } from 'react-router-dom'

export default function PlaceOrder() {

    const role = localStorage.getItem("userRole");

    const navigate = useNavigate();
    let { state } = useLocation();
    const { paymentStatus, paymentMessage, paymentId, orderId } = state;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [paymentStatus])

    return (
        <>
            <TopHeader />
            <NavBar />

            <Container>

                {role === "customer" ?
                    <Row style={{ marginTop: 30 }}>
                        <Col>
                            <div className="process-wrap">
                                <div className="process text-center active">
                                    <p><span>01</span></p>
                                    <h3>Shopping Cart</h3>
                                </div>
                                <div className="process text-center active">
                                    <p><span>02</span></p>
                                    <h3>Checkout</h3>
                                </div>
                                <div className="process text-center active">
                                    <p><span>03</span></p>
                                    <h3>Order Complete</h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    :
                    <Row style={{ marginTop: 30 }}>
                        <Col className="col-sm-12 offset-sm-2 text-center colorlib-heading">
                            <div className="process-wrap">
                                <div className="process text-center active">
                                    <p><span>01</span></p>
                                    <h3>Shopping Cart</h3>
                                </div>
                                <div className="process text-center active">
                                    <p><span>02</span></p>
                                    <h3>Order Complete</h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }

                <Row style={{ marginTop: 50 }}>
                    <Col style={{ textAlign: "center" }}>
                        {paymentStatus === "Success" ?
                            <>
                                <p className="icon-addcart"><span><i className="fa fa-check"></i></span></p>
                                <h2 className="mb-4">{paymentMessage}</h2>
                                <h6>Order Id: {orderId}</h6>
                                {role === "customer" ?
                                    <h6>Payment Id: {paymentId}</h6>
                                    : null
                                }
                                <h6 className="mb-4">Thank you for purchasing.</h6>
                            </>
                            :
                            <>
                                <p className="icon-addcart"><span><i className="fa fa-times"></i></span></p>
                                <h2 className="mb-4">{paymentMessage}</h2>
                                <h6>Order Id: {orderId}</h6>
                                {role === "customer" ?
                                    <h6>Payment Id: {paymentId}</h6>
                                    : null
                                }
                            </>
                        }

                        <Button
                            variant="outline-secondary"
                            size="md"
                            style={{ backgroundColor: Colors.primaryViolet, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.white, fontWeight: "bold" }}
                            onClick={() => { navigate("/home"); }}
                        >
                            Home
                        </Button>
                    </Col>
                </Row>
            </Container>

            <Footer />

        </>
    )
}
