const{verify} = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization")
    // const token = req.header('accessToken')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.status(401).json({ success: false, message: 'Access token not found' })

    try {
        const validToken = verify(token, 'importantsecret')
        req.username = validToken.username
        if(validToken)
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ success: false, message: 'Invalid token' })
    }
}

module.exports = verifyToken;