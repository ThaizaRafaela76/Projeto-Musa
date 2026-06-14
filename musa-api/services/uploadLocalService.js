// services/uploadLocalService.js
async function uploadImagemLocal(arquivo, pasta) {
    if (!arquivo || !arquivo.filename) {
        throw new Error("Arquivo inválido para upload")
    }
    
    // Retorna caminho acessível via URL
    return `/uploads/${pasta}/${arquivo.filename}`
}

export default uploadImagemLocal