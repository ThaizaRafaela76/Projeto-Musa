import "../Styles/BotaoEditarPublic.css"
import { LuPencilLine } from "react-icons/lu";


function BotaoEditarPublic({editarPublic, title}) {
    return (
        <button 
        onClick={editarPublic} className="botao-editar-public"
        title={title}>

        <LuPencilLine />

        </button>
    )
    
}

export default BotaoEditarPublic