import api from "./api";
import { buscarPublicacaoPorId } from "./publicacaoService";
// Criar uma denúncia de obra
export async function criarDenunciaObra(obraId, motivos, descricao) {
    const response = await api.post("/denuncias-obras", {
        obraId,
        motivos,
        descricao
    })
    return response.data
}

// Buscar todas as denúncias de obras — uso admin
export async function buscarTodasDenunciasObra() {
    const response = await api.get("/denuncias-obras")
    const denuncias = response.data
    // const denuncia_obras = await Promise.all(
    //     denuncias.map(async (d) => {
    //         d.obra = await buscarPublicacaoPorId(d.obraId)
    //         return d
    //     })
    // )
    return denuncias
}

// Buscar denúncias de uma obra específica — uso admin
export async function buscarDenunciasPorObra(obraId) {
    const response = await api.get(`/denuncias-obras/${obraId}`)
    return response.data
}

// Deletar uma denúncia de obra — uso admin
export async function deletarDenunciaObra(id) {
    const response = await api.delete(`/denuncias-obras/${id}`)
    return response.data
}