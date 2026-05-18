import { useState } from 'react'
import './App.css'
import Rodape from './Componentes/Rodape'
//import Perfil from './Pages/Perfil'

function App() {
  
   /* const artista = {
    nome: "Nina Sousa",
    portfolio: "www.ninasousa.com.br",
    bio: "Sou artista visual interessada nos limiares entre memória e matéria. Trabalho com pigmentos naturais, tecidos descartados e tinta a óleo para criar obras que oscilam entre o íntimo e o coletivo. Sou artista visual interessada nos limiares entre memória e matéria. Sou artista visual de matéria e mem.",
    username: "@ninasousa",
    contato: "ninasousa@gmail.com",
    cidade: "Quixadá",
    foto: "https://i.pinimg.com/736x/6b/db/58/6bdb58edfc0e529db72cd5066047aca7.jpg"
  } */

  return (
    <>
      <Perfil artista={artista} />
    </>
  )
}

export default App