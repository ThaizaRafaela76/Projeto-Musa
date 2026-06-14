import { useRef, useState } from "react"
import { Link } from "react-router-dom"

import '../../Styles/Visitante/HomeVisitante.css'
import Capa from "../../assets/capahome.png"
import { FaCircleArrowLeft } from "react-icons/fa6"
import { FaCircleArrowRight } from "react-icons/fa6"

import mapa from "../../assets/mapa.png"
import Rodape from "../../Componentes/Rodape"
import BotaoVerMais from "../../Componentes/BotaoVerMais"
import CardTemplate from "../../Componentes/CardTemplate"
import CardTemplateArtista from "../../Componentes/CardTemplateArtista"
import NavbarVisitante from '../../Componentes/NavbarVisitante'
import Cisnei from '../../assets/cisnei.png'
import Tarde from '../../assets/tardeamarela.png'
import Gatos from '../../assets/gatinhos.png'
import Flor from '../../assets/florecer.png'
import Lirios from '../../assets/lirios.png'
import Lua from '../../assets/lua.png'

import perfil from '../../assets/image 11.png'


const HomeVisitante = () => {
    const ref = useRef(null)

    function scrollDir() {
        ref.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
    function scrollEsq() {
        ref.current.scrollBy({ left: -300, behavior: 'smooth' })
    }

    const refArtistas = useRef(null)
    const [podeEsq, setPodeEsq] = useState(false)
    const [podeDir, setPodeDir] = useState(true)

    function verificaScroll() {
        const el = refArtistas.current
        setPodeEsq(el.scrollLeft > 0)
        setPodeDir(el.scrollLeft + el.clientWidth < el.scrollWidth)
    }

    function scrollDirArtistas() {
        refArtistas.current.scrollBy({ left: 300, behavior: 'smooth' })
        setTimeout(verificaScroll, 350)
    }
    function scrollEsqArtistas() {
        refArtistas.current.scrollBy({ left: -300, behavior: 'smooth' })
        setTimeout(verificaScroll, 350)
    }


    return (
        <div className="div-geral">
            <header className="inicio-home">
                <NavbarVisitante />
                <div className="capa-home">
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
                        <CardTemplate
                            imagem={Cisnei}
                            titulo="Reflexo do amor"
                            subtitulo="Isis Martins"
                        />

                        <CardTemplate
                            imagem={Tarde}
                            titulo="Tarde de primavera"
                            subtitulo="Cristina Sabino"
                        />

                        <CardTemplate
                            imagem={Gatos}
                            titulo="Manhã azul"
                            subtitulo="Sophia Ferreira"
                        />

                        <CardTemplate
                            imagem={Flor}
                            titulo="Florescer"
                            subtitulo="Elisa Gois"
                        />

                        <CardTemplate
                            imagem={Lirios}
                            titulo="Silêncio em rosa"
                            subtitulo="Bianca Barroso"
                        />

                        <CardTemplate
                            imagem={Lua}
                            titulo="Lua lunar"
                            subtitulo="Raiane Cavalcante"
                        />
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
                            <CardTemplateArtista imagem={perfil} nome="Eudenia Sousa" />
                            <CardTemplateArtista imagem={perfil} nome="Luiza Matias" />
                            <CardTemplateArtista imagem={perfil} nome="Rebeca Freitas" />
                            <CardTemplateArtista imagem={perfil} nome="Yasmim Morais" />
                        </div>
                    </div>

                    <div style={{ width: "52px", flexShrink: 0 }}>
                        {podeDir && (
                            <button className="bnt-dir-artista" onClick={scrollDirArtistas}>
                                <FaCircleArrowRight />
                            </button>
                        )}
                    </div>
                </section>
                <section>
                    <div className="div-juntese">
                        <h1 className="juntese-titulo">Junte-se à Musa</h1>
                        <p className="juntese-texto">Um espaço pensado para artistas mulheres divulgarem seus trabalhos e trajetórias, ampliando a visibilidade de suas produções artísticas.</p>
                        <Link to="/cadastro"><button className="bnt-juntese">Cadastre-se</button></Link>
                    </div>
                </section>
            </main>
            <Rodape />
        </div>
    )
}

export default HomeVisitante