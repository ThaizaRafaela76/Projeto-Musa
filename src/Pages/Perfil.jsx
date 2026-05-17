import Rodape from "../Componentes/Rodape"
import "../Styles/Perfil.css"

function Perfil({artista}) {

    return (
        <div className="perfil">
            <header>

            </header>
            <main>
                <section className="perfil_info">
                    <div className="perfil_foto">
                        <img className="fotoPerfil" src={artista.foto} alt={artista.nome}/>
                        <p>{artista.username}</p>
                        <p>{artista.cidade}</p>
                    </div>
                    <div className="perfil_dados">
                        <h2>{artista.nome}</h2>
                        <p>{artista.portfolio}</p>
                        <p>{artista.bio}</p>
                        <p>{artista.contato}</p>
                    </div>
                </section>
                <section className="perfil_obras">

                </section>
            </main>
            <Rodape />
        </div>
    )
}

export default Perfil