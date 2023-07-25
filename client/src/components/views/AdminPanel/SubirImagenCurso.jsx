import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase-config";

export function SubirImagenCurso({ title, handleCourseChange }) {
    const [selectedFile, setSelectedFile] = useState(null);

    function reemplazarCaracteres(str, caracterAntiguo, caracterNuevo) {
        let expresionRegular = new RegExp(caracterAntiguo, "g");
        return str.replace(expresionRegular, caracterNuevo);
    }
    let caracterAntiguo = " ";
    let caracterNuevo = "_";
    let titulo = reemplazarCaracteres(title, caracterAntiguo, caracterNuevo);

    console.log(titulo);
    async function uploadCoursePicture(file, titulo) {
        const pictureRef = ref(storage, `courses/${titulo}`);
        await uploadBytes(pictureRef, file);
        const url = await getDownloadURL(pictureRef);
        return url;
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUploadClick = async (e) => {
        e.preventDefault();

        if (selectedFile) {
            try {
                const url = await uploadCoursePicture(selectedFile, titulo);
                localStorage.setItem("urlNewCourseImage", url);
                console.log("URL del archivo subido:", url);
            } catch (error) {
                console.log("Error al subir el archivo:", error);
            }
        } else {
            console.log("Ningún archivo seleccionado.");
        }
        handleCourseChange(e)
    };

    return (
        <div>
            <label htmlFor="fileInput"></label>
            <input type="file" id="fileInput" onChange={handleFileChange} />
            <button onClick={handleUploadClick} name="imageURL" value={localStorage.getItem("urlNewCourseImage") || " "}>Subir Imagen</button>
        </div>
    );
}
