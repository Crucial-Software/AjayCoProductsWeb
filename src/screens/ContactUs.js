import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Colors } from '../common/ConstantStyles'
import TopHeader from '../components/TopHeader'
import { Form, Button } from 'react-bootstrap';
import { contactUs } from '../components/api'

export default function ContactUs() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const checkContactUsData = async (event) => {
        event.preventDefault();

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // eslint-disable-line

        if (mobile.length !== 10) {
            setErrorMessage(<span style={{ color: "red" }}>Enter a valid 10 digit mobile number</span>);
            setTimeout(() => setErrorMessage(""), 3000);
        }
        else if (reg.test(email) === false) {
            setErrorMessage(<span style={{ color: "red" }}>Enter a valid email id</span>);
            setTimeout(() => setErrorMessage(""), 3000);
        }
        else {
            let toInput = {
                name: name,
                email: email,
                mobile: mobile,
                subject: subject,
                message: message
            };

            await contactUs(toInput)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        setErrorMessage(<span style={{ color: "red" }}>{data.message}</span>);
                        setTimeout(() => setErrorMessage(""), 3000);
                        clearValues();
                    }
                })
                .catch(error => {
                    setErrorMessage(<span style={{ color: "red" }}>{error}</span>);
                    setTimeout(() => setErrorMessage(""), 3000);
                });
        }
    }

    const clearValues = () => {
        setName("");
        setMobile("");
        setEmail("");
        setSubject("");
        setMessage("");
    }

    return (
        <>

            <TopHeader />

            <NavBar />

            <div id="colorlib-contact">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Contact Information</h3>
                            <div className="row">
                                <div className="col-md mb-5">
                                    <i className="icon-location" style={{ fontSize: 14, color: Colors.primaryPink }} />&nbsp;&nbsp; <span style={{ color: Colors.darkGrey, fontSize: 14 }}>Factory No. 47, Khatipura, Dist., Jhunjhnu, Rajasthan, India 332746 </span><br />
                                    <i className="icon-phone3" style={{ fontSize: 14, color: Colors.primaryPink }} />&nbsp;&nbsp;<span style={{ color: Colors.darkGrey, fontSize: 14 }}>+91-8460475051</span> <br />
                                    <i className="icon-paperplane" style={{ fontSize: 14, color: Colors.primaryPink }} />&nbsp;&nbsp;<span style={{ color: Colors.darkGrey, fontSize: 14 }}>info@ajaycoproducts.com </span><br />
                                    <i className="icon-globe" style={{ fontSize: 14, color: Colors.primaryPink }} />&nbsp;&nbsp;<span style={{ color: Colors.darkGrey, fontSize: 14 }}>ajaycoproducts.com </span><br />
                                </div>
                            </div>
                            <div className="videoWrapper">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78294.05392562145!2d75.90328114030754!3d28.0548051025162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3912cff2f894cd75%3A0xc45366ccbc81b11e!2sAjayco%20Products!5e0!3m2!1sen!2sin!4v1704345585801!5m2!1sen!2sin"
                                    className="embed-responsive-item"
                                    title='AjaycoProductsLocation'
                                    allowFullScreen
                                    loading="lazy"
                                    frameBorder="0"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-2">
                            <div className="contact-wrap">
                                <h3>Get In Touch</h3>
                                <Form onSubmit={checkContactUsData}>
                                    <div style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>{errorMessage}</div>
                                    <div className="row">

                                        <div className="col-md-12">
                                            <Form.Group className="mb-2" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Full Name <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    value={name}
                                                    onChange={e => { setName(e.target.value) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-sm-12">
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
                                        </div>

                                        <div className="col-sm-12">
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
                                        </div>

                                        <div className="col-sm-12">
                                            <Form.Group className="mb-2" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Subject <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    type="text"
                                                    value={subject}
                                                    onChange={e => { setSubject(e.target.value) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-sm-12">
                                            <Form.Group className="mb-2" controlId="formGroupEmail">
                                                <Form.Label style={{ fontWeight: 'bold', color: Colors.darkGrey, fontSize: 14 }}>Message <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control
                                                    size="lg"
                                                    as="textarea"
                                                    rows={5}
                                                    value={message}
                                                    onChange={e => { setMessage(e.target.value) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-sm-12 mt-2">
                                            <div className="form-group">
                                                <Button variant="secondary" type="submit" size="md" style={{ backgroundColor: Colors.primaryViolet, fontWeight: "bold", borderColor: Colors.primaryViolet }}> Send Message </Button>
                                            </div>
                                        </div>

                                    </div>
                                </Form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <Footer />

        </>
    )
}
