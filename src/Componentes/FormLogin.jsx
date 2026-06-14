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

  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       senha
  //     );

  //     console.log("Usuário logado:", userCredential.user);

  //     navigate("/"); // ajuste conforme sua rota
  //   } catch (error) {
  //     console.error(error);

  //     alert("Email ou senha inválidos.");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const credencial = await signInWithEmailAndPassword(auth, email, senha);
      const token = await credencial.user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("uid", credencial.user.uid);
      navigate("/"); 
    } catch {
      setErro("Email ou senha inválida.");
    }
  }

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
          handleOnChange={(e) => setEmail(e.target.value)}
        />

        <CampoInput
          label="Senha"
          name="senha"
          type="password"
          placeholder="Pelo menos 8 caracteres"
          value={senha}
          handleOnChange={(e) => setSenha(e.target.value)}
        />
        { erro && <span style={{color: "red"}}>{erro}</span>}
        <div className="esqueceu-senha">
          <Link to="/recuperar-senha">
            Esqueceu sua senha?
          </Link>
        </div>

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