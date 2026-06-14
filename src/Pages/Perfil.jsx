import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Rodape from "../Componentes/Rodape"
import "../Styles/Perfil.css"
import "../Componentes/Navbar"
import BotaoNovaPublic from "../Componentes/BotaoNovaPublic"
import ModalPublic from "../Componentes/ModalPublic"
import CardTemplate from "../Componentes/CardTemplate"
import Navbar from "../Componentes/Navbar"
import ModalDenuncia from "../Componentes/ModalDenuncia"
import BotaoDenuncia from "../Componentes/BotaoDenuncia"
import { IoWarningOutline } from "react-icons/io5"
import BotaoEditarPerfil from "../Componentes/BotaoEditarPerfil"
import ModalEditarPerfil from "../Componentes/ModalEditarPerfil"
import { atualizarPerfil } from "../services/artistasService"
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

    const obras = [
        {
            id: 1,
            imagem: "https://i.pinimg.com/1200x/a3/16/45/a31645095097e81b3743ea41413f5ce7.jpg",
            titulo: "Joaninha em folha",
            categoria: "Pintura",
            subtitulo: "Beatriz Silva",
            descricao: "Registro delicado de uma joaninha repousando sobre uma folha úmida ao amanhecer. A obra explora a ideia de pequenos universos naturais e a fragilidade dos ciclos da vida."
        },
        {
            id: 2,
            imagem: "https://i.pinimg.com/1200x/c9/6a/70/c96a703ea9b9a048d78bc68e7d696fd0.jpg",
            titulo: "Bordado & Fotos",
            categoria: "Colagem",
            subtitulo: "Beatriz Silva",
            descricao: "Colagem que une fotografias antigas e bordados manuais, criando uma narrativa afetiva sobre memória, tempo e reconstrução de histórias pessoais."
        },
        {
            id: 3,
            imagem: "https://i.pinimg.com/1200x/3e/ec/0f/3eec0f584cd0e9530068c6022e93fb88.jpg",
            titulo: "Passado Presente",
            categoria: "Colagem",
            subtitulo: "Beatriz Silva",
            descricao: "Composição que mistura elementos antigos e contemporâneos, refletindo sobre como memórias se sobrepõem ao presente e moldam nossa percepção do tempo."
        },
        {
            id: 4,
            imagem: "https://i.pinimg.com/736x/2b/bc/d0/2bbcd05e70d76fa501aed68a4df8f07f.jpg",
            titulo: "Ramo",
            categoria: "Pintura",
            subtitulo: "Beatriz Silva",
            descricao: "Representação minimalista de um ramo seco encontrado em meio urbano, simbolizando resistência e beleza em processos de transformação natural."
        },
        {
            id: 5,
            imagem: "https://i.pinimg.com/736x/bd/8d/a3/bd8da37f8773a5a8ae27f66950484d0e.jpg",
            titulo: "O olhar",
            categoria: "Pintura",
            subtitulo: "Beatriz Silva",
            descricao: "Estudo visual sobre o ato de observar e ser observado, explorando camadas emocionais escondidas no contato visual entre sujeito e mundo."
        },
        {
            id: 6,
            imagem: "https://i.pinimg.com/736x/93/be/1d/93be1d9205ad046f50540570b967f187.jpg",
            titulo: "Flores",
            categoria: "Xilogravura",
            subtitulo: "Beatriz Silva",
            descricao: "Xilogravura inspirada em flores silvestres, destacando contrastes entre delicadeza e força através de traços marcados e repetitivos."
            
        },
        {
            id: 7,
            imagem: "https://i.pinimg.com/1200x/e2/5e/65/e25e65d354236c51cff38f4202397500.jpg",
            titulo: "Xilogatura",
            subtitulo: "Beatriz Silva",
            descricao: "Exploração gráfica da xilogravura como linguagem experimental, unindo texturas orgânicas e formas abstratas em uma composição expressiva."

        }
    ]

    const [obraSelecionada, setObraSelecionada] = useState(null)
    const [modalDenunciaAberto, setModalDenunciaAberto] = useState(false)

    function abrirObra(obra) {
        setObraSelecionada(obra)
        document.body.style.overflow = "hidden"
    }

    function fecharObra() {
        setObraSelecionada(null)
        document.body.style.overflow = "auto"
    }

    function abrirDenuncia() {
        setModalDenunciaAberto(true)
    }

    function fecharDenuncia() {
        setModalDenunciaAberto(false)
    }
    const [refreshKey, setRefreshKey] = useState(0)

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
                        <p>{artista.linkPortfolio}</p>
                        <p>{artista.descricao}</p>
                        <div className="perfil-contatos">
                            <p>{artista.linkInstagram}</p>
                            <p>{artista.email}</p>
                        </div>
                    </div>
                </section>
                <section className="perfil_obras">
                    <div className="criacao">
                        <h2>Obras da artista</h2>
                        <BotaoNovaPublic aoClicar={abrirModal} />
                        <ModalPublic aberto={estadoModal} fechado={fecharModal} />
                    </div>
                    <div className="obras">
                        {
                            obras.map((obra) => (
                                <button className="card-btn" key={obra.id} onClick={() => abrirObra(obra)}>
                                    <CardTemplate
                                        imagem={obra.imagem}
                                        titulo={obra.titulo}
                                        subtitulo={obra.subtitulo}
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
                                        <img src={obraSelecionada.imagem} alt={obraSelecionada.titulo} />
                                        <h1 className="titulo-obra">{obraSelecionada.titulo}</h1>
                                    </div>
                                    <div className="div-info">
                                        <h2>{obraSelecionada.subtitulo}</h2>
                                        <h3>{obraSelecionada.categoria}</h3>
                                        <p className="descr-obra">{obraSelecionada.descricao}</p>
                                    </div>
                                </div>
                            </div>

                            <ModalDenuncia aberto={modalDenunciaAberto} fecharModal={fecharDenuncia} />

                        </div>
                    )}


                </section>
            </main>
            <Rodape variante="bege" />
        </div>
    )
}

export default Perfil