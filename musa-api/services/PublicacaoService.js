// services/PublicacaoService.js
import PublicacaoRepository from "../repositories/PublicacaoRepository.js"
import uploadImagemLocal from "./uploadLocalService.js"

class PublicacaoService {
    constructor() {
        this.publicacaoRepository = new PublicacaoRepository()
    }

    async buscarTodos() {
        return await this.publicacaoRepository.buscarTodos()
    }

    async criarPublic(uid, nomeObra, descricaoObra, categoriaObra, imagemObraFile) {
        const imagemObraUrl = await uploadImagemLocal(imagemObraFile, "publicacoes")

        const novaPublicacao = await this.publicacaoRepository.criarPublic(
            uid,
            nomeObra,
            descricaoObra,
            categoriaObra,
            imagemObraUrl
        )

        return novaPublicacao
    }

    async deletarPublicacao(id, uid) {
        return await this.publicacaoRepository.deletarPublicacao(id, uid)
    }

    async deletarPublicacaoAdmin(id) {
        return await this.publicacaoRepository.deletarPublicacaoAdmin(id)
    }
}

export default new PublicacaoService()