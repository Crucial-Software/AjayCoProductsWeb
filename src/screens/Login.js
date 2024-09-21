import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Form, Button, InputGroup } from 'react-bootstrap';
import TopHeader from '../components/TopHeader';
import { Colors } from '../common/ConstantStyles'
import { Link, useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Base64 } from 'js-base64';
import { loginUser } from '../components/api';

export default function Login() {

    const navigate = useNavigate();

    //const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const checkLoginData = async (event) => {
        event.preventDefault();

	if(mobile.length !== 10){
		setErrorMessage(<span style={{ color: "red" }}>Enter a valid 10 digit mobile number</span>);
            setTimeout(() => setErrorMessage(""), 3000);
	}
        else if (password.length < 6) {
            setErrorMessage(<span style={{ color: "red" }}>Password is too short</span>);
            setTimeout(() => setErrorMessage(""), 3000);
        } else {
            const encyPassword = Base64.encode(password);
            console.log("mobile: " + mobile + " password: " + password + " encyPassword: " + encyPassword)

            let toInput = {
                //email: email
                mobile: mobile,
                password: encyPassword
            };

            await loginUser(toInput)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }

                    console.log("loginUser Response: " + JSON.stringify(data));

                    const userInfo = data.data.user_data;

                    if (data.data) {
                        localStorage.setItem("userLoginId", userInfo._id);
                        localStorage.setItem("userName", userInfo.name);
                        localStorage.setItem("userMobile", userInfo.mobile);
                        localStorage.setItem("userEmail", userInfo.email);
                        localStorage.setItem("userRole", userInfo.role);

                        if(userInfo.role === "admin"){
                            navigate('/dashboard');
                        } else{
                            navigate('/home');
                        }

                    }
                })
                .catch(error => {
                    setErrorMessage(<span style={{ color: "red" }}>{error}</span>);
                    setTimeout(() => setErrorMessage(""), 3000);

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
                            <h3>Login</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 center-block ">
                        </div>
                        <div className="col-md-6 center-block ">
                            <div className="contact-wrap">
                                <Form onSubmit={checkLoginData}>

                                    <div style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>{errorMessage}</div>

                                    {/* <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label style={{ fontWeight: 'bold' }}>Email Id <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="email"
                                            placeholder="Enter your email id"
                                            value={email}
                                            onChange={e => { setEmail(e.target.value) }}
                                            required
                                        />
                                    </Form.Group> */}

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
                                    <div style={{ textAlign: 'end' }}>
                                        <Form.Text><Link to="/forgotpassword" style={{ textDecoration: 'none', color: Colors.darkGrey }}><span style={{ fontWeight: 'bold' }}>Forgot Password?</span></Link></Form.Text>
                                    </div>
                                    <div style={{ textAlign: 'center', marginTop: 30 }}>
                                        <Button
                                            variant="outline-secondary"
                                            type="submit"
                                            style={{ backgroundColor: Colors.primaryViolet, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.white, width: '100%', fontWeight: 'bold' }}>
                                            Login
                                        </Button>
                                    </div>
                                    <div style={{ textAlign: 'center', marginTop: 30 }}>
                                        <Form.Text id="passwordHelpBlock" muted> Not registered yet? <Link to="/register" style={{ textDecoration: 'none', color: Colors.darkGrey }}><span style={{ fontWeight: 'bold', padding: 10 }}>REGISTER</span></Link></Form.Text>
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
