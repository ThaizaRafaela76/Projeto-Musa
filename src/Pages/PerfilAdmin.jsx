import { useState, useEffect } from "react"
import NavbarAdmin from "../Componentes/NavbarAdmin";
import Rodape from "../Componentes/Rodape";
import CardTemplate from "../Componentes/CardTemplate"
import CardTemplateArtista from "../Componentes/CardTemplateArtista"
import BotaoExcluir from "../Componentes/BotaoExcluir"
import ModalExcluirPubli from "../Componentes/ModalExcluirPubli.jsx"
import { buscarPublicacoes, deletarPublicacao } from "../services/publicacaoService"
import { buscarTodosArtistas } from "../services/artistasService"
import "../Styles/PerfilAdmin.css";
import "../Styles/Acervo.css";

function AdminDenuncias() {

    const [obras, setObras] = useState([])
    const [artistas, setArtistas] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)
    const [obraSelecionada, setObraSelecionada] = useState(null)
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)
    const [imgAberta, setImgAberta] = useState(false)

    useEffect(() => {
        async function carregarDados() {
            try {
                const publicacoes = await buscarPublicacoes()
                setObras(publicacoes)
            } catch (error) {
                console.error("Erro ao carregar obras:", error)
            }
            try {
                const todasArtistas = await buscarTodosArtistas()
                setArtistas(todasArtistas)
            } catch (error) {
                console.error("Erro ao carregar artistas:", error)
            }
        }
        carregarDados()
    }, [refreshKey])

    function abrirObra(obra) {
        setObraSelecionada(obra)
        document.body.style.overflow = "hidden"
    }

    function fecharObra() {
        setObraSelecionada(null)
        setImgAberta(false)
        document.body.style.overflow = "auto"
    }

    function abrirModalExcluir() {
        setModalExcluirAberto(true)
    }

    function fecharModalExcluir() {
        setModalExcluirAberto(false)
    }

    async function confirmarExclusao() {
        try {
            await deletarPublicacao(obraSelecionada.id)
            fecharModalExcluir()
            fecharObra()
            setRefreshKey(prev => prev + 1)
        } catch (error) {
            alert("Erro ao excluir a obra.")
        }
    }

    return (
        <div className="pagina-admin">

            <NavbarAdmin />

            <section className="cabecalho-admin">
                <h1>Olá, Admin</h1>
                <p>Veja tudo que foi denunciado</p>
            </section>

            <section className="secao-denuncias">

                <div className="bloco-denuncias">
                    <div className="bloco-topo">
                        <h2>Obras denunciadas</h2>
                        <button className="btn-excluir">Excluir</button>
                    </div>
                    <div className="cards-denuncias">
                        {obras.length === 0 ? (
                            <p className="mensagem-vazia">Não há obras denunciadas</p>
                        ) : (
                            obras.map((obra) => (
                                <div key={obra.id} className="card-denuncia-wrapper" onClick={() => abrirObra(obra)} style={{ cursor: "pointer" }}>
                                    <div className="checkbox-denuncia" onClick={(e) => e.stopPropagation()}>
                                        <input type="checkbox" />
                                    </div>
                                    <CardTemplate
                                        imagem={`http://localhost:3000${obra.imagemObra}`}
                                        titulo={obra.nomeObra}
                                        subtitulo={obra.artistaObra}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bloco-denuncias">
                    <div className="bloco-topo">
                        <h2>Artistas denunciadas</h2>
                        <button className="btn-excluir">Excluir</button>
                    </div>
                    <div className="cards-denuncias">
                        {artistas.length === 0 ? (
                            <p className="mensagem-vazia">Não há artistas denunciadas</p>
                        ) : (
                            artistas.map((artista) => (
                                <div key={artista.id} className="card-denuncia-wrapper artista-wrapper">
                                    <div className="checkbox-denuncia" onClick={(e) => e.stopPropagation()}>
                                        <input type="checkbox" />
                                    </div>
                                    <CardTemplateArtista
                                        imagem={artista.fotoPerfil}
                                        nome={artista.nomeCompleto}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </section>

            {obraSelecionada && (
                <div className="overlay-obra">
                    <div className="modal-geral" onClick={(e) => e.stopPropagation()}>
                        <div className="btn-modal">
                            <BotaoExcluir excluirObra={(e) => { e.stopPropagation(); abrirModalExcluir(); }} />
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

            <ModalExcluirPubli
                aberto={modalExcluirAberto}
                cancelar={fecharModalExcluir}
                confirmar={confirmarExclusao}
            />

            <Rodape variante="bege" />

        </div>
    );
}

export default AdminDenuncias;