import React, { useState, useEffect } from "react";
import "./lista.css";
import TabPane from "antd/es/tabs/TabPane";
import { Card, Tabs } from "antd";
import { DeleteOutlined, UpCircleOutlined } from "@ant-design/icons";
import ScrollToTopButton from "../../components/buttonUp";

const Lista = ({ data, deleteUser }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderUserCards = () => {
    return data.map((user, index) => (
      <TabPane
        tab={<span className="custom-tab-title">{index + 1}</span>}
        key={index}
        className="custom-tab-pane"
      >
        <Card>
          <p>NOME: {user.name}</p>
          <p>EMAIL: {user.email}</p>
          <p>TELEFONE: {user.telefone}</p>
          <p>NASCIMENTO: {formatDate(user.nascimento)}</p>
          <button onClick={() => deleteUser(user.id)} className="delete">
            {" "}
            Deletar
          </button>
        </Card>
      </TabPane>
    ));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="lista" className="lista">
      <h1 className="titleLista">Lista de Cadastro</h1>
      {isMobile ? (
        <Tabs type="card">{renderUserCards()}</Tabs>
      ) : (
        <div className="table-responsive">
          <table className="lista-table table table-bordered border-primary">
            <thead>
              <tr>
                <th>#</th>
                <th>NOME</th>
                <th>EMAIL</th>
                <th>TELEFONE</th>
                <th>NASCIMENTO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.telefone}</td>
                    <td>{formatDate(item.nascimento)}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(item.id)}
                        className="delete"
                      >
                        <DeleteOutlined className="icon" /> Deletar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div class="up">
            <ScrollToTopButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default Lista;
