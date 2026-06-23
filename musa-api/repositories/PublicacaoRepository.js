// Importa as ferramentas necessárias do Firebase Firestore para trabalhar com o banco de dados
import { collection, getDocs, addDoc, query, where, doc, deleteDoc } from "firebase/firestore"

// Importa a conexão com o banco de dados Firebase (configurada em outro arquivo)
import { db } from "../firebase.js"


// Define o nome da coleção (pasta) onde as publicações serão guardadas no banco
const COLECAO = "publicacoes"


// Cria a classe que vai ser a "caixa de ferramentas" para gerenciar publicações
class PublicacaoRepository {


    // Função para buscar TODAS as publicações do banco
    async buscarTodos() {
        // Pega todos os documentos da coleção "publicacoes"
        const documentos = await getDocs(collection(db, COLECAO))
        
        // Converte os dados do banco em uma lista de objetos bonitinhos, incluindo o ID de cada publicação
        return documentos.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }


    // Função para criar uma nova publicação
    async criarPublic(uid, nomeObra, descricaoObra, categoriaObra, imagemObra) {
        
        // Busca o artista dono dessa publicação (para pegar o nome completo dele)
        const artistaSnapshot = await getDocs(
            query(collection(db, "artistas"), where("uid", "==", uid))
        )
        
        // Se não encontrar o artista, dá erro
        if (artistaSnapshot.empty){
            throw new Error("Artista não encontrado")
        }

        // Pega os dados do artista encontrado
        const artista = artistaSnapshot.docs[0].data()

        // Monta o objeto com todas as informações da nova publicação
        const novaPublicacao = {
            uid,                          // ID do artista que publicou
            artistaObra: artista.nomeCompleto, // Nome completo do artista
            nomeObra,                     // Título da obra
            descricaoObra,                // Descrição da obra
            categoriaObra,                // Categoria (ex: pintura, fotografia...)
            imagemObra,                   // URL da imagem da obra
            dataDeCriacao: new Date()     // Data e hora atual da publicação
        }

        // Salva a nova publicação no banco de dados
        const docRef = await addDoc(collection(db, COLECAO), novaPublicacao)
        
        // Retorna a publicação criada, incluindo o ID gerado pelo banco
        return { id: docRef.id, ...novaPublicacao }
    }


    // Função para deletar uma publicação
    async deletarPublicacao(id, uid) {
        
        // Cria uma referência para o documento que queremos deletar
        const docRef = doc(db, COLECAO, id)
        
        // Busca todas as publicações desse artista (para verificar se ele é dono da publicação)
        const snapshot = await getDocs(
            query(collection(db, COLECAO), where("uid", "==", uid))
        )

        // Verifica se a publicação que ele quer deletar realmente pertence a ele
        const pertenceArtista = snapshot.docs.some(d => d.id === id)
        
        // Se não pertencer, bloqueia a exclusão e dá erro
        if(!pertenceArtista) {
            throw new Error("Você não tem permissão para deletar essa publicação")
        }

        // Se tudo estiver certo, deleta a publicação do banco
        await deleteDoc(docRef)
        
        // Retorna uma mensagem de sucesso
        return {mensagem: "Publicação deletada com sucesso"}
    }
}

// Exporta a classe para que outros arquivos possam usar
export default PublicacaoRepository