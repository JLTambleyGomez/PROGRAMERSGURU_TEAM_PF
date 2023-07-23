import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../config/firebase-config";

export async function uploadProfilePicture(file, userId) {
    const pictureRef = ref(storage, `users/id_${userId}/${file.name}`)
    await uploadBytes(pictureRef, file)
    const url = getDownloadURL(pictureRef)
    return url
  }
export async function uploadProductPicture(file, name) {
    const pictureRef = ref(storage, `products/${name}/${file.name}`)
    await uploadBytes(pictureRef, file)
    const url = getDownloadURL(pictureRef)
    return url
  }

