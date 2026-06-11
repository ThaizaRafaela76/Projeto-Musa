class ArtistaModel {
    constructor(id, nomeCompleto, email, nomeUsuario, senha, localizacao, linkPortfolio, linkInstagram, descricao, fotoPerfil,  areaAtuacao, imagemTrabalho) {
        this.id = id
        this.nomeCompleto = nomeCompleto
        this.email = email
        this.nomeUsuario = nomeUsuario
        this.senha = senha
        this.localizacao = localizacao
        this.linkPortfolio = linkPortfolio
        this.linkInstagram = linkInstagram
        this.descricao = descricao
        this.fotoPerfil = fotoPerfil
        this.areaAtuacao = areaAtuacao
        this.imagemTrabalho = imagemTrabalho

        this.dataDeCriacao = new Date()
    }
}

export default ArtistaModel