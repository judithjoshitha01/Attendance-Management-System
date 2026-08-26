const loginUser = async (req, res) => {
    try {
        res.status(200).json({ message: "Login logic working!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginUser };