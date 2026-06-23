// ======================= IMPORTAÇÕES =======================

// Importa useState do React.
// useState serve para criar variáveis que guardam informações e, quando mudam, 
// fazem a tela do usuário atualizar automaticamente.
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


// ======================= COMPONENTE PRINCIPAL =======================

// Este é o componente principal da página que mostra a lista de artistas.
// Ele recebe 3 informações do componente pai (props):
// - mock: lista completa de artistas
// - opcoesOrdem: opções de ordenação (A→Z, Z→A)
// - opcoesFiltro: lista de cidades para filtrar
function PerfisArtistas({ mock, opcoesOrdem, opcoesFiltro }) {

    // ======================= ESTADOS (useState) =======================
    // Aqui criamos as "memórias" do componente (estados)

    // Guarda o que o usuário está digitando na barra de pesquisa
    const [pesquisa, setPesquisa] = useState("");

    // Guarda qual cidade o usuário escolheu para filtrar
    const [filtro, setFiltro] = useState("");

    // Guarda a ordenação atual: "az" = A → Z   ou   "za" = Z → A
    const [ordem, setOrdem] = useState("az");

    // Controla se o menu de filtro está aberto (true) ou fechado (false)
    const [filtroAberto, setFiltroAberto] = useState(false);

    // Controla se o menu de ordenação está aberto (true) ou fechado (false)
    const [ordemAberta, setOrdemAberta] = useState(false);


    // ======================= FILTRAGEM + ORDENAÇÃO =======================

    // Cria uma nova lista chamada mockFiltrados, aplicando filtro e ordenação
    const mockFiltrados = mock

        // Primeiro filtra os artistas
        .filter((item) => {

            // Verifica se o nome do artista contém o texto que o usuário pesquisou
            // toLowerCase() transforma tudo em minúsculo para não diferenciar "Ana" de "ana"
            const passaPesquisa = item.usuario.toLowerCase().includes(pesquisa.toLowerCase());

            // Se não tiver filtro (filtro === ""), mostra todos.
            // Senão, só mostra artistas da cidade selecionada.
            const passaFiltro = (filtro === "" || item.cidade === filtro);

            console.log(passaPesquisa && passaFiltro); // Apenas para debug

            return passaPesquisa && passaFiltro; // Só mantém quem passou nos dois testes
        })

        // Depois ordena a lista
        .sort((a, b) => {
            // Se a ordem for "az", ordena de A para Z
            // Se for "za", ordena de Z para A
            return ordem === "az" 
                ? a.usuario.localeCompare(b.usuario) 
                : b.usuario.localeCompare(a.usuario);
        });

    // Mostra no console quantos artistas sobraram (útil durante o desenvolvimento)
    console.log("Teste: ", mockFiltrados.length);


    // ======================= NAVEGAÇÃO =======================

    // Cria a função de navegação entre páginas
    const navigate = useNavigate();

    // Função que é chamada quando o usuário clica em um card de artista
    function irParaPerfil(uid) {
        // Pega o UID do usuário que está logado (salvo no navegador)
        const meuUid = localStorage.getItem("uid");

        // Se o usuário clicou no próprio perfil...
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

                    {/* Menu de filtro por cidade */}
                    <Filtro 
                        opcoes={opcoesFiltro} 
                        valor={filtro} 
                        onChange={setFiltro} 
                        aberto={filtroAberto} 
                        setAberto={setFiltroAberto} 
                        ordemAberta={ordemAberta} 
                        setOrdemAberta={setOrdemAberta} 
                    />

                    {/* Menu de ordenação (A→Z ou Z→A) */}
                    <Ordenar 
                        valor={ordem} 
                        onChange={setOrdem} 
                        aberto={ordemAberta} 
                        setAberto={setOrdemAberta} 
                        filtroAberto={filtroAberto} 
                        setFiltroAberto={setFiltroAberto} 
                    />
                </div>

                {/* Se não encontrou nenhum artista após os filtros */}
                {mockFiltrados.length === 0 ? (
                    <p className="mensagem">
                        Nenhuma artista encontrada
                    </p>
                ) : (
                    // Mostra os cards dos artistas
                    <div className="cardsContainer">
                        {mockFiltrados.map((item) => (
                            // Cada card fica dentro de uma div que pode ser clicada
                            <div 
                                key={item.uid} 
                                onClick={() => irParaPerfil(item.uid)}
                            >
                                <CardTemplateArtista
                                    nome={item.usuario}        // Nome do artista
                                    imagem={item.fotoPerfil}   // Foto de perfil
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