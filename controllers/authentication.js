const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    const dec = await jwt.verify(req.token, "secretkey", (err, decode) => {
        if (err) {
            return 0
        } else {
            return decode
        }
    })

    if (dec !== 0) {
        req.dec = dec
        next()
    } else {
        res.sendStatus(403)
    }
}


//veryfy jwt
const verifyToken = (req, res, next) => {
    //get auth headers
    const bearerHeader = req.headers['authorization']
    // check bearer
    if (typeof bearerHeader !== 'undefined') {
        //get bearer
        const bearer = bearerHeader.split(' ')
        //get jwt
        const bearerToken = bearer[1]
        // set token
        req.token = bearerToken
        next()
    } else {
        return res.sendStatus(403)
    }
}


exports.verifyToken = verifyToken
exports.authentication = authentication