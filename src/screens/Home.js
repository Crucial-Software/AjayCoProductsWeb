import React from 'react'
import NavBar from '../components/NavBar';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import { Container, Row, Col } from 'react-bootstrap';
import gradient from '../assets/images/gradient.png';
import TopHeader from '../components/TopHeader';
import CountUp from 'react-countup';
import AllProducts from '../components/AllProducts';
import { Colors } from '../common/ConstantStyles';

export default function Home() {

    return (
        <>
            <TopHeader />
            <NavBar />
            <Slider />

            <Container>
                <Row>
                    <div className="col-sm-8 offset-sm-2 mt-5 text-center colorlib-heading">
                        <h2>All Products</h2>
                    </div>
                </Row>
                <Row>
                    <AllProducts show={"all"} id={"0"} />
                </Row>
                <Row>
                    <div className="col-sm-8 mt-5 offset-sm-2 text-center colorlib-heading">
                        <h2>About AjayCo Products</h2>
                    </div>
                </Row>
                <Row>
                    <p style={{ padding: 20, textAlign: "center", marginBottom: 50,  color: Colors.darkGrey, }}>We have pleasure to introduce ourselves as AJAYCO PRODUCTS Established in year 1993 with focus in Embroidery frame industries (Wooden Embroidery Frame & Hoop) as the fast growing.
                        We are manufacturer all types of Wooden & Plastic Embroidery frames & Hoop in all shapes like ROUND, SQUARE, OVAL, TRIANGLE etc.
                        We at Ajayco Products having very young & talented staff having very sound experience in frame industries.
                        Since we are based in Khatipura, Jhunjhunu-Raj.
                        We can assure you prompt & efficient service and support give with minimum down time of the systems optimizing to your business run soothingly.
                        We are sure you will have look at our list of clients.</p>
                </Row>
            </Container>

            <div style={{ backgroundImage: `url(${gradient}`, padding: 50 }}>

                <Container>
                    <Row>
                        <Col md={3} style={{ textAlign: "center" }}>
                            <p className='countNumbers'><CountUp start={0} end={1993} duration={5} separator='' delay={1} /></p>
                            <p className="countText">Since in the Field</p>
                        </Col>
                        <Col md={3} style={{ textAlign: "center" }}>
                            <p className="countNumbers"><CountUp start={0} end={5000} duration={5} separator='' delay={1} /></p>
                            <p className="countText">+ Daily Product Capacity</p>
                        </Col>
                        <Col md={3} style={{ textAlign: "center" }}>
                            <p className="countNumbers"><CountUp start={0} end={20} duration={5} separator='' delay={1} /></p>
                            <p className="countText">Types of Products</p>
                        </Col>
                        <Col md={3} style={{ textAlign: "center" }}>
                            <p className="countNumbers"><CountUp start={0} end={100} duration={5} separator='' delay={1} /></p>
                            <p className="countText">+ Members in Team</p>
                        </Col>
                    </Row>
                </Container>

            </div>

            <Footer />
        </>
    );
}
