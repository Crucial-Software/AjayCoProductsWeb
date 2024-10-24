import React, { useState, useEffect, useRef } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Form, Button, Row, Col, Accordion, Image } from 'react-bootstrap';
import TopHeader from '../components/TopHeader';
import { Colors, FontSize } from '../common/ConstantStyles'
import { Toast } from 'primereact/toast';
import { createCustomerAddress, getAllCitiesByStateId, getAllStates, getCustomerAddresses, getUserById, updateCustomerAddress, updateUser } from '../components/api';
import { ProgressSpinner } from 'primereact/progressspinner';


export default function EditProfile() {

    const toast = useRef(null);

    const [profileLoading, setProfileLoading] = useState(false);
    const [addressLoading, setAddressLoading] = useState(false);

    const loginId = localStorage.getItem("userLoginId");
    const customerId = localStorage.getItem("customerId");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [gstNumber, setGstNumber] = useState();
    const [contactPerson, setContactPerson] = useState("");
    const [userStatus, setUserStatus] = useState("");

    const [addressName, setAddressName] = useState("");
    const [addressType, setAddressType] = useState("")
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [states, setStates] = useState([]);
    const [stateValue, setStateValue] = useState("- Select State -");
    const [cities, setCities] = useState([]);
    const [cityValue, setCityValue] = useState("- Select City -");
    const [addressStatus, setAddressStatus] = useState("");

    const [customerAddressesList, setCustomerAddressesList] = useState([]);
    const [selectedCustomerAddressId, setSelectedCustomerAddressId] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        fetchAllStates();
        fetchUserData(loginId);
        fetchCustomerAddresses(customerId);
    }, [loginId, customerId]);

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
        if (sid !== "- Select State -") {
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

    }

    const fetchUserData = async (uId) => {
        setProfileLoading(true);
        let toInput = {
            _id: uId
        };
        await getUserById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setProfileLoading(false);
                if (response.ok) {
                    setName(data.data.name);
                    setMobile(data.data.mobile);
                    setEmail(data.data.email);
                    setRole(data.data.role);
                    setUserStatus(data.data.status);
                } else {
                    toast.current.show({ life: 3000, severity: 'error', summary: 'Error in loading customer addresses' });
                }
            })
            .catch(error => {
                setProfileLoading(false);
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
    }

    const fetchCustomerAddresses = async (cId) => {
        setAddressLoading(true);
        let toInput = {
            //customerID: "66ec04c6ad238bb7385160d0"
            customerID: cId
        };
        await getCustomerAddresses(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setAddressLoading(false);
                if (response.ok) {
                    setCustomerAddressesList(data.data);
                } else {
                    toast.current.show({ life: 3000, severity: 'error', summary: 'Error in loading customer addresses' });
                }
            })
            .catch(error => {
                setAddressLoading(false);
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
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
        setAddressStatus(cAdd.status);
        setStateValue(cAdd.stateID._id);
        if(cAdd.stateID._id){
            getCitiesDropdownList(cAdd.stateID._id);
        }
        if (cities && cities.length !== 0) {
            setCityValue(cAdd.cityID._id);
        }
    }

    const checkMyProfileData = async (event) => {
        event.preventDefault();

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // eslint-disable-line
        let gstReg = /^([0-9]){2}([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}([0-9]{1})([A-Za-z]){2}?$/;  // eslint-disable-line

        if (mobile.length !== 10) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Enter a valid 10 digit mobile number" });
        }
        else if (reg.test(email) === false) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Enter a valid email id" });
        }
        else if (gstNumber && gstReg.test(gstNumber)) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Enter a valid gst number" });
        }
        else {

            setProfileLoading(true);

            let toInput = {
                _id: loginId,
                name: name,
                email: email,
                mobile: mobile,
                role: role,
                status: userStatus,
            };

            await updateUser(toInput)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    setProfileLoading(false);
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        toast.current.show({ life: 3000, severity: 'error', summary: error });
                    } else {
                        toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                        fetchUserData(loginId);
                    }
                    if (response.status === 422) {
                        toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                    }
                })
                .catch(error => {
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                    setProfileLoading(false);
                });
        }

    }

    const checkMyAddressesData = async (event) => {
        event.preventDefault();

        if (addressType === "") {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Please select address type' });
        }
        else if (pincode.length !== 6) {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Enter a valid 6 digit pincode' });
        }
        else if (stateValue === "" || stateValue === "- Select State -" || stateValue === null) {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Please select state' });
        }
        else if (cityValue === "" || cityValue === "- Select City -" || cityValue === null) {
            toast.current.show({ life: 3000, severity: 'error', summary: 'Please select city' });
        }
        else {
            if (selectedCustomerAddressId === null) {
                setAddressLoading(true);
                let toInput = {
                    addType: addressType,
                    addName: addressName,
                    pinCode: pincode,
                    addLine1: address,
                    stateID: stateValue,
                    cityID: cityValue,
                    customerID: customerId,
                    createdByid: loginId
                };
                await createCustomerAddress(toInput)
                    .then(async response => {
                        const isJson = response.headers.get('content-type')?.includes('application/json');
                        const data = isJson && await response.json();
                        setAddressLoading(false);
                        if (response.ok) {
                            toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                            fetchCustomerAddresses(customerId);
                            clearAddressValues();
                        } else {
                            const error = (data && data.message) || response.status;
                            toast.current.show({ life: 3000, severity: 'error', summary: error });
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        setAddressLoading(false);
                        toast.current.show({ life: 3000, severity: 'error', summary: error });
                    });
            } else {
                setAddressLoading(true);
                let toInput = {
                    addType: addressType,
                    addName: addressName,
                    pinCode: pincode,
                    addLine1: address,
                    stateID: stateValue,
                    cityID: cityValue,
                    customerID: customerId,
                    updatedByid: loginId,
                    _id: selectedCustomerAddressId,
                    status: addressStatus
                };
                await updateCustomerAddress(toInput)
                    .then(async response => {
                        const isJson = response.headers.get('content-type')?.includes('application/json');
                        const data = isJson && await response.json();
                        setAddressLoading(false);
                        if (response.ok) {
                            toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                            fetchCustomerAddresses(customerId);
                            clearAddressValues();
                        } else {
                            const error = (data && data.message) || response.status;
                            toast.current.show({ life: 3000, severity: 'error', summary: error });
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        setAddressLoading(false);
                        toast.current.show({ life: 3000, severity: 'error', summary: error });
                    });
            }
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
        setAddressStatus("");
    }

    return (
        <>

            <TopHeader />

            <NavBar />

            <div id="colorlib-contact">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-md-12 center-block text-center">
                            <h3>Edit Profile</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 center-block ">
                        </div>
                        <div className="col-md-8 center-block ">
                            <div className="contact-wrap">
                                <Toast ref={toast} position="top-center" />
                                <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>My Profile</Accordion.Header>
                                        <Accordion.Body>
                                            <Form onSubmit={checkMyProfileData}>

                                                {profileLoading ?

                                                    <Row style={{ justifyContent: "center", alignContent: "center" }}>
                                                        <ProgressSpinner style={{ width: '25px', height: '25px' }} />
                                                    </Row>
                                                    :
                                                    <>
                                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                                            <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Billing Name <span style={{ color: "red" }}>*</span></Form.Label>
                                                            <Form.Control
                                                                size="lg"
                                                                placeholder="Enter your billing name"
                                                                value={name}
                                                                onChange={e => { setName(e.target.value) }}
                                                                required
                                                            />
                                                        </Form.Group>
                                                        <Row>
                                                            <Col md>
                                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                    <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Mobile <span style={{ color: "red" }}>*</span></Form.Label>
                                                                    <Form.Control
                                                                        size="lg"
                                                                        type="tel"
                                                                        maxLength="10"
                                                                        placeholder="Enter your mobile"
                                                                        value={mobile}
                                                                        onChange={e => { setMobile(e.target.value.replace(/\D/g, "")) }}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md>
                                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                    <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Email Id <span style={{ color: "red" }}>*</span></Form.Label>
                                                                    <Form.Control
                                                                        size="lg"
                                                                        type="email"
                                                                        placeholder="Enter your email id"
                                                                        value={email}
                                                                        onChange={e => { setEmail(e.target.value) }}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        {role === "dealer" ?
                                                            <Row>
                                                                <Col md>
                                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                        <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Contact Person</Form.Label>
                                                                        <Form.Control
                                                                            size="lg"
                                                                            placeholder="Enter contact person name"
                                                                            value={contactPerson}
                                                                            onChange={e => { setContactPerson(e.target.value) }}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md>
                                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                        <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>GST Number</Form.Label>
                                                                        <Form.Control
                                                                            size="lg"
                                                                            placeholder="Enter your gst number"
                                                                            value={gstNumber}
                                                                            onChange={e => { setGstNumber(e.target.value) }}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            : null
                                                        }

                                                        <div style={{ textAlign: 'center', marginTop: 30 }}>
                                                            <Button
                                                                variant="outline-secondary"
                                                                type="submit"
                                                                style={{ backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.primaryViolet, fontWeight: 'bold' }}>
                                                                Update Profile
                                                            </Button>
                                                        </div>
                                                    </>
                                                }

                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>My Addresses</Accordion.Header>
                                        <Accordion.Body>
                                            <Form onSubmit={checkMyAddressesData}>

                                                {addressLoading ?


                                                    <Row style={{ justifyContent: "center", alignContent: "center" }}>
                                                        <ProgressSpinner style={{ width: '25px', height: '25px' }} />
                                                    </Row>
                                                    :
                                                    <>

                                                        <Row style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                                            <>
                                                                {customerAddressesList.length === 0 ? null : <p style={{ fontSize: FontSize.small, fontWeight: "bold" }}>Your saved Addresses</p>}

                                                                {customerAddressesList.map((data, key) =>

                                                                    <Col md style={{ fontSize: FontSize.small, justifyContent: "center" }} key={data._id} onClick={() => { handleCustomerAddressClicked(data._id) }}>
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
                                                                    <Col onClick={() => { clearAddressValues() }} style={{ justifyContent: "center", textAlign: "center" }}>
                                                                        <div className="customerAddressImage">
                                                                            <Image src="../images/add.png" alt='gradient' height={50} />
                                                                        </div>

                                                                        <p style={{ fontSize: FontSize.small, color: Colors.darkGrey, fontWeight: 400 }}> Add New Address</p>
                                                                    </Col>
                                                                }

                                                            </>
                                                        </Row>

                                                        <Form.Group as={Row} className="mt-4" style={{ justifyContent: "center", alignItems: "center" }}>
                                                            <Col md>
                                                                <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                                                    <Col md style={{ fontSize: 14 }}>
                                                                        <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Address Type<span style={{ color: "red" }}>*</span></Form.Label>
                                                                        <Row>
                                                                            <Col>
                                                                                <Form.Check
                                                                                    type="radio"
                                                                                    label="Residence Address"
                                                                                    value="Residence Address"
                                                                                    name="AddressType"
                                                                                    onChange={e => setAddressType(e.target.value)}
                                                                                    checked={addressType === "Residence Address"}
                                                                                />
                                                                            </Col>
                                                                            <Col>
                                                                                <Form.Check
                                                                                    type="radio"
                                                                                    label="Company Address"
                                                                                    value="Company Address"
                                                                                    name="AddressType"
                                                                                    onChange={e => setAddressType(e.target.value)}
                                                                                    checked={addressType === "Company Address"}
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col md>
                                                                <Form.Group controlId="formGroupEmail">
                                                                    <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Address Name<span style={{ color: "red" }}>*</span></Form.Label>
                                                                    <Form.Control
                                                                        size="lg"
                                                                        value={addressName}
                                                                        onChange={e => { setAddressName(e.target.value) }}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Form.Group>

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
                                                                        className="form-select form-select-override"
                                                                        style={{ fontSize: 12 }}
                                                                        value={stateValue}
                                                                        onChange={e => {
                                                                            setStateValue(e.target.value);
                                                                            getCitiesDropdownList(e.target.value);
                                                                            setCityValue("- Select City -");
                                                                        }}
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
                                                                        className="form-select form-select-override"
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
                                                        </Row>
                                                        {selectedCustomerAddressId !== null ?
                                                            <div style={{ textAlign: 'center', marginTop: 30 }}>
                                                                <Button
                                                                    variant="outline-secondary"
                                                                    type="submit"
                                                                    style={{ backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.primaryViolet, fontWeight: 'bold' }}>
                                                                    Update Address
                                                                </Button>
                                                            </div>
                                                            :
                                                            <div style={{ textAlign: 'center', marginTop: 30 }}>
                                                                <Button
                                                                    variant="outline-secondary"
                                                                    type="submit"
                                                                    style={{ backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.primaryViolet, fontWeight: 'bold' }}>
                                                                    Create Address
                                                                </Button>
                                                            </div>
                                                        }

                                                    </>
                                                }

                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>


                            </div>
                        </div>
                        <div className="col-md-2 center-block ">
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}