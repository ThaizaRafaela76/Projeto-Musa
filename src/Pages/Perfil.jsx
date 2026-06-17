import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Rodape from "../Componentes/Rodape"
import "../Styles/Perfil.css"
import "../Componentes/Navbar"
import BotaoNovaPublic from "../Componentes/BotaoNovaPublic"
import ModalPublic from "../Componentes/ModalPublic"
import CardTemplate from "../Componentes/CardTemplate"
import Navbar from "../Componentes/Navbar"
import ModalExcluirPublic from "../Componentes/ModalExcluirPubli.jsx"
import BotaoExcluir from "../Componentes/BotaoExcluir.jsx"
import { IoWarningOutline } from "react-icons/io5"
import BotaoEditarPerfil from "../Componentes/BotaoEditarPerfil"
import ModalEditarPerfil from "../Componentes/ModalEditarPerfil"
import { atualizarPerfil } from "../services/artistasService"
import { buscarPublicacoes, deletarPublicacao } from "../services/publicacaoService.js"



function Perfil({ artista, onPerfilAtualizado }) {
   const navigate = useNavigate()
   const[estadoModalEditar, setEstadoModalEditar] = useState(false);
//    const [obras, setObras] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
        if (artista === null) {
            setLoading(false)
            // Opcional: redirecionar para login
            // navigate("/login")
        } else if (artista) {
            setLoading(false)
        }
    }, [artista, navigate])
   const abrirModalEditar = () => {
        setEstadoModalEditar(true);
        document.body.style.overflow = "hidden"
   }

   const fecharModalEditar = () => {
        setEstadoModalEditar(false);
        document.body.style.overflow = "auto"
   }

    const [estadoModal, setEstadoModal] = useState(false);

    const abrirModal = () => {
        setEstadoModal(true)
        document.body.style.overflow = "hidden"
    }

    const fecharModal = () => {
        setEstadoModal(false)
        document.body.style.overflow = "auto"
    }

    const [obras, setObras] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
    async function carregarObras() {
        try {
            const todasPublicacoes = await buscarPublicacoes()
            console.log("publicações:", todasPublicacoes)
            console.log("uid da artista:", artista.uid)
            const obrasArtista = todasPublicacoes.filter(p => p.uid === artista.uid)
            console.log("obras filtradas:", obrasArtista)
            setObras(obrasArtista)
        } catch (error) {
            console.error("Erro ao carregar obras:", error)
        }
    }
    if (artista) carregarObras()
}, [artista, refreshKey])

    const [obraSelecionada, setObraSelecionada] = useState(null)
    const [modalExcluirPublic, setModalExcluirPublic] = useState(false)

    function abrirObra(obra) {
        setObraSelecionada(obra)
        document.body.style.overflow = "hidden"
    }

    function fecharObra() {
        setObraSelecionada(null)
        document.body.style.overflow = "auto"
    }

    async function confirmarExclusao() {
        try {
            await deletarPublicacao(obraSelecionada.id, artista.uid)
            fecharModalExcluirPublic()
            fecharObra()
            setRefreshKey(prev => prev + 1)
        } catch (error) {
            alert("Erro ao excluir a obra.")
        }
    }

    function abrirModalExcluirPublic() {
        setModalExcluirPublic(true)
    }
    
    function fecharModalExcluirPublic() {
        setModalExcluirPublic(false)
    }

    const handleSalvarPerfil = async (dadosAtualizados) => {
        setLoading(true)
        try {
            const atualizado = await atualizarPerfil(dadosAtualizados)
            if (onPerfilAtualizado) {
                onPerfilAtualizado(atualizado)
            }
            setLoading(false)
            setRefreshKey(prev => prev + 1)
        } catch (error) {
            console.error(error)
            alert("Erro ao atualizar perfil")
        }
    }


    if (loading) {
        return <div className="perfil"><h2>Carregando perfil...</h2></div>
    }
    if (!artista) {
        return (
            <div className="perfil">
                <Navbar />
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <h2>Perfil não encontrado</h2>
                    <button onClick={() => navigate("/login")}>Ir para Login</button>
                </div>
                <Rodape variante="bege" />
            </div>
        )
    }
    return (
        <div className="perfil">
            <header>
                <Navbar />
            </header>
            <main>
                <section className="perfil_info">
                    <div className="perfil_foto">
                        <img className="fotoPerfil" src={`${artista.fotoPerfil}?t=${Date.now()}`} alt={artista.nomeCompleto} />
                        <div className="perfil_user">
                            <h3>{artista.nomeUsuario}</h3>
                            <p className="artista_cidade">{artista.localizacao}</p>
                        </div>
                    </div>
                    <div className="perfil_dados">
                        <div className="nome-editar">
                            <h2>{artista.nomeCompleto}</h2>
                            <BotaoEditarPerfil  aoClicar={abrirModalEditar}/>
                            <ModalEditarPerfil aberto={estadoModalEditar} fechado={fecharModalEditar} artista={artista} onSalvar={handleSalvarPerfil}/>
                        </div>
                        {/* Alterado para ser um link clicavel */}
                        <p><a

                            href={
                                artista.linkPortfolio.startsWith("http")
                                    ? artista.linkPortfolio
                                    : `https://${artista.linkPortfolio}`
                            }

                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}
                        >Meu portifolio</a></p>
                        <p>{artista.descricao}</p>
                        <div className="perfil-contatos">
                            <p><a 
                            href={
                                artista.linkInstagram.startsWith("http")
                                ? artista.linkPortfolio
                                : `https://${artista.linkPortfolio}`
                            }

                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}
                            >Instagram</a></p>
                            <p>{artista.email}</p>
                        </div>
                    </div>
                </section>
                <section className="perfil_obras">
                    <div className="criacao">
                        <h2>Obras da artista</h2>
                        <BotaoNovaPublic aoClicar={abrirModal} />
                        <ModalPublic aberto={estadoModal} fechado={fecharModal} onPublicacaoCriada={() => setRefreshKey(prev => prev + 1)} />
                    </div>
                    <div className="obras">
                        {
                            obras.map((obra) => (
                                <button className="card-btn" key={obra.id} onClick={() => abrirObra(obra)}>
                                    <CardTemplate
                                        imagem={`http://localhost:3000${obra.imagemObra}`}
                                        titulo={obra.nomeObra}
                                        subtitulo={obra.artistaObra}
                                    ></CardTemplate>
                                </button>
                            ))
                        }
                    </div>
                    {obraSelecionada && (
                        <div className="overlay-obra" >
                            <div className="modal-geral" onClick={(e) => e.stopPropagation()}>
                                <div className="btn-modal">
                                    <BotaoExcluir excluirObra={(e) => { e.stopPropagation(); abrirModalExcluirPublic(); }}/>
                                    <button className="btn-fechar-obra" onClick={(e) => { e.stopPropagation(); fecharObra(); }}>✕</button>
                                </div>
                                <div className="org-modal">
                                    <div className="div-imagem">
                                        <img src={`http://localhost:3000${obraSelecionada.imagemObra}`} alt={obraSelecionada.nomeObra} />
                                        <h1 className="titulo-obra">{obraSelecionada.nomeObra}</h1>
                                    </div>
                                    <div className="div-info">
                                        <h2>{obraSelecionada.artistaObra}</h2>
                                        <h3>{obraSelecionada.categoriaObra}</h3>
                                        <p className="descr-obra">{obraSelecionada.descricaoObra}</p>
                                    </div>
                                </div>
                            </div>

                           <ModalExcluirPublic
                                aberto={modalExcluirPublic}
                                cancelar={fecharModalExcluirPublic}
                                confirmar={confirmarExclusao}
                            />

                        </div>
                    )}


                </section>
            </main>
            <Rodape variante="bege" />
        </div>
    )
}

export default Perfil