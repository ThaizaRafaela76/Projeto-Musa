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

export async function atualizarPerfil(dados) {
    console.log(baseURL)
    const foto = dados.fotoPerfil.replace(baseURL, "")
    dados.fotoPerfil = foto
    console.log("dados: ", dados)
    const response = await api.put("/artistas/perfil", dados)
    return response.data
}

export async function buscarArtistaPorId(uid) {
    const response = await api.get(`/artistas/${uid}`)
    return response.data
}

export async function atualizarFotoPerfil(imagemFile) {
    const formData = new FormData()
    formData.append("fotoPerfil", imagemFile)

    const response = await api.patch("/artistas/foto-perfil", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return response.data
}
