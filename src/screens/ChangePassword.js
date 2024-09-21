import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Form, Button, InputGroup } from 'react-bootstrap';
import TopHeader from '../components/TopHeader';
import { Colors } from '../common/ConstantStyles'
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Base64 } from 'js-base64';
import { updatePassword } from '../components/api';

export default function ChangePassword() {

    const mobile = localStorage.getItem("userMobile");

    const [currentPassword, setCurrentPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");

    const checkLoginData = async (event) => {
        event.preventDefault();

        if (currentPassword.length < 6) {
            setUpdateMessage(<span style={{ color: "red" }}>Current Password is too short</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
        }
        else if (newPassword.length < 6) {
            setUpdateMessage(<span style={{ color: "red" }}>New password is too short</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
        }
        else if (confirmPassword.length < 6) {
            setUpdateMessage(<span style={{ color: "red" }}>Confirm password is too short</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
        }
        else if (newPassword !== confirmPassword) {
            setUpdateMessage(<span style={{ color: "red" }}>Password did not matched</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
        }
        else {

            const encyCurrPassword = Base64.encode(currentPassword);
            const encyNewPassword = Base64.encode(newPassword);

            let toInput = {
                mobile: mobile,
                currentpassword: encyCurrPassword,
                newpassword: encyNewPassword
            };
            await updatePassword(toInput)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    if (response.ok) {
                        setUpdateMessage(<span style={{ color: Colors.green }}>{data.message}</span>);
                        setTimeout(() => setUpdateMessage(""), 3000);
                        clearData();
                    } else {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                    clearData();
                });
        }

    }

    const clearData = () => {
        setCurrentPassword("");
        setShowCurrentPassword(false);
        setNewPassword("");
        setShowNewPassword(false);
        setConfirmPassword("");
        setShowConfirmPassword("");
    }

    return (
        <>

            <TopHeader />

            <NavBar />

            <div id="colorlib-contact">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-md-12 center-block text-center">
                            <h3>Change Password</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 center-block ">
                        </div>
                        <div className="col-md-6 center-block ">
                            <div className="contact-wrap">
                                <Form onSubmit={checkLoginData}>

                                    <div style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>{updateMessage}</div>

                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Current Password <span style={{ color: "red" }}>*</span></Form.Label>
                                        <InputGroup size="lg">
                                            <Form.Control
                                                type={showCurrentPassword ? "text" : "password"}
                                                value={currentPassword}
                                                onChange={e => { setCurrentPassword(e.target.value) }}
                                                required />
                                            <InputGroup.Text size="sm" onClick={() => { setShowCurrentPassword(!showCurrentPassword); }}>
                                                {showCurrentPassword ? <EyeFill size={15} /> : <EyeSlashFill size={15} />}
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>New Password <span style={{ color: "red" }}>*</span></Form.Label>
                                        <InputGroup size="lg">
                                            <Form.Control
                                                type={showNewPassword ? "text" : "password"}
                                                value={newPassword}
                                                onChange={e => { setNewPassword(e.target.value) }}
                                                required />
                                            <InputGroup.Text size="sm" onClick={() => { setShowNewPassword(!showNewPassword); }}>
                                                {showNewPassword ? <EyeFill size={15} /> : <EyeSlashFill size={15} />}
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Confirm Password <span style={{ color: "red" }}>*</span></Form.Label>
                                        <InputGroup size="lg">
                                            <Form.Control
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
                                            Update Password
                                        </Button>
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