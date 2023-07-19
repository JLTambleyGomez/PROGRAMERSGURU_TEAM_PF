import { useRef } from "react";
import { uploadProfilePicture } from "./uploadProfilePicture";

export function EditProfilePicture({ userId, setNewUserData, newUserData }) {
    const cameraImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Circle-icons-camera.svg/768px-Circle-icons-camera.svg.png"
    let fileInputRef = useRef(null);

    const handleButtonClick = (event) => {
        event.preventDefault();
        console.log("Button clicked")
        fileInputRef.current.click();
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        console.log(file);
        try {
            const url = await uploadProfilePicture(file, userId);
            setNewUserData({ ...newUserData, picture: url });
            return url;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleUpload}
            />
            <label htmlFor="picture">
                <span
                    id="picture"
                    onClick={handleButtonClick}
                >
                    <img src={cameraImage} alt="edit picture" />
                </span>
            </label>
        </div>
    );
}
