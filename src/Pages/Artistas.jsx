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
        
        // Função assíncrona para carregar os artistas
        const carregar = async () => {
            try {
                // Chama o service para buscar todos os artistas do Firebase
                const resultado = await buscarTodosArtistas();

                // Transforma os dados para o formato que o componente PerfisArtistas espera
                const artis = resultado.map((item, index) => {
                    // Renomeia "localizacao" para "cidade"
                    item.cidade = item.localizacao;
                    // Renomeia "nomeUsuario" para "usuario"
                    item.usuario = item.nomeUsuario;
                    return item;
                });

                console.log(artis);        // Mostra no console os dados carregados
                setArtistas(artis);        // Atualiza o estado com os artistas
            } catch (error) {
                console.error("Erro ao carregar artista:", error);
            }
        };

        carregar();   // Executa a função de carregamento
    }, []);   // O array vazio [] significa: execute apenas uma vez ao montar o componente


    // ======================= OPÇÕES DE FILTRO E ORDENAÇÃO =======================

    // Opções de ordenação que serão passadas para o componente PerfisArtistas
    const opcoesOrdem = [
        { value: "az", label: "A → Z" },
        { value: "za", label: "Z → A" },
    ];

    // Opções de filtro por cidade (lista fixa)
    const opcoesFiltro = [
        { value: "", label: "Todas as cidades" },
        { value: "Banabuiu", label: "Banabuiu" },
        { value: "Choró", label: "Choró" },
        { value: "Deputado Irapuan Pinheiro", label: "Deputado Irapuan Pinheiro" },
        { value: "Ibaretama", label: "Ibaretama" },
        { value: "Ibicuitinga", label: "Ibicuitinga" },
        { value: "Milhã", label: "Milhã" },
        { value: "Mombaça", label: "Mombaça" },
        { value: "Pedra Branca", label: "Pedra Branca" },
        { value: "Piquet Carneiro", label: "Piquet Carneiro" },
        { value: "Quixadá", label: "Quixadá" },
        { value: "Quixeramobim", label: "Quixeramobim" },
        { value: "Senador", label: "Senador" },
        { value: "Solonopole", label: "Solonopole" },
    ];


    // ======================= RENDERIZAÇÃO DA PÁGINA =======================
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
                mock={artistas} 
                opcoesOrdem={opcoesOrdem} 
                opcoesFiltro={opcoesFiltro}
            />

            {/* Rodapé da página com variante "bege" (cor bege) */}
            <Rodape variante="bege"></Rodape>
        </div>
    );
};

// Exporta o componente para ser usado nas rotas
export default Artistas;