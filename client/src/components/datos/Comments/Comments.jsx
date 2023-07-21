import { useDispatch, useSelector } from "react-redux";
import styles from "./Comments.module.css";
import { get_comments_by_course } from "../../../Redux/actions";
import { useEffect } from "react";

//_________________________module_________________________
function Comments() {
    const courseComments = useSelector(state.courseComments);
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(get_comments_by_course())
    }, [])
    return (
        <div className={styles.component}>
            <LeaveComment />
            <div className={styles.allComments}>
                {courseComments.map((comment) => {
                    return (
                        <div className={styles.oldComment}>
                            <div className={styles.profilePicture}>
                                <img src={user.picture} alt="" />
                            </div>
                            <div className={styles.commentInfo}>
                                <div className={styles.header}>
                                    <h4>{comment.userName}</h4>
                                    <div className={styles.rating}>
                                        {comment.rating}
                                    </div>
                                </div>
                                <div className={styles.message}>
                                    {comment.message}
                                </div>
                                <div className={styles.date}>
                                    {comment.date}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Comments;
