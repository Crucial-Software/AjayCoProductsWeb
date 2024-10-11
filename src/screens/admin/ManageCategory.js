import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Button, Spinner, Modal, Image } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { addNewCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../../components/api";
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import { API_BASE } from "../../components/urlLink";
import { Toast } from 'primereact/toast';

const ManageCategory = () => {

    const toast = useRef(null);
    const userLoginId = localStorage.getItem("userLoginId");
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const aRef = useRef(null);
    const [files, setFiles] = useState('');
    const [uploadfile, setUploadfile] = useState(null);

    useEffect(() => {
        fetchAllCategories()
    }, [])

    const fetchAllCategories = async () => {
        setLoading(true);
        await getAllCategories()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
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
                setLoading(false);
            });

    }

    const handleEditClick = async (e, id) => {

        e.preventDefault();

        setLoading(true);

        let toInput = {
            _id: id,
        };

        await getCategoryById(toInput)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setCategoryName(data.data.categoryName);
                setCategoryId(data.data._id);
                setUploadfile(`${API_BASE}/images/category/${data.data.categoryImage}`);
                setStatus(data.data.status);
                setLoading(false);
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
                setLoading(false);
            });
    }

    const onCategoryFormSubmit = async (event) => {
        event.preventDefault();

        if (!categoryName) {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please enter category name" });
        } if (uploadfile === null || files === "") {
            toast.current.show({ life: 3000, severity: 'error', summary: "Please select category image" });
        }

        else {

            setLoading(true);

            const formData = new FormData();

            if (files !== 0) {
                for (let i = 0; i < files.length; i++) {
                    if (files[i].size > 100000) {
                        toast.current.show({ life: 3000, severity: 'error', summary: "File size exceeded!! Please select filesize less than 20KB." });
                        return;
                    }
                    formData.append('categoryImage', files[i])
                }
            } else {
                toast.current.show({ life: 3000, severity: 'error', summary: "Please select category image" });
            }

            formData.append('categoryName', categoryName);

            if (categoryId) {

                formData.append('_id', categoryId);
                formData.append('status', status);
                formData.append('updatedByid', userLoginId);

                await updateCategory(formData)
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
                            fetchAllCategories();
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

                formData.append('createdByid', userLoginId);

                await addNewCategory(formData)
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
                            fetchAllCategories();
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
        setCategoryId(id);
    }

    const deleteThisCategory = async () => {
        setLoading(true);
        let toInput = {
            _id: categoryId,
        };
        await deleteCategory(toInput)
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
                    fetchAllCategories();
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
        setCategoryName("");
        setCategoryId(null);
        setStatus("");
        setFiles("");
        setUploadfile(null);
        aRef.current.value = null;
    }

    const data = () => {
        return {
            columns: [
                { label: '#', field: 'srno', },
                { label: 'Name', field: 'name', },
                { label: 'Image', field: 'image', },
                { label: 'Status', field: 'status', },
                { label: '', field: 'edit', },
                { label: '', field: 'delete', },

            ],
            rows: [...categories.map((data, i) => (
                {
                    srno: i + 1,
                    name: data.categoryName,
                    image: <div>
                        {data.categoryImage ?
                            <Image src={`${API_BASE}/images/category/${data.categoryImage}`} height={70} />
                            :
                            <div></div>
                        }
                    </div>,
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

                <h5>Manage Category</h5>

                <div className="table-content">

                <Toast ref={toast} position="top-center" />

                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: FontSize.mediumLarge }}>Delete Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: FontSize.smallMedium }}>Are you sure you want to delete this category?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)} style={{ fontSize: FontSize.smallMedium }}>No</Button>
                            <Button variant="primary" onClick={() => {
                                setShow(false);
                                deleteThisCategory();
                            }} style={{ fontSize: FontSize.smallMedium }}>Yes</Button>
                        </Modal.Footer>
                    </Modal>

                    <Form onSubmit={onCategoryFormSubmit} >

                        <Row style={{ fontSize: FontSize.smallMedium }}>

                            <Col sm={2}>
                                <Form.Group className="mb-3" controlId="formEnterName">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Category Name</Form.Label>
                                    <Form.Control
                                        style={{ fontSize: FontSize.smallMedium }}
                                        value={categoryName || ""}
                                        onChange={e => { setCategoryName(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col sm={4}>
                                <Form.Group className="mb-3" controlId="formEnterImage">
                                    <Form.Label><Asterisk size={6} style={{ marginBottom: 5, marginRight: 5, color: Colors.red }} />Category Image</Form.Label>
                                    <Form.Control
                                        ref={aRef}
                                        type="file"
                                        style={{ fontSize: FontSize.smallMedium }}
                                        onChange={e => {
                                            setFiles(e.target.files);
                                            const reader = new FileReader();
                                            reader.addEventListener("load", () => {
                                                setUploadfile(reader.result);
                                            });
                                            reader.readAsDataURL(e.target.files[0]);
                                        }}
                                        accept="image/png, image/jpeg"
                                    />
                                </Form.Group>
                            </Col>

                            {uploadfile ?
                                <Col sm={2}>
                                    <Form.Group className="mb-3" controlId="formEnterImageFile">
                                        <Image src={uploadfile} height={75} />
                                    </Form.Group>
                                </Col>
                                :
                                null
                            }

                            {categoryId ?
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
                                <Form.Group className="mb-3" controlId="formEnterCategory">
                                    {categoryId ?
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

export default ManageCategory;