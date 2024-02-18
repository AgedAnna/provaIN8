import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-scroll";
import logo from "./logo-in8-dev.svg";
import "./home.css";

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="background">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="transparent"
        variant="dark"
        expanded={expanded}
      >
        <Navbar.Brand
          as={Link}
          to="home"
          spy={true}
          smooth={true}
          duration={500}
        >
          <img src={logo} alt="logo" width="150px" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ marginRight: "20px" }}
          onClick={toggleExpanded}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={Link}
              to="cadastro"
              spy={true}
              smooth={true}
              duration={500}
              onClick={() => setExpanded(false)}
            >
              Cadastro
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="lista"
              spy={true}
              smooth={true}
              duration={500}
              onClick={() => setExpanded(false)}
            >
              Lista
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="sobre"
              spy={true}
              smooth={true}
              duration={500}
              onClick={() => setExpanded(false)}
            >
              Sobre Mim
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="titleEstagio">
        <h1 className="estagioh1">
          ESTÁGIO <br /> PROVA DE SELEÇÃO
        </h1>
      </div>
    </div>
  );
}

export default CustomNavbar;
