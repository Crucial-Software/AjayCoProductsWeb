import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Button, Spinner, Modal } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import { addNewFeatureOption, deleteFeatureOption, getAllFeatureOptions, getAllFeatures, getFeatureOptionById, updateFeatureOption } from "../../components/api";

const ManageFeatureOptions = () => {

    const userLoginId = localStorage.getItem("userLoginId");
    const [featureOptions, setFeatureOptions] = useState([]);
    const [featureMaster, setFeatureMaster] = useState([]);
    const [featureOptionName, setFeatureOptionName] = useState("");
    const [featureOptionsId, setFeatureOptionsId] = useState(null);
    const [featureMasterId, setFeatureMasterId] = useState(null);
    const [status, setStatus] = useState("");
    const [updateMessage, setUpdateMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchAllFeatureMaster();
        fetchAllFeatureOptions()
    }, [])

    const fetchAllFeatureMaster = async () => {
        setLoading(true);
        await getAllFeatures()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                } else {
                    setFeatureMaster(data.data);
                }
                if (response.status === 422) {
                    setUpdateMessage(<span style={{ color: Colors.red }}>{data.error.undefined}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                }
            })
            .catch(error => {
                setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setUpdateMessage(""), 3000);
                setLoading(false);
            });
    }

    const fetchAllFeatureOptions = async () => {
        setLoading(true);
        await getAllFeatureOptions()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                } else {
                    setFeatureOptions(data.data);
                }
                if (response.status === 422) {
                    setUpdateMessage(<span style={{ color: Colors.red }}>{data.error.undefined}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                }
            })
            .catch(error => {
                setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setUpdateMessage(""), 3000);
                setLoading(false);
            });
    }

    const handleEditClick = async (e, id) => {

        e.preventDefault();

        setLoading(true);

        let toInput = {
            _id: id,
        };

        await getFeatureOptionById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setFeatureOptionName(data.data.featureOptionName);
                setFeatureOptionsId(data.data._id);
                setFeatureMasterId(data.data.featureMasterID);
                setStatus(data.data.status);
                setLoading(false);
            })
            .catch(error => {
                setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setUpdateMessage(""), 3000);
                setLoading(false);
            });
    }

    const onFeatureOptionsFormSubmit = async (event) => {
        event.preventDefault();

        if (featureMasterId === null || featureMasterId === 'Select' || featureMasterId === "") {
            setUpdateMessage(<span style={{ color: Colors.red }}>Please select feature</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
        }
        else if (!featureOptionName) {
            setUpdateMessage(<span style={{ color: Colors.red }}>Please enter feature option</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
        } else {

            setLoading(true);

            if (featureOptionsId) {
                let toInput = {
                    _id: featureOptionsId,
                    featureOptionName: featureOptionName,
                    featureMasterID: featureMasterId,
                    updatedByid: userLoginId,
                    status: status
                };
                await updateFeatureOption(toInput)
                    .then(async response => {
                        const isJson = response.headers.get('content-type')?.includes('application/json');
                        const data = isJson && await response.json();
                        setLoading(false);
                        if (!response.ok) {
                            const error = (data && data.message) || response.status;
                            setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                            setTimeout(() => setUpdateMessage(""), 3000);
                        } else {
                            setUpdateMessage(<span style={{ color: Colors.green }}>{data.message}</span>);
                            setTimeout(() => setUpdateMessage(""), 3000);
                            clearData();
                            fetchAllFeatureOptions();
                        }
                        if (response.status === 422) {
                            setUpdateMessage(<span style={{ color: Colors.red }}>{data.error.undefined}</span>);
                            setTimeout(() => setUpdateMessage(""), 3000);
                        }
                    })
                    .catch(error => {
                        setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                        setTimeout(() => setUpdateMessage(""), 3000);
                        setLoading(false);
                        clearData();
                    });
            } else {
                let toInput = {
                    featureOptionName: featureOptionName,
                    featureMasterID: featureMasterId,
                    createdByid: userLoginId
                };
                await addNewFeatureOption(toInput)
                    .then(async response => {
                        const isJson = response.headers.get('content-type')?.includes('application/json');
                        const data = isJson && await response.json();
                        setLoading(false);
                        if (!response.ok) {
                            const error = (data && data.message) || response.status;
                            setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                            setTimeout(() => setUpdateMessage(""), 3000);
                        } else {
                            setUpdateMessage(<span style={{ color: Colors.green }}>{data.message}</span>);
                            setTimeout(() => setUpdateMessage(""), 3000);
                            clearData();
                            fetchAllFeatureOptions();
                        }
                        if (response.status === 422) {
                            setUpdateMessage(<span style={{ color: Colors.red }}>{data.error.undefined}</span>);
                            setTimeout(() => setUpdateMessage(""), 3000);
                        }
                    })
                    .catch(error => {
                        setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                        setTimeout(() => setUpdateMessage(""), 3000);
                        setLoading(false);
                        clearData();
                    });
            }

        }
    }

    const handleDeleteClick = (e, id) => {
        setShow(true);
        setFeatureOptionsId(id);
    }

    const deleteThisFeatureOption = async () => {
        setLoading(true);
        let toInput = {
            _id: featureOptionsId,
        };
        await deleteFeatureOption(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                } else {
                    setUpdateMessage(<span style={{ color: Colors.green }}>{data.message}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                    clearData();
                    fetchAllFeatureOptions();
                }
                if (response.status === 422) {
                    setUpdateMessage(<span style={{ color: Colors.red }}>{data.error.undefined}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                }
            })
            .catch(error => {
                setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setUpdateMessage(""), 3000);
                setLoading(false);
                clearData();
            });
    }

    const clearData = () => {
        setFeatureOptionName("");
        setFeatureOptionsId(null);
        setFeatureMasterId(null);
        setStatus("");
    }

    const data = () => {
        return {
            columns: [
                { label: '#', field: 'srno', },
                { label: 'Feature Option  Name', field: 'featureoptionname', },
                { label: 'Feature Name', field: 'featurename', },
                { label: 'Status', field: 'status', },
                { label: '', field: 'edit', },
                { label: '', field: 'delete', },

            ],
            rows: [...featureOptions.map((data, i) => (
                {
                    srno: i + 1,
                    featureoptionname: data.featureOptionName,
                    featurename: data.featureMasterID.featureName,
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

                <h5>Manage Feature Options</h5>

                <div style={{ fontSize: FontSize.smallMedium, fontWeight: "bold", marginBottom: 10, paddingLeft: 20 }}>{updateMessage}</div>

                <div className="table-content">

                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: FontSize.mediumLarge }}>Delete Feature Option</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: FontSize.smallMedium }}>Are you sure you want to delete this feature option?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)} style={{ fontSize: FontSize.smallMedium }}>No</Button>
                            <Button variant="primary" onClick={() => {
                                setShow(false);
                                deleteThisFeatureOption();
                            }} style={{ fontSize: FontSize.smallMedium }}>Yes</Button>
                        </Modal.Footer>
                    </Modal>

                    <Form onSubmit={onFeatureOptionsFormSubmit} >

                        <Row style={{ fontSize: FontSize.smallMedium }}>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterFeatureMaster">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Feature</Form.Label>
                                    <Form.Select aria-label="Default select example" style={{ fontSize: FontSize.smallMedium }} value={featureMasterId || ""} onChange={e => { setFeatureMasterId(e.target.value); setFeatureOptionName(""); }}>
                                        <option value="Select">- Select -</option>
                                        {featureMaster.map((data, key) => <option key={data._id} value={data._id} >{data.featureName}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterName">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Feature Option Name</Form.Label>
                                    <Form.Control
                                        style={{ fontSize: FontSize.smallMedium }}
                                        value={featureOptionName || ""}
                                        onChange={e => { setFeatureOptionName(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            {featureOptionsId ?
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
                                <Form.Group className="mb-3" controlId="formEnterFeatureOption">
                                    {featureOptionsId ?
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

export default ManageFeatureOptions;