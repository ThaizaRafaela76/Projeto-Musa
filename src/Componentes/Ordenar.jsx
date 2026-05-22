import { useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import "../Styles/Ordenar.css";

const opcoesOrdem = [
  { value: "az", label: "A → Z" },
  { value: "za", label: "Z → A" },
];

const Ordenar = ({ valor, onChange }) => {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="ordenar">
      <button
        className="btnOrdenar"
        onClick={() => setAberto(!aberto)}
      >
        Ordenar
        <span className="iconeOrdenar"><LuArrowUpDown/></span>
      </button>

      {aberto && (
        <div className="menuOrdenar">
          {opcoesOrdem.map((op) => (
            <div
              key={op.value}
              className={`itemOrdenar ${valor === op.value ? "itemOrdenar--ativo" : ""}`}
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

export default Ordenar;