import "../Styles/ModalDenuncia.css"
import { IoClose } from "react-icons/io5"
import { LuCopy } from "react-icons/lu"

function ModalDenuncia({ aberto, fecharModal }) {

    if (!aberto) {
        return null
    }

    return (
        <div className="overlay">

            <div className="modal-denuncia">

                <button
                    className="btn-fechar"
                    onClick={fecharModal}
                >
                    <IoClose />
                </button>

                <h2>
                    Notou algum comportamento ou situação
                    inadequada neste perfil?
                </h2>

                <p>
                    Envie um e-mail para nossa equipe responsável:
                </p>

                <div className="email-box">

                    <span>acervomusa@gmail.com</span>

                    <button className="btn-copy">
                        <LuCopy />
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ModalDenuncia