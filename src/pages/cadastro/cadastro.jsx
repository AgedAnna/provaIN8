import React, { useEffect, useState } from "react";
import "./cadastro.css";
import { initializeApp } from "firebase/app";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Lista from "../lista/lista";

const Cadastro = () => {
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyBxJcQpISiuminZYaE3Vxk614C-K3cb32w",
    authDomain: "provain8.firebaseapp.com",
    projectId: "provain8",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nascimento, setNascimento] = useState("");

  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollection = collection(db, "users");

  async function createUser() {
    const user = await addDoc(userCollection, {
      name,
      email,
      nascimento,
      telefone,
    });
    console.log(user);
  }

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollection);
      console.log(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <>
      <div id="cadastro" className="cadastro">
        <h1>Cadastro</h1>
        <div className="input-container">
          <div className="input-wrapper">
            <label>Nome</label>
            <input
              type="text"
              className="input-text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label>E-mail</label>
            <input
              type="email"
              className="input-text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label>Nascimento</label>
            <input
              type="date"
              className="input-text"
              placeholder="Nascimento"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label>Telefone</label>
            <input
              type="tel"
              className="input-text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <button onClick={createUser} className="buttonCadastrar">
            Cadastrar
          </button>
        </div>
      </div>

      <div>
        <Lista data={users} deleteUser={deleteUser} />
      </div>
    </>
  );
};

export default Cadastro;
