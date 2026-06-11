import ArtistaModel from "../models/ArtistaModel.js"

const artistas = []

class ArtistaRepository {
    async buscarTodos() {
        return Promise.resolve(artistas)
    }

    async criarArtista(nomeCompleto, email, nomeUsuario, senha, localizacao, linkPortfolio, linkInstagram, descricao, fotoPerfil,  areaAtuacao, imagemTrabalho) {
        const novaArtista = new ArtistaModel(
            artistas.length + 1,
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
        artistas.push(novaArtista)
        return Promise.resolve(novaArtista)
    }
}

export default ArtistaRepository