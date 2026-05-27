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
    bio: "Sou artista visual interessada nos limiares entre matéria e memória. Faço trabalhos com tinta a óleo e tecidos descartados. Também sou apaixonada por colagens e ando me arriscando na produção de xilogravura. Amo bichinhos e flores, e sempre dou um jeito de representá-los na minha arte de alguma forma.",
    redeSocial: "@beaslva.arts",
    contato: "beatrizsilva@gmail.com"
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