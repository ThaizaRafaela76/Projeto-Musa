import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import "../Styles/Filtro.css";


const Filtro = ({ opcoes, valor, onChange, aberto, setAberto, ordemAberta, setOrdemAberta, obrigatorio, placeholder}) => {

  const labelAtual = opcoes.find((op) => op.value === valor)?.label || placeholder || "Filtro";

  const opcoesFiltradas = obrigatorio
    ? opcoes.filter(op => op.value !== "")
    : opcoes

  useEffect(()=>{
    if(aberto){
      setOrdemAberta(false);
    }
  },[aberto]);
  
  return (
    <div className="filtro">
      <button
        className="btnFiltro"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          setAberto(!aberto);
        }}
      >
        {labelAtual}
        <span className="setaFiltro">{!aberto && (<MdOutlineKeyboardArrowDown />)}{aberto && (<MdOutlineKeyboardArrowUp />)}</span>
      </button>

      {aberto && (
        <div className="menuFiltro">
          <div className="menuFiltro-scroll">
          {opcoesFiltradas.map((op) => (
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
        </div>
      )}
    </div>
  );
};

export default Filtro;