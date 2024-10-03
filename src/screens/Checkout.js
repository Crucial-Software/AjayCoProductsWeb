import React, { useEffect, useState } from 'react'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Form, Container, Col, Row, Button } from 'react-bootstrap'
import { Colors } from '../common/ConstantStyles'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { getAllCitiesByStateId, getAllStates } from '../components/api'

export default function Checkout() {

    const userName = localStorage.getItem("userName");
    const userMobile = localStorage.getItem("userMobile");
    const userEmail = localStorage.getItem("userEmail");

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [area, setArea] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

    const [states, setStates] = useState([]);
    const [stateValue, setStateValue] = useState("- Select State -");
    const [cities, setCities] = useState([]);
    const [cityValue, setCityValue] = useState("- Select City -");
    const [updateMessage, setUpdateMessage] = useState("");

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        fetchAllStates();
        setName(userName);
        setMobile(userMobile);
        setEmail(userEmail);
    }, [userName, userMobile, userEmail])

    const navigate = useNavigate();

    let { state } = useLocation();
    const orderTotal = state.orderTotal;

    // const checkData = () => {
    //     console.log("" + orderTotal);
    //     navigate("/placeorder");
    // }

    const fetchAllStates = async () => {
        await getAllStates()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (response.ok) {
                    setStates(data.data);
                } else {
                    setUpdateMessage(<span style={{ color: Colors.red }}>Error in loading states</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                }
            })
            .catch(error => {
                setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setUpdateMessage(""), 3000);
            });
    }

    const getCitiesDropdownList = async (sid) => {
        let toInput = {
            stateID: sid
        };
        await getAllCitiesByStateId(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (response.ok) {
                    setCities(data.data);
                } else {
                    setUpdateMessage(<span style={{ color: Colors.red }}>Error in loading cities</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                }
            })
            .catch(error => {
                setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setUpdateMessage(""), 3000);
            });
    }

    const checkCheckoutData = async (event) => {
        event.preventDefault();

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // eslint-disable-line

        if (zipcode.length !== 6) {
            setUpdateMessage(<span style={{ color: "red" }}>Enter a valid 6 digit zipcode</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else if (reg.test(email) === false) {
            setUpdateMessage(<span style={{ color: "red" }}>Enter a valid email id</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else if (mobile.length !== 10) {
            setUpdateMessage(<span style={{ color: "red" }}>Enter a valid 10 digit mobile number</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else if (stateValue === "" || stateValue === "- Select State -") {
            setUpdateMessage(<span style={{ color: "red" }}>Please select state</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else if (cityValue === "" || cityValue === "- Select City -" || cityValue === null) {
            setUpdateMessage(<span style={{ color: "red" }}>Please select city</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }

        else {

            console.log(
                "name: " + name +
                "mobile: " + mobile +
                "email: " + email +
                "companyName: " + companyName +
                "address: " + address +
                "area: " + area +
                "zipcode: " + zipcode +
                "additionalInformation: " + additionalInformation +
                "stateValue: " + stateValue +
                "cityValue: " + cityValue + 
                "paymentMethod: " + paymentMethod
            )
        }


    }

    return (
        <>

            <TopHeader />
            <NavBar />

            <Container>
                <Row style={{ marginTop: 30, marginBottom: 30 }}>
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
                            <div className="process text-center ">
                                <p><span>03</span></p>
                                <h3>Order Complete</h3>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div style={{ fontWeight: "bold", marginBottom: 10 }}>{updateMessage}</div>
                <Form onSubmit={checkCheckoutData}>
                    <Row>
                        <Col lg={8}>

                            <div className="contact-wrap">
                                <h3>Billing Details</h3>

                                <div className="row" style={{ marginTop: 20 }}>

                                    <Row>
                                        <Form.Group className="mb-2" controlId="formGroupEmail">
                                            <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Full Name <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control
                                                size="lg"
                                                value={name}
                                                onChange={e => { setName(e.target.value) }}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group className="mb-2" controlId="formGroupEmail">
                                            <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Company Name <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control
                                                size="lg"
                                                value={companyName}
                                                onChange={e => { setCompanyName(e.target.value) }}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group className="mb-2" controlId="formGroupEmail">
                                            <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Address <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control
                                                size="lg"
                                                value={address}
                                                onChange={e => { setAddress(e.target.value) }}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-2" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Area <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    value={area}
                                                    onChange={e => { setArea(e.target.value) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-2" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Zipcode <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    value={zipcode}
                                                    type="tel"
                                                    maxLength="6"
                                                    onChange={e => { setZipcode(e.target.value.replace(/\D/g, "")) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-2" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Email Id <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    type="email"
                                                    value={email}
                                                    onChange={e => { setEmail(e.target.value) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group className="mb-2" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Mobile <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    type="tel"
                                                    maxLength="10"
                                                    value={mobile}
                                                    onChange={e => { setMobile(e.target.value.replace(/\D/g, "")) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>State <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="rounded-3"
                                                    style={{ fontSize: 12 }}
                                                    value={stateValue}
                                                    onChange={e => { setStateValue(e.target.value); getCitiesDropdownList(e.target.value); setCityValue(null) }}
                                                >
                                                    <option value="- Select State -">- Select State -</option>
                                                    {states.map((data, key) => <option key={data._id} value={data._id} >{data.stateName}</option>)}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>City <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="rounded-3"
                                                    style={{ fontSize: 12 }}
                                                    value={cityValue}
                                                    onChange={e => { setCityValue(e.target.value); }}
                                                >
                                                    <option value="- Select City -">- Select City -</option>
                                                    {cities.map((data, key) => <option key={data._id} value={data._id} >{data.cityName}</option>)}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-2" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Country <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    placeholder="India"
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row >
                                        <Form.Group className="mb-2" controlId="formGroupEmail">
                                            <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Additional Information <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control
                                                size="lg"
                                                as="textarea"
                                                rows={5}
                                                placeholder="Notes about your order or any special notes for delivery"
                                                value={additionalInformation}
                                                onChange={e => { setAdditionalInformation(e.target.value) }}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>

                                </div>

                            </div>
                        </Col>
                        <Col lg={4}>
                            <Row>
                                <Col>
                                    <div className="cart-detail">
                                        <h4>Cart Total</h4>
                                        <ul style={{ marginTop: 10 }}>
                                            {/* <li><span>Order Total</span> <span style={{ textAlign: "right" }}>₹ {orderTotal}</span></li> */}
                                            <li><span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Order Total</span> <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>₹ {orderTotal.toFixed(2)}</span></li>
                                            <li><span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Shipping</span> <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>₹ 0.00</span></li>
                                            <li><span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Other</span> <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>₹ 0.00</span></li>
                                            <li><span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>SGST(9%)</span> <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>₹ {(orderTotal * 9 / 100).toFixed(2)}</span></li>
                                            <li><span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>CGST(9%)</span> <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>₹ {(orderTotal * 9 / 100).toFixed(2)}</span></li>
                                            <li><span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>IGST(18%)</span> <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>₹ {(orderTotal * 18 / 100).toFixed(2)}</span></li>
                                            {/* <li><span><strong>Amount to be Paid</strong></span> <span style={{ textAlign: "right" }}><strong>₹ {orderTotal}</strong></span></li> */}
                                            <li><span><strong>Amount to be Paid</strong></span> <span style={{ textAlign: "right" }}><strong>₹ {orderTotal}</strong></span></li>
                                        </ul>
                                    </div>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="cart-detail">
                                        <h2>Payment Method</h2>
                                        <Form.Group as={Row} className="mb-3">
                                            <Col md style={{ fontSize: 14 }}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Direct Bank Transfer"
                                                    name="PaymentMethod"
                                                    onChange={e => setPaymentMethod(e.target.value)}
                                                    checked={paymentMethod === "Direct Bank Transfer"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Paypal"
                                                    name="PaymentMethod"
                                                    onChange={e => setPaymentMethod(e.target.value)}
                                                    checked={paymentMethod === "Paypal"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Cash On Delivery"
                                                    name="PaymentMethod"
                                                    onChange={e => setPaymentMethod(e.target.value)}
                                                    checked={paymentMethod === "Cash On Delivery"}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md className="mb-3" style={{ fontSize: 14 }} >
                                    <div className="cart-detail">
                                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                                        {/* <Form.Check label="I have read and accept all Terms & Conditions" /> */}
                                        <div style={{ padding: 20 }}>
                                            <Form.Check aria-label="option 1" />
                                            <p>I have read and accept all <Link to="/termsandconditions"><span style={{ fontWeight: "bold" }}>Terms & Conditions</span></Link></p>
                                        </div>

                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ textAlign: "center", marginTop: 30 }}>
                            <Button variant="secondary" type="submit" size="md" style={{ backgroundColor: Colors.primaryViolet, fontWeight: "bold" }}> PLACE ORDER </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <Footer />

        </>
    )
}