import React, { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Colors, FontSize } from "../../common/ConstantStyles";
import { Editor } from 'primereact/editor';
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import { createProductImage, deleteProductImage, getAllCategories, getAllFeatureOptions, getAllFeatures, getAllUnits, getProductById } from "../../components/api";
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { useLocation } from 'react-router-dom';
import { API_BASE } from "../../components/urlLink";
import { Image } from 'primereact/image';
import { Tooltip } from 'primereact/tooltip';

const CreateNewProduct = () => {

    const userLoginId = localStorage.getItem("userLoginId");

    const toast = useRef(null);

    let location = useLocation();
    const { productId } = location?.state;
    const [itemImages, setItemImages] = useState([]);

    const [imagefile, setImageFile] = useState(null);
    const [imageFileId, setImageFileId] = useState(null);
    const aRef = useRef(null);

    const [show, setShow] = useState(false);

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [units, setUnits] = useState([]);
    const [unitId, setUnitId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [tags, setTags] = useState("");
    const [status, setStatus] = useState("");
    const [hsnCode, setHsnCode] = useState("");
    const [cGSTper, setCGSTper] = useState(null);
    const [sGSTper, setSGSTper] = useState(null);
    const [iGSTper, setIGSTper] = useState(null);
    const [inputFields, setInputFields] = useState([]);

    const [features, setFeatures] = useState([]);
    const [featureId, setFeatureId] = useState(null);
    const [featureValue, setFeatureValue] = useState("");
    const [featureOptions, setFeaturesOptions] = useState([]);
    const [selectedFeatureOptionId, setSelectedFeatureOptionId] = useState(null);
    const [selectedFeatureOptionValue, setSelectedFeatureOptionValue] = useState("");

    useEffect(() => {
        fetchAllUnits();
        fetchAllCategories();
        fetchAllFeatures();
        fetchAllFeatureOptions();
        if (productId !== null) {
            fetchProductDetails(productId);
        }
    }, [productId])

    const fetchAllUnits = async () => {
        await getAllUnits()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    setUnits(data.data);
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });

    }

    const fetchAllCategories = async () => {
        await getAllCategories()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    setCategories(data.data);
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });

    }

    const fetchAllFeatures = async () => {
        await getAllFeatures()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    setFeatures(data.data);
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });

    }

    const fetchAllFeatureOptions = async () => {
        await getAllFeatureOptions()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    setFeaturesOptions(data.data);
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });

    }

    const fetchProductDetails = async (pId) => {

        let toInput = {
            _id: pId,
        };

        await getProductById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (data.data[0]) {
                    let pDetails = data.data[0];

                    setProductName(pDetails.productName);
                    setUnitId(pDetails.unitID._id);
                    setCategoryId(pDetails.catID._id);
                    setHsnCode(pDetails.hsnCode);
                    setCGSTper(pDetails.cGSTper);
                    setSGSTper(pDetails.sGSTper);
                    setIGSTper(pDetails.iGSTper);
                    setStatus(pDetails.status);

                    if (data.data[0].productImages) {
                        setItemImages(data.data[0].productImages);
                    }
                    if (data.data[0].productVariants) {
                        let pVariantData = data.data[0].productVariants;
                        for (let i = 0; i < pVariantData.length; i++) {
                            setInputFields([{
                                SKU: pVariantData[i].SKU,
                                currentStock: '',
                                regularPrice: pVariantData[i].regularPrice,
                                offerPrice: pVariantData[i].offerPrice,
                                quantityIncreament: pVariantData[i].quantityIncreament,
                                minimumQuantity: pVariantData[i].minimumQuantity,
                                weight: '',
                                dimension: '',
                                featureId: pVariantData[i].variantOptions[0].featureOptionID.featureMasterID._id,
                                featureValue: pVariantData[i].variantOptions[0].featureOptionID.featureMasterID.featureName,
                                selectedFeatureOptionId: pVariantData[i].variantOptions[0].featureOptionID._id,
                                selectedFeatureOptionValue: pVariantData[i].variantOptions[0].featureOptionID.featureOptionName
                            }, ...inputFields]);
                        }

                    }
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
    }

    const handleEnterDetails = () => {
        if (featureId === null || featureId === 'Select' || featureId === "") {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please select feature" });
        } else if (selectedFeatureOptionId === null || selectedFeatureOptionId === 'Select' || selectedFeatureOptionId === "") {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please select feature option" });
        } else if (inputFields.length >= 1 && (inputFields[0].SKU === "" || inputFields[0].currentStock === "" || inputFields[0].regularPrice === null || inputFields[0].offerPrice === null || inputFields[0].quantityIncreament === null
            || inputFields[0].minimumQuantity === null || inputFields[0].weight === "" || inputFields[0].dimension === ""
        )) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please enter all variant details" });
        }
        else {
            addInputField();
        }
    }

    const addInputField = () => {
        setInputFields([{
            SKU: '',
            currentStock: '',
            regularPrice: null,
            offerPrice: null,
            quantityIncreament: null,
            minimumQuantity: null,
            weight: '',
            dimension: '',
            featureId: featureId,
            featureValue: featureValue,
            selectedFeatureOptionId: selectedFeatureOptionId,
            selectedFeatureOptionValue: selectedFeatureOptionValue
        }, ...inputFields]);

        setFeatureId(null);
        setFeatureValue("");
        setSelectedFeatureOptionId(null);
        setSelectedFeatureOptionValue("");

    }
    const removeInputFields = (index) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    }
    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...inputFields];
        list[index][name] = value;
        setInputFields(list);
    }

    const handleImageUpload = async () => {
        const formData = new FormData();

        formData.append('productImageLink', imagefile)
        formData.append('productId', productId);
        formData.append('status', status);
        formData.append('createdByid', userLoginId);

        await createProductImage(formData)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                    setImageFile(null);
                    aRef.current.value = null;
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
                setImageFile(null);
                aRef.current.value = null;
            });

    }

    const handleImageDelete = (iId) => {
        setShow(true);
        setImageFileId(iId);
    }

    const handleThisImageDelete = async () => {
        let toInput = {
            _id: imageFileId,
        };
        await deleteProductImage(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                    const newArray = itemImages.filter((item, index) => item._id !== imageFileId);
                    setItemImages(newArray);
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
    }

    const handleSaveProductDetails = () => {
        console.log(
            " productName: " + productName +
            " productDescription: " + productDescription +
            " unit: " + unitId +
            " category: " + categoryId +
            " tags: " + tags +
            " status: " + status +
            " hsnCode: " + hsnCode +
            " cGSTper: " + cGSTper +
            " sGSTper: " + sGSTper +
            " iGSTper: " + iGSTper
        );
    }

    return (

        <div className="main" >

            <Sidebar />

            <div className="page-content">

                <Toast ref={toast} position="top-center" />

                <Header />

                <h5>Create New Product</h5>

                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: FontSize.mediumLarge }}>Delete Product Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: FontSize.smallMedium }}>Are you sure you want to delete this product image?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)} style={{ fontSize: FontSize.smallMedium }}>No</Button>
                        <Button variant="primary" onClick={() => {
                            setShow(false);
                            handleThisImageDelete();
                        }} style={{ fontSize: FontSize.smallMedium }}>Yes</Button>
                    </Modal.Footer>
                </Modal>

                <div style={{ padding: 20 }}>
                    <div className="accordion-demo">
                        <Accordion multiple activeIndex={[0, 1, 2]}>
                            <AccordionTab header="Product Details">
                                <div>
                                    <Row style={{ fontSize: FontSize.smallMedium }}>
                                        <Col md>
                                            <Form.Group className="mb-3" controlId="formProductName">
                                                <Form.Label
                                                    style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    Product Name<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Control
                                                    value={productName || ""}
                                                    onChange={e => { setProductName(e.target.value) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row style={{ fontSize: FontSize.smallMedium }}>
                                        <Col md>
                                            <Form.Group className="mb-3" controlId="formProductDescription">
                                                <Form.Label
                                                    style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    Product Description<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Editor style={{ height: '250px' }} value={productDescription} onTextChange={(e) => setProductDescription(e.htmlValue)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row style={{ fontSize: FontSize.smallMedium }}>
                                        <Col md={2}>
                                            <Form.Group className="mb-3" controlId="formUnit">
                                                <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    Unit
                                                    <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    value={unitId || ""}
                                                    onChange={e => { setUnitId(e.target.value); }}>
                                                    <option value="Select">- Select Unit -</option>
                                                    {units.map((data, key) => <option key={data._id} value={data._id} >{data.unitName}</option>)}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md>
                                            <Form.Group className="mb-3" controlId="formCategory">
                                                <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    Category
                                                    <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    value={categoryId || ""}
                                                    onChange={e => { setCategoryId(e.target.value); }}>
                                                    <option value="Select">- Select Category -</option>
                                                    {categories.map((data, key) => <option key={data._id} value={data._id} >{data.categoryName}</option>)}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md>
                                            <Form.Group className="mb-3" controlId="formTags">
                                                <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    Tags
                                                    <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Control
                                                    value={tags || ""}
                                                    onChange={e => { setTags(e.target.value) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Group className="mb-3" controlId="formStatus">
                                                <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    Status
                                                    <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    value={status || ""}
                                                    onChange={e => { setStatus(e.target.value) }}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row style={{ fontSize: FontSize.smallMedium }}>
                                        <Col md>
                                            <Form.Group className="mb-3" controlId="formHsnCode">
                                                <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    HSN Code
                                                    <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Control
                                                    value={hsnCode || ""}
                                                    onChange={e => { setHsnCode(e.target.value) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md>
                                            <Form.Group className="mb-3" controlId="formCgst">
                                                <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    CGST
                                                    <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    value={cGSTper || ""}
                                                    onChange={e => { setCGSTper(e.target.value.replace(/\D/g, "")) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md>
                                            <Form.Group className="mb-3" controlId="formSgst">
                                                <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    SGST
                                                    <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    value={sGSTper || ""}
                                                    onChange={e => { setSGSTper(e.target.value.replace(/\D/g, "")) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md>
                                            <Form.Group className="mb-3" controlId="formIgst">
                                                <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    IGST
                                                    <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    value={iGSTper || ""}
                                                    onChange={e => { setIGSTper(e.target.value.replace(/\D/g, "")) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </div>

                            </AccordionTab>
                            <AccordionTab header="Product Variant Details">

                                <div>
                                    <Row style={{ fontSize: FontSize.smallMedium }}>
                                        <Col md={3}>
                                            <Form.Group className="mb-3" controlId="formCategory">
                                                <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    Feature
                                                    <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    value={featureId || ""}
                                                    onChange={e => {
                                                        setFeatureId(e.target.value);
                                                        var value = features.filter(function (item) {
                                                            return item._id === e.target.value
                                                        })
                                                        setFeatureValue(value[0].featureName);
                                                    }}>
                                                    <option value="Select">- Select -</option>
                                                    {features.map((data, key) => <option key={data._id} value={data._id} >{data.featureName}</option>)}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group className="mb-3" controlId="formCategory">
                                                <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                    Feature Option
                                                    <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                </Form.Label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    value={selectedFeatureOptionId || ""}
                                                    onChange={e => {
                                                        setSelectedFeatureOptionId(e.target.value);
                                                        var value = featureOptions.filter(function (item) {
                                                            return item._id === e.target.value
                                                        })
                                                        setSelectedFeatureOptionValue(value[0].featureOptionName);
                                                    }}>
                                                    <option value="Select">- Select -</option>e
                                                    {featureOptions.map((data, key) => <option key={data._id} value={data._id} >{data.featureOptionName}</option>)}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                size="sm"
                                                variant="outline-primary"
                                                type="submit"
                                                onClick={() => { handleEnterDetails(); }}
                                                style={{ marginTop: 30, backgroundColor: Colors.darkBlue, borderColor: Colors.darkBlue, }}
                                            >
                                                Enter Details
                                            </Button>
                                        </Col>

                                    </Row>
                                    <Row>
                                        {inputFields.map((data, index) => {
                                            const { featureValue, selectedFeatureOptionValue, SKU, currentStock, regularPrice, offerPrice, quantityIncreament, minimumQuantity, weight, dimension } = data;
                                            return (
                                                <div key={index} className="border rounded" style={{ marginTop: 10, padding: 10, backgroundColor: "#F0F0F0" }}>
                                                    <Row>
                                                        <Row style={{ fontSize: FontSize.smallMedium, marginBottom: 10, }}>
                                                            <Col md>
                                                                <span style={{ fontSize: FontSize.smallMedium, fontWeight: "bold", textTransform: "capitalize" }}>{featureValue}: {selectedFeatureOptionValue}</span>
                                                            </Col>
                                                        </Row>
                                                        <Divider />
                                                        <Row style={{ fontSize: FontSize.smallMedium }}>
                                                            <Col md>
                                                                <Form.Group className="mb-3" controlId="formRegularPrice">
                                                                    <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                        Regular Price
                                                                        <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="tel"
                                                                        name="regularPrice"
                                                                        value={regularPrice || ""}
                                                                        onChange={(evnt) => handleChange(index, evnt)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md>
                                                                <Form.Group className="mb-3" controlId="formOfferPrice">
                                                                    <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                        Offer Price
                                                                        <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="tel"
                                                                        name="offerPrice"
                                                                        value={offerPrice || ""}
                                                                        onChange={(evnt) => handleChange(index, evnt)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md>
                                                                <Form.Group className="mb-3" controlId="formQuantityIncrement">
                                                                    <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                        Quantity Increment
                                                                        <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="tel"
                                                                        name="quantityIncreament"
                                                                        value={quantityIncreament || ""}
                                                                        onChange={(evnt) => handleChange(index, evnt)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md>
                                                                <Form.Group className="mb-3" controlId="formMinimumQuantity">
                                                                    <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                        Minimum Quantity
                                                                        <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="tel"
                                                                        name="minimumQuantity"
                                                                        value={minimumQuantity || ""}
                                                                        onChange={(evnt) => handleChange(index, evnt)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ fontSize: FontSize.smallMedium }}>
                                                            <Col md>
                                                                <Form.Group className="mb-3" controlId="formProductName">
                                                                    <Form.Label
                                                                        style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                        SKU Name<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        value={SKU || ""}
                                                                        name="SKU"
                                                                        onChange={(evnt) => handleChange(index, evnt)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md>
                                                                <Form.Group className="mb-3" controlId="formSku">
                                                                    <Form.Label
                                                                        style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                        Current Stock<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        value={currentStock || ""}
                                                                        name="currentStock"
                                                                        onChange={(evnt) => handleChange(index, evnt)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md>
                                                                <Form.Group className="mb-3" controlId="formSku">
                                                                    <Form.Label
                                                                        style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                        Weight<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        value={weight || ""}
                                                                        name="weight"
                                                                        onChange={(evnt) => handleChange(index, evnt)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md>
                                                                <Form.Group className="mb-3" controlId="formSku">
                                                                    <Form.Label
                                                                        style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                        Dimensions<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        value={dimension || ""}
                                                                        name="dimension"
                                                                        onChange={(evnt) => handleChange(index, evnt)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md>
                                                                {(inputFields.length >= 1) ? <Button variant="outline-danger" onClick={() => { removeInputFields(index) }}>Remove</Button> : ''}
                                                            </Col>
                                                        </Row>
                                                    </Row>

                                                </div>
                                            )
                                        })
                                        }
                                    </Row>
                                </div>

                            </AccordionTab>
                            <AccordionTab header="Product Images">
                                <div>
                                    {/* <FileUpload 
                                            name="demo[]" 
                                            url="https://primefaces.org/primereact/showcase/upload.php"
                                            onUpload={onUpload}
                                            multiple accept="image/*"
                                            maxFileSize={1000000}
                                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} /> */}

                                    <Form.Group controlId="formFile" className="mb-3" >
                                        <Form.Control
                                            ref={aRef}
                                            type="file"
                                            style={{ fontSize: 12 }}
                                            onChange={e => {
                                                setImageFile(e.target.files[0]);
                                            }}
                                            accept="image/png, image/gif, image/jpeg"
                                        />
                                    </Form.Group>
                                    {imagefile ?
                                        <Col sm={4}>
                                            <div className="border rounded" style={{ marginTop: 10, marginBottom: 10, padding: 10 }}>
                                                <Row className="align-items-center">
                                                    <Col md>
                                                        <Image
                                                            src={URL.createObjectURL(imagefile)}
                                                            height={75}
                                                            style={{ cursor: "pointer" }}
                                                            preview
                                                        />
                                                    </Col>
                                                    <Col md={2} style={{ textAlign: "center" }}>
                                                        <Tooltip target=".upload-button" style={{ fontSize: FontSize.small }} />
                                                        <span
                                                            className="upload-button"
                                                            style={{ color: Colors.blue, cursor: "pointer" }}
                                                            data-pr-tooltip="Upload Image"
                                                            onClick={() => { handleImageUpload() }}>
                                                            <i className="fa fa-upload fa-1x" aria-hidden="true" ></i>
                                                        </span>
                                                    </Col>
                                                    <Col md={2} style={{ textAlign: "center" }}>
                                                        <Tooltip target=".wrong-button" style={{ fontSize: FontSize.small }} />
                                                        <span
                                                            className="wrong-button"
                                                            data-pr-tooltip="Cancel Image"
                                                            style={{ color: Colors.red, cursor: "pointer" }}
                                                            onClick={() => { setImageFile(null); aRef.current.value = null; }}>
                                                            <i className="fa fa-times-circle fa-1x" aria-hidden="true"></i>
                                                        </span>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </Col>
                                        :
                                        null
                                    }
                                    {itemImages.length !== 0 ?
                                        <div>
                                            {itemImages.map((item, index) => {
                                                return (
                                                    <div key={"imgDoc" + index} >
                                                        <Col sm={4}>
                                                            <div className="border rounded" style={{ marginTop: 10, marginBottom: 10, padding: 10 }}>
                                                                <Row className="align-items-center">
                                                                    <Col md>
                                                                        <Image
                                                                            src={`${API_BASE}/images/products/${item.productImageLink}`}
                                                                            height={75}
                                                                            style={{ cursor: "pointer" }}
                                                                            preview
                                                                        />
                                                                    </Col>
                                                                    <Col md={2} style={{ textAlign: "center" }}>
                                                                        <Tooltip target=".delete-button" style={{ fontSize: FontSize.small }} />
                                                                        <span
                                                                            className="delete-button"
                                                                            data-pr-tooltip="Delete Image"
                                                                            style={{ color: Colors.red, cursor: "pointer" }}
                                                                            onClick={() => { handleImageDelete(item._id) }}>
                                                                            <i className="fa fa-trash fa-1x" aria-hidden="true"></i>
                                                                        </span>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                );
                                            })
                                            }
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            </AccordionTab>
                        </Accordion>

                        <Row style={{ textAlign: "center" }}>
                            <Col>
                                <Button
                                    size="md"
                                    variant="primary"
                                    onClick={() => { handleSaveProductDetails() }}
                                    style={{ marginTop: 20, marginBottom: 30, backgroundColor: Colors.darkBlue, borderColor: Colors.darkBlue, }}
                                >
                                    <span style={{ fontSize: FontSize.medium }}>Save Product Details</span>
                                </Button>
                            </Col>
                        </Row>

                    </div>

                </div>


            </div>

        </div>

    );
};

export default CreateNewProduct;