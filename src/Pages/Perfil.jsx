import { useState, useEffect } from "react"
import Rodape from "../Componentes/Rodape"
import "../Styles/Perfil.css"
import BotaoNovaPublic from "../Componentes/BotaoNovaPublic"
import ModalPublic from "../Componentes/ModalPublic"
import CardTemplate from "../Componentes/CardTemplate"
import Navbar from "../Componentes/Navbar"
import ModalExcluirPublic from "../Componentes/ModalExcluirPubli.jsx"
import BotaoExcluir from "../Componentes/BotaoExcluir"
import { IoWarningOutline } from "react-icons/io5"
import { buscarPublicacoes, deletarPublicacao } from "../services/publicacaoService.js"


function Perfil({artista}) {
    
   const [estadoModalCriarPublic, setEstadoModalCriarPublic] = useState(false);
   const [obras, setObras] = useState([])
   const [refreshKey, setRefreshKey] = useState(0)
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

    const abrirModalCriarPublic = () => {
        setEstadoModalCriarPublic(true)
        document.body.style.overflow = "hidden"
    }

    const fecharModalCriarPublic = () => {
        setEstadoModalCriarPublic(false)
        document.body.style.overflow = "auto"
    }

    function abrirModalExcluirPublic() {
        setModalExcluirPublic(true)
    }
    
    function fecharModalExcluirPublic() {
        setModalExcluirPublic(false)
    }


    useEffect(() => {
    async function carregarObras() {
        try {
            const todasPublicacoes = await buscarPublicacoes()
            console.log("publicações:", todasPublicacoes)
            console.log("primeira publicação:", todasPublicacoes[0])
            console.log("uid da artista:", artista.uid)
            const obrasArtista = todasPublicacoes
            .filter(p => p.uid === artista.uid)
            .sort((a, b) => new Date(b.dataDeCriacao.seconds) - new Date(a.dataDeCriacao.seconds))                   
            console.log("obras filtradas:", obrasArtista)
            setObras(obrasArtista)
        } catch (error) {
            console.error("Erro ao carregar obras:", error)
        }
    }
    if (artista) carregarObras()
}, [artista, refreshKey])

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


    if (!artista) {
        return <div className="perfil"><h2>Carregando perfil...</h2></div>
    }


    return (
        <div className="perfil">
            <header>
                <Navbar />
            </header>
            <main>
                {/*SESSÃO QUE CONTÉM TODAS AS INFORMAÇÕES DA ARTISTA*/}
                <section className="perfil_info">

                    {/*LADO DIREITO - CONTÉM A FOTO, NOME DE USUARIO E CIDADE*/}
                    <div className="perfil_foto">
                        <img className="fotoPerfil" src={`${artista.fotoPerfil}?t=${Date.now()}`} alt={artista.nomeCompleto} />
                        <div className="perfil_user">
                            <h3>{artista.nomeUsuario}</h3>
                            <p className="artista_cidade">{artista.localizacao}</p>
                        </div>
                    </div>
    
                    {/*LADO ESQUERDO - CONTÉM NOME, PORTFOLIO, BIO E CONTATOS*/}
                    <div className="perfil_dados">

                        <div className="nome-editar">
                            <h2>{artista.nomeCompleto}</h2>
                        </div>
                        {/* Alterado para ser um link clicavel */}
                        <h3>Biografia</h3>
                        <p>{artista.descricao}</p>

                        <div className="perfil-contatos">
                            <h3>Contatos</h3>
                            <p>Instagram</p>
                            <p>{artista.email}</p>
                        </div>

                    </div>

                </section>

                {/*SESSÃO QUE CONTÉM AS OBRAS DO PERFIL*/}            
                <section className="perfil_obras">

                    <div className="criacao">
                        <h2>Minhas obras</h2>
                        <BotaoNovaPublic aoClicar={abrirModalCriarPublic} />
                        <ModalPublic aberto={estadoModalCriarPublic} fechado={fecharModalCriarPublic} onPublicacaoCriada={() => setRefreshKey(prev => prev + 1)} />
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

                    {/*MODAL DE VISUALIZAR A OBRA*/}
                    {obraSelecionada && (

                        <div className="overlay-obra" >

                            <div className="modal-geral" onClick={(e) => e.stopPropagation()}>

                                <div className="btn-modal">
                                    <BotaoExcluir excluirObra={(e) => { e.stopPropagation(); abrirModalExcluirPublic(); }}/>
                                    <button className="btn-fechar-obra" onClick={(e) => { e.stopPropagation(); fecharObra(); }}>✕</button>
                                </div>

                                <div className="org-modal">

                                    <div className="div-imagem">
                                        <img 
                                            src={`http://localhost:3000${obraSelecionada.imagemObra}`} 
                                            alt={obraSelecionada.nomeObra} 
                                        />
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