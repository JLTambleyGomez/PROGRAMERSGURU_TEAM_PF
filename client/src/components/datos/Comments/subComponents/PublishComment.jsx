import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./PublishComment.module.css";
import {
    postComment,
    computeCourseRating,
} from "../../../../axiosRequests/axiosRequests";
import Rating from "@mui/material/Rating";

export default function PublishComment() {
    const [value, setValue] = useState(0);
    const user = useSelector((state) => state.user);
    const date = new Date();

    return (
        <form className={styles.newComment}>
            <div className={styles.profilePicture}>
                <img src={user?.picture} alt="" />
            </div>
            <div className={styles.commentInfo}>
                <div className={styles.header}>
                    <span>{user?.name}</span>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        precision={0.1}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </div>
                <div className={styles.message}>
                    <textarea
                        name="textarea"
                        rows="3"
                        placeholder="Escribe un comentario y deja tu puntuación a este curso solo si ya lo realizaste o estas cursando."
                    ></textarea>
                </div>
                <div className={styles.publish}>
                    <button>Publicar</button>
                </div>
            </div>
        </form>
    );
}
