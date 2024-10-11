import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Button, Spinner, Modal } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { addNewState, deleteState, getAllStates, getStateById, updateState } from "../../components/api";
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import { Toast } from 'primereact/toast';

const ManageStates = () => {

    const toast = useRef(null);
    const userLoginId = localStorage.getItem("userLoginId");
    const [states, setStates] = useState([]);
    const [stateName, setStateName] = useState("");
    const [stateId, setStateId] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchAllStates()
    }, [])

    const fetchAllStates = async () => {
        setLoading(true);
        await getAllStates()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    setStates(data.data);
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

        await getStateById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setStateName(data.data.stateName);
                setStateId(data.data._id);
                setStatus(data.data.status);
                setLoading(false);
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
                setLoading(false);
            });
    }

    const onStateFormSubmit = async (event) => {
        event.preventDefault();

        if (!stateName) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please enter state name" });
        } else {

            setLoading(true);

            if (stateId) {
                let toInput = {
                    _id: stateId,
                    stateName: stateName,
                    updatedByid: userLoginId,
                    status: status
                };
                await updateState(toInput)
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
                            fetchAllStates();
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
                    stateName: stateName,
                    createdByid: userLoginId
                };
                await addNewState(toInput)
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
                            fetchAllStates();
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
        setStateId(id);
    }

    const deleteThisState = async () => {
        setLoading(true);
        let toInput = {
            _id: stateId,
        };
        await deleteState(toInput)
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
                    fetchAllStates();
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
        setStateName("");
        setStateId(null);
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
            rows: [...states.map((data, i) => (
                {
                    srno: i + 1,
                    name: data.stateName,
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

                <h5>Manage State</h5>

                <div className="table-content">

                <Toast ref={toast} position="top-center" />

                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: FontSize.mediumLarge }}>Delete State</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: FontSize.smallMedium }}>Are you sure you want to delete this state?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)} style={{ fontSize: FontSize.smallMedium }}>No</Button>
                            <Button variant="primary" onClick={() => {
                                setShow(false);
                                deleteThisState();
                            }} style={{ fontSize: FontSize.smallMedium }}>Yes</Button>
                        </Modal.Footer>
                    </Modal>

                    <Form onSubmit={onStateFormSubmit} >

                        <Row style={{ fontSize: FontSize.smallMedium }}>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterName">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />State Name</Form.Label>
                                    <Form.Control
                                        style={{ fontSize: FontSize.smallMedium }}
                                        value={stateName || ""}
                                        onChange={e => { setStateName(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            {stateId ?
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
                                <Form.Group className="mb-3" controlId="formEnterState">
                                    {stateId ?
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

export default ManageStates;