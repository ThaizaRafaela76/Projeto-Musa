// services/uploadLocalService.js

// Função responsável por fazer upload de imagens (na verdade, só organiza o caminho)
// Como é "local", ela não envia para a nuvem, só prepara o endereço da imagem
async function uploadImagemLocal(arquivo, pasta) {

    // Verifica se o arquivo foi enviado corretamente e se tem nome
    // Se não tiver, impede que continue e mostra um erro
    if (!arquivo || !arquivo.filename) {
        throw new Error("Arquivo inválido para upload")
    }
    
    // Monta o caminho onde a imagem ficará acessível no site
    // Exemplo: se a pasta for "obras" e o arquivo for "foto.jpg",
    // vai retornar: "/uploads/obras/foto.jpg"
    // Esse caminho é o que será salvo no banco de dados
    return `/uploads/${pasta}/${arquivo.filename}`
}

// Exporta a função para que outros arquivos do projeto possam usar
export default uploadImagemLocal