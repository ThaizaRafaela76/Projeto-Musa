import "../Styles/CampoTextoPublic.css"

const CampoTextoPublicacaoEPerfil = ({label, placeholder, tipo = "input", id}) => {
    return(
        <div className="campo-texto-public">
            <label>{label}</label>

            {tipo === "textarea" ? (
                <textarea className="campo-texto-public-field" id="campo-descricao" placeholder={placeholder} />
            ) : (
                <input type="text" className="campo-texto-public-field" placeholder={placeholder} />
            )}
        </div>
    )
}

export default CampoTextoPublicacaoEPerfil