import { useState, useEffect } from "react"
import "../Styles/ModalEditarPerfil.css"
import CampoTextoPublicacaoEPerfil from "./CampoTextoPublicacaoEPerfil"
import CampoTextArea from "./CampoTextArea"
import BotaoSalvarAlteracoes from "./BotaoSalvarAlteracoes"
import Filtro from "../Componentes/Filtro"
import { IoCloseOutline } from "react-icons/io5"

const ModalEditarPerfil = ({aberto, fechado, artista, onSalvar}) => {
    const [form, setForm] = useState({
        nomeCompleto: "",
        nomeUsuario: "",
        localizacao: "",
        linkPortfolio: "",
        linkInstagram: "",
        email: "",
        descricao: "",
        areaAtuacao: "",
        fotoPerfil: "",
    })

    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        if (artista && aberto) {
            setForm({
                nomeCompleto: artista.nomeCompleto || "",
                nomeUsuario: artista.nomeUsuario || "",
                localizacao: artista.localizacao || "",
                linkPortfolio: artista.linkPortfolio || "",
                linkInstagram: artista.linkInstagram || "",
                email: artista.email || "",
                descricao: artista.descricao || "",
                areaAtuacao: artista.areaAtuacao || "",
                fotoPerfil: artista.fotoPerfil || "",
            })
        }
    }, [artista, aberto])
    
    const handleChange = (campo, valor) => {
        setForm(prev => ({ ...prev, [campo]: valor }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (onSalvar) {
                await onSalvar(form)
            }
            fechado()
        } catch (error) {
            console.error(error)
            alert("Erro ao salvar alterações: " + (error.response?.data?.erro || error.message))
        } finally {
            setLoading(false)
            if (onSalvar){
                await onSalvar(form)
            }
        }

    }

    const [filtro, setFiltro] = useState("");
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [ordemAberta, setOrdemAberta] = useState(false);
    
    if (!aberto) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-layout">
                <div className="header-editar">
                    <h2>Editar perfil</h2>
                    <button className="fechar-modal-editar" onClick={fechado}>
                        <IoCloseOutline />
                    </button>
                </div>
                <form className="editar-conteudo" onSubmit={handleSubmit}>
                    <div className="editar-lado-esquerdo">
                        <div>
                            <img className="foto-modal-editar" src={artista.fotoPerfil} />
                        </div>
                        <div className="campos-lado-esquerdo">
                            <CampoTextoPublicacaoEPerfil
                                label="Nome de usuário"
                                name="nomeUsuario"
                                value={form.nomeUsuario}
                                handleOnChange={(e) => handleChange("nomeUsuario", e.target.value)}
                            />
                            <div className="modal-filtro-cidade">
                                <h3>Cidade</h3>
                                <Filtro opcoes={[
                                    { value: "", label: "Todas as cidades" },
                                    { value: "Banabuiu", label: "Banabuiu" },
                                    { value: "Choró", label: "Choró" },
                                    { value: "Deputado Irapuan Pinheiro", label: "Deputado Irapuan Pinheiro" },
                                    { value: "Ibaretama", label: "Ibaretama" },
                                    { value: "Ibicuitinga", label: "Ibicuitinga" },
                                    { value: "Milhã", label: "Milhã" },
                                    { value: "Mombaça", label: "Mombaça" },
                                    { value: "Pedra Branca", label: "Pedra Branca" },
                                    { value: "Piquet Carneiro", label: "Piquet Carneiro" },
                                    { value: "Quixadá", label: "Quixadá" },
                                    { value: "Quixeramobim", label: "Quixeramobim" },
                                    { value: "Senador", label: "Senador" },
                                    { value: "Solonopole", label: "Solonopole" },
                                ]}
                                    valor={filtro}
                                    onChange={(valor) => {
                                        setFiltro(valor);
                                    }}
                                    aberto={filtroAberto}
                                    setAberto={setFiltroAberto}
                                    ordemAberta={ordemAberta}
                                    setOrdemAberta={setOrdemAberta}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="editar-lado-direito">
                        <div className="campos-lado-direito">
                            <CampoTextoPublicacaoEPerfil
                                label="Nome completo"
                                name="nomeCompleto"
                                value={form.nomeCompleto}
                                handleOnChange={(e) => handleChange("nomeCompleto", e.target.value)}
                            />
                            <CampoTextoPublicacaoEPerfil
                                label="Link do portfólio"
                                name="linkPortfolio"
                                placeholder="https://meuportfolio.com"
                                value={form.linkPortfolio}
                                handleOnChange={(e) => handleChange("linkPortfolio", e.target.value)}
                            />
                            <CampoTextoPublicacaoEPerfil
                                label="Redes sociais"
                                name="redeSocialArtista"
                                placeholder="@seu.instagram"
                                value={form.linkInstagram}
                                handleOnChange={(e) => handleChange("linkInstagram", e.target.value)}
                            />
                            <CampoTextoPublicacaoEPerfil
                                label="Contato"
                                name="contatoArtista"
                                value="beatrizsilva@gmail.com"
                                placeholder="Fale um pouco sobre você e sua arte..."
                                value={form.email}
                                handleOnChange={(e) => handleChange("email", e.target.value)}
                            />
                            <CampoTextArea 
                                label="Descrição"
                                name="descricaoArtista"
                                placeholder="Fale um pouco sobre você e sua arte..."
                                value={form.descricao}
                                handleOnChange={(e) => handleChange("descricao", e.target.value)}
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