import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home/home';
import Cadastro from './pages/cadastro/cadastro';
import Lista from './pages/lista/lista';
import Sobre from './pages/sobre/sobre';

function App() {
  // Função para rolar suavemente para uma seção específica
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        behavior: "smooth",
        top: section.offsetTop,
      });
    }
  };

  return (
    <>
      <Home scrollToSection={scrollToSection} />
      <Cadastro />
      <Lista />
      <Sobre />
    </>
  );
}

export default App;
