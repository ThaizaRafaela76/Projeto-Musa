import Navbar from "../Componentes/Navbar";
import Rodape from "../Componentes/Rodape";
import CardTemplate from "../Componentes/CardTemplate";

import "../Styles/Acervo.css";

import imagemOcula from "../assets/ocula.png";
import bannerAcervo from "../assets/banner-acervo.png";

function Acervo() {
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

            <section className="cards-acervo">

                <CardTemplate
                    imagem={imagemOcula}
                    titulo="OCULA"
                    subtitulo="Lygia Pape"
                />

                <CardTemplate
                    imagem={imagemOcula}
                    titulo="ABAPORU"
                    subtitulo="Tarsila"
                />

                <CardTemplate
                    imagem={imagemOcula}
                    titulo="RETIRANTES"
                    subtitulo="Portinari"
                />

            </section>

            <Rodape />

        </div>
    );
}

export default Acervo;