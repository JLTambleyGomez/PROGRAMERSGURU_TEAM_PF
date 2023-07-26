import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase-config";

// con esta funcion pueden subir imagenes de productos al storage de firebase
// es un componente. en el admin dashboard donde corresponda ponen: <SubirImagenDeProducto name={name}/>
// deben pasar por props el nombre "name" del producto
// reemplazar name por lo que corresponda, debe ser algo distintivo de cada producto para que no se pisen las carpetas

export function SubirImagenDeProducto({ name , handleChangeProductForm }) {
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

    const handleUploadClick = async (e) => {
        e.preventDefault()

        if (selectedFile) {
            try {
                const url = await uploadProductPicture(selectedFile, name);
                localStorage.setItem("urlNewProductImage", url);
                console.log("URL del archivo subido:", url);
            } catch (error) {
                console.log("Error al subir el archivo:", error);
            }
        } else {
            console.log("Ningún archivo seleccionado.");
        }
        handleChangeProductForm(e)
    };

    return (
        <div>
            <label htmlFor="fileInput"></label>
            <input type="file" id="fileInput" onChange={handleFileChange} />
            <button onClick={handleUploadClick} name='image' value={localStorage.getItem("urlNewProductImage") || " "}>Subir Archivo</button>
        </div>
    );
}
