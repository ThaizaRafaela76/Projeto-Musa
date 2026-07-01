// Importa useState do React.
import { useState } from "react";

// Importa useNavigate do React Router Dom.
// Ele permite mudar de página de forma programática (sem clicar em link).
import { Link, useNavigate } from "react-router-dom";

// Importa os componentes que serão usados dentro desta página:
import BarraPesquisa from "./BarraPesquisa";     // Caixa de pesquisa
import Filtro from "./Filtro";                   // Menu de filtro
import Ordenar from "./Ordenar";                 // Menu de ordenação
import CardTemplateArtista from "../Componentes/CardTemplateArtista"; // Card de cada artista

// Importa o arquivo de estilos CSS desta página
import "../Styles/PerfisArtistas.css";


function PerfisArtistas({ artistas }) {

    const [pesquisa, setPesquisa] = useState("");
    
    const artistasFiltrados = artistas.filter((artista) => {

        const passaPesquisa = artista.usuario.toLowerCase().includes(pesquisa.toLowerCase());

        return passaPesquisa; 
    })
  
    const navigate = useNavigate();
   
    //função executada ao clicar no card 
    function irParaPerfil(uid) {

        const meuUid = localStorage.getItem("uid");

        // Se o usuário clicou no próprio perfil..,
        if (meuUid && uid === meuUid) {
            navigate("/minhaconta");        // vai para a página de edição da conta
        } else {
            navigate(`/perfil/${uid}`);     // vai para o perfil público daquele artista
        }
    }


    // ======================= O QUE APARECE NA TELA =======================
    return (
        <div className="pagina">           {/* Div principal da página */}

            <div className="conteudo">     {/* Área central do conteúdo */}

                {/* Controles: pesquisa, filtro e ordenação */}
                <div className="controles">

                    {/* Barra onde o usuário digita para pesquisar artistas */}
                    <BarraPesquisa
                        pesquisa={pesquisa}
                        setPesquisa={setPesquisa}
                    />
                </div>

                {/* Se não encontrou nenhum artista após os filtros */}
                {artistasFiltrados.length === 0 ? (
                    <p className="mensagem">
                        Nenhuma artista encontrada
                    </p>
                ) : (
                    // Mostra os cards dos artistas
                    <div className="cardsContainer">
                        {artistasFiltrados.map((artista) => (
                            // Cada card fica dentro de uma div que pode ser clicada
                            <div
                                key={artista.uid}
                                onClick={() => irParaPerfil(artista.uid)}
                            >
                                <CardTemplateArtista
                                    nome={artista.usuario}        // Nome do artista
                                    imagem={artista.fotoPerfil}   // Foto de perfil
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Exporta o componente para poder ser usado em outras páginas
export default PerfisArtistas;