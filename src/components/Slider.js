import React from 'react'
import { Carousel, Image, Button } from 'react-bootstrap';
import { Colors } from '../common/ConstantStyles';
import { useNavigate } from 'react-router-dom';

export default function Slider() {

    const navigate = useNavigate();

    return (

        <div className="text-center">
            <Carousel variant="dark" nextLabel={false} prevLabel={false} indicators={false} fade={true}>
                <Carousel.Item interval={3000}>
                    <Image src="../images/img7.png" alt='gradient' height={500} width={"100%"} />
                    <Carousel.Caption>
                        <p><span style={{ fontSize: 30, color: Colors.white, fontWeight: "bolder" }}>Welcome To AjayCo Products</span> </p>
                        <p><span style={{ fontSize: 15, color: Colors.golden, fontWeight: "bolder" }}>Embroidery Hoops, Kits & Stand Manufacturer</span></p>
                        <Button variant="primary" style={{ marginBottom: 60, backgroundColor: Colors.black, borderColor: Colors.black, fontWeight: "bold" }} onClick={() => { navigate("/categories", { state: { id: "0", } }); }}>Explore Now</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <Image src="../images/img8.png" alt='gradient' height={500} width={"100%"} />
                    <Carousel.Caption>
                        <p><span style={{ fontSize: 30, color: Colors.white, fontWeight: "bolder" }}>Manufacturer of Embroidery Hoops</span></p>
                        <p> <span style={{ fontSize: 15, color: Colors.golden, fontWeight: "bolder" }}>Since 1993 with focus in frame industries</span></p>
                        <Button variant="primary" style={{ marginBottom: 60, backgroundColor: Colors.black, borderColor: Colors.black, fontWeight: "bold" }} onClick={() => { navigate("/categories", { state: { id: "0", } }); }}>Explore Now</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <Image src="../images/img9.png" alt='gradient' height={500} width={"100%"} />
                    <Carousel.Caption>
                        <p><span style={{ fontSize: 30, color: Colors.white, fontWeight: "bolder" }}>Best Material with Deeper Trust</span></p>
                        <p><span style={{ fontSize: 15, color: Colors.golden, fontWeight: "bolder" }}>Maintaining Relations since 1993</span></p>
                        <Button variant="primary" style={{ marginBottom: 60, backgroundColor: Colors.black, borderColor: Colors.black , fontWeight: "bold"}} onClick={() => { navigate("/categories", { state: { id: "0", } }); }}>Explore Now</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>

    )
}