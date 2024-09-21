import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Button, Spinner, Modal } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { addNewCity, deleteCity, getAllCities, getAllStates, getCityById, updateCity } from "../../components/api";
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';

const ManageCities = () => {

    const userLoginId = localStorage.getItem("userLoginId");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [cityName, setCityName] = useState("");
    const [cityId, setCityId] = useState(null);
    const [stateId, setStateId] = useState(null);
    const [status, setStatus] = useState("");
    const [updateMessage, setUpdateMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchAllStates();
        fetchAllCities()
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
                    setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                } else {
                    setStates(data.data);
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

    const fetchAllCities = async () => {
        setLoading(true);
        await getAllCities()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                } else {
                    setCities(data.data);
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

        await getCityById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setCityName(data.data.cityName);
                setCityId(data.data._id);
                setStateId(data.data.stateID._id);
                setStatus(data.data.status);
                setLoading(false);
            })
            .catch(error => {
                setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setUpdateMessage(""), 3000);
                setLoading(false);
            });
    }

    const onCityFormSubmit = async (event) => {
        event.preventDefault();

        if (stateId === null || stateId === 'Select' || stateId === "") {
            setUpdateMessage(<span style={{ color: Colors.red }}>Please select state</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
        }
        else if (!cityName) {
            setUpdateMessage(<span style={{ color: Colors.red }}>Please enter city name</span>);
            setTimeout(() => setUpdateMessage(""), 3000);
        } else {

            setLoading(true);

            if (cityId) {
                let toInput = {
                    _id: cityId,
                    cityName: cityName,
                    stateID: stateId,
                    updatedByid: userLoginId,
                    status: status
                };
                await updateCity(toInput)
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
                            fetchAllCities();
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
                    cityName: cityName,
                    stateID: stateId,
                    createdByid: userLoginId
                };
                await addNewCity(toInput)
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
                            fetchAllCities();
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
        setCityId(id);
    }

    const deleteThisCity = async () => {
        setLoading(true);
        let toInput = {
            _id: cityId,
        };
        await deleteCity(toInput)
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
                    fetchAllCities();
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
        setCityName("");
        setCityId(null);
        setStateId(null);
        setStatus("");
    }

    const data = () => {
        return {
            columns: [
                { label: '#', field: 'srno', },
                { label: 'City Name', field: 'cityname', },
                { label: 'State Name', field: 'statename', },
                { label: 'Status', field: 'status', },
                { label: '', field: 'edit', },
                { label: '', field: 'delete', },

            ],
            rows: [...cities.map((data, i) => (
                {
                    srno: i + 1,
                    cityname: data.cityName,
                    statename: data.stateID.stateName,
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

                <h5>Manage City</h5>

                <div style={{ fontSize: FontSize.smallMedium, fontWeight: "bold", marginBottom: 10, paddingLeft: 20 }}>{updateMessage}</div>

                <div className="table-content">

                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: FontSize.mediumLarge }}>Delete City</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: FontSize.smallMedium }}>Are you sure you want to delete this city?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)} style={{ fontSize: FontSize.smallMedium }}>No</Button>
                            <Button variant="primary" onClick={() => {
                                setShow(false);
                                deleteThisCity();
                            }} style={{ fontSize: FontSize.smallMedium }}>Yes</Button>
                        </Modal.Footer>
                    </Modal>

                    <Form onSubmit={onCityFormSubmit} >

                        <Row style={{ fontSize: FontSize.smallMedium }}>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterState">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />State</Form.Label>
                                    <Form.Select aria-label="Default select example" style={{ fontSize: FontSize.smallMedium }} value={stateId || ""} onChange={e => { setStateId(e.target.value); setCityName(""); }}>
                                        <option value="Select">- Select -</option>
                                        {states.map((data, key) => <option key={data._id} value={data._id} >{data.stateName}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterName">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />City Name</Form.Label>
                                    <Form.Control
                                        style={{ fontSize: FontSize.smallMedium }}
                                        value={cityName || ""}
                                        onChange={e => { setCityName(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            {cityId ?
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
                                <Form.Group className="mb-3" controlId="formEnterCity">
                                    {cityId ?
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

export default ManageCities;