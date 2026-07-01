import api from "./api"

export async function buscarPublicacoes() {
    const response = await api.get("/publicacoes")
    return response.data
}

export async function criarPublicacao(formData) {
    const response = await api.post("/publicacoes", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}

export async function editarPublicacao(id, formData) {
    const response = await api.put(`/publicacoes/${id}`, formData, {
        headers: {"Content-Type": "multipart/form-data"}
    })
    return response.data
}

export async function deletarPublicacao(id, uid) {
    const response = await api.delete(`/publicacoes/${id}`, { data: { uid } })
    return response.data
}

export async function deletarPublicacaoAdmin(id) {
    const response = await api.delete(`/publicacoes/admin/${id}`)
    return response.data
}