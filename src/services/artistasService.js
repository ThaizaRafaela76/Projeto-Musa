import api from "./api";
import { baseURL } from "./api";
export async function cadastrarArtista(formData) {
    const response = await api.post("/artistas/cadastro", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}
export async function buscarPerfil() {
    const response = await api.get("/artistas/perfil")
    return response.data
}

export async function buscarTodosArtistas() {
    const response = await api.get("/artistas")
    return response.data
}

export async function buscarArtistaPorId(uid) {
    const response = await api.get(`/artistas/${uid}`)
    return response.data
}
