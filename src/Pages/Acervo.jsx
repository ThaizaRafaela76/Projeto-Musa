import { useState, useEffect } from "react"
import { buscarPublicacoes } from "../services/publicacaoService.js"
import BarraPesquisa from "../Componentes/BarraPesquisa"
import Filtro from "../Componentes/Filtro"
import Ordenar from "../Componentes/Ordenar"
import ModalDenuncia from "../Componentes/ModalDenuncia"
import BotaoDenuncia from "../Componentes/BotaoDenuncia"
import { IoWarningOutline } from "react-icons/io5"

import BotaoNovaPublic from "../Componentes/BotaoNovaPublic"
import ModalPublic from "../Componentes/ModalPublic"

import Navbar from "../Componentes/Navbar";
import Rodape from "../Componentes/Rodape";
import CardTemplate from "../Componentes/CardTemplate";

import "../Styles/Acervo.css";

import bannerAcervo from "../assets/banner-acervo.png";
import NavbarVisitante from "../Componentes/NavbarVisitante.jsx"

function Acervo({usuario}) {

    const [pesquisa, setPesquisa] = useState("")
    const [filtro, setFiltro] = useState("")
    const [ordem, setOrdem] = useState("az")
    const [filtroAberto, setFiltroAberto] = useState(false)
    const [ordemAberta, setOrdemAberta] = useState(false)
    const opcoesFiltro = [
        { value: "", label: "Todas as obras" },
        { value: "Pintura", label: "Pintura" },
        { value: "Colagem", label: "Colagem" },
        { value: "Arte digital", label: "Arte digital" },
        { value: "Fotografia", label: "Fotografia" },
        { value: "Xilogravura", label: "Xilogravura" },
        { value: "Design", label: "Design" },
        { value: "Poesia", label: "Poesia" },
        { value: "Literatura", label: "Literatura" },
        { value: "Arquitetura", label: "Arquitetura" },
        { value: "Artesanato", label: "Artesanato" },
        { value: "Desenho", label: "Desenho" },
        { value: "Escultura", label: "Escultura" },
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

    const [obras, setObras] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        async function carregarObras() {
            try {
                const publicacoes = await buscarPublicacoes()
                setObras(publicacoes)
            } catch(error) {
                console.error("Erro ao carregar obras:", error)
            }
        }
        carregarObras()
    }, [refreshKey])

    const obrasFiltrados = obras.filter((item) => {
        const passaPesquisa = item.nomeObra.toLowerCase().includes(pesquisa.toLowerCase());
        const passaFiltro = (filtro === "" || item.categoriaObra === filtro);
        console.log(passaPesquisa && passaFiltro);
        return passaPesquisa && passaFiltro;
    }).sort((a, b) => {
        return ordem == "az" ? a.nomeObra.localeCompare(b.nomeObra) : b.nomeObra.localeCompare(a.nomeObra)
    });

    const [estadoModal, setEstadoModal] = useState(false);

    const abrirModal = () => {
        setEstadoModal(true)
        document.body.style.overflow = "hidden"
    }

    const fecharModal = () => {
        setEstadoModal(false)
        document.body.style.overflow = "auto"
    }

    const [imgAberta, setImgAberta] = useState(false) //useState usado para abrir a imagem do card

    return (
        <div className="pagina-acervo">

            {usuario ? <Navbar /> : <NavbarVisitante/>}

            <section className="titulo-acervo">

                <p>Acervo Digital</p>

                <h1>
                    Criado por elas.
                    <br />
                    Inspirado por elas.
                </h1>

            </section>

            <section className="imagem-acervo">

                <img
                    src={bannerAcervo}
                    alt="Acervo Digital"
                />

            </section>

            <section className="cards-section">


                <div className="controles-acervo">
                    <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />
                    <Filtro opcoes={opcoesFiltro} valor={filtro} onChange={setFiltro} aberto={filtroAberto} setAberto={setFiltroAberto} ordemAberta={ordemAberta} setOrdemAberta={setOrdemAberta} />
                    <Ordenar valor={ordem} onChange={setOrdem} aberto={ordemAberta} setAberto={setOrdemAberta} filtroAberto={filtroAberto} setFiltroAberto={setFiltroAberto} />
                    {usuario && (<BotaoNovaPublic aoClicar={abrirModal}></BotaoNovaPublic>)}
                </div>       
                <ModalPublic aberto={estadoModal} fechado={fecharModal} onPublicacaoCriada={() => setRefreshKey(prev => prev + 1)} />
                {
                    obrasFiltrados.length === 0 ? (
                        <p className="mensagem">
                            Nenhuma obra encontrada
                        </p>
                    ) : (
                        <div className="cards-acervo">
                            {obrasFiltrados.map((obra) => (
                                <button key={obra.id} className="card-btn" onClick={() => abrirObra(obra)}>
                                    <CardTemplate
                                        imagem={`http://localhost:3000${obra.imagemObra}`}
                                        titulo={obra.nomeObra}
                                        subtitulo={obra.artistaObra}
                                    />
                                </button>
                            ))}
                        </div>
                    )}


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
                                        onClick={() => setImgAberta(true)} //isso foi adicionado. quando clicar na imagem, muda o estado dela para true
                                        style={{ cursor: "pointer" }} // apenas para que o cursor mude para mãozinha, para saber que ali pode clicar
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

                        {imgAberta && (  //Exibe a imagem em tela cheia ao clicar nela.
                            <div className="overlay-imagem" onClick={() => setImgAberta(false)}>  {/*o overlay é o fundo escuro e quando clicar em qualque parte dele a imagem se fecha*/}
                                <img src={`http://localhost:3000${obraSelecionada.imagemObra}`} className="img-aberta" />
                            </div>
                        )}

                        <ModalDenuncia aberto={modalDenunciaAberto} fecharModal={fecharDenuncia} />

                    </div>
                )}


            </section>

            <Rodape variante="bege" />

        </div>
    );
}

export default Acervo;