import React from "react";
import { Col, Image, Row, NavDropdown, Nav } from "react-bootstrap";
import PersonImage from "../assets/images/person.png";
import { useNavigate } from "react-router-dom";
import {Colors, FontSize} from '../common/ConstantStyles';

const Header = () => {

  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName");
  const userMobile = localStorage.getItem("userMobile");

  const navigate = useNavigate();

  const checkLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div>

      <Row>

        <Col>

          <div style={{ textAlign: "right", paddingTop: 20, paddingBottom: 20,  }}>

            <Nav className="justify-content-end">

              <Row>
                <div style={{ fontSize: FontSize.smallMedium, color: Colors.darkGrey, alignSelf: "center", paddingRight: 30 }}>

                    <div>{userRole}</div>
                  <div>{userName} - {userMobile}</div>
                </div>
              </Row>

              <Image src={PersonImage} className="banner_img" alt="check" height={40} />

              <NavDropdown id="nav-dropdown-dark-example" >

                <NavDropdown.Item href="/changeadminpassword" style={{ fontSize: 12, color: Colors.black }}>Change Password</NavDropdown.Item>

                <NavDropdown.Item onClick={() => checkLogout()} style={{ fontSize: 12, color: Colors.black }}>Logout</NavDropdown.Item>

              </NavDropdown>

            </Nav>

          </div>

        </Col>
      </Row>

    </div>
  );
}

export default Header;