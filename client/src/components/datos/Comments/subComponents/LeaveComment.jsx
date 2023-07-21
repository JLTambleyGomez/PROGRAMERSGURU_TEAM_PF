import { useSelector } from "react-redux"
import styles from "../Comments.module.css"

export default function LeaveComment () {
    const user = useSelector(state => state.user)
    const date = new Date()

    return (
        <form className={styles.newComment}>
            <div className={styles.profilePicture}>
                <img src={user.picture} alt="" />
            </div>
            <div className={styles.commentInfo}>
                <div className={styles.header}>
                    <h4>{user.name}</h4>
                    <div className={styles.rating}>
                        {/* poner un input para el rating */}
                    </div>
                </div>
                <div className={styles.message}>
                    {/* poner un input para el mensaje */}
                </div>
                <div className={styles.date}>
                    {date}
                </div>
            </div>
        </form>
    )
}