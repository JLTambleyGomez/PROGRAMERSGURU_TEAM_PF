export function EditProfileForm({ newUserData, handleChange }) {
  return (
    <>
      <label htmlFor="name">
        <h5>Nombre</h5>
        <input
          type="text"
          id="name"
          value={newUserData.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="picture">
        <h5>Foto de perfil (url)</h5>
        <input
          type="url"
          id="picture"
          value={newUserData.picture}
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
    </>
  );
}
