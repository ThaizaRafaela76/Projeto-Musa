import ArtistaModel from "../models/ArtistaModel.js"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { db, auth } from "../firebase.js"

const COLECAO = "artistas";

const artistas = []

class ArtistaRepository {
    async buscarTodos() {
        const snapshot = await getDocs(collection(db, "artistas"))
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    async buscarPorUid(uid) {
        const q = query(collection(db, COLECAO), where("uid", "==", uid))
        const snapshot = await getDocs(q)
        if (snapshot.empty) throw new Error("Artista não encontrado")
        const doc = snapshot.docs[0]
        return { id: doc.id, ...doc.data() }
    }


    async criarArtista(dados) {
        const { nomeCompleto, email, nomeUsuario, senha, localizacao,
            linkPortfolio, linkInstagram, descricao, areaAtuacao,
            fotoPerfil, imagemTrabalho } = dados

        const credencial = await createUserWithEmailAndPassword(auth, email, senha)
        const uid = credencial.user.uid

        const novoArtista = {
            uid,
            nomeCompleto,
            email,
            nomeUsuario,
            localizacao,
            linkPortfolio,
            linkInstagram,
            descricao,
            areaAtuacao,
            fotoPerfil: fotoPerfil || null,
            imagemTrabalho: imagemTrabalho || null,
            dataDeCriacao: new Date()
        }

        const docRef = await addDoc(collection(db, COLECAO), novoArtista)
        return { id: docRef.id, ...novoArtista }
    }

    async login(email, senha) {
        const credencial = await signInWithEmailAndPassword(auth, email, senha)
        const token = await credencial.user.getIdToken()
        return { token, uid: credencial.user.uid }
    }

}

export default ArtistaRepository