import Navbar from "../../Componentes/Navbar"
import Rodape from "../../Componentes/Rodape";
import PerfisArtistas from "../../Componentes/PerfisArtistas";
import "../Styles/Artistas.css"


const Artistas = () => {
    const imagens = [
        "src/assets/pagu.png",
        "src/assets/auxiliadora.png",
        "src/assets/djaniramotta.png",
        "src/assets/hilda.png",
        // "src/assets/lygia.png", 
        // "src/assets/.png"
    ];

    const opcoesOrdem = [
        { value: "az", label: "A → Z" },
        { value: "za", label: "Z → A" },
    ];

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



    return (
        <div>
            
            <div className="artistas">
                <div className="navbar"><Navbar ></Navbar></div>
                <div className="artistasConteudo">
                    <div>
                        <span className="text1">Artistas</span>
                    </div>
                    <div className="text2">
                        <h1> São elas que criam. </h1>
                    </div>
                    <div className="imagem-artistas">
                        <img
                            src={"src/assets/Images.png"}
                        />
                    </div>
                </div>
            </div>
            <PerfisArtistas mock={artistasMock} opcoesOrdem={opcoesOrdem} opcoesFiltro={opcoesFiltro}></PerfisArtistas>
            <Rodape variante="bege" ></Rodape>
        </div>
    );
}

export default Artistas;