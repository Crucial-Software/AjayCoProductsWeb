import React, { useState } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    // CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBListGroup
} from 'cdbreact';
import { Link } from 'react-router-dom';
import { Colors } from '../common/ConstantStyles';
import { Image } from "react-bootstrap";
import MyImage from "../assets/images/AjayCoProductsLogo.png";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    let navigate = useNavigate();

    const [locationMenu, setLocationMenu] = useState(false);
    const [productsMenu, setProductsMenu] = useState(false);

    const locationMenuClicked = () => { setLocationMenu(!locationMenu) }
    const productsMenuClicked = () => { setProductsMenu(!productsMenu) }

    function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }} >
            <CDBSidebar textColor={Colors.darkGrey} backgroundColor={Colors.grey}>
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>

                    <Link to="/dashboard"><Image src={MyImage} className="d-inline-block align-top" alt="check" height={60} /></Link>

                </CDBSidebarHeader>

                <CDBSidebarContent>
                    <CDBSidebarMenu>
                        <span style={{ fontWeight: "bold" }}>
                            <Link to="/dashboard" onClick={() => changeLocation('/dashboard')}>
                                <CDBSidebarMenuItem icon="fa fa-th-large" iconSize="sm" textFontSize="14px" >
                                    Dashboard
                                </CDBSidebarMenuItem>
                            </Link>
                        </span>

                        <span style={{ fontWeight: "bold" }}>
                            <Link to="/users" onClick={() => changeLocation('/users')}>
                                <CDBSidebarMenuItem icon="user" iconSize="sm" textFontSize="14px" >
                                    Users
                                </CDBSidebarMenuItem>
                            </Link>
                        </span>

                        <span style={{ fontWeight: "bold" }}>
                            <Link to="/customers" onClick={() => changeLocation('/customers')}>
                                <CDBSidebarMenuItem icon="user" iconSize="sm" textFontSize="14px" >
                                    Customers
                                </CDBSidebarMenuItem>
                            </Link>
                        </span>

                        <span onClick={locationMenuClicked} style={{ fontWeight: "bold" }}>
                            <CDBSidebarMenuItem icon="map-marker-alt" iconSize="sm" textFontSize="14px">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    Location
                                    {locationMenu ? <CaretUpFill size={12} /> : <CaretDownFill size={12} />}
                                </div>
                            </CDBSidebarMenuItem>
                        </span>
                        {locationMenu ?
                            <CDBListGroup style={{ paddingLeft: 20 }}>
                                <div style={{ height: 40 }}>
                                    <Link to="/managestates" onClick={() => changeLocation('/managestates')}>
                                        <CDBSidebarMenuItem icon="circle-small" iconSize="sm" textFontSize="14px" >
                                            State
                                        </CDBSidebarMenuItem>
                                    </Link>
                                </div>
                                <div style={{ height: 40 }}>
                                    <Link to="/managecities" onClick={() => changeLocation('/managecities')}>
                                        <CDBSidebarMenuItem icon="circle-small" iconSize="sm" textFontSize="14px" >
                                            City
                                        </CDBSidebarMenuItem>
                                    </Link>
                                </div>
                            </CDBListGroup>
                            :
                            <div></div>
                        }

                        <span style={{ fontWeight: "bold" }}>
                            <Link to="/customergroup" onClick={() => changeLocation('/customergroup')}>
                                <CDBSidebarMenuItem icon="fa fa-users" iconSize="sm" textFontSize="14px" >
                                    Customer Group
                                </CDBSidebarMenuItem>
                            </Link>
                        </span>

                        <span onClick={productsMenuClicked} style={{ fontWeight: "bold" }}>
                            <CDBSidebarMenuItem icon="fa fa-cube" iconSize="sm" textFontSize="14px">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    Product
                                    {productsMenu ? <CaretUpFill size={12} /> : <CaretDownFill size={12} />}
                                </div>
                            </CDBSidebarMenuItem>
                        </span>
                        {productsMenu ?
                            <CDBListGroup style={{ paddingLeft: 20 }}>
                                <div style={{ height: 40 }}>
                                    <Link to="/managecategory" onClick={() => changeLocation('/managecategory')}>
                                        <CDBSidebarMenuItem icon="circle-small" iconSize="sm" textFontSize="14px" >
                                            Category
                                        </CDBSidebarMenuItem>
                                    </Link>
                                </div>
                                <div style={{ height: 40 }}>
                                    <Link to="/manageunit" onClick={() => changeLocation('/manageunit')}>
                                        <CDBSidebarMenuItem icon="circle-small" iconSize="sm" textFontSize="14px" >
                                            Unit
                                        </CDBSidebarMenuItem>
                                    </Link>
                                </div>
                                <div style={{ height: 40 }}>
                                    <Link to="/managefeaturemaster" onClick={() => changeLocation('/managefeaturemaster')}>
                                        <CDBSidebarMenuItem icon="circle-small" iconSize="sm" textFontSize="14px" >
                                            Feature Master
                                        </CDBSidebarMenuItem>
                                    </Link>
                                </div>  
                                <div style={{ height: 40 }}>
                                    <Link to="/managefeatureoptions" onClick={() => changeLocation('/managefeatureoptions')}>
                                        <CDBSidebarMenuItem icon="circle-small" iconSize="sm" textFontSize="14px" >
                                            Feature Options
                                        </CDBSidebarMenuItem>
                                    </Link>
                                </div>
                                <div style={{ height: 40 }}>
                                    <Link to="/manageproducts" onClick={() => changeLocation('/manageproducts')}>
                                        <CDBSidebarMenuItem icon="circle-small" iconSize="sm" textFontSize="14px" >
                                            Products
                                        </CDBSidebarMenuItem>
                                    </Link>
                                </div>
                            </CDBListGroup>
                            :
                            <div></div>
                        }

                        <span style={{ fontWeight: "bold" }}>
                            <Link to="/orders" onClick={() => changeLocation('/orders')}>
                                <CDBSidebarMenuItem icon="fa fa-cubes" iconSize="sm" textFontSize="14px" >
                                    Orders
                                </CDBSidebarMenuItem>
                            </Link>
                        </span>

                    </CDBSidebarMenu>
                </CDBSidebarContent>

                {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div style={{ padding: '20px 5px', }} >
                        Sidebar Footer
                    </div>
                </CDBSidebarFooter> */}
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;