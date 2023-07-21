import { useDispatch, useSelector } from "react-redux";
import s from "./Comments.module.css";
import { get_comments_by_course } from "../../../Redux/actions";
import { useEffect } from "react";
import styles from "./subComponents/PublishComment.module.css";
import Rating from "@mui/material/Rating";

//_________________________module_________________________
function Comments() {
    const dark = useSelector((state) => state.darkMode);

    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };
    // const courseComments = useSelector(state.courseComments);
    // hardcodeo de comments:
    const courseComments = [
        {
            userName: "Pepito",
            userPicture:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtG1bBtQNQwFR7MuJo9MII_epN5KJtzyZNZw&usqp=CAU",
            date: "2023-06-05",
            rating: 4.1,
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed blandit lectus. Morbi nisi nunc, molestie a blandit ac, malesuada et orci. Donec quis dolor eu magna dapibus imperdiet fringilla id magna.",
            id: 1,
        },
        {
            userName: "Cosme Fulanito",
            userPicture:
                "https://media.licdn.com/dms/image/C4D03AQFTGK51wmi5-g/profile-displayphoto-shrink_800_800/0/1517333612205?e=2147483647&v=beta&t=n4Z73V6rOQJUeKSX39qCVg8KsIXBn9ZcW30mPSro7QU",
            date: "2023-05-16",
            rating: 4.8,
            message:
                "Curabitur lacus felis, dignissim quis tellus sit amet, euismod semper eros. Integer quis tempus massa. Phasellus ultrices odio tortor, et vehicula odio molestie vitae. Maecenas eget facilisis dui.",
            id: 2,
        },
        {
            userName: "Jayden",
            userPicture:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz86HXwMLdpBR3WdTM2t4FUh6qv6R9gGpAL9ggsYP_aO4ClHs6pBfMJP_OzpeG-gFU2hE&usqp=CAU",
            date: "2023-07-21",
            rating: 2.3,
            message: "No se que dicen pero mienten",
            id: 3,
        },
    ];
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(get_comments_by_course());
    // }, []);
    return (
        <div className={s.allComments}>
            {courseComments.map((comment) => {
                return (
                    <div key={comment.id} className={`${s.oldComment} ${s[theme("oldComment")]}`}>
                        <div className={styles.profilePicture}>
                            <img src={comment?.userPicture} alt="" />
                        </div>
                        <div className={styles.commentInfo}>
                            <div className={styles.header}>
                                <h4>{comment.userName}</h4>
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
                                {comment.date}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Comments;
