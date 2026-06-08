import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Acervo from "./Pages/Acervo";
import Artista from "./Pages/Artistas";
import Perfil from "./Pages/Perfil";
import Login from "./Pages/Login";

function App() {
  const artistaInfo = {
    foto: "https://i.pinimg.com/736x/20/70/4c/20704c0d36e53ee8ff255a02dffc3fd0.jpg",
    nome: "Beatriz Silva",
    username: "@beaslva",
    cidade: "Quixadá",
    portfolio: "www.beaslva.com.br",
    bio: "Sou artista visual interessada nos limiares entre matéria e memória...",
    contato: "beaslva@gmail.com",
    redeSocial: "@beaslva.arts"
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/acervo" element={<Acervo />} />
        <Route path="/artistas" element={<Artista />} />
        <Route
          path="/minhaconta"
          element={<Perfil artista={artistaInfo} />}
        />
      </Routes>
    </Router>
  );
}

export default App;