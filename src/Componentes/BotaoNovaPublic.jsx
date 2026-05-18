import { useState } from "react"
import "../Styles/BotaoNovaPublic.css"
import { FaPlus } from "react-icons/fa6";







function BotaoNovaPublic() {

        const [aberto, setAberto] = useState(false);

        function abrirModal() {
            console.log("está assim")
            setAberto(!aberto)
            console.log("atualizou")
        }

    return(
        <button className="botao-nova" onClick={abrirModal}>
            <FaPlus/>
            Nova
        </button>
    )
}

export default BotaoNovaPublic