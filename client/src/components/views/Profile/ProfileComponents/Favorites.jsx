import s from "../Profile.module.css";
import { Rating } from "@mui/material";
import { NavLink } from "react-router-dom";

export function Favorites({ dark, favorites }) {
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    if (!favorites?.length) {
        return (
            <div className={`${s.emptyTab} ${s[theme("emptyTab")]}`}>
                <img
                    src="https://www.svgrepo.com/show/461398/file-favorite-7.svg"
                    alt="favoritos"
                />
                <h2>CURSOS GUARDADOS</h2>
                <p>Agregá tus cursos favoritos para visitarlos mas tarde</p>
            </div>
        );
    }

    return (
        <div className={`${s.favorites} ${s[theme("favorites")]}`}>
            {favorites?.map((fav) => {
                return (
                    <div className={s.favorite} key={fav?.id}>
                        <div className={s.image}>
                            <NavLink to={`/CourseDetails/${fav?.id}`}>
                                <img src={fav?.imageURL} alt="" />
                            </NavLink>
                        </div>
                        <div className={s.courseInfo}>
                            <p>{fav?.title}</p>
                            <Rating
                                name="read-only"
                                value={fav?.meanRating}
                                size="small"
                                precision={0.1}
                                readOnly
                            />
                            <span>Idioma: {fav?.language}</span>
                            <span>
                                {fav?.isFree
                                    ? "Este curso es gratuito"
                                    : "Este curso es de pago"}
                            </span>
                            <span>
                                <a href={fav?.courseUrl}>
                                    Visitar página del curso
                                </a>
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
