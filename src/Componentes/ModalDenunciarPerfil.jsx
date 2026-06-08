import { useState } from "react"
import { LuCopy, LuCopyCheck } from "react-icons/lu"
import { IoClose } from "react-icons/io5"
import "../Styles/ModalDenunciarPerfil.css"

function ModalDenunciarPerfil({ aberto, fecharModal }) {

    const [copiado, setCopiado] = useState(false)

    function copiarEmail() {
        navigator.clipboard.writeText("acervomusa@gmail.com")
        setCopiado(true)
        setTimeout(() => setCopiado(false), 2000)
    }

    if (!aberto) return null

    return (
        <div className="overlay-perfil">
            <div className="modal-denunciar-perfil">

                <button className="btn-fechar-perfil" onClick={fecharModal}>
                    <IoClose />
                </button>

                <h2>
                    Notou algum comportamento ou situação
                    inadequada neste perfil?
                </h2>

                <p>
                    Envie um e-mail para nossa equipe responsável:
                </p>

                <div className="email-copy-wrapper-perfil">
                    <div className="msg-copiado-wrapper-perfil"></div>
                    <div className="email-box-perfil">
                        <span>acervomusa@gmail.com</span>
                        <button className="btn-copy-perfil" onClick={copiarEmail}>
                            {copiado ? <LuCopyCheck /> : <LuCopy />}
                        </button>
                    </div>
                    <div className="msg-copiado-wrapper-perfil">
                        {copiado && <span className="msg-copiado-perfil">copiado!</span>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ModalDenunciarPerfil