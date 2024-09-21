import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import TopHeader from '../components/TopHeader';
import CategoryLayout from '../components/CategoryLayout';
import { Container } from 'react-bootstrap';
import { getAllCategories } from '../components/api';

export default function Categories() {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        fetchAllCategories();
    }, [])

    const fetchAllCategories = async () => {
        await getAllCategories()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (response.ok) {
                    setCategoryList(data.data);
                } else {
                    console.log("Error in loading categories")
                }
            })
            .catch(error => {
                console.log("Categories Error: " + error)
            });
    }

    return (
        <div>
            <TopHeader />
            <NavBar />
            <Container>
                <CategoryLayout items={categoryList} />
            </Container>
            <Footer />
        </div >
    )
}