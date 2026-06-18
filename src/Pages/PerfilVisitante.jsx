import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {buscarArtistaPorId} from "../services/artistasService"
import Rodape from "../Componentes/Rodape"
import "../Styles/Visitante/PerfilVisitante.css"
import CardTemplate from "../Componentes/CardTemplate"
import Navbar from "../Componentes/Navbar"
import { IoWarningOutline } from "react-icons/io5"
import ModalDenuncia from "../Componentes/ModalDenuncia"
import BotaoDenuncia from "../Componentes/BotaoDenuncia"
import ModalDenunciarPerfil from "../Componentes/ModalDenunciarPerfil"
import NavbarVisitante from "../Componentes/NavbarVisitante"
import { buscarPublicacoes } from "../services/publicacaoService.js"
import { FaLink } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";





function PerfilVisitante({usuario}) {
    const {uid} = useParams()

    const [artista, setArtista] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function carregarArtista() {
            try {
                const dados = await buscarArtistaPorId(uid)
                setArtista(dados)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        carregarArtista()
    }, [uid])

   const navigate = useNavigate()
   const [imgAberta, setImgAberta] = useState(false)

   

    const [obras, setObras] = useState([])

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
}, [artista])

    const [obraSelecionada, setObraSelecionada] = useState(null)

    function abrirObra(obra) {
        setObraSelecionada(obra)
        document.body.style.overflow = "hidden"
    }

    function fecharObra() {
        setObraSelecionada(null)
        document.body.style.overflow = "auto"
    }

    const[estadoModalDenunciarPerfil, setEstadoModalDenunciarPerfil] = useState(false);
    const [modalDenunciaAberto, setModalDenunciaAberto] = useState(false)


    const abrirModalDenunciarPerfil = () => {
        setEstadoModalDenunciarPerfil(true);
        document.body.style.overflow = "hidden"
   }

    const fecharModalDenunciarPerfil = () => {
        setEstadoModalDenunciarPerfil(false);
        document.body.style.overflow = "auto"
   }

   function abrirDenuncia() {
        setModalDenunciaAberto(true)
    }

    function fecharDenuncia() {
        setModalDenunciaAberto(false)
    }

    if (loading) {
        return <div className="perfil"><h2>Carregando perfil...</h2></div>
    }
    if (!artista) {
        return (
            <div className="perfil">
                <NavbarVisitante />
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <h2>Perfil não encontrado</h2>
                    <button onClick={() => navigate("/login")}>Ir para Login</button>
                </div>
                <Rodape variante="bege" />
            </div>
        )
    }
    return (
        <div className="perfil-visitante">
            <header>
                {usuario ? <Navbar /> : <NavbarVisitante />}
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
                        <div className="perfil-denunciar">
                            <h2>{artista.nomeCompleto}</h2>
                            <BotaoDenuncia abrirModal={abrirModalDenunciarPerfil} />
                            <ModalDenunciarPerfil aberto={estadoModalDenunciarPerfil} fecharModal={fecharModalDenunciarPerfil}/>
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
                                color: "inherit",
                                fontWeight: "bold"
                            }}
                        >Portfólio</a></p>
                        <p>{artista.descricao}</p>
                        <div className="perfil-contatos">
                            <h3>Contatos</h3>
                            <p><a 
                            href={
                                artista.linkInstagram.startsWith("http")
                                ? artista.linkInstagram
                                : `https://${artista.linkInstagram}`
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
                                    <button
                                        className="botao-denuncia"
                                        onClick={(e) => { e.stopPropagation(); abrirDenuncia(); }}
                                    >
                                        <IoWarningOutline />
                                    </button>
                                    <button className="btn-fechar-obra" onClick={(e) => { e.stopPropagation(); fecharObra(); }}>✕</button>
                                </div>
                                <div className="org-modal">
                                    <div className="div-imagem">
                                        <img 
                                            src={`http://localhost:3000${obraSelecionada.imagemObra}`} 
                                            alt={obraSelecionada.nomeObra} 
                                            onClick={() => setImgAberta(true)}
                                            style={{cursor: "pointer"}}
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

                            {imgAberta && (
                                <div className="overlay-img" onClick={() => setImgAberta(false)}>
                                    <img src={`http://localhost:3000${obraSelecionada.imagemObra}`} className="imagem-aberta" />
                                </div>
                            )}
                            <ModalDenuncia aberto={modalDenunciaAberto} fecharModal={fecharDenuncia} />
                        </div>
                    )}
                </section>
            </main>
            <Rodape variante="bege" />
        </div>
    )
}

export default PerfilVisitante