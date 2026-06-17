import "../Styles/CampoImgPublic.css"
import { FaRegImage } from "react-icons/fa6";

const CampoImgPublic = ({name, imagem, setImagem, erro}) => {

    function handleImagem(e) {
        const arquivo = e.target.files[0]

        console.log(arquivo)

        if(arquivo) {
            setImagem(arquivo)
        }
    }

    return(
        <div className="upload-publicacao">
            <label htmlFor="upload_public" className={erro ? "erro-borda" : ""}>
                {imagem ? (
                    <img 
                        src={URL.createObjectURL(imagem)}
                        alt="Prévia da obra"
                        className="preview-img"
                    />
                ) : (
                <>
                <p>Adicionar uma imagem</p>
                <FaRegImage />
                </>
            )}
            </label>

            <input 
            type="file" 
            id="upload_public"
            accept="image/*" 
            onChange={handleImagem}
            hidden
            />

            {erro && <span className="erro-imagem">{erro}</span>}
        </div>
    )
}

export default CampoImgPublic