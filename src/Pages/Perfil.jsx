import {useState} from "react"
import Rodape from "../Componentes/Rodape"
import "../Styles/Perfil.css"
import "../Componentes/Navbar"
import BotaoNovaPublic from "../Componentes/BotaoNovaPublic"
import ModalPublic from "../Componentes/ModalPublic"
import CardTemplate from "../Componentes/CardTemplate"
import Navbar from "../Componentes/Navbar"

function Perfil({artista}) {

    const[estadoModal, setEstadoModal] = useState(false);

    const abrirModal = () => {
        setEstadoModal(true)
        document.body.style.overflow = "hidden"
    }

    const fecharModal = () => {
        setEstadoModal(false)
        document.body.style.overflow = "auto"
    }

    return (
        <div className="perfil">
            <header>
                <Navbar />
            </header>
            <main>
                <section className="perfil_info">
                    <div className="perfil_foto">
                        <img className="fotoPerfil" src={artista.foto} alt={artista.nome}/>
                        <div className="perfil_user">
                        <h3>{artista.username}</h3>
                        <p className="artista_cidade">{artista.cidade}</p>
                        </div>
                    </div>
                    <div className="perfil_dados">
                        <h2>{artista.nome}</h2>
                        <p>{artista.portfolio}</p>
                        <p>{artista.bio}</p>
                    <div className="perfil-contatos">  
                        <p>{artista.redeSocial}</p>
                        <p>{artista.contato}</p>
                    </div>      
                    </div>
                </section>
                <section className="perfil_obras">
                    <div className="criacao">
                    <h2>Obras da artista</h2>
                    <BotaoNovaPublic aoClicar={abrirModal}/>
                    <ModalPublic aberto={estadoModal} fechado={fecharModal}/>
                    </div>
                    <div className="obras">
                        <CardTemplate
                            imagem = "https://i.pinimg.com/1200x/a3/16/45/a31645095097e81b3743ea41413f5ce7.jpg"
                            titulo ="Joaninha em folha"
                            subtitulo="Beatriz Silva"
                        />
                        <CardTemplate
                            imagem = "https://i.pinimg.com/1200x/c9/6a/70/c96a703ea9b9a048d78bc68e7d696fd0.jpg"
                            titulo ="Bordado & Fotos"
                            subtitulo="Beatriz Silva"
                        />
                        <CardTemplate 
                            imagem = "https://i.pinimg.com/1200x/3e/ec/0f/3eec0f584cd0e9530068c6022e93fb88.jpg"
                            titulo ="Passado Presente"
                            subtitulo="Beatriz Silva"
                        />
                        <CardTemplate
                            imagem = "https://i.pinimg.com/736x/2b/bc/d0/2bbcd05e70d76fa501aed68a4df8f07f.jpg"
                            titulo ="Ramo"
                            subtitulo="Beatriz Silva"
                        />
                        <CardTemplate
                            imagem = "https://i.pinimg.com/736x/bd/8d/a3/bd8da37f8773a5a8ae27f66950484d0e.jpg"
                            titulo ="O olhar"
                            subtitulo="Beatriz Silva"
                        />
                        <CardTemplate
                            imagem = "https://i.pinimg.com/736x/93/be/1d/93be1d9205ad046f50540570b967f187.jpg"
                            titulo ="Flores"
                            subtitulo="Beatriz Silva"
                        />
                        <CardTemplate
                            imagem = "https://i.pinimg.com/1200x/e2/5e/65/e25e65d354236c51cff38f4202397500.jpg"
                            titulo = "Xilogatura"
                            subtitulo="Beatriz Silva"
                        />
                    </div>
                </section>
            </main>
            <Rodape variante="bege"/>
        </div>
    )
}

export default Perfil