import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import TopHeader from '../components/TopHeader';
import CategoryLayout from '../components/CategoryLayout';
import { Container, Row } from 'react-bootstrap';
import { getAllCategories } from '../components/api';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Categories() {

    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        fetchAllCategories();
    }, [])

    const fetchAllCategories = async () => {

        setLoading(true);

        await getAllCategories()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setLoading(false);
                if (response.ok) {
                    setCategoryList(data.data);
                } else {
                    console.log("Error in loading categories")
                }
            })
            .catch(error => {
                setLoading(false);
                console.log("Categories Error: " + error)
            });
    }

    return (
        <div>
            <TopHeader />
            <NavBar />
            <Container>
                {loading ?
                    <Row style={{ justifyContent: "center", alignContent: "center" }}>
                        <ProgressSpinner style={{ width: '25px', height: '25px' }} />
                    </Row>
                    :
                    <CategoryLayout items={categoryList} />
                }
            </Container>
            <Footer />
        </div >
    )
}