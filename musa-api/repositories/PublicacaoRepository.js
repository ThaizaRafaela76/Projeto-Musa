import { collection, getDocs, addDoc, query, where } from "firebase/firestore"
import { db } from "../firebase.js"


const COLECAO = "publicacoes"


class PublicacaoRepository {
    async buscarTodos() {
        const snapshot = await getDocs(collection(db, COLECAO))
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    async criarPublic(uid, nomeObra, descricaoObra, categoriaObra, imagemObra) {
        const artistaSnapshot = await getDocs(
            query(collection(db, "artistas"), where("uid", "==", uid))
        )
        if (artistaSnapshot.empty){
            throw new Error("Artista não encontrado")
        }

        const artista = artistaSnapshot.docs[0].data()

        const novaPublicacao = {
            uid,
            artistaObra: artista.nomeCompleto,
            nomeObra,
            descricaoObra,
            categoriaObra,
            imagemObra,
            dataDeCriacao: new Date()
        }

        const docRef = await addDoc(collection(db, COLECAO), novaPublicacao)
        return { id: docRef.id, ...novaPublicacao }
    }
}

export default PublicacaoRepository