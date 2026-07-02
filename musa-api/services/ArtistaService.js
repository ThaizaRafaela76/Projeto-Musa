import ArtistaRepository from "../repositories/ArtistaRepository.js"
import PublicacaoRepository from "../repositories/PublicacaoRepository.js"
import DenunciaObraRepository from "../repositories/DenunciaObraRepository.js"
import DenunciaArtistaRepository from "../repositories/DenunciaArtistaRepository.js"
import uploadImagemLocal from "./uploadLocalService.js"

class ArtistaService {
    constructor() {
        this.artistaRepository = new ArtistaRepository()
        this.publicacaoRepository = new PublicacaoRepository()
        this.denunciaObraRepository = new DenunciaObraRepository()
        this.denunciaArtistaRepository = new DenunciaArtistaRepository()

    }

    async buscarTodos() {
        const artistas = await this.artistaRepository.buscarTodos()
        const artistaMap = artistas.map((item, index) => {
            item.fotoPerfil = `http://localhost:3000${item.fotoPerfil}`
        })
        return artistas
    }

    async buscarPorUid(uid) {
        const artista = await this.artistaRepository.buscarPorUid(uid)
        console.log("artista no service:", artista) // 👈
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

        if (imagemTrabalhoUrl) {
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

    async deletarArtista(uid) {
    try {
        const publicacoesDoArtista = await this.publicacaoRepository.buscarPorUid(uid)

        try {
            await Promise.all(
                publicacoesDoArtista.map(async (p) => {
                    const denunciasObra = await this.denunciaObraRepository.buscarPorObra(p.id)
                    await Promise.all(
                        denunciasObra.map(async (d) => {
                            await this.denunciaObraRepository.deletarDenuncia(d.id)
                        })
                    )
                    await this.publicacaoRepository.deletarPublicacaoAdmin(p.id)
                })
            )
        } catch (error) {
            console.error("Erro ao deletar publicações:", error)
        }

        const denunciasArtista = await this.denunciaArtistaRepository.buscarPorArtista(uid)
        await Promise.all(
            denunciasArtista.map(async (d) => {
                await this.denunciaArtistaRepository.deletarDenuncia(d.id)
            })
        )

        // busca o id do documento e deleta
        const artista = await this.artistaRepository.buscarPorUid(uid)
        return await this.artistaRepository.deletarArtista(artista.id)

    } catch (error) {
        console.error("Erro geral:", error)
        throw new Error("Não foi possível deletar a artista")
    }
}
}

export default new ArtistaService()