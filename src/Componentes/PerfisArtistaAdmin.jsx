import { useState } from "react"
import { useNavigate } from "react-router-dom"
import BarraPesquisa from "./BarraPesquisa"
import Filtro from "./Filtro"
import Ordenar from "./Ordenar"
import BotaoExcluir from "./BotaoExcluir"
import CardTemplateArtista from "./CardTemplateArtista"
import ModalExcluirArtista from "./ModalExcluirArtista"
import { deletarArtistaAdmin } from "../services/artistasService"
import "../Styles/PerfisArtistas.css"

function PerfisArtistasAdmin({ mock, opcoesOrdem, opcoesFiltro }) {
    const [pesquisa, setPesquisa] = useState("")
    const [filtro, setFiltro] = useState("")
    const [ordem, setOrdem] = useState("az")
    const [filtroAberto, setFiltroAberto] = useState(false)
    const [ordemAberta, setOrdemAberta] = useState(false)
    const [modoExclusao, setModoExclusao] = useState(false)
    const [artistaParaExcluir, setArtistaParaExcluir] = useState(null)
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)

    const navigate = useNavigate()

    const mockFiltrados = mock.filter((item) => {
        const passaPesquisa = item.usuario.toLowerCase().includes(pesquisa.toLowerCase())
        const passaFiltro = filtro === "" || item.cidade === filtro
        return passaPesquisa && passaFiltro
    }).sort((a, b) => {
        return ordem === "az" ? a.usuario.localeCompare(b.usuario) : b.usuario.localeCompare(a.usuario)
    })

    function irParaPerfil(uid) {
        if (modoExclusao) return
        const meuUid = localStorage.getItem("uid")
        if (meuUid && uid === meuUid) {
            navigate("/minhaconta")
        } else {
            navigate(`/perfil/${uid}`)
        }
    }

    function handleBotaoLixeira() {
        if (!modoExclusao) {
            setModoExclusao(true)
            setArtistaParaExcluir(null)
        } else {
            if (artistaParaExcluir) {
                setModalExcluirAberto(true)
            } else {
                setModoExclusao(false)
            }
        }
    }

    function handleCheckbox(e, artista) {
        e.stopPropagation()
        setArtistaParaExcluir(prev => prev?.id === artista.id ? null : artista)
    }

    function fecharModalExcluir() {
        setModalExcluirAberto(false)
        setModoExclusao(false)
        setArtistaParaExcluir(null)
    }

    async function confirmarExclusao() {
        try {
            console.log("artistaParaExcluir:", artistaParaExcluir)
            await deletarArtistaAdmin(artistaParaExcluir.id)
            fecharModalExcluir()
        } catch (error) {
            console.log("erro:", error)
            alert("Erro ao excluir a artista.")
        }
    }

    return (
        <div className="pagina">
            <div className="conteudo">
                <div className="controles">
                    <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />
                    <Filtro opcoes={opcoesFiltro} valor={filtro} onChange={setFiltro} aberto={filtroAberto} setAberto={setFiltroAberto} ordemAberta={ordemAberta} setOrdemAberta={setOrdemAberta} />
                    <Ordenar valor={ordem} onChange={setOrdem} aberto={ordemAberta} setAberto={setOrdemAberta} filtroAberto={filtroAberto} setFiltroAberto={setFiltroAberto} />
                    <BotaoExcluir variante="bege" excluirObra={handleBotaoLixeira} />
                </div>

                {mockFiltrados.length === 0 ? (
                    <p className="mensagem">Nenhuma artista encontrada</p>
                ) : (
                    <div className="cardsContainer">
                        {mockFiltrados.map((item) => (
                            <div
                                key={item.uid}
                                style={{ position: "relative", cursor: modoExclusao ? "default" : "pointer" }}
                                onClick={() => irParaPerfil(item.uid)}
                            >
                                {modoExclusao && (
                                    <div
                                        style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
                                        onClick={(e) => handleCheckbox(e, item)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={artistaParaExcluir?.id === item.id}
                                            onChange={() => {}}
                                            style={{ width: 20, height: 20, cursor: "pointer", accentColor: "var(--vinho)" }}
                                        />
                                    </div>
                                )}
                                <CardTemplateArtista
                                    nome={item.usuario}
                                    imagem={item.fotoPerfil}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ModalExcluirArtista
                aberto={modalExcluirAberto}
                cancelar={fecharModalExcluir}
                confirmar={confirmarExclusao}
            />
        </div>
    )
}

export default PerfisArtistasAdmin