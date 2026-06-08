import { Link, useNavigate } from "react-router-dom"
import { VscAccount } from "react-icons/vsc"
import '../Styles/Visitante/NavbarVisitante.css'
import logo from '../assets/logo_musa2.png'


function Navbar() {

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
                <button onClick={irParaSobre} className="link-sobre">Sobre</button>
                <Link to="/acervo">Acervo</Link>
                <Link to="/artistas">Artistas</Link>

                <div className="entrar">
                    <Link to="/login"><button className="bnt-entrar">Entrar</button></Link>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar