import jwt from 'jsonwebtoken';

const generateToken = (id, res) => {
    // Debugging line to check if JWT_SEC is available
    console.log("JWT_SEC from env:", process.env.JWT_SEC);

    const token = jwt.sign({ id }, process.env.JWT_SEC, {
        expiresIn: "15d",
    });

    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: "strict",
    });
};

export default generateToken;
