import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "react-bootstrap";
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";
import { FontSize } from "../../common/ConstantStyles";
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import { getOrderMasterList } from "../../components/api";
import { Toast } from 'primereact/toast';

const Orders = () => {

    const toast = useRef(null);
    const [orderMasterList, setOrderMasterList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllOrderMaster()
    }, [])

    const fetchAllOrderMaster = async () => {
        setLoading(true);
        await getOrderMasterList()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    setOrderMasterList(data.data);
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

    const data = () => {
        return {
            columns: [
                { label: '#', field: 'srno', },
                { label: 'Name', field: 'name', },
                { label: 'Total Amount', field: 'totalAmount', },
                { label: 'SGST', field: 'sgst', },
                { label: 'CGST', field: 'cgst', },
                { label: 'IGST', field: 'igst', },
                { label: 'Total Tax', field: 'totalTax', },
                { label: 'Total Disount', field: 'totalDiscount', },
                { label: 'Net Amount', field: 'netAmount', },
                { label: 'Order Status', field: 'orderStatus', },
                { label: 'Payment Status', field: 'paymentStatus', },
            ],
            rows: [...orderMasterList.map((data, i) => (
                {
                    srno: i + 1,
                    name: data.customerID,
                    totalAmount: data.totalAmount,
                    sgst: data.totalSGST,
                    cgst: data.totalCGST,
                    igst: data.totalIGST,
                    totalTax: data.totalTax,
                    totalDiscount: data.totalDiscount,
                    netAmount: data.netAmount,
                    orderStatus: data.orderStatus,
                    paymentStatus: data.paymentStatus
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

                <h5>Manage Orders</h5>

                <div className="table-content">

                <Toast ref={toast} position="top-center" />

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

export default Orders;