// Importa a instância configurada do Axios (a "api" que já inclui o token automaticamente)
import api from "./api";


// ======================= FUNÇÕES DE SERVIÇO PARA PUBLICAÇÕES =======================

// Função para buscar todas as publicações do banco
export async function buscarPublicacoes() {

    // Faz uma requisição GET para a rota "/publicacoes"
    const response = await api.get("/publicacoes");

    // Retorna apenas os dados das publicações (sem outras informações da resposta)
    return response.data;
}


// Função para criar uma nova publicação
export async function criarPublicacao(formData) {

    // Faz uma requisição POST enviando formData (porque inclui imagem da obra)
    const response = await api.post("/publicacoes", formData, {
        headers: { 
            "Content-Type": "multipart/form-data"   // Necessário para enviar arquivos (fotos)
        }
    });

    // Retorna os dados da publicação que foi criada
    return response.data;
}


// Função para deletar uma publicação
export async function deletarPublicacao(id, uid) {

    // Faz uma requisição DELETE para a rota com o ID da publicação
    // Exemplo: DELETE /publicacoes/abc123
    
    // Envia o uid no corpo da requisição (o backend usa isso para verificar permissão)
    const response = await api.delete(`/publicacoes/${id}`, { 
        data: { uid } 
    });

    // Retorna a resposta do servidor (geralmente uma mensagem de sucesso)
    return response.data;
}