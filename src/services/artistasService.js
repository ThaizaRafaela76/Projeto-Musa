// Importa a instância personalizada do Axios (configurada com token automático)
import api from "./api";

// Importa também a constante baseURL (caso precise usar em algum lugar)
import { baseURL } from "./api";


// ======================= FUNÇÕES DE SERVIÇO =======================

// Função responsável por cadastrar um novo artista
export async function cadastrarArtista(formData) {

    // Faz uma requisição POST para a rota de cadastro
    // Envia os dados como formData (porque inclui imagens/fotos)
    const response = await api.post("/artistas/cadastro", formData, {
        headers: { 
            "Content-Type": "multipart/form-data"   // Importante para enviar arquivos (fotos)
        }
    });

    // Retorna apenas os dados da resposta (o artista criado)
    return response.data;
}


// Função para buscar os dados do perfil do usuário que está logado
export async function buscarPerfil() {

    // Faz uma requisição GET para a rota protegida "/artistas/perfil"
    // O token é enviado automaticamente pelo interceptor (do arquivo api.js)
    const response = await api.get("/artistas/perfil");

    // Retorna os dados do perfil
    return response.data;
}


// Função para buscar TODOS os artistas (usada na página de listagem)
export async function buscarTodosArtistas() {

    // Faz uma requisição GET para pegar todos os artistas
    const response = await api.get("/artistas");

    // Retorna a lista de artistas
    return response.data;
}


// Função para buscar um artista específico pelo UID
export async function buscarArtistaPorId(uid) {

    // Faz uma requisição GET passando o UID na URL
    // Exemplo: /artistas/abc123xyz
    const response = await api.get(`/artistas/${uid}`);

    // Retorna os dados daquele artista
    return response.data;
}