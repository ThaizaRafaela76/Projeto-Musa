import { collection, getDocs, addDoc, query, where, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore"
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
        if (artistaSnapshot.empty) {
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

    async editarPublicacao(id, uid, dadosAtualizados) {
        const docRef = doc(db, COLECAO, id)
        const snapshot = await getDocs(query(collection(db, COLECAO), where("uid", "==", uid)))

        const pertenceArtista = snapshot.docs.some(d => d.id === id)
        if (!pertenceArtista) {
            throw new Error("Você não tem permissão para deletar essa publicação")
        }

        await updateDoc(docRef, dadosAtualizados)
        return { id, ...dadosAtualizados }
    }

    async deletarPublicacao(id, uid) {
        const docRef = doc(db, COLECAO, id)
        const snapshot = await getDocs(query(collection(db, COLECAO), where("uid", "==", uid)))

        const pertenceArtista = snapshot.docs.some(d => d.id === id)
        if (!pertenceArtista) {
            throw new Error("Você não tem permissão para deletar essa publicação")
        }

        await deleteDoc(docRef)
        return { mensagem: "Publicação deletada com sucesso" }
    }

    async deletarPublicacaoAdmin(id) {
        const docRef = doc(db, COLECAO, id)
        await deleteDoc(docRef)
        return { mensagem: "Publicação deletada com sucesso" }
    }

    async buscarPorUid(uid) {
        const snapshot = await getDocs(
            query(collection(db, COLECAO), where("uid", "==", uid))
        )
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    async buscarPorId(id) {
        const docRef = doc(db, COLECAO, id)
        const snapshot = await getDoc(docRef)

        if (!snapshot.exists()) {
            throw new Error("Publicação não encontrada")
        }

        return { id: snapshot.id, ...snapshot.data() }
    }
}

export default PublicacaoRepository