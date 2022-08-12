import jwt from 'jsonwebtoken'
import 'dotenv/config';

export function generateAccessToken(id, username) {
    return jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: 84600,
    })
}
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


export default {
    generateAccessToken,
    authenticateToken
};