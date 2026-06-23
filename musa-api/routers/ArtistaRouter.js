// Linha: Importa o framework Express e os tipos request e response
import express, { request, response } from "express"

// Linha: Importa o serviço de artistas (onde fica a lógica principal)
import artistaService from "../services/ArtistaService.js"

// Linha: Importa o middleware que verifica se o usuário está autenticado
import { verificarToken } from "../middleware/authMiddleware.js"

// Linha: Importa o middleware de upload de arquivos (Multer configurado)
import { upload } from "../middleware/uploadMiddleware.js"


// Linha: Cria um objeto router do Express. 
// Esse router vai agrupar todas as rotas relacionadas a "artistas".
const router = express.Router()


// =============================================
// ROTA 1 - Buscar todos os artistas
// =============================================

// Linha: Define uma rota GET para o caminho "/" (raiz do router)
router.get("/", async(request, response) => {

// Linha: Chama o método buscarTodos() do service e espera o resultado
    const artistas = await artistaService.buscarTodos()
    
// Linha: Envia a resposta em formato JSON para quem fez a requisição
    response.json(artistas)
})


// =============================================
// ROTA 2 - Cadastro de novo artista
// =============================================

// Linha: Define uma rota POST para o caminho "/cadastro"
router.post("/cadastro", 

    // Linha: Aplica o middleware de upload antes de executar a função
    // Permite enviar múltiplos arquivos (fotoPerfil e imagemTrabalho)
    upload.fields([
        { name: "fotoPerfil", maxCount: 1 },     // máximo 1 foto de perfil
        { name: "imagemTrabalho", maxCount: 1 }  // máximo 1 imagem de trabalho
    ]), 
    
    // Linha: Função assíncrona que trata a requisição
    async(request, response) => {
        try {

// Linha: Desestrutura o corpo da requisição, pegando apenas os campos necessários
            const { nomeCompleto, email, nomeUsuario, senha, localizacao, 
                    linkPortfolio, linkInstagram, descricao, areaAtuacao } = request.body

// Linha: Pega o primeiro arquivo enviado no campo "fotoPerfil" (se existir)
            const fotoPerfilFile = request.files?.fotoPerfil?.[0]
            
// Linha: Pega o primeiro arquivo enviado no campo "imagemTrabalho" (se existir)
            const imagemTrabalhoFile = request.files?.imagemTrabalho?.[0]

            // Linha: Chama o service para criar o artista, passando todos os dados
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
                fotoPerfil: fotoPerfilFile,      // arquivo físico
                imagemTrabalho: imagemTrabalhoFile
            })

            // Linha: Retorna status 201 (recurso criado com sucesso) + os dados
            response.status(201).json(novaArtista)
        } catch (error) {
            // Linha: Mostra o erro completo no terminal do servidor (para debug)
            console.error(error)
            
            // Linha: Retorna status 400 (erro do cliente) com a mensagem do erro
            response.status(400).json({ erro: error.message })
        }
    }
)


// =============================================
// ROTA 3 - Login
// =============================================

// Linha: Define uma rota POST para o caminho "/login"
router.post("/login", async (request, response)=>{

    try{
        // Linha: Desestrutura email e senha do corpo da requisição
        const {email, senha} = request.body
        
        // Linha: Chama o service de login
        const resultado = await artistaService.login(email, senha)
        
        // Linha: Retorna o resultado (token + uid) em JSON
        response.json(resultado)
    } catch (error){
        // Linha: Em caso de falha (credenciais erradas), retorna status 401
        response.status(401).json({erro: "Email ou senha inválidos"})
    }
})


// =============================================
// ROTA 4 - Buscar perfil do usuário logado
// =============================================

// Linha: Define uma rota GET para "/perfil" e aplica o middleware de autenticação
router.get("/perfil", verificarToken, async(request, response) => {
    try {
        // Linha: Usa o uid que foi injetado pelo middleware verificarToken
        const artista = await artistaService.buscarPorUid(request.uid)
        
        // Linha: Retorna os dados do artista
        response.json(artista)
    } catch (error) {
        // Linha: Caso não encontre, retorna erro 404
        response.status(404).json({erro: "Artista não encontrado"})
    }
})


// =============================================
// ROTA 5 - Buscar artista por UID (pública)
// =============================================

// Linha: Define uma rota GET com parâmetro dinâmico ":uid"
router.get("/:uid", async (request, response) => {
    try {
        // Linha: Pega o valor do parâmetro uid que veio na URL
        const artista = await artistaService.buscarPorUid(request.params.uid)
        
        // Linha: Retorna os dados do artista
        response.json(artista)
    } catch(error) {
        // Linha: Em caso de erro, retorna status 400
        response.status(400).json({erro: "Artista não encontrada"})
    }
})


// Linha: Exporta o router para ser usado em outros arquivos (geralmente no app principal)
export default router