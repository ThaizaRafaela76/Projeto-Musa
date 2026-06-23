// Importa o adminAuth (ferramenta do Firebase Admin) que consegue verificar tokens de autenticação
import { adminAuth } from "../firebase.js"


// Função Middleware (intermediária) que verifica se o usuário está logado
// Ela será usada nas rotas protegidas do backend
export async function verificarToken(request, response, next) {

    // Pega o token que vem no cabeçalho da requisição
    // Normalmente vem assim: "Bearer abc123xyz..."
    // O ?.split separa só a parte depois de "Bearer "
    const token = request.headers.authorization?.split("Bearer ")[1]

    // Se não encontrou token, retorna erro 401 (Não autorizado)
    if (!token) {
        return response.status(401).json({ erro: "Token não fornecido" })
    }

    try {
        // Verifica se o token é válido usando o Firebase Admin
        // Isso confirma se o usuário realmente está logado e pega os dados dele
        const decodedToken = await adminAuth.verifyIdToken(token)
        
        // Salva o UID (identificador do usuário) dentro da requisição
        // Assim as próximas funções (controllers) conseguem saber quem está fazendo a ação
        request.uid = decodedToken.uid
        
        // Chama a próxima função (continua o fluxo da rota)
        next()
        
    } catch (error) {
        // Se o token for inválido, expirado ou falso, retorna erro 401
        return response.status(401).json({ erro: "Token inválido" })
    }
}