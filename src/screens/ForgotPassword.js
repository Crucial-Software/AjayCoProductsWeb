import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Form, Button, InputGroup } from 'react-bootstrap';
import TopHeader from '../components/TopHeader';
import { Colors } from '../common/ConstantStyles'
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Base64 } from 'js-base64';
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [mobileScreen, setMobileScreen] = useState(true);
    const [otpScreen, setOtpScreen] = useState(false);
    const [passwordResetScreen, setPasswordResetScreen] = useState(false);

    const checkMobileData = (event) => {
        event.preventDefault();

        if (mobile && mobile.length === 10) {
            setMobileScreen(false);
            setOtpScreen(true);
            setPasswordResetScreen(false);
        } else {
            setErrorMessage(<span style={{ color: "red" }}>Enter a valid 10 digit mobile number</span>);
            setTimeout(() => setErrorMessage(""), 3000);
        }

    }

    const checkOtpData = (event) => {
        event.preventDefault();

        if (otp.length < 4) {
            setErrorMessage(<span style={{ color: "red" }}>Enter a valid 4 digit otp</span>);
            setTimeout(() => setErrorMessage(""), 3000);
        } else {
            setMobileScreen(false);
            setOtpScreen(false);
            setPasswordResetScreen(true);
        }
    }

    const checkPasswordResetData = (event) => {
        event.preventDefault();

        if (password.length < 6) {
            setErrorMessage(<span style={{ color: "red" }}>Password is too short</span>);
            setTimeout(() => setErrorMessage(""), 3000);
        } else if (confirmPassword.length < 6) {
            setErrorMessage(<span style={{ color: "red" }}>Confirm Password is too short</span>);
            setTimeout(() => setErrorMessage(""), 3000);
        } else if (password !== confirmPassword) {
            setErrorMessage(<span style={{ color: "red" }}>Password did not matched</span>);
            setTimeout(() => setErrorMessage(""), 3000);
        }
        else {
            setMobileScreen(false);
            setOtpScreen(false);
            setPasswordResetScreen(false);
            const encyPassword = Base64.encode(password);
            console.log("mobile: " + mobile + " password: " + password + " encyPassword: " + encyPassword)
            navigate("/login");
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
                            <h3>Forgot Password</h3>
                        </div>
                    </div>
                    {mobileScreen ?
                        <div className="row">
                            <div className="col-md-3 center-block ">
                            </div>
                            <div className="col-md-6 center-block ">
                                <div className="contact-wrap">
                                    <Form onSubmit={checkMobileData}>

                                        <div style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>{errorMessage}</div>

                                        <Form.Group className="mb-3" controlId="formGroupMobile">
                                            <Form.Label style={{ fontWeight: 'bold' }}>Mobile <span style={{ color: "red" }}>*</span></Form.Label>
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

                                        <div style={{ textAlign: 'center', marginTop: 30 }}>
                                            <Button
                                                variant="outline-secondary"
                                                type="submit"
                                                style={{ backgroundColor: Colors.primaryViolet, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.white, width: '100%', fontWeight: 'bold' }}>
                                                Send Otp
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className="col-md-3 center-block ">
                            </div>
                        </div>
                        : null
                    }
                    {otpScreen ?
                        <div className="row">
                            <div className="col-md-3 center-block ">
                            </div>
                            <div className="col-md-6 center-block ">
                                <div className="contact-wrap">
                                    <Form onSubmit={checkOtpData}>

                                        <div style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>{errorMessage}</div>

                                        <Form.Group className="mb-3" controlId="formGroupOtp">
                                            <Form.Label style={{ fontWeight: 'bold' }}>Otp <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control
                                                size="lg"
                                                type="tel"
                                                maxLength="4"
                                                placeholder="Enter otp recieved in your registered mobile"
                                                value={otp}
                                                onChange={e => { setOtp(e.target.value.replace(/\D/g, "")) }}
                                                required
                                            />
                                        </Form.Group>

                                        <div style={{ textAlign: 'center', marginTop: 30 }}>
                                            <Button
                                                variant="outline-secondary"
                                                type="submit"
                                                style={{ backgroundColor: Colors.primaryViolet, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.white, width: '100%', fontWeight: 'bold' }}>
                                                Verify Otp
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className="col-md-3 center-block ">
                            </div>
                        </div>
                        : null
                    }
                    {passwordResetScreen ?
                        <div className="row">
                            <div className="col-md-3 center-block ">
                            </div>
                            <div className="col-md-6 center-block ">
                                <div className="contact-wrap">
                                    <Form onSubmit={checkPasswordResetData}>

                                        <div style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>{errorMessage}</div>

                                        <Form.Group className="mb-3" controlId="formGroupPassword">
                                            <Form.Label style={{ fontWeight: 'bold' }}>New Password <span style={{ color: "red" }}>*</span></Form.Label>
                                            <InputGroup size="lg">
                                                <Form.Control
                                                    size="lg"
                                                    placeholder="Enter your new password"
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
                                            <Form.Label style={{ fontWeight: 'bold' }}>Confirm Password <span style={{ color: "red" }}>*</span></Form.Label>
                                            <InputGroup size="lg">
                                                <Form.Control
                                                    size="lg"
                                                    placeholder="Re-enter your new password"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={e => { setConfirmPassword(e.target.value) }}
                                                    required />
                                                <InputGroup.Text size="sm" onClick={() => { setShowConfirmPassword(!showConfirmPassword); }}>
                                                    {showConfirmPassword ? <EyeFill size={15} /> : <EyeSlashFill size={15} />}
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>

                                        <div style={{ textAlign: 'center', marginTop: 30 }}>
                                            <Button
                                                variant="outline-secondary"
                                                type="submit"
                                                style={{ backgroundColor: Colors.primaryViolet, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.white, width: '100%', fontWeight: 'bold' }}>
                                                Reset Password
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className="col-md-3 center-block ">
                            </div>
                        </div>
                        : null
                    }

                </div>
            </div>

            <Footer />

        </>
    )
}

