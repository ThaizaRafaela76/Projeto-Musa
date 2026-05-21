import {useState} from "react"
import Rodape from "../Componentes/Rodape"
import "../Styles/Perfil.css"
import "../Componentes/Navbar"
import BotaoNovaPublic from "../Componentes/BotaoNovaPublic"
import ModalPublic from "../Componentes/ModalPublic"
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
                        <p>{artista.contato}</p>
                        <p>{artista.contato}</p>
                    </div>
                </section>
                <section className="perfil_obras">
                    <div className="criacao">
                    <h2>Obras da artista</h2>
                    <BotaoNovaPublic onClick={abrirModal}/>
                    <ModalPublic aberto={estadoModal} fechado={fecharModal}/>
                    </div>
                    {/* cards das obras */}
                </section>
            </main>
            <Rodape variante="bege"/>
        </div>
    )
}

export default Perfil