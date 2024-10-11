import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row, Button, Spinner, Modal } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../../components/api";
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import { Toast } from 'primereact/toast';

const Users = () => {

    const toast = useRef(null);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchAllUsers = async () => {
        setLoading(true);
        await getAllUsers()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    setUsers(data.data);
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
                setLoading(false);
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

        await getUserById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setUserId(data.data._id);
                setName(data.data.name);
                setRole(data.data.role);
                setMobile(data.data.mobile);
                setEmail(data.data.email);
                setStatus(data.data.status);
                setLoading(false);
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
                setLoading(false);
            });
    }

    const onUserFormSubmit = async (event) => {
        event.preventDefault();

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // eslint-disable-line

        if (mobile.length !== 10) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Enter a valid 10 digit mobile number" });
        }
        else if (reg.test(email) === false) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Enter a valid email id" });
        }
        else {

            setLoading(true);

            if (userId) {
                let toInput = {
                    _id: userId,
                    name: name,
                    role: role,
                    mobile: mobile,
                    email: email,
                    status: status
                };
                await updateUser(toInput)
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
                            fetchAllUsers();
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
        setUserId(id);
    }

    const deleteThisUser = async () => {
        setLoading(true);
        let toInput = {
            _id: userId,
        };
        await deleteUser(toInput)
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
                    fetchAllUsers();
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
        setUserId(null);
        setName("");
        setRole("");
        setMobile("");
        setEmail("");
        setStatus("");
    }

    const data = () => {
        return {
            columns: [
                { label: '#', field: 'srno', },
                { label: 'Name', field: 'name', },
                { label: 'Role', field: 'role', },
                { label: 'Mobile', field: 'mobile', },
                { label: 'Email', field: 'email', },
                { label: 'Status', field: 'status', },
                { label: '', field: 'edit', },
                { label: '', field: 'delete', },

            ],
            rows: [...users.map((data, i) => (
                {
                    srno: i + 1,
                    name: data.name,
                    role: data.role,
                    mobile: data.mobile,
                    email: data.email,
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

                <h5>Manage Users</h5>

                <div className="table-content">

                    <Toast ref={toast} position="top-center" />

                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: FontSize.mediumLarge }}>Delete User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: FontSize.smallMedium }}>Are you sure you want to delete this user?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)} style={{ fontSize: FontSize.smallMedium }}>No</Button>
                            <Button variant="primary" onClick={() => {
                                setShow(false);
                                deleteThisUser();
                            }} style={{ fontSize: FontSize.smallMedium }}>Yes</Button>
                        </Modal.Footer>
                    </Modal>

                    <Form onSubmit={onUserFormSubmit} >

                        <Row style={{ fontSize: FontSize.smallMedium }}>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterName">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Name</Form.Label>
                                    <Form.Control
                                        style={{ fontSize: FontSize.smallMedium }}
                                        value={name || ""}
                                        onChange={e => { setName(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterRole">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Role</Form.Label>
                                    <Form.Control
                                        style={{ fontSize: FontSize.smallMedium }}
                                        value={role || ""}
                                        onChange={e => { setRole(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterMobile">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Mobile</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        maxLength="10"
                                        style={{ fontSize: FontSize.smallMedium }}
                                        value={mobile}
                                        onChange={e => { setMobile(e.target.value.replace(/\D/g, "")) }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterEmail">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        style={{ fontSize: FontSize.smallMedium }}
                                        value={email || ""}
                                        onChange={e => { setEmail(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

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

                            <Col sm={2} >
                                <Form.Group className="mb-3" controlId="formEnterUser">
                                    <Button variant="primary" type="submit" style={{ marginTop: 25, fontSize: FontSize.smallMedium, backgroundColor: Colors.darkBlue, borderColor: Colors.darkBlue }}> Update </Button>
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

export default Users;