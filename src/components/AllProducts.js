import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Container } from 'react-bootstrap';
import { Colors } from '../common/ConstantStyles';
import PropTypes from 'prop-types';
import { getAllProducts } from './api';

export default function AllProducts({ show, id }) {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const checkShow = show;
    const catId = id;

    useEffect(() => {

        fetchAllProducts();

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

    }, [checkShow, catId])

    const fetchAllProducts = async () => {
        await getAllProducts()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (response.ok) {
                    setProducts(data.data);
                } else {
                    console.log("Error in loading products")
                }
            })
            .catch(error => {
                console.log("Products Error: " + error)
            });
    }

    return (
        <Container className='p-4'>
            <Row style={{ justifyContent: "center", alignContent: "center" }}>
                {products ? products.map((item, index) => (
                    <Card
                        key={item._id}
                        style={{ width: '16rem', padding: 0,}}
                        className="m-2"
                        onClick={() => { navigate('/productdetails', { state: { item: item, } }); }}
                    >
                        {/* <Card.Img variant="top" src={item.uri[0].image} style={{ alignSelf: "center", objectFit: "cover", height: 250,  }} /> */}
                        <Card.Body>
                            <Card.Text style={{ color: Colors.darkGrey, fontSize: 14  }}>{item.productName}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {/* <Card.Title style={{ color: Colors.black, fontWeight: "normal", fontSize: 16, }}>₹ {item.price.toFixed(2)}</Card.Title> */}
                            <Card.Title style={{ color: Colors.black, fontWeight: "normal", fontSize: 16,  }}>
                                <span style={{textDecoration: 'line-through', color: Colors.lightGrey, marginRight: 10,}}>₹ regularPrice</span>
                                <span>₹ offerPrice</span>
                            </Card.Title>
                        </Card.Footer>
                    </Card>
                )) : null}
            </Row>
        </Container>
    )
}

AllProducts.propTypes = {
    show: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}