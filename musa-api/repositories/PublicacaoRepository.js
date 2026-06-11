import PublicacaoModel from "../models/PublicacaoModel.js"

const publicacoes = []

class PublicacaoRepository {
    async buscarTodos() {
        return Promise.resolve(publicacoes)
    }

    async criarPublic(nomeObra, artistaObra, descricaoObra, categoriaObra, imagemObra) {
        const novaPublicacao = new PublicacaoModel(
            publicacoes.lenght + 1,
            nomeObra, 
            artistaObra, 
            descricaoObra, 
            categoriaObra,
            imagemObra
        )
        publicacoes.push(novaPublicacao)
        return Promise.resolve(novaPublicacao)
    }
}

export default PublicacaoRepository