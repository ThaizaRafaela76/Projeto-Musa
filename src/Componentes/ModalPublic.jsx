import { useState } from "react"
import "../Styles/ModalPublic.css"
import BotaoNovaPublic from "./BotaoNovaPublic"
import CampoTextoPublicacaoEPerfil from "./CampoTextoPublicacaoEPerfil"
import CampoTextArea from "./CampoTextArea"
import CampoImgPublic from "./CampoImgPublic"
import BotaoPublicar from "./BotaoPublicar"
import Filtro from "./Filtro"
import { FaX } from "react-icons/fa6";


function ModalPublic({ aberto, fechado }) {

    if (!aberto) return null;

    const [formPublic, setFormPublic] = useState({
        nomeObra: "",
        artistaObra: "",
        descricaoObra: "",
        categoriaObra: "",
        imagemObra: null
    })

    const [erros, setErros] = useState({})

    function handleSubmit(e) {
        e.preventDefault();

        let novosErros = {};

        if (!formPublic.nomeObra.trim()) {
            novosErros.nomeObra = "O nome da obra é obrigatório"
        }

        if (!formPublic.artistaObra.trim()) {
            novosErros.artistaObra = "O nome da artista é obrigatório"
        }

        if (!formPublic.descricaoObra.trim()) {
            novosErros.descricaoObra = "A descrição é obrigatória"
        }

        if (!formPublic.imagemObra) {
            novosErros.imagemObra = "Insira a imagem da sua obra"
        }


        setErros(novosErros);

        if (Object.keys(novosErros).length > 0) {
            return;
        }

        alert(`Form enviado`, formPublic)
        fechado()
    }

    const [filtro, setFiltro] = useState("");
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [ordemAberta, setOrdemAberta] = useState(false);
    return (
        <div className="modal-overlay">

            {/* header do modal */}
            <div className="modal-publicacao">
                <div className="modal-public-header">
                    <h2>Nova publicação</h2>
                    <button className="fechar-modal-public" onClick={fechado}>
                        <FaX />
                    </button>
                </div>
                <div className="modal-public-conteudo">
                    <form className="form-publicacao" onSubmit={handleSubmit}>
                        {/* conteúdo do lado esquerdo */}
                        <div className="modal-public-esquerda">
                            <CampoImgPublic
                                name="imagemObra"
                                imagem={formPublic.imagemObra}
                                setImagem={(img) => setFormPublic({ ...formPublic, imagemObra: img })}
                                erro={erros.imagemObra}
                            />
                            <div className="modal-categoria-obra">
                                <h3>Categoria da obra</h3>
                                <Filtro opcoes={[
                                    { value: "", label: "Filtro" },
                                    { value: "pintura", label: "Pintura" },
                                    { value: "colagem", label: "Colagem" },
                                    { value: "arte digital", label: "Arte digital" },
                                    { value: "fotografia", label: "Fotografia" },
                                    { value: "xilogravura", label: "Xilogravura" },
                                ]}
                                    valor={filtro}
                                    onChange={setFiltro}
                                    aberto={filtroAberto}
                                    setAberto={setFiltroAberto}
                                    ordemAberta={ordemAberta}
                                    setOrdemAberta={setOrdemAberta}
                                />
                            </div>
                        </div>
                        {/* conteúdo do lado direito */}
                        <div className="modal-public-direita">
                            <CampoTextoPublicacaoEPerfil
                                label="Nome da obra"
                                name="nomeObra"
                                placeholder="Girassóis ao Entardecer"
                                value={formPublic.nomeObra}
                                handleOnChange={(e) => setFormPublic({ ...formPublic, nomeObra: e.target.value })}
                                erro={erros.nomeObra} />
                            <CampoTextoPublicacaoEPerfil
                                label="Nome da artista"
                                name="artistaObra"
                                placeholder="Maria"
                                value={formPublic.artistaObra}
                                handleOnChange={(e) => setFormPublic({ ...formPublic, artistaObra: e.target.value })}
                                erro={erros.artistaObra} />
                            <CampoTextArea
                                label="Descrição"
                                name="descricaoObra"
                                value={formPublic.descricaoObra}
                                placeholder="Conte-nos um pouco sobre sua obra... :)"
                                handleOnChange={(e) => setFormPublic({ ...formPublic, descricaoObra: e.target.value })}
                                erro={erros.descricaoObra} />
                            <BotaoPublicar publicarObra />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalPublic