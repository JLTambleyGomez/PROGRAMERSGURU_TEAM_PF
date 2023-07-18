import s from "../Profile_v2.module.css";

export function Favorites ({favorites}) {
    return (
        // <div className={!favorites.hasOwnProperty() ? s.emptyTab : s.favorites}>
        <div className={s.emptyTab}>
            <img src="https://www.svgrepo.com/show/461398/file-favorite-7.svg" alt="favoritos" />
            <h2>CURSOS GUARDADOS</h2>
            <p>Agregá tus cursos favoritos para visitarlos mas tarde</p>
        </div>
    )
}