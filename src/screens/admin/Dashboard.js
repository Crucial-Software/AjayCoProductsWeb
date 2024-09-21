import React from 'react';
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import "../../components/admincss.css";

const Dashboard = () => {
    return (
        <div className="main">

            <Sidebar />

            <div className="page-content">

                <Header />
                
            </div>
        </div>
    );
};

export default Dashboard;