import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Container } from 'react-bootstrap';
import { Colors } from '../common/ConstantStyles';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productAction';

export default function AllProducts({ show, id }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state) => state.products.data);

    const checkShow = show;
    const catId = id;

    useEffect(() => {

        dispatch(fetchProducts());

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

        //console.log("AllProducts checkshow: " + checkShow + " " + catId);

    }, [checkShow, catId, dispatch])

    return (
        <Container className='p-4'>
            <Row style={{ justifyContent: "center", alignContent: "center" }}>
                {products ? products.map((item, index) => (
                    <Card
                        key={index}
                        style={{ width: '16rem', padding: 0,}}
                        className="m-2"
                        onClick={() => { navigate('/productdetails', { state: { item: item, } }); }}
                    >
                        <Card.Img variant="top" src={item.uri[0].image} style={{ alignSelf: "center", objectFit: "cover", height: 250,  }} />
                        <Card.Body>
                            <Card.Text style={{ color: Colors.darkGrey, fontSize: 14  }}>{item.title}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Title style={{ color: Colors.black, fontWeight: "normal", fontSize: 16, }}>₹ {item.price.toFixed(2)}</Card.Title>
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