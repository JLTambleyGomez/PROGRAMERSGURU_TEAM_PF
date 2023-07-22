import s from "../Profile.module.css";

export function Reviews ({dark}) {
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };
    return (
        // <div className={!userComments.hasOwnProperty() ? s.emptyTab : s.userComments}>
        <div className={`${s.emptyTab} ${s[theme("emptyTab")]}`}>
            <img src="https://cdn-icons-png.flaticon.com/512/1356/1356326.png" alt="comentarios" />
            <h2>TUS COMENTARIOS</h2>
            <p>Acá se mostrarán las reseñas que diste en los diferentes cursos</p>
        </div>
    )
}