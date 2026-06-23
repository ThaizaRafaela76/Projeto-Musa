// Importa o ícone de lupa (lente de pesquisa) da biblioteca react-icons
import { IoIosSearch } from "react-icons/io";

// Importa o arquivo CSS específico para estilizar esta barra de pesquisa
import "../Styles/BarraPesquisa.css";


// ======================= COMPONENTE BARRA DE PESQUISA =======================

// Componente responsável por criar a barra onde o usuário pode digitar para pesquisar artistas
// Recebe duas props vindas do componente pai:
// - pesquisa: o texto atual que está sendo pesquisado
// - setPesquisa: função para atualizar o texto da pesquisa
function BarraPesquisa({ pesquisa, setPesquisa }) { 

    // ======================= O QUE É RENDERIZADO NA TELA =======================
    return (
        // Container principal da barra de pesquisa
        <div className="caixaPesquisa">

            {/* Campo de input onde o usuário digita o nome do artista */}
            <input 
                className="inputPesquisa"           // Classe CSS para estilizar o campo de texto
                type="text"                         // Define que é um campo de texto normal
                placeholder="Pesquisa"              // Texto que aparece quando o campo está vazio
                value={pesquisa}                    // Liga o valor do input ao estado "pesquisa"
                
                // Toda vez que o usuário digitar algo, atualiza o estado no componente pai
                onChange={(e) => setPesquisa(e.target.value)}
                // Explicação do onChange:
                // - e = evento
                // - e.target.value = o texto que o usuário acabou de digitar
            />

            {/* Ícone de lupa que fica dentro da barra de pesquisa */}
            <span className="iconeLupa">
                <IoIosSearch />     {/* Renderiza o ícone de pesquisa */}
            </span>
        </div>
    )
}

// Exporta o componente para que possa ser usado em outras páginas (como em PerfisArtistas)
export default BarraPesquisa;