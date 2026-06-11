class PublicacaoModel {
    constructor(id, nomeObra, artistaObra, descricaoObra, categoriaObra, imagemObra) {
        this.id = id
        this.nomeObra = nomeObra
        this.artistaObra = artistaObra
        this.descricaoObra = descricaoObra
        this.categoriaObra = categoriaObra
        this.imagemObra = imagemObra

        this.dataDeCriacao = new Date()
    }
}

export default PublicacaoModel