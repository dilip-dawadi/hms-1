import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ContactUsListScreen from "../../../Admin/AdminScreens/ContactUs/ContactList";
import ContactUsImage from "../../../images/ContactUsImage.jpg";
import Message from "../../../Message/Message";
import { contactUs } from "../../../redux/actions/contactUs";
import { CONTACT_US_RESET } from "../../../redux/constants/actionTypes";

const ContactUs = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const contactUsDetail = useSelector((state) => state.contactUs);
  const { success: successContact, error: errorContact } = contactUsDetail;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comment: "",
  });

  const { firstName, lastName, email, comment } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(contactUs(formData));
    dispatch({ type: CONTACT_US_RESET });
  };

  if (user?.result?.role) {
    return <ContactUsListScreen />;
  }

  return (
    <div style={{ height: "100vh" }}>
      <Image
        src={ContactUsImage}
        fluid
        style={{ width: "100%", height: "18rem" }}
      />
      <Container>
        <Row>
          <Col
            style={{
              background: "#faf6f6",
              textAlign: "center",
              position: "absolute",
              top: "11rem",
              left: "11rem",
              width: "34%",
            }}
          >
            <i
              className="fa-solid fa-phone my-3"
              style={{ fontSize: "2rem", color: "black" }}
            />
            <h5 className="mb-2">Talk to Manager</h5>
            <p className="text-black" style={{ marginBottom: "6rem" }}>
              Having problem with the service? Just pick up the phone to have a
              chat with the manager.
            </p>
            <p style={{ cursor: "pointer", color: "darkblue" }}>
              +977 9846877737
            </p>
          </Col>
          <Col
            style={{
              background: "#faf6f6",
              textAlign: "center",
              position: "absolute",
              top: "11rem",
              right: "11rem",
              width: "34%",
            }}
          >
            <i
              className="fas fa-comments text-black my-3"
              style={{ fontSize: "2rem" }}
            />
            <h5 className="my-3">Contact Customer Support</h5>

            {successContact && (
              <Message variant="success">Message Sent Successfully</Message>
            )}
            {errorContact && <Message variant="danger">{errorContact}</Message>}
            <div style={{ marginLeft: "2rem" }}>
              <Form className="mb-3" onSubmit={submitHandler}>
                <Form.Group controlId="firstName" className="mb-2">
                  <Form.Control
                    type="name"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => onChange(e)}
                    className="bg-white"
                    style={{
                      boxShadow: "0px 1px 1px rgba(1,1,1,0.2)",
                      width: "90%",
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="lastName" className="mb-2">
                  <Form.Control
                    type="name"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => onChange(e)}
                    className="bg-white"
                    style={{
                      boxShadow: "0px 1px 1px rgba(1,1,1,0.2)",
                      width: "90%",
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="mb-2">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => onChange(e)}
                    className="bg-white"
                    style={{
                      boxShadow: "0px 1px 1px rgba(1,1,1,0.2)",
                      width: "90%",
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="comment" className="mb-2">
                  <Form.Control
                    as="textarea"
                    name="comment"
                    placeholder="Your Queries?"
                    value={comment}
                    onChange={(e) => onChange(e)}
                    className="bg-white"
                    style={{
                      boxShadow: "0px 1px 1px rgba(1,1,1,0.2)",
                      width: "90%",
                      resize: "none",
                    }}
                  ></Form.Control>
                </Form.Group>
                <Button
                  id="contactUsBtn"
                  type="submit"
                  className="my-2"
                  style={{ backgroundColor: "#595775" }}
                >
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
