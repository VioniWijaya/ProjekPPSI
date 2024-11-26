// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// function isLogin(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return next();
//   }

//   jwt.verify(token, process.env.JWT_SECRET_TOKEN, function(err, decoded) {
//     if (err) {
//       res.clearCookie('token');
//       return next();
//     }

//     req.userId = decoded.id;
//     req.userRole = decoded.role;
//     req.userName = decoded.username;

//     if (req.userRole == "admin") {
//       return res.redirect("/home");
//     }
//     //  else if (req.userRole == "dinas") {
//     //   return res.redirect("/dinas/dashboard");
//     // } 
    

//     next();
//   });
// }

// module.exports = isLogin;