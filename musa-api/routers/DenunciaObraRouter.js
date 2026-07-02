import express from "express"
import denunciaObraService from "../services/DenunciaObraService.js"
import { verificarToken } from "../middleware/authMiddleware.js"

const router = express.Router()

// Buscar todas as denúncias de obras — só admin
router.get("/", verificarToken, async (request, response) => {
    try {
        const denuncias = await denunciaObraService.buscarTodos()
        response.json(denuncias)
    } catch (error) {
        console.error(error)
        response.status(400).json({ erro: error.message })
    }
})

// Buscar todas as denúncias de uma obra específica — só admin
router.get("/:obraId", verificarToken, async (request, response) => {
    try {
        const { obraId } = request.params
        const denuncias = await denunciaObraService.buscarPorObra(obraId)
        response.json(denuncias)
    } catch (error) {
        console.error(error)
        response.status(400).json({ erro: error.message })
    }
})

// Criar uma denúncia de obra — qualquer usuário logado pode denunciar
router.post("/", async (request, response) => {
    try {
        const { obraId, motivos, descricao } = request.body

        const novaDenuncia = await denunciaObraService.criarDenuncia(
            obraId,
            motivos,
            descricao
        )

        response.status(201).json(novaDenuncia)
    } catch (error) {
        console.error(error)
        response.status(400).json({ erro: error.message })
    }
})

// Deletar uma denúncia de obra — só admin
router.delete("/:id", verificarToken, async (request, response) => {
    try {
        const { id } = request.params
        const resultado = await denunciaObraService.deletarDenuncia(id)
        response.json(resultado)
    } catch (error) {
        console.error(error)
        response.status(400).json({ erro: error.message })
    }
})

export default router