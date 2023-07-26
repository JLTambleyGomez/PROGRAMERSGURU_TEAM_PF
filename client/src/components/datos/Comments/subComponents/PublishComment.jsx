import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PublishComment.module.css";
import {
    postComment,
    computeCourseRating,
} from "../../../../axiosRequests/axiosRequests";
import Rating from "@mui/material/Rating";
import theme from "../../../../theme/theme";

export default function PublishComment({setDisabled, commentData, setCommentData, setMeanRating}) {

    const user = useSelector(state => state.user)

    const date = new Date();
    const formattedDate = date.toISOString();
    const {id} = useParams()

    const [value, setValue] = useState(0);

    const handleMessage = (event) => {
        setCommentData({...commentData, message: event.target.value})
    }
    const handleClick = async (event) => {
        event.preventDefault()
        if (!value) return window.alert("Por favor introduzca la valoración")

        const data = await postComment(id, {...commentData, rating: value, userId: user?.id})
        if (data.message === "Se publicó tu comentario") {
            setDisabled(true)
        }
        const {meanRating} = await computeCourseRating(id)
        setMeanRating(meanRating)
    }

    useEffect(() => {
        setCommentData({...commentData, userId: user?.id, date: formattedDate})
    }, [commentData?.rating, setDisabled])
    return (
        <form className={`${styles.newComment} ${styles[theme("newComment")]}`}>
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
                        onChange={(event, newValue) => setValue(newValue)}
                    />
                </div>
                <div className={`${styles.message} ${styles[theme("message")]}`}>
                    <textarea
                        onChange={handleMessage}
                        value={commentData.message}
                        name="textarea"
                        rows="3"
                        placeholder="Escribe un comentario y deja tu puntuación a este curso solo si ya lo realizaste o estas cursando."
                    ></textarea>
                </div>
                <div className={styles.publish}>
                    <button onClick={handleClick}>Publicar</button>
                </div>
            </div>
        </form>
    );
}
