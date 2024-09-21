import React, { useEffect } from 'react'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Colors } from '../common/ConstantStyles'
import { useNavigate } from 'react-router-dom'

export default function PlaceOrder() {

    const role = localStorage.getItem("userRole");

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [])

   
    return (
        <>
            <TopHeader />
            <NavBar />

            <Container>

                {role === "dealer" ?
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
                    :
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
                }

                <Row style={{ marginTop: 50 }}>
                    <Col style={{ textAlign: "center" }}>
                        <p className="icon-addcart"><span><i className="icon-check"></i></span></p>
                        <h2 className="mb-4">Order Placed Successfully.</h2>
                        <h6 className="mb-4">Thank you for purchasing.</h6>
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
