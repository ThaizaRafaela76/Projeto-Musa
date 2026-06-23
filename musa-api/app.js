// Importa o framework Express para criar o servidor "localhost"
import express from "express"

// Importa o CORS - permite que o frontend (ex: React, Vue) faça requisições para o backend. Permite que façam requisições ente si
// já que cada um estará em portas diferentes. 
import cors from "cors"

// Importa as rotas de Artistas
import artistaRouter from "./routers/ArtistaRouter.js"

// Importa as rotas de Publicações
import publicacaoRouter from "./routers/PublicacaoRouter.js"

// Importa o módulo 'path' para trabalhar com caminhos de pastas/arquivos
import path from "path"

// Importa função para converter URL de módulo em caminho (necessário em projetos com ES Modules)
import { fileURLToPath } from 'url'


// Converte o caminho do arquivo atual (__filename) para formato que o Node.js entende
const __filename = fileURLToPath(import.meta.url);

// Pega o diretório (pasta) onde este arquivo server.js está localizado
const __dirname = path.dirname(__filename);


// Cria a aplicação principal do Express
const app = express()

// Define a porta onde o servidor vai rodar
const PORT = 3000


// ======================= MIDDLEWARES GLOBAIS =======================

// Ativa o CORS: permite que o frontend acesse a API sem bloqueio de origem cruzada
app.use(cors())

// Permite que o Express entenda requisições com JSON no corpo (req.body)
app.use(express.json())

// Configura pasta estática para servir imagens
// Qualquer arquivo dentro de 'public/uploads' poderá ser acessado via URL
// Exemplo: http://localhost:3000/uploads/fotoPerfil/imagem.jpg
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))


// ======================= ROTAS =======================

// Todas as rotas que começam com "/artistas" serão tratadas pelo artistaRouter
app.use("/artistas", artistaRouter)

// Todas as rotas que começam com "/publicacoes" serão tratadas pelo publicacaoRouter
app.use("/publicacoes", publicacaoRouter)


// ======================= INICIAR O SERVIDOR =======================

// Inicia o servidor na porta 3000
app.listen(PORT, () => {
    // Mensagem no terminal quando o servidor inicia com sucesso
    console.log(`API rodando em http://localhost:${PORT}`)
    
    // Mensagem informativa para mostrar onde as imagens ficam disponíveis
    console.log(`Imagens disponíveis em: http://localhost:${PORT}/uploads`)
})