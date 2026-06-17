import "../Styles/CampoTextoPublic.css"

const CampoTextoPublicacaoEPerfil = ({label, name, placeholder, value, handleOnChange, erro}) => {
    return(
        <div className="campo-texto-public">
            <label htmlFor={name}>{label}</label>

            <input
                className={`campo-texto-public-field ${erro ? "campo-erro" : ""}`}
                name={name}
                id={name}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
            />

            {erro && <span className="erro-imagem">{erro}</span>}
        </div>
    )
}

export default CampoTextoPublicacaoEPerfil