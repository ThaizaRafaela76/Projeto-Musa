import FormLogin from "../Componentes/FormLogin";
import BannerLogin from "../Componentes/BannerLogin";

import imagemLogin from "../assets/login-image.png";
import logo from "../assets/logo_musa2.png";
import { useNavigate } from "react-router-dom";

import "../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate()
  return (
    <main className="login-page">

      {/* LOGO TOPO (fora do card, como seu CSS pede) */}
      <img
        src={logo}
        alt="Musa"
        className="login-logo-topo"
        onClick={()=>{navigate("/")}}
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