import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Button, InputGroup, Spinner } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { updatePassword } from "../../components/api";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

const ChangeAdminPassword = () => {

    const mobile = localStorage.getItem("userMobile");

    const [currentPassword, setCurrentPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangePasswordFormSubmit = async (event) => {
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

            setLoading(true);

            let toInput = {
                mobile: mobile,
                currentpassword: currentPassword,
                newpassword: newPassword
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
                    setLoading(false);
                })
                .catch(error => {
                    setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                    setLoading(false);
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

        <div className="main" >

            <Sidebar />

            <div className="page-content">

                <Header />

                <h5>Change Password</h5>

                <div style={{ fontSize: FontSize.smallMedium, fontWeight: "bold", marginBottom: 10, paddingLeft: 20 }}>{updateMessage}</div>

                <div className="table-content">

                    <Form onSubmit={onChangePasswordFormSubmit} >

                        <Row style={{ fontSize: FontSize.smallMedium }}>

                            <Col sm={3}>

                                <Form.Group className="mb-3" controlId="formChangeCurrentPassword">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Current Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={e => { setCurrentPassword(e.target.value) }}
                                            required />
                                        <InputGroup.Text onClick={() => { setShowCurrentPassword(!showCurrentPassword); }}>
                                            {showCurrentPassword ? <EyeFill size={15} /> : <EyeSlashFill size={15} />}
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formChangeNewPassword">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />New Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={e => { setNewPassword(e.target.value) }}
                                            required />
                                        <InputGroup.Text onClick={() => { setShowNewPassword(!showNewPassword); }}>
                                            {showNewPassword ? <EyeFill size={15} /> : <EyeSlashFill size={15} />}
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formChangeConfirmPassword">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Confirm New Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={e => { setConfirmPassword(e.target.value) }}
                                            required />
                                        <InputGroup.Text onClick={() => { setShowConfirmPassword(!showConfirmPassword); }}>
                                            {showConfirmPassword ? <EyeFill size={15} /> : <EyeSlashFill size={15} />}
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formChangePassword">
                                    <Button variant="primary" type="submit" style={{ marginTop: 25, fontSize: FontSize.smallMedium, backgroundColor: Colors.darkBlue, borderColor: Colors.darkBlue }}> Update </Button>
                                    {loading ? <Spinner animation="border" variant="primary" size="sm" style={{ marginLeft: 20 }} /> : null}
                                </Form.Group>
                            </Col>

                        </Row>

                    </Form>

                </div>

            </div>

        </div>

    );
};

export default ChangeAdminPassword;