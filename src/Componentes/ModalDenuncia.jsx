import { useState } from "react"
import { LuCopy, LuCopyCheck } from "react-icons/lu"

import "../Styles/ModalDenuncia.css"
import { IoClose } from "react-icons/io5"
//import { LuCopy } from "react-icons/lu"

function ModalDenuncia({ aberto, fecharModal }) {

    const [copiado, setCopiado] = useState(false)

    function copiarEmail() {
    navigator.clipboard.writeText("acervomusa@gmail.com")
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
    }

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
                    inadequados?
                </h2>

                <p>
                    Envie um e-mail para nossa equipe responsável:
                </p>

                <div className="email-copy-wrapper">
                    <div className="msg-copiado-wrapper"></div>
                    <div className="email-box">
                        <span>acervomusa@gmail.com</span>
                        <button className="btn-copy" onClick={copiarEmail}>
                            {copiado ? <LuCopyCheck /> : <LuCopy />}
                        </button>
                    </div>
                    <div className="msg-copiado-wrapper">
                        {copiado && <span className="msg-copiado">copiado!</span>}
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default ModalDenuncia