import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import CampoInput from "./CampoInput";
import Botao from "./BotaoLogin";

import { auth } from "../firebaseConfig";

import "../Styles/FormLogin.css";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setErro("");
    setErroEmail("");
    setErroSenha("");

    let possuiErro = false;

    if (!email.trim()) {
      setErroEmail("Campo obrigatório");
      possuiErro = true;
    }

    if (!senha.trim()) {
      setErroSenha("Campo obrigatório");
      possuiErro = true;
    }

    if (possuiErro) {
      return;
    }

    try {
      const credencial = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      const token = await credencial.user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem("uid", credencial.user.uid);

      navigate("/");
    } catch (error) {
      setErro("Email ou senha inválidos.");

      setErroEmail("Verifique este campo");
      setErroSenha("Verifique este campo");
    }
  };

  return (
    <div className="form-login-container">
      <h1>
        Seja Bem-Vinda <span>👋</span>
      </h1>

      <p>
        Entre para explorar, valorizar e dar
        visibilidade à arte de mulheres incríveis.
      </p>

      <form
        className="form-login"
        onSubmit={handleLogin}
      >
        <CampoInput
          label="Email"
          name="email"
          placeholder="Example@email.com"
          value={email}
          handleOnChange={(e) => {
            setEmail(e.target.value);

            if (erroEmail) {
              setErroEmail("");
            }
          }}
          erro={erroEmail}
        />

        <CampoInput
          label="Senha"
          name="senha"
          type="password"
          placeholder="Pelo menos 8 caracteres"
          value={senha}
          handleOnChange={(e) => {
            setSenha(e.target.value);

            if (erroSenha) {
              setErroSenha("");
            }
          }}
          erro={erroSenha}
        />

        {erro && (
          <span style={{ color: "red" }}>
            {erro}
          </span>
        )}

        <Botao
          texto="Entrar"
          type="submit"
        />
      </form>

      <p className="cadastro-link">
        Você não tem uma conta?
        <Link to="/cadastro">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
};

export default FormLogin;