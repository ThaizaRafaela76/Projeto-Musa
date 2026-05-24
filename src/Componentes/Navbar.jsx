import { VscAccount } from "react-icons/vsc"
import "../Styles/Navbar.css"
import logo from '../assets/logo_musa2.png'

import { useState } from "react"

function Navbar() {

    const [menuAberto, setMenuAberto] = useState(false)

    function alterarMenu() {
        setMenuAberto(!menuAberto);
    }

    let menuDropdown = null

    if(menuAberto === true) {
        menuDropdown = (
            <div>
                <div className="triangulo"></div>
                <div className="dropdown">
                    <a href="/conta">Minha conta</a>
                    <a href="/sair">Sair</a>
                </div>
            </div>
        );
    } else {
        menuDropdown = null;
    }

    return (
        <div>
            <nav className="nav">
                <a href="/" className="logo">
                    <img src={logo} alt="id do projeto"/>
                </a>
                <div className="links">
                    <a href="/sobre">Sobre</a>
                    <a href="/acervo">Acervo</a>
                    <a href="/artista">Artistas</a>

                <div className="usuario">
                    <button onClick={alterarMenu}>
                        <VscAccount/>
                    </button>

                    {menuDropdown}
                </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar