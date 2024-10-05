import React, { useEffect, useState } from 'react'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Form, Container, Col, Row, Button } from 'react-bootstrap'
import { Colors } from '../common/ConstantStyles'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { createOrderMaster, getAllCitiesByStateId, getAllStates } from '../components/api'
import { useRazorpay } from "react-razorpay";

export default function Checkout() {

    const { Razorpay } = useRazorpay();
    //const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID;

    const navigate = useNavigate();
    let { state } = useLocation();
    const orderTotal = state.orderTotal;

    const loginId = localStorage.getItem("userLoginId");
    const userName = localStorage.getItem("userName");
    const userMobile = localStorage.getItem("userMobile");
    const userEmail = localStorage.getItem("userEmail");
    const customerId = localStorage.getItem("customerId");

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [addressName, setAddressName] = useState("");
    const [addressType, setAddressType] = useState("Residence Address")
    const [address, setAddress] = useState("");
    const [area, setArea] = useState("");
    const [pincode, setPincode] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
    const [termsAndConditions, setTermsAndConditions] = useState(false);

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

        if (pincode.length !== 6) {
            setUpdateMessage(<span style={{ color: "red" }}>Enter a valid 6 digit pincode</span>);
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
        } else if (!termsAndConditions) {
            setUpdateMessage(<span style={{ color: "red" }}>Please select terms and conditions</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }

        else {

            // console.log(
            //     " name: " + name +
            //     " mobile: " + mobile +
            //     " email: " + email +
            //     " companyName: " + companyName +
            //     " addressName: " + addressName +
            //     " address: " + address +
            //     " area: " + area +
            //     " pincode: " + pincode +
            //     " additionalInformation: " + additionalInformation +
            //     " stateValue: " + stateValue +
            //     " cityValue: " + cityValue +
            //     " paymentMethod: " + paymentMethod +
            //     " terms and conditions: " + termsAndConditions +
            //     " curstomerId: " + customerId +
            //     " addressType: " + addressType
            // )

            let toInput = {
                name: name,
                email: email,
                mobile: mobile,
                companyName: companyName,
                addType: addressType,
                addName: addressName,
                pinCode: pincode,
                addLine1: address,
                stateID: stateValue,
                cityID: cityValue,
                customerID: customerId,
                orderType: "Retail",
                totalAmount: orderTotal,
                totalDiscount: 0,
                netAmount: orderTotal,
                totalTax: 1.5,
                totalIGST: 1.5,
                paymentStatus: "pending",
                orderStatus: "pending",
                createdByid: loginId
            };

            await createOrderMaster(toInput)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    if (!response.ok) {
                        setUpdateMessage(<span style={{ color: "red" }}>{data.error.undefined}</span>);
                        setTimeout(() => setUpdateMessage(""), 3000);
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                        // const error = (data && data.message) || response.status;
                        // return Promise.reject(error);
                    }

                    if (response.status === 422) {
                        setUpdateMessage(<span style={{ color: "red" }}>{data.error.undefined}</span>);
                        setTimeout(() => setUpdateMessage(""), 3000);
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }

                    if (data.status === "Success") {
                        //console.log("Razorpay Process: " + JSON.stringify(data.data));
                        console.log("Amount: " + data.data.netAmount)
                        console.log("OrderId: " + data.data._id)
                        handlePayment(data.data._id, data.data.netAmount);

                    } else {
                        setUpdateMessage(<span style={{ color: "red" }}>Error in placing Order. Please try again.</span>);
                        setTimeout(() => setUpdateMessage(""), 3000);
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }

                })
                .catch((error) => {
                    setUpdateMessage(<span style={{ color: "red" }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                });
        }
    }

    const handlePayment = async (orderId, orderAmount) => {

        try {

            const options = {
                key: "rzp_live_eSgoNiHqgixk7J",
                amount: "100",
                currency: "INR",
                name: "Ajayco Products", // Add company details
                description: "Payment for your order id: " + orderId, // Add order details
                //order_id: orderId,
                // this is make function which will verify the payment after making the payment 
                // handler: async (response) => {
                // try {
                //     await fetch("http://localhost:3001/verify-payment", {
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json",
                //         },

                //         body: JSON.stringify({
                //             razorpay_order_id: response.razorpay_order_id,
                //             razorpay_payment_id: response.razorpay_payment_id,
                //             razorpay_signature: response.razorpay_signature,
                //         }),

                //     });

                //     navigate("/placeorder", { state: { paymentStatus: "Success", paymentMessage: "Payment successful!" } });
                // } catch (err) {
                //     navigate("/placeorder", { state: { paymentStatus: "Failed", paymentMessage: "Payment failed: " + err.message } });
                // }


                //},
                image:"../images/AjayCoProductsLogo.png",
                "handler": function (response) {
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature)
                },
                prefill: {
                    name: "John Doe", // add customer details
                    email: "john@example.com", // add customer details
                    contact: "9999999999", // add customer details
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    // you can change the gateway color from here according to your application theme
                    color: "#3399cc",
                },
            };
            const rzpay = new Razorpay(options);
            // this will open razorpay window for take the payment in the frontend under the hood it use inbuild javascript windows api 
            rzpay.open(options);
        } catch (err) {
            alert("Error creating order: " + err.message);
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

                                    <Form.Group as={Row} className="mb-3">
                                        <Col md style={{ fontSize: 14 }}>
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Residence Address"
                                                value="Residence Address"
                                                name="AddressType"
                                                onChange={e => setAddressType(e.target.value)}
                                                checked={addressType === "Residence Address"}
                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Company Address"
                                                value="Company Address"
                                                name="AddressType"
                                                onChange={e => setAddressType(e.target.value)}
                                                checked={addressType === "Company Address"}
                                            />
                                        </Col>
                                    </Form.Group>

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
                                            <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Address Name<span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control
                                                size="lg"
                                                value={addressName}
                                                onChange={e => { setAddressName(e.target.value) }}
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
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Pincode <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    value={pincode}
                                                    type="tel"
                                                    maxLength="6"
                                                    onChange={e => { setPincode(e.target.value.replace(/\D/g, "")) }}
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
                                                    onChange={e => { setStateValue(e.target.value); getCitiesDropdownList(e.target.value); setCityValue(null); }}
                                                >
                                                    <option value="- Select State -" id="- Select State -">- Select State -</option>
                                                    {states.map((data, key) => <option key={data._id} value={data._id} id={data.stateName} >{data.stateName}</option>)}
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
                                            <li>
                                                <span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    Order Total
                                                </span>
                                                <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    ₹ {orderTotal.toFixed(2)}
                                                </span>
                                            </li>
                                            <li>
                                                <span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    Shipping
                                                </span>
                                                <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    ₹ 0.00
                                                </span>
                                            </li>
                                            <li>
                                                <span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    Other
                                                </span>
                                                <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    ₹ 0.00
                                                </span>
                                            </li>
                                            <li>
                                                <span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    SGST(9%)
                                                </span>
                                                <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    ₹ {(orderTotal * 9 / 100).toFixed(2)}
                                                </span>
                                            </li>
                                            <li>
                                                <span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    CGST(9%)
                                                </span>
                                                <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    ₹ {(orderTotal * 9 / 100).toFixed(2)}
                                                </span>
                                            </li>
                                            <li>
                                                <span style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    IGST(18%)
                                                </span>
                                                <span style={{ textAlign: "right", fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>
                                                    ₹ {(orderTotal * 18 / 100).toFixed(2)}
                                                </span>
                                            </li>
                                            {/* <li><span><strong>Amount to be Paid</strong></span> <span style={{ textAlign: "right" }}><strong>₹ {orderTotal}</strong></span></li> */}
                                            <li>
                                                <span>
                                                    <strong>Amount to be Paid</strong>
                                                </span>
                                                <span style={{ textAlign: "right" }}>
                                                    <strong>₹ {orderTotal}</strong>
                                                </span>
                                            </li>
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
                                                    value="Direct Bank Transfer"
                                                    name="PaymentMethod"
                                                    onChange={e => setPaymentMethod(e.target.value)}
                                                    checked={paymentMethod === "Direct Bank Transfer"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Paypal"
                                                    value="Paypal"
                                                    name="PaymentMethod"
                                                    onChange={e => setPaymentMethod(e.target.value)}
                                                    checked={paymentMethod === "Paypal"}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Cash On Delivery"
                                                    value="Cash On Delivery"
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
                                            <Form.Check aria-label="option 1" type="checkbox" onClick={(e) => { setTermsAndConditions(e.target.checked); }} />
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