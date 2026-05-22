
import "../Styles/CardTemplateArtista.css";

function CardTemplateArtista({ imagem, nome }) {
    return (
        <div className="card-template">

            <img
                src={imagem}
                alt={nome}
                className="card-imagem"
            />

            <div className="card-info">
                <h2>{nome}</h2>
            </div>

        </div>
    );
}

export default CardTemplateArtista;