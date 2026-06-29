import NavbarAdmin from "../Componentes/NavbarAdmin"
import Rodape from "../Componentes/Rodape"
import PerfisArtistaAdmin from "../Componentes/PerfisArtistaAdmin"
import "../Styles/Artistas.css"
import { useEffect, useState } from "react"
import { buscarTodosArtistas } from "../services/artistasService"

const ArtistasAdmin = () => {
    const [artistas, setArtistas] = useState([])

    useEffect(() => {
        const carregar = async () => {
            try {
                const resultado = await buscarTodosArtistas()
                const artis = resultado.map((item) => {
                    item.cidade = item.localizacao
                    item.usuario = item.nomeUsuario
                    return item
                })
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
    ]

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
    ]

    return (
        <div>
            <div className="artistas">
                <div className="navbar"><NavbarAdmin /></div>
                <div className="artistasConteudo">
                    <div>
                        <span className="text1">Artistas</span>
                    </div>
                    <div className="text2">
                        <h1> São elas que criam. </h1>
                    </div>
                    <div className="imagem-artistas">
                       <img src={"/src/assets/Images.png"} />
                    </div>
                </div>
            </div>
            <PerfisArtistaAdmin mock={artistas} opcoesOrdem={opcoesOrdem} opcoesFiltro={opcoesFiltro} />
            <Rodape variante="bege" />
        </div>
    )
}

export default ArtistasAdmin