import React, { useEffect, useState } from 'react'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Image, Row, Col, Carousel } from 'react-bootstrap'
import './Screens.css';
import { useLocation } from 'react-router-dom';
import { Colors } from '../common/ConstantStyles'

export default function ViewAttachment() {

    let { state } = useLocation();
    const file = state.file;

    const [myArray, setMyArray] = useState([]);

    useEffect(() => {

        if (file) {
            setMyArray(file);
        }

    }, [file])

    return (
        <>

            <TopHeader />

            <NavBar  />

            <Row>
                <Col className="justify-content-md-center" lg>
                    <Carousel
                        interval={2000}
                        nextLabel={false}
                        prevLabel={false}
                        indicators={true}
                        fade={true}
                        prevIcon={<i className="icon-chevron-left" style={{ fontSize: 40, color: Colors.black }} />}
                        nextIcon={<i className="icon-chevron-right" style={{ fontSize: 40, color: Colors.black }} />}
                    >
                        {myArray.map((item, index) => (
                            <Carousel.Item style={{ textAlign: "center" }} key={index+1} >
                                <Image src={item.image} alt='gradient'  fluid />
                            </Carousel.Item>

                        ))}
                    </Carousel>
                </Col>
            </Row>

            <Footer />

        </>
    )
}
