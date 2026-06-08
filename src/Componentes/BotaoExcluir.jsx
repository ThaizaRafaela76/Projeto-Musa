import "../Styles/BotaoExcluir.css"
 
function BotaoExcluir({ excluirObra }) {
    return (
        <button className="botao-excluir" onClick={excluirObra}>
            Excluir
        </button>
    )
}
 
export default BotaoExcluir