const jwt = require('jsonwebtoken')
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  try {
    //get the token value from a cookie, which is automatically sent from the client
    const token = req.cookies.token

    if(!token) {
      return res.status(401).json({
        message: 'invalid credentials'
      })
    }
    //make sure the signature on the token is valid and still matches the payload
    //we need to use the same secreet string that was used to sign the token
    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
      if(err){
        return res.status(401).json({
          message: 'invalid credentials'
        })
      }

      //make the tokens decoded payload avialable to other middleware functions or route handlers, in case we want to use it for something
      req.token = decoded
      //at this point we know the token is valid and the user is authorized
      next()
    })


  } catch (err) {
    next(err)
  }
};
