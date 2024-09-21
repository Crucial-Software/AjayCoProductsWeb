import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Button, Spinner, Modal } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { addNewUnit, deleteUnit, getAllUnits, getUnitById, updateUnit } from "../../components/api";
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';

const ManageUnit = () => {

    const userLoginId = localStorage.getItem("userLoginId");
    const [units, setUnits] = useState([]);
    const [unitName, setUnitName] = useState("");
    const [unitId, setUnitId] = useState(null);
    const [status, setStatus] = useState("");
    const [updateMessage, setUpdateMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchAllUnits()
    }, [])

    const fetchAllUnits = async () => {
        setLoading(true);
        await getAllUnits()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                } else {
                    setUnits(data.data);
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

        await getUnitById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setUnitName(data.data.unitName);
                setUnitId(data.data._id);
                setStatus(data.data.status);
                setLoading(false);
            })
            .catch(error => {
                setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setUpdateMessage(""), 3000);
                setLoading(false);
            });
    }

    const onUnitFormSubmit = async (event) => {
        event.preventDefault();

        if (!unitName) {
            setUpdateMessage(<span style={{ color: Colors.red }}>Please enter unit name</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
        } else {

            setLoading(true);

            if (unitId) {
                let toInput = {
                    _id: unitId,
                    unitName: unitName,
                    updatedByid: userLoginId,
                    status: status
                };
                await updateUnit(toInput)
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
                            fetchAllUnits();
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
                    unitName: unitName,
                    createdByid: userLoginId
                };
                await addNewUnit(toInput)
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
                            fetchAllUnits();
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
        setUnitId(id);
    }

    const deleteThisUnit = async () => {
        setLoading(true);
        let toInput = {
            _id: unitId,
        };
        await deleteUnit(toInput)
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
                    fetchAllUnits();
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
        setUnitName("");
        setUnitId(null);
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
            rows: [...units.map((data, i) => (
                {
                    srno: i + 1,
                    name: data.unitName,
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

                <h5>Manage Unit</h5>

                <div style={{ fontSize: FontSize.smallMedium, fontWeight: "bold", marginBottom: 10, paddingLeft: 20 }}>{updateMessage}</div>

                <div className="table-content">

                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: FontSize.mediumLarge }}>Delete Unit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: FontSize.smallMedium }}>Are you sure you want to delete this unit?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)} style={{ fontSize: FontSize.smallMedium }}>No</Button>
                            <Button variant="primary" onClick={() => {
                                setShow(false);
                                deleteThisUnit();
                            }} style={{ fontSize: FontSize.smallMedium }}>Yes</Button>
                        </Modal.Footer>
                    </Modal>

                    <Form onSubmit={onUnitFormSubmit} >

                        <Row style={{ fontSize: FontSize.smallMedium }}>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterName">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Unit Name</Form.Label>
                                    <Form.Control
                                        style={{ fontSize: FontSize.smallMedium }}
                                        value={unitName || ""}
                                        onChange={e => { setUnitName(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            {unitId ?
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
                                <Form.Group className="mb-3" controlId="formEnterUnit">
                                    {unitId ?
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

export default ManageUnit;