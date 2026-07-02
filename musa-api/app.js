import express from "express"
import cors from "cors"
import artistaRouter from "./routers/ArtistaRouter.js"
import publicacaoRouter from "./routers/PublicacaoRouter.js"
import denunciaArtistaRouter from "./routers/DenunciaArtistaRouter.js"
import denunciaObraRouter from "./routers/DenunciaObraRouter.js"
import path from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))
app.use("/artistas", artistaRouter)
app.use("/publicacoes", publicacaoRouter)
app.use("/denuncias-artistas", denunciaArtistaRouter)
app.use("/denuncias-obras", denunciaObraRouter)

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`)
    console.log(`Imagens disponíveis em: http://localhost:${PORT}/uploads`)
})

process.on("unhandledRejection", (reason) => {
    console.error("🔴 Unhandled Rejection:", reason)
})

process.on("uncaughtException", (error) => {
    console.error("🔴 Uncaught Exception:", error)
})