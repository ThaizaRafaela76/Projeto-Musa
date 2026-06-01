import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './Pages/Home'
import Acervo from './Pages/Acervo'
import Artista from './Pages/Artistas'
import Perfil from './Pages/Perfil'


function App() {
  const artistaInfo = {
    foto: "",
    nome: "Nome da Artista",
    username: "@usuario",
    cidade: "Quixadá",
    portfolio: "Portfolio",
    bio: "Bio da artista",
    contato: "contato@email.com"
}
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/acervo' element={<Acervo />} />
        <Route path='/artistas' element={<Artista />} />
        <Route path='/minhaconta' element={<Perfil artista={artistaInfo} />} />
      </Routes>
    </Router>
  )
}

export default App;