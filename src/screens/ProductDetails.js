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
import { getProductById } from '../components/api'
//import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function ProductDetails() {

    const loginid = localStorage.getItem("userLoginId");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let { state } = useLocation();
    const productId = state.productId;


    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState("- Select Size -");
    const [selectedVariantDetails, setSelectedVariantDetails] = useState([]);
    const [itemImages, setItemImages] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [minimumQuantity, setMinimumQuantity] = useState(0);
    const [incrementQuantityValue, setIncrementQuantityValue] = useState(1);
    const incrementQuantity = () => {
        setMinimumQuantity(minimumQuantity + incrementQuantityValue);
    }
    const decrementQuantity = () => {
        if (minimumQuantity > 0) {
            setMinimumQuantity(minimumQuantity - incrementQuantityValue);
        }
    }

    const getItemInfo = (pid) => {
        setItemImages(pid);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

        getItemInfo(productId);
        getAllProductInfo(productId);

    }, [productId]);

    const getAllProductInfo = async (pId) => {

        setLoading(true);

        let toInput = {
            _id: pId,
        };

        await getProductById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (data.data) {
                    setProductDetails(data.data);
                }
            })
            .catch(error => {
                setLoading(false);
                setAlertMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setAlertMessage(""), 3000);
            });
    }

    const handleVariantSelect = (variantId) => {
        if (variantId !== "- Select Size -") {
            setSelectedVariant(variantId);
            var selVariantDetails = productDetails.variants.filter(function (v, i) {
                if (v._id === variantId) {
                    return true;
                } else {
                    return false;
                }
            });
            setSelectedVariantDetails(selVariantDetails[0]);
            setMinimumQuantity(selVariantDetails[0].minimumQuantity);
            setIncrementQuantityValue(selVariantDetails[0].quantityIncreament);
        } else {
            setSelectedVariant("- Select Size -");
            setSelectedVariantDetails([]);
            setMinimumQuantity(0);
            setIncrementQuantityValue(1);
        }
    }

    const addToCart = () => {

        if (selectedVariant === "" || selectedVariant === "- Select Size -") {
            setShowAlert(true);
            setAlertVariant("danger");
            setAlertMessage("Please select size");
            setTimeout(() => { setShowAlert(false) }, 2000);
        } else if (minimumQuantity === 0) {
            setShowAlert(true);
            setAlertVariant("danger");
            setAlertMessage("Please select Quantity");
            setTimeout(() => { setShowAlert(false) }, 2000);
        } else if (loginid === null) {
            navigate('/login');
        } else {
            setMinimumQuantity(0);
            setSelectedVariant("- Select Size -");
            //let item = null;
            // let tAmount = parseFloat(minimumQuantity * selectedVariantDetails.offerPrice);
            //item = { ...product, quantity: minimumQuantity, size: size, totalPrice: tAmount };
            let item = {
                productName: productDetails.productName,
                SKU: selectedVariantDetails.SKU,
                selectedVariant: selectedVariant,
                price: selectedVariantDetails.offerPrice,
                quantity: minimumQuantity,
                incrementQuantity: incrementQuantityValue,
                unitID: productDetails.unitID._id,
                variantID: selectedVariantDetails._id,
                userID: loginid,
                iGSTper: 18,
                sGSTper: 9,
                cGSTper: 9
            }
            dispatch(addItemToCart(item));
            // setShowAlert(true);
            // setAlertVariant("success");
            // setAlertMessage("Added to cart");
            // setTimeout(() => { setShowAlert(false) }, 2000);
        }
    }

    return (
        <div>

            <TopHeader />

            <NavBar />

            <div className="colorlib-product">

                <div className="container">

                    {loading ?

                        <Row style={{ justifyContent: "center", alignContent: "center" }}>
                            <ProgressSpinner style={{ width: '25px', height: '25px' }} />
                        </Row>
                        :
                        <>
                            <Row>
                                <Col className="justify-content-md-center" lg>
                                    {/* <Carousel
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
                            </Carousel> */}
                                </Col>
                                <Col lg>

                                    <Row>
                                        <Col>
                                            <Form.Label style={{ fontSize: 25, color: Colors.black, fontWeight: 400 }}>
                                                {productDetails.productName}
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        {/* <Col><Form.Label style={{ fontSize: 18, fontWeight: "bold", color: Colors.golden }}>₹ {product.price.toFixed(2)}</Form.Label></Col> */}
                                        <Col>
                                            <Form.Label style={{ fontSize: 18, fontWeight: "bold", color: Colors.golden }}>
                                                ₹ Price Range
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label style={{ fontSize: 14, color: Colors.darkGrey }}>
                                                {productDetails.productName}
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>SKU:</b>
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}> {selectedVariantDetails.SKU} </span>
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Size:</b>
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}> </span>
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Shipping Weight:</b>
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}> </span>
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Availability:</b>
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}> </span>
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Category:</b>
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}> {productDetails.catID ? productDetails.catID.categoryName : null} </span>
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Tags:</b>
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}>  </span>
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Size:</b>
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Control as="select" className="rounded-0 shadow" style={{ fontSize: 12, borderRadius: 4 }} value={selectedVariant} onChange={e => { handleVariantSelect(e.target.value); }} >
                                                <option value={null}>- Select Size -</option>
                                                {productDetails.productVariants ?
                                                    productDetails.productVariants.map((data, key) => <option key={data} value={data}>{data}</option>)
                                                    : null}
                                            </Form.Control>
                                        </Col>
                                    </Row>

                                    {selectedVariant !== "- Select Size -" ?
                                        <Row style={{ marginTop: 20 }}>
                                            <Col>
                                                <Form.Label>
                                                    <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Price:</b>
                                                </Form.Label>
                                                <span style={{ fontSize: 14, fontWeight: "bold", color: Colors.lightGrey, textDecoration: 'line-through', marginLeft: 10, marginRight: 10 }}>
                                                    ₹ {selectedVariantDetails.regularPrice}
                                                </span>
                                                <span style={{ fontSize: 16, fontWeight: "bold", color: Colors.golden, }}>
                                                    ₹ {selectedVariantDetails.offerPrice}
                                                </span>
                                            </Col>
                                        </Row>
                                        :
                                        <Row></Row>
                                    }

                                    <Row style={{ marginTop: 20 }}>
                                        <Col><Form.Label><b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Quantity:</b> </Form.Label></Col>
                                    </Row>

                                    <Row className="align-items-center">
                                        <Col xs="auto">
                                            <Button variant="secondary"
                                                style={{ backgroundColor: Colors.primaryViolet, borderRadius: 4, borderColor: Colors.primaryViolet, margin: 2, width: 40, padding: 10, }}
                                                onClick={() => { decrementQuantity() }}>
                                                -
                                            </Button>
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Control
                                                type="text"
                                                placeholder="0"
                                                value={minimumQuantity || ""}
                                                style={{ textAlign: "center" }}
                                                disabled />
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="secondary"
                                                style={{ backgroundColor: Colors.primaryViolet, borderRadius: 4, borderColor: Colors.primaryViolet, margin: 2, width: 40, padding: 10, }}
                                                onClick={() => { incrementQuantity() }}>
                                                +
                                            </Button>
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

                            <Row style={{ marginTop: 20 }}>
                                <Col>
                                    <div className="row">
                                        <div className="col-md-12 pills">
                                            <div className="bd-example bd-example-tabs">
                                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active"
                                                            id="pills-description-tab"
                                                            data-toggle="pill"
                                                            href="#pills-description"
                                                            role="tab"
                                                            aria-controls="pills-description"
                                                            aria-expanded="true">
                                                            Description
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link"
                                                            id="pills-manufacturer-tab"
                                                            data-toggle="pill"
                                                            href="#pills-manufacturer"
                                                            role="tab"
                                                            aria-controls="pills-manufacturer"
                                                            aria-expanded="true">
                                                            Additional Info
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link"
                                                            id="pills-reviews-tab"
                                                            data-toggle="pill"
                                                            href="#pills-reviews"
                                                            role="tab"
                                                            aria-controls="pills-reviews"
                                                            aria-expanded="true">
                                                            Reviews
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content" id="pills-tabContent">
                                                    <div className="tab-pane border fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                                                        <p style={{ whiteSpace: 'pre-line', color: Colors.darkGrey, fontSize: 14 }}>
                                                            description
                                                        </p>
                                                    </div>
                                                    <div className="tab-pane border fade" id="pills-manufacturer" role="tabpanel" aria-labelledby="pills-manufacturer-tab">
                                                        <p style={{ whiteSpace: 'pre-line', color: Colors.darkGrey, fontSize: 14 }}>
                                                            additionalinfo
                                                        </p>
                                                    </div>
                                                    <div className="tab-pane border fade" id="pills-reviews" role="tabpanel" aria-labelledby="pills-reviews-tab">
                                                        <p style={{ whiteSpace: 'pre-line', color: Colors.darkGrey, fontSize: 14 }}>
                                                            reviews
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </>

                    }

                </div>

            </div>

            <Footer />

        </div>
    )
}