import Navbar from "../Componentes/Navbar";
import NavbarVisitante from "../Componentes/NavbarVisitante";
import Rodape from "../Componentes/Rodape";
import PerfisArtistas from "../Componentes/PerfisArtistas";
import "../Styles/Artistas.css"
import { useEffect, useState } from "react";
import { buscarTodosArtistas } from "../services/artistasService";


const Artistas = ({usuario}) => {
    const imagens = [
        "src/assets/pagu.png",
        "src/assets/auxiliadora.png",
        "src/assets/djaniramotta.png",
        "src/assets/hilda.png",
        // "src/assets/lygia.png", 
        // "src/assets/.png"
    ];

    // const artistasMock = [
    //     { id: 1, usuario: "Nina Sousa", tipo: "Pintura", cidade: "Quixadá" },
    //     { id: 2, usuario: "Beatriz Soares", tipo: "Fotografia", cidade: "Mombaça" },
    //     { id: 3, usuario: "Cristiane Menezes", tipo: "Escultura", cidade: "Choró" },
    //     { id: 4, usuario: "Francisca da Silva", tipo: "Ilustração", cidade: "Pedra Branca" },
    //     { id: 5, usuario: "Zeuda Honório", tipo: "Pintura", cidade: "Quixeramobim" },
    //     { id: 6, usuario: "Leticia Queiroz", tipo: "Grafite", cidade: "Banabuiu" },
    //     { id: 7, usuario: "Julia Laiza", tipo: "Fotografia", cidade: "Ibaretama" },
    //     { id: 8, usuario: "Erika Rodrigues", tipo: "Escultura", cidade: "Milhã" },
    //     { id: 9, usuario: "Larissa Maia", tipo: "Ilustração", cidade: "Senador" },
    //     { id: 10, usuario: "Thaiza Rafaela", tipo: "Pintura", cidade: "Solonopole" },
    //     { id: 11, usuario: "Martina Ribeiro", tipo: "Grafite", cidade: "Piquet Carneiro" },
    //     { id: 12, usuario: "Aparecida Maria", tipo: "Fotografia", cidade: "Ibicuitinga" },
    // ];

    const [artistas, setArtistas] = useState([])

    useEffect(() => {
        const carregar = async () => {
            try {
                const resultado = await buscarTodosArtistas()
                const artis = resultado.map((item, index) => {
                    item.cidade = item.localizacao
                    item.usuario = item.nomeUsuario
                    return item
                })
                console.log(artis)
                setArtistas(artis)
            } catch (error) {
                console.error("Erro ao carregar artista:", error)
            }
        }
        carregar()
    }, [])

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
                <div className="navbar">{usuario ? <Navbar /> : <NavbarVisitante/>}</div>
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
            <PerfisArtistas mock={artistas} opcoesOrdem={opcoesOrdem} opcoesFiltro={opcoesFiltro}></PerfisArtistas>
            <Rodape variante="bege" ></Rodape>
        </div>
    );
}

export default Artistas;