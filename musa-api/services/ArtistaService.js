// Importa o repositório que faz a comunicação direta com o banco de dados
import ArtistaRepository from "../repositories/ArtistaRepository.js"

// Importa a função que prepara o caminho das imagens salvas no servidor
import uploadImagemLocal from "./uploadLocalService.js"


// Cria a classe de Serviço (camada intermediária entre o Controller e o Repository)
class ArtistaService {

    // Construtor: é executado automaticamente quando criamos o serviço
    constructor() {
        // Cria uma instância do ArtistaRepository para poder usar suas funções
        this.artistaRepository = new ArtistaRepository()
    }


    // Função para buscar TODOS os artistas
    async buscarTodos() {
        // Chama o repositório para buscar os artistas no banco
        const artistas = await this.artistaRepository.buscarTodos()
        
        // Para cada artista, adiciona o endereço completo da foto[](http://localhost:3000...)
        // Isso facilita mostrar as imagens no frontend
        const artistaMap = artistas.map((item, index)=>{
            item.fotoPerfil = `http://localhost:3000${item.fotoPerfil}`
        })
        
        // Retorna a lista de artistas com as URLs completas
        return artistas
    }


    // Função para buscar UM artista específico pelo UID
    async buscarPorUid(uid){
        // Busca o artista no repositório
        const artista = await this.artistaRepository.buscarPorUid(uid)
        
        // Adiciona o endereço completo da foto de perfil
        artista.fotoPerfil = `http://localhost:3000${artista.fotoPerfil}`
        
        // Apenas para debug (mostra no terminal o caminho da foto)
        console.log(artista.fotoPerfil)
        
        // Retorna o artista com a URL completa
        return artista
    }


    // Função para criar um novo artista (mais complexa)
    async criarArtista(dados) {
        let fotoPerfilUrl = null      // Começa sem foto
        let imagemTrabalhoUrl = null  // Começa sem imagem de trabalho

        // Se o usuário enviou foto de perfil, faz o upload local e pega o caminho
        if (dados.fotoPerfil) {
            fotoPerfilUrl = await uploadImagemLocal(dados.fotoPerfil, "fotoPerfil")
        }
        
        // Se o usuário enviou imagem de trabalho, faz o upload local
        if (dados.imagemTrabalho) {
            imagemTrabalhoUrl = await uploadImagemLocal(dados.imagemTrabalho, "imagemTrabalho")
        }

        // Chama o repositório passando os dados + as URLs das imagens
        const novaArtista = await this.artistaRepository.criarArtista({
            ...dados,                    // pega todos os dados originais
            fotoPerfil: fotoPerfilUrl,   // substitui pela URL correta
            imagemTrabalho: imagemTrabalhoUrl
        })

        // Retorna o artista criado
        return novaArtista
    }
    

    // Função de login (simples, só repassa para o repositório)
    async login(email, senha) {
        return await this.artistaRepository.login(email, senha)
    }

}

// Exporta uma instância única da classe (padrão Singleton)
// Isso significa que sempre que alguém importar ArtistaService, vai usar o mesmo objeto
export default new ArtistaService()