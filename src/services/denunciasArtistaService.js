import api from "./api";

// Criar uma denúncia de artista
export async function criarDenunciaArtista(artistaUid, motivos, descricao) {
    const response = await api.post("/denuncias-artistas", {
        artistaUid,
        motivos,
        descricao
    })
    return response.data
}

// Buscar todas as denúncias — uso admin
export async function buscarTodasDenunciasArtista() {
    const response = await api.get("/denuncias-artistas")
    return response.data
}

// Buscar denúncias de um artista específico — uso admin
export async function buscarDenunciasPorArtista(artistaUid) {
    const response = await api.get(`/denuncias-artistas/${artistaUid}`)
    return response.data
}

// Deletar uma denúncia — uso admin
export async function deletarDenunciaArtista(id) {
    const response = await api.delete(`/denuncias-artistas/${id}`)
    return response.data
}