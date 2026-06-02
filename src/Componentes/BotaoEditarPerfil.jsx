import "../Styles/BotaoEditarPerfil.css"
import { FaPenToSquare } from "react-icons/fa6";


const BotaoEditarPerfil = ({aoClicar}) => {
    return (
        <>
            <button className="editar-perfil" onClick={aoClicar}>
                Editar perfil
                <FaPenToSquare />
            </button>
        </>
    )
}

export default BotaoEditarPerfil