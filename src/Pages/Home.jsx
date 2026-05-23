import { useRef } from "react"

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


const Home = () => {
    const ref = useRef(null)

    function scrollDir() {
        ref.current.scrollBy({left: 300, behavior: 'smooth'})
    }
    function scrollEsq() {
        ref.current.scrollBy({left: -300, behavior: 'smooth'})
    }

    return (
        <div className="div-geral">
            <header className="inicio-home">
                <Navbar />
                <div className="capa-home">
                  <img src={Capa} />  
                </div>
                
            </header>

            <main className="corpo-home">
                <section className="sobre-info">
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
                        <BotaoVerMais />
                    </div>
                    <div className="post-card" ref={ref}>
                        <CardTemplate />
                        <CardTemplate />
                        <CardTemplate />
                        <CardTemplate />
                        <CardTemplate />
                        <CardTemplate />
                    </div>
                    <div className="div-setas">
                        <button className="bnt-esq" onClick={scrollEsq}><FaCircleArrowLeft /></button>
                        <button className="bnt-dir"onClick={scrollDir}><FaCircleArrowRight /></button>
                    </div>
                </section>
                <section className="div-artista">
                    <div className="artista-home">
                        <h1 className="artista-titulo">Conheça as Artistas</h1>
                        <BotaoVerMais />
                    </div>
                    <div className="artista-card">
                        <CardTemplateArtista />
                        <CardTemplateArtista />
                        <CardTemplateArtista />
                        <CardTemplateArtista />
                    </div>
                </section>
            </main>
            <Rodape />
        </div>
    )
}

export default Home