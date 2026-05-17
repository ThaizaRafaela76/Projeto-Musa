import "../Styles/Rodape.css"

function Rodape({variante}) {
    if(variante == "bege") {
        return (
            <footer className="rodape-bege">
            <p>Musa 2026 - Todos os direitos reservados.</p>
        </footer>
        )
    } else {
        return (
        <footer className="rodape">
            <p>Musa 2026 - Todos os direitos reservados.</p>
        </footer>
    )
    }
    
}

export default Rodape