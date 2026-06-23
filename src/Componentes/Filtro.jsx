//impotando Hook useEffect e useState do react
import { useEffect, useState } from "react";
//Importando icones de setinha para baixo e setinha para cima
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
//importando css do filtro
import "../Styles/Filtro.css";

//uma função em arrow function. Aqui são as propriedades que estão sendo passadas
//para o componente filtro
function Filtro ({ opcoes, valor, onChange, aberto, setAberto, ordemAberta, setOrdemAberta}){
//Verificando se a constante labelAtual tem o valor igual o valor da propriedade passada
//As opções.find vai encontrar dentro dessas opções se o valor está aqui dentro, se tiver a labelAtual vai ficar com o valor de label
//? -> tá verificando se existe 
  let labelAtual = null
  if (opcoes.find((op) => op.value === valor)){
    labelAtual = opcoes.find((op) => op.value === valor).label
  }
//se não a label vai receber o nome filtro
  else {
    labelAtual = "Filtro";
  }
//UseEffect dois parâmentros, função e uma lista de valores ou elementos, que toda vez que um desses elementos muda o valor, o useEffect executa a função que tá sendo chamada pra ele
//se o aberto mudar de valor, ele dispara a função que tá sendo passada como parâmentro pra ele
  useEffect(()=>{
    if(aberto){
      setOrdemAberta(false);
    }
  },[aberto]);
  
  //retornando o html da componente 
  //div é o pai e o button é o filho
  // event.propagation -> impede que o comportamento do filho seja passado pro pai 
  //event.degafault impede o comportamento padrão
  //setAberto vai controlar a abertura do filtro, se tiver aberto
  // !negação que poderia ser um if 
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
        {/* css da seta. se falso, setinha pra baixo (down) se não up ( seta pra cima*/}
        {labelAtual}
        <span className="setaFiltro">{!aberto && (<MdOutlineKeyboardArrowDown />)}{aberto && (<MdOutlineKeyboardArrowUp />)}</span>
      </button>
{/* Se "aberto" for verdadeiro, vai exibir a div do menu filtro. Ele vai fazer o map que tá transformando cada
opção em uma div das opções que estou passando na propriedade filtro, que é a componente. executar pra cada
opção (op) ele vai criar uma div passando para a key da div o value da opção. 
className, se o valor for igual ao valor da opção, então vai ter o valor de ativo e pintar o background dela de vinho, se não nn vai fazer nada.
onclick. vai ta passando uma função de mudar o valor da opção, se clicar em outra value diferente, vai alterar o valor de filtro, e o setAberto vai mudar 
de valor e fechar o filtro quando for escolhido uma nova value.

O op.label é a opção da label que é exibido
*/}
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