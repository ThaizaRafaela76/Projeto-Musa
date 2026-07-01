import { useState } from "react"
import { IoClose } from "react-icons/io5"
import "../Styles/ModalDenunciaForm.css"

function ModalDenunciaForm({ aberto, fecharModal }) {

    const [checkboxes, setCheckboxes] = useState({
        conteudoOfensivo: false,
        violacaoDireitos: false,
        informacaoIncorreta: false,
    })

    const [descricao, setDescricao] = useState("")
    const [erro, setErro] = useState("")
    const [confirmarAberto, setConfirmarAberto] = useState(false)

    if (!aberto) return null

    const algumCheckboxMarcado = Object.values(checkboxes).some((v) => v === true)
    const textoPreenchido = descricao.trim().length > 0

    function handleCheckbox(campo) {
        setCheckboxes({ ...checkboxes, [campo]: !checkboxes[campo] })
        setErro("")
    }

    function handleEnviar() {
        if (!algumCheckboxMarcado && !textoPreenchido) {
            setErro("*selecione ao menos uma opção")
            return
        }
        setConfirmarAberto(true)
    }

    function handleConfirmar() {
        setCheckboxes({ conteudoOfensivo: false, violacaoDireitos: false, informacaoIncorreta: false })
        setDescricao("")
        setErro("")
        setConfirmarAberto(false)
        alert("Denúncia enviada com sucesso!")
        fecharModal()
    }

    function handleCancelar() {
        setConfirmarAberto(false)
    }

    return (
        <div className="overlay-denuncia" onClick={fecharModal}>

            {/* modal principal do formulário */}
            <div className="modal-denuncia-form" onClick={(e) => e.stopPropagation()}>

                <button className="btn-fechar-denuncia" onClick={fecharModal}>
                    <IoClose />
                </button>

                <h2>Notou algum comportamento ou situação inadequados?</h2>

                <div className="checkboxes-denuncia">
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={checkboxes.conteudoOfensivo}
                            onChange={() => handleCheckbox("conteudoOfensivo")}
                        />
                        Conteúdo ofensivo ou impróprio
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={checkboxes.violacaoDireitos}
                            onChange={() => handleCheckbox("violacaoDireitos")}
                        />
                        Violação de direitos autorais
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={checkboxes.informacaoIncorreta}
                            onChange={() => handleCheckbox("informacaoIncorreta")}
                        />
                        Informação incorreta sobre a artista
                    </label>
                </div>

                <div className="campo-descricao-denuncia">
                    <label>Encontrou outro motivo? Conte-nos</label>
                    <textarea
                        placeholder="Máximo de 250 caracteres"
                        maxLength={250}
                        value={descricao}
                        onChange={(e) => { setDescricao(e.target.value); setErro("") }}
                    />
                </div>

                {erro && <p className="erro-denuncia">{erro}</p>}

                <button className="btn-enviar-denuncia" onClick={handleEnviar}>
                    Enviar
                </button>

            </div>

            {/* modal de confirmação */}
            {confirmarAberto && (
                <div className="overlay-confirmar" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-confirmar">
                        <h3>Deseja enviar esta denúncia?</h3>
                        <div className="btns-confirmar">
                            <button className="btn-confirmar" onClick={handleConfirmar}>Confirmar</button>
                            <button className="btn-cancelar-denuncia" onClick={handleCancelar}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ModalDenunciaForm