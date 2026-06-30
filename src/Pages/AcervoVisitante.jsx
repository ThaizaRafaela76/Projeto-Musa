import { useState } from "react"
import BarraPesquisa from "../Componentes/BarraPesquisa"

import NavbarVisitante from "../Componentes/NavbarVisitante"
import Rodape from "../Componentes/Rodape";
import CardTemplate from "../Componentes/CardTemplate";

import "../Styles/AcervoVisitante.css";

import imagemSimpatia from "../assets/simpatiaAraivaDoGato.jpeg"
import imagemAboba from "../assets/aboba.png"
import imagemAutorretrato from "../assets/autorretratocomanjos.jpeg"
import imagemColunaPartida from "../assets/acolunapartida.jpeg"

import imagemOcula from "../assets/ocula.png";
import imagemTresorixas from "../assets/tresorixas.png";
import imagemEusou from "../assets/eusou.png";
import imagemAntropofagia from "../assets/antropofagia.png";
import bannerAcervo from "../assets/banner-acervo.png";


function AcervoVisitante() {

    // estado da busca
    const [pesquisa, setPesquisa] = useState("")

    // estado da obra 
    const [obraSelecionada, setObraSelecionada] = useState(null)

    
    function abrirObra(obra) {
        setObraSelecionada(obra)
        document.body.style.overflow = "hidden" //scroll
    }

    
    function fecharObra() {
        setObraSelecionada(null)
        document.body.style.overflow = "auto"
    }

    // lista 
    const obras = [
        { id: 1, imagem: imagemAntropofagia, titulo: "ANTROPOFAGIA", autora: "Tarsila do Amaral", categoria: "Pintura", descricao: "A pintura Antropofagia (1929), de Tarsila do Amaral, é uma das obras mais importantes do Modernismo brasileiro. A tela sintetiza o Movimento Antropofágico — proposto por Oswald de Andrade — ao fundir elementos da cultura nacional, da fauna e da flora com técnicas europeias, simbolizando a deglutição da cultura estrangeira para criar uma identidade genuinamente brasileira." },
        { id: 2, imagem: imagemOcula, titulo: "OCULA", autora: "Lygia Pape", categoria: "Pintura", descricao: "Lygia Pape (1927–2004) foi uma das pioneiras do movimento Neoconcreto no Brasil. Sua obra revolucionária dissolveu as fronteiras entre o objeto e o observador, explorando a geometria, o espaço e o corpo humano por meio de esculturas, gravuras, instalações e cinema." },
        { id: 3, imagem: imagemTresorixas, titulo: "TRÊS ORIXÁS", autora: "Djanira Motta", categoria: "Pintura", descricao: "A obra Três Orixás (1966), pintada a óleo sobre tela pela modernista brasileira Djanira da Motta e Silva, é uma das representações mais emblemáticas das religiões de matriz africana no Brasil." },
        { id: 4, imagem: imagemEusou, titulo: "EU SOU A MONSTRA", autora: "Hilda Hilst", categoria: "Poesia", descricao: "Eu sou a monstra é o único livro infantil escrito pela grande autora brasileira Hilda Hilst, originalmente criado em 1988. A obra é um poema lúdico e imaginativo onde a personagem não possui uma forma física fixa, celebrando a liberdade e a identidade através do olhar infantil." },
        { id: 5, imagem: imagemSimpatia, titulo: "SIMPATIA (A RAIVA DO GATO)", autora: "Remedios Varo", categoria: "Pintura", descricao: "Pintada em 1955 pela artista surrealista Remedios Varo, é uma obra a óleo sobre masonite que retrata uma mulher sentada à mesa acariciando um gato. Com uma atmosfera mágica e irônica, a pintura transforma a eletricidade do afeto felino em faíscas que sobem até a cabeça da mulher, formando um penteado." },
        { id: 6, imagem: imagemAboba, titulo: "A BOBA", autora: "Anita Malfatti", categoria: "Pintura", descricao: "A Boba (1915-1916), pintado por Anita Malfatti nos Estados Unidos, é um marco do Expressionismo e do modernismo brasileiro. A obra simboliza a ruptura com a rigidez da arte acadêmica tradicional, priorizando a subjetividade, a tensão emocional e cores vibrantes para retratar a vulnerabilidade humana." },
        { id: 7, imagem: imagemAutorretrato, titulo: "AUTORRETRATO COM ANJOS", autora: "Maria Auxiliadora", categoria: "Pintura", descricao: "Autorretrato com anjos (1972) é uma das obras mais emblemáticas da artista naif Maria Auxiliadora da Silva. A tela retrata a artista no centro, em seu cavalete, pintando uma cena rural. Ela está rodeada por anjos (brancos e negros) que trazem seus materiais, como pincéis e tintas." },
        { id: 8, imagem: imagemColunaPartida, titulo: "A COLUNA PARTIDA", autora: "Frida Kahlo", categoria: "Pintura", descricao: "A Coluna Partida (1944) é um autorretrato visceral da pintora mexicana Frida Kahlo. Ele retrata a sua agonia física e emocional após uma grave cirurgia na coluna. A obra é mundialmente conhecida por expor a sua dor crônica de forma crua, simbolizando simultaneamente o sofrimento, o aprisionamento e a força espiritual." },
    ]

    // filtra novo array
    const obrasFiltrados = obras.filter((item) => {
        return item.titulo.toLowerCase().includes(pesquisa.toLowerCase());
    });

    return (
        <div className="pagina-acervo">

            <NavbarVisitante />

            {/* título e subtítulo da página */}
            <section className="titulo-acervo">
                <p>Acervo Digital</p>
                <h1>
                    Criado por elas.
                    <br />
                    Inspirado por elas.
                </h1>
            </section>

            {/* banner de destaque */}
            <section className="imagem-acervo">
                <img src={bannerAcervo} alt="Acervo Digital" />
            </section>

            <section className="cards-section">

                {/* campo de busca */}
                <div className="controles-acervo">
                    {/*props*/}
                    <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />
                </div>

                
                {obrasFiltrados.length === 0 ? (
                    <p className="mensagem">Nenhuma obra encontrada</p>
                ) : (
                    <div className="cards-acervo">
                        {obrasFiltrados.map((obra) => (
                            <button key={obra.id} className="card-btn" onClick={() => abrirObra(obra)}>
                                <CardTemplate
                                    imagem={obra.imagem}
                                    titulo={obra.titulo}
                                    subtitulo={obra.autora}
                                />
                            </button>
                        ))}
                    </div>
                )}

                {/* só aparece se uma obra foi clicada */}
                {obraSelecionada && (
                    <div className="overlay-obra"> {/* fundo escuro por trás */}
                        <div className="modal-geral" onClick={(e) => e.stopPropagation()}> {/* evita fechar ao clicar dentro */}
                            <div className="btn-modal">
                                <button className="btn-fechar-obra" onClick={(e) => { e.stopPropagation(); fecharObra(); }}>✕</button> {/* fecha o modal */}
                            </div>
                            <div className="org-modal">
                                <div className="div-imagem">
                                    <img src={obraSelecionada.imagem} alt={obraSelecionada.titulo} />
                                    <h1 className="titulo-obra">{obraSelecionada.titulo}</h1>
                                </div>
                                <div className="div-info"> {/* dados da obra clicada */}
                                    <h2>{obraSelecionada.autora}</h2>
                                    <h3>{obraSelecionada.categoria}</h3>
                                    <p className="descr-obra">{obraSelecionada.descricao}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </section>

            <Rodape variante="bege" />

        </div>
    );
}

export default AcervoVisitante;