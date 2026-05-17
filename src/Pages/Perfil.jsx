import Rodape from "../Componentes/Rodape"
import "../Styles/Perfil.css"

function Perfil({artista}) {

    return (
        <div className="perfil">
            <header>
                {/*navbar */}
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
                    <h2>Obras da artista</h2>
                    {/* cards das obras */}
                </section>
            </main>
            <Rodape variante="bege"/>
        </div>
    )
}

export default Perfil