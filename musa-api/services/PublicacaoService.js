import PublicacaoRepository from "../repositories/PublicacaoRepository.js"

class PublicacaoService {
    constructor() {
        this.publicacaoRepository = new PublicacaoRepository()
    }

    async buscarTodos() {
        const publicacoes = await this.publicacaoRepository.buscarTodos()
        return publicacoes
    }

    async criarPublic(nomeObra, artistaObra, descricaoObra, categoriaObra, imagemObra) {
        const novaPublicacao = await this.publicacaoRepository.criarPublic(
            nomeObra, 
            artistaObra, 
            descricaoObra, 
            categoriaObra, 
            imagemObra
        )
        return novaPublicacao
    }
}

export default new PublicacaoService()