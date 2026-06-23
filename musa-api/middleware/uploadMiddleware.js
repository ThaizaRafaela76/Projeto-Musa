// middleware/uploadMiddleware.js

// Importa a biblioteca Multer, que é usada para fazer upload de arquivos (fotos)
import multer from "multer";

// Importa o módulo 'path' do Node.js para trabalhar com caminhos de pastas e arquivos
import path from "path";

// Importa funções para pegar o caminho do arquivo atual (necessário em projetos com ES Modules)
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Converte o caminho do módulo atual para um formato que o Node entende
const __filename = fileURLToPath(import.meta.url);

// Pega o diretório (pasta) onde este arquivo está localizado
const __dirname = dirname(__filename);


// Configuração de como o Multer vai salvar os arquivos no disco do servidor
const storage = multer.diskStorage({

    // Define em qual pasta o arquivo vai ser salvo
    destination: function (req, file, cb) {
        
        // Decide a pasta dependendo da rota ou do nome do campo do arquivo
        const pasta = req.baseUrl.includes('publicacoes') ? 'publicacoes' : 
                     (file.fieldname === 'fotoPerfil' ? 'fotoPerfil' : 'imagemTrabalho');
        
        // Chama o callback dizendo onde salvar (pasta public/uploads/...)
        cb(null, `public/uploads/${pasta}/`);
    },

    // Define como vai ser o nome do arquivo salvo
    filename: function (req, file, cb) {
        // Cria um nome único: timestamp (data/hora atual) + nome original do arquivo
        // Substitui espaços por traço (-) para evitar problemas
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
});

// Define o tamanho máximo permitido para as imagens (10 MB)
const tamanhoMegaBits = 10;


// Cria e configura o middleware de upload
export const upload = multer({
    
    // Usa a configuração de storage que criamos acima
    storage: storage,
    
    // Limita o tamanho do arquivo (10MB)
    limits: { fileSize: tamanhoMegaBits * 1024 * 1024 },
    
    // Filtra os tipos de arquivos permitidos
    fileFilter: (req, file, cb) => {
        
        // Lista dos formatos de imagem que são aceitos
        const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
        
        // Se o arquivo for de um tipo permitido, aceita
        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            // Se não for, rejeita e mostra mensagem de erro
            cb(new Error("Apenas imagens JPG, PNG e WEBP são permitidas"));
        }
    }
});