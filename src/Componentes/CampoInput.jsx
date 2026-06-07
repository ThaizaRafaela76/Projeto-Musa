import "../Styles/CampoInput.css";

const CampoInput = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  handleOnChange,
  erro
}) => {
  return (
    <div className="campo-input">
      <label htmlFor={name}>{label}</label>

      <input
        className={`campo-input-field ${erro ? "campo-erro" : ""}`}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />

      {erro && <span>{erro}</span>}
    </div>
  );
};

export default CampoInput;