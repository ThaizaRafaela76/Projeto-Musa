// Importa a função para inicializar o Firebase (versão cliente)
import { initializeApp } from "firebase/app"

// Importa a função para usar o Firestore (banco de dados)
import { getFirestore } from "firebase/firestore"

// Importa a função para usar o Authentication (login com email/senha)
import { getAuth } from "firebase/auth"

// Importa a função do Node.js para ler arquivos (usado para ler a chave do Firebase Admin)
import { readFileSync } from "fs"

// Importa a função para usar o Storage (armazenamento de arquivos/imagens)
import { getStorage } from "firebase/storage"

// Importa as funções necessárias do Firebase Admin (versão para servidor)
import { cert, initializeApp as adminInitializeApp } from "firebase-admin/app"
import { getAuth as getAdminAuth } from "firebase-admin/auth"


// Configuração do Firebase (chaves públicas do projeto)
// Essas informações são seguras para usar no frontend e backend
const firebaseConfig = {
  apiKey: "AIzaSyBXq6to3Ho0UvDnOieywIK9JBYIVZQ7WCs",
  authDomain: "projeto-musapii.firebaseapp.com",
  projectId: "projeto-musapii",
  storageBucket: "projeto-musapii.firebasestorage.app",
  messagingSenderId: "44653477754",
  appId: "1:44653477754:web:e8474e8ec9dc9e089de0c3"
}


// ======================= FIREBASE CLIENT (lado cliente) =======================

// Inicializa o aplicativo Firebase usando as configurações acima
const app = initializeApp(firebaseConfig)

// Cria e exporta a conexão com o Firestore (banco de dados)
export const db = getFirestore(app)

// Cria e exporta a conexão com o Authentication (sistema de login)
export const auth = getAuth(app)

// Cria e exporta a conexão com o Storage (para salvar imagens)
export const storage = getStorage(app)


// ======================= FIREBASE ADMIN (lado servidor) =======================

// Lê o arquivo serviceAccountKey.json que contém as credenciais secretas do servidor
// Esse arquivo NUNCA deve ser enviado para o GitHub (é secreto)
const serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json", "utf8"))

// Inicializa o Firebase Admin SDK (usado no backend para verificar tokens, etc.)
const adminApp = adminInitializeApp({
  credential: cert(serviceAccount)   // Usa a chave de serviço para autenticação
})

// Cria e exporta o Authentication do Admin (usado principalmente para verificar tokens)
export const adminAuth = getAdminAuth(adminApp)