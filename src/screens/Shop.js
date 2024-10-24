import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Container } from 'react-bootstrap'
import TopHeader from '../components/TopHeader'
import AllProducts from '../components/AllProducts'
import { useLocation } from 'react-router-dom'

export default function Shop() {

    let location = useLocation();
    const { categoryId } = location?.state;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

    }, [categoryId])

    return (
        <>

            <TopHeader />

            <NavBar />

            <Container>
                <AllProducts show={"idWise"} id={categoryId} />
            </Container>

            <Footer />

        </>
    )
}
