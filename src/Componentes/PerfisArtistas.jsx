import { useState } from "react";
import BarraPesquisa from "./BarraPesquisa";
import Filtro from "./Filtro";
import Ordenar from "./Ordenar";
import "../Styles/PerfisArtistas.css"




function PerfisArtistas({mock, opcoesOrdem, opcoesFiltro}) {
    const [pesquisa, setPesquisa] = useState("");
    const [filtro, setFiltro] = useState("Filtro");
    const [ordem, setOrdem] = useState("az");
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [ordemAberta, setOrdemAberta] = useState(false);

    return (
        <div className="pagina">
            <div className="conteudo">
                <div className="controles">
                    <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa}></BarraPesquisa>
                    <Filtro opcoes={opcoesFiltro} valor={filtro} onChange={setFiltro}></Filtro>
                    <Ordenar valor={ordem} onChange={setOrdem}></Ordenar>
                </div>
            </div>
        </div>
    );
}

export default PerfisArtistas;
