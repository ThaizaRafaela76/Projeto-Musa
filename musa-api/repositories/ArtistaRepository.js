import ArtistaModel from "../models/ArtistaModel.js"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { db, auth } from "../firebase.js"

//nome da coleção que está no banco do firebase
const COLECAO = "artistas";

// O repository é responsavel por fazer o  salvamento e buscar artistas do banco  
class ArtistaRepository {

    ////função assincrona que busca todos os artistas da coleção artista que ta no banco
    async buscarTodos() {
        //pega todos os documentos de da coleção artistas
        const artistas = await getDocs(collection(db, COLECAO))
        //retorna uma lista de artistas tranformando os documentos e criando objetos adicionando o id de cada artista
        return artistas.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    //função assincrona que busca um artista por uid 
    async buscarPorUid(uid) {
        //é feito uma query que é tipo um filtro que busca da coleção o usuario que tem o uid igual o passado na função 
        const q = query(collection(db, COLECAO), where("uid", "==", uid))
        //é chamado aquery na função assicrona que deve retornar o artista
        const artista = await getDocs(q)
        //Se não encontrar o artista retorna um erro
        if (artista.empty) throw new Error("Artista não encontrado")
        const doc = artista.docs[0]
        //monta o objeto do artista encontado passando seu id e depois o retorna
        return { id: doc.id, ...doc.data() }
    }

    //função assincrona que cria um novo artista
    async criarArtista(dados) {
        //Recebe todos os dados do artista de uma vez (nome, email, senha, etc).
        const { nomeCompleto, email, nomeUsuario, senha, localizacao,
            linkPortfolio, linkInstagram, descricao, areaAtuacao,
            fotoPerfil, imagemTrabalho } = dados

        //cria uma conta de artista usando a função asincrona do firebase passando email e senha 
        const credencial = await createUserWithEmailAndPassword(auth, email, senha)
        //Depois pega o uid (um número único que o Firebase dá para cada artista).
        const uid = credencial.user.uid
        //Monta um objeto com todas as informações do artista, incluindo a data mais recente.
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

        //Salva esse artista na coleção "artistas" do banco
        const docRef = await addDoc(collection(db, COLECAO), novoArtista)
        //Retorna o artista criado junto com o ID que o banco gerou.
        return { id: docRef.id, ...novoArtista }
    }

    //função assincrona responsavel por fazer o login do artista
    async login(email, senha) {
        //pega o email e a senha
        //Faz o login no Firebase
        const credencial = await signInWithEmailAndPassword(auth, email, senha)
        //Gera um token (uma espécie de senha temporária) que o usuário pode usar para provar que está logado
        const token = await credencial.user.getIdToken()
        //Retorna o token e o uid.
        return { token, uid: credencial.user.uid }
    }

}

export default ArtistaRepository