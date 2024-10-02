import React, { useEffect, useState } from 'react'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Button, Container, Row, Col, Modal, Image, CloseButton, Form } from 'react-bootstrap'
import { Colors } from '../common/ConstantStyles'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, incrementItemQuantity, decrementItemQuantity } from '../redux/actions/cartAction'
import { API_BASE } from "../components/urlLink";

export default function Cart() {

    const dispatch = useDispatch();

    const loginid = localStorage.getItem("userLoginId");
    const role = localStorage.getItem("userRole");

    const { cart } = useSelector(state => state.cart);

    const [show, setShow] = useState(false);
    const [showNoItems, setShowNoItems] = useState(false);
    const [selectedItemToRemove, setSelectedItemToRemove] = useState();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [])

    const navigate = useNavigate();

    const removefromCart = (item) => {
        setShow(true);
        setSelectedItemToRemove(item);
    }

    const incrementQuantity = (pItem) => {
        dispatch(incrementItemQuantity(pItem));
    }

    const decrementQuantity = (pItem) => {
        dispatch(decrementItemQuantity(pItem));
    }

    return (
        <>

            <TopHeader />
            <NavBar />

            <Container >

                <Modal show={show} onHide={() => { setShow(false) }} size="md">
                    <Modal.Header>
                        <Modal.Title style={{ fontSize: 16 }}>Delete Item </Modal.Title>
                        <Image className="closeImage" src="../images/close.png" style={{ width: 18, height: 18, alignSelf: "center" }} onClick={() => { setShow(false) }} />
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: 14 }}>Are you sure you want to delete this item?</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            style={{ backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.primaryViolet, width: 75 }}
                            onClick={() => { setShow(false) }}
                        > Close </Button>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            style={{ backgroundColor: Colors.primaryViolet, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.white, width: 75 }}
                            onClick={() => { setShow(false); dispatch(removeItemFromCart(selectedItemToRemove)); }}
                        > Yes </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showNoItems} onHide={() => { setShowNoItems(false) }} size="md">
                    <Modal.Header>
                        <Modal.Title style={{ fontSize: 16 }}>Empty Cart</Modal.Title>
                        <Image className="closeImage" src="../images/close.png" style={{ width: 18, height: 18, alignSelf: "center" }} onClick={() => { setShowNoItems(false) }} />
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: 14 }}>Your cart is empty. Please add some items in your cart.</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            style={{ backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.primaryViolet, width: 75 }}
                            onClick={() => { setShowNoItems(false) }}
                        > Close </Button>
                    </Modal.Footer>
                </Modal>

                {role === "dealer" ?
                    <Row style={{ marginTop: 30, marginBottom: 30 }}>
                        <Col className="col-sm-12 offset-sm-2 text-center colorlib-heading">
                            <div className="process-wrap">
                                <div className="process text-center active">
                                    <p><span>01</span></p>
                                    <h3>Shopping Cart</h3>
                                </div>
                                <div className="process text-center">
                                    <p><span>02</span></p>
                                    <h3>Order Complete</h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    :
                    <Row style={{ marginTop: 30, marginBottom: 30 }}>
                        <Col>
                            <div className="process-wrap">
                                <div className="process text-center active">
                                    <p><span>01</span></p>
                                    <h3>Shopping Cart</h3>
                                </div>
                                <div className="process text-center">
                                    <p><span>02</span></p>
                                    <h3>Checkout</h3>
                                </div>
                                <div className="process text-center">
                                    <p><span>03</span></p>
                                    <h3>Order Complete</h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }

                <Row style={{ backgroundColor: Colors.grey, padding: 5, borderRadius: 50, fontSize: 14, fontWeight: "bold", textAlign: "center" }} className="align-items-center">
                    <Col sm={4}>Product</Col>
                    <Col sm={2}>Size</Col>
                    <Col sm={1}>Price</Col>
                    <Col sm={2}>Quantity</Col>
                    <Col sm={2}>Sub-Total</Col>
                    <Col sm={1}>Remove</Col>
                </Row>
                <Row>
                    {cart.length !== 0 ?
                        cart.map((item, index) => (
                            <Row key={index + 1} className="product-cart d-flex align-items-center" style={{ backgroundColor: Colors.white, padding: 5, fontSize: 14, textAlign: "center", color: Colors.darkGrey }}>
                                <Col sm={4}>
                                    <div className="product-img">
                                        <img src={`${API_BASE}/images/category/category_1726663680324.png`} alt="product_image" height={75} />
                                    </div>
                                    <div className="display-tc">
                                        <p>{item.productName}</p>
                                        <span style={{ fontSize: 12 }}>{item.SKU}</span>
                                    </div>
                                </Col>
                                <Col sm={2} style={{ wordBreak: "break-all" }}>{item.selectedVariant}</Col>
                                <Col sm={1}>₹ {item.price.toFixed(2)}</Col>
                                <Col sm={2}>
                                    <Image className="closeImage" src="../images/minus.png" style={{ width: 25, height: 25, alignSelf: "center", margin: 5, padding: 8, backgroundColor: Colors.grey }} onClick={() => { decrementQuantity(item) }} />
                                    <span className="price">{item.quantity}</span>
                                    <Image className="closeImage" src="../images/plus.png" style={{ width: 25, height: 25, alignSelf: "center", margin: 5, padding: 8, backgroundColor: Colors.grey }} onClick={() => { incrementQuantity(item) }} />
                                </Col>
                                <Col sm={2}>₹ {(item.price * item.quantity).toFixed(2)}</Col>
                                <Col sm={1} ><CloseButton onClick={() => { removefromCart(item) }} variant="light" /></Col>
                            </Row>
                        ))
                        :
                        <div>
                            <Row style={{ backgroundColor: Colors.white, color: Colors.darkGrey, marginTop: 30, marginBottom: 30, fontSize: 14, textAlign: "center" }}>
                                <span>No Items in Cart</span>
                            </Row>
                            <hr />
                        </div>
                    }
                </Row>

                <Row className="justify-content-center">
                    <Col lg={8} style={{ marginBottom: 20 }}>
                        <Row>
                            <Col sm={4}>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        size="md"
                                        type="submit"
                                        style={{ backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.primaryViolet }}>
                                        Apply
                                    </Button>
                                </Form>
                            </Col>

                        </Row>

                    </Col>
                    <Col lg={4}>
                        <div className="cart-detail">
                            <ul>
                                <li><span><strong>Order Total</strong></span> <span style={{ textAlign: "right" }}><strong>₹ {cart.reduce((acc, item) => acc += (item.price * item.quantity), 0).toFixed(2)}</strong></span></li>
                            </ul>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col style={{ textAlign: "center" }}>
                        <Button variant="secondary" size="md" style={{ backgroundColor: Colors.primaryViolet, fontWeight: "bold" }} onClick={() => {
                            if (cart.length === 0) {
                                setShowNoItems(true);
                            } else {
                                loginid ?
                                    <>
                                        {role === "customer" ?
                                            navigate("/checkout", { state: { orderTotal: cart.reduce((acc, item) => acc += (item.price * item.quantity), 0).toFixed(2) } })
                                            :
                                            navigate("/placeorder")
                                        }
                                    </>
                                    :
                                    navigate("/login");
                            }

                        }}> CONFIRM ORDER </Button>
                    </Col>
                </Row>
            </Container>

            <Footer />

        </>
    )
}