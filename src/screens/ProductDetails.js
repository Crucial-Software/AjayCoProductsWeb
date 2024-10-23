import React, { useEffect, useState, useRef } from 'react'
import TopHeader from '../components/TopHeader'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { Colors } from '../common/ConstantStyles'
import { useLocation, useNavigate } from 'react-router-dom'
import './Screens.css';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/actions/cartAction'
import { getProductById } from '../components/api'
//import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import { API_BASE } from '../components/urlLink';
import { Galleria } from 'primereact/galleria';
import { Image } from 'primereact/image';

export default function ProductDetails() {

    const loginid = localStorage.getItem("userLoginId");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let { state } = useLocation();
    const productId = state.productId;

    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState([]);
    const [productVariantsList, setProductVariantsList] = useState([]);
    const [itemImages, setItemImages] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [selectedVariant, setSelectedVariant] = useState();
    const [sku, setSku] = useState("");
    const [size, setSize] = useState("");
    const [weight, setWeight] = useState("");
    const [availability, setAvailability] = useState("");
    const [regularPrice, setRegularPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [minimumQuantity, setMinimumQuantity] = useState(0);
    const [incrementQuantityValue, setIncrementQuantityValue] = useState(1);
    const [featureOptionName, setFeatureOptionName] = useState("");

    const incrementQuantity = () => {
        setMinimumQuantity(minimumQuantity + incrementQuantityValue);
    }
    const decrementQuantity = () => {
        if (minimumQuantity > 0) {
            setMinimumQuantity(minimumQuantity - incrementQuantityValue);
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

        if (productId) {
            getAllProductInfo(productId);
        }

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
                if (data.data[0]) {
                    setProductDetails(data.data[0]);
                    if (data.data[0].productImages) {
                        setItemImages(data.data[0].productImages);
                    }
                }
                if (data.data[0].productVariants) {
                    setProductVariantsList(data.data[0].productVariants);
                    setSelectedVariant(data.data[0].productVariants[0]._id);
                    setSku(data.data[0].productVariants[0].SKU);
                    setSize(data.data[0].productVariants[0].dimensions);
                    setWeight(data.data[0].productVariants[0].weight);
                    setAvailability(data.data[0].productVariants[0].currentStock);
                    setRegularPrice(data.data[0].productVariants[0].regularPrice);
                    setOfferPrice(data.data[0].productVariants[0].offerPrice);
                    setMinimumQuantity(data.data[0].productVariants[0].minimumQuantity);
                    setIncrementQuantityValue(data.data[0].productVariants[0].quantityIncreament);
                    setFeatureOptionName(data.data[0].productVariants? data.data[0].productVariants[0].variantOptions[0].featureOptionID.featureOptionName : "");
                }
            })
            .catch(error => {
                setLoading(false);
                setAlertMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setAlertMessage(""), 3000);
            });
    }

    const handleVariantSelect = (variantId) => {
        setSelectedVariant(variantId);
        var selVariantDetails = productVariantsList.filter(function (v, i) {
            if (v._id === variantId) {
                return true;
            } else {
                return false;
            }
        });
        setSku(selVariantDetails[0].SKU);
        setSize(selVariantDetails[0].dimensions);
        setWeight(selVariantDetails[0].weight);
        setAvailability(selVariantDetails[0].currentStock);
        setRegularPrice(selVariantDetails[0].regularPrice);
        setOfferPrice(selVariantDetails[0].offerPrice);
        setMinimumQuantity(selVariantDetails[0].minimumQuantity);
        setIncrementQuantityValue(selVariantDetails[0].quantityIncreament);
        setFeatureOptionName(selVariantDetails[0].variantOptions[0].featureOptionID.featureOptionName);
    }

    const addToCart = () => {

        if (minimumQuantity === 0) {
            setShowAlert(true);
            setAlertVariant("danger");
            setAlertMessage("Please select quantity");
            setTimeout(() => { setShowAlert(false) }, 2000);
        } else if (loginid === null) {
            navigate('/login');
        } else {
            let item = {
                quantity: minimumQuantity,
                unitID: productDetails.unitID._id,
                variantID: selectedVariant,
                userID: loginid,
            }
            dispatch(addItemToCart(item));
            setShowAlert(true);
            setAlertVariant("success");
            setAlertMessage("Added to cart");
            setTimeout(() => { setShowAlert(false) }, 2000);
        }
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const galleria = useRef(null);

    const itemTemplate = (item, index) => {
        return <img
            src={`${API_BASE}/images/products/${item.productImageLink}`}
            onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
            alt={item.productImageLink}
            onClick={() => { setActiveIndex(1); galleria.current.show() }}
            style={{ height: 450 }} />
    }

    const thumbnailTemplate = (item) => {
        return <img
            src={`${API_BASE}/images/products/${item.productImageLink}`}
            onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
            alt={item.productImageLink}
            style={{ height: 75 }} />
    }

    const itemTemplate1 = (item) => {
        console.log("Item: " + item);
        return <img src={`${API_BASE}/images/products/${item.productImageLink}`} alt={item.productImageLink} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate1 = (item) => {
        return <img src={`${API_BASE}/images/products/${item.productImageLink}`} alt={item.productImageLink} style={{ display: 'block' }} />;
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
                            <Row className="align-items-center">
                                <Col className="justify-content-md-center">
                                    {itemImages.length !== 0 ?
                                        <>
                                            {itemImages.length === 1 ?
                                                itemImages.map((item, key) =>
                                                    <Image src={`${API_BASE}/images/products/${item.productImageLink}`} alt={item.productImageLink} height="450" preview />
                                                )
                                                :
                                                <>
                                                    <Galleria ref={galleria} value={itemImages} numVisible={7} style={{ maxWidth: '850px' }}
                                                        activeIndex={activeIndex} onItemChange={(e) => setActiveIndex(e.index)}
                                                        circular fullScreen showItemNavigators showThumbnails={false} item={itemTemplate1} thumbnail={thumbnailTemplate1} />

                                                    <Galleria
                                                        value={itemImages}
                                                        numVisible={7}
                                                        item={itemTemplate}
                                                        thumbnail={thumbnailTemplate}
                                                        circular
                                                        autoPlay
                                                        showItemNavigators
                                                        transitionInterval={3000}
                                                    />
                                                </>
                                            }
                                        </>

                                        :
                                        <Row>
                                            <p style={{ padding: 20, textAlign: "center", marginBottom: 50, color: Colors.darkGrey, }}>No Images Found</p>
                                        </Row>
                                    }
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Form.Label style={{ fontSize: 25, color: Colors.black, fontWeight: 400 }}>
                                                {productDetails.productName}
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>SKU:</b>
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}> {sku ? sku : "N/A"} </span>
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Size:</b>
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}> {size ? size : "N/A"}</span>
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Shipping Weight:</b>
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}> {weight ? weight : "N/A"} </span>
                                            </Form.Label>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Availability:</b>
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}> {availability ? availability : "N/A"} </span>
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
                                                <span style={{ fontSize: 14, color: Colors.darkGrey }}> {productDetails.productTags} </span>
                                            </Form.Label>
                                        </Col>
                                    </Row>


                                    {featureOptionName !== "Simple Product" ?
                                        <>
                                            <Row>
                                                <Col>
                                                    <Form.Label>
                                                        <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Select Size:</b>
                                                    </Form.Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Control as="select" className="rounded-0 shadow" style={{ fontSize: 12, borderRadius: 4 }} value={selectedVariant} onChange={e => { handleVariantSelect(e.target.value); }} >
                                                        {/* <option value={null}>- Select Size -</option> */}
                                                        {productDetails.productVariants ?
                                                            productDetails.productVariants.map((data, key) =>
                                                                <option
                                                                    key={data._id}
                                                                    value={data._id}
                                                                >
                                                                    {data.variantOptions[0].featureOptionID.featureOptionName}
                                                                </option>)
                                                            : null}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </>

                                        : null
                                    }

                                    <Row style={{ marginTop: 20 }}>
                                        <Col>
                                            <Form.Label>
                                                <b style={{ fontSize: 14, fontWeight: "bold", color: Colors.darkGrey }}>Price:</b>
                                            </Form.Label>
                                            <span style={{ fontSize: 14, fontWeight: "bold", color: Colors.lightGrey, textDecoration: 'line-through', marginLeft: 10, marginRight: 10 }}>
                                                ₹ {regularPrice ? regularPrice : "N/A"}
                                            </span>
                                            <span style={{ fontSize: 16, fontWeight: "bold", color: Colors.golden, }}>
                                                ₹ {offerPrice ? offerPrice : "N/A"}
                                            </span>
                                        </Col>
                                    </Row>


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
                                                        <p style={{ whiteSpace: 'pre-line', color: Colors.darkGrey, fontSize: 14 }} dangerouslySetInnerHTML={{ __html: productDetails.productDesc }}></p>
                                                    </div>
                                                    <div className="tab-pane border fade" id="pills-manufacturer" role="tabpanel" aria-labelledby="pills-manufacturer-tab">
                                                        <p style={{ whiteSpace: 'pre-line', color: Colors.darkGrey, fontSize: 14 }}>

                                                        </p>
                                                    </div>
                                                    <div className="tab-pane border fade" id="pills-reviews" role="tabpanel" aria-labelledby="pills-reviews-tab">
                                                        <p style={{ whiteSpace: 'pre-line', color: Colors.darkGrey, fontSize: 14 }}>

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