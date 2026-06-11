import express from "express"
import cors from "cors"
import artistaRouter from "./routers/ArtistaRouter.js"
import publicacaoRouter from "./routers/PublicacaoRouter.js"

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use("/artistas", artistaRouter)
app.use("/publicacoes", publicacaoRouter)

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`)
})