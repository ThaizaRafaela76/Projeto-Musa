import "../Styles/ModalExcluirPubli.css"

function ModalExcluirPubli({ confirmar, cancelar }) {
    return (
        <div className="div-modal-excluir">
            <div className="div-excluir">
                <h1 className="texto-excluir">Tem certeza que deseja excluir essa publicação?</h1>
                <div className="bnt-excluir">
                    <button className="confir-bnt" onClick={confirmar}>Confirmar</button>
                    <button className="canc-bnt" onClick={cancelar}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalExcluirPubli