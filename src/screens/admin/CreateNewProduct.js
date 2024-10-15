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
import { createProduct, createProductImage, createProductVariant, createProductVariantOption, deleteProductImage, deleteProductVariant, getAllCategories, getAllFeatureOptions, getAllFeatures, getAllUnits, getProductById, getProductVariantById, updateProductVariant } from "../../components/api";
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { useLocation } from 'react-router-dom';
import { API_BASE } from "../../components/urlLink";
import { Image } from 'primereact/image';
import { Tooltip } from 'primereact/tooltip';
import { ProgressSpinner } from 'primereact/progressspinner';

const CreateNewProduct = () => {

    const userLoginId = localStorage.getItem("userLoginId");

    const toast = useRef(null);

    let location = useLocation();
    const { productId } = location?.state;
    const [itemImages, setItemImages] = useState([]);

    const [imagefile, setImageFile] = useState(null);
    const [imageFileId, setImageFileId] = useState(null);
    const aRef = useRef(null);
    const [isFeature, setIsFeature] = useState(false);
    const aRefCheckbox = useRef(null);

    const [show, setShow] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const [loading, setLoading] = useState(false);
    const [pId, setPId] = useState(null);
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
    // const [inputFields, setInputFields] = useState([]);
    const [prevInputFields, setPrevInputFields] = useState([]);

    const [variantLoading, setVariantLoading] = useState(false);

    const [showVariantCard, setShowVariantCard] = useState(false);
    const [regularPrice, setRegularPrice] = useState(null);
    const [offerPrice, setOfferPrice] = useState(null);
    const [quantityIncreament, setQuantityIncreament] = useState(null);
    const [minimumQuantity, setMinimumQuantity] = useState(null);
    const [SKU, setSKU] = useState("");
    const [currentStock, setCurrentStock] = useState(null);
    const [weight, setWeight] = useState("");
    const [dimensions, setDimensions] = useState("");

    const [prevRegularPrice, setPrevRegularPrice] = useState(null);
    const [prevOfferPrice, setPrevOfferPrice] = useState(null);
    const [prevQuantityIncreament, setPrevQuantityIncreament] = useState(null);
    const [prevMinimumQuantity, setPrevMinimumQuantity] = useState(null);
    const [prevSKU, setPrevSKU] = useState("");
    const [prevCurrentStock, setPrevCurrentStock] = useState(null);
    const [prevWeight, setPrevWeight] = useState("");
    const [prevDimensions, setPrevDimensions] = useState("");
    const [prevVariantStatus, setPrevVariantStatus] = useState("");

    const [features, setFeatures] = useState([]);
    const [featureId, setFeatureId] = useState(null);
    const [featureValue, setFeatureValue] = useState("");
    const [featureOptions, setFeaturesOptions] = useState([]);
    const [selectedFeatureOptionId, setSelectedFeatureOptionId] = useState(null);
    const [selectedFeatureOptionValue, setSelectedFeatureOptionValue] = useState("");

    const [productVariantId, setProductVariantId] = useState(null);
    const [editClicked, setEditClicked] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const [type, setType] = useState("");

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

    const fetchProductDetails = async (prodId) => {

        let toInput = {
            _id: prodId,
        };

        await getProductById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (data.data[0]) {
                    let pDetails = data.data[0];
                    setPId(pDetails._id);
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
                        setPrevInputFields(pVariantData);
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
        }
        else if (selectedFeatureOptionId === null || selectedFeatureOptionId === 'Select' || selectedFeatureOptionId === "") {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please select feature option" });
        }
        else {
            setShowVariantCard(true);
        }
    }

    const clearVariantValues = () => {
        setRegularPrice(null);
        setOfferPrice(null);
        setQuantityIncreament(null);
        setMinimumQuantity(null);
        setSKU("");
        setCurrentStock(null);
        setWeight("");
        setDimensions("");
        setFeatureId(null);
        setFeatureValue("");
        setSelectedFeatureOptionId(null);
        setSelectedFeatureOptionValue("");
    }

    const clearPrevVariantValues = () => {
        setPrevRegularPrice(null);
        setPrevOfferPrice(null);
        setPrevQuantityIncreament(null);
        setPrevMinimumQuantity(null);
        setPrevSKU("");
        setPrevCurrentStock(null);
        setPrevWeight("");
        setPrevDimensions("");
        setPrevVariantStatus("");
    }

    const onCreateProductVariantFormSubmit = async (id) => {

        // console.log(
        //     " regularPrice: " + regularPrice +
        //     " offerPrice: " + offerPrice +
        //     " quantityIncreament: " + quantityIncreament +
        //     " minimumQuantity: " + minimumQuantity +
        //     " SKU: " + SKU +
        //     " currentStock: " + currentStock +
        //     " weight: " + weight +
        //     " dimensions: " + dimensions
        // )

        setVariantLoading(true);

        let toInput = {
            productID: pId,
            regularPrice: regularPrice,
            offerPrice: offerPrice,
            quantityIncreament: quantityIncreament,
            minimumQuantity: minimumQuantity,
            SKU: SKU,
            currentStock: currentStock,
            weight: weight,
            dimensions: dimensions,
            createdByid: userLoginId
        };
        await createProductVariant(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    setVariantLoading(false);
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    if (data.data._id) {
                        handleCreateProductVariantOptions(data.data._id);
                    }
                }
                if (response.status === 422) {
                    setVariantLoading(false);
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                setVariantLoading(false);
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });

    }

    const handleCreateProductVariantOptions = async (vId) => {

        setVariantLoading(true);

        let toInput = {
            productVariantID: vId,
            featureOptionID: selectedFeatureOptionId,
            createdByid: userLoginId
        };
        await createProductVariantOption(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    setVariantLoading(false);
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                    clearVariantValues();
                    setShowVariantCard(false);
                    setVariantLoading(false);
                    fetchProductDetails(pId);
                }
                if (response.status === 422) {
                    setVariantLoading(false);
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                setVariantLoading(false);
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
    }

    const handleUpdateProductVariant = async (id) => {
        setVariantLoading(true);
        let toInput = {
            _id: id,
            productID: pId,
            regularPrice: prevRegularPrice,
            offerPrice: prevOfferPrice,
            quantityIncreament: prevQuantityIncreament,
            minimumQuantity: prevMinimumQuantity,
            SKU: prevSKU,
            currentStock: prevCurrentStock,
            weight: prevWeight,
            dimensions: prevDimensions,
            updatedByid: userLoginId,
            status: prevVariantStatus
        };
        await updateProductVariant(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setVariantLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                    clearPrevVariantValues();
                    setEditIndex(null);
                    setEditClicked(false);
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                setVariantLoading(false);
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
    }

    const handleEditProductVariant = async (id) => {
        let toInput = {
            _id: id,
        };
        await getProductVariantById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                setPrevRegularPrice(data.data.regularPrice);
                setPrevOfferPrice(data.data.offerPrice);
                setPrevQuantityIncreament(data.data.quantityIncreament);
                setPrevMinimumQuantity(data.data.minimumQuantity);
                setPrevSKU(data.data.SKU);
                setPrevCurrentStock(data.data.currentStock);
                setPrevWeight(data.data.weight);
                setPrevDimensions(data.data.dimensions);
                setPrevVariantStatus(data.data.status);
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
    }

    const handleImageUpload = async () => {

        setImageLoading(true);

        const formData = new FormData();

        formData.append('productImageLink', imagefile)
        formData.append('productID', pId);
        formData.append('status', status);
        formData.append('isFeature', isFeature);
        formData.append('createdByid', userLoginId);

        await createProductImage(formData)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setImageLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                    setImageFile(null);
                    aRef.current.value = null;
                    aRefCheckbox.current.checked = false;
                    const newImage = data.data;
                    setItemImages([{
                        "_id": newImage._id,
                        "productImageLink": newImage.productImageLink,
                        "productID": newImage.productID._id,
                        "isFeature": newImage.isFeature,
                        "createDate": newImage.createDate,
                        "updatedDate": newImage.updatedDate,
                        "createdByid": newImage.createdByid,
                        "updatedByid": newImage.updatedByid,
                        "status": newImage.status,
                        "__v": newImage.__v
                    }, ...itemImages]);
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                setImageLoading(false);
                toast.current.show({ life: 3000, severity: 'error', summary: error });
                setImageFile(null);
                aRef.current.value = null;
            });

    }

    const handleDelete = (iId, type) => {
        setShow(true);
        setType(type);
        if (type === "image") {
            setImageFileId(iId);
        } else if (type === "variant") {
            setProductVariantId(iId);
        }
    }

    const handleThisImageDelete = async () => {
        setImageLoading(true);
        let toInput = {
            _id: imageFileId,
        };
        await deleteProductImage(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setImageLoading(false);
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
                setImageLoading(false);
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
    }

    const handleThisProductVariantDelete = async () => {
        setVariantLoading(true);
        let toInput = {
            _id: productVariantId,
        };
        await deleteProductVariant(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setVariantLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                    const newArray = prevInputFields.filter((item, index) => item._id !== productVariantId);
                    setPrevInputFields(newArray);
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                setVariantLoading(false);
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });
    }

    const onSaveProductFormSubmit = async (event) => {

        event.preventDefault();

        if (unitId === null || unitId === 'Select' || unitId === "") {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please select unit" });
        }
        else if (categoryId === null || categoryId === 'Select' || categoryId === "") {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please select category" });
        } else {

            setLoading(true);

            let toInput = {
                createdByid: userLoginId,
                productName: productName,
                productDesc: productDescription,
                productTags: tags,
                unitID: unitId,
                catID: categoryId,
                iGSTper: parseInt(iGSTper),
                sGSTper: parseInt(sGSTper),
                cGSTper: parseInt(cGSTper),
                hsnCode: hsnCode
            };
            await createProduct(toInput)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    setLoading(false);
                    if (response.ok) {
                        toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                        let prodDetails = data.data;
                        setPId(prodDetails._id);
                        setProductName(prodDetails.productName);
                        setProductDescription(prodDetails.productDesc);
                        setTags(prodDetails.productTags);
                        setUnitId(prodDetails.unitID._id);
                        setCategoryId(prodDetails.catID._id);
                        setHsnCode(prodDetails.hsnCode);
                        setCGSTper(prodDetails.cGSTper);
                        setSGSTper(prodDetails.sGSTper);
                        setIGSTper(prodDetails.iGSTper);
                        setStatus(prodDetails.status);
                    }
                    if (response.status === 422) {
                        toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                    }
                })
                .catch(error => {
                    setLoading(false);
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                });
        }


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
                        <Modal.Title style={{ fontSize: FontSize.mediumLarge, textTransform: "capitalize" }}>Delete Product {type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: FontSize.smallMedium }}>Are you sure you want to delete this product {type}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)} style={{ fontSize: FontSize.smallMedium }}>No</Button>
                        <Button variant="primary" onClick={() => {
                            setShow(false);
                            if (type === "image") {
                                handleThisImageDelete();
                            } else if (type === "variant") {
                                handleThisProductVariantDelete();
                            }
                        }} style={{ fontSize: FontSize.smallMedium }}>Yes</Button>
                    </Modal.Footer>
                </Modal>

                <div style={{ padding: 20 }}>
                    <div className="accordion-demo">

                        <Accordion activeIndex={0}>
                            <AccordionTab header="Product Details">
                                <div>
                                    <Form onSubmit={onSaveProductFormSubmit}>
                                        {loading ?
                                            <ProgressSpinner style={{ width: '25px', height: '25px' }} />
                                            :
                                            <>
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

                                                <Row>
                                                    <Col>
                                                        <Button
                                                            size="sm"
                                                            variant="primary"
                                                            type="submit"
                                                            style={{ marginTop: 10, marginBottom: 10, backgroundColor: Colors.darkBlue, borderColor: Colors.darkBlue, }}
                                                        >
                                                            <span style={{}}>Save Product</span>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                    </Form>
                                </div>
                            </AccordionTab>
                        </Accordion>

                        {pId && pId !== null ?
                            <div>
                                <Accordion activeIndex={0}>
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
                                                {variantLoading ?
                                                    <ProgressSpinner style={{ width: '25px', height: '25px' }} />
                                                    :
                                                    <>
                                                        {showVariantCard ?
                                                            <div className="border rounded" style={{ marginTop: 10, padding: 10, backgroundColor: "#F0F0F0" }}>
                                                                <Row>
                                                                    <Row style={{ fontSize: FontSize.smallMedium, marginBottom: 10, }}>
                                                                        <Col md>
                                                                            <span style={{ fontSize: FontSize.smallMedium, fontWeight: "bold", textTransform: "capitalize" }}>{featureValue}: {selectedFeatureOptionValue}</span>
                                                                        </Col>
                                                                    </Row>
                                                                    <Divider />
                                                                    <Form onSubmit={onCreateProductVariantFormSubmit}>
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
                                                                                        name="offerPrice"
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
                                                                                        name="quantityIncreament"
                                                                                        value={quantityIncreament || ""}
                                                                                        onChange={e => { setQuantityIncreament(e.target.value.replace(/\D/g, "")) }}
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
                                                                                        onChange={e => { setMinimumQuantity(e.target.value.replace(/\D/g, "")) }}
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
                                                                                        onChange={e => { setSKU(e.target.value) }}
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
                                                                                        onChange={e => { setCurrentStock(e.target.value.replace(/\D/g, "")) }}
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
                                                                                        onChange={e => { setWeight(e.target.value) }}
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
                                                                                        value={dimensions || ""}
                                                                                        name="dimensions"
                                                                                        onChange={e => { setDimensions(e.target.value) }}
                                                                                        required
                                                                                    />
                                                                                </Form.Group>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md>
                                                                                <Button size="sm" variant="outline-primary" type="submit">Create</Button>
                                                                                <Button size="sm" variant="outline-secondary" onClick={() => { setShowVariantCard(false); clearVariantValues(); }}>Cancel</Button>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form>

                                                                </Row>

                                                            </div>
                                                            : null
                                                        }

                                                        {prevInputFields.map((data, index) => {
                                                            return (
                                                                <div key={index} className="border rounded" style={{ marginTop: 10, padding: 10, backgroundColor: "#F0F0F0" }}>
                                                                    <Row>
                                                                        <Row style={{ fontSize: FontSize.smallMedium, marginBottom: 10, }}>
                                                                            <Col md>
                                                                                <span style={{ fontSize: FontSize.smallMedium, fontWeight: "bold", textTransform: "capitalize" }}>
                                                                                    {data.variantOptions.length !== 0 ?
                                                                                        <>
                                                                                            {data.variantOptions[0].featureOptionID.featureMasterID.featureName}
                                                                                            :
                                                                                            {data.variantOptions[0].featureOptionID.featureOptionName}
                                                                                        </>
                                                                                        : null
                                                                                    }

                                                                                </span>
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
                                                                                    {editIndex === index ?
                                                                                        <Form.Control
                                                                                            type="tel"
                                                                                            name="regularPrice"
                                                                                            value={prevRegularPrice || ""}
                                                                                            onChange={e => { setPrevRegularPrice(e.target.value.replace(/\D/g, "")) }}
                                                                                            required
                                                                                        />
                                                                                        :
                                                                                        <Form.Text style={{ fontSize: FontSize.small }}>
                                                                                            {data.regularPrice}
                                                                                        </Form.Text>
                                                                                    }
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col md>
                                                                                <Form.Group className="mb-3" controlId="formOfferPrice">
                                                                                    <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                        Offer Price
                                                                                        <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                                    </Form.Label>
                                                                                    {editIndex === index ?
                                                                                        <Form.Control
                                                                                            type="tel"
                                                                                            name="offerPrice"
                                                                                            value={prevOfferPrice || ""}
                                                                                            onChange={e => { setPrevOfferPrice(e.target.value.replace(/\D/g, "")) }}
                                                                                            required
                                                                                        />
                                                                                        :
                                                                                        <Form.Text style={{ fontSize: FontSize.small }}>
                                                                                            {data.offerPrice}
                                                                                        </Form.Text>
                                                                                    }
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col md>
                                                                                <Form.Group className="mb-3" controlId="formQuantityIncrement">
                                                                                    <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                        Quantity Increment
                                                                                        <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                                    </Form.Label>
                                                                                    {editIndex === index ?
                                                                                        <Form.Control
                                                                                            type="tel"
                                                                                            name="quantityIncreament"
                                                                                            value={prevQuantityIncreament || ""}
                                                                                            onChange={e => { setPrevQuantityIncreament(e.target.value.replace(/\D/g, "")) }}
                                                                                            required
                                                                                        />
                                                                                        :
                                                                                        <Form.Text style={{ fontSize: FontSize.small }}>
                                                                                            {data.quantityIncreament}
                                                                                        </Form.Text>
                                                                                    }
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col md>
                                                                                <Form.Group className="mb-3" controlId="formMinimumQuantity">
                                                                                    <Form.Label style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                        Minimum Quantity
                                                                                        <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                                    </Form.Label>
                                                                                    {editIndex === index ?
                                                                                        <Form.Control
                                                                                            type="tel"
                                                                                            name="minimumQuantity"
                                                                                            value={prevMinimumQuantity || ""}
                                                                                            onChange={e => { setPrevMinimumQuantity(e.target.value.replace(/\D/g, "")) }}
                                                                                            required
                                                                                        />
                                                                                        :
                                                                                        <Form.Text style={{ fontSize: FontSize.small }}>
                                                                                            {data.minimumQuantity}
                                                                                        </Form.Text>
                                                                                    }
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
                                                                                    {editIndex === index ?
                                                                                        <Form.Control
                                                                                            value={prevSKU || ""}
                                                                                            name="SKU"
                                                                                            onChange={e => { setPrevSKU(e.target.value) }}
                                                                                            required
                                                                                        />
                                                                                        :
                                                                                        <Form.Text style={{ fontSize: FontSize.small }}>
                                                                                            {data.SKU}
                                                                                        </Form.Text>
                                                                                    }
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col md>
                                                                                <Form.Group className="mb-3" controlId="formSku">
                                                                                    <Form.Label
                                                                                        style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                        Current Stock
                                                                                        <Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                                    </Form.Label>
                                                                                    {editIndex === index ?
                                                                                        <Form.Control
                                                                                            value={prevCurrentStock || ""}
                                                                                            name="currentStock"
                                                                                            onChange={e => { setPrevCurrentStock(e.target.value.replace(/\D/g, "")) }}
                                                                                            required
                                                                                        />
                                                                                        :
                                                                                        <Form.Text style={{ fontSize: FontSize.small }}>
                                                                                            {data.currentStock}
                                                                                        </Form.Text>
                                                                                    }
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col md>
                                                                                <Form.Group className="mb-3" controlId="formSku">
                                                                                    <Form.Label
                                                                                        style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                        Weight<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                                    </Form.Label>
                                                                                    {editIndex === index ?
                                                                                        <Form.Control
                                                                                            value={prevWeight || ""}
                                                                                            name="weight"
                                                                                            onChange={e => { setPrevWeight(e.target.value) }}
                                                                                            required
                                                                                        />
                                                                                        :
                                                                                        <Form.Text style={{ fontSize: FontSize.small }}>
                                                                                            {data.weight}
                                                                                        </Form.Text>
                                                                                    }
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col md>
                                                                                <Form.Group className="mb-3" controlId="formSku">
                                                                                    <Form.Label
                                                                                        style={{ fontSize: FontSize.smallMedium, fontWeight: "bold" }}>
                                                                                        Dimensions<Asterisk size={6} style={{ marginBottom: 5, marginLeft: 5, color: Colors.red }} />
                                                                                    </Form.Label>
                                                                                    {editIndex === index ?
                                                                                        <Form.Control
                                                                                            value={prevDimensions || ""}
                                                                                            name="dimensions"
                                                                                            onChange={e => { setPrevDimensions(e.target.value) }}
                                                                                            required
                                                                                        />
                                                                                        :
                                                                                        <Form.Text style={{ fontSize: FontSize.small }}>
                                                                                            {data.dimensions}
                                                                                        </Form.Text>
                                                                                    }
                                                                                </Form.Group>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md>
                                                                                {editIndex === index ?
                                                                                    <>
                                                                                        <Button size="sm" variant="outline-primary" onClick={() => { handleUpdateProductVariant(data._id); }}>Update</Button>
                                                                                        <Button size="sm" variant="outline-secondary" onClick={() => { setEditClicked(false); setEditIndex(null); clearPrevVariantValues(); }}>Cancel</Button>
                                                                                    </>
                                                                                    :
                                                                                    <Button size="sm" variant="outline-primary" onClick={() => { handleEditProductVariant(data._id); setEditClicked(true); setEditIndex(index); }}>Edit</Button>
                                                                                }
                                                                                {(prevInputFields.length >= 1) ? <Button size="sm" variant="outline-danger" onClick={() => { handleDelete(data._id, "variant") }}>Delete</Button> : ''}
                                                                            </Col>
                                                                        </Row>
                                                                    </Row>

                                                                </div>
                                                            )
                                                        })
                                                        }
                                                    </>
                                                }
                                            </Row>
                                        </div>

                                    </AccordionTab>
                                </Accordion>

                                <Accordion activeIndex={0}>
                                    <AccordionTab header="Product Images">
                                        <div>
                                            <Row className="align-items-center">
                                                <Col md>
                                                    <Form.Group controlId="formFile" >
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
                                                </Col>
                                                <Col md={2}>
                                                    <Form.Check
                                                        ref={aRefCheckbox}
                                                        style={{ fontSize: 12, fontWeight: "bold" }}
                                                        aria-label="option 1"
                                                        type="checkbox"
                                                        label="Is Feature"
                                                        onClick={(e) => { setIsFeature(e.target.checked); }}
                                                    />
                                                </Col>
                                            </Row>

                                            {imageLoading ?
                                                <ProgressSpinner style={{ width: '25px', height: '25px' }} />
                                                :
                                                <>
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
                                                                                    <Col>
                                                                                        <Image
                                                                                            src={`${API_BASE}/images/products/${item.productImageLink}`}
                                                                                            height={75}
                                                                                            style={{ cursor: "pointer" }}
                                                                                            preview
                                                                                        />
                                                                                    </Col>
                                                                                    <Col style={{ fontSize: FontSize.small, marginLeft: 10, marginRight: 10 }}>
                                                                                        {item.isFeature ? "Feature Image" : null}
                                                                                    </Col>
                                                                                    <Col md={2} style={{ textAlign: "center" }}>
                                                                                        <Tooltip target=".delete-button" style={{ fontSize: FontSize.small }} />
                                                                                        <span
                                                                                            className="delete-button"
                                                                                            data-pr-tooltip="Delete Image"
                                                                                            style={{ color: Colors.red, cursor: "pointer" }}
                                                                                            onClick={() => { handleDelete(item._id, "image") }}>
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
                                                </>
                                            }
                                        </div>
                                    </AccordionTab>
                                </Accordion>
                            </div>
                            : null
                        }

                    </div>

                </div>


            </div>

        </div >

    );
};

export default CreateNewProduct;