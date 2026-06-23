// Importa a biblioteca Axios, que é usada para fazer requisições HTTP (chamadas para o backend)
import axios from "axios";

// Define o endereço base do backend (servidor local)
// Todas as requisições vão começar com esse endereço
export const baseURL = "http://localhost:3000";


// Cria uma instância personalizada do Axios
// Em vez de usar axios direto, usamos "api" para ter configurações padrão
const api = axios.create({
    baseURL: baseURL     // Define que todas as requisições vão usar esse endereço base
});


// ======================= INTERCEPTOR (INTERCEPTADOR) =======================

// Interceptador de requisição:
// Executa automaticamente ANTES de toda requisição ser enviada para o servidor
api.interceptors.request.use((config) => {

    // Pega o token de autenticação que foi salvo no localStorage durante o login
    const token = localStorage.getItem("token");

    // Se existir um token...
    if (token) {
        // Adiciona o token no cabeçalho da requisição
        // Isso permite que o backend saiba quem está fazendo a requisição
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Retorna a configuração atualizada para que a requisição continue
    return config;
});


// Exporta a instância configurada do Axios para ser usada em outros arquivos
export default api;