import { useState } from 'react';
import './App.css';

//import Rodape from './Componentes/Rodape'
//import Navbar from './Componentes/Navbar'
//import Home from './Pages/Home'
//import CardTemplate from './Componentes/CardTemplate'

//import Rodape from './Componentes/Rodape';
//import Navbar from './Componentes/Navbar';
// import Artistas from './Pages/Artistas';
import Home from './Pages/Home'
// import CardTemplate from './Componentes/CardTemplate';
//import Acervo from './Pages/Acervo';
// // IMPORTANDO A IMAGEM
// import imagemOcula from './assets/ocula.png'
// import BarraPesquisa from './Componentes/BarraPesquisa';
//import Perfil from './Pages/Perfil'

function App() {
   {/* const artista = {
    nome: "Beatriz Silva",
    portfolio: "www.biaportfolio.com.br",
    bio: "Sou artista visual interessada nos limiares entre matéria e memória. Faço trabalhos com tinta a óleo e tecidos descartados. Também sou apaixonada por colagens e ando me arriscando na produção de xilogravura. Amo bichinhos e flores, e sempre dou um jeito de representá-los na minha arte de alguma forma.",
    username: "eubiasilva",
    redeSocial: "@eubiasilva",
    contato: "beatrizsilva@gmail.com",
    cidade: "Quixadá",
    foto: "https://i.pinimg.com/1200x/d9/d9/ef/d9d9ef5bad2003dfcfd654293fc9c33b.jpg"
  } */}

  return (
    <>
      {/* <Perfil artista={artista} /> */}
      {/* <Navbar /> */} 

      {/* <Acervo />*/}

      {/* <Navbar /> */}

      {/* <CardTemplate
        imagem={imagemOcula}
        titulo="OCULA"
        subtitulo="Lygia Pape"
      /> */}

      {/*<Rodape />*/}
      {/* <Acervo /> */}
      {/* <Rodape /> */}
      {/* <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa}></BarraPesquisa>
      <div>
        {pesquisa}
      </div> */}
      <Home /> 
      {/* <Artistas></Artistas> */}
    </>
  )
}

export default App