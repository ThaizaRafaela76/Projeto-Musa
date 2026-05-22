import Navbar from "../Componentes/Navbar"
import Rodape from "../Componentes/Rodape";
import PerfisArtistas from "../Componentes/PerfisArtistas";
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

    const artistasMock = [
        { id: 1, usuario: "@FridaKahlo", tipo: "Pintura", cidade: "Quixadá" },
        { id: 2, usuario: "@FridaKahlo", tipo: "Fotografia", cidade: "Mombaça" },
        { id: 3, usuario: "@FridaKahlo", tipo: "Escultura", cidade: "Choró" },
        { id: 4, usuario: "@FridaKahlo", tipo: "Ilustração", cidade: "Pedra Branca" },
        { id: 5, usuario: "@FridaKahlo", tipo: "Pintura", cidade: "Quixeramobim" },
        { id: 6, usuario: "@FridaKahlo", tipo: "Grafite", cidade: "Banabuiu" },
        { id: 7, usuario: "@FridaKahlo", tipo: "Fotografia", cidade: "Ibaretama" },
        { id: 8, usuario: "@FridaKahlo", tipo: "Escultura", cidade: "Milhã" },
        { id: 9, usuario: "@FridaKahlo", tipo: "Ilustração", cidade: "Senador" },
        { id: 10, usuario: "@FridaKahlo", tipo: "Pintura", cidade: "Solonopole" },
        { id: 11, usuario: "@FridaKahlo", tipo: "Grafite", cidade: "Piquet Carneiro" },
        { id: 12, usuario: "@FridaKahlo", tipo: "Fotografia", cidade: "Ibicuitinga" },
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
            <Navbar></Navbar>
            <div className="artistas">
                <div>
                    <span className="text1">Artistas</span>
                </div>
                <div>
                    <span className="text2">São elas que criam.</span>
                </div>
                <div>
                    {
                        imagens.map((image, index) => {
                            return (<img
                                key={index}
                                src={image}
                                alt={`Imagem ${index + 1}`}
                            />)
                        })
                    }
                </div>
            </div>
            <PerfisArtistas mock={artistasMock} opcoesOrdem={opcoesOrdem} opcoesFiltro={opcoesFiltro}></PerfisArtistas>
            <Rodape variante="bege" ></Rodape>

        </div>
    );
}

export default Artistas;