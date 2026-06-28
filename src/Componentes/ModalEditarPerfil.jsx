import { useState, useEffect } from "react"
import "../Styles/ModalEditarPerfil.css"
import CampoTextoPublicacaoEPerfil from "./CampoTextoPublicacaoEPerfil"
import CampoTextArea from "./CampoTextArea"
import BotaoSalvarAlteracoes from "./BotaoSalvarAlteracoes"
import Filtro from "../Componentes/Filtro"
import { IoCloseOutline } from "react-icons/io5"
import { atualizarFotoPerfil } from "../services/artistasService"

const ModalEditarPerfil = ({aberto, fechado, artista, onSalvar, obrigatorio}) => {
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

            setFiltro(artista.localizacao || "")
            setErros({})
        }
    }, [artista, aberto])
    
    const handleChange = (campo, valor) => {
        setForm(prev => ({ ...prev, [campo]: valor }))
    }

    function handleFotoSelecionada(e) {
        const arquivo = e.target.files[0]
        if (!arquivo) return
        setNovaFoto(arquivo)
        setPreviewFoto(URL.createObjectURL(arquivo))
}

    const validarErros = () => {
        const novosErros = {}

        if(!form.nomeUsuario.trim()) {
            novosErros.nomeUsuario = "*O campo não pode ficar vazio"
        }
        if(!form.nomeCompleto.trim()) {
            novosErros.nomeCompleto = "*O campo não pode ficar vazio"
        }
        if(form.descricao.lenght > 240) {
            novosErros.descricao = "*A descrição deve possuir até 240 caracteres"
        }
        setErros(novosErros)
        return Object.keys(novosErros).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!validarErros()) return
        setLoading(true)

        try {
            let formAtualizado = { ...form }

            if (novaFoto) {
                const resultado = await atualizarFotoPerfil(novaFoto)
                console.log("resultado foto:", resultado) // <- adiciona isso
                formAtualizado.fotoPerfil = resultado.fotoPerfil
            }

            if (onSalvar) {
                await onSalvar(formAtualizado)
            }
            fechado()
        } catch (error) {
            console.error(error)
            alert("Erro ao salvar alterações: " + (error.message))
        } finally {
            setLoading(false)
        }
    }

    const [filtro, setFiltro] = useState("");
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [ordemAberta, setOrdemAberta] = useState(false);
    const [novaFoto, setNovaFoto] = useState(null)
    const [previewFoto, setPreviewFoto] = useState(null)
    const [erros, setErros] = useState({})

    
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
                        <div className="container-foto-perfil">
                            <img
                                className="foto-modal-editar"
                                src={previewFoto || artista.fotoPerfil}
                                alt="Foto de perfil"
                            />
                            <label className="label-trocar-foto" htmlFor="inputFotoPerfil">
                                Trocar foto
                            </label>
                            <input
                                id="inputFotoPerfil"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFotoSelecionada}
                            />
                        </div>
                        <div className="campos-lado-esquerdo">
                            <CampoTextoPublicacaoEPerfil
                                label="Nome de usuário"
                                name="nomeUsuario"
                                value={form.nomeUsuario}
                                handleOnChange={(e) => handleChange("nomeUsuario", e.target.value)}
                                erro={erros.nomeUsuario}
                            />

                            <CampoTextoPublicacaoEPerfil
                                label="Nome completo"
                                name="nomeCompleto"
                                value={form.nomeCompleto}
                                handleOnChange={(e) => handleChange("nomeCompleto", e.target.value)}
                                erro={erros.nomeCompleto}
                            />


                            <div className="modal-filtro-cidade">
                                <h3>Cidade</h3>
                                <Filtro opcoes={[
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
                                        setFiltro(valor)
                                        handleChange("localizacao", valor)
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