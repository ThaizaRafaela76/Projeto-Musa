import express from "express"
import publicacaoService from "../services/PublicacaoService.js";

const router = express.Router()

router.get("/", async(request, response) => {
    const publicacoes = await publicacaoService.buscarTodos()
    response.json(publicacoes)
})

router.post("/", async(request, response) => {
    const {nomeObra, artistaObra, descricaoObra, categoriaObra, imagemObra} = request.body
    const novaPublicacao = await publicacaoService.criarPublic(
        nomeObra, 
        artistaObra, 
        descricaoObra, 
        categoriaObra, 
        imagemObra
    )
    response.json(novaPublicacao)
})

export default router