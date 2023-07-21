import s from "../Profile.module.css";
import { get_Favorites_Request } from "../../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CourseCard from "../../../datos/CourseCard/CourseCard";

export function Favorites({ userId }) {
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    console.log(favorites.Courses[0]);

    useEffect(() => {
        dispatch(get_Favorites_Request(userId));
    }, []);
    return (
        <>
            {!favorites.length ? (
                <div className={s.favorites}>
                    {favorites.Courses.map((fav) => {
                        return (
                            <CourseCard
                            className={s.coursecard}
                                id={fav.id}
                                title={fav.title}
                                meanRating={fav.meanRating}
                                isFree={fav.isFree}
                                language={fav.language}
                                courseUrl={fav.courseUrl}
                                released={fav.released}
                                description={fav.description}
                                imageURL={fav.imageURL}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className={s.emptyTab}>
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
