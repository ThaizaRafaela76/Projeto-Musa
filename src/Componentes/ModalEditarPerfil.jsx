import { useState } from "react"
import "../Styles/ModalEditarPerfil.css"
import CampoTextoPublicacaoEPerfil from "./CampoTextoPublicacaoEPerfil"
import CampoTextArea from "./CampoTextArea"
import BotaoSalvarAlteracoes from "./BotaoSalvarAlteracoes"
import { IoCloseOutline } from "react-icons/io5"

const ModalEditarPerfil = ({aberto, fechado}) => {

    if (!aberto) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-layout">
                <div className="header-editar">
                    <h2>Editar perfil</h2>
                    <button className="fechar-modal-editar" onClick={fechado}>
                        <IoCloseOutline />
                    </button>
                </div>
                <form className="editar-conteudo">
                    <div className="editar-lado-esquerdo">
                        <div>
                            <img className="foto-modal-editar" />
                        </div>
                        <div className="campos-lado-esquerdo">
                            <CampoTextoPublicacaoEPerfil
                                label="Nome de usuário"
                                name="nomeUsuario"
                                value="beaslva"
                            />
                            <div className="modal-filtro-cidade">
                                <h3>Cidade</h3>
                                <p>aqui é o campo do filtro</p>
                            </div>
                        </div>
                    </div>
                    <div className="editar-lado-direito">
                        <div className="campos-lado-direito">
                            <CampoTextoPublicacaoEPerfil
                                label="Nome completo"
                                name="nomeCompleto"
                                value="Beatriz Silva"
                            />
                            <CampoTextoPublicacaoEPerfil
                                label="Link do portfólio"
                                name="linkPortfolio"
                                value="www.beaslva.com.br"
                            />
                            <CampoTextoPublicacaoEPerfil
                                label="Redes sociais"
                                name="redeSocialArtista"
                                value="@beaslva.arts"
                            />
                            <CampoTextoPublicacaoEPerfil
                                label="Contato"
                                name="contatoArtista"
                                value="beatrizsilva@gmail.com"
                            />
                            <CampoTextArea 
                                label="Descrição"
                                name="descricaoArtista"
                                value="Sou artista visual interessada nos limiares entre matéria e memória. Faço trabalhos com tinta a óleo e tecidos descartados. Também sou apaixonada por colagens e ando me arriscando na produção de xilogravura. Amo bichinhos e flores, e sempre dou um jeito de representá-los na minha arte de alguma forma."
                            />
                        </div>
                        <BotaoSalvarAlteracoes />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalEditarPerfil