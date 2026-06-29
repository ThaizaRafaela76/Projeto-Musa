import express, { request, response } from "express"
import artistaService from "../services/ArtistaService.js"
import { verificarToken } from "../middleware/authMiddleware.js"
import { upload } from "../middleware/uploadMiddleware.js"
import uploadImagemLocal from "../services/uploadLocalService.js"

const router = express.Router()

router.get("/", async(request, response) => {
    const artistas = await artistaService.buscarTodos()
    response.json(artistas)
})

router.post("/cadastro", 
    upload.fields([
        { name: "fotoPerfil", maxCount: 1 },
        { name: "imagemTrabalho", maxCount: 1 }
    ]), 
    async(request, response) => {
        try {
            const { nomeCompleto, email, nomeUsuario, senha, localizacao, 
                    linkPortfolio, linkInstagram, descricao, areaAtuacao, nomeObra } = request.body

            const fotoPerfilFile = request.files?.fotoPerfil?.[0]
            const imagemTrabalhoFile = request.files?.imagemTrabalho?.[0]

            const novaArtista = await artistaService.criarArtista({
                nomeCompleto, 
                email, 
                nomeUsuario, 
                senha, 
                localizacao, 
                linkPortfolio, 
                linkInstagram, 
                descricao, 
                areaAtuacao,
                nomeObra,
                fotoPerfil: fotoPerfilFile,
                imagemTrabalho: imagemTrabalhoFile
            })

            response.status(201).json(novaArtista)
        } catch (error) {
            console.error(error)
            response.status(400).json({ erro: error.message })
        }
    }
)

router.post("/login", async (request, response)=>{
    try{
        const {email, senha} = request.body
        const resultado = await artistaService.login(email, senha)
        response.json(resultado)
    } catch (error){
        response.status(401).json({erro: "Email ou senha inválidos"})
    }
})

router.get("/perfil", verificarToken, async(request, response) => {
    try {
        const artista = await artistaService.buscarPorUid(request.uid)
        response.json(artista)
    } catch (error) {
        response.status(404).json({erro: "Artista não encontrado"})
    }
})

router.put("/perfil", verificarToken, async (request, response) => {
    try {
        const dados = request.body
        const atualizado = await artistaService.atualizarArtista(request.uid, dados)
        response.json(atualizado)
    } catch (error) {
        response.status(400).json({ erro: error.message })
    }
})

router.patch("/foto-perfil",
    verificarToken,
    upload.single("fotoPerfil"),
    async (request, response) => {
        try {
            const fotoPerfilFile = request.file

            if (!fotoPerfilFile) {
                return response.status(400).json({ erro: "Imagem é obrigatória" })
            }

            const fotoPerfilUrl = await uploadImagemLocal(fotoPerfilFile, "fotoPerfil")

            const atualizado = await artistaService.atualizarArtista(request.uid, {
                fotoPerfil: fotoPerfilUrl
            })

            response.json(atualizado)
        } catch (error) {
            console.error(error)
            response.status(400).json({ erro: error.message })
        }
    }
)

// Rota admin — deve ficar antes de /:uid
router.delete("/admin/:id", verificarToken, async(request, response) => {
    try {
        const { id } = request.params
        const resultado = await artistaService.deletarArtista(id)
        response.json(resultado)
    } catch (error) {
        response.status(400).json({ erro: error.message })
    }
})

router.get("/:uid", async (request, response) => {
    try {
        const artista = await artistaService.buscarPorUid(request.params.uid)
        response.json(artista)
    } catch(error) {
        response.status(400).json({erro: "Artista não encontrada"})
    }
})

export default router