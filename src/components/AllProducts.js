import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Container } from 'react-bootstrap';
import { Colors } from '../common/ConstantStyles';
import PropTypes from 'prop-types';
import { API_BASE } from './urlLink';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productAction';

export default function AllProducts({ show, id }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state) => state.products.data);
    const loading = useSelector((state) => state.products.loading);

    const checkShow = show;
    const catId = id;

    useEffect(() => {

        dispatch(fetchProducts());

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

    }, [checkShow, catId, dispatch])

    return (
        <Container className='p-4'>
            <Row style={{ justifyContent: "center", alignContent: "center" }}>
                {loading ?
                    <ProgressSpinner style={{ width: '25px', height: '25px' }} />
                    :
                    <>
                        {products ? products.map((item, index) => (
                            <Card
                                key={item._id}
                                style={{ width: '16rem', padding: 0, }}
                                className="m-2"
                                onClick={() => { navigate('/productdetails', { state: { productId: item._id, } }); }}
                            >
                                <Card.Img variant="top" src={`${API_BASE}/images/products/${item.productImages.length !== 0 ? item.productImages[0].productImageLink : null}`} style={{ alignSelf: "center", objectFit: "cover", height: 250 }} />
                                <Card.Body>
                                    <Card.Text style={{ color: Colors.darkGrey, fontSize: 14 }}>{item.productName}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    {/* <Card.Title style={{ color: Colors.black, fontWeight: "normal", fontSize: 16, }}>₹ {item.price.toFixed(2)}</Card.Title> */}
                                    <Card.Title style={{ color: Colors.black, fontWeight: "normal", fontSize: 16, }}>
                                        <span style={{ textDecoration: 'line-through', color: Colors.lightGrey, marginRight: 10, }}>₹ regularPrice</span>
                                        <span>₹ offerPrice</span>
                                    </Card.Title>
                                </Card.Footer>
                            </Card>
                        )) :
                            <Row>
                                <p style={{ padding: 20, textAlign: "center", marginBottom: 50, color: Colors.darkGrey, }}>Error in loading products</p>
                            </Row>
                        }

                    </>
                }
            </Row>
        </Container>
    )
}

AllProducts.propTypes = {
    show: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}