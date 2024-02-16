import React from "react";
import logo from "./logo-in8-dev.svg";
import "./home.css";

const Home = ({ scrollToSection }) => {
  return (
    <div className="background">
      <nav class="navbar">
        <img src={logo} alt="Logo IN8 Dev" class="logo" />
        <ul class="nav-list">
          <li>
            <a href="#cadastro" onClick={() => scrollToSection("cadastro")}>
              cadastro <span class="bullet">•</span>
            </a>
          </li>
          <li>
            <a href="#lista" onClick={() => scrollToSection("lista")}>
              lista <span class="bullet">•</span>
            </a>
          </li>
          <li>
            <a href="#sobre" onClick={() => scrollToSection("sobre")}>
              sobre mim<span class="bullet"></span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="title">
        <h1>ESTÁGIO</h1>
        <div>
          <h2>PROVA DE SELEÇÃO</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
