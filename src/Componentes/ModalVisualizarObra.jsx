import "../Styles/ModalVisualizarObra.css"
import BotaoDenuncia from '../Componentes/BotaoDenuncia'
import { IoCloseOutline } from "react-icons/io5"


function ModalVisualizarObra({ imagem, titulo, autora, categoria, descricao, fechar }) {

    return (
        <div className="modal-geral">
            <div className="btn-modal">
                <BotaoDenuncia />
                <button className="btn-fechar" onClick={fechar}><IoCloseOutline /></button>
            </div>
            <div className="org-modal">
                <div>
                    <div className="div-imagem">
                       <img src={imagem} />
                        <h1 className="titulo-obra">{titulo}</h1> 
                    </div>
                </div>
                <div className="div-info">
                    <h2>{autora}</h2>
                    <h3>{categoria}</h3>
                    <h3 className="descr-obra">{descricao}</h3>
                </div>
            </div>
        </div>
    )
}

export default ModalVisualizarObra