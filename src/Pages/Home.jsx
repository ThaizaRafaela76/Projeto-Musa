import { useRef, useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { buscarPublicacoes } from "../services/publicacaoService.js"
import NavbarVisitante from "../Componentes/NavbarVisitante";

import "../Styles/Home.css"
import Capa from "../assets/capahome.png"
import { FaCircleArrowLeft } from "react-icons/fa6"
import { FaCircleArrowRight } from "react-icons/fa6"
import Navbar from "../Componentes/Navbar"
import mapa from "../assets/mapa.png"
import Rodape from "../Componentes/Rodape"
import BotaoVerMais from "../Componentes/BotaoVerMais"
import CardTemplate from "../Componentes/CardTemplate"
import CardTemplateArtista from "../Componentes/CardTemplateArtista"
import { buscarTodosArtistas } from "../services/artistasService";

import perfil from '../assets/image 11.png'


const Home = ({usuario}) => {
const ref = useRef(null)                                             //acessa ao elemento DOM

    function scrollDir() {
        ref.current.scrollBy({ left: 300, behavior: 'smooth' })         
    }
    function scrollEsq() {
        ref.current.scrollBy({ left: -300, behavior: 'smooth' })
    }

    const refArtistas = useRef(null)
    const [podeEsq, setPodeEsq] = useState(false)   //desabilitado
    const [podeDir, setPodeDir] = useState(true)    //habilitado

    function verificaScroll() {
        const el = refArtistas.current
        setPodeEsq(el.scrollLeft > 0)   //pode voltar para a esquerda
        setPodeDir(el.scrollLeft + el.clientWidth < el.scrollWidth)     //ver se ainda tem card para a direita, e mantem o botão habilitado
    }

    function scrollDirArtistas() {
        refArtistas.current.scrollBy({ left: 300, behavior: 'smooth' })
        setTimeout(verificaScroll, 350)     //espera a animação terminar antes de verificar a posição do scroll, sem isso os botões daria errado
    }
    function scrollEsqArtistas() {
        refArtistas.current.scrollBy({ left: -300, behavior: 'smooth' })
        setTimeout(verificaScroll, 350)
    }

    const [ultimasPostagens, setUltimasPostagens] = useState([])            //guarda informações em uma lista e faz o componente atualizar.

    useEffect(() => {
        async function carregarPostagens() {
            try {
                const publicacoes = await buscarPublicacoes()           //dados que vem do back
                const ultimas = publicacoes.slice(-6).reverse()         
                setUltimasPostagens(ultimas)                            //atualiza a lista de post na tela
            } catch (error) {
                console.error("Erro ao carregar postagens:", error)
            }
        }
        carregarPostagens()
    }, [])                                                              //array vazio para rodar so uma vez

    const [artistas, setArtistas] = useState([])

    useEffect(() => {                                                 //executa código assim que o componente carrega 
        const carregar = async () => {
            try {
                const resultado = await buscarTodosArtistas()
                const artis = resultado.map((item, index) => {         //o map aqui serve para renomear campos do backend
                    item.cidade = item.localizacao                  //cria um novo campo chamado cidade com o valor que estava em localizacao
                    item.usuario = item.nomeUsuario
                    return item
                })
                console.log(artis)
                setArtistas(artis)                              //cria um novo array com os campos renomeados e salva aqui
            } catch (error) {
                console.error("Erro ao carregar artista:", error)
            }
        }
        carregar()
    }, [])


    return (
        <div className="div-geral">
            <header className="inicio-homee">
                {usuario ? <Navbar /> : <NavbarVisitante/>}
                <div className="capa-homee">
                    <img src={Capa} />
                </div>

            </header>

            <main className="corpo-home">
                <section className="sobre-info" id="sobre">
                    <div>
                        <h1 className="sobre-titulo">Sobre nós</h1>
                        <h2 className="sobre-texto">A Musa é um projeto de plataforma digital que oferece as artistas mulheres do Sertão Central
                            um espaço para expor livremente seus trabalhos e perfis, além de proporcionar uma conexão entre
                            artistas e público. </h2>
                        <h2 className="sobre-texto2">O sistema busca reconhecer e dar visibilidade à importância dessas artistas na construção da
                            identidade cultural da região, contribuindo para o fortalecimento do empoderamento feminino e
                            para a construção de um cenário artístico mais inclusivo e representativo, ao mesmo tempo em que
                            preserva a memória cultural local e valoriza suas trajetórias.</h2>
                    </div>
                </section>
                <section className="cidade-section">
                    <div className="cidades-home">
                        <h1 className="cidade-titulo">Território</h1>
                        <h2 className="cidade-texto">O projeto reúne artistas mulheres do Sertão Central, região formada por 13 municípios com
                            forte diversidade cultural e artística.</h2>
                    </div>
                    <div className="cidade-mapa">
                        <img src={mapa} alt="mapa de territorio do sertão central" />
                    </div>
                </section>
                <section className="div-post">
                    <div className="post-home">
                        <h1 className="post-titulo">Últimas postagens</h1>
                        <Link to="/acervo"><BotaoVerMais /></Link>
                    </div>
                    <div className="post-card" ref={ref}>
                        {ultimasPostagens.map((obra) => (                       //obra é o paramentro da função
                            <CardTemplate
                                key={obra.id}
                                imagem={`http://localhost:3000${obra.imagemObra}`}
                                titulo={obra.nomeObra}
                                subtitulo={obra.artistaObra}
                            />
                        ))}
                    </div>
                    <div className="div-setas">
                        <button className="bnt-esq" onClick={scrollEsq}><FaCircleArrowLeft /></button>
                        <button className="bnt-dir" onClick={scrollDir}><FaCircleArrowRight /></button>
                    </div>
                </section>

                <section className="div-artista">
                    <div className="artista-home">
                        <h1 className="artista-titulo">Conheça as Artistas</h1>
                        <Link to="/artistas"><BotaoVerMais /></Link>
                    </div>

                    <div style={{ width: "52px", flexShrink: 0 }}>
                        {podeEsq && (
                            <button className="bnt-esq-artista" onClick={scrollEsqArtistas}>
                                <FaCircleArrowLeft />
                            </button>
                        )}
                    </div>

                    <div className="div-artista-carrossel">
                        <div className="artista-card" ref={refArtistas}  onScroll={verificaScroll}>
                            {artistas.map((artista)=>{                      //artista é uma variavel de estado
                                return (
                                    <CardTemplateArtista imagem={artista.fotoPerfil} nome={artista.usuario} />
                                )
                            })}
                        </div>
                    </div>

                    <div style={{ width: "52px", flexShrink: 0 }}>
                        {podeDir && (                                           //verifica
                            <button className="bnt-dir-artista" onClick={scrollDirArtistas}>
                                <FaCircleArrowRight />
                            </button>
                        )}
                    </div>
                </section>
                {!usuario && 
                    <section>
                    <div className="div-juntese">
                        <h1 className="juntese-titulo">Junte-se à Musa</h1>
                        <p className="juntese-texto">Um espaço pensado para artistas mulheres divulgarem seus trabalhos e trajetórias, ampliando a visibilidade de suas produções artísticas.</p>
                        <Link to="/cadastro"><button className="bnt-juntese">Cadastre-se</button></Link>
                    </div>
                </section>
                }
            </main>
            <Rodape />
        </div>
    )
}

export default Home