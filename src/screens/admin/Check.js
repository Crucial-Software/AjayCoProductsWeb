import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from "react-bootstrap";
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import "../../components/admincss.css";
import { Colors, FontSize } from "../../common/ConstantStyles";
import { getAllCategories, } from "../../components/api";

import { API_BASE } from "../../components/urlLink";
import { Toast } from 'primereact/toast';

const Check = () => {

    const toast = useRef(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllStates()
    }, [])

    const fetchAllStates = async () => {
        await getAllCategories()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    toast.current.show({ life: 3000, severity: 'error', summary: error });
                } else {
                    setProducts(data.data);
                    console.log("Categories: " + JSON.stringify(data.data));
                }
                if (response.status === 422) {
                    toast.current.show({ life: 3000, severity: 'error', summary: data.error.undefined });
                }
            })
            .catch(error => {
                toast.current.show({ life: 3000, severity: 'error', summary: error });
            });

    }

    const statuses = [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
    ];

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const statusEditor = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <span className={`product-badge status-${option.value.toLowerCase()}`}>{option.label}</span>
                }} />
        );
    }

    const onRowEditComplete1 = (e) => {
        let _products = [...products];
        let { newData, index } = e;

        _products[index] = newData;

        setProducts(_products);
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case 'Active':
                return 'Active';

            case 'Inactive':
                return 'Inactive';

            default:
                return 'Active';
        }
    }

    const statusBodyTemplate = (rowData) => {
        return getStatusLabel(rowData.inventoryStatus);
    }

    const imageBodyTemplate = (rowData) => {
        return <Image src={`${API_BASE}/images/category/${products.categoryImage}`} height={70} />
    }


    return (

        <div className="main" >

            <Sidebar />

            <div className="page-content">

                <Header />

                <h5>Manage Categories</h5>

                <Toast ref={toast} position="top-center" />

                <div>

                    <DataTable
                        value={products}
                        editMode="row"
                        dataKey="id"
                        onRowEditComplete={onRowEditComplete1}
                        responsiveLayout="scroll"
                        showGridlines
                        stripedRows
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                        size="small"
                    >
                        <Column field="categoryName" header="Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                        <Column header="Image" body={imageBodyTemplate}></Column>
                        <Column field="status" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '20%' }}></Column>
                        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>


                </div>

            </div>

        </div>

    );
};

export default Check;