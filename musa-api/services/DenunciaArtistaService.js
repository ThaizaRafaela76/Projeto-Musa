import DenunciaArtistaRepository from "../repositories/DenunciaArtistaRepository.js"
import ArtistaService from "./ArtistaService.js"
class DenunciaArtistaService {
    constructor() {
        this.denunciaArtistaRepository = new DenunciaArtistaRepository()
    }

    async buscarTodos() {
        const todos = await this.denunciaArtistaRepository.buscarTodos() 
        const denuncia_artistas = await Promise.all(
            todos.map(async (p)=>{
                p.artista = await ArtistaService.buscarPorUid(p.artistaUid)
                console.log("artista:", p.artista)
                return p
            })
        )
        return denuncia_artistas
    }

    async buscarPorArtista(artistaUid) {
        return await this.denunciaArtistaRepository.buscarPorArtista(artistaUid)
    }

    async criarDenuncia(artistaUid, motivos, descricao) {
        // Valida se pelo menos um motivo foi selecionado ou uma descrição foi escrita
        if ((!motivos || motivos.length === 0) && (!descricao || descricao.trim() === "")) {
            throw new Error("Informe pelo menos um motivo ou uma descrição para a denúncia")
        }

        // Valida o tamanho máximo da descrição
        if (descricao && descricao.length > 250) {
            throw new Error("A descrição não pode ter mais de 250 caracteres")
        }

        return await this.denunciaArtistaRepository.criarDenuncia(
            artistaUid,
            motivos || [],
            descricao || ""
        )
    }

    async deletarDenuncia(id) {
        return await this.denunciaArtistaRepository.deletarDenuncia(id)
    }
}

export default new DenunciaArtistaService()