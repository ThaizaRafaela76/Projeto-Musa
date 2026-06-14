import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage} from "../firebase.js";

async function uploadImagem(arquivo, pasta) {
    const nomeArquivo = `${pasta}/${Date.now()}_${arquivo.originalname}`
    const storageRef = ref(storage, nomeArquivo)

    await uploadBytes(storageRef, arquivo.buffer, {contentType: arquivo.mimetype})

    const url = await getDownloadURL(storageRef)
    
    return url
}

export default uploadImagem