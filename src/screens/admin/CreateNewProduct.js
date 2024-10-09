import React, { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Colors, FontSize } from "../../common/ConstantStyles";
import { Editor } from 'primereact/editor';
import { Menu } from 'primereact/menu';
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import { getAllCategories, getAllFeatureOptions, getAllFeatures, getAllUnits } from "../../components/api";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { MultiSelect } from 'primereact/multiselect';

const CreateNewProduct = () => {

    // let items = [
    //     { label: 'Quantity', icon: 'fa fa-balance-scale', selected: "Quantity", command: () => { setSelectedMenuItem("Quantity"); } },
    //     { label: 'Stock', icon: 'fa fa-cubes', selected: "Stock", command: () => { setSelectedMenuItem("Stock"); } },
    //     { label: 'Shipping', icon: 'fa fa-truck', selected: "Shipping", command: () => { setSelectedMenuItem("Shipping"); } },
    //     { label: 'Attributes', icon: 'fa fa-file-text', selected: "Attributes", command: () => { setSelectedMenuItem("Attributes"); } },
    //     { label: 'Variants', icon: 'fa fa-arrows-alt', selected: "Variants", command: () => { setSelectedMenuItem("Variants"); } }
    // ];

    const toast = useRef(null);
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
    // const [selectedMenuItem, setSelectedMenuItem] = useState("");
    const [SKU, setSKU] = useState("");
    const [currentStock, setCurrentStock] = useState("");
    const [regularPrice, setRegularPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [quantityIncreament, setQuantityIncreament] = useState(null);
    const [minimumQuantity, setMinimumQuantity] = useState(null);
    const [weight, setWeight] = useState("");
    const [dimension, setDimension] = useState("");
    const [features, setFeatures] = useState([]);
    const [featureId, setFeatureId] = useState(null);
    const [featureOptions, setFeaturesOptions] = useState([]);
    const [selectedFeatureOptions, setSelectedFeatureOptions] = useState("");

    useEffect(() => {
        fetchAllUnits();
        fetchAllCategories();
        fetchAllFeatures();
        fetchAllFeatureOptions();
    }, [])

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

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    const handleEnterDetails = () => {
        if (featureId === null || featureId === 'Select' || featureId === "") {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please select feature" });
        } else if (selectedFeatureOptions === null || selectedFeatureOptions === 'Select' || selectedFeatureOptions === "") {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please select feature option" });
        } else {
            console.log("feature Id: " + featureId + " selected feature option: " + selectedFeatureOptions);
        }
    }

    return (

        <div className="main" >

            <Sidebar />

            <div className="page-content">

                <Toast ref={toast} position="top-center" />

                <Header />

                <h5>Create New Product</h5>
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
                                                    value={cGSTper || ""}
                                                    onChange={e => { setCGSTper(e.target.value) }}
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
                                                    value={sGSTper || ""}
                                                    onChange={e => { setSGSTper(e.target.value) }}
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
                                                    value={iGSTper || ""}
                                                    onChange={e => { setIGSTper(e.target.value) }}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </div>

                            </AccordionTab>
                            <AccordionTab header="Product Variant Details">

                                {/* <div>
                                    <Row style={{ fontSize: FontSize.smallMedium }}>
                                        <Col md="auto">
                                            <Menu model={items} />
                                        </Col>
                                        <Col md className="menuDiv">
                                            <div >
                                                {selectedMenuItem ?
                                                    <>
                                                        {selectedMenuItem === "Quantity" ?
                                                            <div style={{ padding: 20 }}>
                                                                <Row style={{ fontSize: FontSize.smallMedium }}>
                                                                    <Col md={6}>
                                                                        <Form.Group as={Row} className="mb-3" controlId="formMinimumQuantity">
                                                                            <Form.Label column sm="4" style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                Minimum Quantity
                                                                                <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                            </Form.Label>
                                                                            <Col sm="8">
                                                                                <Form.Control
                                                                                    type="tel"
                                                                                    value={minimumQuantity || ""}
                                                                                    onChange={e => { setMinimumQuantity(e.target.value.replace(/\D/g, "")) }}
                                                                                    required
                                                                                />
                                                                            </Col>
                                                                        </Form.Group>
                                                                        <Form.Group as={Row} className="mb-3" controlId="formQuantityIncrement">
                                                                            <Form.Label column sm="4" style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                Quantity Increment
                                                                                <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                            </Form.Label>
                                                                            <Col sm="8">
                                                                                <Form.Control
                                                                                    type="tel"
                                                                                    value={quantityIncreament || ""}
                                                                                    onChange={e => { setQuantityIncreament(e.target.value.replace(/\D/g, "")) }}
                                                                                    required
                                                                                />
                                                                            </Col>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            : null
                                                        }
                                                        {selectedMenuItem === "Stock" ?
                                                            <div style={{ padding: 20 }}>
                                                                <Row style={{ fontSize: FontSize.smallMedium }}>
                                                                    <Col md={6}>
                                                                        <Form.Group as={Row} className="mb-3" controlId="formSku">
                                                                            <Form.Label column sm="4" style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                SKU
                                                                                <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                            </Form.Label>
                                                                            <Col sm="8">
                                                                                <Form.Control
                                                                                    value={SKU || ""}
                                                                                    onChange={e => { setSKU(e.target.value) }}
                                                                                    required
                                                                                />
                                                                            </Col>
                                                                        </Form.Group>
                                                                        <Form.Group as={Row} className="mb-3" controlId="formSku">
                                                                            <Form.Label column sm="4" style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                Current Stock
                                                                                <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                            </Form.Label>
                                                                            <Col sm="8">
                                                                                <Form.Control
                                                                                    value={currentStock || ""}
                                                                                    onChange={e => { setCurrentStock(e.target.value) }}
                                                                                    required
                                                                                />
                                                                            </Col>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            : null
                                                        }
                                                        {selectedMenuItem === "Shipping" ?
                                                            <div style={{ padding: 20 }}>
                                                                <Row style={{ fontSize: FontSize.smallMedium }}>
                                                                    <Col md={6}>
                                                                        <Form.Group as={Row} className="mb-3" controlId="formWeight">
                                                                            <Form.Label column sm="4" style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                Weight
                                                                                <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                            </Form.Label>
                                                                            <Col sm="8">
                                                                                <Form.Control
                                                                                    value={weight || ""}
                                                                                    onChange={e => { setWeight(e.target.value) }}
                                                                                    required
                                                                                />
                                                                            </Col>
                                                                        </Form.Group>
                                                                        <Form.Group as={Row} className="mb-3" controlId="formWeight">
                                                                            <Form.Label column sm="4" style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                Dimensions
                                                                                <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                            </Form.Label>
                                                                            <Col sm="8">
                                                                                <Form.Control
                                                                                    value={dimension || ""}
                                                                                    onChange={e => { setDimension(e.target.value) }}
                                                                                    required
                                                                                />
                                                                            </Col>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            : null
                                                        }
                                                        {selectedMenuItem === "Variants" ?
                                                            <div style={{ padding: 20 }}>
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
                                                                                onChange={e => { setFeatureId(e.target.value); }}>
                                                                                <option value="Select">- Select Feature -</option>
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
                                                                            <Row style={{paddingLeft: 10, paddingRight: 10}}>
                                                                            <MultiSelect
                                                                                value={selectedFeatureOptions}
                                                                                options={featureOptions}
                                                                                onChange={(e) => setSelectedFeatureOptions(e.value)}
                                                                                optionLabel="featureOptionName"
                                                                                placeholder="- Select Feature Option -"
                                                                                maxSelectedLabels={10} />
                                                                            </Row>
                                                                           
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline-primary"
                                                                            type="submit"
                                                                            onClick={() => { console.log(selectedFeatureOptions);}}
                                                                            style={{ marginTop: 30, backgroundColor: Colors.darkBlue, borderColor: Colors.darkBlue, }}
                                                                        >
                                                                            Save Attributes
                                                                        </Button>
                                                                    </Col>
                                                                </Row>

                                                            </div>
                                                            : null
                                                        }
                                                    </>
                                                    : null
                                                }

                                            </div>
                                        </Col>
                                    </Row>

                                </div>  */}

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
                                                    onChange={e => { setFeatureId(e.target.value); }}>
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
                                                    value={selectedFeatureOptions || ""}
                                                    onChange={e => { setSelectedFeatureOptions(e.target.value); }}>
                                                    <option value="Select">- Select -</option>
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
                                        <Card style={{ padding: 0 }}>
                                            <Card.Header as="h6" style={{ backgroundColor: Colors.grey }}>Size: {selectedFeatureOptions}</Card.Header>
                                            <Card.Body>
                                                <Row style={{ fontSize: FontSize.smallMedium }}>
                                                    <Col md>
                                                        <Form.Group className="mb-3" controlId="formRegularPrice">
                                                            <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                Regular Price
                                                                <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="tel"
                                                                value={regularPrice || ""}
                                                                onChange={e => { setRegularPrice(e.target.value.replace(/\D/g, "")) }}
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
                                                                value={offerPrice || ""}
                                                                onChange={e => { setOfferPrice(e.target.value.replace(/\D/g, "")) }}
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
                                                                value={quantityIncreament || ""}
                                                                onChange={e => { setQuantityIncreament(e.target.value.replace(/\D/g, "")) }}
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
                                                                value={quantityIncreament || ""}
                                                                onChange={e => { setQuantityIncreament(e.target.value.replace(/\D/g, "")) }}
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
                                                                onChange={e => { setSKU(e.target.value) }}
                                                                required
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md>
                                                        <Form.Group as={Row} className="mb-3" controlId="formSku">
                                                            <Form.Label
                                                                style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                Current Stock<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                            </Form.Label>
                                                            <Form.Control
                                                                value={currentStock || ""}
                                                                onChange={e => { setCurrentStock(e.target.value) }}
                                                                required
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md>
                                                        <Form.Group as={Row} className="mb-3" controlId="formSku">
                                                            <Form.Label
                                                                style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                Weight<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                            </Form.Label>
                                                            <Form.Control
                                                                value={weight || ""}
                                                                onChange={e => { setWeight(e.target.value) }}
                                                                required
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md>
                                                        <Form.Group as={Row} className="mb-3" controlId="formSku">
                                                            <Form.Label
                                                                style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                Dimensions<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                            </Form.Label>
                                                            <Form.Control
                                                                value={dimension || ""}
                                                                onChange={e => { setDimension(e.target.value) }}
                                                                required
                                                            />
                                                        </Form.Group>
                                                    </Col>


                                                </Row>


                                                <Button variant="primary">Save Variant</Button>
                                            </Card.Body>
                                        </Card>
                                    </Row>
                                </div>

                            </AccordionTab>
                            <AccordionTab header="Product Images">
                                <div>
                                    <div className="card">
                                        <FileUpload name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000}
                                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                                    </div>
                                </div>
                            </AccordionTab>
                        </Accordion>

                    </div>

                </div>


            </div>

        </div>

    );
};

export default CreateNewProduct;