import { Link } from "react-router-dom";
import CampoInput from "./CampoInput";
import Botao from "./BotaoLogin";

import "../Styles/FormLogin.css";

const FormLogin = () => {
  return (
    <div className="form-login-container">
      <h1>
        Seja Bem-Vinda <span>👋</span>
      </h1>

      <p>
        Entre para explorar, valorizar e dar
        visibilidade à arte de mulheres incríveis.
      </p>

      <form className="form-login">

        <CampoInput
          label="Email ou Nome de Usuário"
          name="usuario"
          placeholder="Example@email.com"
        />

        <CampoInput
          label="Senha"
          name="senha"
          type="password"
          placeholder="Pelo menos 8 caracteres"
        />

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