import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase-config";


export function SubirImagenDeProducto({ name }) {
    const [selectedFile, setSelectedFile] = useState(null);

    async function uploadProductPicture(file, name) {
        const pictureRef = ref(storage, `products/${name}/${file.name}`);
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
                const url = await uploadProductPicture(selectedFile, name);
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
