import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { buscarPerfil } from "./services/artistasService"

import Home from "./Pages/Home";
import HomeVisitante from "./Pages/Visitante/HomeVisitante";

import Acervo from "./Pages/Acervo";
import Artista from "./Pages/Artistas";
import Perfil from "./Pages/Perfil";
import PerfilVisitante from "./Pages/PerfilVisitante"
import Login from "./Pages/Login";
import AcervoVisitante from "./Pages/AcervoVisitante";
import FazerCadastro from "./Pages/FazerCadastro"

import PerfilAdmin from "./Pages/PerfilAdmin";
import AcervoAdmin from "./Pages/AcervoAdmin"
import ArtistasAdmin from "./Pages/ArtistasAdmin";

function App() {
  const [usuario, setUsuario] = useState(undefined);
  const [artista, setArtista] = useState(null)
 
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUsuario(user);
  //   });

  //   return () => unsubscribe();
  // }, []);
  const carregarPerfil = useCallback(async () => {
    if (!usuario) return
    try {
      const dados = await buscarPerfil()
      setArtista(dados)
    } catch (error) {
      console.error("Erro ao carregar perfil:", error)
      setArtista(null)
    }
  }, [usuario])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user)
      if (user) {
        const token = await user.getIdToken()
        localStorage.setItem("token", token)
        localStorage.setItem("uid", user.uid)
        carregarPerfil();
      } else {
        localStorage.removeItem("token")
        localStorage.removeItem("uid")
        setArtista(null);
      }
    });

    return () => unsubscribe()
  }, [carregarPerfil])

  const atualizarPerfilNoApp = (novosDados) => {
    setArtista(novosDados)
  }

  if (usuario === undefined) {
    return <h1>Carregando...</h1>;
  }

  return (
    <Router>
      <Routes>

        {/* Home dinâmica */}
        <Route
          path="/"
          // element={usuario ? <Home /> : <HomeVisitante />}
          element={<Home usuario={usuario} />}
        />

        <Route path="/login" element={usuario ? <Navigate to="/" /> : <Login />} />

        <Route path="/cadastro" element={<FazerCadastro />} />

        {/* <Route path="/acervo" element={usuario ? <Acervo  usuario={usuario}/> : <AcervoVisitante />} /> */}
        <Route path="/acervo" element={<Acervo  usuario={usuario}/>} />

        <Route path="/artistas" element={<Artista usuario={usuario}/>} />

        <Route
          path="/minhaconta"
          element={usuario ? <Perfil artista={artista} onPerfilAtualizado={atualizarPerfilNoApp} /> : <Navigate to="/login" />}
        />

        <Route
          path="/perfil/:uid"
          element={<PerfilVisitante usuario={usuario} />}
        />
        <Route path="/admin/denuncias" element={<PerfilAdmin />} />
        <Route path="/admin/acervo" element={<AcervoAdmin />} />
        <Route path="/admin/artistas" element= {<ArtistasAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;