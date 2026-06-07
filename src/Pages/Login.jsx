import FormLogin from "../Componentes/FormLogin";
import BannerLogin from "../Componentes/BannerLogin";

import imagemLogin from "../assets/login-image.png";

import "../Styles/Login.css";

const Login = () => {
  return (
    <main className="login-page">

      <div className="login-card">

        <FormLogin />

        <BannerLogin imagem={imagemLogin} />

      </div>

    </main>
  );
};

export default Login;