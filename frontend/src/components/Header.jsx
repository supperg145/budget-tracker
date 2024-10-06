import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FaMoneyBillWave } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar bg="dark" expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaMoneyBillWave /> Budget Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/transactions">
              Transactions
            </Nav.Link>
            <Nav.Link as={Link} to="/add">
              New Transaction
            </Nav.Link>
            <Nav.Link as={Link} to="/chart">
              Chart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
