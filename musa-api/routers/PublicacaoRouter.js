// Importa o Express e os objetos request e response para tipagem
import express, { request, response } from "express"

// Importa o Service de Publicações (camada que contém a lógica de negócio)
import publicacaoService from "../services/PublicacaoService.js"

// Importa o middleware responsável por verificar se o usuário está logado
import { verificarToken } from "../middleware/authMiddleware.js"

// Importa o middleware de upload de imagens (configurado com Multer)
import { upload } from "../middleware/uploadMiddleware.js"


// Cria um roteador do Express específico para gerenciar as rotas de publicações
const router = express.Router()


// =============================================
// ROTA 1: Buscar todas as publicações (pública)
// =============================================

// Define uma rota GET no caminho "/" 
// Exemplo de acesso: GET /publicacoes/
router.get("/", async (request, response) => {
    
    // Chama o service para buscar todas as publicações do banco de dados
    const publicacoes = await publicacaoService.buscarTodos()
    
    // Envia as publicações como resposta no formato JSON
    response.json(publicacoes)
})


// =============================================
// ROTA 2: Criar uma nova publicação (protegida)
// =============================================

// Define uma rota POST no caminho "/" 
// Exemplo: POST /publicacoes/
router.post("/", 
    
    // ==================== MIDDLEWARE 1 ====================
    // Middleware de autenticação: verifica se o usuário está logado
    // Papel: Protege a rota. Só permite continuar se tiver um token válido.
    // Se falhar, retorna erro 401 e para a execução.
    verificarToken, 
    
    // ==================== MIDDLEWARE 2 ====================
    // Middleware de upload: recebe e salva a imagem no servidor
    // Papel: Processa o arquivo enviado no campo "imagemObra",
    // salva na pasta correta e coloca o arquivo em request.file
    upload.single("imagemObra"), 
    
    // Função principal que executa depois que os middlewares passarem
    async (request, response) => {
        try {
            
            // Desestrutura os dados enviados no corpo da requisição (formulário)
            const { nomeObra, descricaoObra, categoriaObra } = request.body
            
            // Pega o arquivo de imagem que foi processado pelo middleware de upload
            const imagemObraFile = request.file

            // Validação: verifica se o usuário enviou uma imagem
            // Se não enviou, retorna erro 400 e para a execução
            if (!imagemObraFile) {
                return response.status(400).json({ erro: "Imagem da obra é obrigatória" })
            }

            // Chama o Service passando:
            // - request.uid (veio do middleware verificarToken)
            // - dados da obra
            // - arquivo da imagem
            const novaPublicacao = await publicacaoService.criarPublic(
                request.uid,
                nomeObra,
                descricaoObra,
                categoriaObra,
                imagemObraFile
            )

            // Retorna status 201 (Criado com sucesso) + os dados da publicação
            response.status(201).json(novaPublicacao)
        } catch (error) {
            // Mostra o erro no terminal para facilitar a depuração
            console.error(error)
            
            // Retorna erro 400 com a mensagem do problema ocorrido
            response.status(400).json({ erro: error.message })
        }
    }
)


// =============================================
// ROTA 3: Deletar uma publicação (protegida)
// =============================================

// Define uma rota DELETE com parâmetro dinâmico ":id"
// Exemplo: DELETE /publicacoes/abc123xyz
router.delete("/:id", 
    
    // Middleware de autenticação: obriga o usuário a estar logado
    verificarToken, 
    
    // Função que processa a exclusão
    async(request, response) => {
        try{
            // Pega o ID da publicação que veio na URL
            const { id } = request.params
            
            // Chama o Service para deletar a publicação
            // Passa o ID e o UID do usuário (para verificar permissão)
            const resultado = await publicacaoService.deletarPublicacao(id, request.uid)
            
            // Retorna a mensagem de sucesso
            response.json(resultado)
        }
        catch (error) {
            // Em caso de erro (ex: publicação não existe ou sem permissão)
            response.status(400).json({ erro: error.message })
        }
    }
)


// Exporta o roteador para ser usado no arquivo principal do servidor
export default router