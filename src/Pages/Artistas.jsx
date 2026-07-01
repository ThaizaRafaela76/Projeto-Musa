// Importa o componente Navbar (para usuários logados)
import Navbar from "../Componentes/Navbar";

// Importa o componente NavbarVisitante (para usuários que não estão logados)
import NavbarVisitante from "../Componentes/NavbarVisitante";

// Importa o componente Rodape (footer da página)
import Rodape from "../Componentes/Rodape";

// Importa o componente que mostra a lista de artistas com pesquisa, filtro e ordenação
import PerfisArtistas from "../Componentes/PerfisArtistas";

// Importa o arquivo CSS específico desta página
import "../Styles/Artistas.css";

// Importa useEffect e useState do React
import { useEffect, useState } from "react";

// Importa a função do service que busca todos os artistas do banco de dados
import { buscarTodosArtistas } from "../services/artistasService";


// Componente da página "Artistas"
const Artistas = ({ usuario }) => {

    //váriavel de estado artistas 
    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
       
        // Função assíncrona para carregar os artistas
        const carregar = async () => {
            try {
                // Chama o service para buscar todos os artistas do API 
                const resultado = await buscarTodosArtistas();
                
                // Transforma os dados
                const lista_artistas_formatados = resultado.map((artista, index) => {

                    artista.cidade = artista.localizacao;

                    artista.usuario = artista.nomeUsuario;
                    return artista;
                });

                setArtistas(lista_artistas_formatados); // Atualiza o estado com os artistas
            }
            catch (error) {
                console.error("Erro ao carregar artista:", error);
            }
        };

        carregar();   // Executa a função de carregamento
    }, []); 

    //retornar o html
    return (
        <div>

            <div className="artistas">

                <div className="navbar">
                    {usuario ? <Navbar /> : <NavbarVisitante/>}
                </div>

                <div className="artistasConteudo">
                    
                    <div>
                        <span className="text1">Artistas</span>
                    </div>

                    <div className="text2">
                        <h1> São elas que criam. </h1>
                    </div>

                    {/* Imagem decorativa grande */}
                    <div className="imagem-artistas">
                        <img
                            src={"src/assets/Images.png"}
                        />
                    </div>
                </div>
            </div>

            <PerfisArtistas 
                artistas={artistas} 
            />

            <Rodape variante="bege"></Rodape>
        </div>
    );
};

// Exporta o componente para ser usado nas rotas
export default Artistas;