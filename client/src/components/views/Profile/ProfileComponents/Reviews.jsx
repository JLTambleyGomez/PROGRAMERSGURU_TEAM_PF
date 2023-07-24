import s from "../Profile.module.css";
import { Rating } from "@mui/material";
import { deleteComment } from "../../../../axiosRequests/axiosRequests";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import theme from "../../../../theme/theme";

export function Reviews({ dark, comments, removeComment, setRemoveComment }) {

    const handleDelete = async (event) => {
        event.preventDefault();
        const data = await deleteComment(event.target.id);
        setRemoveComment(!removeComment);
    };

    useEffect(() => {}, [removeComment]);
    if (!comments?.length) {
        return (
            <div className={`${s.emptyTab} ${s[theme("emptyTab")]}`}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1356/1356326.png"
                    alt="comentarios"
                />
                <h2>TUS COMENTARIOS</h2>
                <p>
                    Acá se mostrarán las reseñas que diste en los diferentes
                    cursos
                </p>
            </div>
        );
    }

    return (
        <div className={`${s.reviews} ${s[theme("reviews")]}`}>
            {comments?.map((comment) => {
                return (
                    <div
                        key={comment?.id}
                        className={`${s.oldComment} ${s[theme("oldComment")]}`}
                    >
                        <div className={s.courseImage}>
                            <NavLink to={`/CourseDetails/${comment?.courseId}`}>
                                <img src={comment?.Course?.imageURL} alt="" />
                            </NavLink>
                        </div>
                        <div className={s.commentInfo}>
                            <div className={s.header}>
                                <h4>{comment?.Course?.title}</h4>
                                <div className={s.rating}>
                                    <Rating
                                        name="read-only"
                                        value={comment?.rating}
                                        size="small"
                                        precision={0.1}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div
                                className={`${s.message} ${
                                    s[theme("message")]
                                }`}
                            >
                                {comment?.message}
                            </div>
                            <div className={s.delete}>
                                <span>
                                    {comment?.date
                                        .slice(0, 10)
                                        .split("-")
                                        .toReversed()
                                        .join("-")}
                                </span>
                                <img
                                    src="https://www.svgrepo.com/show/525134/trash-bin-trash.svg"
                                    alt="borrar"
                                    onClick={handleDelete}
                                    id={comment?.id}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
