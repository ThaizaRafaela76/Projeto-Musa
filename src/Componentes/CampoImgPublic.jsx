import "../Styles/CampoImgPublic.css"
import { FaRegImages } from "react-icons/fa6";

const CampoImgPublic = () => {
    return(
        <div className="upload-publicacao">
            <input type="file" accept="image/*" id="upload"/>
            <label htmlFor="upload">
                <FaRegImages />
            </label>
        </div>
    )
}

export default CampoImgPublic