import { useState, useEffect } from "react"
import { buscarPublicacoes, deletarPublicacaoAdmin } from "../services/publicacaoService.js"
import BarraPesquisa from "../Componentes/BarraPesquisa"
import Filtro from "../Componentes/Filtro"
import Ordenar from "../Componentes/Ordenar"
import BotaoExcluir from "../Componentes/BotaoExcluir"
import NavbarAdmin from "../Componentes/NavbarAdmin"
import Rodape from "../Componentes/Rodape"
import CardTemplate from "../Componentes/CardTemplate"
import ModalExcluirPubli from "../Componentes/ModalExcluirPubli"
import "../Styles/Acervo.css"

import bannerAcervo from "../assets/banner-acervo.png"
import "../Styles/AcervoAdmin.css"

const opcoesFiltro = [
    { value: "", label: "Todas as obras" },
    { value: "Pintura", label: "Pintura" },
    { value: "Colagem", label: "Colagem" },
    { value: "Arte digital", label: "Arte digital" },
    { value: "Fotografia", label: "Fotografia" },
    { value: "Xilogravura", label: "Xilogravura" },
    { value: "Design", label: "Design" },
    { value: "Poesia", label: "Poesia" },
    { value: "Literatura", label: "Literatura" },
    { value: "Arquitetura", label: "Arquitetura" },
    { value: "Artesanato", label: "Artesanato" },
    { value: "Desenho", label: "Desenho" },
    { value: "Escultura", label: "Escultura" },
]

