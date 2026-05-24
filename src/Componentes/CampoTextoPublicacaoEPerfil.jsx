import "../Styles/CampoTextoPublic.css"

const CampoTextoPublicacaoEPerfil = ({label, placeholder, tipo = "input", id, value, onChange}) => {
    return(
        <div className="campo-texto-public">
            <label>{label}</label>

            {tipo === "textarea" ? (
                <textarea 
                className="campo-texto-public-field"
                id={id} 
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
            ) : (
                <input 
                type="text" 
                className="campo-texto-public-field" 
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
            )}
        </div>
    )
}

export default CampoTextoPublicacaoEPerfil