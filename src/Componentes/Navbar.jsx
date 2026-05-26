import { Link, useNavigate } from "react-router-dom"
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

    if (menuAberto === true) {
        menuDropdown = (
            <div>
                <div className="triangulo"></div>
                <div className="dropdown">
                    <Link to="/minhaconta">Minha conta</Link>
                    <a href="/sair">Sair</a>
                </div>
            </div>
        );
    } else {
        menuDropdown = null;
    }

    const navigate = useNavigate()

    function irParaSobre() {
        navigate('/')
        setTimeout(() => {
            document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    return (
        <nav className="nav">
            <Link to="/" className="logo">
                <img src={logo} alt="id do projeto" />
            </Link>
            <div className="links">
                <button onClick={irParaSobre} className="link-sobre">Sobre</button>
                <Link to="/acervo">Acervo</Link>
                <Link to="/artistas">Artistas</Link>

                <div className="usuario">
                    <button onClick={alterarMenu}><VscAccount /></button>

                    {menuDropdown}
                </div>
            </div>
        </nav>
    )
}

export default Navbar