export function EditProfileForm({ newUserData, handleChange }) {
    return (
        <form>
            <label htmlFor="name">
                <h5>Nombre</h5>
                <input
                    type="text"
                    id="name"
                    value={newUserData.name}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="nickName">
                <h5>Alias</h5>
                <input
                    type="text"
                    id="nickName"
                    value={newUserData.nickName}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="address">
                <h5>Dirección</h5>
                <input
                    type="text"
                    id="address"
                    value={newUserData.address}
                    onChange={handleChange}
                />
            </label>
        </form>
    );
}
