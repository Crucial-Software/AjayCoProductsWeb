import React, { useState, useEffect, useRef  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Button, Spinner, Modal } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { addNewFeature, deleteFeature, getAllFeatures, getFeatureById, updateFeature } from "../../components/api";
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import { Toast } from 'primereact/toast';

const ManageFeatureMaster = () => {

    const toast = useRef(null);
    const userLoginId = localStorage.getItem("userLoginId");
    const [features, setFeatures] = useState([]);
    const [featureName, setFeatureName] = useState("");
    const [featureId, setFeatureId] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchAllFeatures()
    }, [])

    const fetchAllFeatures = async () => {
        setLoading(true);
        await getAllFeatures()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
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
                setLoading(false);
            });

    }

    const handleEditClick = async (e, id) => {

        e.preventDefault();

        setLoading(true);

        let toInput = {
            _id: id,
        };

        await getFeatureById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setFeatureName(data.data.featureName);
                setFeatureId(data.data._id);
                setStatus(data.data.status);
                setLoading(false);
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
                setLoading(false);
            });
    }

    const onFeatureFormSubmit = async (event) => {
        event.preventDefault();

        if (!featureName) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please enter feature name" });
        } else {

            setLoading(true);

            if (featureId) {
                let toInput = {
                    _id: featureId,
                    featureName: featureName,
                    updatedByid: userLoginId,
                    status: status
                };
                await updateFeature(toInput)
                    .then(async response => {
                        const isJson = response.headers.get('content-type')?.includes('application/json');
                        const data = isJson && await response.json();
                        setLoading(false);
                        if (!response.ok) {
                            const error = (data && data.message) || response.status;
                            toast.current.show({ life: 3000, severity: 'error', summary: error });
                        } else {
                            toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                            clearData();
                            fetchAllFeatures();
                        }
                        if (response.status === 422) {
                            toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                        }
                    })
                    .catch(error => {
                        toast.current.show({ life: 3000, severity: 'error', summary: error });
                        setLoading(false);
                        clearData();
                    });
            } else {
                let toInput = {
                    featureName: featureName,
                    createdByid: userLoginId
                };
                await addNewFeature(toInput)
                    .then(async response => {
                        const isJson = response.headers.get('content-type')?.includes('application/json');
                        const data = isJson && await response.json();
                        setLoading(false);
                        if (!response.ok) {
                            const error = (data && data.message) || response.status;
                            toast.current.show({ life: 3000, severity: 'error', summary: error });
                        } else {
                            toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                            clearData();
                            fetchAllFeatures();
                        }
                        if (response.status === 422) {
                            toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                        }
                    })
                    .catch(error => {
                        toast.current.show({ life: 3000, severity: 'error', summary: error });
                        setLoading(false);
                        clearData();
                    });
            }

        }
    }

    const handleDeleteClick = (e, id) => {
        setShow(true);
        setFeatureId(id);
    }

    const deleteThisFeature = async () => {
        setLoading(true);
        let toInput = {
            _id: featureId,
        };
        await deleteFeature(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    toast.current.show({ life: 3000, severity: 'success', summary: data.message });
                    clearData();
                    fetchAllFeatures();
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
                setLoading(false);
                clearData();
            });
    }

    const clearData = () => {
        setFeatureName("");
        setFeatureId(null);
        setStatus("");
    }

    const data = () => {
        return {
            columns: [
                { label: '#', field: 'srno', },
                { label: 'Name', field: 'name', },
                { label: 'Status', field: 'status', },
                { label: '', field: 'edit', },
                { label: '', field: 'delete', },

            ],
            rows: [...features.map((data, i) => (
                {
                    srno: i + 1,
                    name: data.featureName,
                    status: data.status,
                    edit: <span onClick={(e) => handleEditClick(e, data._id)}>
                        <Button variant="primary" type="submit" style={{ fontSize: FontSize.smallMedium }} size="sm">
                            Edit
                        </Button>
                    </span>,
                    delete: <span onClick={(e) => handleDeleteClick(e, data._id)}>
                        <Button variant="danger" type="submit" style={{ fontSize: FontSize.smallMedium }} size="sm">
                            Delete
                        </Button>
                    </span>
                }
            ))
            ],
        };
    };

    return (

        <div className="main" >

            <Sidebar />

            <div className="page-content">

                <Header />

                <h5>Manage Feature Master</h5>

                <div className="table-content">

                <Toast ref={toast} position="top-center" />

                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: FontSize.mediumLarge }}>Delete Feature</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: FontSize.smallMedium }}>Are you sure you want to delete this feature?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)} style={{ fontSize: FontSize.smallMedium }}>No</Button>
                            <Button variant="primary" onClick={() => {
                                setShow(false);
                                deleteThisFeature();
                            }} style={{ fontSize: FontSize.smallMedium }}>Yes</Button>
                        </Modal.Footer>
                    </Modal>

                    <Form onSubmit={onFeatureFormSubmit} >

                        <Row style={{ fontSize: FontSize.smallMedium }}>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterName">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Feature Name</Form.Label>
                                    <Form.Control
                                        style={{ fontSize: FontSize.smallMedium }}
                                        value={featureName || ""}
                                        onChange={e => { setFeatureName(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            {featureId ?
                                <Col sm={2}>
                                    <Form.Group className="mb-3" controlId="formEnterStatus">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            style={{ fontSize: FontSize.smallMedium }}
                                            value={status || ""}
                                            onChange={e => { setStatus(e.target.value) }}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                : null
                            }

                            <Col sm={2} >
                                <Form.Group className="mb-3" controlId="formEnterFeatureMaster">
                                    {featureId ?
                                        <Button variant="primary" type="submit" style={{ marginTop: 25, fontSize: FontSize.smallMedium, backgroundColor: Colors.darkBlue, borderColor: Colors.darkBlue }}> Update </Button>
                                        :
                                        <Button variant="primary" type="submit" style={{ marginTop: 25, fontSize: FontSize.smallMedium, backgroundColor: Colors.darkBlue, borderColor: Colors.darkBlue }}> Add </Button>
                                    }

                                </Form.Group>
                            </Col>

                        </Row>

                    </Form>

                    <CDBCard style={{ padding: 20, fontSize: FontSize.smallMedium, color: "grey" }}>
                        <CDBCardBody>
                            {loading ? (
                                <div style={{ textAlign: "center" }}><Spinner animation="border" size="sm" variant="primary" /></div>
                            ) :
                                <CDBDataTable
                                    responsive
                                    noRecordsFoundLabel="No Records Found"
                                    noBottomColumn={true}
                                    hover
                                    entriesOptions={[10, 25, 50, 100, 200, 500]}
                                    entries={10}
                                    pagesAmount={4}
                                    data={data()}
                                />
                            }
                        </CDBCardBody>
                    </CDBCard>

                </div>

            </div>

        </div>

    );
};

export default ManageFeatureMaster;