import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PublishComment.module.css";
import {
    postComment,
    computeCourseRating,
} from "../../../../axiosRequests/axiosRequests";
import Rating from "@mui/material/Rating";

export default function PublishComment({userId, picture, name, comments}) {
    const dark = useSelector((state) => state.darkMode);
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };
    
    const disabled = !!comments?.find(comment => Number(comment?.userId) === Number(userId)) || false

    const date = new Date();
    const formattedDate = date.toISOString();
    const {id} = useParams()

    const [value, setValue] = useState(0);
    const [commentData, setCommentData] = useState({
        userId: 0,
        message: "",
        date: "",
        rating: 0
    })

    const handleMessage = (event) => {
        setCommentData({...commentData, message: event.target.value})
    }
    const handleClick = async (event) => {
        event.preventDefault()
        if (!value) return window.alert("Por favor introduzca la valoración")

        setCommentData({...commentData, rating: value})

        await postComment(id, {...commentData, rating: value})
        // await computeCourseRating(id)
    }

    useState(() => {
        setCommentData({...commentData, userId: userId, date: formattedDate})
    }, [])
    return (
        <form className={`${styles.newComment} ${styles[theme("newComment")]}`}>
            <div className={styles.profilePicture}>
                <img src={picture} alt="" />
            </div>
            <div className={styles.commentInfo}>
                <div className={styles.header}>
                    <span>{name}</span>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        precision={0.1}
                        onChange={(event, newValue) => setValue(newValue)}
                    />
                </div>
                <div className={`${styles.message} ${styles[theme("message")]}`}>
                    <textarea
                        onChange={handleMessage}
                        value={commentData.message}
                        name="textarea"
                        rows="3"
                        disabled={disabled}
                        placeholder="Escribe un comentario y deja tu puntuación a este curso solo si ya lo realizaste o estas cursando."
                    ></textarea>
                </div>
                <div className={styles.publish}>
                    <button onClick={handleClick} disabled={disabled}>Publicar</button>
                </div>
            </div>
        </form>
    );
}
