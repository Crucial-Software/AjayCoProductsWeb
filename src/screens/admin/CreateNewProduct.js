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
import { Form, Row, Col } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import { getAllCategories, getAllUnits } from "../../components/api";
import { Toast } from 'primereact/toast';



const CreateNewProduct = () => {

    let items = [
        {
            label: 'General',
            icon: 'fa fa-cogs',
            command: () => { setSelectedMenuItem("General"); }
        },
        { label: 'Quantity', icon: 'fa fa-balance-scale', selected: "Quantity", command: () => { setSelectedMenuItem("Quantity"); } },
        { label: 'Stock', icon: 'fa fa-cubes', selected: "Stock", command: () => { setSelectedMenuItem("Stock"); } },
        { label: 'Shipping', icon: 'fa fa-truck', selected: "Shipping", command: () => { setSelectedMenuItem("Shipping"); } },
        { label: 'Variants', icon: 'fa fa-arrows-alt', selected: "Variants", command: () => { setSelectedMenuItem("Variants"); } }
    ];

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
    const [selectedMenuItem, setSelectedMenuItem] = useState("General")

    useEffect(() => {
        fetchAllUnits();
        fetchAllCategories();
        setSelectedMenuItem("General");
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

    return (

        <div className="main" >

            <Sidebar />

            <div className="page-content">

                <Header />

                <h5>Create New Product</h5>
                <div style={{ padding: 20 }}>
                    <div className="accordion-demo">
                        <Toast ref={toast} position="top-center" />
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
                                <div>
                                    <Row style={{ fontSize: FontSize.smallMedium }}>
                                        <Col md="auto">
                                            <Menu model={items} />
                                        </Col>
                                        <Col md className="menuDiv">

                                            <div >
                                                {selectedMenuItem ?
                                                    <>
                                                        {selectedMenuItem === "General" ?
                                                            <p>General</p>
                                                            : null
                                                        }
                                                        {selectedMenuItem === "Quantity" ?
                                                            <p>Quantity</p>
                                                            : null
                                                        }
                                                        {selectedMenuItem === "Stock" ?
                                                            <p>Stock</p>
                                                            : null
                                                        }
                                                        {selectedMenuItem === "Shipping" ?
                                                            <p>Shipping</p>
                                                            : null
                                                        }
                                                        {selectedMenuItem === "Variants" ?
                                                            <p>Variants</p>
                                                            : null
                                                        }
                                                    </>
                                                    : null
                                                }

                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                            </AccordionTab>
                            <AccordionTab header="Product Images">
                                <p className="m-0">
                                    product images
                                </p>
                            </AccordionTab>
                        </Accordion>

                    </div>

                </div>


            </div>

        </div>

    );
};

export default CreateNewProduct;