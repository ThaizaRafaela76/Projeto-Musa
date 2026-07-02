import { collection, getDocs, addDoc, query, where, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase.js"

const COLECAO = "denuncias_artistas"

class DenunciaArtistaRepository {

    async buscarTodos() {
        const snapshot = await getDocs(collection(db, COLECAO))
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    async buscarPorArtista(artistaUid) {
        const snapshot = await getDocs(
            query(collection(db, COLECAO), where("artistaUid", "==", artistaUid))
        )
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    async criarDenuncia(artistaUid, motivos, descricao) {
        // Verifica se o artista existe antes de registrar a denúncia
        const artistaSnapshot = await getDocs(
            query(collection(db, "artistas"), where("uid", "==", artistaUid))
        )
        if (artistaSnapshot.empty) {
            throw new Error("Artista não encontrado")
        }

        const novaDenuncia = {
            artistaUid,
            motivos,        // array de strings ex: ["Conteúdo ofensivo ou impróprio"]
            descricao,      // texto livre, máx 250 caracteres
            criadoEm: new Date()
        }

        const docRef = await addDoc(collection(db, COLECAO), novaDenuncia)
        return { id: docRef.id, ...novaDenuncia }
    }

    async deletarDenuncia(id) {
        const docRef = doc(db, COLECAO, id)
        await deleteDoc(docRef)
        return { mensagem: "Denúncia deletada com sucesso" }
    }
}

export default DenunciaArtistaRepository