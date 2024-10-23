import React, { useEffect, useState, useRef } from 'react'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Form, Container, Col, Row, Button, Image } from 'react-bootstrap'
import { Colors, FontSize } from '../common/ConstantStyles'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { createOrderMaster, getAllCitiesByStateId, getAllStates, getCustomerAddresses } from '../components/api'
import { useRazorpay } from "react-razorpay";
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Checkout() {

    const { Razorpay } = useRazorpay();

    const toast = useRef(null);

    const navigate = useNavigate();
    let { state } = useLocation();
    const orderTotal = state.orderTotal;

    const [loading, setLoading] = useState(false);

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
    const [addressType, setAddressType] = useState("")
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    const [termsAndConditions, setTermsAndConditions] = useState(false);

    const [states, setStates] = useState([]);
    const [stateValue, setStateValue] = useState();
    const [cities, setCities] = useState([]);
    const [cityValue, setCityValue] = useState();

    const [customerAddressesList, setCustomerAddressesList] = useState([]);
    const [selectedCustomerAddressId, setSelectedCustomerAddressId] = useState(null);

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
        fetchCustomerAddresses(customerId);
    }, [userName, userMobile, userEmail, customerId]);

    const fetchAllStates = async () => {
        await getAllStates()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (response.ok) {
                    setStates(data.data);
                } else {
                    toast.current.show({ life: 3000, severity: 'error', summary: 'Error in loading states' });
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
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
                    toast.current.show({ life: 3000, severity: 'error', summary: 'Error in loading cities' });
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
    }

    const fetchCustomerAddresses = async (cId) => {
        setLoading(true);
        let toInput = {
            //customerID: "66ec04c6ad238bb7385160d0"
            customerID: cId
        };
        await getCustomerAddresses(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (response.ok) {
                    setCustomerAddressesList(data.data);
                } else {
                    toast.current.show({ life: 3000, severity: 'error', summary: 'Error in loading customer addresses' });
                }
            })
            .catch(error => {
                setLoading(false);
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
    }

    const checkCheckoutData = async (event) => {
        event.preventDefault();

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // eslint-disable-line

        if (addressType === "") {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Please select address type' });
        }
        else if (pincode.length !== 6) {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Enter a valid 6 digit pincode' });
        }
        else if (reg.test(email) === false) {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Enter a valid email id' });
        }
        else if (mobile.length !== 10) {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Enter a valid 10 digit mobile number' });
        }
        else if (stateValue === "" || stateValue === "- Select State -") {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Please select state' });
        }
        else if (cityValue === "" || cityValue === "- Select City -" || cityValue === null) {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Please select city' });
        }
        else if (!termsAndConditions) {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Please select terms and conditions' });
        }

        else {

            // console.log(
            //     " name: " + name +
            //     " mobile: " + mobile +
            //     " email: " + email +
            //     " companyName: " + companyName +
            //     " addressName: " + addressName +
            //     " address: " + address +
            //     " pincode: " + pincode +
            //     " additionalInformation: " + additionalInformation +
            //     " stateValue: " + stateValue +
            //     " cityValue: " + cityValue +
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
                        toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                    }

                    if (response.status === 422) {
                        toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                    }

                    if (data.status === "Success") {
                        //console.log("Razorpay Process: " + JSON.stringify(data.data));
                        //console.log("Amount: " + data.data.netAmount)
                        //console.log("OrderId: " + data.data._id)
                        handlePayment(data.data._id, data.data.netAmount);

                    } else {
                        toast.current.show({ life: 3000, severity: 'error', summary: "Error in placing Order. Please try again." });
                    }

                })
                .catch((error) => {
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                });
        }
    }

    const handlePayment = async (orderId, orderAmount) => {
        const Razorpay_Id = "rzp_live_eSgoNiHqgixk7J";
        try {

            const options = {
                key: Razorpay_Id,
                amount: orderAmount * 100,
                currency: "INR",
                name: "Ajayco Products", // Add company details
                description: "Payment for your order id: " + orderId, // Add order details
                //order_id: orderId,
                //this is make function which will verify the payment after making the payment 
                handler: async (response) => {
                    console.log(response);
                    // Most important step to capture and authorize the payment. This can be done of Backend server.
                    const succeeded = crypto.HmacSHA256(`${orderId}|${response.razorpay_payment_id}`, Razorpay_Id).toString() === response.razorpay_signature;

                    // If successfully authorized. Then we can consider the payment as successful.
                    try {

                        // await fetch("http://localhost:3001/verify-payment", {
                        //     method: "POST",
                        //     headers: {
                        //         "Content-Type": "application/json",
                        //     },
                        //     body: JSON.stringify({
                        //         razorpay_order_id: response.razorpay_order_id,
                        //         razorpay_payment_id: response.razorpay_payment_id,
                        //         razorpay_signature: response.razorpay_signature,
                        //     }),

                        // });

                        if (succeeded) {
                            //   handlePayment('succeeded', {
                            //     orderId,
                            //     paymentId,
                            //     signature: response.razorpay_signature,
                            //   });
                            navigate("/placeorder", {
                                state: {
                                    paymentStatus: "Success",
                                    paymentMessage: "Payment Successful",
                                    paymentId: response.razorpay_payment_id,
                                    orderId: response.razorpay_order_id,
                                }
                            });
                        } else {
                            //   handlePayment('failed', {
                            //     orderId,
                            //     paymentId: response.razorpay_payment_id,
                            //   });
                            navigate("/placeorder", {
                                state: {
                                    paymentStatus: "Failed",
                                    paymentMessage: "Payment Failed",
                                    paymentId: response.razorpay_payment_id,
                                    orderId: response.razorpay_order_id
                                }
                            });
                        }
                    } catch (err) {
                        toast.current.show({ life: 3000, severity: 'error', summary: err });
                    }

                },
                image: "../images/AjayCoProductsLogo.png",
                // prefill: {
                //     name: userName, // add customer details
                //     email: userEmail, // add customer details
                //     contact: userMobile, // add customer details
                // },
                prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    // you can change the gateway color from here according to your application theme
                    color: "#3399cc",
                },
            };
            // All information is loaded in options
            const rzpay = new Razorpay(options);
            // this will open razorpay window for take the payment in the frontend under the hood it use inbuild javascript windows api 
            rzpay.open(options);
        } catch (err) {
            alert("Error creating order: " + err.message);
        }
    }

    const handleCustomerAddressClicked = async (addId) => {
        setSelectedCustomerAddressId(addId);
        var selCustomerAddress = customerAddressesList.filter(function (v, i) {
            if (v._id === addId) {
                return true;
            } else {
                return false;
            }
        });
        
        let cAdd = selCustomerAddress[0];
        setAddressType(cAdd.addType);
        setAddressName(cAdd.addName);
        setAddress(cAdd.addLine1);
        setPincode(cAdd.pinCode + '');
        setStateValue(cAdd.stateID._id);
        getCitiesDropdownList(cAdd.stateID._id);
        if(cities.length !== 0){
            setCityValue(cAdd.cityID._id);
        }
    }

    const clearAddressValues = () => {
        setSelectedCustomerAddressId(null);
        setAddressType("");
        setAddressName("");
        setAddress("");
        setPincode("");
        setStateValue("");
        setCityValue("");
    }

    return (
        <>

            <TopHeader />
            <NavBar />

            <Container>

                <Toast ref={toast} position="top-center" />

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

                <Form onSubmit={checkCheckoutData}>
                    <Row>
                        <Col lg={8}>

                            <div className="contact-wrap">
                                <h3>Billing Details</h3>

                                <div className="row" style={{ marginTop: 20 }}>

                                    <Row style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>

                                        {loading ?

                                            <Row style={{ justifyContent: "center", alignContent: "center" }}>
                                                <ProgressSpinner style={{ width: '25px', height: '25px' }} />
                                            </Row>
                                            :
                                            <>
                                                {customerAddressesList.length === 0 ? null : <p style={{ fontSize: FontSize.small, fontWeight: "bold" }}>Your saved Addresses</p>}

                                                {customerAddressesList.map((data, key) =>

                                                    <Col md style={{ fontSize: FontSize.small }} key={data._id} onClick={() => { handleCustomerAddressClicked(data._id) }}>
                                                        <div className={selectedCustomerAddressId === data._id ? "customerAddressSelected" : "customerAddress"}>
                                                            <span style={{ fontWeight: "bold" }}>{data.addType ? data.addType : ""}</span><br />
                                                            {data.addName ? data.addName : ""} <br />
                                                            {data.addLine1 ? data.addLine1 : ""} <br />
                                                            {data.cityID ? data.cityID.cityName : ""} <br />
                                                            {data.stateID ? data.stateID.stateName : ""} <br />
                                                            {data.pinCode ? data.pinCode : ""}
                                                        </div>
                                                    </Col>

                                                )}
                                                {customerAddressesList.length === 0 ? null :
                                                    <Col onClick={() => { clearAddressValues() }}>
                                                        <div className="customerAddressImage">
                                                            <Image src="../images/add.png" alt='gradient' height={50} />
                                                        </div>
                                                    </Col>
                                                }
                                            </>
                                        }

                                    </Row>

                                    <div>

                                        <Form.Group as={Row} className="mb-3 mt-4">
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
                                            <Col>
                                                <Form.Group className="mb-2" controlId="formGroupEmail">
                                                    <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Company Name</Form.Label>
                                                    <Form.Control
                                                        size="lg"
                                                        value={companyName}
                                                        onChange={e => { setCompanyName(e.target.value) }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-2" controlId="formGroupEmail">
                                                    <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Address Name<span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        size="lg"
                                                        value={addressName}
                                                        onChange={e => { setAddressName(e.target.value) }}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
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
                                                <Form.Group>
                                                    <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>State <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        className="rounded-3"
                                                        style={{ fontSize: 12 }}
                                                        value={stateValue}
                                                        onChange={e => { setStateValue(e.target.value); getCitiesDropdownList(e.target.value); setCityValue("- Select City -"); }}
                                                    >
                                                        <option value="- Select State -" id="- Select State -">- Select State -</option>
                                                        {states.map((data, key) => <option key={data._id} value={data._id}>{data.stateName}</option>)}
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
                                            {/* <Col>
                                                <Form.Group className="mb-2" controlId="formGroupEmail">
                                                    <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Country <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        size="lg"
                                                        placeholder="India"
                                                        disabled
                                                    />
                                                </Form.Group>
                                            </Col> */}
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
                                            <Form.Group className="mb-2" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Additional Information</Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    as="textarea"
                                                    rows={5}
                                                    placeholder="Notes about your order or any special notes for delivery"
                                                    value={additionalInformation}
                                                    onChange={e => { setAdditionalInformation(e.target.value) }}
                                                />
                                            </Form.Group>
                                        </Row>

                                    </div>

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
                                                    <strong>₹ {orderTotal.toFixed(2)}</strong>
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
                                                    checked
                                                    disabled
                                                    type="radio"
                                                    label="UPI/Cards/Net Banking/Wallet"
                                                    value="UPI/Cards/Net Banking/Wallet"
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
                            <Button variant="secondary" type="submit" size="md" style={{ backgroundColor: Colors.primaryViolet, fontWeight: "bold" }}> Place Order & Make Payment </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <Footer />

        </>
    )
}
