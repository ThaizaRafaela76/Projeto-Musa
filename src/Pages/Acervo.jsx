import Navbar from "../Componentes/Navbar";
import Rodape from "../Componentes/Rodape";
import CardTemplate from "../Componentes/CardTemplate";

import "../Styles/Acervo.css";

import imagemOcula from "../assets/ocula.png";
import imagemTresorixas from "../assets/tresorixas.png";
import imagemEusou from "../assets/eusou.png";
import imagemAntropofagia from "../assets/antropofagia.png";
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

            <section className="cards-section">

                <div className="cards-acervo">

                   <CardTemplate
                        imagem={imagemAntropofagia}
                        titulo="ANTROPOFAGIA"
                        subtitulo="Tarsila do Amaral"
                    />

                    <CardTemplate
                        imagem={imagemOcula}
                        titulo="OCULA"
                        subtitulo="Tarsila"
                    />

                   <CardTemplate
                        imagem={imagemTresorixas}
                        titulo="TRÊS ORIXÁS"
                        subtitulo="Djanira Motta"
                    />

                    <CardTemplate
                        imagem={imagemAntropofagia}
                        titulo="ANTROPOFAGIA"
                        subtitulo="Tarsila do Amaral"
                    />

                    <CardTemplate
                        imagem={imagemOcula}
                        titulo="OCULA"
                        subtitulo="Lygia Pape"
                    />

                    <CardTemplate
                        imagem={imagemEusou}
                        titulo="EU SOU A MONSTRA"
                        subtitulo="Hilda Hist"
                    />

                    <CardTemplate
                        imagem={imagemTresorixas}
                        titulo="TRÊS ORIXÁS"
                        subtitulo="Djanira Motta"
                    />

                    <CardTemplate
                        imagem={imagemAntropofagia}
                        titulo="ANTROPOFAGIA"
                        subtitulo="Tarsila do Amaral"
                    />

                </div>

            </section>

            <Rodape />

        </div>
    );
}

export default Acervo;