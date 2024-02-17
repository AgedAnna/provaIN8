import React from "react";
import "./lista.css";

const Lista = ({ data, deleteUser }) => {
  return (
    <div id="lista" className="lista">
      <h1>Lista</h1>
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.id}>
              {item.nome} - {item.email} - {item.telefone} - {item.nascimento}
              <button onClick={() => deleteUser(item.id)}>Deletar</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Lista;
