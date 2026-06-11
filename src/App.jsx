import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Home from "./Pages/Home";
import HomeVisitante from "./Pages/Visitante/HomeVisitante";

import Acervo from "./Pages/Acervo";
import Artista from "./Pages/Artistas";
import Perfil from "./Pages/Perfil";
import PerfilVisitante from "./Pages/PerfilVisitante"
import Login from "./Pages/Login";
import AcervoVisitante from "./Pages/AcervoVisitante";

function App() {
  const [usuario, setUsuario] = useState(undefined);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsubscribe();
  }, []);

  if (usuario === undefined) {
    return <h1>Carregando...</h1>;
  }

  return (
    <Router>
      <Routes>

        {/* Home dinâmica */}
        <Route
          path="/"
          element={usuario ? <Home /> : <HomeVisitante />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/acervo" element={usuario ? <Acervo /> : <AcervoVisitante />} />

        <Route path="/artistas" element={<Artista />} />

        <Route
          path="/minhaconta"
          element={<Perfil artista={artistaInfo} />}
        />

        <Route
          path="/perfil"
          element={<PerfilVisitante artista={artistaInfo} />}
        />

      </Routes>
    </Router>
  );
}

export default App;