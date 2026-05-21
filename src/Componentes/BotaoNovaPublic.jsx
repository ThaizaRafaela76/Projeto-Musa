import { useState } from "react"
import "../Styles/BotaoNovaPublic.css"
import { FaPlus } from "react-icons/fa6";
import ModalPublic from "./ModalPublic";

function BotaoNovaPublic({onClick}) {

    return(
        <>
        <button className="botao-nova" onClick={onClick}>
            <FaPlus/>
            Nova
        </button>

        </>
    )
}

export default BotaoNovaPublic