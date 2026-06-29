import ArtistaRepository from "../repositories/ArtistaRepository.js"
import PublicacaoRepository from "../repositories/PublicacaoRepository.js"
import uploadImagemLocal from "./uploadLocalService.js"

class ArtistaService {
    constructor() {
        this.artistaRepository = new ArtistaRepository()
        this.publicacaoRepository = new PublicacaoRepository()
    }

    async buscarTodos() {
        const artistas = await this.artistaRepository.buscarTodos()
        const artistaMap = artistas.map((item, index)=>{
            item.fotoPerfil = `http://localhost:3000${item.fotoPerfil}`
        })
        return artistas
    }

    async buscarPorUid(uid){
        const artista = await this.artistaRepository.buscarPorUid(uid)
        artista.fotoPerfil = `http://localhost:3000${artista.fotoPerfil}`
        console.log(artista.fotoPerfil)
        return artista
    }

    async criarArtista(dados) {
        let fotoPerfilUrl = null
        let imagemTrabalhoUrl = null

        if (dados.fotoPerfil) {
            fotoPerfilUrl = await uploadImagemLocal(dados.fotoPerfil, "fotoPerfil")
        }
        if (dados.imagemTrabalho) {
            imagemTrabalhoUrl = await uploadImagemLocal(dados.imagemTrabalho, "imagemTrabalho")
        }

        const novaArtista = await this.artistaRepository.criarArtista({
            ...dados,
            fotoPerfil: fotoPerfilUrl,
            imagemTrabalho: imagemTrabalhoUrl
        })

        if(imagemTrabalhoUrl) {
            await this.publicacaoRepository.criarPublic(
                novaArtista.uid,
                dados.nomeObra || "",
                dados.descricaoObra || "",
                dados.areaAtuacao || "",
                imagemTrabalhoUrl
            )
        }

        return novaArtista
    }
    
    async login(email, senha) {
        return await this.artistaRepository.login(email, senha)
    }

    async atualizarArtista(uid, dados) {
        const artista = await this.artistaRepository.atualizarArtista(uid, dados)

        if(dados.nomeCompleto) {
            await this.artistaRepository.atualizarNomeNasPublicacoes(uid, dados.nomeCompleto)
        }

        artista.fotoPerfil = `http://localhost:3000${artista.fotoPerfil}`
        return artista
    }

    async deletarArtista(id) {
        return await this.artistaRepository.deletarArtista(id)
    }
}

export default new ArtistaService()