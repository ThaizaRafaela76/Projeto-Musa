import DenunciaObraRepository from "../repositories/DenunciaObraRepository.js"
import PublicacaoService from "./PublicacaoService.js"
class DenunciaObraService {
    constructor() {
        this.denunciaObraRepository = new DenunciaObraRepository()
    }

    async buscarTodos() {
        const todas = await this.denunciaObraRepository.buscarTodos()
        const denuncia_obras = await Promise.all(
            todas.map(async (p)=>{
                p.obra = await PublicacaoService.buscarPorId(p.obraId) || {}
                return p
            })
        )
        return denuncia_obras
    }

    async buscarPorObra(obraId) {
        return await this.denunciaObraRepository.buscarPorObra(obraId)
    }

    async criarDenuncia(obraId, motivos, descricao) {
        // Valida se pelo menos um motivo foi selecionado ou uma descrição foi escrita
        if ((!motivos || motivos.length === 0) && (!descricao || descricao.trim() === "")) {
            throw new Error("Informe pelo menos um motivo ou uma descrição para a denúncia")
        }

        // Valida o tamanho máximo da descrição
        if (descricao && descricao.length > 250) {
            throw new Error("A descrição não pode ter mais de 250 caracteres")
        }

        return await this.denunciaObraRepository.criarDenuncia(
            obraId,
            motivos || [],
            descricao || ""
        )
    }

    async deletarDenuncia(id) {
        return await this.denunciaObraRepository.deletarDenuncia(id)
    }
}

export default new DenunciaObraService()