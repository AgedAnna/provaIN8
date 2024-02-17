import React from 'react';
import './App.css';
import Home from './pages/home/home';
import Cadastro from './pages/cadastro/cadastro';
import Sobre from './pages/sobre/sobre';


function App() {


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
      <Sobre />
    </>
  );
}

export default App;
