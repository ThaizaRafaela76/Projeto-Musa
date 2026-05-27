import { useState } from "react"
import BarraPesquisa from "../Componentes/BarraPesquisa"
import Filtro from "../Componentes/Filtro"
import Ordenar from "../Componentes/Ordenar"
import ModalDenuncia from "../Componentes/ModalDenuncia"
import BotaoDenuncia from "../Componentes/BotaoDenuncia"
import { IoWarningOutline } from "react-icons/io5"

import Navbar from "../Componentes/Navbar";
import Rodape from "../Componentes/Rodape";
import CardTemplate from "../Componentes/CardTemplate";

import "../Styles/Acervo.css";

import imagemSimpatia from "../assets/simpatiaAraivaDoGato.jpeg"
import imagemAboba from "../assets/aboba.png"
import imagemAutorretrato from "../assets/autorretratocomanjos.jpeg"
import imagemColunaPartida from "../assets/acolunapartida.jpeg"

import imagemOcula from "../assets/ocula.png";
import imagemTresorixas from "../assets/tresorixas.png";
import imagemEusou from "../assets/eusou.png";
import imagemAntropofagia from "../assets/antropofagia.png";
import bannerAcervo from "../assets/banner-acervo.png";

function Acervo() {

    const [pesquisa, setPesquisa] = useState("")
    const [filtro, setFiltro] = useState("")
    const [ordem, setOrdem] = useState("az")
    const opcoesFiltro = [
    { value: "", label: "Filtros" },
    { value: "Pintura",      label: "Pintura" },
    { value: "Colagem",      label: "Colagem" },
    { value: "Arte digital", label: "Arte digital" },
    { value: "Fotografia",   label: "Fotografia" },
    { value: "Xilogravura",  label: "Xilogravura" },
    { value: "Design",       label: "Design" },
    { value: "Poesia",       label: "Poesia" },
    { value: "Literatura",   label: "Literatura" },
    { value: "Arquitetura",  label: "Arquitetura" },
    { value: "Artesanato", label: "Artesanato" },
    { value: "Desenho",    label: "Desenho" },
    { value: "Escultura",  label: "Escultura" },
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

    const obras = [
    { id: 1, imagem: imagemAntropofagia, titulo: "ANTROPOFAGIA",              autora: "Tarsila do Amaral", categoria: "Pintura",    descricao: "A pintura Antropofagia (1929), de Tarsila do Amaral, é uma das obras mais importantes do Modernismo brasileiro. A tela sintetiza o Movimento Antropofágico — proposto por Oswald de Andrade — ao fundir elementos da cultura nacional, da fauna e da flora com técnicas europeias, simbolizando a deglutição da cultura estrangeira para criar uma identidade genuinamente brasileira." },
    { id: 2, imagem: imagemOcula,        titulo: "OCULA",                     autora: "Lygia Pape",       categoria: "Pintura",     descricao: "Lygia Pape (1927–2004) foi uma das pioneiras do movimento Neoconcreto no Brasil. Sua obra revolucionária dissolveu as fronteiras entre o objeto e o observador, explorando a geometria, o espaço e o corpo humano por meio de esculturas, gravuras, instalações e cinema." },
    { id: 3, imagem: imagemTresorixas,   titulo: "TRÊS ORIXÁS",               autora: "Djanira Motta",     categoria: "Pintura",    descricao: "A obra Três Orixás (1966), pintada a óleo sobre tela pela modernista brasileira Djanira da Motta e Silva, é uma das representações mais emblemáticas das religiões de matriz africana no Brasil." },
    { id: 4, imagem: imagemEusou,        titulo: "EU SOU A MONSTRA",          autora: "Hilda Hilst",       categoria: "Poesia",     descricao: "Eu sou a monstra é o único livro infantil escrito pela grande autora brasileira Hilda Hilst, originalmente criado em 1988. A obra é um poema lúdico e imaginativo onde a personagem não possui uma forma física fixa, celebrando a liberdade e a identidade através do olhar infantil." },
    { id: 5, imagem: imagemSimpatia,     titulo: "SIMPATIA (A RAIVA DO GATO)",autora: "Remedios Varo",     categoria: "Pintura",    descricao: "Pintada em 1955 pela artista surrealista Remedios Varo, é uma obra a óleo sobre masonite que retrata uma mulher sentada à mesa acariciando um gato. Com uma atmosfera mágica e irônica, a pintura transforma a eletricidade do afeto felino em faíscas que sobem até a cabeça da mulher, formando um penteado." },
    { id: 6, imagem: imagemAboba,        titulo: "A BOBA",                    autora: "Anita Malfatti",    categoria: "Pintura",    descricao: "A Boba (1915-1916), pintado por Anita Malfatti nos Estados Unidos, é um marco do Expressionismo e do modernismo brasileiro. A obra simboliza a ruptura com a rigidez da arte acadêmica tradicional, priorizando a subjetividade, a tensão emocional e cores vibrantes para retratar a vulnerabilidade humana." },
    { id: 7, imagem: imagemAutorretrato, titulo: "AUTORRETRATO COM ANJOS",    autora: "Maria Auxiliadora", categoria: "Pintura",    descricao: "Autorretrato com anjos (1972) é uma das obras mais emblemáticas da artista naif Maria Auxiliadora da Silva. A tela retrata a artista no centro, em seu cavalete, pintando uma cena rural. Ela está rodeada por anjos (brancos e negros) que trazem seus materiais, como pincéis e tintas." },
    { id: 8, imagem: imagemColunaPartida,titulo: "A COLUNA PARTIDA",          autora: "Frida Kahlo",       categoria: "Pintura",    descricao: "A Coluna Partida (1944) é um autorretrato visceral da pintora mexicana Frida Kahlo. Ele retrata a sua agonia física e emocional após uma grave cirurgia na coluna. A obra é mundialmente conhecida por expor a sua dor crônica de forma crua, simbolizando simultaneamente o sofrimento, o aprisionamento e a força espiritual." },
    ]

    return (
        <div className="pagina-acervo">

            <Navbar />

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
                    <Filtro opcoes={opcoesFiltro} valor={filtro} onChange={setFiltro} />
                    <Ordenar valor={ordem} onChange={setOrdem} />
                </div>


                <div className="cards-acervo">
                    {obras.map((obra) => (
                        <button key={obra.id} className="card-btn" onClick={() => abrirObra(obra)}>
                            <CardTemplate
                                imagem={obra.imagem}
                                titulo={obra.titulo}
                                subtitulo={obra.autora}
                            />
                        </button>
                    ))}
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
                                    <h2>{obraSelecionada.autora}</h2>
                                    <h3>{obraSelecionada.categoria}</h3>
                                    <p className="descr-obra">{obraSelecionada.descricao}</p>
                                </div>
                            </div>
                        </div>
                        
                        <ModalDenuncia aberto={modalDenunciaAberto} fecharModal={fecharDenuncia} />

                    </div>
                )}


            </section>
            
            <Rodape variante="bege"/>

        </div>
    );
}

export default Acervo;