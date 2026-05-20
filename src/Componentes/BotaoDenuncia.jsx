import "../Styles/BotaoDenuncia.css"
import { IoWarningOutline } from "react-icons/io5"

function BotaoDenuncia({ abrirModal }) {

    return (
        <button
            className="botao-denuncia"
            onClick={abrirModal}
        >
            <IoWarningOutline />
        </button>
    )
}

export default BotaoDenuncia