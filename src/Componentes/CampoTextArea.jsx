const CampoTextAreaPublic = ({label, name, placeholder, value, handleOnChange, erro}) => {
    return(
        <div className="campo-texto-public">
            <label htmlFor={name}>{label}</label>
            <textarea
                className={`campo-texto-public-field ${erro ? "campo-erro" : ""}`}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
            />   
            {erro && <span>{erro}</span>}
        </div>
    )
}

export default CampoTextAreaPublic