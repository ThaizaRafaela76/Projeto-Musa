import "../Styles/CardTemplate.css";

function CardTemplate({ imagem, titulo, subtitulo }) {
    return (
        <div className="card-template">

            <img
                src={imagem}
                alt={titulo}
                className="card-imagem"
            />

            <div className="card-info">
                <h2>{titulo}</h2>
                <p>{subtitulo}</p>
            </div>

            

        </div>
    );
}

export default CardTemplate;