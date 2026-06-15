import "../Styles/BotaoExcluir.css"
import { LuTrash2 } from "react-icons/lu";


 
function BotaoExcluir({ excluirObra }) {
    return (
        <button className="botao-excluir" onClick={excluirObra}>
            <LuTrash2 />
        </button>
    )
}
 
export default BotaoExcluir