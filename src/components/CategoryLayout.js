import React from 'react'
import { Row, Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Colors } from '../common/ConstantStyles';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from './urlLink';

export default function CategoryLayout({ items }) {

    const navigate = useNavigate();

    return (

        <Container className='p-4' >
            <Row style={{ justifyContent: "center", alignContent: "center", marginTop: 50 }}>
                {items ? items.map((item, index) => (
                    <Card
                        key={index}
                        style={{ width: '16rem', padding: 0 }}
                        className="m-2"
                        onClick={() => { navigate("/shop", { state: { categoryId: item._id, } }); }}
                    >
                        <Card.Img variant="top" src={`${API_BASE}/images/category/${item.categoryImage}`} style={{ alignSelf: "center", objectFit: "cover", height: 250 }} />
                        <Card.Footer>
                            <Card.Title style={{ color: Colors.darkGrey, fontWeight: "bold", fontSize: 16, textAlign: "center" }}>{item.categoryName}</Card.Title>
                        </Card.Footer>
                    </Card>
                ))
                    :
                    <Row>
                        <p style={{ padding: 20, textAlign: "center", marginBottom: 50, color: Colors.darkGrey, }}>Error in loading categories</p>
                    </Row>
                }

                {items.length === 0 ?
                    <Row>
                        <p style={{ padding: 20, textAlign: "center", marginBottom: 50, color: Colors.darkGrey, }}>No categories found</p>
                    </Row>
                    : null
                }
            </Row>
        </Container>
    )
}