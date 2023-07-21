import s from "../Profile.module.css";
import { get_Favorites_Request } from "../../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CourseCard from "../../../datos/CourseCard/CourseCard";

export function Favorites({ userId, dark }) {
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    useEffect(() => {
        dispatch(get_Favorites_Request(userId));
    }, []);
    return (
        <>
            {!favorites.length ? (
                <div className={`${s.favorites} ${s[theme("favorites")]}`}>
                    {favorites?.Courses?.map((fav) => {
                        return (
                            <CourseCard
                                key={fav?.id}
                                id={fav?.id}
                                title={fav?.title}
                                meanRating={fav?.meanRating}
                                isFree={fav?.isFree}
                                language={fav?.language}
                                courseUrl={fav?.courseUrl}
                                released={fav?.released}
                                description={fav?.description}
                                imageURL={fav?.imageURL}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className={`${s.emptyTab} ${s[theme("emptyTab")]}`}>
                    <img
                        src="https://www.svgrepo.com/show/461398/file-favorite-7.svg"
                        alt="favoritos"
                    />
                    <h2>CURSOS GUARDADOS</h2>
                    <p>Agregá tus cursos favoritos para visitarlos mas tarde</p>
                </div>
            )}
        </>
    );
}
