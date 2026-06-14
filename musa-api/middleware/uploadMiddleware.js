// middleware/uploadMiddleware.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração para salvar em disco
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pasta = req.baseUrl.includes('publicacoes') ? 'publicacoes' : 
                     (file.fieldname === 'fotoPerfil' ? 'fotoPerfil' : 'imagemTrabalho');
        
        cb(null, `public/uploads/${pasta}/`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
});

const tamanhoMegaBits = 10;

export const upload = multer({
    storage: storage,
    limits: { fileSize: tamanhoMegaBits * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Apenas imagens JPG, PNG e WEBP são permitidas"));
        }
    }
});