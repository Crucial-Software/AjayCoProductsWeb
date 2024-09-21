import React, { useEffect, useState } from 'react'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Form, Button, Row, Col, Carousel, Image, Alert } from 'react-bootstrap'
import { Colors } from '../common/ConstantStyles'
import { useLocation, useNavigate } from 'react-router-dom'
import './Screens.css';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/actions/cartAction'
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductDetails() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let { state } = useLocation();
    const product = state.item;

    const loginid = localStorage.getItem("userLoginId");

    const [count, setCount] = useState(0);
    const incrementQuantity = () => {
        setCount(count + 6);
    }
    const decrementQuantity = () => {
        if (count > 0) {
            setCount(count - 6);
        }
    }

    const [size, setSize] = useState("");
    const [itemImages, setItemImages] = useState([]);
    const [variantData, setVariantData] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const getItemInfo = (product) => {
        setItemImages(product.uri);
    }
    const getVariantInfo = () => {
        setVariantData(variantDataList);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

        if (product) {
            getItemInfo(product);
            getVariantInfo();
        }

    }, [product]);



    const addToCart = () => {

        if (size === "" || size === "- Select Size -") {
            setShowAlert(true);
            setAlertVariant("danger");
            setAlertMessage("Please select size");
            setTimeout(() => { setShowAlert(false) }, 2000);
        } else if (count === 0) {
            setShowAlert(true);
            setAlertVariant("danger");
            setAlertMessage("Please select Quantity");
            setTimeout(() => { setShowAlert(false) }, 2000);
        } else if (loginid === null) {
            navigate('/login');
        } else {
            setCount(0);
            setSize("");
            let item = null;
            let tAmount = parseFloat(count * product.price);
            item = { ...product, quantity: count, size: size, totalPrice: tAmount };
            dispatch(addItemToCart(item));
            setShowAlert(true);
            setAlertVariant("success");
            setAlertMessage("Added to cart");
            setTimeout(() => { setShowAlert(false) }, 2000);
        }
    }

    return (
        <div>

            <TopHeader />

            <NavBar />

            <div className="colorlib-product">

                <div className="container">

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
                                {itemImages.map((item, index) => (
                                    <Carousel.Item style={{ textAlign: "center" }} key={item.id}>
                                        <Image
                                            src={item.image}
                                            alt='gradient'
                                            className="d-block w-100"
                                            onClick={() => { navigate('/viewattachment', { state: { file: itemImages, } }); }}
                                            fluid />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                        <Col lg>

                            <Row>
                                <Col><Form.Label style={{ fontSize: 25, color: Colors.black, fontWeight: 400 }}>{product.title}</Form.Label></Col>
                            </Row>

                            <Row>
                                <Col><Form.Label style={{ fontSize: 18, fontWeight: "bold", color: Colors.golden }}>₹ {product.price.toFixed(2)}</Form.Label></Col>
                            </Row>

                            <Row>
                                <Col><Form.Label style={{ fontSize: 14, color: Colors.darkGrey }}>{product.title}</Form.Label></Col>
                            </Row>

                            <Row>
                                <Col><Form.Label> <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>SKU:</b><span style={{ fontSize: 14, color: Colors.darkGrey }}> {product.sku} </span> </Form.Label></Col>
                            </Row>

                            <Row>
                                <Col><Form.Label> <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Size:</b> <span style={{ fontSize: 14, color: Colors.darkGrey }}> {product.size} </span> </Form.Label></Col>
                            </Row>

                            <Row>
                                <Col><Form.Label> <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Shipping Weight:</b><span style={{ fontSize: 14, color: Colors.darkGrey }}>  {product.weight} </span> </Form.Label></Col>
                            </Row>

                            <Row>
                                <Col><Form.Label> <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Availability:</b> <span style={{ fontSize: 14, color: Colors.darkGrey }}> {product.availability} </span> </Form.Label></Col>
                            </Row>

                            <Row>
                                <Col><Form.Label> <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Category:</b> <span style={{ fontSize: 14, color: Colors.darkGrey }}> {product.category} </span> </Form.Label></Col>
                            </Row>

                            <Row>
                                <Col><Form.Label> <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Tags:</b> <span style={{ fontSize: 14, color: Colors.darkGrey }}> {product.tags} </span> </Form.Label></Col>
                            </Row>

                            <Row>
                                <Col><Form.Label> <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Size:</b> </Form.Label></Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Control as="select" className="rounded-0 shadow" style={{ fontSize: 12, borderRadius: 4 }} value={size} onChange={e => { setSize(e.target.value); }} >
                                        <option value="- Select Size -">- Select Size -</option>
                                        {variantData.map((data, key) => <option key={data.id} value={data.size} >{data.size}</option>)}
                                    </Form.Control>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: 20 }}>
                                <Col><Form.Label><b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Quantity:</b> </Form.Label></Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <Button 
                                    variant="secondary" 
                                    style={{ backgroundColor: Colors.primaryViolet, borderRadius: 4, borderColor: Colors.primaryViolet, margin: 2, width: 40, padding: 10, }} 
                                    onClick={() => { decrementQuantity() }} 
                                    > - </Button>
                                </Col>
                                <Col sm={2}>
                                    <Form.Control
                                        type="text"
                                        placeholder="0"
                                        value={count || ""}
                                        style={{ textAlign: "center" }}
                                        disabled />
                                </Col>
                                <Col xs="auto">
                                    <Button 
                                    variant="secondary" 
                                    style={{ backgroundColor: Colors.primaryViolet, borderRadius: 4, borderColor: Colors.primaryViolet, margin: 2, width: 40, padding: 10,  }} 
                                    onClick={() => { incrementQuantity() }} 
                                    > + </Button>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: 20 }}>
                                <Col>
                                    <Button
                                        variant="secondary"
                                        style={{ backgroundColor: Colors.golden, borderRadius: 4, borderColor: Colors.golden, }}
                                        onClick={() => { addToCart() }}
                                        size="md"
                                    > Add to Cart
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <Col>
                                    <Alert key='danger' show={showAlert} variant={alertVariant} style={{ fontSize: 14, color: Colors.black }}>{alertMessage}</Alert>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>

                    </Row>

                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <div className="row">
                                <div className="col-md-12 pills">
                                    <div className="bd-example bd-example-tabs">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="pills-description-tab" data-toggle="pill" href="#pills-description" role="tab" aria-controls="pills-description" aria-expanded="true">Description</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-manufacturer-tab" data-toggle="pill" href="#pills-manufacturer" role="tab" aria-controls="pills-manufacturer" aria-expanded="true">Additional Info</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-reviews-tab" data-toggle="pill" href="#pills-reviews" role="tab" aria-controls="pills-reviews" aria-expanded="true">Reviews</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane border fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                                                <p style={{ whiteSpace: 'pre-line', color: Colors.darkGrey, fontSize: 14 }}>{product.description}</p>
                                            </div>
                                            <div className="tab-pane border fade" id="pills-manufacturer" role="tabpanel" aria-labelledby="pills-manufacturer-tab">
                                                <p style={{ whiteSpace: 'pre-line' , color: Colors.darkGrey, fontSize: 14 }}>{product.additionalinfo}</p>
                                            </div>
                                            <div className="tab-pane border fade" id="pills-reviews" role="tabpanel" aria-labelledby="pills-reviews-tab">
                                                <p style={{ whiteSpace: 'pre-line', color: Colors.darkGrey, fontSize: 14  }}>{product.reviews}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>

            <Footer />

        </div>
    )
}

const variantDataList = [
    {
        id: '1',
        size: "6 inch",
        price: "₹ 90.00",
        minquantity: 6,
        quantityStack: 6,
    },
    {
        id: '2',
        size: "8 inch",
        price: "₹ 120.00",
        minquantity: 6,
        quantityStack: 6,
    },
    {
        id: '3',
        size: "10 inch",
        price: "₹ 150.00",
        minquantity: 6,
        quantityStack: 6,
    },
    {
        id: '4',
        size: "12 inch",
        price: "₹ 180.00",
        minquantity: 6,
        quantityStack: 6,
    },
    {
        id: '5',
        size: "14 inch",
        price: "₹ 210.00",
        minquantity: 6,
        quantityStack: 6,
    }
]
