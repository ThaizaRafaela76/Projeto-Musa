import express from "express"
import publicacaoService from "../services/PublicacaoService.js"
import { verificarToken } from "../middleware/authMiddleware.js"
import { upload } from "../middleware/uploadMiddleware.js"

const router = express.Router()

router.get("/", async (request, response) => {
    const publicacoes = await publicacaoService.buscarTodos()
    response.json(publicacoes)
})

router.post("/", 
    verificarToken, 
    upload.single("imagemObra"), 
    async (request, response) => {
        try {
            const { nomeObra, descricaoObra, categoriaObra } = request.body
            const imagemObraFile = request.file

            if (!imagemObraFile) {
                return response.status(400).json({ erro: "Imagem da obra é obrigatória" })
            }

            const novaPublicacao = await publicacaoService.criarPublic(
                request.uid,
                nomeObra,
                descricaoObra,
                categoriaObra,
                imagemObraFile
            )

            response.status(201).json(novaPublicacao)
        } catch (error) {
            console.error(error)
            response.status(400).json({ erro: error.message })
        }
    }
)

export default router