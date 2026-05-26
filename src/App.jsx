import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './Pages/Home';
import Acervo from './Pages/Acervo';
import Artista from './Pages/Artistas';
import Perfil from './Pages/Perfil';

import fotoPerfil from './assets/fotoperfil.png';


function App() {
  const artistaInfo = {
    foto: fotoPerfil,
    nome: "Beatriz Silva",
    username: "@beaslva",
    cidade: "Quixadá",
    portfolio: "www.beaslva.com.br",
    bio: "Sou artista visual interessada nos limiares entre memória e matéria. Trabalho com pigmentos naturais, tecidos descartados e tinta a óleo para criar obras que oscilam entre o íntimo e o coletivo.",
    contato: "@beaslva.arts"
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