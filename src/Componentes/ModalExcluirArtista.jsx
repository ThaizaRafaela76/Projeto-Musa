import "../Styles/ModalExcluirArtista.css"

function ModalExcluirArtista({ aberto, confirmar, cancelar }) {

    if (!aberto) {
        return null
    }

    return (
        <div className="div-modal-excluir-artista">
            <div className="div-excluir-artista">
                <h1 className="texto-excluir-artista">Tem certeza que deseja excluir essa artista?</h1>
                <div className="bnt-excluir-artista">
                    <button className="confir-bnt-artista" onClick={confirmar}>Confirmar</button>
                    <button className="canc-bnt-artista" onClick={cancelar}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalExcluirArtista