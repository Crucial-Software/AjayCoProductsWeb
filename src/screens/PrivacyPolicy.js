import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Colors } from '../common/ConstantStyles'
import './Screens.css';

export default function PrivacyPolicy() {

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
                        <h3>Privacy Policy</h3>
                    </div>
                </Row>

                <Row style={{ padding: 10 }}>
                    <Col>
                        <h5>Who we are</h5>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Our website address is: http://ajaycoproducts.com.</p>
                    </Col>
                </Row>

                <Row style={{ padding: 10 }}>
                    <Col>
                        <h5>What personal data we collect and why we collect it</h5>

                        <h6>Comments</h6>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p>

                        <h6>Media</h6>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>

                        <h6>Contact forms</h6>

                        <h6>Cookies</h6>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p>

                        <h6>Embedded content from other websites</h6>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p>

                        <h6>Analytics</h6>

                    </Col>
                </Row>

                <Row style={{ padding: 10 }}>
                    <Col>
                        <h5>Who we share your data with</h5>

                        <h6>How long we retain your data</h6>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p>

                        <h6>What rights you have over your data</h6>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>

                        <h6>Where we send your data</h6>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Visitor comments may be checked through an automated spam detection service.</p>

                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Your contact information</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Additional information</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>How we protect your data</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>What data breach procedures we have in place</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>What third parties we receive data from</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>What automated decision making and/or profiling we do with user data</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Industry regulatory disclosure requirements</p>

                    </Col>
                </Row>

                <Row style={{ padding: 10 }}>
                    <Col>

                        <p><b style={{ fontWeight: "bold" }}>Disclaimer:</b> </p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Please read and edit the Privacy Policy given below as per your /website’s requirement. Don’t use or apply these as is basis on your website.</p>

                        <p><b style={{ fontWeight: "bold" }}>PRIVACY POLICY</b></p>

                        <p><b style={{ fontWeight: "bold" }}>Your website may use the Privacy Policy given below:</b></p>

                        <p style={{color: Colors.darkGrey, fontSize: 14}}>The terms “We” / “Us” / “Our”/”Company” individually and collectively refer to Ajayco Products and the terms “You” /”Your” / “Yourself” refer to the users.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>This Privacy Policy is an electronic record in the form of an electronic contract formed under the information Technology Act, 2000 and the rules made thereunder and the amended provisions pertaining to electronic documents / records in various statutes as amended by the information Technology Act, 2000. This Privacy Policy does not require any physical, electronic or digital signature.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>This Privacy Policy is a legally binding document between you and Ajayco Products (both terms defined below). The terms of this Privacy Policy will be effective upon your acceptance of the same (directly or indirectly in electronic form, by clicking on the I accept tab or by use of the website or by other means) and will govern the relationship between you and Ajayco Products for your use of the website “Website” (defined below).</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>This document is published and shall be construed in accordance with the provisions of the Information Technology (reasonable security practices and procedures and sensitive personal data of information) rules, 2011 under Information Technology Act, 2000; that require publishing of the Privacy Policy for collection, use, storage and transfer of sensitive personal data or information.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Please read this Privacy Policy carefully by using the Website, you indicate that you understand, agree and consent to this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use this Website.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>By providing us your Information or by making use of the facilities provided by the Website, You hereby consent to the collection, storage, processing and transfer of any or all of Your Personal Information and Non-Personal Information by us as specified under this Privacy Policy. You further agree that such collection, use, storage and transfer of Your Information shall not cause any loss or wrongful gain to you or any other person.</p>

                        <p><b style={{ fontWeight: "bold" }}>USER INFORMATION</b></p>

                        <p style={{color: Colors.darkGrey, fontSize: 14}}>To avail certain services on our Websites, users are required to provide certain information for the registration process namely: – a) your name, b) email address, c) sex, d) age, e) PIN code, f) credit card or debit card details g) medical records and history h) sexual orientation, i) biometric information, j) password etc., and / or your occupation, interests, and the like. The Information as supplied by the users enables us to improve our sites and provide you the most user-friendly experience.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>All required information is service dependent and we may use the above said user information to, maintain, protect, and improve its services (including advertising services) and for developing new services</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Such information will not be considered as sensitive if it is freely available and accessible in the public domain or is furnished under the Right to Information Act, 2005 or any other law for the time being in force.</p>

                        <p><b style={{ fontWeight: "bold" }}>COOKIES</b></p>

                        <p style={{color: Colors.darkGrey, fontSize: 14}}>To improve the responsiveness of the sites for our users, we may use “cookies”, or similar electronic tools to collect information to assign each visitor a unique, random number as a User Identification (User ID) to understand the user’s individual interests using the Identified Computer. Unless you voluntarily identify yourself (through registration, for example), we will have no way of knowing who you are, even if we assign a cookie to your computer. The only personal information a cookie can contain is information you supply (an example of this is when you ask for our Personalised Horoscope). A cookie cannot read data off your hard drive. Our advertisers may also assign their own cookies to your browser (if you click on their ads), a process that we do not control. </p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Our web servers automatically collect limited information about your computer’s connection to the Internet, including your IP address, when you visit our site. (Your IP address is a number that lets computers attached to the Internet know where to send you data — such as the web pages you view.) Your IP address does not identify you personally. We use this information to deliver our web pages to you upon request, to tailor our site to the interests of our users, to measure traffic within our site and let advertisers know the geographic locations from where our visitors come. </p>

                        <p><b style={{ fontWeight: "bold" }}>LINKS TO THE OTHER SITES</b></p>

                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Our policy discloses the privacy practices for our own web site only. Our site provides links to other websites also that are beyond our control. We shall in no way be responsible in way for your use of such sites.5.</p>

                        <p><b style={{ fontWeight: "bold" }}>INFORMATION SHARING</b></p>

                        <p style={{color: Colors.darkGrey, fontSize: 14}}>We shares the sensitive personal information to any third party without obtaining the prior consent of the user in the following limited circumstances:</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>(a) When it is requested or required by law or by any court or governmental agency or authority to disclose, for the purpose of verification of identity, or for the prevention, detection, investigation including cyber incidents, or for prosecution and punishment of offences. These disclosures are made in good faith and belief that such disclosure is reasonably necessary for enforcing these Terms; for complying with the applicable laws and regulations. </p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>(b) We proposes to share such information within its group companies and officers and employees of such group companies for the purpose of processing personal information on its behalf. We also ensure that these recipients of such information agree to process such information based on our instructions and in compliance with this Privacy Policy and any other appropriate confidentiality and security measures.</p>

                        <p><b style={{ fontWeight: "bold" }}>INFORMATION SECURITY</b></p>

                        <p style={{color: Colors.darkGrey, fontSize: 14}}>We take appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure or destruction of data. These include internal reviews of our data collection, storage and processing practices and security measures, including appropriate encryption and physical security measures to guard against unauthorized access to systems where we store personal data.</p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>All information gathered on our Website is securely stored within our controlled database. The database is stored on servers secured behind a firewall; access to the servers is password-protected and is strictly limited. However, as effective as our security measures are, no security system is impenetrable. We cannot guarantee the security of our database, nor can we guarantee that information you supply will not be intercepted while being transmitted to us over the Internet. And, of course, any information you include in a posting to the discussion areas is available to anyone with Internet access. </p>
                        <p style={{color: Colors.darkGrey, fontSize: 14}}>However the internet is an ever evolving medium. We may change our Privacy Policy from time to time to incorporate necessary future changes. Of course, our use of any information we gather will always be consistent with the policy under which the information was collected, regardless of what the new policy may be. </p>

                        <p><b style={{ fontWeight: "bold" }}>Grievance Redressal</b></p>

                        <p style={{color: Colors.darkGrey, fontSize: 14}}>Redressal Mechanism: Any complaints, abuse or concerns with regards to content and or comment or breach of these terms shall be immediately informed to the designated Grievance Officer as mentioned below via in writing or through email signed with the electronic signature to …………………………….. (“Grievance Officer”). </p>

                        <p>
                            <span style={{color: Colors.darkGrey, fontSize: 14}}><b style={{ fontWeight: "bold" }}>Mr. Ajay Singh (Grievance Officer)</b></span><br />
                            <span style={{color: Colors.darkGrey, fontSize: 14}}><i className="icon-location" style={{ fontSize: 12, color: Colors.darkGrey }} /> &nbsp; Factory No. 47, Khatipura, Dist., Jhunjhnu, Rajasthan, India 332746</span><br />
                            <span style={{color: Colors.darkGrey, fontSize: 14}}><i className="icon-globe" style={{ fontSize: 12, color: Colors.darkGrey }} /> &nbsp; www.ajaycoproducts.com</span><br />
                            <span style={{color: Colors.darkGrey, fontSize: 14}}><i className="icon-paperplane" style={{ fontSize: 12, color: Colors.darkGrey }} /> &nbsp; info@ajaycoproducts.com</span><br />
                            <span style={{color: Colors.darkGrey, fontSize: 14}}><i className="icon-phone3" style={{ fontSize: 12, color: Colors.darkGrey }} /> &nbsp; +91-8460475051</span>
                        </p>

                    </Col>
                </Row>
            </Container>
            <Footer />

        </>
    )
}
