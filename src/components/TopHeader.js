import React from 'react';
import gradient from '../assets/images/gradient.png';
import { Colors } from '../common/ConstantStyles';
import { Container, Row, Col } from 'react-bootstrap';

export default function TopHeader() {
    return (
        <div style={{ backgroundImage: `url(${gradient}` }}>
            <Container>
                <Row>
                    <Col md={4} style={{ justifyContent: "center", textAlign: "center" }}>
                        <i className="icon-location" style={{ fontSize: 12, color: Colors.golden, marginTop: 5 }} />
                        <span style={{ fontSize: 12, color: Colors.white }}> &nbsp; Jhunjhnu, Rajasthan, India </span>
                    </Col>
                    <Col md={4} style={{ justifyContent: "center", textAlign: "center" }}>
                        <i className="icon-phone3" style={{ fontSize: 12, color: Colors.golden, marginTop: 5 }} />
                        <span style={{ fontSize: 12, color: Colors.white }}> &nbsp; +91-8460475051</span>
                    </Col>
                    <Col md={4} style={{ justifyContent: "center", textAlign: "center" }}>
                        <i className="icon-paperplane" style={{ fontSize: 12, color: Colors.golden, marginTop: 5 }} />
                        <span style={{ fontSize: 12, color: Colors.white }}> &nbsp; info@ajaycoproducts.com</span>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}