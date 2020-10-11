const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const path = require("path");
//const cors = require("cors");
const jwt = require("jsonwebtoken");



// Importando JSON-Server
const jsonServer = require("json-server");


//import sslRedirect from 'heroku-ssl-redirect';
// enable ssl redirect
//app.use(sslRedirect());
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const validateUser = require("./validate_user.js");

const SECRET_JWT_KEY = "SECRETJWTKEY";
const port = process.env.PORT || 8080;

/*
app.use(function (req, res, next) {
  if (req.header('x-forwarded-proto') === 'http') {
    res.redirect(301, 'https://' + req.hostname + req.url);
    return
  }
  next()
});
*/

app.use("*", (req, res, next) => {
  console.log(req.query, req.body);
  next();
});
app.use((req, res, next) => {
  console.log("Logger... ", new Date(), req.method, req.path);
  next();
});

app.get("/status", (req, res, next) => {
  res.send({
    message: 'Todo List Server alive!'
  });
});
app.get("/error/:errorCode", (req, res, next) => {
  res.status(req.params.errorCode).send("ERRO GERADO PELO USUARIO");
})
app.post("/login", (req, res) => {
  validateUser(req.body.username, req.body.password, (idErr, userid) => {
    if (idErr !== null) {
      res.status(401).send(idErr);
    } else {
      jwt.sign(
        { userid },
        SECRET_JWT_KEY,
        { algorithm: "HS256", expiresIn: "1h" },
        (err, token) => res.status(200).send(
          {
            username: 'usuario',
            token: token
          })
      );
    }
    1;
  });
});
app.use("/api", jsonServer.defaults(), jsonServer.router("src/db.json"));

app.use((req, res, next) => {
  // First check for the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("No token specified");
  }

  // Now validate the token itself
  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_JWT_KEY, (err, decoded) => {
    if (err) {
      // Token bad formed, or expired, or other problem
      return res.status(403).send("Token expired or not valid");
    } else {
      // Token OK; get the user id from it
      req.userid = decoded.userid;
      // Keep processing the request
      next();
    }
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Error....", err.message);
  res.status(500).send("INTERNAL SERVER ERROR");
});

app.set('port', port);


app.listen(port, () =>
  console.log(`Mini server (with Express) ready at port ${port}!`)
);
