import express from "express"
import artistaService from "../services/ArtistaService.js"

const router = express.Router()

router.get("/", async(request, response) => {
    const artistas = await artistaService.buscarTodos()
    response.json(artistas)
})

router.post("/", async(request, response) => {
    const {nomeCompleto, email, nomeUsuario, senha, localizacao, linkPortfolio, linkInstagram, descricao, fotoPerfil,  areaAtuacao, imagemTrabalho} = request.body
    const novaArtista = await artistaService.criarArtista(
        nomeCompleto, 
        email, 
        nomeUsuario, 
        senha, 
        localizacao, 
        linkPortfolio, 
        linkInstagram, 
        descricao, 
        fotoPerfil, 
        areaAtuacao, 
        imagemTrabalho
    )
    response.json(novaArtista)
})

export default router