import ArtistaRepository from "../repositories/ArtistaRepository.js"

class ArtistaService {
    constructor() {
        this.artistaRepository = new ArtistaRepository()
    }

    async buscarTodos() {
        const artistas = await this.artistaRepository.buscarTodos()
        return artistas
    }

    async criarArtista(nomeCompleto, email, nomeUsuario, senha, localizacao, linkPortfolio, linkInstagram, descricao, fotoPerfil,  areaAtuacao, imagemTrabalho) {
        const novaArtista = await this.artistaRepository.criarArtista(
            nomeCompleto, 
            email, 
            nomeUsuario, 
            senha, 
            localizacao, 
            linkPortfolio, 
            linkInstagram, 
            descricao, 
            fotoPerfil,  
            areaAtuacao, 
            imagemTrabalho
        )
        return novaArtista
    }
}

export default new ArtistaService()