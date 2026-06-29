import "../Styles/BotaoExcluir.css"
import { LuTrash2 } from "react-icons/lu";

function BotaoExcluir({ excluirObra, variante }) {
    return (
        <button 
            className={variante === "bege" ? "botao-excluir-bege" : "botao-excluir"} 
            onClick={excluirObra}
        >
            <LuTrash2 />
        </button>
    )
}

export default BotaoExcluir