import { useSelector } from "react-redux";
import s from "./Comments.module.css";
import styles from "./subComponents/PublishComment.module.css";
import Rating from "@mui/material/Rating";

//_________________________module_________________________
function Comments({comments}) {
    const dark = useSelector((state) => state.darkMode);
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };
    return (
        <div className={s.allComments}>
            {comments?.map((comment) => {
                return (
                    <div key={comment?.id} className={`${s.oldComment} ${s[theme("oldComment")]}`}>
                        <div className={styles.profilePicture}>
                            <img src={comment?.User?.picture} alt="" />
                        </div>
                        <div className={styles.commentInfo}>
                            <div className={styles.header}>
                                <h4>{comment.User?.name}</h4>
                                <div className={styles.rating}>
                                    <Rating
                                        name="read-only"
                                        value={comment.rating}
                                        size="small"
                                        precision={0.1}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className={`${s.message} ${s[theme("message")]}`}>{comment.message}</div>
                            <div className={s.date}>
                                {comment.date.slice(0, 10).split('-').toReversed().join('-')}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Comments;
