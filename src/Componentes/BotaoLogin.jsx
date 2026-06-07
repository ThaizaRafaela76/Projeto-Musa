import "../Styles/BotaoLogin.css";

const BotaoLogin = ({
  texto,
  type = "button",
  onClick
}) => {
  return (
    <button
      className="botao-login"
      type={type}
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default BotaoLogin;