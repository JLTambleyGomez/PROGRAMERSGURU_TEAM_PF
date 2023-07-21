import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase-config";

// con esta funcion pueden subir imagenes de cursos al storage de firebase
// es un componente. en el admin dashboard donde corresponda ponen: <SubirImagencurso name={name}/>
// deben pasar por props el nombre "name" del curso
// reemplazar name por lo que corresponda, debe ser algo distintivo de cada curso para que no se pisen las carpetas

export function SubirImagenCurso({ name }) {
    const [selectedFile, setSelectedFile] = useState(null);

    async function uploadCoursePicture(file, name) {
        const pictureRef = ref(storage, `courses/${name}/${file.name}`);
        await uploadBytes(pictureRef, file);
        const url = await getDownloadURL(pictureRef);
        return url;
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUploadClick = async () => {
        if (selectedFile) {
            try {
                const url = await uploadCoursePicture(selectedFile, name);
                console.log("URL del archivo subido:", url);
            } catch (error) {
                console.log("Error al subir el archivo:", error);
            }
        } else {
            console.log("Ningún archivo seleccionado.");
        }
    };

    return (
        <div>
            <label htmlFor="fileInput"></label>
            <input type="file" id="fileInput" onChange={handleFileChange} />
            <button onClick={handleUploadClick}>Subir Archivo</button>
        </div>
    );
}
