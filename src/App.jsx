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
      if (user) {
        const token = await user.getIdToken()
        localStorage.setItem("token", token)
        localStorage.setItem("uid", user.uid)

        try {
          const dados = await buscarPerfil()
          user.tipo = dados?.tipo || "comum" // anexa o tipo direto no objeto do Firebase
          setArtista(dados)
          console.log("usuario: ", user)
        } catch (error) {
          console.error("Erro ao carregar perfil:", error)
          user.tipo = "comum" // fallback seguro
          setArtista(null)
        }

        setUsuario(user) // só atualiza o state depois de já ter o tipo
      } else {
        localStorage.removeItem("token")
        localStorage.removeItem("uid")
        setUsuario(null)
        setArtista(null)
      }
    })

    return () => unsubscribe()
  }, [])

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
        <Route path="/acervo" element={usuario && usuario.tipo === "admin" ? <AcervoAdmin /> : <Acervo usuario={usuario} />} />

        <Route path="/artistas" element={usuario && usuario.tipo === "admin" ? <ArtistasAdmin /> : <Artista usuario={usuario} />} />

        <Route
          path="/minhaconta"
          element={usuario ?
            (usuario && usuario.tipo === "admin" ?
              <PerfilAdmin usuario={usuario}/> :
              <Perfil artista={artista} onPerfilAtualizado={atualizarPerfilNoApp} />
            ) :
            <Navigate to="/login" />
          }
        />

        <Route
          path="/perfil/:uid"
          element={ usuario && usuario.tipo === "admin" ? <PerfilAdmin usuario={usuario}/> : <PerfilVisitante usuario={usuario} /> }
        />
        <Route path="/admin/denuncias" element={<PerfilAdmin usuario={usuario}/>} />
        <Route path="/admin/acervo" element={<AcervoAdmin />} />
        <Route path="/admin/artistas" element={<ArtistasAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;