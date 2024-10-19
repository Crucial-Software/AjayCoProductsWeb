import React, { useState, useRef } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Form, Button, InputGroup } from 'react-bootstrap';
import TopHeader from '../components/TopHeader';
import { Colors } from '../common/ConstantStyles'
import { Link, useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Base64 } from 'js-base64';
import { registerUser } from '../components/api';
import { Toast } from 'primereact/toast';

export default function Register() {

    const navigate = useNavigate();
    const toast = useRef(null);

    const [customerType, setCustomerType] = useState("Individual");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [gstNumber, setGstNumber] = useState(null);
    const [contactPerson, setContactPerson] = useState("");

    const checkRegisterData = async (event) => {
        event.preventDefault();

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // eslint-disable-line
        let gstReg = /^([0-9]){2}([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}([0-9]{1})([A-Za-z]){2}?$/;  // eslint-disable-line

        if (mobile.length !== 10) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Enter a valid 10 digit mobile number" });
        }
        else if (reg.test(email) === false) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Enter a valid email id" });
        }
        else if (password.length < 6) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Password is too short" });
        }
        else if (confirmPassword.length < 6) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Confirm Password is too short" });
        }
        else if (password !== confirmPassword) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Password did not matched" });
        }
        else if (gstNumber && gstReg.test(gstNumber)) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Enter a valid gst number" });
        }
        else {

            const encyPassword = Base64.encode(password);

            let toInput = {
                customerType: customerType,
                name: name,
                email: email,
                mobile: mobile,
                password: encyPassword,
                contactPerson: contactPerson,
                GSTNo: gstNumber
            };

            await registerUser(toInput)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }

                    console.log("registerUser Response: " + JSON.stringify(data));

                    // const userInfo = data.data[0];

                    if (data.data) {
                        navigate('/login');
                    }
                })
                .catch(error => {
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                });
        }
    }

    return (
        <>

            <TopHeader />

            <NavBar />

            <div id="colorlib-contact">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-md-12 center-block text-center">
                            <h3>Register</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 center-block ">
                        </div>
                        <div className="col-md-6 center-block ">
                            <div className="contact-wrap">
                                <Toast ref={toast} position="top-center" />
                                <Form onSubmit={checkRegisterData}>

                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label style={{ fontWeight: 'bold', marginRight: 20, color: Colors.darkGrey, fontSize: 14, }}>Customer Type <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Individual"
                                            style={{ color: Colors.darkGrey, fontSize: 14, }}
                                            name="Items"
                                            value="Individual"
                                            onChange={e => setCustomerType(e.target.value)}
                                            checked={customerType === "Individual"}
                                        />

                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Business"
                                            style={{ color: Colors.darkGrey, fontSize: 14 }}
                                            name="Items"
                                            value="Business"
                                            onChange={e => setCustomerType(e.target.value)}
                                            checked={customerType === "Business"}
                                        />
                                    </Form.Group>

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

                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Password <span style={{ color: "red" }}>*</span></Form.Label>
                                        <InputGroup size="lg">
                                            <Form.Control
                                                size="lg"
                                                placeholder="Enter your password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={e => { setPassword(e.target.value) }}
                                                required />
                                            <InputGroup.Text size="sm" onClick={() => { setShowPassword(!showPassword); }}>
                                                {showPassword ? <EyeFill size={15} /> : <EyeSlashFill size={15} />}
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Confirm Password <span style={{ color: "red" }}>*</span></Form.Label>
                                        <InputGroup size="lg">
                                            <Form.Control
                                                size="lg"
                                                placeholder="Re-enter your password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={e => { setConfirmPassword(e.target.value) }}
                                                required />
                                            <InputGroup.Text size="sm" onClick={() => { setShowConfirmPassword(!showConfirmPassword); }}>
                                                {showConfirmPassword ? <EyeFill size={15} /> : <EyeSlashFill size={15} />}
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    {customerType === "Business" ?
                                        <div>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Contact Person</Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    placeholder="Enter contact person name"
                                                    value={contactPerson}
                                                    onChange={e => { setContactPerson(e.target.value) }}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>GST Number</Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    placeholder="Enter your gst number"
                                                    value={gstNumber}
                                                    onChange={e => { setGstNumber(e.target.value) }}
                                                />
                                            </Form.Group>
                                        </div>
                                        :
                                        <div></div>
                                    }

                                    <div style={{ textAlign: 'center', marginTop: 30 }}>
                                        <Button
                                            variant="outline-secondary"
                                            type="submit"
                                            style={{ backgroundColor: Colors.primaryViolet, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.white, width: '100%', fontWeight: 'bold' }}>
                                            Register
                                        </Button>
                                    </div>
                                    <div style={{ textAlign: 'center', marginTop: 30 }}>
                                        <Form.Text id="passwordHelpBlock" muted> Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: Colors.darkGrey }}><span style={{ fontWeight: 'bold', padding: 10 }}>LOGIN</span></Link></Form.Text>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="col-md-3 center-block ">
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}

