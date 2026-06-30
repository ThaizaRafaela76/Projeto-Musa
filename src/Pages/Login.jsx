import FormLogin from "../Componentes/FormLogin";
import BannerLogin from "../Componentes/BannerLogin";

import imagemLogin from "../assets/login-image.png";
import logo from "../assets/logo_musa2.png";
import { useNavigate } from "react-router-dom";

import "../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate() // Inicializa a função para mudar de página
  return (
    <main className="login-page">

      {/* LOGO TOPO (fora do card, como seu CSS pede) */}
      <img
        src={logo}
        alt="Musa"
        className="login-logo-topo"

        // EVENTO DE CLIQUE: Quando o usuário clica no logo, ele é mandado de volta para a página inicial ("/")
        onClick={()=>{navigate("/")}}

        // ESTILO EM LINHA: Muda o cursor do mouse para aquela "mãozinha" indicando que o logo é clicável
        style={{cursor: "pointer"}}

        
      />

      {/* CARD PRINCIPAL (não mexe na estrutura interna) */}
      <div className="login-card">

        <FormLogin />

        <BannerLogin imagem={imagemLogin} />

      </div>

    </main>
  );
};

export default Login;