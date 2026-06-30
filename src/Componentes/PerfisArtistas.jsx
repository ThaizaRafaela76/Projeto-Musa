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
// - artistas: lista completa de artistas
// - opcoesOrdem: opções de ordenação (A→Z, Z→A)
// - opcoesFiltro: lista de cidades para filtrar
function PerfisArtistas({ artistas }) {
    //esses valores só vão ser acionados 
    // ======================= ESTADOS (useState) =======================
    // Aqui criamos as "memórias" do componente (estados)

    // Guarda o que o usuário está digitando na barra de pesquisa
    //set guarda um valor dentro de pesquisa, ele altera o valor
    const [pesquisa, setPesquisa] = useState("");
    

    // ======================= FILTRAGEM + ORDENAÇÃO =======================

    // Cria uma nova lista chamada artistasFiltrados, aplicando filtro e ordenação
    // Primeiro filtra os artistas
    //Está sendo criado uma nova lista contendo os artistas que foram filtrados pelo o que o usuario digitou na barra
    //de pesquisa e pelo nome da cidade que o usuario escolheu no filtro 
    //arrow function é uma função anonima 
    const artistasFiltrados = artistas.filter((artista) => {
        //vai criar uma nova lista de artistas filtrados pela pesquisa e pela cidade
        // Verifica se o nome do artista contém o texto que o usuário pesquisou. 
        // toLowerCase() transforma tudo em minúsculo para não diferenciar "Ana" de "ana"
        //vai perguntar se a pesquisa está dentro do includes. Includes = verificar . Tenho uma lista de caracteres, então o includes se pertence aquele nome
        //vai ver o que o usuario digitou e ver se ta dentro da lista de artistas
        const passaPesquisa = artista.usuario.toLowerCase().includes(pesquisa.toLowerCase());


        //retornar verdadeiro ou falso
        //para cada usuário, vai verificar se é verdadeiro ou falso, se essa condição for verdadeira.
        return passaPesquisa  // Só mantém quem passou nos dois testes
    })
    // ======================= NAVEGAÇÃO =======================

    // Cria a função de navegação entre páginas 
    const navigate = useNavigate();
    // Função que é chamada quando o usuário clica em um card de artista
    function irParaPerfil(uid) {
        // Pega o UID do usuário que está logado (salvo no navegador)
        //armazenamento interto do browser, guardado in memoria esse ID
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