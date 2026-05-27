import '../Styles/ModalSair.css'

function ModalSair({ onFechar }) {

    function handleConfirmar() {
        alert('Você saiu com sucesso!')
    }

    return (
        <div  className='overlay-sair' onClick={onFechar}>
            <div className='div-geral-sair'>
                <h1 className='texto-sair'>Tem certeza que deseja sair?</h1>
                <div className='div-bnts'>
                    <button className='bnt-confirmar' onClick={handleConfirmar}>Confirmar</button>
                    <button className='bnt-cancelar' onClick={onFechar}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalSair