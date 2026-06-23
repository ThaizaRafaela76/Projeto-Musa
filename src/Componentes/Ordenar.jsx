// Importa duas funções importantes do React:
// useState → para guardar informações que mudam (estado)
// useEffect → para executar algo quando alguma coisa mudar
import { useEffect, useState } from "react";

// Importa um ícone de flecha (para mostrar que é para ordenar)
import { LuArrowUpDown } from "react-icons/lu";

// Importa o arquivo de CSS específico deste componente
import "../Styles/Ordenar.css";


// ======================= CONSTANTES =======================

// Cria uma lista de opções de ordenação
// Cada opção tem um "value" (valor técnico) e um "label" (texto que aparece para o usuário)
const opcoesOrdem = [
  { value: "az", label: "A → Z" },   // Ordenar de A para Z
  { value: "za", label: "Z → A" },   // Ordenar de Z para A
];


// ======================= COMPONENTE PRINCIPAL =======================

// Componente chamado "Ordenar"
// Recebe várias informações vindas do componente pai (props):
// - valor: qual ordenação está ativa no momento
// - onChange: função para avisar o pai quando o usuário escolher outra ordenação
// - aberto: controla se o menu de ordenação está aberto ou fechado
// - setAberto: função para abrir ou fechar o menu
// - filtroAberto e setFiltroAberto: usados para fechar o filtro quando o ordenar abrir
const Ordenar = ({ valor, onChange, aberto, setAberto, filtroAberto, setFiltroAberto }) => {

  // useEffect = "faça algo quando algo mudar"
  // Aqui: toda vez que o menu de ordenação abrir (aberto = true),
  // ele fecha automaticamente o menu de filtro
  useEffect(() => {
    if (aberto) {
      setFiltroAberto(false);
    }
  }, [aberto]);   // Só roda quando o valor de "aberto" mudar


  // ======================= O QUE É RENDERIZADO NA TELA =======================
  return (
    <div className="ordenar">   {/* Container principal do componente */}

      {/* Botão principal de "Ordenar" */}
      <button
        className="btnOrdenar"                    // Classe para estilização
        onClick={() => setAberto(!aberto)}        // Ao clicar, inverte o estado (abre se fechado, fecha se aberto)
      >
        Ordenar
        {/* Ícone de flecha ao lado da palavra "Ordenar" */}
        <span className="iconeOrdenar">
          <LuArrowUpDown />
        </span>
      </button>

      {/* Mostra o menu só se: o menu estiver aberto E o filtro estiver fechado */}
      {aberto && !filtroAberto && (
        <div className="menuOrdenar">   {/* Caixa que aparece com as opções */}

          {/* Percorre a lista de opções (A→Z e Z→A) e cria um item para cada */}
          {opcoesOrdem.map((op) => (
            <div
              key={op.value}                    // Chave única exigida pelo React
              className={`itemOrdenar ${valor === op.value ? "itemOrdenar--ativo" : ""}`}
              // Se a opção atual for a selecionada, adiciona a classe "ativo" (para destacar)

              onClick={() => {                  // Quando o usuário clicar em uma opção:
                onChange(op.value);             // 1. Avisa o componente pai qual ordenação foi escolhida
                setAberto(false);               // 2. Fecha o menu de ordenação
              }}
            >
              {op.label}                        {/* Mostra "A → Z" ou "Z → A" */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Exporta o componente para poder ser usado em outros arquivos
export default Ordenar;