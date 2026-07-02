import { useState, useEffect } from "react"
import NavbarAdmin from "../Componentes/NavbarAdmin";
import Rodape from "../Componentes/Rodape";
import CardTemplate from "../Componentes/CardTemplate"
import CardTemplateArtista from "../Componentes/CardTemplateArtista"
import BotaoExcluir from "../Componentes/BotaoExcluir"
import ModalExcluirPubli from "../Componentes/ModalExcluirPubli.jsx"
import { deletarPublicacaoAdmin } from "../services/publicacaoService"
import { buscarTodosArtistas, deletarArtistaAdmin } from "../services/artistasService"
import { buscarTodasDenunciasObra, deletarDenunciaObra } from "../services/denunciasObraService.js"
import { buscarTodasDenunciasArtista, deletarDenunciaArtista } from "../services/denunciasArtistaService.js"
import "../Styles/PerfilAdmin.css";
import "../Styles/Acervo.css";

function AdminDenuncias({ usuario }) {
    const [refreshKey, setRefreshKey] = useState(0)

    const [denunciasPublicacoes, setDenunciasPublicacoes] = useState([])
    const [obraSelecionada, setObraSelecionada] = useState(null)
    const [selecionadasO, setSelecionadasO] = useState([])
    const [imgAbertaObra, setImgAbertaObra] = useState(false)

    const [denunciasArtistas, setDenunciasArtistas] = useState([])
    const [artistaSelecionado, setArtistaSelecionado] = useState(null) // 👈 null, não []
    const [selecionadasA, setSelecionadasA] = useState([])
    const [imgAbertaArtista, setImgAbertaArtista] = useState(false)

    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)
    const [tipoExclusao, setTipoExclusao] = useState(null) // "obra" ou "artista"

    useEffect(() => {
        async function carregarDados() {
            try {
                const denunciasP = await buscarTodasDenunciasObra()
                setDenunciasPublicacoes(denunciasP)
            } catch (error) {
                console.error("Erro ao carregar denúncias de obras:", error)
            }
            try {
                const denunciasA = await buscarTodasDenunciasArtista()
                setDenunciasArtistas(denunciasA)
            } catch (error) {
                console.error("Erro ao carregar denúncias de artistas:", error)
            }
        }
        carregarDados()
    }, [refreshKey])

    function toggleSelecionadaO(id) {
        setSelecionadasO(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    function abrirObra(d) {
        setObraSelecionada(d)
        document.body.style.overflow = "hidden"
    }

    function fecharObra() {
        setObraSelecionada(null)
        setImgAbertaObra(false)
        document.body.style.overflow = "auto"
    }

    async function confirmarExclusaoObra() {
        try {
            await deletarPublicacaoAdmin(obraSelecionada.obra.id)
            await deletarDenunciaObra(obraSelecionada.id)
            fecharModalExcluir()
            fecharObra()
            setRefreshKey(prev => prev + 1)
        } catch (error) {
            alert("Erro ao excluir a obra.")
        }
    }

    async function excluirSelecionadasO() {
        if (selecionadasO.length === 0) return
        try {
            await Promise.all(
                selecionadasO.map(async (id) => {
                    const denuncia = denunciasPublicacoes.find(d => d.obra.id === id)
                    await deletarPublicacaoAdmin(denuncia.obra.id)
                    await deletarDenunciaObra(denuncia.id)
                })
            )
            setSelecionadasO([])
            setRefreshKey(prev => prev + 1)
        } catch (error) {
            alert("Erro ao excluir obras selecionadas.")
        }
    }


    function toggleSelecionadaA(id) {
        setSelecionadasA(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    function abrirArtista(d) {
        setArtistaSelecionado(d)
        document.body.style.overflow = "hidden"
    }

    function fecharArtista() {
        setArtistaSelecionado(null)
        setImgAbertaArtista(false)
        document.body.style.overflow = "auto"
    }

    async function confirmarExclusaoArtista() {
        try {
            await deletarArtistaAdmin(artistaSelecionado.artista.uid)
            await deletarDenunciaArtista(artistaSelecionado.id)
            fecharModalExcluir()
            fecharArtista()
            setRefreshKey(prev => prev + 1)
        } catch (error) {
            alert("Erro ao excluir a artista.")
        }
    }

    async function excluirSelecionadasA() {
        if (selecionadasA.length === 0) return
        try {
            await Promise.all(
                selecionadasA.map(async (id) => {
                    const denuncia = denunciasArtistas.find(d => d.artista.uid === id)
                    await deletarArtistaAdmin(denuncia.artista.uid)
                    await deletarDenunciaArtista(denuncia.id)
                })
            )
            setSelecionadasA([])
            setRefreshKey(prev => prev + 1)
        } catch (error) {
            alert("Erro ao excluir artistas selecionadas.")
        }
    }

    function abrirModalExcluir(tipo) {
        setTipoExclusao(tipo)
        setModalExcluirAberto(true)
    }

    function fecharModalExcluir() {
        setModalExcluirAberto(false)
        setTipoExclusao(null)
    }

    async function confirmarExclusao() {
        if (tipoExclusao === "obra") await confirmarExclusaoObra()
        if (tipoExclusao === "artista") await confirmarExclusaoArtista()
    }

    return (
        <div className="pagina-admin">
            <NavbarAdmin />

            <section className="cabecalho-admin">
                <h1>Olá, Admin</h1>
                <p>Veja tudo que foi denunciado</p>
            </section>

            <section className="secao-denuncias">

                {/* ===== OBRAS ===== */}
                <div className="bloco-denuncias">
                    <div className="bloco-topo">
                        <h2>Obras denunciadas</h2>
                        <button className="btn-excluir" onClick={excluirSelecionadasO}>
                            Excluir {selecionadasO.length > 0 && `(${selecionadasO.length})`}
                        </button>
                    </div>
                    <div className="cards-denuncias">
                        {denunciasPublicacoes.length === 0 ? (
                            <p className="mensagem-vazia">Não há obras denunciadas</p>
                        ) : (
                            denunciasPublicacoes.map((d) => (
                                <div key={d.id} className="card-denuncia-wrapper" onClick={() => abrirObra(d)} style={{ cursor: "pointer" }}>
                                    <div className="checkbox-denuncia">
                                        <input
                                            type="checkbox"
                                            checked={selecionadasO.includes(d.obra.id)}
                                            onChange={(e) => { e.stopPropagation(); toggleSelecionadaO(d.obra.id) }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    <CardTemplate
                                        imagem={`http://localhost:3000${d.obra.imagemObra}`}
                                        titulo={d.obra.nomeObra}
                                        subtitulo={d.obra.artistaObra}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ===== ARTISTAS ===== */}
                <div className="bloco-denuncias">
                    <div className="bloco-topo">
                        <h2>Artistas denunciadas</h2>
                        <button className="btn-excluir" onClick={excluirSelecionadasA}>
                            Excluir {selecionadasA.length > 0 && `(${selecionadasA.length})`}
                        </button>
                    </div>
                    <div className="cards-denuncias">
                        {denunciasArtistas.length === 0 ? (
                            <p className="mensagem-vazia">Não há artistas denunciadas</p>
                        ) : (
                            denunciasArtistas.map((d) => (
                                <div key={d.id} className="card-denuncia-wrapper artista-wrapper" onClick={() => abrirArtista(d)} style={{ cursor: "pointer" }}>
                                    <div className="checkbox-denuncia">
                                        <input
                                            type="checkbox"
                                            checked={selecionadasA.includes(d.artista.uid)}
                                            onChange={(e) => { e.stopPropagation(); toggleSelecionadaA(d.artista.uid) }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    <CardTemplateArtista
                                        imagem={d.artista.fotoPerfil}
                                        nome={d.artista.nomeCompleto}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </section>

            {/* ===== MODAL OBRA ===== */}
            {obraSelecionada && (
                <div className="overlay-obra">
                    <div className="modal-geral" onClick={(e) => e.stopPropagation()}>
                        <div className="btn-modal">
                            <BotaoExcluir excluirObra={(e) => { e.stopPropagation(); abrirModalExcluir("obra") }} />
                            <button className="btn-fechar-obra" onClick={(e) => { e.stopPropagation(); fecharObra() }}>✕</button>
                        </div>
                        <div className="org-modal">
                            <div className="div-imagem">
                                <img
                                    src={`http://localhost:3000${obraSelecionada.obra.imagemObra}`}
                                    alt={obraSelecionada.obra.nomeObra}
                                    onClick={() => setImgAbertaObra(true)}
                                    style={{ cursor: "pointer" }}
                                />
                                <h1 className="titulo-obra">{obraSelecionada.obra.nomeObra}</h1>
                            </div>
                            <div className="div-info">
                                <h2>{obraSelecionada.obra.artistaObra}</h2>
                                <h3>{obraSelecionada.obra.categoriaObra}</h3>
                                <h3>Motivos da denúncia:</h3>
                                <ul style={{ paddingLeft: "2rem" }}>
                                    {obraSelecionada.motivos.map((m, index) => (
                                        <li key={index}>{m}</li>
                                    ))}
                                </ul>
                                <h3>Descrição da denúncia:</h3>
                                <p className="descr-obra">{obraSelecionada.descricao}</p>
                            </div>
                        </div>
                    </div>
                    {imgAbertaObra && (
                        <div className="overlay-imagem" onClick={() => setImgAbertaObra(false)}>
                            <img src={`http://localhost:3000${obraSelecionada.obra.imagemObra}`} className="img-aberta" />
                        </div>
                    )}
                </div>
            )}

            {/* ===== MODAL ARTISTA ===== */}
            {artistaSelecionado && (
                <div className="overlay-obra">
                    <div className="modal-geral" onClick={(e) => e.stopPropagation()}>
                        <div className="btn-modal">
                            <BotaoExcluir excluirObra={(e) => { e.stopPropagation(); abrirModalExcluir("artista") }} />
                            <button className="btn-fechar-obra" onClick={(e) => { e.stopPropagation(); fecharArtista() }}>✕</button>
                        </div>
                        <div className="org-modal">
                            <div className="div-imagem">
                                <img
                                    src={artistaSelecionado.artista.fotoPerfil}
                                    alt={artistaSelecionado.artista.nomeCompleto}
                                    onClick={() => setImgAbertaArtista(true)}
                                    style={{ cursor: "pointer" }}
                                />
                                <h1 className="titulo-obra">{artistaSelecionado.artista.nomeCompleto}</h1>
                            </div>
                            <div className="div-info">
                                <h2>{artistaSelecionado.artista.nomeCompleto}</h2>
                                <h3>{artistaSelecionado.artista.localizacao}</h3>
                                <h3>Motivos da denúncia:</h3>
                                <ul style={{ paddingLeft: "2rem" }}>
                                    {artistaSelecionado.motivos.map((m, index) => (
                                        <li key={index}>{m}</li>
                                    ))}
                                </ul>
                                <h3>Descrição da denúncia:</h3>
                                <p className="descr-obra">{artistaSelecionado.descricao}</p>
                            </div>
                        </div>
                    </div>
                    {imgAbertaArtista && (
                        <div className="overlay-imagem" onClick={() => setImgAbertaArtista(false)}>
                            <img src={`http://localhost:3000${artistaSelecionado.artista.fotoPerfil}`} className="img-aberta" />
                        </div>
                    )}
                </div>
            )}

            <ModalExcluirPubli
                aberto={modalExcluirAberto}
                cancelar={fecharModalExcluir}
                confirmar={confirmarExclusao}
            />

            <Rodape variante="bege" />
        </div>
    )
}

export default AdminDenuncias