import React from 'react';
import { Colors } from '../common/ConstantStyles';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CommonStyle.css';

export default function Footer() {
    return (
        <div>
            <footer id="colorlib-footer" role="contentinfo">
                <Container>
                    <Row>
                        <Col md>
                            <h4>About AjayCo Products</h4>
                            <ul className="colorlib-footer-links">
                            <li style={{ textDecoration: 'none', color: Colors.darkGrey}}>Specialist in the Frame and Hoop manufacturing. India based manufacturing company with best quality products.</li>
                            </ul>
                            <ul className="colorlib-social-icons">
                                <li><Link to="/categories" style={{ textDecoration: 'none', color: Colors.darkGrey }}><i className="icon-facebook" style={{paddingRight: 10}}></i></Link></li>
                                <li><Link to="/categories" style={{ textDecoration: 'none', color: Colors.darkGrey }}><i className="icon-instagram" ></i></Link></li>
                            </ul>
                        </Col>
                        <Col md>
                            <h4>Shop</h4>
                            <ul className="colorlib-footer-links">
                                <li><Link to="/categories" style={{ textDecoration: 'none', color: Colors.darkGrey}}>All Products</Link></li>
                                <li><Link to="/categories" style={{ textDecoration: 'none', color: Colors.darkGrey}}>Round Hoops</Link></li>
                                <li><Link to="/categories" style={{ textDecoration: 'none', color: Colors.darkGrey}}>Square Hoops</Link></li>
                                <li><Link to="/categories" style={{ textDecoration: 'none', color: Colors.darkGrey}}>Triangle Hoops</Link></li>
                                <li><Link to="/categories" style={{ textDecoration: 'none', color: Colors.darkGrey}}>Shop By Category</Link></li>
                            </ul>
                        </Col>
                        <Col md>
                            <h4>Information</h4>
                            <ul className="colorlib-footer-links">
                                <li><Link to="/aboutus" style={{ textDecoration: 'none', color: Colors.darkGrey}}>About Us</Link></li>
                                <li><Link to="/privacypolicy" style={{ textDecoration: 'none', color: Colors.darkGrey}}>Privacy Policy</Link></li>
                                <li><Link to="/termsandconditions" style={{ textDecoration: 'none', color: Colors.darkGrey}}>Terms & Conditions</Link></li>
                                <li><Link to="/refundandcancellationpolicy" style={{ textDecoration: 'none', color: Colors.darkGrey}}>Refund & Cancellation Policy</Link></li>
                            </ul>
                        </Col>
                        <Col md>
                            <h4>Contact Details</h4>
                            <ul className="colorlib-footer-links">
                                <li style={{ textDecoration: 'none', color: Colors.darkGrey}}><i className="icon-location" style={{ fontSize: 12, color: Colors.primaryPink }} /> Factory No. 47,<br /> &nbsp; &nbsp; &nbsp; Khatipura, Dist.,<br /> &nbsp; &nbsp; &nbsp; Jhunjhnu, Rajasthan,<br /> &nbsp; &nbsp; &nbsp; India - 332746</li>
                                <li style={{ textDecoration: 'none', color: Colors.darkGrey}}><i className="icon-phone3" style={{ fontSize: 12, color: Colors.primaryPink }} /> +91-8460475051</li>
                                <li style={{ textDecoration: 'none', color: Colors.darkGrey}}><i className="icon-paperplane" style={{ fontSize: 12, color: Colors.primaryPink }} /> info@ajaycoproducts.com</li>
                                <li style={{ textDecoration: 'none', color: Colors.darkGrey}}><i className="icon-globe" style={{ fontSize: 12, color: Colors.primaryPink }} /> ajaycoproducts.com</li>
                            </ul>
                        </Col>
                    </Row>

                </Container>
                <hr />
                <div className="col-sm-12 text-center">
                    <p>
                        <span style={{ textDecoration: 'none', color: Colors.darkGrey, fontSize: 14}}>Copyright &copy;
                            <script>document.write(new Date().getFullYear());</script>
                            All rights reserved by
                            <Link to="/home" style={{ textDecoration: 'none', color: Colors.darkGrey }} >
                                <span style={{ fontWeight: 'bold', paddingLeft: 5 }}>
                                    AjayCo Products
                                </span>
                            </Link>
                        </span>
                    </p>
                </div>
            </footer>
        </div>
    )
}
