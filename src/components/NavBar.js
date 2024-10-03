import React, { useState, useEffect } from 'react'
import { Image, Nav, Navbar, NavDropdown, Container, Form, Button } from 'react-bootstrap';
import { Colors } from '../common/ConstantStyles';
import './CommonStyle.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from './api';
import { fetchCartItems } from '../redux/actions/cartAction';

export default function NavBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [url, setUrl] = useState(null);

    const [categoryList, setCategoryList] = useState([]);
    // const [showShopDropdown, setShowShopDropdown] = useState(false);
    // const [showLoginDropdown, setShowLoginDropdown] = useState(false);

    const loginid = localStorage.getItem("userLoginId");
    const name = localStorage.getItem("userName");

    const { cart } = useSelector(state => state.cart);

    useEffect(() => {
        let toInput = {
            userID: loginid,
        };
        dispatch(fetchCartItems(toInput));
        fetchAllCategories();
        setUrl(location.pathname);
    }, [location, dispatch, loginid])

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

    const checkLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div>
            <nav className="colorlib-nav" role="navigation">
                <div className="top-menu">
                    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
                        <Container fluid>
                            <Navbar.Brand href={Link} to="/home"><Image src="../images/AjayCoProductsLogo.png" alt='gradient' height={60} width={200} /></Navbar.Brand>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="justify-content-center flex-grow-1">
                                    <Nav.Link style={{ marginLeft: 10, marginRight: 10, textAlign: "center" }} as={Link} className={"underline" + (url === "/home" ? " activenav" : "")} to="/home">Home</Nav.Link>
                                    <Nav.Link style={{ marginLeft: 10, marginRight: 10, textAlign: "center" }} as={Link} className={"underline" + (url === "/categories" ? " activenav" : "")} to="/categories">Categories</Nav.Link>
                                    <NavDropdown
                                        title="Shop"
                                        id="collapsible-nav-dropdown"
                                        style={{ marginLeft: 10, marginRight: 10, textAlign: "center" }}
                                    >
                                        {categoryList.map((data, key) =>
                                            <NavDropdown.Item as={Link} to="/shop" state={{ categoryId: data._id }} key={data._id}>{data.categoryName}</NavDropdown.Item>
                                        )}

                                    </NavDropdown>
                                    <Nav.Link style={{ marginLeft: 10, marginRight: 10, textAlign: "center" }} as={Link} className={"underline" + (url === "/aboutus" ? " activenav" : "")} to="/aboutus">About us</Nav.Link>
                                    <Nav.Link style={{ marginLeft: 10, marginRight: 10, textAlign: "center" }} as={Link} className={"underline" + (url === "/contactus" ? " activenav" : "")} to="/contactus">Contact Us</Nav.Link>
                                    <Nav.Link style={{ marginLeft: 10, marginRight: 10, textAlign: "center" }} as={Link} className={"underline" + (url === "/cart" ? " activenav" : "")} to="/cart">Cart <i className="icon-shopping-cart" /> [{cart.length}]</Nav.Link>
                                    {!loginid ?
                                        <Nav.Link style={{ marginLeft: 10, marginRight: 10 }} as={Link} to="/login">Login</Nav.Link>
                                        :
                                        <div></div>
                                    }
                                    {loginid ?
                                        <NavDropdown
                                            title={name}
                                            id="collapsible-nav-dropdown"
                                            style={{ marginLeft: 10, marginRight: 10 }}
                                        >
                                            <NavDropdown.Item as={Link} to="/changepassword">Change Password</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => { checkLogout() }}>Logout</NavDropdown.Item>

                                        </NavDropdown>
                                        :
                                        <div></div>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                            <Form className="d-flex align-items-center">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    type="submit"
                                    style={{ backgroundColor: Colors.primaryViolet, borderWidth: 1, borderColor: Colors.primaryViolet, color: Colors.white, fontWeight: 'bold', marginTop: 3 }}>
                                    <i className="icon-search"></i>
                                </Button>
                            </Form>

                        </Container>
                    </Navbar>

                </div>
            </nav>
        </div>
    );
}