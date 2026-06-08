import "../Styles/ModalSair.css";

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebaseConfig";

function ModalSair({ onFechar }) {
  const navigate = useNavigate();

  async function handleConfirmar() {
    try {
      await signOut(auth);

      alert("Você saiu com sucesso!");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao sair.");
    }
  }

  return (
    <div className="overlay-sair" onClick={onFechar}>
      <div
        className="div-geral-sair"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="texto-sair">
          Tem certeza que deseja sair?
        </h1>

        <div className="div-bnts">
          <button
            className="bnt-confirmar"
            onClick={handleConfirmar}
          >
            Confirmar
          </button>

          <button
            className="bnt-cancelar"
            onClick={onFechar}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSair;