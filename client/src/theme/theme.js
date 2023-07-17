const theme = (base) => {
    const suffix = dark ? "dark" : "light";
    return `${base}-${suffix}`
}

export default theme;