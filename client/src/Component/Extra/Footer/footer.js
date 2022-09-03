import React from "react";
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./FooterStyles";
const Footer = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    return (
        user?.result?.role === 1 ?
            (<></>)
            :
            (<Box>
                <Container style={{ marginTop: "20px" }} >
                    <Row>
                        <Column>
                            <Heading style={{ cursor: 'pointer', letterSpacing: '2px', color: "white", fontWeight: 600 }} >Pages</Heading>
                            <FooterLink style={{ cursor: 'pointer', letterSpacing: '2px', color: "white" }} href="http://localhost:3000/food">Food</FooterLink>
                            <FooterLink style={{ cursor: 'pointer', letterSpacing: '2px', color: "white" }} href="http://localhost:3000/room">Room</FooterLink>
                            <FooterLink style={{ cursor: 'pointer', letterSpacing: '2px', color: "white" }} href="http://localhost:3000/auth">Auth</FooterLink>
                        </Column>
                        <Column>
                            <Heading style={{ cursor: 'pointer', letterSpacing: '2px', fontWeight: 600 }}>Contact Us</Heading>
                            <FooterLink style={{ cursor: 'pointer', letterSpacing: '2px', color: "white" }} href="/" target="_blank">Email</FooterLink>
                            <FooterLink style={{ cursor: 'pointer', letterSpacing: '2px', color: "white" }} href="tel:+9845716181" target="_blank">Phone</FooterLink>
                            <FooterLink style={{ cursor: 'pointer', letterSpacing: '2px', color: "white" }} href="/" target="_blank">Google Map</FooterLink>
                        </Column>
                        <Column>
                            <Heading style={{ cursor: 'pointer', letterSpacing: '2px', fontWeight: 600 }}>Social Media</Heading>
                            <FooterLink style={{ cursor: 'pointer', letterSpacing: '2px', color: "white" }} href="/" target="_blank">
                                <span>
                                    Facebook
                                </span>
                            </FooterLink>
                            <FooterLink style={{ cursor: 'pointer', letterSpacing: '2px', color: "white" }} href="/" target="_blank">
                                <span>
                                    WhatsApp
                                </span>
                            </FooterLink>
                            <FooterLink style={{ cursor: 'pointer', letterSpacing: '2px', color: "white" }} href="/" target="_blank">
                                <span>
                                    Instagram
                                </span>
                            </FooterLink>
                        </Column>
                    </Row>
                </Container>
            </Box>)
    );
};
export default Footer;