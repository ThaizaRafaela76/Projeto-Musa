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


// ======================= COMPONENTE PRINCIPAL =======================

// Componente da página "Artistas"
// Recebe a prop "usuario" para saber se o usuário está logado ou não
const Artistas = ({ usuario }) => {

    // ======================= ESTADOS =======================

    // Estado que vai guardar a lista de artistas vindos do banco de dados
    const [artistas, setArtistas] = useState([]);


    // ======================= CARREGAMENTO DOS DADOS =======================

    // useEffect roda automaticamente quando o componente é carregado
    useEffect(() => {
        //a função assíncrona não precisa esperar, ela não precisa terminar de esperar 
        //o codigo pode continuar executando, mas se tiver wait 
        // Função assíncrona para carregar os artistas
        const carregar = async () => {
            try {
                // Chama o service para buscar todos os artistas do API 
                const resultado = await buscarTodosArtistas();

                // Transforma os dados para o formato que o componente PerfisArtistas espera
                //item = artista
                const lista_artistas_formatados = resultado.map((artista, index) => {
                    // Renomeia "localizacao" para "cidade"
                    artista.cidade = artista.localizacao;
                    // Renomeia "nomeUsuario" para "usuario"
                    artista.usuario = artista.nomeUsuario;
                    return artista;
                });
                //setar a minha lista de artista formatados, vou mudar o meu artistas para os artistas formatados
                setArtistas(lista_artistas_formatados); // Atualiza o estado com os artistas
            } catch (error) {
                console.error("Erro ao carregar artista:", error);
            }
        };

        carregar();   // Executa a função de carregamento´
    }, []);   // O array vazio [] significa: execute apenas uma vez ao montar o componente


    // ======================= RENDERIZAÇÃO DA PÁGINA =======================
    //retornar o html da minha página
    return (
        <div>   {/* Container principal da página */}

            {/* Seção superior com título e imagem decorativa */}
            <div className="artistas">

                {/* Navbar muda dependendo se o usuário está logado ou não */}
                <div className="navbar">
                    {usuario ? <Navbar /> : <NavbarVisitante/>}
                </div>

                {/* Conteúdo principal da seção de apresentação */}
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

            {/* Componente que mostra a lista de artistas com pesquisa, filtro e ordenação */}
            <PerfisArtistas 
                artistas={artistas} 
            />

            {/* Rodapé da página com variante "bege" (cor bege) */}
            <Rodape variante="bege"></Rodape>
        </div>
    );
};

// Exporta o componente para ser usado nas rotas
export default Artistas;