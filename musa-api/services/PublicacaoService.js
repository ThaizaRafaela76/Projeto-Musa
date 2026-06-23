// services/PublicacaoService.js

// Importa o repositório responsável por conversar diretamente com o banco de dados
import PublicacaoRepository from "../repositories/PublicacaoRepository.js"

// Importa a função que prepara o caminho das imagens salvas no servidor
import uploadImagemLocal from "./uploadLocalService.js"


// Cria a classe de Serviço para publicações
class PublicacaoService {

    // Construtor: roda automaticamente quando o serviço é criado
    constructor() {
        // Cria uma instância do PublicacaoRepository para usar suas funções
        this.publicacaoRepository = new PublicacaoRepository()
    }


    // Função para buscar TODAS as publicações
    async buscarTodos() {
        // Simplesmente repassa a chamada para o repositório e retorna o resultado
        return await this.publicacaoRepository.buscarTodos()
    }


    // Função para criar uma nova publicação
    async criarPublic(uid, nomeObra, descricaoObra, categoriaObra, imagemObraFile) {
        
        // Faz o upload da imagem da obra e pega o caminho correto (ex: /uploads/publicacoes/foto.jpg)
        const imagemObraUrl = await uploadImagemLocal(imagemObraFile, "publicacoes")

        // Chama o repositório passando os dados + o caminho da imagem já processado
        const novaPublicacao = await this.publicacaoRepository.criarPublic(
            uid,
            nomeObra,
            descricaoObra,
            categoriaObra,
            imagemObraUrl
        )

        // Retorna a publicação recém-criada
        return novaPublicacao
    }


    // Função para deletar uma publicação
    async deletarPublicacao(id, uid) {
        // Repassa a chamada para o repositório (que faz a verificação de segurança)
        return await this.publicacaoRepository.deletarPublicacao(id, uid)
    }
}

// Exporta uma instância única do serviço (padrão Singleton)
// Assim, sempre que alguém importar, usa o mesmo objeto em todo o projeto
export default new PublicacaoService()