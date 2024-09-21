import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Colors, FontSize } from '../common/ConstantStyles'
import TopHeader from '../components/TopHeader'

export default function AboutUs() {

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

            <NavBar />

            <Container>
                <Row>
                    <Col lg style={{ textAlign: "center" }}>
                        <Image src="../images/RoundShapeEmbroideryHoop.jpg" alt='aboutus' height={350} />
                    </Col>
                    <Col lg style={{ marginTop: 30,  }}>
                        <h3>Our Story</h3>
                        <p style={{ color: Colors.darkGrey, fontSize: 14, marginTop: 20  }}>What started-off as a small Factory in a Small Village i’e Khatipura, is an nationally famous brand today. A venture of that is the brand called AJAYCO.</p>
                        <p style={{ color: Colors.darkGrey, fontSize: 14  }}>Founded by Mr. Dwarka Prasad in a Village of Khatipura, Jhunjhunu (Rajasthan) in 1993, Manufacturing and Trading of Embroidery Frame / Hoop. Never had he imagined this business venture of his to go global. The factory slowly added products to its range and reached time. 12 years into the business and the factory became a brand, with evolving time it got registered as AjayCo Embroidery Frame & Wood Works During this time AjayCo was also formed, it was selling ‘high-quality Embroidery Frames’. Over the years, AjayCo got established amongst other Embroiderer in India.</p>
                    </Col>
                </Row>

                <Row style={{ marginTop: 30, }}>
                    <p style={{ color: Colors.darkGrey, fontSize: 14  }}>In 2005 his son Mr. Dinesh Kumar joined the business. With his father’s experience and knowledge and his own enthusiasm, the business went into other areas as well. AjayCo Handicrafts, was formed around this time and a lot more related products were added to the range. Both companies captured the market and grew immensely. Eventually both were combined to make AjayCo Products.</p>
                    <p style={{ color: Colors.darkGrey, fontSize: 14  }}>All these efforts finally paid off when this wholesale business turned into an export business. This led to a realization. With the rising of Indian economy and retail explosion happening, there couldn’t be a better time for us to establish ourselves in this untapped market.</p>
                    <p style={{ color: Colors.darkGrey, fontSize: 14  }}>The Second generation son Mr. Ajay Singh have entered the business in 2015. This new generation, being brand conscious and well-exposed, made it a point to make AjayCo look ‘The Frame Factory’.</p>
                    <p style={{ color: Colors.darkGrey, fontSize: 14  }}>We’ve traversed a long way from where we started with your support. We are proud and honoured to place ourselves into the Indian retail market at par with any existing brand. We come to you with a brand new and improved.</p>
                </Row>

                <Row>
                    <Col md style={{ textAlign: "center", backgroundColor: Colors.grey, padding: 20, margin: 10 }}>
                        <Image src="../images/best-seller.png" alt='gradient' height={70} />
                        <p style={{ color: Colors.black, fontSize: FontSize.mediumLarge, marginTop: 20, marginBottom: 20, fontWeight: "bold" }}>BEST MATERIAL</p>
                        <p style={{ color: Colors.darkGrey, fontSize: FontSize.smallMedium,  }}>Hoops and Frames in various Shape and Size with Best Wooden Material and Plastic Materials</p>
                    </Col>
                    <Col md style={{ textAlign: "center", backgroundColor: Colors.grey, padding: 20, margin: 10 }}>
                        <Image src="../images/chat.png" alt='gradient' height={70} />
                        <p style={{ color: Colors.black, fontSize: FontSize.mediumLarge, marginTop: 20, marginBottom: 20, fontWeight: "bold" }}>EASY COMMUNICATION</p>
                        <p style={{ color: Colors.darkGrey, fontSize: FontSize.smallMedium }}>You can contact Ajayco Products with many easy options for any Query or After Sale Service including Call/Email/WhatsApp</p></Col>
                    <Col md style={{ textAlign: "center", backgroundColor: Colors.grey, padding: 20, margin: 10 }}>
                        <Image src="../images/shopping-cart.png" alt='gradient' height={70} />
                        <p style={{ color: Colors.black, fontSize: FontSize.mediumLarge, marginTop: 20, marginBottom: 20, fontWeight: "bold" }}>SMOOTH PURCHASE</p>
                        <p style={{ color: Colors.darkGrey, fontSize: FontSize.smallMedium }}>You can order easily as our website and get your products delivered on time.</p>
                    </Col>
                </Row>
            </Container>

            <Footer />

        </>
    )
}
