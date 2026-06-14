import { adminAuth } from "../firebase.js"

export async function verificarToken(request, response, next) {
    const token = request.headers.authorization?.split("Bearer ")[1]

    if (!token) {
        return response.status(401).json({ erro: "Token não fornecido" })
    }

    try {
        const decodedToken = await adminAuth.verifyIdToken(token)
        request.uid = decodedToken.uid
        next()
    } catch (error) {
        return response.status(401).json({ erro: "Token inválido" })
    }
}