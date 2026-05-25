import { useState } from "react";
import BarraPesquisa from "./BarraPesquisa";
import Filtro from "./Filtro";
import Ordenar from "./Ordenar";
import CardTemplateArtista from "../Componentes/CardTemplateArtista";
import "../Styles/PerfisArtistas.css"




function PerfisArtistas({mock, opcoesOrdem, opcoesFiltro}) {
    const [pesquisa, setPesquisa] = useState("");
    const [filtro, setFiltro] = useState("");
    const [ordem, setOrdem] = useState("az");
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [ordemAberta, setOrdemAberta] = useState(false);

    const mockFiltrados = mock.filter((item)=>{
        const passaPesquisa = item.usuario.toLowerCase().includes(pesquisa.toLowerCase());
        const passaFiltro = (filtro ==="" || item.cidade === filtro); 
        console.log( passaPesquisa && passaFiltro);
        return passaPesquisa && passaFiltro;
    }).sort((a,b)=>{
        return ordem == "az" ? a.usuario.localeCompare(b.usuario) : b.usuario.localeCompare(a.usuario)
    });

    console.log(mockFiltrados)
    return (
        <div className="pagina">
            <div className="conteudo">
                <div className="controles">
                    <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa}></BarraPesquisa>
                    <Filtro opcoes={opcoesFiltro} valor={filtro} onChange={setFiltro}></Filtro>
                    <Ordenar valor={ordem} onChange={setOrdem}></Ordenar>
                </div>
                {   
                    mockFiltrados.lenght === 0 ? (
                        <p>
                          Nenhum artistas encontrado  
                        </p>
                    ) : (
                        <div className="cardsContainer">
                            {
                                mockFiltrados.map((item) =>(
                                    <CardTemplateArtista 
                                        nome={item.usuario} 
                                        imagem={"src/assets/image 11.png"}
                                    ></CardTemplateArtista>
                                ))
                            }
                            
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default PerfisArtistas;
