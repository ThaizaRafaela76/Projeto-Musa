import "../Styles/BotaoPublicar.css"

const BotaoPublicar = ({publicarObra}) => {
    return(
            <button className="publicar-obra" onClick={publicarObra}>Publicar</button>
    )
}

export default BotaoPublicar