import express from "express"
import denunciaArtistaService from "../services/DenunciaArtistaService.js"
import { verificarToken } from "../middleware/authMiddleware.js"

const router = express.Router()

// Buscar todas as denúncias — só admin deve acessar
router.get("/", verificarToken, async (request, response) => {
    try {
        const denuncias = await denunciaArtistaService.buscarTodos()
        response.json(denuncias)
    } catch (error) {
        console.error(error)
        response.status(400).json({ erro: error.message })
    }
})

// Buscar todas as denúncias de um artista específico — só admin
router.get("/:artistaUid", verificarToken, async (request, response) => {
    try {
        const { artistaUid } = request.params
        const denuncias = await denunciaArtistaService.buscarPorArtista(artistaUid)
        response.json(denuncias)
    } catch (error) {
        console.error(error)
        response.status(400).json({ erro: error.message })
    }
})

// Criar uma denúncia — qualquer usuário logado pode denunciar
router.post("/", async (request, response) => {
    try {
        const { artistaUid, motivos, descricao } = request.body


        const novaDenuncia = await denunciaArtistaService.criarDenuncia(
            artistaUid,
            motivos,
            descricao
        )

        response.status(201).json(novaDenuncia)
    } catch (error) {
        console.error(error)
        response.status(400).json({ erro: error.message })
    }
})

// Deletar uma denúncia — só admin
router.delete("/:id", verificarToken, async (request, response) => {
    try {
        const { id } = request.params
        const resultado = await denunciaArtistaService.deletarDenuncia(id)
        response.json(resultado)
    } catch (error) {
        console.error(error)
        response.status(400).json({ erro: error.message })
    }
})

export default router