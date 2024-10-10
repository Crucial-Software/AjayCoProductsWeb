import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Spinner, Image } from "react-bootstrap";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { getAllProducts } from "../../components/api";
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from "../../components/urlLink";

const ManageProducts = () => {

    const navigate = useNavigate();

    //const userLoginId = localStorage.getItem("userLoginId");
    const [products, setProducts] = useState([]);
    const [updateMessage, setUpdateMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllProducts()
    }, [])

    const fetchAllProducts = async () => {
        setLoading(true);
        await getAllProducts()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    setUpdateMessage(<span style={{ color: Colors.red }}>{error}</span>);
                    setTimeout(() => setUpdateMessage(""), 3000);
                } else {
                    setProducts(data.data);
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

    const handleDeleteClick = () => {

    }

    const data = () => {
        return {
            columns: [
                { label: '#', field: 'srno', },
                { label: 'Image', field: 'image', },
                { label: 'Name', field: 'name', },
                { label: 'Category', field: 'category', },
                { label: 'Status', field: 'status', },
                { label: '', field: 'edit', },
                { label: '', field: 'delete', },

            ],
            rows: [...products.map((data, i) => (
                {
                    srno: i + 1,
                    image: <div>
                        {data.productImages.length !== 0 ?
                            <Image src={`${API_BASE}/images/products/${data.productImages[0].productImageLink}`} height={70} />
                            :   
                            <div></div>
                        }
                    </div>,
                    name: data.productName,
                    category: data.catID.categoryName,
                    status: data.status,
                    edit: <span onClick={(e) => {navigate("/createnewproduct", { state: { productId: data._id, } })}}>
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

                <h5>Products</h5>

                <div style={{ fontSize: FontSize.smallMedium, fontWeight: "bold", marginBottom: 10, paddingLeft: 20 }}>{updateMessage}</div>

                <div className="table-content">

                    <Button
                        variant="primary"
                        onClick={() => { navigate("/createnewproduct", { state: { productId: null, } }) }}
                        style={{ marginBottom: 20, fontSize: FontSize.smallMedium, backgroundColor: Colors.darkBlue, borderColor: Colors.darkBlue }}>
                        + Create New Product
                    </Button>

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

export default ManageProducts;