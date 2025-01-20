const { expressjwt } = require('express-jwt')
const path = require('path')
const fs = require('fs')

const { getUserBy_id } = require('../controllers/user')


const PUBLICKEY = fs.readFileSync(
    path.join(
        __dirname,
        '..',
        'keys',
        'public.pem'
    )
)

exports.checkJwt = expressjwt({
  secret: PUBLICKEY,
  userProperty: "auth",
  algorithms: ["RS256"],
//   getToken: (req) => {
//     // Extract token from the Authorization header or a custom location
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer ")
//     ) {
//       return req.headers.authorization.split(" ")[1];
//     }
//     if (req.query.token) {
//       return req.query.token;
//     }
//     return null; // No token found
//   },
});



exports.checkAuthentication = async (req, res, next) => {
    //Check if user exists
    let user = await getUserBy_id(req.auth._id)
    if(user)
        next() //Exits So Call The Next Function
    else
        return res.status(401).json({ //Else Call The Error Function
            error: true,
            message: "Unauthorized!"
        })
}
// 'LIBRARY_DEPT', 'FINANCE_DEPT', 'SRE_DEPT', 'CS_DEPT', 'APO_DEPT', 'SOCS_DEPT', 'SOHST_DEPT', 'SOAE_DEPT', 'SOL_DEPT', 'SOB_DEPT', 'SOD_DEPT'
exports.checkAdmin = async (req, res, next) => {
    //Check if user exists
    let user = await getUserBy_id(req.auth._id)
    if(req.auth.user.role === 'ADMIN' || req.auth.user.role === 'LIBRARY_DEPT' || req.auth.user.role === 'FINANCE_DEPT' || req.auth.user.role === 'SRE_DEPT' || req.auth.user.role === 'CS_DEPT' || req.auth.user.role === 'APO_DEPT' || req.auth.user.role === 'SOCS_DEPT' || req.auth.user.role === 'SOHST_DEPT' || req.auth.user.role === 'SOAE_DEPT' || req.auth.user.role === 'SOL_DEPT' || req.auth.user.role === 'SOB_DEPT' || req.auth.user.role === 'SOD_DEPT')
        next() //Exits So Call The Next Function
    else
        return res.status(401).json({ //Else Call The Error Function
            error: true,
            message: "Unauthorized!"
        })
}

exports.checkModerator = async (req, res, next) => {
    //Check if user exists
    let user = await getUserBy_id(req.auth._id)
    if(req.auth.user.role === 'MODERATOR')
        next() //Exits So Call The Next Function
    else
        return res.status(401).json({ //Else Call The Error Function
            error: true,
            message: "Unauthorized!"
        })
}

exports.checkStudent = async (req, res, next) => {
    //Check if user exists
    let user = await getUserBy_id(req.auth._id)
    if(req.auth.user.role === 'STUDENT')
        next() //Exits So Call The Next Function
    else
        return res.status(401).json({ //Else Call The Error Function
            error: true,
            message: "Not Student!"
        })
}

