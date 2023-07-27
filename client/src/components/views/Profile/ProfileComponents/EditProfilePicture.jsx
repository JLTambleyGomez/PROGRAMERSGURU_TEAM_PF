import { useRef } from "react";
import { uploadProfilePicture } from "./uploadProfilePicture";
import { editUserData } from "../../../../axiosRequests/axiosRequests";

export function EditProfilePicture({ userId, setPicture, setLoading }) {
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
        setLoading(true)
        console.log(file);
        try {
            const url = await uploadProfilePicture(file, userId);
            const email = localStorage.getItem("email")
            await editUserData({email: email, picture: url})
            setPicture(url)
            setLoading(false)
            return url;
        } catch (error) {
            console.log(error);
            setLoading(false)
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


