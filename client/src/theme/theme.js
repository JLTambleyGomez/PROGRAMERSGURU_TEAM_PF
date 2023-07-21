

const theme = (base) => {
    const dark = localStorage.getItem("darkMode");
    const isDark = JSON.parse(dark);
    const suffix = isDark ? "dark" : "light";
        return `${base}-${suffix}`;
}

export default theme;