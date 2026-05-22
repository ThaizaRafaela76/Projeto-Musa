import { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import "../Styles/Filtro.css";


const Filtro = ({ opcoes, valor, onChange }) => {
  const [aberto, setAberto] = useState(false);

  const labelAtual =
    opcoes.find((op) => op.value === valor)?.label || "Filtro";

  return (
    <div className="filtro">
      <button
        className="btnFiltro"
        onClick={() => setAberto(!aberto)}
      >
        {labelAtual}
        <span className="setaFiltro">{!aberto && (<MdOutlineKeyboardArrowDown />)}{aberto && (<MdOutlineKeyboardArrowUp />)}</span>
      </button>

      {aberto && (
        <div className="menuFiltro">
          {opcoes.map((op) => (
            <div
              key={op.value}
              className={`itemFiltro ${valor === op.value ? "itemFiltro--ativo" : ""}`}
              onClick={() => {
                onChange(op.value);
                setAberto(false);
              }}
            >
              {op.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filtro;