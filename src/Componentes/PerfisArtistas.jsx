import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarraPesquisa from "./BarraPesquisa";
import Filtro from "./Filtro";
import Ordenar from "./Ordenar";
import CardTemplateArtista from "../Componentes/CardTemplateArtista";
import "../Styles/PerfisArtistas.css"




function PerfisArtistas({ mock, opcoesOrdem, opcoesFiltro }) {
    const [pesquisa, setPesquisa] = useState("");
    const [filtro, setFiltro] = useState("");
    const [ordem, setOrdem] = useState("az");
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [ordemAberta, setOrdemAberta] = useState(false);

    const mockFiltrados = mock.filter((item) => {
        const passaPesquisa = item.usuario.toLowerCase().includes(pesquisa.toLowerCase());
        const passaFiltro = (filtro === "" || item.cidade === filtro);
        console.log(passaPesquisa && passaFiltro);
        return passaPesquisa && passaFiltro;
    }).sort((a, b) => {
        return ordem == "az" ? a.usuario.localeCompare(b.usuario) : b.usuario.localeCompare(a.usuario)
    });
    console.log("Teste: ", mockFiltrados.length);

    const navigate = useNavigate();
    function irParaPerfil() {
        navigate('/minhaconta');

    }
    return (
        <div className="pagina">
            <div className="conteudo">
                <div className="controles">
                    <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa}></BarraPesquisa>
                    <Filtro opcoes={opcoesFiltro} valor={filtro} onChange={setFiltro} aberto={filtroAberto} setAberto={setFiltroAberto} ordemAberta={ordemAberta} setOrdemAberta={setOrdemAberta}></Filtro>
                    <Ordenar valor={ordem} onChange={setOrdem} aberto={ordemAberta} setAberto={setOrdemAberta} filtroAberto={filtroAberto} setFiltroAberto={setFiltroAberto}></Ordenar>
                </div>
                {
                    mockFiltrados.length === 0 ? (
                        <p>
                            Nenhuma artista encontrada
                        </p>
                    ) : (
                        <div className="cardsContainer">
                            {
                                mockFiltrados.map((item) => (
                                    <div className="cardLink" onClick={irParaPerfil}>
                                        <CardTemplateArtista
                                            nome={item.usuario}
                                            imagem={"src/assets/image 11.png"}
                                        ></CardTemplateArtista>
                                    </div>
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
