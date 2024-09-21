import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Spinner, Modal } from "react-bootstrap";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { deleteCustomer, getAllCustomers  } from "../../components/api";
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState(null);
    const [updateMessage, setUpdateMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchAllCustomers()
    }, [])

    const fetchAllCustomers = async () => {
        setLoading(true);
        await getAllCustomers()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                } else {
                    setCustomers(data.data);
                }
                if (response.status === 422) {
                    setUpdateMessage(<span style={{ color: Colors.red }}>{data.error.undefined}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                }
                setLoading(false);
            })
            .catch(error => {
                setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                setTimeout(() => setUpdateMessage(""), 3000);
                setLoading(false);
            });

    }

    const handleDeleteClick = (e, id) => {
        setShow(true);
        setCustomerId(id);
    }

    const deleteThisCustomer = async () => {
        setLoading(true);
        let toInput = {
            _id: customerId,
        };
        await deleteCustomer(toInput)
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
                    fetchAllCustomers();
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
        setCustomerId(null);
    }

    const data = () => {
        return {
            columns: [
                { label: '#', field: 'srno', },
                { label: 'Name', field: 'name', },
                { label: 'Type', field: 'type', },
                { label: 'Contact Person', field: 'contactperson', },
                { label: 'GST No', field: 'gstno', },
                { label: 'Status', field: 'status', },
                { label: '', field: 'delete', },

            ],
            rows: [...customers.map((data, i) => (
                {
                    srno: i + 1,
                    name: data.customerName,
                    type: data.customerType,
                    contactperson: data.contactPerson,
                    gstno: data.GSTNo,
                    status: data.status,
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

                <h5>Manage Customers</h5>

                <div style={{ fontSize: FontSize.smallMedium, fontWeight: "bold", marginBottom: 10, paddingLeft: 20 }}>{updateMessage}</div>

                <div className="table-content">

                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: FontSize.mediumLarge }}>Delete Customer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: FontSize.smallMedium }}>Are you sure you want to delete this customer?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)} style={{ fontSize: FontSize.smallMedium }}>No</Button>
                            <Button variant="primary" onClick={() => {
                                setShow(false);
                                deleteThisCustomer();
                            }} style={{ fontSize: FontSize.smallMedium }}>Yes</Button>
                        </Modal.Footer>
                    </Modal>

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

export default Customers;