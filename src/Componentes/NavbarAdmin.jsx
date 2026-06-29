import { Link, useNavigate } from "react-router-dom"
import { VscAccount } from "react-icons/vsc"
import "../Styles/Navbar.css"
import logo from '../assets/logo_musa2.png'

import ModalSair from "./ModalSair"

import { useState } from "react"

function Navbar() {

    const [menuAberto, setMenuAberto] = useState(false)
    const [mostrarModal, setMostrarModal] = useState(false)

    function alterarMenu() {
        setMenuAberto(!menuAberto);
    }

    let menuDropdown = null

    if (menuAberto === true) {
        menuDropdown = (
            <div>
                <div className="triangulo"></div>
                <div className="dropdown">
                    <Link to="/admin/denuncias" className="dropdown-conta">Minha conta</Link>
                    <button className="dropdown-sair" onClick={() => {
                        setMostrarModal(true)
                        setMenuAberto(false) 
                    }}>
                        Sair
                    </button>
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
        <>
        <nav className="nav">
            <Link to="/" className="logo">
                <img src={logo} alt="id do projeto" />
            </Link>
            <div className="links">
                <Link to="/admin/acervo">Acervo</Link>
                <Link to="/admin/artistas">Artistas</Link>

                <div className="usuario">
                    <button onClick={alterarMenu}><VscAccount /></button>

                    {menuDropdown}
                </div>
            </div>
        </nav>
            {mostrarModal && ( 
                <ModalSair onFechar={() => setMostrarModal(false)} />
            )}
        </>
    )
}

export default Navbar