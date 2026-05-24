import { useState } from "react"
import "../Styles/ModalPublic.css"
import BotaoNovaPublic from "./BotaoNovaPublic"
import CampoTextoPublicacaoEPerfil from "./CampoTextoPublicacaoEPerfil"
import CampoImgPublic from "./CampoImgPublic"
import BotaoPublicar from "./BotaoPublicar"
import { FaX } from "react-icons/fa6";


function ModalPublic({aberto, fechado}) {

    if(!aberto) return null;

    const[formPublic, setFormPublic] = useState({
        nomeObra: "",
        artistaObra: "",
        descricaoObra: ""
    })

    return(
        <div className="modal-overlay">
        <div className="modal-publicacao">
            <div className="modal-public-header">
                <h2>Nova publicação</h2>
                <button className="fechar-modal-public" onClick={fechado}>
                <FaX />
                </button>
            </div>
            <div className="modal-public-conteudo">
                <div className="modal-public-esquerda">
                    <CampoImgPublic />
                    <h3>Categoria da obra</h3>
                </div>
                <div className="modal-public-direita">
                    <CampoTextoPublicacaoEPerfil 
                    value = {formPublic.nomeObra}
                    label="Nome da obra" 
                    tipo="input" 
                    placeholder="Girassóis ao Entardecer"
                    onChange={(e) => setFormPublic({...formPublic, nomeObra: e.target.value})} />
                    <CampoTextoPublicacaoEPerfil 
                    value = {formPublic.artistaObra}
                    label="Nome da artista" 
                    tipo="input" 
                    placeholder="Maria"
                    onChange={(e) => setFormPublic({...formPublic, artistaObra: e.target.value})} />
                    <CampoTextoPublicacaoEPerfil 
                    value={formPublic.descricaoObra}
                    label="Descrição" 
                    tipo="textarea" 
                    id="campo-descricao" 
                    placeholder="Conte-nos um pouco sobre sua obra... :)"
                    onChange={(e) => setFormPublic({...formPublic, descricaoObra: e.target.value})} />
                </div>
            </div>
            <BotaoPublicar publicarObra = {() => alert(`Obra ${formPublic.nomeObra} da artista ${formPublic.artistaObra} foi publicada com sucesso!`)} />
        </div>
        </div>
    )
}

export default ModalPublic