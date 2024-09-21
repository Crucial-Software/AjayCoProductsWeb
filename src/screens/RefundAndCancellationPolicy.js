import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import './Screens.css';
import { Colors } from '../common/ConstantStyles'

export default function RefundAndCancellationPolicy() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [])

    return (
        <>

            <TopHeader />
            <NavBar  />
            <Container>

                <Row>
                    <div className="col-sm-8 offset-sm-2 text-center colorlib-heading">
                        <h3>Refund & Cancellation Policy</h3>
                    </div>
                </Row>

                <Row style={{ padding: 10 }}>

                    <Col>

                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Our focus is complete customer satisfaction. In the event, if you are displeased with the services provided, we will refund back the money, provided the reasons are genuine and proved after investigation. Please read the fine prints of each deal before buying it, it provides all the details about the services or the product you purchase.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>In case of dissatisfaction from our services, clients have the liberty to cancel their projects and request a refund from us. Our Policy for the cancellation and refund will be as follows:</p>

                        <h6>Cancellation Policy</h6>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>For Cancellations please contact the us via contact us link.<br/>
                        Requests received later than 7 business days prior to the end of the current service period will be treated as cancellation of services for the next service period.</p>

                        <h6>Refund Policy</h6>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>We will try our best to create the suitable design concepts for our clients.<br/>
                        In case any client is not completely satisfied with our products we can provide a refund.<br/>
                        If paid by credit card, refunds will be issued to the original credit card provided at the time of purchase and in case of payment gateway name payments refund will be made to the same account.</p>

                    </Col>
                </Row>

            </Container>

            <Footer />

        </>
    )
}
