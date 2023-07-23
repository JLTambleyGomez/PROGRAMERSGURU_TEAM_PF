
const loginWithGoogle = async (req, res) => {
    try {
        const { user_id, name, picture, email } = req.user;

        //

        return res.json({
            userData: {
                id: `${user_id}`,
                email: email ? email : "",
                name: name ? name : "",
                image: picture ? picture : "",
            },
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
module.exports = { loginWithGoogle };