function AcervoAdmin() {

    const [pesquisa, setPesquisa] = useState("")
    const [filtro, setFiltro] = useState("")
    const [ordem, setOrdem] = useState("az")
    const [filtroAberto, setFiltroAberto] = useState(false)
    const [ordemAberta, setOrdemAberta] = useState(false)
    const [obras, setObras] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)
    const [obraSelecionada, setObraSelecionada] = useState(null)   // modal de visualização
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)
    const [imgAberta, setImgAberta] = useState(false)
    const [modoExclusao, setModoExclusao] = useState(false)        // ativa checkboxes
    const [obraParaExcluir, setObraParaExcluir] = useState(null)   // obra marcada no checkbox

    useEffect(() => {
        async function carregarObras() {
            try {
                const publicacoes = await buscarPublicacoes()
                setObras(publicacoes)
            } catch (error) {
                console.error("Erro ao carregar obras:", error)
            }
        }
        carregarObras()
    }, [refreshKey])

    // Modal de visualização — só abre se NÃO estiver em modo exclusão
    function abrirObra(obra) {
        if (modoExclusao) return
        setObraSelecionada(obra)
        document.body.style.overflow = "hidden"
    }

    function fecharObra() {
        setObraSelecionada(null)
        setImgAberta(false)
        document.body.style.overflow = "auto"
    }

    // Lógica do botão lixeira nos controles do acervo
    function handleBotaoLixeira() {
        if (!modoExclusao) {
            // 1º clique: ativa modo exclusão
            setModoExclusao(true)
            setObraParaExcluir(null)
        } else {
            // 2º clique: se tem obra selecionada, abre modal; senão, cancela modo
            if (obraParaExcluir) {
                setModalExcluirAberto(true)
            } else {
                setModoExclusao(false)
            }
        }
    }

    function handleCheckbox(e, obra) {
        e.stopPropagation()
        // Marca ou desmarca: só uma por vez
        setObraParaExcluir(prev => prev?.id === obra.id ? null : obra)
    }

    function fecharModalExcluir() {
        setModalExcluirAberto(false)
        setModoExclusao(false)
        setObraParaExcluir(null)
    }

    async function confirmarExclusao() {
    try {
        const obraId = obraParaExcluir?.id ?? obraSelecionada?.id
        await deletarPublicacaoAdmin(obraId)
        fecharModalExcluir()
        fecharObra()
        setModoExclusao(false)
        setObraParaExcluir(null)
        setRefreshKey(prev => prev + 1)
    } catch (error) {
        alert("Erro ao excluir a obra.")
    }
}

    const obrasFiltradas = obras.filter((item) => {
        const passaPesquisa = item.nomeObra.toLowerCase().includes(pesquisa.toLowerCase())
        const passaFiltro = filtro === "" || item.categoriaObra === filtro
        return passaPesquisa && passaFiltro
    }).sort((a, b) => {
        return ordem === "az" ? a.nomeObra.localeCompare(b.nomeObra) : b.nomeObra.localeCompare(a.nomeObra)
    })

    return (
        <div className="pagina-acervo-admin">

            <NavbarAdmin />

            <section className="titulo-acervo-admin">
                <p>Acervo Digital</p>
                <h1>
                    Criado por elas.
                    <br />
                    Inspirado por elas.
                </h1>
            </section>

            <section className="imagem-acervo-admin">
                <img src={bannerAcervo} alt="Acervo Digital" />
            </section>

            <section className="cards-section-admin">

                <div className="controles-acervo-admin">
                    <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />
                    <Filtro opcoes={opcoesFiltro} valor={filtro} onChange={setFiltro} aberto={filtroAberto} setAberto={setFiltroAberto} ordemAberta={ordemAberta} setOrdemAberta={setOrdemAberta} />
                    <Ordenar valor={ordem} onChange={setOrdem} aberto={ordemAberta} setAberto={setOrdemAberta} filtroAberto={filtroAberto} setFiltroAberto={setFiltroAberto} />
                    <BotaoExcluir variante="bege" excluirObra={handleBotaoLixeira} />
                </div>

                {obrasFiltradas.length === 0 ? (
                    <p className="mensagem-admin">Nenhuma obra encontrada</p>
                ) : (
                    <div className="cards-acervo-admin">
                        {obrasFiltradas.map((obra) => (
                            <div
                                key={obra.id}
                                className="card-admin-wrapper"
                                onClick={() => abrirObra(obra)}
                                style={{ cursor: modoExclusao ? "default" : "pointer" }}
                            >
                                {modoExclusao && (
                                    <div className="checkbox-card-admin" onClick={(e) => handleCheckbox(e, obra)}>
                                        <input
                                            type="checkbox"
                                            checked={obraParaExcluir?.id === obra.id}
                                            onChange={() => {}}
                                        />
                                    </div>
                                )}
                                <CardTemplate
                                    imagem={`http://localhost:3000${obra.imagemObra}`}
                                    titulo={obra.nomeObra}
                                    subtitulo={obra.artistaObra}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal de visualização — inalterado */}
                {obraSelecionada && (
                    <div className="overlay-obra">
                        <div className="modal-geral" onClick={(e) => e.stopPropagation()}>
                            <div className="btn-modal">
                                <BotaoExcluir excluirObra={(e) => { e.stopPropagation(); setObraParaExcluir(obraSelecionada); setModalExcluirAberto(true); }} />
                                <button className="btn-fechar-obra" onClick={(e) => { e.stopPropagation(); fecharObra(); }}>✕</button>
                            </div>
                            <div className="org-modal">
                                <div className="div-imagem">
                                    <img
                                        src={`http://localhost:3000${obraSelecionada.imagemObra}`}
                                        alt={obraSelecionada.nomeObra}
                                        onClick={() => setImgAberta(true)}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <h1 className="titulo-obra">{obraSelecionada.nomeObra}</h1>
                                </div>
                                <div className="div-info">
                                    <h2>{obraSelecionada.artistaObra}</h2>
                                    <h3>{obraSelecionada.categoriaObra}</h3>
                                    <p className="descr-obra">{obraSelecionada.descricaoObra}</p>
                                </div>
                            </div>
                        </div>

                        {imgAberta && (
                            <div className="overlay-imagem" onClick={() => setImgAberta(false)}>
                                <img src={`http://localhost:3000${obraSelecionada.imagemObra}`} className="img-aberta" />
                            </div>
                        )}
                    </div>
                )}

            </section>

            <ModalExcluirPubli
                aberto={modalExcluirAberto}
                cancelar={fecharModalExcluir}
                confirmar={confirmarExclusao}
            />

            <Rodape variante="bege" />

        </div>
    )
}

export default AcervoAdmin
