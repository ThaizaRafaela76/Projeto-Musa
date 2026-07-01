const CampoTextAreaPublic = ({label, name, placeholder, value, handleOnChange, erro, opcional}) => {
    return(
        <div className="campo-texto-public">
            <label htmlFor={name}>{label} {opcional && <span className="label-opcional">(opcional)</span>}</label>
            <textarea
                className={`campo-texto-public-field ${erro ? "campo-erro" : ""}`}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
            />   
            {erro && <span className="erro-imagem">{erro}</span>}
        </div>
    )
}

export default CampoTextAreaPublic