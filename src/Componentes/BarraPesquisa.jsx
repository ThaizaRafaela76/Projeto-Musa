import { IoIosSearch } from "react-icons/io";
import "../Styles/BarraPesquisa.css"

function BarraPesquisa({pesquisa, setPesquisa}) { 
    return (
        <div className="caixaPesquisa">
            <input 
               className="inputPesquisa" 
               type="text"
               placeholder="Pesquisa"
               value={pesquisa}
               onChange={(e) => setPesquisa(e.target.value)}
            />
            <span className="iconeLupa"><IoIosSearch /></span>
        </div>
    )
}

export default BarraPesquisa;