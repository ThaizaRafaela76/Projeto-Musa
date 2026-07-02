import { collection, getDocs, addDoc, query, where, doc, getDoc, deleteDoc } from "firebase/firestore"

import { db } from "../firebase.js"

const COLECAO = "denuncias_obras"

class DenunciaObraRepository {

    async buscarTodos() {
        const snapshot = await getDocs(collection(db, COLECAO))
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    async buscarPorObra(obraId) {
        const snapshot = await getDocs(
            query(collection(db, COLECAO), where("obraId", "==", obraId))
        )
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    async criarDenuncia(obraId, motivos, descricao) {
        // 👇 troca getDocs+query por getDoc+doc direto
        console.log("obraId recebido:", obraId) // 👈 adiciona isso

        const obraRef = doc(db, "publicacoes", obraId)
        const obraSnapshot = await getDoc(obraRef)

        if (!obraSnapshot.exists()) {
            throw new Error("Obra não encontrada")
        }

        const obra = obraSnapshot.data()

        const novaDenuncia = {
            obraId,
            artistaUid: obra.uid,
            motivos,
            descricao,
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

export default DenunciaObraRepository