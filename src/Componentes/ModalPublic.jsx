import "../Styles/ModalPublic.css"
import BotaoNovaPublic from "./BotaoNovaPublic"
import CampoTextoPublicacaoEPerfil from "./CampoTextoPublicacaoEPerfil"
import BotaoPublicar from "./BotaoPublicar"

function ModalPublic({aberto, fechado}) {

    if(!aberto) return null;

    return(
        <div className="modal-publicacao">
            <button className="fechar-modal-public" onClick={fechado}>X</button>
            <h2>Publicação</h2>
            <div className="modal-public-conteudo">
                <div className="modal-public-esquerda">
                    <CampoTextoPublicacaoEPerfil label="Nome da obra" tipo="input" placeholder="nome da obra"/>
                </div>
                <div className="modal-public-direita">
                    <CampoTextoPublicacaoEPerfil label="Nome da obra" tipo="input" placeholder="nome da obra"/>
                    <CampoTextoPublicacaoEPerfil label="Nome da artista" tipo="input" placeholder="seu nome"/>
                    <CampoTextoPublicacaoEPerfil label="Descrição" tipo="textarea" placeholder="descrição" />
                </div>
            </div>
            <BotaoPublicar />
        </div>
    )
}

export default ModalPublic