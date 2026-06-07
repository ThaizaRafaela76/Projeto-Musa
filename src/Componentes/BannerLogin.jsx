import "../Styles/BannerLogin.css";

const BannerLogin = ({ imagem }) => {
  return (
    <div className="banner-login">
      <img src={imagem} alt="Banner Login" />
    </div>
  );
};

export default BannerLogin;