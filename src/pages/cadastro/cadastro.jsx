import React, { useEffect, useState } from "react";
import "./cadastro.css";
import { initializeApp } from "firebase/app";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Lista from "../lista/lista";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({});

  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollection = collection(db, "users");

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      let isValid = true;

      if (!name.trim()) {
        newErrors.name = "Nome é obrigatório.";
        isValid = false;
      }

      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "E-mail inválido.";
        isValid = false;
      }

      if (!telefone.trim() || telefone.length < 8 || telefone.length > 13) {
        newErrors.telefone = "Telefone inválido.";
        isValid = false;
      }

      if (!nascimento.trim()) {
        newErrors.nascimento = "Data de nascimento é obrigatória.";
        isValid = false;
      }

      setErrors(newErrors);
      setIsButtonDisabled(!isValid);
    };

    validateForm();
  }, [name, email, telefone, nascimento]);

  async function createUser() {
    try {
      const user = await addDoc(userCollection, {
        name,
        email,
        nascimento,
        telefone,
      });
      toast.success("Usuário criado com sucesso!");
      console.log(user);
      setUsers([...users, { name, email, nascimento, telefone, id: user.id }]);
      setName("");
      setEmail("");
      setTelefone("");
      setNascimento("");
    } catch (error) {
      toast.error("Erro ao criar usuário.");
      console.error("Error creating user: ", error);
    }
  }

  async function deleteUser(id) {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      toast.success("Usuário excluído com sucesso!");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      toast.error("Erro ao excluir usuário.");
      console.error("Error deleting user: ", error);
    }
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
        <h1 className="titleCad">Cadastro</h1>
        <div className="input-container">
          <div className="input-wrapper">
            <label>
              Nome <span style={{ color: "red" }}> * </span>
            </label>
            <input
              type="text"
              className="input-text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="input-wrapper">
            <label>
              E-mail <span style={{ color: "red" }}> * </span>
            </label>
            <input
              type="email"
              className="input-text"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="input-wrapper">
            <label>
              Nascimento <span style={{ color: "red" }}> * </span>
            </label>
            <input
              type="date"
              className="input-text"
              placeholder="Nascimento"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
            />
            {errors.nascimento && <p className="error">{errors.nascimento}</p>}
          </div>
          <div className="input-wrapper" style={{ color: "white" }}>
            <label>
              Telefone <span style={{ color: "red" }}> * </span>
            </label>
            <input
              type="tel"
              className="input-text"
              value={telefone}
              placeholder="(00) 9999 9999"
              onChange={(e) => setTelefone(e.target.value)}
            />
            {errors.telefone && <p className="error">{errors.telefone}</p>}
          </div>
          <div className="buttonDiv">
            <button
              onClick={createUser}
              className={`buttonCadastrar ${isButtonDisabled ? "loading" : ""}`}
              disabled={isButtonDisabled}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>

      <div>
        <Lista data={users} deleteUser={deleteUser} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastContainerStyle={{
          width: "100%",
          zIndex: 9999,
          position: "fixed",
          top: "0",
          left: "0",
          margin: "0",
          padding: "0px",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default Cadastro;
