import { useState } from "react"
import {criarPublicacao} from "../services/publicacaoService"
import "../Styles/ModalPublic.css"
import BotaoNovaPublic from "./BotaoNovaPublic"
import CampoTextoPublicacaoEPerfil from "./CampoTextoPublicacaoEPerfil"
import CampoTextArea from "./CampoTextArea"
import CampoImgPublic from "./CampoImgPublic"
import BotaoPublicar from "./BotaoPublicar"
import Filtro from "./Filtro"
import { FaX } from "react-icons/fa6";


function ModalPublic({ aberto, fechado, onPublicacaoCriada }) {

    if (!aberto) return null;

    const [formPublic, setFormPublic] = useState({
        nomeObra: "",
        descricaoObra: "",
        categoriaObra: "",
        imagemObra: null
    })

    const [erros, setErros] = useState({})

    async function handleSubmit(e) {
        e.preventDefault();

        const regrasDeValidacao = {
            nomeObra: [
                {condicao: (v) => !v.trim(), mensagem: "*O nome da obra é obrigatório"},
                {condicao: (v) => v.trim().length > 18, mensagem: "*O nome da obra deve possuir até 18 caracteres"}
            ],

            descricaoObra: [
                {condicao: (v) => !v.trim(), mensagem: "*A descrição da obra é obrigatória"},
                {condicao: (v) => v.trim().length > 240, mensagem: "*A descrição da obra deve possuir até 240 caracteres"}
            ],

            imagemObra: [
                {condicao: (v) => !v, mensagem: "*Insira uma imagem"},
            ],

            categoriaObra: [
                {condicao: (v) => !v, mensagem: "*Escolha uma categoria"},
            ],
        }

        const novosErros = {}

        for (const [campo, listaDeRegras] of Object.entries(regrasDeValidacao)) {
            for (const {condicao, mensagem} of listaDeRegras) {
                if(condicao(formPublic[campo])) {
                    novosErros[campo] = mensagem
                    break
                }
            }
        }

        setErros(novosErros);

        if (Object.keys(novosErros).length > 0) {
            return;
        }

        try {
            const formData = new FormData()
            formData.append("nomeObra", formPublic.nomeObra)
            formData.append("descricaoObra", formPublic.descricaoObra)
            formData.append("categoriaObra", formPublic.categoriaObra)
            formData.append("imagemObra", formPublic.imagemObra)

            await criarPublicacao(formData)
            if(onPublicacaoCriada) onPublicacaoCriada()
            alert("Musa, sua obra foi publicada com sucesso! :)")
            fechado() 
        } catch(error) {
            console.error(error)
            alert("Erro ao publicar :( Tente novamente")
        }
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
                                    { value: "", label: "Categorias" },
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
                                ]}
                                    valor={filtro}
                                    onChange={(valor) => {
                                        setFiltro(valor);
                                        setFormPublic({...formPublic, categoriaObra:valor})
                                    }}
                                    aberto={filtroAberto}
                                    setAberto={setFiltroAberto}
                                    ordemAberta={ordemAberta}
                                    setOrdemAberta={setOrdemAberta}
                                    erro={erros.categoriaObra}
                                />
                                <span className="erro">{erros.categoriaObra}</span>
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